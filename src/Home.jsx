import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Zap, Download, Layout, Shield, Globe } from 'lucide-react';
import { useAuth } from './context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="bg-slate-50 font-sans">
            {/* HER SECTOIN */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div initial="initial" animate="animate" variants={fadeInUp}>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dream Career</span><br />
                            One Resume at a Time
                        </h1>
                        <p className="mt-4 text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Professional, ATS-friendly resumes in minutes. No sign-up required to try.
                            Real-time editing, PDF & Word exports, and premium templates.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/create" className="px-8 py-4 text-lg font-bold rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                                {user ? 'Create New Resume' : 'Build Resume Now'}
                            </Link>
                            {!user && (
                                <Link to="/login" className="px-8 py-4 text-lg font-bold rounded-full shadow-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all">
                                    Sign In / Register
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose ResumeBuilder?</h2>
                        <p className="text-lg text-slate-500">Everything you need to create a professional resume that gets results.</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-yellow-500" />}
                            title="Instant & Easy"
                            desc="Create your resume in minutes with our intuitive builder. No complex formatting needed."
                        />
                        <FeatureCard
                            icon={<Layout className="w-8 h-8 text-blue-500" />}
                            title="10+ Professional Templates"
                            desc="Choose from a variety of ATS-friendly designs ranging from modern to professional."
                        />
                        <FeatureCard
                            icon={<FileText className="w-8 h-8 text-green-500" />}
                            title="Real-Time Preview"
                            desc="See changes instantly as you type. What you see is exactly what you get."
                        />
                        <FeatureCard
                            icon={<Download className="w-8 h-8 text-purple-500" />}
                            title="PDF & DOCX Export"
                            desc="Download your resume in high-quality PDF or editable Word format for free."
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-red-500" />}
                            title="ATS Optimized"
                            desc="Our templates are designed to pass Applicant Tracking Systems so you get noticed."
                        />
                        <FeatureCard
                            icon={<Globe className="w-8 h-8 text-indigo-500" />}
                            title="Guest Access"
                            desc="Start building immediately without creating an account. Sign up later to save your history."
                        />
                    </motion.div>
                </div>
            </section>

            {/* TEMPLATE PREVIEW BANNER */}
            <section className="py-20 bg-slate-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Professional Designs</h2>
                    <p className="text-slate-400">Stand out with our curated collection of resume templates.</p>
                </div>

                {/* Mock Template Row */}
                <div className="flex justify-center gap-6 opacity-80 scale-90 sm:scale-100 flex-wrap">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-48 h-64 bg-white rounded shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 overflow-hidden relative group">
                            <div className="absolute top-0 left-0 w-full h-full bg-slate-200 animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                                <span className="font-bold">Template {i}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link to="/create" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-2">
                        View All Templates <Layout size={18} />
                    </Link>
                </div>
            </section>

            {/* CTA FOOTER */}
            <section className="py-24 bg-blue-600 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Land Your Next Job?</h2>
                    <p className="text-blue-100 text-xl mb-10">Join thousands of professionals who have built their resumes with us.</p>
                    <Link to="/create" className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transition-colors">
                        Get Started for Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
        }}
        className="bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-slate-100"
    >
        <div className="mb-4 bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
);

export default Home;
