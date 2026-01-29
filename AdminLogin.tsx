import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './useStore';
import { Lock, Cloud, User, Mail, Gift } from 'lucide-react';

export default function AdminLogin({ isAdminRoute = false }: { isAdminRoute?: boolean }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [showDiscount, setShowDiscount] = useState(false);
  const navigate = useNavigate();
  const { setAdmin, setUser, setFirstOrderDiscount } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock secure authentication
    if (isAdminRoute) {
      if (email === 'admin@dreamcloud.com' && password === 'admin123') {
        setAdmin(true);
        setUser(email);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid Admin Credentials.');
      }
    } else {
      if (isSignup) {
        // Handle Signup
        if (email && password && username) {
          setUser(username);
          setFirstOrderDiscount(true);
          setShowDiscount(true);
          setTimeout(() => {
            navigate('/catalog');
          }, 3000);
        } else {
          setError('Please fill all fields.');
        }
      } else {
        // Handle User Login
        if (email === 'user@dreamcloud.com' && password === 'user123') {
          setUser('Ice Cream Lover');
          navigate('/profile');
        } else {
          setError('Invalid User Credentials.');
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dream-50 via-white to-dream-100 dark:from-gray-900 dark:via-gray-800 dark:to-black px-4 transition-colors duration-500">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full bg-white/30 dark:bg-gray-900/50 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 dark:border-gray-700/50 relative z-10 hover:shadow-dream-500/20 transition-all duration-500 hover:border-white/80 dark:hover:border-gray-600">
        
        {showDiscount && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl animate-in fade-in zoom-in duration-500">
            <Gift className="w-24 h-24 text-pink-500 mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">Welcome!</h2>
            <p className="text-xl font-bold text-gray-800 dark:text-white">10% OFF Unlocked! 🎉</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting to catalog...</p>
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-dream-100 to-white p-4 rounded-full mb-4 shadow-lg group hover:scale-110 transition-transform duration-300">
            {isAdminRoute ? <Lock className="h-8 w-8 text-dream-500" /> : <User className="h-8 w-8 text-dream-500" />}
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white tracking-wide mb-2">
            {isAdminRoute ? 'Admin Portal' : (isSignup ? 'Join the Dream' : 'User Login')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-sans">{isAdminRoute ? 'Authorized Personnel Only' : 'Sweetness awaits you'}</p>
        </div>

        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm text-red-500 p-3 rounded-xl mb-6 text-sm text-center font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {isSignup && !isAdminRoute && (
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1 transition-colors group-hover:text-dream-500">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-dream-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-md" placeholder="IceCreamLover" />
            </div>
          )}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1 transition-colors group-hover:text-dream-500">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-dream-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-md" placeholder={isAdminRoute ? "admin@dreamcloud.com" : "user@dreamcloud.com"} />
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1 transition-colors group-hover:text-dream-500">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 dark:text-white focus:ring-2 focus:ring-dream-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-md" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-dream-500 to-purple-500 hover:from-dream-600 hover:to-purple-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-dream-500/40 hover:scale-[1.02] active:scale-[0.98]">
            {isAdminRoute ? 'Admin Login' : (isSignup ? 'Sign Up & Get 10% Off' : 'Login')}
          </button>

          {!isAdminRoute && (
            <div className="text-center mt-4">
              <button type="button" onClick={() => { setIsSignup(!isSignup); setError(''); }} className="text-sm text-dream-500 hover:text-dream-600 font-medium underline decoration-dashed underline-offset-4">
                {isSignup ? 'Already have an account? Login' : 'New here? Create an account'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}