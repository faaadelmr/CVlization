
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Bike, Plane, Film, Sailboat, Diamond } from 'lucide-react';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';

const SectionHeader = ({ title, color, textColor }: { title: string, color: string, textColor: string }) => (
    <div className='mb-4'>
        <h2 className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: textColor }}>{title}</h2>
        <div className="w-10 h-px mt-1" style={{ backgroundColor: textColor, opacity: 0.5 }}></div>
    </div>
);

const ContactItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center text-sm">
        <div className="w-5 h-5 flex-shrink-0">{icon}</div>
        <span className='ml-2'>{text}</span>
    </div>
);

export const CooperTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
    const { selectedFont } = useResume();
    const fontStyle = { fontFamily: selectedFont };
    const leftColBg = { backgroundColor: color }; 
    const skills = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean).slice(0, 8);
    const interests = (data.references || '').split(',').map(s => s.trim()).filter(Boolean).slice(0, 4);

    const interestIcons: { [key: string]: React.ReactNode } = {
        travel: <Plane size={24} />,
        cycling: <Bike size={24} />,
        kayak: <Sailboat size={24} />,
        movies: <Film size={24} />,
    };

    return (
        <div className="h-full flex" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            {/* Left Column */}
            <aside className="w-1/3 p-8 flex flex-col items-center text-center" style={{...leftColBg, color: textColor}}>
                <h1 className="text-4xl font-bold uppercase">{data.personal.name.split(' ')[0]}</h1>
                <h1 className="text-4xl font-bold uppercase">{data.personal.name.split(' ').slice(1).join(' ')}</h1>
                <div className="flex items-center gap-2 my-2" style={{opacity: 0.8}}>
                    <Diamond size={10} /><Diamond size={10} /><Diamond size={10} /><Diamond size={10} />
                </div>
                <p className="text-md font-light tracking-wider">{data.personal.role}</p>

                {data.personal.photo && (
                    <div className="my-6 w-36 h-36 relative rounded-full p-1 border" style={{ borderColor: `${textColor}20` }}>
                         <div className="w-full h-full relative rounded-full p-1 border" style={{ borderColor: `${textColor}40` }}>
                            <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover rounded-full" />
                         </div>
                    </div>
                )}
                
                <div className="text-left w-full">
                    <SectionHeader title="About Me" color={color} textColor={textColor}/>
                    <p className="text-sm whitespace-pre-line" style={{opacity: 0.7 }}>{data.personal.description}</p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    {skills.map(skill => (
                        <div key={skill} className="flex flex-col items-center">
                            <div className="w-14 h-14 rounded-full border flex items-center justify-center" style={{ borderColor: `${textColor}30`}}>
                                <span className="font-bold text-lg">{skill.substring(0,2)}</span>
                            </div>
                            <p className="text-sm mt-2" style={{opacity: 0.8 }}>{skill}</p>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Right Column */}
            <main className="w-2/3 p-8 pl-10" style={{color: textColor}}>
                <header className="grid grid-cols-2 gap-y-2 gap-x-8 pb-4 border-b" style={{ borderColor: `${textColor}20`}}>
                    <ContactItem icon={<Phone size={14} />} text={data.personal.phone} />
                    <ContactItem icon={<Mail size={14} />} text={data.personal.email} />
                    <ContactItem icon={<Globe size={14} />} text={data.personal.website} />
                    <ContactItem icon={<MapPin size={14} />} text={data.personal.location} />
                </header>

                <div className="mt-6">
                    <SectionHeader title="Experience" color={color} textColor={textColor}/>
                     {data.experience.map(exp => (
                        <div key={exp.id} className="mb-5">
                            <h3 className="font-bold text-lg" style={{color: textColor}}>{exp.role} at {exp.company}</h3>
                            <p className="text-sm font-semibold my-1" style={{ color: textColor, opacity: 0.8 }}>{exp.date}</p>
                            <div className="text-sm whitespace-pre-line prose max-w-none" style={{ color: textColor, opacity: 0.7 }}>{exp.description}</div>
                        </div>
                    ))}
                </div>

                 <div className="mt-6">
                    <SectionHeader title="Education" color={color} textColor={textColor}/>
                     {data.education.map(edu => (
                        <div key={edu.id} className="mb-5">
                            <h3 className="font-bold text-lg" style={{color: textColor}}>{edu.degree} at {edu.institution}</h3>
                            <p className="text-sm font-semibold my-1" style={{ color: textColor, opacity: 0.8 }}>{edu.date}</p>
                            <div className="text-sm whitespace-pre-line prose max-w-none" style={{ color: textColor, opacity: 0.7 }}>{edu.description}</div>
                        </div>
                    ))}
                </div>

                {interests.length > 0 && (
                    <div className="mt-6 grid grid-cols-4 gap-4 text-center">
                        {interests.map(interest => (
                            <div key={interest} className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    {interestIcons[interest.toLowerCase()] || <div className='w-6 h-6 rounded-full' style={{backgroundColor: `${textColor}80`}}/>}
                                </div>
                                <p className="text-sm font-semibold mt-1" style={{ color: textColor }}>{interest}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
