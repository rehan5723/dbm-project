import db from '../db.js';

// GET /student/results?year=1&semester=2
export const viewMyResults = (req, res) => {
    const studentId = req.user.id;  // user ID from JWT
    const { year, semester } = req.query;

    if (!year || !semester) {
        return res.status(400).json({ message: 'Year and semester are required' });
    }

    // Ensure only students can access
    if (req.user.role !== 'student') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const sql = `
        SELECT s.name AS subject, r.marks_obtained
        FROM results r
        JOIN subjects s ON r.subject_id = s.id
        WHERE r.student_id = ? AND s.year = ? AND s.semester = ?
    `;

    db.query(sql, [studentId, year, semester], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        // Fetch CGPA from users table
        db.query('SELECT cgpa FROM users WHERE id = ?', [studentId], (err2, userRes) => {
            if (err2) return res.status(500).json({ message: err2.message });
            
            const cgpa = userRes[0]?.cgpa ?? null;
            res.json({ results, cgpa });
        });
    });
};
