import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

export const generateDocx = (resume) => {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: resume.full_name,
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    text: resume.title,
                    heading: HeadingLevel.HEADING_3,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    text: `${resume.email} | ${resume.phone} | ${resume.address}`,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 }
                }),
                new Paragraph({
                    text: "Objective",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true
                }),
                new Paragraph({
                    text: resume.summary || 'No summary provided.',
                    spacing: { after: 300 }
                }),

                // EXPERIENCE
                new Paragraph({
                    text: "Experience",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true,
                    spacing: { before: 200 }
                }),
                ...(resume.experience || []).map(exp => [
                    new Paragraph({
                        children: [
                            new TextRun({ text: exp.role, bold: true, size: 28 }),
                            new TextRun({ text: ` at ${exp.company}`, size: 24 })
                        ],
                        spacing: { before: 100 }
                    }),
                    new Paragraph({
                        text: `${exp.start_date} - ${exp.end_date}`,
                        italics: true
                    }),
                    new Paragraph({
                        text: exp.description || '',
                        spacing: { after: 100 }
                    })
                ]).flat(),

                // EDUCATION
                new Paragraph({
                    text: "Education",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true,
                    spacing: { before: 200 }
                }),
                ...(resume.education || []).map(edu => [
                    new Paragraph({
                        text: edu.institution,
                        bold: true,
                        size: 28,
                        spacing: { before: 100 }
                    }),
                    new Paragraph({
                        text: `${edu.degree} (${edu.start_date} - ${edu.end_date})`
                    })
                ]).flat(),

                // SKILLS
                new Paragraph({
                    text: "Skills",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true,
                    spacing: { before: 200, after: 100 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: (resume.skills || []).map(s => s.skill).join(" • "),
                            size: 24
                        })
                    ]
                }),

                // PROJECTS
                ...(resume.projects && resume.projects.length > 0 ? [
                    new Paragraph({
                        text: "Projects",
                        heading: HeadingLevel.HEADING_2,
                        thematicBreak: true,
                        spacing: { before: 200, after: 100 }
                    }),
                    ...resume.projects.map(proj => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: proj.title, bold: true, size: 28 }),
                                ...(proj.link ? [new TextRun({ text: ` (${proj.link})`, size: 22 })] : [])
                            ],
                            spacing: { before: 100 }
                        }),
                        new Paragraph({
                            children: [new TextRun({ text: proj.description || '', size: 24 })],
                            spacing: { after: 100 }
                        })
                    ]).flat()
                ] : []),

                // LANGUAGES
                ...(resume.languages && resume.languages.length > 0 ? [
                    new Paragraph({
                        text: "Languages",
                        heading: HeadingLevel.HEADING_2,
                        thematicBreak: true,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: resume.languages.map(l => `${l.language} (${l.proficiency})`).join(" • "),
                                size: 24
                            })
                        ]
                    })
                ] : []),

                // CERTIFICATIONS
                ...(resume.certifications && resume.certifications.length > 0 ? [
                    new Paragraph({
                        text: "Certifications",
                        heading: HeadingLevel.HEADING_2,
                        thematicBreak: true,
                        spacing: { before: 200, after: 100 }
                    }),
                    ...resume.certifications.map(cert =>
                        new Paragraph({
                            children: [
                                new TextRun({ text: cert.name, bold: true, size: 24 }),
                                new TextRun({ text: ` - ${cert.issuer}`, size: 24 }),
                                ...(cert.date ? [new TextRun({ text: ` (${cert.date})`, italics: true, size: 24 })] : [])
                            ]
                        })
                    )
                ] : []),

                // ACHIEVEMENTS
                ...(resume.achievements && resume.achievements.length > 0 ? [
                    new Paragraph({
                        text: "Achievements",
                        heading: HeadingLevel.HEADING_2,
                        thematicBreak: true,
                        spacing: { before: 200, after: 100 }
                    }),
                    ...resume.achievements.map(ach => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: ach.title, bold: true, size: 24 }),
                                ...(ach.date ? [new TextRun({ text: ` (${ach.date})`, italics: true, size: 24 })] : [])
                            ]
                        }),
                        new Paragraph({
                            children: [new TextRun({ text: ach.description || '', size: 22 })]
                        })
                    ]).flat()
                ] : []),

                // INTERESTS
                ...(resume.interests && resume.interests.length > 0 ? [
                    new Paragraph({
                        text: "Interests & Hobbies",
                        heading: HeadingLevel.HEADING_2,
                        thematicBreak: true,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: resume.interests.map(i => i.name).join(" • "),
                                size: 24
                            })
                        ]
                    })
                ] : [])
            ]
        }]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${resume.full_name}_Resume.docx`);
    });
};
