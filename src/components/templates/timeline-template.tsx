
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, User, Home } from 'lucide-react';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';

export const TimelineTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
  const { selectedFont } = useResume();
  const fontStyle = { fontFamily: selectedFont };
  
  // Use the selected color for the header background
  const headerBgStyle = { backgroundColor: color };
  // Text on the dark header should be light
  const headerTextStyle = { color: bgColor }; 
  // Main body background
  const bodyBgStyle = { backgroundColor: bgColor };
  // Sidebar background (slightly darker than body)
  const sidebarBgStyle = { backgroundColor: `${color}1A` }; // 10% opacity of accent color
  // Main text color for the body
  const bodyTextStyle = { color: textColor };
  const accentColorStyle = { color };

  return (
    <div className="h-full overflow-auto flex flex-col" style={{ ...fontStyle, ...bodyBgStyle }}>
      {/* Header Section */}
      <header className="flex text-white p-8" style={headerBgStyle}>
        <div className="w-1/3 flex flex-col justify-center pr-6">
          <h1 className="font-bold uppercase tracking-wider" style={{ ...headerTextStyle, fontSize: '2.5rem', lineHeight: '1.1' }}>{data.personal.name}</h1>
          <div className="w-1/4 h-1 my-3" style={{backgroundColor: bgColor}}></div>
          <p className="font-light tracking-widest" style={{ ...headerTextStyle, fontSize: '1.25rem' }}>{data.personal.role}</p>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          {data.personal.photo && (
            <div className="w-36 h-36 relative rounded-full overflow-hidden border-4" style={{borderColor: bgColor}}>
              <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover" />
            </div>
          )}
        </div>
        <div className="w-1/3 flex flex-col justify-center pl-6">
          <h2 className="font-bold text-2xl mb-2" style={headerTextStyle}>HELLO!</h2>
          <p className="text-xs whitespace-pre-line" style={{...headerTextStyle, opacity: 0.8}}>{data.personal.description}</p>
        </div>
      </header>

      {/* Body Section */}
      <main className="flex flex-grow">
        {/* Left Sidebar */}
        <aside className="w-1/3 p-8" style={sidebarBgStyle}>
          <section className="mb-8">
            <h3 className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{...accentColorStyle, borderColor: color}}>Contact</h3>
            <div className="space-y-3 text-sm" style={bodyTextStyle}>
              <div className="flex items-center gap-3">
                <Phone size={14} style={accentColorStyle} /> <span>{data.personal.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} style={accentColorStyle} /> <span>{data.personal.email}</span>
              </div>
               <div className="flex items-center gap-3">
                <Home size={14} style={accentColorStyle} /> <span>{data.personal.location}</span>
              </div>
            </div>
          </section>
          <section>
            <h3 className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{...accentColorStyle, borderColor: color}}>Skills</h3>
            <ul className="space-y-2 text-sm list-disc list-inside" style={bodyTextStyle}>
              {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Right Main Content */}
        <div className="w-2/3 p-8" style={bodyTextStyle}>
          <section className="mb-8">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{...accentColorStyle, borderColor: color}}>Education</h3>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <p className="text-sm font-semibold">{edu.date}</p>
                  <h4 className="font-bold text-lg" style={bodyTextStyle}>{edu.degree}</h4>
                  <p className="text-sm" style={{opacity: 0.8}}>{edu.institution}</p>
                  <p className="text-sm whitespace-pre-line" style={{opacity: 0.8}}>{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-xl font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{...accentColorStyle, borderColor: color}}>Work Experience</h3>
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-lg" style={bodyTextStyle}>{exp.role}</h4>
                    <p className="text-sm font-semibold">{exp.date}</p>
                  </div>
                  <p className="text-sm mb-2" style={{opacity: 0.8}}>{exp.company}</p>
                  <div className="text-sm whitespace-pre-line prose max-w-none prose-sm" style={{opacity: 0.8}}>{exp.description}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
