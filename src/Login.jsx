import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/resumes');
        } else {
            setError(res.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-stretch bg-white font-sans">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative z-10">
                <div className="w-full max-w-md">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link to="/" className="inline-flex items-center gap-2 text-slate-800 font-bold text-xl tracking-tight mb-12 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            ResumeBuilder
                        </Link>
                        
                        <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900">Welcome back</h2>
                        <p className="text-slate-500 mb-8 font-medium">Please enter your details to sign in.</p>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 flex items-start gap-2">
                                <span className="block mt-0.5">⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
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
                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold text-slate-700">Password</label>
                                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                        required
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl hover:bg-blue-600 transition-all font-bold flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-4"
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                                {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                        
                        <p className="mt-8 text-center text-sm font-medium text-slate-500">
                            Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-4 decoration-blue-200 hover:decoration-blue-600 transition-all">Sign up</Link>
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-slate-50 relative overflow-hidden items-center justify-center border-l border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
                <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-400/20 rounded-full blur-[100px] mix-blend-multiply"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] bg-purple-400/20 rounded-full blur-[100px] mix-blend-multiply"></div>
                
                <div className="relative z-10 max-w-lg text-center px-12">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-8 border border-slate-100 transform -rotate-6">
                        <Zap className="text-yellow-500 w-10 h-10 fill-yellow-500" />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Create a resume that gets you hired.</h3>
                    <p className="text-lg text-slate-600 font-medium">Join thousands of professionals who successfully landed their dream jobs using our ATS-friendly templates.</p>
                </div>
                
                {/* Decorative Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiM5NDBhMWUiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50"></div>
            </div>
        </div>
    );
};

export default Login;
