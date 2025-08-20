
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Star, BookUser, User } from 'lucide-react';
import { useResume } from '@/context/resume-context';

export const CreativeTemplatePreview = ({ data, color }: { data: ResumeData, color: string }) => {
  const { selectedFont } = useResume();
  const headerStyle = { backgroundColor: color };
  const accentColorStyle = { color: color };
  const skillTagStyle = { backgroundColor: `${color}20`, color: color, borderColor: `${color}80` };
  const fontStyle = { fontFamily: selectedFont };


  return (
    <div className="bg-white text-gray-700 h-full overflow-auto" style={fontStyle}>
      <header style={headerStyle} className="p-10 text-white relative">
        <div className="absolute top-8 right-8 w-24 h-24 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-4 left-12 w-16 h-16 bg-white/20 rounded-lg transform rotate-12"></div>
        <h1 className="text-5xl font-bold relative z-10" style={fontStyle}>{data.personal.name}</h1>
        <p className="text-xl font-light mt-2 relative z-10" style={fontStyle}>{data.personal.role}</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6 text-sm relative z-10">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>{data.personal.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>{data.personal.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{data.personal.location}</span>
          </div>
          {data.personal.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <a href={`https://${data.personal.website}`} className="hover:underline">{data.personal.website}</a>
            </div>
          )}
        </div>
      </header>

      <main className="p-10 grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-5" style={{...accentColorStyle, ...fontStyle}}>
                <User />
                Profile
            </h2>
            <p className="text-sm text-gray-600 whitespace-pre-line">{data.personal.description}</p>
          </section>

          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-5" style={{...accentColorStyle, ...fontStyle}}>
              <Briefcase />
              Experience
            </h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-6 relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full" style={{ '::before': { backgroundColor: color } }}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-gray-800" style={fontStyle}>{exp.role}</h3>
                  <p className="text-xs font-mono text-gray-500">{exp.date}</p>
                </div>
                <h4 className="text-md font-semibold text-gray-600 mb-2" style={fontStyle}>{exp.company}</h4>
                <div className="text-sm text-gray-600 whitespace-pre-line prose max-w-none prose-sm">{exp.description}</div>
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
                  <h3 className="text-lg font-bold text-gray-800" style={fontStyle}>{edu.institution}</h3>
                  <p className="text-xs font-mono text-gray-500">{edu.date}</p>
                </div>
                <h4 className="text-md font-semibold text-gray-600 mb-2" style={fontStyle}>{edu.degree}</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">{edu.description}</p>
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
              <p className="text-sm whitespace-pre-line">{data.references}</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
