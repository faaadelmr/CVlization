
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Wrench, BookUser, Briefcase, GraduationCap } from 'lucide-react';
import { useResume } from '@/context/resume-context';

// Web Preview Component
export const ClassicTemplatePreview = ({ data, color }: { data: ResumeData, color: string }) => {
  const { selectedFont } = useResume();
  const leftColStyle = { backgroundColor: `${color}1A` }; // 10% opacity
  const nameStyle = { color: color };
  const sectionTitleStyle = { borderBottomColor: color, color: color };
  const fontStyle = { fontFamily: selectedFont };

  return (
    <div className="flex bg-white h-full text-gray-700" style={fontStyle}>
      {/* Left Column */}
      <div className="w-2/5 p-8" style={leftColStyle}>
        <h1 className="text-4xl font-bold mb-2" style={{...nameStyle, ...fontStyle}}>{data.personal.name}</h1>
        <p className="text-lg font-medium text-gray-600 mb-8" style={fontStyle}>Frontend Developer</p>
        
        <div className="space-y-6 text-sm">
          <div>
            <h3 className="font-bold text-base mb-2 flex items-center gap-2" style={{...nameStyle, ...fontStyle}}><Mail size={16}/> Contact</h3>
            <p className="pl-6">{data.personal.phone}</p>
            <p className="pl-6">{data.personal.email}</p>
            <p className="pl-6">{data.personal.location}</p>
            {data.personal.website && <a href={`https://${data.personal.website}`} className="pl-6 text-primary hover:underline">{data.personal.website}</a>}
          </div>
          <div>
            <h3 className="font-bold text-base mb-2 flex items-center gap-2" style={{...nameStyle, ...fontStyle}}><Wrench size={16}/> Skills</h3>
            <ul className="pl-6 list-disc list-inside">
              {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          {data.references && (
            <div>
              <h3 className="font-bold text-base mb-2 flex items-center gap-2" style={{...nameStyle, ...fontStyle}}><BookUser size={16}/> References</h3>
              <p className="pl-6 whitespace-pre-line">{data.references}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-3/5 p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold uppercase border-b-2 pb-2 mb-4 flex items-center gap-3" style={{...sectionTitleStyle, ...fontStyle}}><Briefcase /> Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold" style={fontStyle}>{exp.role}</h3>
                <p className="text-sm text-gray-500">{exp.date}</p>
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2" style={fontStyle}>{exp.company}</h4>
              <div className="text-sm text-gray-600 whitespace-pre-line prose max-w-none">{exp.description}</div>
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-2xl font-bold uppercase border-b-2 pb-2 mb-4 flex items-center gap-3" style={{...sectionTitleStyle, ...fontStyle}}><GraduationCap/> Education</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-bold" style={fontStyle}>{edu.institution}</h3>
                <p className="text-sm text-gray-500">{edu.date}</p>
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-1" style={fontStyle}>{edu.degree}</h4>
              <p className="text-sm text-gray-600 whitespace-pre-line">{edu.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
