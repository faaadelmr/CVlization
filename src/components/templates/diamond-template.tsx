
"use client";
import type { ResumeData } from '@/lib/types';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

const Section = ({ title, children, className, titleClassName, contentClassName, color, textColor }: { title: string, children: React.ReactNode, className?: string, titleClassName?: string, contentClassName?: string, color: string, textColor: string }) => (
    <div className={className}>
        <h2 className={`font-bold uppercase tracking-widest mb-4 ${titleClassName}`} style={{ color: textColor }}>{title}</h2>
        <div className={contentClassName}>
            {children}
        </div>
    </div>
);


export const DiamondTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
    const { selectedFont } = useResume();
    const fontStyle = { fontFamily: selectedFont };

    const isColorLight = (hexColor: string) => {
        if (!hexColor.startsWith('#')) return false;
        const hex = hexColor.replace('#', '');
        if (hex.length !== 6) return false;
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155;
    };
    
    const educationTextColor = isColorLight(color) ? '#000000' : '#FFFFFF';
    const experienceBgColor = isColorLight(bgColor) ? `${color}20` : `${color}20`;
    
    const skills = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="p-6 md:p-8 h-full w-full" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            <div className="grid grid-cols-3 grid-rows-auto gap-6 h-full">

                {/* Header */}
                <div className="col-span-2 p-6 rounded-lg border" style={{ borderColor: `${textColor}20`}}>
                    <h1 className="text-5xl font-bold" style={{ color }}>I'm {data.personal.name}.</h1>
                    <p className="text-xl font-semibold mt-2 uppercase tracking-wider">{data.personal.role}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-6 pt-4 border-t" style={{ borderColor: `${textColor}20`}}>
                        <div className='space-y-2'>
                            <p className="flex items-center gap-2"><Phone size={14} style={{color}} /> {data.personal.phone}</p>
                            <p className="flex items-center gap-2"><Mail size={14} style={{color}} /> {data.personal.email}</p>
                        </div>
                        <div className='space-y-2'>
                            <p className="flex items-center gap-2"><Globe size={14} style={{color}} /> {data.personal.website}</p>
                            <p className="flex items-center gap-2"><MapPin size={14} style={{color}} /> {data.personal.location}</p>
                        </div>
                    </div>
                </div>

                {/* Photo */}
                <div className="col-span-1 flex items-center justify-center relative">
                    {data.personal.photo && (
                         <div className="w-48 h-48 rounded-full border-2 p-2 border-gray-200">
                             <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover" />
                             </div>
                         </div>
                    )}
                     <svg className="absolute w-8 h-8 bottom-12 right-8" style={{color}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>
                
                {/* Experience */}
                <div className="col-span-2 p-6 rounded-lg" style={{ backgroundColor: experienceBgColor }}>
                    <Section title="Experience" color={color} textColor={textColor}>
                        <div className="space-y-4">
                            {data.experience.map(exp => (
                                <div key={exp.id} className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="col-span-1">
                                        <p className="font-bold">{exp.date}</p>
                                        <p className="font-semibold" style={{color}}>{exp.role}</p>
                                        <p className="text-xs">{exp.company}</p>
                                    </div>
                                    <div className="col-span-2 text-xs prose max-w-none" style={{color: textColor, opacity: 0.8}}>
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
                
                {/* Education */}
                 <div className="col-span-1 p-6 rounded-lg" style={{ backgroundColor: color, color: educationTextColor }}>
                     <Section title="Education" color={color} textColor={educationTextColor}>
                         <div className="space-y-4">
                            {data.education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between text-xs font-bold mb-1">
                                        <span>{edu.date}</span>
                                        <span>{edu.institution}</span>
                                    </div>
                                    <p className="text-sm font-semibold" style={{opacity: 0.9}}>{edu.degree}</p>
                                </div>
                            ))}
                         </div>
                    </Section>
                </div>

                {/* Skills & References container */}
                <div className="col-span-3 grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-lg border" style={{ borderColor: `${textColor}20`}}>
                        <Section title="Skills" color={color} textColor={textColor}>
                           <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                {skills.map((skill) => (
                                    <span key={skill}>{skill}</span>
                                ))}
                            </div>
                        </Section>
                    </div>
                    {data.references && (
                     <div className="p-6 rounded-lg border" style={{ borderColor: `${textColor}20`}}>
                        <Section title="References" color={color} textColor={textColor}>
                             <div className="text-sm whitespace-pre-line prose max-w-none" style={{color: textColor, opacity: 0.8}}>
                                {data.references}
                            </div>
                        </Section>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};
