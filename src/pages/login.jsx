// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost/screenseats/login.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Store user session/token
//         localStorage.setItem('user', JSON.stringify(data.user));
//         navigate('/');
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError('Server error. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />
//       <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div>
//             <h2 className="mt-6 text-center text-3xl font-bold text-slate-800">
//               Sign in to your account
//             </h2>
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="text-red-500 text-center text-sm">
//                 {error}
//               </div>
//             )}
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div>
//                 <input
//                   type="email"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
//                   placeholder="Email address"
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/screenseats/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-gray-100 border border-gray-300 py-10 rounded-xl px-5 space-y-12">
          <div>
            <h2 className="text-center text-3xl font-bold text-orange-500/50">
              Log In
            </h2>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-center text-sm">
                {error}
              </div>
            )}
            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-orange-700 bg-orange-600/30 hover:bg-orange-600/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;