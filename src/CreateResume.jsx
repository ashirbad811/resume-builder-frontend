import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, User, Mail, Phone, MapPin, AlignLeft, ArrowRight, ChevronLeft } from 'lucide-react';

const CreateResume = () => {
    const [formData, setFormData] = useState({
        title: '',
        full_name: '',
        email: '',
        phone: '',
        address: '',
        summary: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/resumes`, formData);
            navigate(`/resume`, { state: { id: response.data.id } }); // Navigate to detail view
        } catch (error) {
            console.error(error);
            alert('Error creating resume');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-400/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/resumes" className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors">
                        <ChevronLeft size={20} /> Back to Dashboard
                    </Link>

                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3"></div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black mb-2">Let's start your resume</h2>
                                <p className="text-blue-100/80 text-lg">Enter some basic details. You can always change these later.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            {/* Main Title Section */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
                                    <FileText size={18} className="text-blue-500" /> Document Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Senior Software Engineer - Google App"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg font-medium text-slate-800 placeholder:text-slate-400"
                                    required
                                    autoFocus
                                />
                            </div>

                            <hr className="border-slate-100" />

                            {/* Personal Details Section */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    Personal Details
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><User size={18} /></div>
                                            <input
                                                type="text"
                                                name="full_name"
                                                placeholder="John Doe"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 shadow-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Mail size={18} /></div>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 shadow-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Phone size={18} /></div>
                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Location</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><MapPin size={18} /></div>
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="City, State"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Summary Section */}
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                                    <AlignLeft size={18} className="text-slate-400" /> Professional Summary
                                </label>
                                <textarea
                                    name="summary"
                                    placeholder="Write a brief, compelling summary of your professional background, key skills, and what you bring to the table..."
                                    value={formData.summary}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all h-40 resize-none font-medium text-slate-700 shadow-sm leading-relaxed"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto md:ml-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-bold group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
                                >
                                    {isSubmitting ? 'Creating...' : 'Continue to Editor'}
                                    {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateResume;
