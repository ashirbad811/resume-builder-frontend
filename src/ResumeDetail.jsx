import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Printer, ChevronLeft, LayoutTemplate, FileDown, Edit2, Save } from 'lucide-react';
import templates, { demoResumeData } from './ResumeTemplates';
import { generateDocx } from './utils/docxGenerator';
import { useAuth } from './context/AuthContext';
import FormSection from './components/FormSection';
import { X, Check } from 'lucide-react';

const ResumeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(0);


    const fetchResume = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/resumes/${id}`);
            setResume(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            if (error.response?.status === 404 || error.response?.status === 403) {
                navigate(user ? '/resumes' : '/');
            }
        }
    };

    useEffect(() => {
        fetchResume();
    }, [id]);

    const handleUpdatePersonalDetails = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/resumes/${id}`, {
                title: resume.title,
                full_name: resume.full_name,
                email: resume.email,
                phone: resume.phone,
                address: resume.address,
                summary: resume.summary
            });
            alert('Personal details saved!');
        } catch (error) {
            console.error(error);
            alert('Failed to save details');
        }
    };

    const handleCrud = async (action, section, data, itemId = null) => {
        try {
            if (action === 'add') {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/resumes/${id}/${section}`, data);
            } else if (action === 'update') {
                await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/resumes/${id}/${section}/${itemId}`, data);
            } else if (action === 'delete') {
                if (!confirm('Are you sure?')) return;
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/resumes/${id}/${section}/${itemId}`);
            }
            fetchResume();
        } catch (error) {
            console.error(error);
            alert('Operation failed');
        }
    };

    const handlePrint = () => window.print();
    const handleDownloadDocx = () => resume && generateDocx(resume);

    if (loading) return (
        <div className="flex justify-center items-center h-screen text-blue-600">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></motion.div>
        </div>
    );

    if (!resume) return <div className="p-10 text-center text-red-500 font-bold text-xl">Resume not found</div>;

    const SelectedTemplateComponent = templates[selectedTemplate];

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-10 print:hidden border-b border-slate-200">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to={user ? "/resumes" : "/"} className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
                            <ChevronLeft size={20} /> Back
                        </Link>
                        <h1 className="text-xl font-bold text-slate-800 truncate max-w-xs">{resume.title}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">

                        </div>

                        <button onClick={handleDownloadDocx} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition font-medium">
                            <FileDown size={18} /> <span>DOCX</span>
                        </button>

                        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium shadow-sm hover:shadow">
                            <Printer size={18} /> <span>PDF</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1920px] mx-auto p-6 lg:p-8 flex flex-col lg:flex-row gap-8">

                {/* Editor Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-1/3 xl:w-1/4 space-y-8 print:hidden h-[calc(100vh-100px)] overflow-y-auto pr-2 custom-scrollbar pb-20"
                >
                    {/* Personal Details Form */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-4 text-slate-800">
                            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Edit2 size={18} /></div>
                            <h3 className="font-bold text-lg">Personal Details</h3>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdatePersonalDetails(); }} className="space-y-3">
                            <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition" placeholder="Resume Title" value={resume.title || ''} onChange={e => setResume({ ...resume, title: e.target.value })} />
                            <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition" placeholder="Full Name" value={resume.full_name || ''} onChange={e => setResume({ ...resume, full_name: e.target.value })} />
                            <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition" placeholder="Email" value={resume.email || ''} onChange={e => setResume({ ...resume, email: e.target.value })} />
                            <div className="flex gap-3">
                                <input className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition" placeholder="Phone" value={resume.phone || ''} onChange={e => setResume({ ...resume, phone: e.target.value })} />
                                <input className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition" placeholder="Address" value={resume.address || ''} onChange={e => setResume({ ...resume, address: e.target.value })} />
                            </div>
                            <textarea className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition h-24 resize-none" placeholder="Professional Summary" value={resume.summary || ''} onChange={e => setResume({ ...resume, summary: e.target.value })} />

                            <button type="submit" className="w-full bg-slate-800 text-white py-2.5 rounded-lg hover:bg-slate-900 transition flex justify-center items-center gap-2 font-medium">
                                <Save size={18} /> Save Details
                            </button>
                        </form>
                    </div>
                    <FormSection
                        title="Experience"
                        items={resume.experience}
                        color="blue"
                        fields={[
                            { name: 'role', placeholder: 'Role', required: true },
                            { name: 'company', placeholder: 'Company', required: true },
                            { name: 'start_date', placeholder: 'Start Date' },
                            { name: 'end_date', placeholder: 'End Date' },
                            { name: 'description', placeholder: 'Description', type: 'textarea' }
                        ]}
                        onAdd={(data) => handleCrud('add', 'experience', data)}
                        onUpdate={(id, data) => handleCrud('update', 'experience', data, id)}
                        onDelete={(id) => handleCrud('delete', 'experience', null, id)}
                    />

                    <FormSection
                        title="Education"
                        items={resume.education}
                        color="purple"
                        fields={[
                            { name: 'institution', placeholder: 'Institution', required: true },
                            { name: 'degree', placeholder: 'Degree', required: true },
                            { name: 'start_date', placeholder: 'Start Date' },
                            { name: 'end_date', placeholder: 'End Date' }
                        ]}
                        onAdd={(data) => handleCrud('add', 'education', data)}
                        onUpdate={(id, data) => handleCrud('update', 'education', data, id)}
                        onDelete={(id) => handleCrud('delete', 'education', null, id)}
                    />

                    <FormSection
                        title="Skills"
                        items={resume.skills}
                        color="emerald"
                        fields={[
                            { name: 'skill', placeholder: 'Skill', required: true },
                            { name: 'level', placeholder: 'Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }
                        ]}
                        onAdd={(data) => handleCrud('add', 'skills', data)}
                        onUpdate={(id, data) => handleCrud('update', 'skills', data, id)} // Note: Backend handles update now? I added generic routes? Yes.
                        onDelete={(id) => handleCrud('delete', 'skills', null, id)}
                    />

                    <FormSection
                        title="Projects"
                        items={resume.projects}
                        color="orange"
                        fields={[
                            { name: 'title', placeholder: 'Project Title', required: true },
                            { name: 'link', placeholder: 'Link (optional)' },
                            { name: 'description', placeholder: 'Description', type: 'textarea' },
                            { name: 'start_date', placeholder: 'Start Date' },
                            { name: 'end_date', placeholder: 'End Date' }
                        ]}
                        onAdd={(data) => handleCrud('add', 'projects', data)}
                        onUpdate={(id, data) => handleCrud('update', 'projects', data, id)}
                        onDelete={(id) => handleCrud('delete', 'projects', null, id)}
                    />

                    <FormSection
                        title="Languages"
                        items={resume.languages}
                        color="pink"
                        fields={[
                            { name: 'language', placeholder: 'Language', required: true },
                            { name: 'proficiency', placeholder: 'Proficiency', type: 'select', options: ['Basic', 'Conversational', 'Fluent', 'Native'] }
                        ]}
                        onAdd={(data) => handleCrud('add', 'languages', data)}
                        onUpdate={(id, data) => handleCrud('update', 'languages', data, id)}
                        onDelete={(id) => handleCrud('delete', 'languages', null, id)}
                    />

                    <FormSection
                        title="Certifications"
                        items={resume.certifications}
                        color="indigo"
                        fields={[
                            { name: 'name', placeholder: 'Certification Name', required: true },
                            { name: 'issuer', placeholder: 'Issuer' },
                            { name: 'date', placeholder: 'Date' }
                        ]}
                        onAdd={(data) => handleCrud('add', 'certifications', data)}
                        onUpdate={(id, data) => handleCrud('update', 'certifications', data, id)}
                        onDelete={(id) => handleCrud('delete', 'certifications', null, id)}
                    />

                    <FormSection
                        title="Interests"
                        items={resume.interests}
                        color="blue"
                        fields={[
                            { name: 'name', placeholder: 'Interest/Hobby', required: true },
                        ]}
                        onAdd={(data) => handleCrud('add', 'interests', data)}
                        onUpdate={(id, data) => handleCrud('update', 'interests', data, id)}
                        onDelete={(id) => handleCrud('delete', 'interests', null, id)}
                    />

                    <FormSection
                        title="Achievements"
                        items={resume.achievements}
                        color="purple"
                        fields={[
                            { name: 'title', placeholder: 'Achievement Title', required: true },
                            { name: 'date', placeholder: 'Date' },
                            { name: 'description', placeholder: 'Description', type: 'textarea' }
                        ]}
                        onAdd={(data) => handleCrud('add', 'achievements', data)}
                        onUpdate={(id, data) => handleCrud('update', 'achievements', data, id)}
                        onDelete={(id) => handleCrud('delete', 'achievements', null, id)}
                    />

                    <FormSection
                        title="Activities"
                        items={resume.activities}
                        color="emerald"
                        fields={[
                            { name: 'description', placeholder: 'Activity Description', required: true, type: 'textarea' },
                        ]}
                        onAdd={(data) => handleCrud('add', 'activities', data)}
                        onUpdate={(id, data) => handleCrud('update', 'activities', data, id)}
                        onDelete={(id) => handleCrud('delete', 'activities', null, id)}
                    />

                </motion.div>

                {/* Preview Panel */}
                <div className="flex-1 flex justify-center bg-slate-200/50 p-8 rounded-xl overflow-auto print:bg-white print:p-0 print:overflow-visible">
                    <div className="print:w-full w-full max-w-[210mm]">
                        <SelectedTemplateComponent data={resume} />
                    </div>
                </div>

                {/* Template Sidebar */}
                <div className="w-full lg:w-80 print:hidden h-[calc(100vh-100px)] overflow-y-auto pr-2 custom-scrollbar pb-20">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 sticky top-0">
                        <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                            <LayoutTemplate size={18} /> Templates
                        </h3>
                        <div className="space-y-4">
                            {templates.map((Template, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedTemplate(index)}
                                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedTemplate === index ? 'border-blue-600 ring-2 ring-blue-100 scale-[1.02]' : 'border-slate-100 hover:border-blue-300 hover:shadow-md'}`}
                                >
                                    <div className="aspect-[210/297] bg-slate-50 relative pointer-events-none">
                                        <div className="absolute inset-0 transform origin-top-left scale-[0.22] w-[455%] h-[455%]">
                                            <Template data={demoResumeData} />
                                        </div>
                                        {selectedTemplate === index && (
                                            <div className="absolute inset-0 bg-blue-900/10 flex items-center justify-center">
                                                <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">Active</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2 bg-white text-center text-sm font-medium text-slate-600 border-t border-slate-100">
                                        Template {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumeDetail;
