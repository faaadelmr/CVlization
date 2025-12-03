
"use client";
import type { ResumeData, Font } from '@/lib/types';
import { GitCommit, GitBranch } from 'lucide-react';

const Section = ({ title, children, color }: { title: string, children: React.ReactNode, color: string }) => (
    <section className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <GitCommit size={16} style={{ color }} />
            <h2 className="font-bold text-lg"># {title}</h2>
        </div>
        <div className="pl-6 border-l border-dashed" style={{ borderColor: 'currentColor', opacity: 0.5 }}>
            {children}
        </div>
    </section>
);

const CommandLine = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-2 text-sm">
        <span style={{ color: 'hsl(210, 100%, 70%)' }}>$</span>
        <span>{children}</span>
    </div>
)

export const GitFolioTemplatePreview = ({ data, color, bgColor, textColor, font }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font }) => {
    const fontStyle = { fontFamily: font || 'monospace' };
    return (
        <div className="p-8 h-full overflow-auto" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
            {/* Header */}
            <header className="mb-8">
                <div className="flex items-center justify-between mb-4">
                     <h1 className="text-3xl font-bold" style={{ color }}>{data.personal.name}</h1>
                     <div className="flex items-center gap-2 text-sm" style={{ color: 'hsl(80, 60%, 60%)' }}>
                        <GitBranch size={16} />
                        <span>main</span>
                     </div>
                </div>
                <div className="space-y-1 text-sm" style={{ opacity: 0.8 }}>
                   <CommandLine>git config user.role "{data.personal.role}"</CommandLine>
                   <CommandLine>git config user.email "{data.personal.email}"</CommandLine>
                   <CommandLine>git config user.phone "{data.personal.phone}"</CommandLine>
                   <CommandLine>git config user.location "{data.personal.location}"</CommandLine>
                   {data.personal.website && <CommandLine>git config user.website <a href={`https://${data.personal.website}`} style={{ color }} className="hover:underline">{data.personal.website}</a></CommandLine>}
                </div>
            </header>

            {/* Profile / Summary */}
            <Section title="summary" color={color}>
                <p className="text-sm whitespace-pre-line" style={{ opacity: 0.9 }}>{data.personal.description}</p>
            </Section>
            
            {/* Skills */}
            <Section title="skills" color={color}>
                 <div className="flex flex-wrap gap-2">
                    {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                        <span key={skill} className="text-xs font-semibold py-1 px-2 rounded-md" style={{ backgroundColor: `${textColor}1A`, color: textColor }}>
                            {skill}
                        </span>
                    ))}
                </div>
            </Section>
            
            {/* Experience */}
            <Section title="experience" color={color}>
                {data.experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-lg font-bold" style={{ color: 'hsl(140, 50%, 70%)' }}>{exp.role} @ {exp.company}</h3>
                            <p className="text-xs font-mono" style={{ opacity: 0.6 }}>{exp.date}</p>
                        </div>
                        <div className="text-sm whitespace-pre-line prose max-w-none mt-1" style={{ opacity: 0.9 }}>{exp.description.split('\n').map((line, i) => <p key={i} className="before:content-['-'] before:mr-2">{line.replace(/^- /, '')}</p>)}</div>
                    </div>
                ))}
            </Section>
            
            {/* Projects */}
            <Section title="projects" color={color}>
                {data.projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                        <div>
                            <h3 className="text-lg font-bold" style={{ color: 'hsl(140, 50%, 70%)' }}>{proj.name}</h3>
                            {proj.link && (
                              <div className="text-xs mt-1" style={{ opacity: 0.9 }}>
                                <span className="font-bold" style={{ opacity: 0.7 }}>remote.origin.url:</span> <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline break-all" style={{ color }}>{proj.link}</a>
                              </div>
                            )}
                        </div>
                        <p className="font-semibold italic text-xs" style={{ opacity: 0.7 }}>feat: {proj.technologies}</p>
                        <div className="text-sm whitespace-pre-line prose max-w-none mt-1" style={{ opacity: 0.9 }}>{proj.description}</div>
                    </div>
                ))}
            </Section>
            
            {/* Education */}
            <Section title="education" color={color}>
                {data.education.map(edu => (
                    <div key={edu.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-lg font-bold" style={{ color: 'hsl(140, 50%, 70%)' }}>{edu.institution}</h3>
                            <p className="text-xs font-mono" style={{ opacity: 0.6 }}>{edu.date}</p>
                        </div>
                        <p className="font-semibold italic">{edu.degree}</p>
                        <p className="text-sm whitespace-pre-line mt-1" style={{ opacity: 0.9 }}>{edu.description}</p>
                    </div>
                ))}
            </Section>
        </div>
    );
};

    