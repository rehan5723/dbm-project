import { useState, useEffect } from 'react';
import API from '../axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Icons = {
  Marks: '📝',
  AddStudent: '🧑‍🎓',
  Results: '📊',
  Subjects: '📚',
  Logout: '🚪',
  Expand: '>>',
  Collapse: '<<',
  Loading: '🔄',
};

export default function FacultyDashboard() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marksForm, setMarksForm] = useState({});
  const [selectedStudent, setSelectedStudent] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [cgpa, setCgpa] = useState(null);
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState('marks');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', password: '' });
  const [showFormula, setShowFormula] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const clsx = (...classes) => classes.filter(Boolean).join(' ');

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get('/faculty/students', { headers: { Authorization: `Bearer ${token}` } });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch students.');
    }
  };

  const fetchAllResults = async () => {
    setLoading(true);
    try {
      const res = await API.get('/faculty/results', { headers: { Authorization: `Bearer ${token}` } });
      const uniqueStudents = {};
      res.data.forEach(r => { if (!uniqueStudents[r.student]) uniqueStudents[r.student] = r.cgpa; });
      setResults(Object.entries(uniqueStudents).map(([name, cgpa]) => ({ name, cgpa })));
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch results.');
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (!year || !semester || !selectedStudent || activeTab !== 'marks') return;
    const fetchSubjectsAndMarks = async () => {
      try {
        const subRes = await API.get('/faculty/subjects', {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, semester },
        });
        setSubjects(subRes.data);
        const initialMarks = {};
        subRes.data.forEach(sub => (initialMarks[sub.name] = ''));
        const marksRes = await API.get('/faculty/results-by-student', {
          headers: { Authorization: `Bearer ${token}` },
          params: { student_id: selectedStudent, year, semester },
        });
        const savedMarks = marksRes.data;
        setMarksForm({ ...initialMarks, ...savedMarks });
        const student = students.find(s => s.id === selectedStudent);
        if (student) setCgpa(student.cgpa ?? null);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch subjects or marks.');
      }
    };
    fetchSubjectsAndMarks();
  }, [year, semester, selectedStudent, activeTab, students, token]);

  const handleMarksChange = (subject, value) => {
    let val = parseFloat(value);
    if (isNaN(val)) val = '';
    else if (val > 100) val = 100;
    else if (val < 0) val = 0;
    setMarksForm({ ...marksForm, [subject]: val });
  };

  const saveMarks = async () => {
    if (!selectedStudent) return toast.error('Select a student first');
    const allFilled = Object.values(marksForm).every(m => m !== '' && m !== null);
    if (!allFilled) return toast.error('Please fill all marks before saving');

    const payload = subjects.map(sub => ({
      student_id: selectedStudent,
      subject_id: sub.id,
      marks: marksForm[sub.name],
    }));

    setLoading(true);
    try {
      await API.post('/faculty/add-result-bulk', payload, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Marks saved! Now you can calculate CGPA.');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save marks.');
    } finally { setLoading(false); }
  };

  const calculateCGPA = async () => {
    if (!selectedStudent) return toast.error('Select a student first');
    setLoading(true);
    try {
      const res = await API.post('/faculty/calculate-cgpa', { student_id: selectedStudent }, { headers: { Authorization: `Bearer ${token}` } });
      setCgpa(res.data.cgpa);
      toast.success('CGPA calculated successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to calculate CGPA');
    } finally { setLoading(false); }
  };

  const handleAddStudent = async () => {
    const { name, email, password } = newStudent;
    if (!name || !email || !password) return toast.error('All fields are required');
    setLoading(true);
    try {
      await API.post('/faculty/add-student', newStudent, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Student added successfully!');
      setNewStudent({ name: '', email: '', password: '' });
      fetchStudents();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to add student');
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const SidebarButton = ({ icon, label, tabName, onClick }) => (
    <button
      className={clsx(
        'flex items-center p-3 mb-2 rounded-xl text-left transition-all duration-200',
        activeTab === tabName ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-gray-700 text-gray-200',
        !sidebarOpen && 'justify-center w-full'
      )}
      onClick={onClick}
    >
      <span className="text-xl mr-3">{icon}</span>
      {sidebarOpen && <span className="font-medium text-sm">{label}</span>}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <div className={clsx(
        'bg-gray-900 shadow-2xl z-20 flex flex-col transition-all duration-300',
        sidebarOpen ? 'w-64 p-6' : 'w-20 p-4'
      )}>
        <div className="flex justify-between items-center mb-8">
          {sidebarOpen && <h2 className="text-xl font-extrabold text-indigo-400 tracking-wider">SPPU Faculty</h2>}
          <button
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Collapse Menu' : 'Expand Menu'}
          >
            {sidebarOpen ? Icons.Collapse : Icons.Expand}
          </button>
        </div>

        <nav className="flex-1">
          <SidebarButton icon={Icons.Marks} label="Enter/Update Marks" tabName="marks" onClick={() => setActiveTab('marks')} />
          <SidebarButton icon={Icons.AddStudent} label="Add Student" tabName="addStudent" onClick={() => setActiveTab('addStudent')} />
          <SidebarButton icon={Icons.Results} label="View All Results" tabName="results" onClick={() => { setActiveTab('results'); fetchAllResults(); }} />
          <SidebarButton icon={Icons.Subjects} label="Subjects Info" tabName="subjects" onClick={() => setActiveTab('subjects')} />
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

        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">Faculty Dashboard</h1>

        {/* Marks Tab */}
        {activeTab === 'marks' && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-5">Enter/Update Marks</h2>
            <div className="mb-6 flex gap-4 flex-wrap">
              <select value={year} onChange={e => setYear(e.target.value)} className="border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                <option value="">Select Year</option>
                {[1, 2, 3, 4].map(y => <option key={y} value={y}>{`Year ${y}`}</option>)}
              </select>
              <select value={semester} onChange={e => setSemester(e.target.value)} className="border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                <option value="">Select Semester</option>
                {[1, 2].map(s => <option key={s} value={s}>{`Semester ${s}`}</option>)}
              </select>
              <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                <option value="">Select Student</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            {subjects.length > 0 && selectedStudent && (
              <>
                <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden shadow-md mb-6">
                  <thead className="bg-indigo-500 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Subject Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Marks (Max 100)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.map(sub => (
                      <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <input type="number" min="0" max="100" value={marksForm[sub.name] || ''} onChange={e => handleMarksChange(sub.name, e.target.value)} className="border border-gray-300 p-2 rounded-lg w-24 text-center focus:ring-indigo-500 focus:border-indigo-500" disabled={loading} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex gap-4">
                    <button onClick={saveMarks} className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50" disabled={loading}>
                      {loading ? `${Icons.Loading} Saving...` : 'Save Marks'}
                    </button>
                    <button onClick={calculateCGPA} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50" disabled={loading}>
                      {loading ? `${Icons.Loading} Calculating...` : 'Calculate CGPA'}
                    </button>
                  </div>

                  {cgpa !== null && (
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-inner">
                      <span className="text-lg font-bold text-gray-700">
                        Current CGPA: <span className="text-blue-600 text-2xl">{cgpa}</span>
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Add Student Tab */}
        {activeTab === 'addStudent' && (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-5">Add New Student Account</h2>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Full Name" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} className="border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              <input type="email" placeholder="Email (Login ID)" value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} className="border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              <input type="password" placeholder="Initial Password" value={newStudent.password} onChange={e => setNewStudent({ ...newStudent, password: e.target.value })} className="border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              <button onClick={handleAddStudent} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50" disabled={loading}>
                {loading ? `${Icons.Loading} Adding Student...` : 'Add Student'}
              </button>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-5">All Students CGPA Overview</h2>
            <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">Student Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider">CGPA</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map(r => (
                  <tr key={r.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{r.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-md font-bold text-indigo-600">{r.cgpa ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Subject Management & Project Info</h2>

            <div className="p-4 mb-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 rounded-lg">
              <p className="font-medium">Project Overview:</p>
              <p className="text-sm">
                This Faculty Dashboard project allows you to manage students, enter/update marks, calculate CGPA, 
                and view results and subjects. It simplifies academic tracking and provides quick CGPA calculation 
                for students across different years and semesters.
              </p>
            </div>

            <div className="p-4 mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowFormula(!showFormula)}>
                <p className="font-medium">Procedure for CGPA Calculation (Click to Toggle):</p>
                <span className="font-bold text-xl">{showFormula ? '-' : '+'}</span>
              </div>
              {showFormula && (
                <ol className="list-decimal ml-6 mt-2 text-sm">
                  <li>Faculty enters marks for all subjects of a student for a specific semester.</li>
                  <li>Click "Save Marks" to store marks in the database.</li>
                  <li>Click "Calculate CGPA" to compute the student's GPA for the semester based on:</li>
                  <li className="ml-4">
                    <span className="font-medium">CGPA = (Sum of (Grade Points × Subject Credits)) / Total Credits</span>
                  </li>
                  <li>The result is displayed instantly and stored in the database for future reference.</li>
                </ol>
              )}
            </div>

            {subjects.length > 0 && (
              <div className="overflow-x-auto">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Subjects List</h3>
                <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden shadow-md">
                  <thead className="bg-indigo-500 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Year</th>
                      <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Semester</th>
                      <th className="px-4 py-3 text-left text-sm font-medium tracking-wider">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.map(sub => (
                      <tr key={sub.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">{sub.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{sub.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{sub.year}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{sub.semester}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{sub.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
