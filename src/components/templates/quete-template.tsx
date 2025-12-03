
"use client";
import type { ResumeData, Font } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, User, Wrench, Facebook, Twitter, Instagram, Linkedin, Code } from 'lucide-react';
import Image from 'next/image';

const WavyBackground = ({ color, position }: { color: string, position: 'top' | 'bottom' }) => (
    <div className={`absolute left-0 right-0 w-full h-48 ${position === 'top' ? 'top-0' : 'bottom-0'}`} style={{ color }}>
        <svg
            className={`w-full h-full ${position === 'bottom' ? 'transform rotate-180' : ''}`}
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
        >
            <path
                fill="currentColor"
                fillOpacity="0.8"
                d="M0,224L80,208C160,192,320,160,480,170.7C640,181,800,235,960,240C1120,245,1280,203,1360,181.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
            <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,149.3C672,128,768,128,864,154.7C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
        </svg>
    </div>
);

const SectionHeader = ({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: `${color}20`, color }}>
            {icon}
        </div>
        <h2 className="text-lg font-bold uppercase" style={{ color }}>{title}</h2>
    </div>
);

export const QueteTemplatePreview = ({ data, color, bgColor, textColor, font }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font }) => {
    const fontStyle = { fontFamily: font };
    const textStyle = { color: textColor };
    const lightTextStyle = { color: textColor, opacity: 0.8 };

    const skills = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="relative w-full h-full p-8 overflow-hidden" style={{ ...fontStyle, backgroundColor: bgColor }}>
            <WavyBackground color={color} position="top" />
            <WavyBackground color={color} position="bottom" />

            <main className="relative z-10 w-full h-full flex flex-col pt-[72px] overflow-y-auto">
                {/* Header */}
                <header className="flex items-center w-full mb-10 pl-8">
                    {data.personal.photo && (
                        <div className="w-40 h-40 relative rounded-full overflow-hidden shadow-lg flex-shrink-0 mr-8 border-4 border-white bg-white">
                            <Image
                              src={data.personal.photo}
                              alt={data.personal.name}
                              width={160}
                              height={160}
                              className="object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-grow">
                        <h1 className="font-bold uppercase tracking-wider" style={{ ...textStyle, fontSize: '3rem' }}>{data.personal.name}</h1>
                        <p className="font-light tracking-[0.2em]" style={{ ...lightTextStyle, fontSize: '1.1rem' }}>{data.personal.role}</p>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-12 gap-x-12 flex-grow">
                    {/* Left Column */}
                    <div className="col-span-5 space-y-8">
                        <section>
                            <SectionHeader icon={<MapPin size={16} />} title="Contact Person" color={color} />
                            <div className="text-sm space-y-2 pl-4" style={lightTextStyle}>
                                {data.personal.phone && <p>{data.personal.phone}</p>}
                                {data.personal.email && <p>{data.personal.email}</p>}
                                {data.personal.website && <p>{data.personal.website}</p>}
                                {data.personal.location && <p>{data.personal.location}</p>}
                            </div>
                        </section>
                        {data.experience && data.experience.length > 0 && (
                          <section>
                              <SectionHeader icon={<Briefcase size={16} />} title="Work Experience" color={color} />
                              <div className="space-y-4">
                                  {data.experience.map(exp => (
                                      <div key={exp.id}>
                                          <h3 className="font-bold text-md" style={textStyle}>{exp.role}</h3>
                                          <p className="text-sm font-semibold mb-1" style={{ color: color }}>{exp.company} ({exp.date})</p>
                                          <div className="text-xs whitespace-pre-line prose max-w-none" style={lightTextStyle}>{exp.description}</div>
                                      </div>
                                  ))}
                              </div>
                          </section>
                        )}
                         {data.projects && data.projects.length > 0 && (
                            <section>
                                <SectionHeader icon={<Code size={16} />} title="Projects" color={color} />
                                <div className="space-y-4">
                                    {data.projects.map(proj => (
                                        <div key={proj.id}>
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold text-md hover:underline" style={{color}}>{proj.name}</a>
                                            <div className="text-xs whitespace-pre-line prose max-w-none mt-1" style={lightTextStyle}>{proj.description}</div>
                                            <p className="text-xs font-semibold mt-1" style={lightTextStyle}>Technologies: {proj.technologies}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="col-span-7 space-y-8">
                        {data.education && data.education.length > 0 && (
                          <section>
                              <SectionHeader icon={<GraduationCap size={16} />} title="My Education" color={color} />
                               <div className="space-y-4">
                                  {data.education.map(edu => (
                                      <div key={edu.id} className="flex gap-4 relative">
                                          <div className="absolute left-1.5 top-2 h-full w-px" style={{backgroundColor: `${color}40`}}></div>
                                          <div className="flex-shrink-0 z-10 mt-1.5">
                                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                                          </div>
                                          <div>
                                              <p className="font-semibold text-sm" style={{ color }}>{edu.date}</p>
                                              <h3 className="font-bold text-md" style={textStyle}>{edu.degree}</h3>
                                              <p className="text-sm font-medium mb-1" style={lightTextStyle}>{edu.institution}</p>
                                              <p className="text-xs" style={lightTextStyle}>{edu.description}</p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </section>
                        )}
                        {skills.length > 0 && (
                          <section>
                              <SectionHeader icon={<Wrench size={16} />} title="Skills" color={color} />
                               <div className="space-y-2">
                                  {skills.map(skill => (
                                      <p key={skill} className="text-sm font-semibold" style={textStyle}>{skill}</p>
                                  ))}
                              </div>
                          </section>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
