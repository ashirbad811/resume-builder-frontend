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
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClass(color).split(' ')[0]} ${getColorClass(color).split(' ')[1]}`}>
                        <span className="font-bold text-sm">{items?.length || 0}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                </div>
                
                {items?.length === 0 && (
                    <div className="p-4 border-2 border-dashed border-slate-100 rounded-xl text-center">
                        <p className="text-slate-400 text-sm font-medium">No items yet. Add one below.</p>
                    </div>
                )}
                
                <ul className="space-y-3">
                    {items?.map(item => (
                        <li key={item.id} className="flex justify-between items-center bg-slate-50 p-3 pl-4 rounded-xl border border-slate-100 text-sm group hover:border-slate-300 hover:bg-white hover:shadow-sm transition-all duration-200">
                            <div className="truncate w-full font-semibold text-slate-700">
                                {item[fields[0].name] || item[fields[1]?.name] || 'New Item'}
                                {item[fields[1]?.name] && <span className="font-normal text-slate-500 ml-2 block sm:inline">{item[fields[1]?.name]}</span>}
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                                <button onClick={() => handleEditClick(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"><Edit2 size={16} /></button>
                                <button onClick={() => onDelete(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Add/Edit Form */}
            <div className="p-6 rounded-2xl shadow-sm border bg-white border-slate-100 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl shadow-sm ${getColorClass(color).split(' ')[0]} ${getColorClass(color).split(' ')[1]}`}>
                            {isEditing ? <Edit2 size={20} /> : <Plus size={20} />}
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">{isEditing ? `Edit ${title}` : `Add ${title}`}</h3>
                    </div>
                    {isEditing && (
                        <button onClick={resetForm} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors">
                            <X size={20} />
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((field, idx) => {
                        if (field.type === 'textarea') return (
                            <div key={idx} className="space-y-1">
                                <textarea
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all h-28 resize-none font-medium text-slate-700 placeholder:font-normal placeholder:text-slate-400"
                                    placeholder={field.placeholder}
                                    value={formData[field.name] || ''}
                                    onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                    required={field.required}
                                />
                            </div>
                        );
                        if (field.type === 'select') return (
                            <div key={idx} className="space-y-1">
                                <select
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                    value={formData[field.name] || ''}
                                    onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                >
                                    <option value="" disabled>Select {field.placeholder}</option>
                                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        );
                        return (
                            <div key={idx} className="space-y-1">
                                <input
                                    type={field.type || 'text'}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 placeholder:font-normal placeholder:text-slate-400"
                                    placeholder={field.placeholder}
                                    value={formData[field.name] || ''}
                                    onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                    required={field.required}
                                />
                            </div>
                        );
                    })}

                    <button type="submit" className="w-full py-3.5 mt-2 rounded-xl transition-all flex justify-center items-center gap-2 font-bold text-white bg-slate-900 hover:bg-blue-600 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        {isEditing ? 'Save Changes' : `Add ${title}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormSection;
