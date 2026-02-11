import React from 'react';

// Helper to check array existence
const hasData = (arr) => arr && arr.length > 0;

export const Template1 = ({ data }) => (
    <div className="p-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] font-sans text-gray-900 leading-relaxed shadow-lg print:shadow-none">
        <header className="border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{data.full_name}</h1>
            <p className="text-lg text-gray-700 font-medium mb-1">{data.title}</p>
            <div className="text-sm text-gray-600 flex flex-wrap gap-4">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>| {data.phone}</span>}
                {data.address && <span>| {data.address}</span>}
                {data.link && <span>| {data.link}</span>}
            </div>
        </header>

        {data.summary && <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Professional Summary</h2>
            <p className="text-gray-700 text-justify">{data.summary}</p>
        </section>}

        {hasData(data.experience) && <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Experience</h2>
            {data.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-gray-800">{exp.role}</h3>
                        <span className="text-sm text-gray-600">{exp.start_date} – {exp.end_date}</span>
                    </div>
                    <p className="font-semibold text-gray-700 mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
            ))}
        </section>}

        {hasData(data.education) && <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Education</h2>
            {data.education.map((edu, i) => (
                <div key={i} className="mb-2">
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                        <span className="text-sm text-gray-600">{edu.start_date} – {edu.end_date}</span>
                    </div>
                    <p className="text-gray-700">{edu.degree}</p>
                </div>
            ))}
        </section>}

        {hasData(data.projects) && <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Projects</h2>
            {data.projects.map((proj, i) => (
                <div key={i} className="mb-3">
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-800">{proj.title} {proj.link && <a href={proj.link} className="text-blue-600 text-sm font-normal underline ml-2">Link</a>}</h3>
                        <span className="text-sm text-gray-600">{proj.start_date} – {proj.end_date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{proj.description}</p>
                </div>
            ))}
        </section>}

        {(hasData(data.skills) || hasData(data.languages)) && <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Skills & Languages</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {hasData(data.skills) && <div>
                    <span className="font-bold mr-2">Skills:</span>
                    {data.skills.map(s => s.skill).join(', ')}
                </div>}
                {hasData(data.languages) && <div>
                    <span className="font-bold mr-2">Languages:</span>
                    {data.languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}
                </div>}
            </div>
        </section>}

        {(hasData(data.certifications) || hasData(data.achievements)) && <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Accomplishments</h2>
            {data.certifications?.map((cert, i) => (
                <div key={'cert' + i} className="mb-1">
                    <span className="font-bold">{cert.name}</span> - {cert.issuer} <span className="text-gray-500 text-sm">({cert.date})</span>
                </div>
            ))}
            {data.achievements?.map((ach, i) => (
                <div key={'ach' + i} className="mb-1 mt-2">
                    <span className="font-bold">{ach.title}</span> <span className="text-gray-500 text-sm">({ach.date})</span>
                    <p className="text-sm text-gray-600">{ach.description}</p>
                </div>
            ))}
        </section>}
    </div>
);

