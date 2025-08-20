
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';
import { useResume } from '@/context/resume-context';

export const SwissTemplatePreview = ({ data, color }: { data: ResumeData, color: string }) => {
  const { selectedFont } = useResume();
  const accentColor = { color: color };
  const fontStyle = { fontFamily: selectedFont };

  return (
    <div className="bg-white p-10 text-gray-800 h-full overflow-auto" style={fontStyle}>
      <div className="grid grid-cols-12 gap-x-12">
        {/* Header */}
        <header className="col-span-12 border-b-4 border-gray-800 pb-6 mb-8">
          <h1 className="text-4xl font-bold tracking-tighter uppercase" style={fontStyle}>{data.personal.name}</h1>
          <p className="text-2xl font-light text-gray-600 mt-1" style={fontStyle}>{data.personal.role}</p>
        </header>
        
        {/* Left Column */}
        <aside className="col-span-4 pr-8 border-r border-gray-200">
           <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{...accentColor, ...fontStyle}}>Contact</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-gray-500"/>
                <span>{data.personal.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gray-500"/>
                <span>{data.personal.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-gray-500"/>
                <span>{data.personal.location}</span>
              </div>
              {data.personal.website && (
              <div className="flex items-center gap-3">
                <Globe size={14} className="text-gray-500"/>
                <a href={`https://${data.personal.website}`} className="hover:underline" style={accentColor}>{data.personal.website}</a>
              </div>
              )}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{...accentColor, ...fontStyle}}>Skills</h2>
            <ul className="space-y-1.5 text-sm">
              {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: color}}></span>
                  {skill}
                </li>
              ))}
            </ul>
          </section>
          {data.references && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{...accentColor, ...fontStyle}}>References</h2>
              <p className="text-sm whitespace-pre-line">{data.references}</p>
            </section>
          )}
        </aside>

        {/* Right Column */}
        <main className="col-span-8">
          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{...accentColor, ...fontStyle}}>Profile</h2>
            <p className="text-sm text-gray-600 whitespace-pre-line">{data.personal.description}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{...accentColor, ...fontStyle}}>Experience</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-xl" style={fontStyle}>{exp.role}</h3>
                  <p className="text-xs font-mono text-gray-500">{exp.date}</p>
                </div>
                <h4 className="font-semibold text-lg text-gray-700 mb-2" style={fontStyle}>{exp.company}</h4>
                <div className="text-sm text-gray-600 whitespace-pre-line prose max-w-none prose-sm">{exp.description}</div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{...accentColor, ...fontStyle}}>Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-xl" style={fontStyle}>{edu.institution}</h3>
                  <p className="text-xs font-mono text-gray-500">{edu.date}</p>
                </div>
                <h4 className="font-semibold text-lg text-gray-700 mb-2" style={fontStyle}>{edu.degree}</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">{edu.description}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};
