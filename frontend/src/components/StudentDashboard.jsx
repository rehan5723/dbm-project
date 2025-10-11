import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Icons = {
  Results: '📊',
  Logout: '🚪',
  Expand: '>>',
  Collapse: '<<',
  Loading: '🔄',
};

export default function StudentDashboard() {
  const [results, setResults] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Utility for conditional class joining
  const clsx = (...classes) => classes.filter(Boolean).join(' ');

  // Fetch student results for selected year/semester
  const fetchResults = async () => {
    if (!year || !semester) return toast.error('Select Year and Semester');
    
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/student/results`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { year, semester }
      });
      setResults(res.data.results || []);
      setCgpa(res.data.cgpa ?? null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <div className={clsx(
        'bg-gray-900 shadow-2xl flex flex-col transition-all duration-300',
        sidebarOpen ? 'w-64 p-6' : 'w-20 p-4'
      )}>
        <div className="flex justify-between items-center mb-8">
          {sidebarOpen && <h2 className="text-xl font-extrabold text-indigo-400 tracking-wider">SPPU Student</h2>}
          <button
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Collapse Menu' : 'Expand Menu'}
          >
            {sidebarOpen ? Icons.Collapse : Icons.Expand}
          </button>
        </div>

        <nav className="flex-1">
          <button
            className={clsx(
              'flex items-center p-3 mb-2 rounded-xl text-left transition-all duration-200 bg-indigo-600 text-white shadow-lg',
              !sidebarOpen && 'justify-center w-full'
            )}
            onClick={fetchResults}
          >
            <span className="text-xl mr-3">{Icons.Results}</span>
            {sidebarOpen && <span className="font-medium text-sm">My Results</span>}
          </button>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            className={clsx(
              'flex items-center p-3 rounded-xl w-full transition-colors duration-200',
              'bg-red-700 text-white hover:bg-red-800',
              !sidebarOpen && 'justify-center'
            )}
            onClick={handleLogout}
          >
            <span className="text-xl mr-3">{Icons.Logout}</span>
            {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center z-50">
            <span className="text-3xl animate-spin text-indigo-600">{Icons.Loading}</span>
            <p className="ml-3 text-lg font-medium text-gray-700">Loading...</p>
          </div>
        )}

        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">My Dashboard</h1>

        {/* Semester/Year Selector */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <select value={year} onChange={e => setYear(e.target.value)} className="border border-gray-300 p-2 rounded-lg">
            <option value="">Select Year</option>
            {[1, 2, 3, 4].map(y => <option key={y} value={y}>{`Year ${y}`}</option>)}
          </select>
          <select value={semester} onChange={e => setSemester(e.target.value)} className="border border-gray-300 p-2 rounded-lg">
            <option value="">Select Semester</option>
            {[1, 2].map(s => <option key={s} value={s}>{`Semester ${s}`}</option>)}
          </select>
          <button onClick={fetchResults} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
            Fetch Results
          </button>
        </div>

        {/* CGPA Display */}
        {cgpa !== null && (
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-inner mb-6">
            <span className="text-lg font-bold text-gray-700">
              Current CGPA: <span className="text-blue-600 text-2xl">{cgpa}</span>
            </span>
          </div>
        )}

        {/* Results Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">My Results</h2>
          <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">Marks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{r.subject}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{r.marks_obtained}</td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center text-gray-400 py-4">No results available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