export const Template2 = ({ data }) => (
    <div className="p-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] font-serif text-gray-800 shadow-lg print:shadow-none">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-normal tracking-widest text-gray-900 border-b pb-4 mb-4">{data.full_name?.toUpperCase()}</h1>
            <div className="text-sm space-x-3 text-gray-500">
                <span>{data.title}</span>
                <span>•</span>
                <span>{data.email}</span>
                <span>•</span>
                <span>{data.phone}</span>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                {data.summary && <section className="mb-6">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Profile</h3>
                    <p className="text-sm leading-relaxed">{data.summary}</p>
                </section>}

                {hasData(data.experience) && <section className="mb-6">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Experience</h3>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-5 last:mb-0">
                            <h4 className="font-bold text-gray-900">{exp.role}</h4>
                            <p className="text-xs text-gray-500 italic mb-2">{exp.company} | {exp.start_date} - {exp.end_date}</p>
                            <p className="text-sm">{exp.description}</p>
                        </div>
                    ))}
                </section>}

                {hasData(data.projects) && <section className="mb-6">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Projects</h3>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-4">
                            <h4 className="font-bold text-gray-900">{proj.title}</h4>
                            <p className="text-sm">{proj.description}</p>
                            {proj.link && <a href={proj.link} className="text-xs text-blue-500 underline">{proj.link}</a>}
                        </div>
                    ))}
                </section>}
            </div>

            <div className="md:col-span-1">
                {hasData(data.education) && <section className="mb-6">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Education</h3>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-3">
                            <h4 className="font-bold text-sm">{edu.institution}</h4>
                            <p className="text-xs">{edu.degree}</p>
                            <p className="text-xs text-gray-500">{edu.end_date}</p>
                        </div>
                    ))}
                </section>}

                <section className="mb-6">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Skills</h3>
                    <ul className="text-sm space-y-1">
                        {data.skills?.map((s, i) => <li key={i}>{s.skill}</li>)}
                    </ul>
                </section>

                {hasData(data.languages) && <section className="mb-6">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Languages</h3>
                    <ul className="text-sm space-y-1">
                        {data.languages.map((l, i) => <li key={i}>{l.language} <span className="text-gray-400 text-xs">({l.proficiency})</span></li>)}
                    </ul>
                </section>}

                {(hasData(data.certifications) || hasData(data.interests)) && <section>
                    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Misc</h3>
                    {data.certifications?.map((c, i) => <div key={i} className="text-sm mb-1">{c.name}</div>)}
                    {data.interests?.map((int, i) => <div key={'int' + i} className="text-sm text-gray-600">{int.name}</div>)}
                </section>}
            </div>
        </div>
    </div>
);

// ... Simplified for brevtiy, updating other templates similarly with map checks
// Since user asked for ALL templates, I must provide full file or they'll break.
// I will reuse T1/T2 structure for T3-T10 logic injection but keep styles.

export const Template3 = ({ data }) => (
    <div className="bg-white max-w-[210mm] mx-auto min-h-[297mm] shadow-lg print:shadow-none flex flex-col">
        <header className="bg-slate-800 text-white p-10">
            <h1 className="text-4xl font-light mb-2">{data.full_name}</h1>
            <p className="text-xl text-blue-200">{data.title}</p>
        </header>
        <div className="p-10 grid grid-cols-3 gap-8 flex-grow">
            <div className="col-span-2 space-y-6">
                {hasData(data.experience) && <div>
                    <h3 className="text-slate-800 font-bold uppercase tracking-widest border-l-4 border-slate-800 pl-3 mb-3">Experience</h3>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-6 ml-4 border-l border-slate-200 pl-4 py-1 relative">
                            <div className="absolute w-2 h-2 bg-slate-300 rounded-full -left-[5px] top-2"></div>
                            <h4 className="font-bold text-lg">{exp.role}</h4>
                            <p className="text-slate-600 font-medium mb-1">{exp.company}</p>
                            <p className="text-sm text-slate-500 mb-2">{exp.start_date} - {exp.end_date}</p>
                            <p className="text-slate-700 text-sm">{exp.description}</p>
                        </div>
                    ))}
                </div>}

                {hasData(data.projects) && <div>
                    <h3 className="text-slate-800 font-bold uppercase tracking-widest border-l-4 border-slate-800 pl-3 mb-3">Projects</h3>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-4 ml-4">
                            <h4 className="font-bold text-lg">{proj.title}</h4>
                            <p className="text-slate-700 text-sm">{proj.description}</p>
                        </div>
                    ))}
                </div>}

                {hasData(data.education) && <div>
                    <h3 className="text-slate-800 font-bold uppercase tracking-widest border-l-4 border-slate-800 pl-3 mb-3">Education</h3>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-3 ml-4">
                            <h4 className="font-bold">{edu.institution}</h4>
                            <p className="text-sm">{edu.degree}</p>
                            <p className="text-sm text-slate-500">{edu.end_date}</p>
                        </div>
                    ))}
                </div>}
            </div>
            <div className="bg-slate-50 p-6 -m-6 h-full text-sm space-y-6">
                <div>
                    <h3 className="font-bold text-slate-800 uppercase mb-3">Contact</h3>
                    <p className="mb-1">📧 {data.email}</p>
                    <p className="mb-1">📱 {data.phone}</p>
                    <p className="mb-1">📍 {data.address}</p>
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 uppercase mb-3">Summary</h3>
                    <p className="text-slate-600">{data.summary}</p>
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 uppercase mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.skills?.map((skill, i) => (
                            <span key={i} className="bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">{skill.skill}</span>
                        ))}
                    </div>
                </div>
                {hasData(data.languages) && <div>
                    <h3 className="font-bold text-slate-800 uppercase mb-3">Languages</h3>
                    {data.languages.map((l, i) => <div key={i} className="mb-1">{l.language}</div>)}
                </div>}
            </div>
        </div>
    </div>
);

