import express from 'express';
import { viewMyResults } from '../controllers/studentController.js';
import { verifyToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/results', verifyToken, authorizeRole('student'), viewMyResults);

export default router;
