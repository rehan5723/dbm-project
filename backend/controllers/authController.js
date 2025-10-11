import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)";
    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).send(err);

        // Fetch the newly created user to get the ID
        db.query("SELECT * FROM users WHERE id = ?", [result.insertId], (err2, users) => {
            if (err2) return res.status(500).send(err2);
            const user = users[0];

            // Generate JWT
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

            // Send token and role to frontend
            res.json({ token, role: user.role, name: user.name });
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email=?", [email], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: "User not found" });

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).send({ message: "Wrong password" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role, name: user.name });
    });
};