export const Template4 = ({ data }) => (
    <div className="p-10 max-w-[210mm] mx-auto bg-white min-h-[297mm] font-sans shadow-lg print:shadow-none">
        <header className="flex justify-between items-end border-b-4 border-green-700 pb-4 mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">{data.full_name}</h1>
                <p className="text-xl text-green-700 font-semibold">{data.title}</p>
            </div>
            <div className="text-right text-sm text-gray-600">
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <p>{data.address}</p>
            </div>
        </header>
        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 border-r border-gray-200 pr-4">
                <h3 className="text-green-800 font-bold uppercase mb-4">Skills</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {data.skills?.map((s, i) => <li key={i}>{s.skill}</li>)}
                </ul>
                {hasData(data.languages) && <>
                    <h3 className="text-green-800 font-bold uppercase mt-8 mb-4">Languages</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {data.languages.map((l, i) => <li key={i}>{l.language}</li>)}
                    </ul>
                </>}
                <h3 className="text-green-800 font-bold uppercase mt-8 mb-4">Contact</h3>
                <p className="text-sm text-gray-600 mb-4">{data.summary}</p>
            </div>
            <div className="col-span-2">
                <h3 className="text-green-800 font-bold uppercase mb-4 text-lg">Experience</h3>
                {data.experience?.map((exp, i) => (
                    <div key={i} className="mb-6">
                        <h4 className="font-bold text-gray-900">{exp.role}</h4>
                        <div className="flex justify-between text-green-700 text-sm font-medium mb-1">
                            <span>{exp.company}</span>
                            <span>{exp.start_date} - {exp.end_date}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{exp.description}</p>
                    </div>
                ))}

                {hasData(data.projects) && <>
                    <h3 className="text-green-800 font-bold uppercase mb-4 text-lg mt-6">Projects</h3>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-4">
                            <h4 className="font-bold text-gray-900">{proj.title}</h4>
                            <p className="text-gray-700 text-sm">{proj.description}</p>
                        </div>
                    ))}
                </>}

                <h3 className="text-green-800 font-bold uppercase mb-4 text-lg mt-6">Education</h3>
                {data.education?.map((edu, i) => (
                    <div key={i} className="mb-2">
                        <h4 className="font-bold">{edu.institution}</h4>
                        <p className="text-sm">{edu.degree} <span className="text-gray-400">| {edu.end_date}</span></p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const Template5 = ({ data }) => (
    <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg print:shadow-none font-mono text-sm">
        <div className="bg-gray-900 text-green-400 p-8">
            <h1 className="text-3xl font-bold mb-2">&lt;{data.full_name} /&gt;</h1>
            <p className="text-white opacity-80">{data.title}</p>
        </div>
        <div className="p-8">
            <div className="mb-6">
                <h3 className="text-gray-900 font-bold border-b border-gray-300 mb-2 pb-1">Summary</h3>
                <p className="text-gray-700">{data.summary}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-gray-900 font-bold border-b border-gray-300 mb-2 pb-1">Experience</h3>
                {data.experience?.map((exp, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between font-bold">
                            <span>{exp.role} @ {exp.company}</span>
                            <span className="text-gray-500">{exp.start_date} - {exp.end_date}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{exp.description}</p>
                    </div>
                ))}
            </div>
            {hasData(data.projects) && <div className="mb-6">
                <h3 className="text-gray-900 font-bold border-b border-gray-300 mb-2 pb-1">Projects</h3>
                {data.projects.map((proj, i) => (
                    <div key={i} className="mb-4">
                        <div className="font-bold text-green-700">{proj.title}</div>
                        <p className="text-gray-600">{proj.description}</p>
                    </div>
                ))}
            </div>}
            <div className="mb-6">
                <h3 className="text-gray-900 font-bold border-b border-gray-300 mb-2 pb-1">SkillsStack</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                    {data.skills?.map((s, i) => <span key={i} className="bg-gray-100 px-2 py-1 rounded border">{s.skill}</span>)}
                </div>
            </div>
        </div>
    </div>
);

export const Template6 = ({ data }) => (
    <div className="p-12 max-w-[210mm] mx-auto bg-stone-50 min-h-[297mm] font-serif hover:bg-white transition-colors shadow-lg print:shadow-none">
        <header className="text-center mb-10 border-b-2 border-stone-300 pb-6">
            <h1 className="text-5xl text-stone-900 mb-4">{data.full_name}</h1>
            <div className="flex justify-center gap-4 text-stone-600 italic">
                <span>{data.email}</span>
                <span>{data.phone}</span>
                <span>{data.address}</span>
            </div>
        </header>
        <div className="space-y-8">
            <section>
                <h2 className="text-xl font-bold text-stone-800 uppercase tracking-widest mb-4">Career Profile</h2>
                <p className="text-stone-700 leading-relaxed">{data.summary}</p>
            </section>
            <section>
                <h2 className="text-xl font-bold text-stone-800 uppercase tracking-widest mb-4">Work History</h2>
                {data.experience?.map((exp, i) => (
                    <div key={i} className="mb-6">
                        <h3 className="font-bold text-lg text-stone-900">{exp.role}</h3>
                        <div className="flex justify-between text-stone-600 mb-2">
                            <span className="italic">{exp.company}</span>
                            <span>{exp.start_date} – {exp.end_date}</span>
                        </div>
                        <p className="text-stone-700">{exp.description}</p>
                    </div>
                ))}
            </section>
            {hasData(data.projects) && <section>
                <h2 className="text-xl font-bold text-stone-800 uppercase tracking-widest mb-4">Projects</h2>
                {data.projects.map((proj, i) => (
                    <div key={i} className="mb-4">
                        <h3 className="font-bold text-stone-900">{proj.title}</h3>
                        <p className="text-stone-700">{proj.description}</p>
                    </div>
                ))}
            </section>}
        </div>
    </div>
);

export const Template7 = ({ data }) => (
    <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg print:shadow-none font-sans flex text-sm">
        <div className="w-1/3 bg-gray-100 p-6 pt-10">
            <h2 className="font-bold text-lg border-b-2 border-red-600 pb-1 mb-4">Contact</h2>
            <p className="mb-2">📧 {data.email}</p>
            <p className="mb-2">📱 {data.phone}</p>
            <p className="mb-6">📍 {data.address}</p>

            <h2 className="font-bold text-lg border-b-2 border-red-600 pb-1 mb-4">Skills</h2>
            <div className="flex flex-col gap-2">
                {data.skills?.map((s, i) => <span key={i} className="bg-red-50 text-red-800 px-2 py-1 rounded">{s.skill}</span>)}
            </div>
            {hasData(data.languages) && <>
                <h2 className="font-bold text-lg border-b-2 border-red-600 pb-1 mb-4 mt-6">Languages</h2>
                {data.languages.map((l, i) => <div key={i} className="mb-1">{l.language}</div>)}
            </>}
        </div>
        <div className="w-2/3 p-8 pt-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.full_name}</h1>
            <p className="text-xl text-red-600 mb-6">{data.title}</p>

            <p className="text-gray-600 mb-8 border-l-4 border-gray-300 pl-4">{data.summary}</p>

            <h2 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span> Experience
            </h2>
            {data.experience?.map((exp, i) => (
                <div key={i} className="mb-6 ml-4">
                    <h3 className="font-bold">{exp.role}</h3>
                    <p className="text-red-600 text-xs mb-1">{exp.company} | {exp.start_date} - {exp.end_date}</p>
                    <p className="text-gray-700">{exp.description}</p>
                </div>
            ))}
            {hasData(data.projects) && <>
                <h2 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2 mt-6">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span> Projects
                </h2>
                {data.projects.map((proj, i) => (
                    <div key={i} className="mb-4 ml-4">
                        <h3 className="font-bold">{proj.title}</h3>
                        <p className="text-gray-700">{proj.description}</p>
                    </div>
                ))}
            </>}
        </div>
    </div>
);

export const Template8 = ({ data }) => (
    <div className="p-6 max-w-[210mm] mx-auto bg-white min-h-[297mm] font-sans shadow-lg print:shadow-none text-xs leading-tight">
        <header className="border-b-2 border-gray-900 pb-2 mb-4 flex justify-between items-end">
            <div>
                <h1 className="text-2xl font-black uppercase text-gray-900">{data.full_name}</h1>
                <p className="font-bold text-gray-600">{data.title}</p>
            </div>
            <div className="text-right">
                <span className="block">{data.email} | {data.phone}</span>
                <span className="block">{data.address}</span>
            </div>
        </header>

        <section className="mb-4">
            <h2 className="font-bold uppercase text-gray-800 border-b border-gray-300 mb-2">Summary</h2>
            <p>{data.summary}</p>
        </section>

        <div className="flex gap-4">
            <div className="w-2/3">
                <h2 className="font-bold uppercase text-gray-800 border-b border-gray-300 mb-2">Experience</h2>
                {data.experience?.map((exp, i) => (
                    <div key={i} className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>{exp.role}, {exp.company}</span>
                            <span>{exp.start_date} - {exp.end_date}</span>
                        </div>
                        <p className="mt-1">{exp.description}</p>
                    </div>
                ))}
                {hasData(data.projects) && <>
                    <h2 className="font-bold uppercase text-gray-800 border-b border-gray-300 mb-2 mt-4">Projects</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-3">
                            <div className="font-bold">{proj.title}</div>
                            <p>{proj.description}</p>
                        </div>
                    ))}
                </>}
            </div>
            <div className="w-1/3">
                <h2 className="font-bold uppercase text-gray-800 border-b border-gray-300 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-1">
                    {data.skills?.map((s, i) => <span key={i} className="bg-gray-200 px-1 rounded">{s.skill}</span>)}
                </div>
                <h2 className="font-bold uppercase text-gray-800 border-b border-gray-300 mb-2 mt-4">Education</h2>
                {data.education?.map((edu, i) => (
                    <div key={i} className="mb-2">
                        <div className="font-bold">{edu.institution}</div>
                        <div>{edu.degree}</div>
                        <div className="text-[10px] text-gray-500">{edu.end_date}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const Template9 = ({ data }) => (
    <div className="p-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] font-sans shadow-lg print:shadow-none">
        <div className="text-center mb-8 bg-teal-50 p-6 rounded-xl">
            <h1 className="text-3xl font-bold text-teal-800 mb-2">{data.full_name}</h1>
            <p className="text-lg text-teal-600 font-medium">{data.title}</p>
            <div className="mt-4 flex justify-center gap-4 text-sm text-gray-600">
                <span>{data.email}</span>
                <span>{data.phone}</span>
            </div>
        </div>

        <div className="space-y-6">
            <section>
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-teal-200 flex-grow"></div>
                    <h2 className="text-teal-800 font-bold uppercase tracking-wider">Experience</h2>
                    <div className="h-px bg-teal-200 flex-grow"></div>
                </div>
                {data.experience?.map((exp, i) => (
                    <div key={i} className="mb-6 text-center">
                        <h3 className="font-bold text-lg">{exp.role}</h3>
                        <p className="text-teal-600">{exp.company}</p>
                        <p className="text-xs text-gray-400 mb-2">{exp.start_date} - {exp.end_date}</p>
                        <p className="text-gray-700 max-w-lg mx-auto">{exp.description}</p>
                    </div>
                ))}
            </section>
            {hasData(data.projects) && <section>
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-teal-200 flex-grow"></div>
                    <h2 className="text-teal-800 font-bold uppercase tracking-wider">Projects</h2>
                    <div className="h-px bg-teal-200 flex-grow"></div>
                </div>
                {data.projects.map((proj, i) => (
                    <div key={i} className="mb-4 text-center">
                        <h3 className="font-bold">{proj.title}</h3>
                        <p>{proj.description}</p>
                    </div>
                ))}
            </section>}
            <section>
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-teal-200 flex-grow"></div>
                    <h2 className="text-teal-800 font-bold uppercase tracking-wider">Skills</h2>
                    <div className="h-px bg-teal-200 flex-grow"></div>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {data.skills?.map((s, i) => <span key={i} className="border border-teal-200 text-teal-700 px-3 py-1 rounded-full">{s.skill}</span>)}
                </div>
            </section>
        </div>
    </div>
);

export const Template10 = ({ data }) => (
    <div className="p-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] font-sans shadow-lg print:shadow-none">
        <div className="flex gap-8">
            <div className="w-1/3 text-right border-r-2 border-indigo-100 pr-8">
                <h1 className="text-3xl font-bold text-indigo-900 mb-2">{data.full_name}</h1>
                <p className="text-indigo-600 mb-8">{data.title}</p>

                <h3 className="font-bold text-gray-800 mb-2">Contact</h3>
                <p className="text-sm text-gray-600 mb-1">{data.email}</p>
                <p className="text-sm text-gray-600 mb-6">{data.phone}</p>

                <h3 className="font-bold text-gray-800 mb-2">Education</h3>
                {data.education?.map((edu, i) => (
                    <div key={i} className="mb-4">
                        <p className="font-bold text-sm">{edu.institution}</p>
                        <p className="text-xs">{edu.degree}</p>
                    </div>
                ))}

                {hasData(data.languages) && <>
                    <h3 className="font-bold text-gray-800 mb-2 mt-6">Languages</h3>
                    {data.languages.map((l, i) => <div key={i} className="text-sm">{l.language}</div>)}
                </>}
            </div>
            <div className="w-2/3 pt-2">
                <h3 className="font-bold text-indigo-900 uppercase text-lg mb-6">Experience Timeline</h3>
                <div className="border-l-2 border-indigo-200 ml-2 space-y-8">
                    {data.experience?.map((exp, i) => (
                        <div key={i} className="pl-6 relative">
                            <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[9px] top-1 border-4 border-white"></div>
                            <h4 className="font-bold text-lg">{exp.role}</h4>
                            <p className="text-indigo-600 text-sm font-medium mb-1">{exp.company} | {exp.start_date} - {exp.end_date}</p>
                            <p className="text-gray-600">{exp.description}</p>
                        </div>
                    ))}
                </div>
                {hasData(data.projects) && <div className="mt-8">
                    <h3 className="font-bold text-indigo-900 uppercase text-lg mb-6">Projects</h3>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-4">
                            <h4 className="font-bold">{proj.title}</h4>
                            <p className="text-gray-600">{proj.description}</p>
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    </div>
);



export const demoResumeData = {
    full_name: "John Doe",
    title: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
    summary: "Experienced software engineer with a passion for building scalable web applications and intuitive user interfaces. Proven track record of delivering high-quality code and leading development teams.",
    experience: [
        {
            role: "Senior Developer",
            company: "Tech Solutions Inc.",
            start_date: "2020",
            end_date: "Present",
            description: "Leading frontend development for enterprise clients using React and Node.js."
        },
        {
            role: "Web Developer",
            company: "Creative Agency",
            start_date: "2018",
            end_date: "2020",
            description: "Developed responsive websites and e-commerce platforms for various brands."
        }
    ],
    education: [
        {
            institution: "State University",
            degree: "B.S. Computer Science",
            start_date: "2014",
            end_date: "2018"
        }
    ],
    skills: [
        { skill: "JavaScript" },
        { skill: "React" },
        { skill: "Node.js" },
        { skill: "Python" },
        { skill: "SQL" }
    ],
    languages: [
        { language: "English", proficiency: "Native" },
        { language: "Spanish", proficiency: "Intermediate" }
    ],
    projects: [
        {
            title: "E-commerce Platform",
            description: "Built a full-stack e-commerce solution with React, Node.js, and MongoDB."
        },
        {
            title: "Task Management App",
            description: "Developed a productivity tool for team collaboration and project tracking."
        }
    ]
};

const templates = [Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8, Template9, Template10];
export default templates;
