
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, BookUser, User } from 'lucide-react';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Web Preview Component
export const ModernTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
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
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div className="p-8 h-full overflow-auto" style={{...fontStyle, backgroundColor: bgColor, color: textColor}}>
      {/* Header */}
      <header className="text-center mb-10 border-b-2 pb-6 flex items-center justify-between" style={{borderColor: color}}>
        {data.personal.photo && (
            <div className="w-28 h-28 relative rounded-full overflow-hidden shadow-md flex-shrink-0">
                <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover" />
            </div>
        )}
        <div className={data.personal.photo ? "text-right flex-grow" : "text-center w-full"}>
            <h1 className="font-bold" style={{ ...fontStyle, color, fontSize: '3rem' }}>{data.personal.name}</h1>
            <p className="font-light mt-2" style={{...fontStyle, fontSize: '1.25rem', ...lightTextStyle}}>{data.personal.role}</p>
            <div className={cn("flex items-center gap-x-4 text-sm mt-4", data.personal.photo ? "justify-end" : "justify-center")} style={lightTextStyle}>
              <div className="flex items-center gap-2"><Mail size={14}/> {data.personal.email}</div>
              <span className="opacity-50">&bull;</span>
              <div className="flex items-center gap-2"><Phone size={14}/> {data.personal.phone}</div>
               <span className="opacity-50">&bull;</span>
              <div className="flex items-center gap-2"><MapPin size={14}/> {data.personal.location}</div>
              {data.personal.website && (
                <>
                   <span className="opacity-50">&bull;</span>
                  <a href={`https://${data.personal.website}`} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-2" style={{color}}><Globe size={14}/>{data.personal.website}</a>
                </>
              )}
            </div>
        </div>
      </header>
      
      {/* Profile */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{...sectionTitleStyle, ...fontStyle}}><User />Profile</h2>
        <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{...sectionTitleStyle, ...fontStyle}}><Briefcase />Experience</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold" style={{...fontStyle, fontSize: '1.25rem', ...textStyle}}>{exp.role}</h3>
              <p className="text-sm font-mono" style={lightTextStyle}>{exp.date}</p>
            </div>
            <h4 className="text-lg font-semibold mb-2" style={{...fontStyle, color, fontSize: '1.125rem'}}>{exp.company}</h4>
            <div className="text-sm whitespace-pre-line prose max-w-none prose-sm" style={lightTextStyle}>{exp.description}</div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-5" style={{...sectionTitleStyle, ...fontStyle}}><GraduationCap />Education</h2>
        {data.education.map(edu => (
          <div key={edu.id} className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold" style={{...fontStyle, fontSize: '1.25rem', ...textStyle}}>{edu.institution}</h3>
              <p className="text-sm font-mono" style={lightTextStyle}>{edu.date}</p>
            </div>
            <h4 className="text-lg font-semibold mb-1" style={{...fontStyle, color, fontSize: '1.125rem'}}>{edu.degree}</h4>
            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{edu.description}</p>
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
            <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.references}</p>
          </section>
        )}
      </div>
    </div>
  );
};
