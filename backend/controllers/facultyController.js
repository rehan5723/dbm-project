import db from '../db.js';

// ----------------- Helper: calculate CGPA -----------------
export const calculateCGPA = (req, res) => {
  const { student_id } = req.body;
  if (!student_id) return res.status(400).json({ message: 'Student ID is required' });

  const sql = `SELECT marks_obtained FROM results WHERE student_id = ?`;
  db.query(sql, [student_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch marks', error: err });

    if (results.length === 0) return res.status(404).json({ message: 'No marks found for this student' });

    // CGPA = average marks / 10
    const totalMarks = results.reduce((sum, r) => sum + r.marks_obtained, 0);
    const cgpa = parseFloat((totalMarks / results.length / 10).toFixed(2));

    // Update CGPA in users table
    const updateSql = `UPDATE users SET cgpa = ? WHERE id = ?`;
    db.query(updateSql, [cgpa, student_id], (err2) => {
      if (err2) return res.status(500).json({ message: 'Failed to update CGPA', error: err2 });
      res.json({ message: 'CGPA calculated successfully', cgpa });
    });
  });
};

// ----------------- Result Management -----------------

// Add single result
export const addResult = (req, res) => {
  const { student_id, subject_id, marks } = req.body;
  if (!student_id || !subject_id || marks === undefined)
    return res.status(400).json({ message: 'All fields are required' });
  if (marks < 0 || marks > 100)
    return res.status(400).json({ message: 'Marks must be between 0 and 100' });

  const sql = `
    INSERT INTO results (student_id, subject_id, marks_obtained)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE marks_obtained = VALUES(marks_obtained)
  `;
  db.query(sql, [student_id, subject_id, marks], (err) => {
    if (err) return res.status(500).json({ message: 'Failed to add result', error: err });
    res.json({ message: 'Result added successfully' });
  });
};

// Add results in bulk (no automatic CGPA calculation)
export const addResultBulk = (req, res) => {
  const results = req.body; // [{student_id, subject_id, marks}, ...]
  if (!Array.isArray(results) || results.length === 0)
    return res.status(400).json({ message: 'No results to add' });

  const values = [];
  for (const r of results) {
    if (!r.student_id || !r.subject_id || r.marks === undefined)
      return res.status(400).json({ message: 'All fields are required for each result' });
    if (r.marks < 0 || r.marks > 100)
      return res.status(400).json({ message: 'Marks must be between 0 and 100' });
    values.push([r.student_id, r.subject_id, r.marks]);
  }

  const sql = `
    INSERT INTO results (student_id, subject_id, marks_obtained)
    VALUES ?
    ON DUPLICATE KEY UPDATE marks_obtained = VALUES(marks_obtained)
  `;
  db.query(sql, [values], (err) => {
    if (err) return res.status(500).json({ message: 'Failed to add results', error: err });
    res.json({ message: 'Results added successfully' });
  });
};

// View all results
export const viewAllResults = (req, res) => {
  const sql = `
    SELECT r.id, u.name AS student, s.name AS subject, r.marks_obtained AS marks, u.cgpa
    FROM results r
    JOIN users u ON r.student_id = u.id
    JOIN subjects s ON r.subject_id = s.id
    ORDER BY u.name, s.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch results', error: err });
    res.json(results);
  });
};

// ----------------- Student Management -----------------

export const addStudent = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const role = 'student';
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Email already exists' });
      return res.status(500).json({ message: 'Failed to add student', error: err });
    }
    res.json({ message: 'Student added successfully', studentId: result.insertId });
  });
};

export const getAllStudents = (req, res) => {
  const sql = "SELECT id, name, email, cgpa FROM users WHERE role='student' ORDER BY name";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch students', error: err });
    res.json(results);
  });
};

// ----------------- Subject Management -----------------

export const getSubjects = (req, res) => {
  const { year, semester } = req.query;
  if (!year || !semester) return res.status(400).json({ message: 'Year and semester required' });

  const sql = 'SELECT id, name FROM subjects WHERE year = ? AND semester = ? ORDER BY id';
  db.query(sql, [year, semester], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch subjects', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'No subjects found' });
    res.json(results);
  });
};
