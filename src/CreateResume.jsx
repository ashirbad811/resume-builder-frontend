import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateResume = () => {
    const [formData, setFormData] = useState({
        title: '',
        full_name: '',
        email: '',
        phone: '',
        address: '',
        summary: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/resumes`, formData);
            alert('Resume created: ' + response.data.message);
            navigate(`/resume/${response.data.id}`); // Navigate to detail view
        } catch (error) {
            console.error(error);
            alert('Error creating resume');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Resume</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Resume Title (e.g. Software Engineer)"
                        value={formData.title}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                        required
                    />
                </div>

                <h3 className="text-lg font-semibold mt-4">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Contact Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                    />
                </div>

                <h3 className="text-lg font-semibold mt-4">Professional Summary</h3>
                <textarea
                    name="summary"
                    placeholder="Brief summary of your professional background..."
                    value={formData.summary}
                    onChange={handleChange}
                    className="p-3 border rounded w-full h-32"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition font-semibold"
                >
                    Create Resume
                </button>
            </form>
        </div>
    );
};

export default CreateResume;
