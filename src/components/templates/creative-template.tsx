
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, User, Briefcase, GraduationCap, Star, Heart, MapPin } from 'lucide-react';
import { useResume } from '@/context/resume-context';
import Image from 'next/image';

// Helper function to determine if a color is light or dark
const isColorLight = (hexColor: string) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};


export const CreativeTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
  const { selectedFont } = useResume();
  const fontStyle = { fontFamily: selectedFont };

  // Use a dark color for the sidebar, ignoring user's bgColor selection for this specific template style
  const sidebarBgColor = '#2C3E50'; // A dark blue-gray
  const sidebarTextColor = '#FFFFFF'; // White text on dark sidebar

  const Section = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <section className="mb-8">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <h2 className="text-2xl font-bold" style={{ color: textColor }}>{title}</h2>
      </div>
      <div className="border-l-2 pl-10 ml-5" style={{ borderColor: color }}>
        {children}
      </div>
    </section>
  );

  return (
    <div className="flex h-full" style={{ ...fontStyle, backgroundColor: bgColor }}>
      {/* Left Sidebar */}
      <div className="w-1/3 text-white" style={{ backgroundColor: sidebarBgColor, color: sidebarTextColor }}>
        <div className="h-48" style={{ backgroundColor: color }}></div>
        <div className="px-8 -mt-24">
            {data.personal.photo ? (
              <div className="relative w-40 h-40 mx-auto rounded-full border-4 overflow-hidden shadow-lg" style={{ borderColor: color }}>
                  <Image src={data.personal.photo} alt={data.personal.name} layout="fill" className="object-cover" />
              </div>
            ) : (
                <div className="w-40 h-40 mx-auto"></div> // Placeholder to maintain layout
            )}
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold">{data.personal.name}</h1>
            <p className="text-lg font-light" style={{color: sidebarTextColor, opacity: 0.8}}>{data.personal.role}</p>
          </div>
          
          <div className="mt-10 space-y-8">
             <div>
              <h3 className="text-lg font-semibold border-b-2 pb-1 mb-3 flex items-center" style={{ borderColor: color, color: color }}>
                <Phone size={18} className="mr-2"/> Contact
              </h3>
              <div className="space-y-2 text-sm" style={{color: sidebarTextColor, opacity: 0.9}}>
                <p><strong className="font-semibold block" style={{color}}>Email</strong> {data.personal.email}</p>
                <p><strong className="font-semibold block" style={{color}}>Phone</strong> {data.personal.phone}</p>
                 {data.personal.website && <p><strong className="font-semibold block" style={{color}}>Website</strong> <a href={`https://${data.personal.website}`} className="hover:underline">{data.personal.website}</a></p>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold border-b-2 pb-1 mb-3 flex items-center" style={{ borderColor: color, color: color }}>
                <Star size={18} className="mr-2"/> Skills
              </h3>
              <ul className="space-y-1 text-sm" style={{color: sidebarTextColor, opacity: 0.9}}>
                {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
             {data.references && (
                <div>
                    <h3 className="text-lg font-semibold border-b-2 pb-1 mb-3 flex items-center" style={{ borderColor: color, color: color }}>
                    <Heart size={18} className="mr-2"/> Interests
                    </h3>
                    <p className="text-sm whitespace-pre-line" style={{color: sidebarTextColor, opacity: 0.9}}>{data.references}</p>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-10 overflow-auto">
        <Section icon={<User size={24} color={sidebarTextColor} />} title="Profile">
          <p className="text-sm whitespace-pre-line" style={{color: textColor, opacity: 0.8}}>{data.personal.description}</p>
        </Section>
        
        <Section icon={<Briefcase size={24} color={sidebarTextColor} />} title="Experience">
          {data.experience.map(exp => (
            <div key={exp.id} className="pb-6">
              <h3 className="text-xl font-bold" style={{color: textColor}}>{exp.role}</h3>
              <p className="text-md font-semibold mb-1" style={{color: textColor, opacity: 0.9}}>{exp.company}</p>
              <p className="text-xs text-gray-500 mb-2">{exp.date}</p>
              <div className="text-sm whitespace-pre-line prose max-w-none" style={{color: textColor, opacity: 0.8}}>{exp.description}</div>
            </div>
          ))}
        </Section>
        
        <Section icon={<GraduationCap size={24} color={sidebarTextColor} />} title="Education">
          {data.education.map(edu => (
            <div key={edu.id} className="pb-6">
              <h3 className="text-xl font-bold" style={{color: textColor}}>{edu.degree}</h3>
              <p className="text-md font-semibold mb-1" style={{color: textColor, opacity: 0.9}}>{edu.institution}</p>
              <p className="text-xs text-gray-500">{edu.date}</p>
               <div className="text-sm whitespace-pre-line prose max-w-none" style={{color: textColor, opacity: 0.8}}>{edu.description}</div>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
};
