import { useState, useEffect } from 'react';
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
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [statusColor, setStatusColor] = useState('text-yellow-500');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        // Determine API URL based on auth status or just ping
        // Since test-db is not protected, this is fine
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/test-db`);
        if (response.data.message) {
          setBackendStatus('Connected');
          setStatusColor('text-green-500');
        }
      } catch (error) {
        setBackendStatus('Disconnected');
        setStatusColor('text-red-500');
      }
    };
    checkBackend();
  }, []);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">ResumeBuilder</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/create" className="text-slate-600 hover:text-blue-600 transition-colors">Create Resume</Link>
            {user && (
              <Link to="/resumes" className="text-slate-600 hover:text-blue-600 transition-colors">My Resumes</Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            {/* <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 ${statusColor} border border-slate-200 hidden md:block`}>
              DB: {backendStatus}
            </span> */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-slate-700 font-medium">Hi, {user.username}</span>
                <button onClick={logout} className="text-sm text-red-600 hover:text-red-700 font-medium">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-slate-600 hover:text-blue-600 px-3 py-2">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
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
              <Route path="/resume/:id" element={<ResumeDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
