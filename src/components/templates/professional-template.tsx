
"use client";
import type { ResumeData, Font } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, Code, Star, User } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const ProfessionalTemplatePreview = ({ data, color, bgColor, textColor, font }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font }) => {
  const fontStyle = { fontFamily: font };
  const accentColorStyle = { color };
  const accentBgStyle = { backgroundColor: color };
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div className="h-full overflow-auto p-10" style={{...fontStyle, backgroundColor: bgColor, color: textColor}}>
      {/* Header */}
      <header className="flex items-center justify-between mb-8 pb-4 border-b">
        <div>
          <h1 className="font-bold" style={{ ...fontStyle, ...accentColorStyle, fontSize: '2.5rem' }}>{data.personal.name}</h1>
          <p className="font-light mt-1" style={{...fontStyle, fontSize: '1.25rem', ...lightTextStyle}}>{data.personal.role}</p>
        </div>
        <div className="text-right text-xs space-y-1" style={lightTextStyle}>
          <p className="flex items-center justify-end gap-2"><Mail size={14} style={accentColorStyle} /> {data.personal.email}</p>
          <p className="flex items-center justify-end gap-2"><Phone size={14} style={accentColorStyle} /> {data.personal.phone}</p>
          <p className="flex items-center justify-end gap-2"><MapPin size={14} style={accentColorStyle} /> {data.personal.location}</p>
          {data.personal.website && <a href={`https://${data.personal.website}`} className="flex items-center justify-end gap-2 hover:underline" style={accentColorStyle}><Globe size={14} style={accentColorStyle} /> {data.personal.website}</a>}
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-12 gap-x-12">
        {/* Left Column */}
        <div className={cn("col-span-8", !data.personal.photo && "col-span-12")}>
           <section className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-5 flex items-center gap-3" style={{...fontStyle, ...accentColorStyle}}>
              <User />
              Profile
            </h2>
            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-5 flex items-center gap-3" style={{...fontStyle, ...accentColorStyle}}>
              <Briefcase />
              Work Experience
            </h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-6 relative pl-5">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full mt-1" style={accentBgStyle}></div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{...fontStyle, fontSize: '1.125rem', ...textStyle}}>{exp.role}</h3>
                  <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                </div>
                <h4 className="font-semibold mb-2" style={{...fontStyle, fontSize: '1rem', ...lightTextStyle, opacity: 0.9}}>{exp.company}</h4>
                <div className="text-sm whitespace-pre-line prose max-w-none prose-sm" style={lightTextStyle}>{exp.description}</div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-5 flex items-center gap-3" style={{...fontStyle, ...accentColorStyle}}>
              <GraduationCap />
              Education
            </h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-6 relative pl-5">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full mt-1" style={accentBgStyle}></div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{...fontStyle, fontSize: '1.125rem', ...textStyle}}>{edu.institution}</h3>
                  <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                </div>
                <h4 className="font-semibold mb-1" style={{...fontStyle, fontSize: '1rem', ...lightTextStyle, opacity: 0.9}}>{edu.degree}</h4>
                <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{edu.description}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column (Sidebar) */}
        {data.personal.photo && (
            <div className="col-span-4">
                <div className="w-full aspect-square relative rounded-lg overflow-hidden mb-8 shadow-lg">
                    <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover" />
                </div>
                <section className="mb-8 p-6 rounded-lg" style={{ backgroundColor: `${color}1A` }}>
                    <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-3" style={{...fontStyle, ...accentColorStyle}}>
                    <Star />
                    Skills
                    </h2>
                    <ul className="space-y-2 text-sm" style={textStyle}>
                    {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                        <li key={skill}>{skill}</li>
                    ))}
                    </ul>
                </section>
                {data.projects && data.projects.length > 0 && (
                    <section className="p-6 rounded-lg" style={{ backgroundColor: `${color}1A` }}>
                    <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-3" style={{...fontStyle, ...accentColorStyle}}>
                        <Code />
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {data.projects.map(proj => (
                            <div key={proj.id} className="text-sm">
                                <a href={proj.link} target="_blank" rel="noreferrer" className="font-bold hover:underline">{proj.name}</a>
                                <p className="text-xs mt-1" style={lightTextStyle}>{proj.description}</p>
                                <p className="text-xs mt-1 font-semibold" style={accentColorStyle}>{proj.technologies}</p>
                            </div>
                        ))}
                    </div>
                    </section>
                )}
            </div>
        )}
      </main>
    </div>
  );
};

    