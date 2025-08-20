
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Star, BookUser, Briefcase, GraduationCap, User } from 'lucide-react';
import { useResume } from '@/context/resume-context';

export const ElegantTemplatePreview = ({ data, color }: { data: ResumeData, color: string }) => {
  const { selectedFont } = useResume();
  const accentColorStyle = { color: color };
  const fontStyle = { fontFamily: selectedFont };

  return (
    <div className="bg-white text-gray-700 h-full p-10 flex flex-col" style={fontStyle}>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-widest uppercase" style={{ ...fontStyle, color }}>{data.personal.name}</h1>
        <p className="text-lg font-light text-gray-500 mt-2 tracking-wider" style={fontStyle}>{data.personal.role}</p>
      </header>

      <div className="border-t-2 border-b-2 my-4" style={{ borderColor: color }}>
        <div className="flex justify-center items-center gap-x-6 text-xs text-gray-600 py-3">
          <div className="flex items-center gap-2"><Mail size={14}/> {data.personal.email}</div>
          <div className="flex items-center gap-2"><Phone size={14}/> {data.personal.phone}</div>
          <div className="flex items-center gap-2"><MapPin size={14}/> {data.personal.location}</div>
          {data.personal.website && (
            <a href={`https://${data.personal.website}`} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-2"><Globe size={14}/>{data.personal.website}</a>
          )}
        </div>
      </div>
      
      <main className="grid grid-cols-12 gap-10 flex-grow mt-8">
        <div className="col-span-8 pr-8">
          <section className="mb-10">
             <h2 className="text-xl font-semibold uppercase tracking-wider mb-5 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
              <User />
              Profile
            </h2>
            <p className="text-sm text-gray-600 whitespace-pre-line">{data.personal.description}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold uppercase tracking-wider mb-5 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
              <Briefcase />
              Experience
            </h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-6">
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
            <h2 className="text-xl font-semibold uppercase tracking-wider mb-5 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
              <GraduationCap />
              Education
            </h2>
            {data.education.map(edu => (
               <div key={edu.id} className="mb-6">
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

        <div className="col-span-4 pl-8 border-l border-gray-200">
          <section className="mb-10">
            <h2 className="text-xl font-semibold uppercase tracking-wider mb-4 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
              <Star />
              Skills
            </h2>
            <ul className="space-y-2">
              {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <li key={skill} className="text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
          {data.references && (
            <section>
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-4 flex items-center gap-3" style={{ ...accentColorStyle, ...fontStyle }}>
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
