import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Signup = () => {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
   username: '',
   email: '',
   password: '',
   confirmPassword: '',
   full_name: '',
   company_name: '',
   role: 'buyer'
 });
 const [error, setError] = useState('');

 const handleSubmit = async (e) => {
   e.preventDefault();
   
   if (formData.password !== formData.confirmPassword) {
     setError('Passwords do not match');
     return;
   }

   try {
     console.log('Sending registration data:', formData);
     const response = await fetch('http://localhost:5000/api/users/register', {
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
     console.error('Registration error:', err);
     setError('Server error. Please try again.');
   }
 };

 return (
   <div className="min-h-screen bg-slate-50">
     <Navbar />
     <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
       <div className="max-w-md w-full bg-gray-100 border border-gray-300 py-8 rounded-xl px-5 space-y-6">
         <h2 className="text-center text-3xl font-bold text-gray-950">
           Sign Up
         </h2>
         
         <form className="space-y-6" onSubmit={handleSubmit}>
           {error && (
             <div className="text-red-500 text-center text-sm">
               {error}
             </div>
           )}
           <div className="flex items-center justify-center space-x-3">
             <button
               type="button"
               className={`px-4 py-2 rounded-lg text-sm font-medium ${
                 formData.role === 'buyer'
                   ? 'bg-gray-900 text-gray-50'
                   : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
               }`}
               onClick={() => setFormData({...formData, role: 'buyer', company_name: ''})}
             >
               Buyer
             </button>
             <button
               type="button"
               className={`px-4 py-2 rounded-lg text-sm font-medium ${
                 formData.role === 'seller'
                   ? 'bg-gray-900 text-gray-50'
                   : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
               }`}
               onClick={() => setFormData({...formData, role: 'seller'})}
             >
               Seller
             </button>
           </div>
           <div className="space-y-4">
             <input
               type="text"
               required
               className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
               placeholder="Username"
               value={formData.username}
               onChange={(e) => setFormData({...formData, username: e.target.value})}
             />
             <input
               type="text"
               required
               className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
               placeholder="Full Name"
               value={formData.full_name}
               onChange={(e) => setFormData({...formData, full_name: e.target.value})}
             />
             {formData.role === 'seller' && (
               <input
                 type="text"
                 required
                 className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                 placeholder="Company Name"
                 value={formData.company_name}
                 onChange={(e) => setFormData({...formData, company_name: e.target.value})}
               />
             )}
             <input
               type="email"
               required
               className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
               placeholder="Email address"
               value={formData.email}
               onChange={(e) => setFormData({...formData, email: e.target.value})}
             />
             <input
               type="password"
               required
               className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
               placeholder="Password"
               value={formData.password}
               onChange={(e) => setFormData({...formData, password: e.target.value})}
             />
             <input
               type="password"
               required
               className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
               placeholder="Confirm Password"
               value={formData.confirmPassword}
               onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
             />
           </div>
           
           <div>
             <button
               type="submit"
               className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-gray-50 bg-gray-950 hover:bg-gray-600/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
             >
               Create Account
             </button>
           </div>
         </form>
         <div className="text-center">
           <p className="text-sm text-gray-600">
             Already have an account?{' '}
             <span 
               onClick={() => navigate('/login')} 
               className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer"
             >
               Login
             </span>
           </p>
         </div>
       </div>
     </div>
     <Footer />
   </div>
 );
};

export default Signup;