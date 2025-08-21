
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Star, BookUser, User } from 'lucide-react';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';

export const CreativeTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
  const { selectedFont } = useResume();
  const headerStyle = { backgroundColor: color };
  const accentColorStyle = { color: color };
  const skillTagStyle = { backgroundColor: `${color}20`, color: color, borderColor: `${color}80` };
  const fontStyle = { fontFamily: selectedFont };
  const lightTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div className="h-full overflow-auto" style={{...fontStyle, backgroundColor: bgColor, color: textColor}}>
      <header style={headerStyle} className="p-10 text-white relative flex items-center gap-8">
        {data.personal.photo && (
            <div className="w-32 h-32 relative flex-shrink-0">
                <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover rounded-full border-4 border-white/50 shadow-lg" />
            </div>
        )}
        <div className="flex-grow">
            <h1 className="font-bold relative z-10" style={{...fontStyle, fontSize: '2.5rem'}}>{data.personal.name}</h1>
            <p className="font-light mt-1 relative z-10" style={{...fontStyle, fontSize: '1.25rem'}}>{data.personal.role}</p>
        </div>
      </header>

      <main className="p-10 grid grid-cols-3 gap-10">
        <div className="col-span-2">
            <section className="mb-10">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm relative z-10 mb-6" style={{color: textColor}}>
                    <div className="flex items-center gap-2">
                        <Mail size={16} style={accentColorStyle}/>
                        <span>{data.personal.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={16} style={accentColorStyle}/>
                        <span>{data.personal.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} style={accentColorStyle}/>
                        <span>{data.personal.location}</span>
                    </div>
                    {data.personal.website && (
                        <div className="flex items-center gap-2">
                        <Globe size={16} style={accentColorStyle}/>
                        <a href={`https://${data.personal.website}`} className="hover:underline">{data.personal.website}</a>
                        </div>
                    )}
                </div>

                <h2 className="flex items-center gap-3 text-2xl font-bold mb-5" style={{...accentColorStyle, ...fontStyle}}>
                    <User />
                    Profile
                </h2>
                <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
            </section>

          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-5" style={{...accentColorStyle, ...fontStyle}}>
              <Briefcase />
              Experience
            </h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-6 relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full" style={{ '::before': { backgroundColor: color } }}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{...fontStyle, fontSize: '1.125rem', color: textColor}}>{exp.role}</h3>
                  <p className="text-xs font-mono" style={lightTextStyle}>{exp.date}</p>
                </div>
                <h4 className="font-semibold mb-2" style={{...fontStyle, fontSize: '1rem', ...lightTextStyle, opacity: 0.9}}>{exp.company}</h4>
                <div className="text-sm whitespace-pre-line prose max-w-none prose-sm" style={lightTextStyle}>{exp.description}</div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-5" style={{...accentColorStyle, ...fontStyle}}>
              <GraduationCap />
              Education
            </h2>
            {data.education.map(edu => (
               <div key={edu.id} className="mb-6 relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full" style={{ '::before': { backgroundColor: color } }}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{...fontStyle, fontSize: '1.125rem', color: textColor}}>{edu.institution}</h3>
                  <p className="text-xs font-mono" style={lightTextStyle}>{edu.date}</p>
                </div>
                <h4 className="font-semibold mb-2" style={{...fontStyle, fontSize: '1rem', ...lightTextStyle, opacity: 0.9}}>{edu.degree}</h4>
                <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{edu.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-1 space-y-10">
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4" style={{...accentColorStyle, ...fontStyle}}>
              <Star />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <span key={skill} className="text-xs font-medium py-1 px-3 rounded-full border" style={skillTagStyle}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
          {data.references && (
            <section>
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-4" style={{...accentColorStyle, ...fontStyle}}>
                <BookUser />
                References
              </h2>
              <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.references}</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
