// import db from '../db.js';

// // GET /student/results?year=1&semester=2
// export const viewMyResults = (req, res) => {
//     const studentId = req.user.id;  // user ID from JWT
//     const { year, semester } = req.query;

//     if (!year || !semester) {
//         return res.status(400).json({ message: 'Year and semester are required' });
//     }

//     // Ensure only students can access
//     if (req.user.role !== 'student') {
//         return res.status(403).json({ message: 'Access denied' });
//     }

//     const sql = `
//         SELECT s.name AS subject, r.marks_obtained
//         FROM results r
//         JOIN subjects s ON r.subject_id = s.id
//         WHERE r.student_id = ? AND s.year = ? AND s.semester = ?
//     `;

//     db.query(sql, [studentId, year, semester], (err, results) => {
//         if (err) return res.status(500).json({ message: err.message });

//         // Fetch CGPA from users table
//         db.query('SELECT cgpa FROM users WHERE id = ?', [studentId], (err2, userRes) => {
//             if (err2) return res.status(500).json({ message: err2.message });
            
//             const cgpa = userRes[0]?.cgpa ?? null;
//             res.json({ results, cgpa });
//         });
//     });
// };


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

    // 1️⃣ Fetch student results
    const sqlResults = `
        SELECT s.name AS subject, r.marks_obtained
        FROM results r
        JOIN subjects s ON r.subject_id = s.id
        WHERE r.student_id = ? AND s.year = ? AND s.semester = ?
    `;

    db.query(sqlResults, [studentId, year, semester], (err, studentResults) => {
        if (err) return res.status(500).json({ message: err.message });

        // 2️⃣ Fetch CGPA
        db.query('SELECT cgpa FROM users WHERE id = ?', [studentId], (err2, userRes) => {
            if (err2) return res.status(500).json({ message: err2.message });
            const cgpa = userRes[0]?.cgpa ?? null;

            // 3️⃣ Fetch topper per subject
            const sqlToppers = `
                SELECT s.name AS subject, u.name AS topper_name, r.marks_obtained AS topper_marks
                FROM results r
                JOIN subjects s ON r.subject_id = s.id
                JOIN users u ON r.student_id = u.id
                WHERE s.year = ? AND s.semester = ?
                AND r.marks_obtained = (
                    SELECT MAX(r2.marks_obtained)
                    FROM results r2
                    WHERE r2.subject_id = s.id
                )
            `;

            db.query(sqlToppers, [year, semester], (err3, toppers) => {
                if (err3) return res.status(500).json({ message: err3.message });

                res.json({
                    results: studentResults,
                    cgpa,
                    toppers
                });
            });
        });
    });
};
