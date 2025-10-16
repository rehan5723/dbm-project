import { useState } from 'react';
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

  const clsx = (...classes) => classes.filter(Boolean).join(' ');

  const fetchResults = async () => {
    if (!year || !semester) return toast.error('Select Year and Semester');
    
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/student/results`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { year, semester }
      });

      const mergedResults = (res.data.results || []).map(r => {
        const topper = res.data.toppers?.find(t => t.subject === r.subject);
        return { ...r, topper_name: topper?.topper_name ?? '-', topper_marks: topper?.topper_marks ?? '-' };
      });

      setResults(mergedResults);
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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <div
        className={clsx(
          'bg-gradient-to-b from-indigo-700 to-indigo-900 shadow-2xl flex flex-col transition-all duration-300 backdrop-blur-lg',
          sidebarOpen ? 'w-64 p-6' : 'w-20 p-4'
        )}
      >
        <div className="flex justify-between items-center mb-8">
          {sidebarOpen && (
            <h2 className="text-xl font-extrabold text-white tracking-wider drop-shadow-lg">
              Student Portal
            </h2>
          )}
          <button
            className="text-indigo-200 hover:text-white transition-all duration-300 p-1 rounded-full"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Collapse Menu' : 'Expand Menu'}
          >
            {sidebarOpen ? Icons.Collapse : Icons.Expand}
          </button>
        </div>

        <nav className="flex-1">
          <button
            className={clsx(
              'flex items-center p-3 mb-3 rounded-xl transition-all duration-300',
              'bg-indigo-600 text-white shadow-md hover:bg-indigo-500 hover:shadow-lg',
              !sidebarOpen && 'justify-center w-full'
            )}
            onClick={fetchResults}
          >
            <span className="text-xl mr-3">{Icons.Results}</span>
            {sidebarOpen && <span className="font-medium text-sm">My Results</span>}
          </button>
        </nav>

        <div className="mt-auto pt-4 border-t border-indigo-600">
          <button
            className={clsx(
              'flex items-center p-3 rounded-xl w-full transition-colors duration-300',
              'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg',
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
      <div className="flex-1 p-10 relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm rounded-lg">
            <span className="text-3xl animate-spin text-indigo-600">{Icons.Loading}</span>
            <p className="ml-3 text-lg font-semibold text-gray-700">Fetching Results...</p>
          </div>
        )}

        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          🎓 Student Result Dashboard
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            value={year}
            onChange={e => setYear(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Year</option>
            {[1, 2, 3, 4].map(y => (
              <option key={y} value={y}>{`Year ${y}`}</option>
            ))}
          </select>

          <select
            value={semester}
            onChange={e => setSemester(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Semester</option>
            {[1, 2].map(s => (
              <option key={s} value={s}>{`Semester ${s}`}</option>
            ))}
          </select>

          <button
            onClick={fetchResults}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
          >
            Fetch Results
          </button>
        </div>

        {/* CGPA Display */}
        {cgpa !== null && (
          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-indigo-500 rounded-xl shadow-md mb-8 text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Your Current CGPA: <span className="text-indigo-600 text-2xl font-extrabold">{cgpa}</span>
            </h2>
          </div>
        )}

        {/* Results Table */}
        <div className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b pb-2">
            📘 Subject-wise Results
          </h2>
          <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Marks</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Topper</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Topper Marks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.length > 0 ? (
                results.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-indigo-50 transition-all duration-200"
                  >
                    <td className="px-6 py-3 text-gray-800 font-medium">{r.subject}</td>
                    <td className="px-6 py-3 text-gray-700">{r.marks_obtained}</td>
                    <td className="px-6 py-3 text-gray-700">{r.topper_name}</td>
                    <td className="px-6 py-3 text-gray-700">{r.topper_marks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-gray-400 py-5 italic"
                  >
                    No results available. Please select year and semester.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
