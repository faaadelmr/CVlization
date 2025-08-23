
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, Award, Briefcase, GraduationCap, User, Wrench } from 'lucide-react';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';

const Section = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="mb-6">
        <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-current">
                {icon}
            </div>
            <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <div className="text-sm space-y-2">
            {children}
        </div>
    </div>
);

const ContactItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-current">
            {icon}
        </div>
        <span className="text-xs">{text}</span>
    </div>
);


export const AwesomeTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
    const { selectedFont } = useResume();
    const fontStyle = { fontFamily: selectedFont };
    const accentColorStyle = { color: color };
    const accentBgStyle = { backgroundColor: color };

    return (
        <div className="bg-white rounded-2xl shadow-2xl w-full h-full relative overflow-hidden flex flex-col" style={{...fontStyle, backgroundColor: bgColor, color: textColor}}>
            {/* Header */}
            <header className="relative w-full h-48 flex-shrink-0">
                <div className="absolute top-[-5rem] right-[-5rem] w-80 h-80 rounded-full" style={accentBgStyle}></div>
                {data.personal.photo && (
                     <div className="absolute top-4 right-12 w-40 h-40">
                        <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover rounded-full shadow-lg z-10" />
                    </div>
                )}
                <div className="absolute top-16 left-12 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold">{data.personal.name}</h1>
                    <div className="px-4 py-1 mt-2 inline-block rounded-md" style={accentBgStyle}>
                        <p className="text-sm font-semibold text-white uppercase tracking-wider">{data.personal.role}</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-12 pt-4 flex-grow grid grid-cols-2 gap-x-12">
                 <div style={accentColorStyle}>
                    <Section icon={<User size={24} className="text-white"/>} title="Profile">
                        <div className="whitespace-pre-line prose prose-sm max-w-none" style={{color: textColor, opacity: 0.9}}>{data.personal.description}</div>
                    </Section>
                    <Section icon={<Briefcase size={24} className="text-white"/>} title="Experience">
                        <div className="space-y-4">
                            {data.experience.map(exp => (
                                <div key={exp.id}>
                                    <h3 className="font-bold text-md">{exp.role}</h3>
                                    <p className="text-sm font-semibold" style={accentColorStyle}>{exp.company} ({exp.date})</p>
                                    <div className="text-xs whitespace-pre-line prose max-w-none" style={{color: textColor, opacity: 0.8}}>{exp.description}</div>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
                 <div style={accentColorStyle}>
                    <Section icon={<GraduationCap size={24} className="text-white"/>} title="Education">
                         <div className="space-y-4">
                            {data.education.map(edu => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-md">{edu.degree}</h3>
                                    <p className="text-sm font-semibold" style={accentColorStyle}>{edu.institution} ({edu.date})</p>
                                </div>
                            ))}
                         </div>
                    </Section>
                    <Section icon={<Wrench size={24} className="text-white"/>} title="Skills">
                       <ul className="list-disc list-inside space-y-1 text-xs" style={{color: textColor, opacity: 0.9}}>
                            {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </Section>
                    {data.references && (
                      <Section icon={<Award size={24} className="text-white"/>} title="References">
                          <div className="whitespace-pre-line prose prose-sm max-w-none" style={{color: textColor, opacity: 0.9}}>{data.references}</div>
                      </Section>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t mt-auto p-6 flex-shrink-0" style={{...accentColorStyle, color: textColor, borderColor: `${textColor}20` }}>
                <div className="grid grid-cols-3 gap-4">
                     <ContactItem icon={<Mail size={16} className="text-white"/>} text={data.personal.email} />
                     <ContactItem icon={<Phone size={16} className="text-white"/>} text={data.personal.phone} />
                     <ContactItem icon={<Globe size={16} className="text-white"/>} text={data.personal.website} />
                </div>
            </footer>
        </div>
    );
};
