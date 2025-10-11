import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid token' });
    }
};

// Role check middleware
export const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).send({ message: 'Forbidden' });
    next();
};
