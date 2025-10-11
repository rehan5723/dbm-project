import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FacultyDashboard from './components/FacultyDashboard';
import StudentDashboard from './components/StudentDashboard';

// Protected route component
const ProtectedRoute = ({ roleRequired, children }) => {
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    setRole(localStorage.getItem('role')); // update role on mount
  }, []);

  if (!role) return <Navigate to="/login" replace />; // not logged in
  if (role !== roleRequired) return <Navigate to="/login" replace />; // wrong role
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Login & Register */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Faculty Dashboard */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute roleRequired="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={
            <ProtectedRoute roleRequired="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
