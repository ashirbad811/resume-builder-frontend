import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const res = await register(username, email, password);
        if (res.success) {
            navigate('/resumes');
        } else {
            setError(res.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-stretch bg-white font-sans">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
                <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[20%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
                
                <div className="relative z-10 max-w-lg text-center px-12">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-8 border border-white/20 transform rotate-3">
                        <ShieldCheck className="text-blue-400 w-10 h-10" />
                    </div>
                    <h3 className="text-4xl font-black text-white mb-6 leading-tight">Your career journey starts here.</h3>
                    <p className="text-lg text-blue-100/80 font-medium">Create a free account to build, save, and export unlimited professional resumes.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative z-10 bg-slate-50 lg:bg-white">
                <div className="w-full max-w-md">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link to="/" className="lg:hidden flex items-center gap-2 text-slate-800 font-bold text-xl tracking-tight mb-12 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            ResumeBuilder
                        </Link>
                        
                        <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900">Create an account</h2>
                        <p className="text-slate-500 mb-8 font-medium">Join us and start building your resume today.</p>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 flex items-start gap-2">
                                <span className="block mt-0.5">⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="johndoe"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 shadow-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 shadow-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all font-bold flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 mt-4"
                            >
                                {isLoading ? 'Creating account...' : 'Create account'}
                                {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                        
                        <p className="mt-8 text-center text-sm font-medium text-slate-500">
                            Already have an account? <Link to="/login" className="text-slate-900 hover:text-blue-600 font-semibold underline decoration-2 underline-offset-4 decoration-slate-200 hover:decoration-blue-600 transition-all">Sign in</Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;
