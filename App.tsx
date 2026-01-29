import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ShoppingCart, User, Sun, Moon, Cloud, LogOut } from 'lucide-react';
import { useStore } from './useStore';
import Home from './Home';
import Catalog from './Catalog';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import UserProfile from './UserProfile';

function Navbar() {
  const { cart, darkMode, toggleDarkMode, currentUser, setAdmin, setUser } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-white/20 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Cloud className="h-8 w-8 text-dream-500" fill="currentColor" />
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-dream-500 to-purple-500 bg-clip-text text-transparent tracking-wide">
              Dream Cloud
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-dream-500 transition">Home</Link>
            <Link to="/catalog" className="text-gray-700 dark:text-gray-200 hover:text-dream-500 transition">Flavors</Link>
            <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-dream-500 transition">Login</Link>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>
            
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link to={currentUser ? "/profile" : "/admin/login"} className="p-2">
              <User className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </Link>

            {currentUser && (
              <button onClick={() => { setAdmin(false); setUser(null); }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full" title="Logout">
                <LogOut className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useStore();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dream-50 dark:bg-dream-dark transition-colors duration-300">
        <Navbar />
        <main className="pt-4 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            
            <Route path="/admin/login" element={<AdminLogin isAdminRoute={true} />} />
            <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/login" element={<AdminLogin isAdminRoute={false} />} />
          </Routes>
        </main>
        
        <footer className="bg-white dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-500">© 2026 Dream Cloud Ice Cream. Delivering happiness via bicycle.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}