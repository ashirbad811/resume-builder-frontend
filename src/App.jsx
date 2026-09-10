import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, FileText, LogOut } from 'lucide-react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import CreateResume from './CreateResume';
import ResumeList from './ResumeList';
import ResumeDetail from './ResumeDetail';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Navbar Component
const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 print:hidden ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all transform group-hover:-translate-y-0.5">
              <span className="text-white font-black text-xl">R</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-800">Resume<span className="text-blue-600">Builder</span></span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/create" className="px-4 py-2 rounded-lg text-slate-600 font-medium hover:text-blue-600 hover:bg-blue-50 transition-all">Create Resume</Link>
            {user && (
              <Link to="/resumes" className="px-4 py-2 rounded-lg text-slate-600 font-medium hover:text-blue-600 hover:bg-blue-50 transition-all">My Resumes</Link>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-700 font-semibold text-sm pr-1">{user.username}</span>
                </div>
                <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-600 font-medium hover:text-blue-600 px-4 py-2 transition-colors">Login</Link>
                <Link to="/register" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-slate-100 absolute w-full left-0 top-full"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/create" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3">
                <FileText size={18} /> Create Resume
              </Link>
              {user && (
                <Link to="/resumes" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3">
                  <LayoutDashboard size={18} /> My Resumes
                </Link>
              )}
              <div className="border-t border-slate-200 my-2 pt-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm text-slate-500 font-medium">Logged in as {user.username}</div>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors flex items-center gap-3">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 px-2 mt-4">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center px-4 py-3 border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-colors">Login</Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center px-4 py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-700 transition-colors">Get Started</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
          <Navbar />
          <div className="pt-20 pb-10 print:pt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/create" element={<CreateResume />} />
              <Route path="/resumes" element={
                <ProtectedRoute>
                  <ResumeList />
                </ProtectedRoute>
              } />
              <Route path="/resume" element={<ResumeDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
