import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResumeList = () => {
    const [resumes, setResumes] = useState([]);

    const fetchResumes = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/resumes`);
            setResumes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">My Resumes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumes.map(resume => (
                    <Link to={`/resume/${resume.id}`} key={resume.id} className="block group">
                        <div className="p-4 bg-white border rounded shadow hover:shadow-md transition group-hover:border-blue-300">
                            <h3 className="text-xl font-semibold text-blue-600">{resume.title}</h3>
                            <p className="text-gray-600">{resume.full_name}</p>
                            <p className="text-sm text-gray-400 mt-2">Last Updated: {new Date(resume.created_at).toLocaleDateString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ResumeList;
