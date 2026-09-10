import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Zap, Download, Layout, Shield, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    const staggerContainer = {
        animate: { transition: { staggerChildren: 0.15 } }
    };

    return (
        <div className="bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
                    <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div initial="initial" animate="animate" variants={fadeInUp} className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm mb-8 shadow-sm">
                            <Zap size={16} className="text-yellow-500 fill-yellow-500" />
                            <span>AI-Powered Resume Builder 2.0</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
                            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Dream Career</span><br />
                            One Resume at a Time
                        </h1>
                        <p className="mt-4 text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                            Professional, ATS-friendly resumes in minutes. Real-time editing, pixel-perfect exports, and premium templates designed to get you hired.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Link to="/create" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:shadow-slate-900/20 transform hover:-translate-y-1 w-full sm:w-auto overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    {user ? 'Go to Dashboard' : 'Build Resume Now'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            {!user && (
                                <Link to="/login" className="px-8 py-4 text-lg font-bold rounded-full text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm w-full sm:w-auto">
                                    Sign In to Save
                                </Link>
                            )}
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-green-500" /> No credit card required</span>
                            <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-green-500" /> Free PDF export</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* DASHBOARD PREVIEW */}
            <section className="relative pb-24 -mt-10 z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="rounded-2xl md:rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 bg-white p-2 md:p-4 overflow-hidden relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none h-full"></div>
                        <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 aspect-video relative flex items-center justify-center">
                            {/* Mock UI for preview */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                            <div className="relative z-10 flex flex-col md:flex-row gap-6 w-full max-w-4xl p-6">
                                {/* Left Side: Mock Editor Panel */}
                                <div className="w-full md:w-1/3 space-y-4">
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-100 text-blue-600 rounded flex items-center justify-center"><Zap size={10} /></div>
                                        <span className="text-xs font-bold text-slate-700">Personal Details</span>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 space-y-3">
                                        <div className="h-8 bg-slate-50 border border-slate-100 rounded flex items-center px-3 text-xs text-slate-600 font-medium">Jane Doe</div>
                                        <div className="h-8 bg-slate-50 border border-slate-100 rounded flex items-center px-3 text-xs text-slate-600 font-medium">jane.doe@example.com</div>
                                        <div className="h-16 bg-slate-50 border border-slate-100 rounded p-3 text-xs text-slate-400">Passionate software engineer with 5+ years of experience...</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-700">Experience</span>
                                        <div className="w-4 h-4 bg-slate-100 rounded flex items-center justify-center"><span className="text-[10px] font-bold text-slate-500">+</span></div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-700">Education</span>
                                        <div className="w-4 h-4 bg-slate-100 rounded flex items-center justify-center"><span className="text-[10px] font-bold text-slate-500">+</span></div>
                                    </div>
                                </div>

                                {/* Right Side: Mock Resume Preview */}
                                <div className="w-full md:w-2/3 bg-white h-64 md:h-96 rounded-xl shadow-lg border border-slate-200 p-8 flex flex-col gap-5 overflow-hidden">
                                    <div className="flex gap-6 items-center">
                                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-inner">
                                            JD
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-3xl font-black text-slate-900 tracking-tight">Jane Doe</h4>
                                            <p className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Senior Software Engineer</p>
                                            <div className="flex gap-3 text-xs text-slate-500 mt-2 font-medium">
                                                <span>New York, NY</span>
                                                <span>•</span>
                                                <span>jane.doe@example.com</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-px w-full bg-slate-100"></div>
                                    <div>
                                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Professional Summary</h5>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                            Results-driven Senior Software Engineer with over 5 years of experience in designing, developing, and deploying scalable web applications. Proficient in React, Node.js, and modern cloud architecture. Proven track record of improving system performance by 40% and leading cross-functional teams to deliver projects ahead of schedule.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-3">Powerfully Simple</h2>
                        <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Everything you need to stand out</h3>
                        <p className="text-xl text-slate-500 font-medium">Stop wrestling with word processors. We handle the formatting so you can focus on your achievements.</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12"
                    >
                        <FeatureCard
                            icon={<Zap className="w-7 h-7 text-white" />}
                            iconBg="bg-amber-500"
                            title="Instant & Intuitive"
                            desc="Create your resume in minutes with our block-based builder. Drag, drop, and edit with zero friction."
                        />
                        <FeatureCard
                            icon={<Layout className="w-7 h-7 text-white" />}
                            iconBg="bg-blue-500"
                            title="Premium Templates"
                            desc="Choose from a curated selection of designs. From strictly corporate to modern creative, we've got you covered."
                        />
                        <FeatureCard
                            icon={<FileText className="w-7 h-7 text-white" />}
                            iconBg="bg-emerald-500"
                            title="Live Preview"
                            desc="See exactly what the recruiter will see. Your edits reflect instantly on the pixel-perfect document."
                        />
                        <FeatureCard
                            icon={<Download className="w-7 h-7 text-white" />}
                            iconBg="bg-purple-500"
                            title="Export Anywhere"
                            desc="Download high-resolution PDFs that look identical everywhere, or export to editable DOCX for specific applications."
                        />
                        <FeatureCard
                            icon={<Shield className="w-7 h-7 text-white" />}
                            iconBg="bg-red-500"
                            title="ATS-Optimized"
                            desc="Our templates are cleanly structured under the hood to ensure robot scanners can read your data perfectly."
                        />
                        <FeatureCard
                            icon={<Globe className="w-7 h-7 text-white" />}
                            iconBg="bg-indigo-500"
                            title="Work Anywhere"
                            desc="Cloud-synced documents mean you can start on your laptop and make last-minute tweaks on your phone."
                        />
                    </motion.div>
                </div>
            </section>

            {/* CTA FOOTER */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 z-0"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Land Your Next Role?</h2>
                    <p className="text-blue-100 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
                        Join thousands of professionals who have accelerated their careers with our premium templates.
                    </p>
                    <Link to="/create" className="inline-block px-12 py-5 bg-white text-slate-900 rounded-full font-extrabold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300">
                        Create Your Resume — It's Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, iconBg, title, desc }) => (
    <motion.div
        variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all duration-300 border border-slate-100 group hover:-translate-y-1"
    >
        <div className={`mb-6 ${iconBg} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed font-medium">{desc}</p>
    </motion.div>
);

export default Home;
