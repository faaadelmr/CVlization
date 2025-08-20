
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, BookUser } from 'lucide-react';
import { useResume } from '@/context/resume-context';

// Web Preview Component
export const ModernTemplatePreview = ({ data, color }: { data: ResumeData, color: string }) => {
  const { selectedFont } = useResume();
  const sectionTitleStyle = {
    borderColor: color,
    color: color,
  };

  const skillStyle = {
    backgroundColor: `${color}20`, // 20% opacity
    color: color,
    borderColor: `${color}80`
  }
  
  const fontStyle = { fontFamily: selectedFont };

  return (
    <div className="p-8 bg-white text-gray-800 h-full overflow-auto" style={fontStyle}>
      {/* Header */}
      <header className="text-center mb-10 border-b-2 pb-6" style={{borderColor: color}}>
        <h1 className="text-5xl font-bold" style={{ ...fontStyle, color }}>{data.personal.name}</h1>
        <p className="text-xl font-light text-gray-600 mt-2" style={fontStyle}>Frontend Developer</p>
        <div className="flex justify-center items-center gap-x-4 text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-2"><Mail size={14}/> {data.personal.email}</div>
          <span className="opacity-50">&bull;</span>
          <div className="flex items-center gap-2"><Phone size={14}/> {data.personal.phone}</div>
           <span className="opacity-50">&bull;</span>
          <div className="flex items-center gap-2"><MapPin size={14}/> {data.personal.location}</div>
          {data.personal.website && (
            <>
               <span className="opacity-50">&bull;</span>
              <a href={`https://${data.personal.website}`} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-2"><Globe size={14}/>{data.personal.website}</a>
            </>
          )}
        </div>
      </header>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{...sectionTitleStyle, ...fontStyle}}><Briefcase />Experience</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-bold" style={fontStyle}>{exp.role}</h3>
              <p className="text-sm text-gray-500 font-mono">{exp.date}</p>
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{...fontStyle, color}}>{exp.company}</h4>
            <div className="text-sm text-gray-600 whitespace-pre-line prose max-w-none prose-sm">{exp.description}</div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{...sectionTitleStyle, ...fontStyle}}><GraduationCap />Education</h2>
        {data.education.map(edu => (
          <div key={edu.id} className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-bold" style={fontStyle}>{edu.institution}</h3>
              <p className="text-sm text-gray-500 font-mono">{edu.date}</p>
            </div>
            <h4 className="text-lg font-semibold mb-1" style={{...fontStyle, color}}>{edu.degree}</h4>
            <p className="text-sm text-gray-600 whitespace-pre-line">{edu.description}</p>
          </div>
        ))}
      </section>

      {/* Skills & References */}
      <div className="grid grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{...sectionTitleStyle, ...fontStyle}}><Wrench />Skills</h2>
          <div className="flex flex-wrap gap-2">
            {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
              <span key={skill} className="text-sm font-medium py-1 px-3 rounded-full border" style={skillStyle}>{skill}</span>
            ))}
          </div>
        </section>
        {data.references && (
           <section>
            <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{...sectionTitleStyle, ...fontStyle}}><BookUser />References</h2>
            <p className="text-sm whitespace-pre-line">{data.references}</p>
          </section>
        )}
      </div>
    </div>
  );
};
