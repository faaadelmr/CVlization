
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, CheckSquare, Briefcase, GraduationCap, Star } from 'lucide-react';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';

const SectionHeader = ({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 flex items-center justify-center" style={{ backgroundColor: color }}>
            {icon}
        </div>
        <h2 className="text-xl font-bold uppercase" style={{ color: "#FFFFFF" }}>{title}</h2>
    </div>
);

const VectoristicPattern = ({ color }: { color: string }) => (
    <div className="absolute top-0 right-0 w-48 h-48 opacity-20" style={{ color }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <pattern id="dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dot-pattern)" />
        </svg>
    </div>
);

export const SmartStartTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
    const { selectedFont } = useResume();
    const fontStyle = { fontFamily: selectedFont };
    const sidebarBgStyle = { backgroundColor: color };
    const sidebarTextStyle = { color: '#FFFFFF' };
    const mainBgStyle = { backgroundColor: bgColor };
    const mainTextStyle = { color: textColor };
    const mainAccentColorStyle = { color: color };
    const lightTextStyle = { color: textColor, opacity: 0.8 };

    return (
        <div className="flex h-full" style={fontStyle}>
            {/* Left Column (Sidebar) */}
            <aside className="w-1/3 p-8 flex flex-col gap-8 relative" style={sidebarBgStyle}>
                <div className="absolute top-8 -right-8">
                    {data.personal.photo ? (
                        <div className="bg-white p-2 shadow-lg">
                            <div className="relative w-48 h-56 border-8 border-white">
                                <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover" />
                                <div className="absolute inset-0 border-2" style={{ borderColor: color }}></div>
                            </div>
                        </div>
                    ) : (
                         <div className="w-48 h-56" style={{ backgroundColor: `${color}99`}}></div>
                    )}
                </div>

                <div className={data.personal.photo ? "mt-64" : "mt-8"}>
                    <section className="mb-8">
                        <SectionHeader icon={<CheckSquare size={16} color={color} />} title="Kontak" color="white" />
                        <div className="space-y-3 text-sm" style={sidebarTextStyle}>
                            <p className="flex items-center gap-3"><Phone size={14} /> {data.personal.phone}</p>
                            {data.personal.website && <p className="flex items-center gap-3"><Globe size={14} /> {data.personal.website}</p>}
                            <p className="flex items-center gap-3"><Mail size={14} /> {data.personal.email}</p>
                            <p className="flex items-center gap-3"><MapPin size={14} /> {data.personal.location}</p>
                        </div>
                    </section>
                    <section>
                        <SectionHeader icon={<CheckSquare size={16} color={color} />} title="Keahlian" color="white" />
                        <div className="space-y-2 text-sm" style={sidebarTextStyle}>
                            {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                <p key={skill}>{skill}</p>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>

            {/* Right Column (Main Content) */}
            <main className="w-2/3 p-8 relative overflow-hidden" style={mainBgStyle}>
                <VectoristicPattern color={color} />
                <div className="relative z-10">
                    <header className="mb-8">
                        <div className="p-4" style={{ backgroundColor: color }}>
                            <h1 className="text-4xl font-bold text-white uppercase">{data.personal.name}</h1>
                        </div>
                        <div className="p-4 border" style={{ borderColor: color }}>
                            <h2 className="text-2xl font-semibold" style={mainAccentColorStyle}>{data.personal.role}</h2>
                        </div>
                        <p className="mt-4 text-sm whitespace-pre-line" style={lightTextStyle}>
                            {data.personal.description}
                        </p>
                    </header>
                    <section className="mb-8">
                        <SectionHeader icon={<Briefcase size={16} color="white" />} title="Pengalaman Kerja" color={color} />
                        <div className="space-y-4">
                            {data.experience.map(exp => (
                                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: color }}>
                                    <h3 className="font-bold text-lg" style={mainTextStyle}>{exp.role}</h3>
                                    <p className="font-semibold" style={mainAccentColorStyle}>{exp.company} | {exp.date}</p>
                                    <div className="text-sm mt-1 whitespace-pre-line prose max-w-none" style={lightTextStyle}>{exp.description}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <SectionHeader icon={<GraduationCap size={16} color="white" />} title="Pendidikan" color={color} />
                        <div className="space-y-4">
                            {data.education.map(edu => (
                                <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: color }}>
                                    <h3 className="font-bold text-lg" style={mainTextStyle}>{edu.degree}</h3>
                                    <p className="font-semibold" style={mainAccentColorStyle}>{edu.institution} | {edu.date}</p>
                                    <div className="text-sm mt-1 whitespace-pre-line prose max-w-none" style={lightTextStyle}>{edu.description}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};
