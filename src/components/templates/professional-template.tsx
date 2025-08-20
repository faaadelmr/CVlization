
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, BookUser, Star, User } from 'lucide-react';
import { useResume } from '@/context/resume-context';

export const ProfessionalTemplatePreview = ({ data, color }: { data: ResumeData, color: string }) => {
  const { selectedFont } = useResume();
  const fontStyle = { fontFamily: selectedFont };
  const accentColorStyle = { color };
  const accentBgStyle = { backgroundColor: color };

  return (
    <div className="bg-white text-gray-800 h-full overflow-auto p-10" style={fontStyle}>
      {/* Header */}
      <header className="flex items-center justify-between mb-8 pb-4 border-b">
        <div>
          <h1 className="text-5xl font-bold" style={{ ...fontStyle, ...accentColorStyle }}>{data.personal.name}</h1>
          <p className="text-xl font-light text-gray-600 mt-1" style={fontStyle}>{data.personal.role}</p>
        </div>
        <div className="text-right text-xs space-y-1">
          <p className="flex items-center justify-end gap-2"><Mail size={14} style={accentColorStyle} /> {data.personal.email}</p>
          <p className="flex items-center justify-end gap-2"><Phone size={14} style={accentColorStyle} /> {data.personal.phone}</p>
          <p className="flex items-center justify-end gap-2"><MapPin size={14} style={accentColorStyle} /> {data.personal.location}</p>
          {data.personal.website && <a href={`https://${data.personal.website}`} className="flex items-center justify-end gap-2 text-primary hover:underline"><Globe size={14} style={accentColorStyle} /> {data.personal.website}</a>}
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-12 gap-x-12">
        {/* Left Column */}
        <div className="col-span-8">
           <section className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-5 flex items-center gap-3" style={{...fontStyle, ...accentColorStyle}}>
              <User />
              Profile
            </h2>
            <p className="text-sm text-gray-600 whitespace-pre-line">{data.personal.description}</p>
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
                  <h3 className="text-lg font-bold" style={fontStyle}>{exp.role}</h3>
                  <p className="text-xs text-gray-500 font-mono">{exp.date}</p>
                </div>
                <h4 className="text-md font-semibold text-gray-600 mb-2" style={fontStyle}>{exp.company}</h4>
                <div className="text-sm text-gray-600 whitespace-pre-line prose max-w-none prose-sm">{exp.description}</div>
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
                  <h3 className="text-lg font-bold" style={fontStyle}>{edu.institution}</h3>
                  <p className="text-xs text-gray-500 font-mono">{edu.date}</p>
                </div>
                <h4 className="text-md font-semibold text-gray-600 mb-1" style={fontStyle}>{edu.degree}</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">{edu.description}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="col-span-4">
          <section className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
            <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-3" style={{...fontStyle, ...accentColorStyle}}>
              <Star />
              Skills
            </h2>
            <ul className="space-y-2 text-sm">
              {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
          {data.references && (
            <section className="p-6 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
              <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-3" style={{...fontStyle, ...accentColorStyle}}>
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
