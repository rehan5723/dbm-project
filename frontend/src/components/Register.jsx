// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../axios'; // centralized axios instance

// export default function Register() {
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Validation
//     if (!form.name || !form.email || !form.password || !form.role) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Call backend register endpoint
//       const res = await API.post('/auth/register', form);

//       // Backend now returns: { token, role, name }
//       const { token, role, name } = res.data;

//       // Store token and role in localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);
//       localStorage.setItem('name', name);

//       // Redirect automatically based on role
//       if (role === 'faculty') navigate('/faculty');
//       else navigate('/student');

//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">{error}</div>
//         )}

//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//         />

//         <select
//           value={form.role}
//           onChange={(e) => setForm({ ...form, role: e.target.value })}
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//         >
//           <option value="student">Student</option>
//           <option value="faculty">Faculty</option>
//         </select>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full p-3 rounded text-white font-semibold transition-all duration-200
//             ${loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
//         >
//           {loading ? 'Registering...' : 'Register'}
//         </button>

//         <p className="text-center mt-4 text-gray-600">
//           Already have an account?{' '}
//           <span
//             className="text-green-500 cursor-pointer hover:underline"
//             onClick={() => navigate('/')}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios'; // centralized axios instance

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.role) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/register', form);
      const { token, role, name } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);

      if (role === 'faculty') navigate('/faculty');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 p-6">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Create an Account 🎓
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join the <span className="font-semibold text-green-600">Student Result Management System</span>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center font-medium shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transform transition-all duration-200 ${
              loading
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 hover:scale-[1.02]'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{' '}
          <span
            className="text-green-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
