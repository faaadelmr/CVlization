
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Calculator, PenLine, FileText, Briefcase, GraduationCap, User, Star } from 'lucide-react';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';

const SectionHeader = ({ title, color, textColor, icon }: { title: string, color: string, textColor: string, icon: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-4 pb-2 border-b-2" style={{ borderColor: color }}>
        {icon}
        <h2 className="text-lg font-bold uppercase tracking-wider">{title}</h2>
    </div>
);

export const LedgerTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
    const { selectedFont } = useResume();
    const fontStyle = { fontFamily: selectedFont };
    const lightTextStyle = { color: textColor, opacity: 0.8 };
    const tableHeaderStyle = { backgroundColor: `${color}1A`, borderBottom: `2px solid ${color}` };

    return (
        <div className="h-full flex flex-col p-8" style={{...fontStyle, backgroundColor: bgColor, color: textColor}}>
            
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                 {data.personal.photo && (
                    <div className="w-40 h-24 relative overflow-hidden shadow-md flex-shrink-0 border-2" style={{borderColor: color}}>
                        <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover" />
                    </div>
                )}
                <div className="text-right flex-grow pl-6">
                    <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ color }}>{data.personal.name}</h1>
                    <p className="text-lg font-semibold">{data.personal.role}</p>
                     <div className="mt-1 text-xs" style={lightTextStyle}>
                        {data.personal.email} | {data.personal.phone} | {data.personal.location}
                    </div>
                </div>
            </header>

            {/* Document Title */}
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold uppercase tracking-[0.2em] inline-block px-4 py-1 border-y-2" style={{borderColor: textColor}}>Curriculum Vitae</h2>
            </div>
            
            {/* Main Content Grid */}
            <main className="grid grid-cols-12 gap-x-8 flex-grow">

                {/* Left Column: Assets */}
                <aside className="col-span-5 space-y-6">
                     <section>
                        <SectionHeader title="Profil" icon={<User size={18} style={{color}} />} color={color} textColor={textColor} />
                        <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
                    </section>
                     <section>
                        <SectionHeader title="Keahlian" icon={<Calculator size={18} style={{color}} />} color={color} textColor={textColor} />
                         <ul className="text-sm space-y-1" style={lightTextStyle}>
                            {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                <li key={skill} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-current rounded-full" style={{backgroundColor: color}}></div>
                                  {skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                    {data.references && (
                         <section>
                            <SectionHeader title="Sertifikasi" icon={<Star size={18} style={{color}} />} color={color} textColor={textColor} />
                            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>
                                {data.references}
                            </p>
                        </section>
                    )}
                </aside>

                {/* Vertical Separator */}
                <div className="col-span-1 flex justify-center">
                    <div className="w-px h-full" style={{backgroundColor: `${textColor}30`}}></div>
                </div>

                {/* Right Column: Transactions */}
                <main className="col-span-6 space-y-6">
                     <section>
                        <SectionHeader title="Riwayat Pekerjaan" icon={<Briefcase size={18} style={{color}} />} color={color} textColor={textColor} />
                        <div className="space-y-4">
                             {data.experience.map(exp => (
                                <div key={exp.id} className="text-sm">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-md">{exp.role}</h3>
                                        <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-1" style={{ color }}>{exp.company}</h4>
                                    <div className="whitespace-pre-line prose max-w-none text-xs" style={lightTextStyle}>{exp.description}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                     <section>
                        <SectionHeader title="Riwayat Pendidikan" icon={<GraduationCap size={18} style={{color}} />} color={color} textColor={textColor} />
                         <div className="space-y-4">
                            {data.education.map(edu => (
                                <div key={edu.id} className="text-sm">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-md">{edu.degree}</h3>
                                        <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-1" style={{ color }}>{edu.institution}</h4>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </main>
        </div>
    );
};
