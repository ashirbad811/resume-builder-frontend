import { useState } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

const FormSection = ({ title, items, fields, onAdd, onUpdate, onDelete, color = 'blue' }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState({});

    // Initialize form data based on fields
    const resetForm = () => {
        const initial = {};
        fields.forEach(f => initial[f.name] = '');
        setFormData(initial);
        setIsEditing(null);
    };

    const handleEditClick = (item) => {
        setIsEditing(item.id);
        setFormData(item);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onUpdate(isEditing, formData);
        } else {
            onAdd(formData);
        }
        resetForm();
    };

    const getColorClass = (type) => {
        const map = {
            blue: 'bg-blue-100 text-blue-600 border-blue-200 focus:ring-blue-500',
            purple: 'bg-purple-100 text-purple-600 border-purple-200 focus:ring-purple-500',
            emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200 focus:ring-emerald-500',
            orange: 'bg-orange-100 text-orange-600 border-orange-200 focus:ring-orange-500',
            pink: 'bg-pink-100 text-pink-600 border-pink-200 focus:ring-pink-500',
            indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200 focus:ring-indigo-500',
        };
        return map[color] || map.blue;
    };

    const btnColor = getColorClass(color).split(' ')[1]; // text-blue-600

    return (
        <div className="space-y-4">
            {/* List Items */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                {items?.length === 0 && <p className="text-gray-400 text-sm">No items yet</p>}
                <ul className="space-y-2">
                    {items?.map(item => (
                        <li key={item.id} className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100 text-sm group hover:border-slate-300 transition">
                            <div className="truncate w-32 font-medium">
                                {item[fields[0].name] || item[fields[1]?.name] || 'Item'}
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                <button onClick={() => handleEditClick(item)} className={`p-1 hover:bg-${color}-50 text-${color}-600 rounded`}><Edit2 size={14} /></button>
                                <button onClick={() => onDelete(item.id)} className="p-1 hover:bg-red-50 text-red-600 rounded"><Trash2 size={14} /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Add/Edit Form */}
            <div className={`p-6 rounded-xl shadow-sm border bg-white border-slate-200`}>
                <div className="flex items-center gap-2 mb-4 text-slate-800 justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${getColorClass(color).split(' ')[0]} ${getColorClass(color).split(' ')[1]}`}>
                            {isEditing ? <Edit2 size={18} /> : <Plus size={18} />}
                        </div>
                        <h3 className="font-bold text-lg">{isEditing ? `Edit ${title}` : `Add ${title}`}</h3>
                    </div>
                    {isEditing && <button onClick={resetForm}><X size={18} /></button>}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {fields.map((field, idx) => {
                        if (field.type === 'textarea') return (
                            <textarea
                                key={idx}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 outline-none transition h-24 resize-none"
                                placeholder={field.placeholder}
                                value={formData[field.name] || ''}
                                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                required={field.required}
                            />
                        );
                        if (field.type === 'select') return (
                            <select
                                key={idx}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 outline-none transition"
                                value={formData[field.name] || ''}
                                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                            >
                                {field.options.map(opt => <option key={opt}>{opt}</option>)}
                            </select>
                        );
                        // Group adjacent half-width inputs? For simplicity, stacking them for now strictly 
                        // unless I add layout info to fields.
                        return (
                            <input
                                key={idx}
                                type={field.type || 'text'}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 outline-none transition"
                                placeholder={field.placeholder}
                                value={formData[field.name] || ''}
                                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                required={field.required}
                            />
                        );
                    })}

                    <button type="submit" className={`w-full py-2.5 rounded-lg transition flex justify-center items-center gap-2 font-medium text-white bg-slate-900 hover:bg-slate-800`}>
                        {isEditing ? 'Update' : 'Add'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormSection;
