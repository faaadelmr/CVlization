
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Wrench, BookUser, Briefcase, GraduationCap, User } from 'lucide-react';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';

// Web Preview Component
export const ClassicTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
  const { selectedFont } = useResume();
  const leftColStyle = { backgroundColor: `${color}1A` }; // 10% opacity
  const nameStyle = { color: color };
  const sectionTitleStyle = { borderBottomColor: color, color: color };
  const fontStyle = { fontFamily: selectedFont };
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div className="flex h-full" style={{...fontStyle, backgroundColor: bgColor, color: textColor}}>
      {/* Left Column */}
      <div className="w-2/5 p-8 flex flex-col items-center text-center" style={leftColStyle}>
        {data.personal.photo && (
            <div className="w-32 h-32 relative mb-6 rounded-full overflow-hidden shadow-lg">
                <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover" />
            </div>
        )}
        <h1 className="font-bold mb-2" style={{...nameStyle, ...fontStyle, fontSize: '2rem'}}>{data.personal.name}</h1>
        <p className="font-medium mb-8" style={{...fontStyle, fontSize: '1rem', ...lightTextStyle}}>{data.personal.role}</p>
        
        <div className="space-y-6 text-sm text-left">
          <div>
            <h3 className="font-bold text-base mb-2 flex items-center gap-2" style={{...nameStyle, ...fontStyle}}><Mail size={16}/> Contact</h3>
            <p className="pl-6">{data.personal.phone}</p>
            <p className="pl-6">{data.personal.email}</p>
            <p className="pl-6">{data.personal.location}</p>
            {data.personal.website && <a href={`https://${data.personal.website}`} className="pl-6 hover:underline" style={nameStyle}>{data.personal.website}</a>}
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
            <h2 className="text-2xl font-bold uppercase border-b-2 pb-2 mb-4 flex items-center gap-3" style={{...sectionTitleStyle, ...fontStyle}}><User /> Profile</h2>
            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold uppercase border-b-2 pb-2 mb-4 flex items-center gap-3" style={{...sectionTitleStyle, ...fontStyle}}><Briefcase /> Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold" style={{...fontStyle, fontSize: '1.25rem', ...textStyle}}>{exp.role}</h3>
                <p className="text-sm" style={lightTextStyle}>{exp.date}</p>
              </div>
              <h4 className="font-semibold mb-2" style={{...fontStyle, fontSize: '1.125rem', ...lightTextStyle, opacity: 0.9}}>{exp.company}</h4>
              <div className="text-sm whitespace-pre-line prose max-w-none" style={lightTextStyle}>{exp.description}</div>
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-2xl font-bold uppercase border-b-2 pb-2 mb-4 flex items-center gap-3" style={{...sectionTitleStyle, ...fontStyle}}><GraduationCap/> Education</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold" style={{...fontStyle, fontSize: '1.25rem', ...textStyle}}>{edu.institution}</h3>
                <p className="text-sm" style={lightTextStyle}>{edu.date}</p>
              </div>
              <h4 className="font-semibold mb-1" style={{...fontStyle, fontSize: '1.125rem', ...lightTextStyle, opacity: 0.9}}>{edu.degree}</h4>
              <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{edu.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
