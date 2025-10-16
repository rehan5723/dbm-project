// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../axios'; // centralized axios instance

// export default function Login() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Validation
//     if (!form.email || !form.password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await API.post('/auth/login', form); // <-- uses centralized axios instance

//       // Backend should return: { token, role, name }
//       const { token, role, name } = res.data;

//       // Store JWT and user info
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);
//       localStorage.setItem('name', name);

//       // Redirect according to role
//       if (role === 'faculty') navigate('/faculty');
//       else navigate('/student');

//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">{error}</div>
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })}
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={e => setForm({ ...form, password: e.target.value })}
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full p-3 rounded text-white font-semibold transition-colors duration-200
//             ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>

//         <p className="text-center mt-4 text-gray-600">
//           Don't have an account?{' '}
//           <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate('/register')}>
//             Register
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      const { token, role, name } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);

      if (role === 'faculty') navigate('/faculty');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-6">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-6">
          to <span className="font-semibold text-indigo-600">Student Result Management System</span>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center font-medium shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transform transition-all duration-200 ${
              loading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Don’t have an account?{' '}
          <span
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
