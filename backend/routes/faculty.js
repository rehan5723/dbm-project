import express from 'express';
import { verifyToken, authorizeRole } from '../middleware/authMiddleware.js';
import { 
    addResult, 
    addResultBulk,
    viewAllResults, 
    getAllStudents, 
    addStudent,
    getSubjects,
    calculateCGPA // import new CGPA function
} from '../controllers/facultyController.js';

const router = express.Router();

// ----------------- Result Routes -----------------

// Add single result
router.post('/add-result', verifyToken, authorizeRole('faculty'), addResult);

// Add multiple results in bulk
router.post('/add-result-bulk', verifyToken, authorizeRole('faculty'), addResultBulk);

// View all results (faculty dashboard)
router.get('/results', verifyToken, authorizeRole('faculty'), viewAllResults);

// Calculate CGPA manually for a student
router.post('/calculate-cgpa', verifyToken, authorizeRole('faculty'), calculateCGPA);

// ----------------- Student Management Routes -----------------

// Get all students
router.get('/students', verifyToken, authorizeRole('faculty'), getAllStudents);

// Add new student
router.post('/add-student', verifyToken, authorizeRole('faculty'), addStudent);

// ----------------- Subject Routes -----------------

// Get subjects by year and semester
router.get('/subjects', verifyToken, authorizeRole('faculty'), getSubjects);

export default router;
