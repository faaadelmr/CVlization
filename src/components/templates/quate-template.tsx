"use client";
import type { ResumeData, Font, Language } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, Code, User } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { getMailtoLink, getWhatsAppLink, getWebsiteLink } from '@/lib/contact-links';

// Web Preview Component
export const QuateTemplatePreview = ({ data, color, bgColor, textColor, font, language = 'en' }: { data: ResumeData, color: string, bgColor: string, textColor: string, font?: Font, language?: Language }) => {
  const sectionTitleStyle = {
    color: color,
  };

  const fontStyle = { fontFamily: font };
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };

  return (
    <div className="p-6 h-full" style={{ ...fontStyle, backgroundColor: bgColor, color: textColor }}>
      {/* Header */}
      <header className="mb-6 text-center">
        {data.personal.photo && (
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
            <Image src={data.personal.photo} alt={data.personal.name} width={96} height={96} className="object-cover" />
          </div>
        )}
        <h1 className="text-3xl font-bold" style={{ color, ...fontStyle }}>{data.personal.name}</h1>
        <p className="text-lg mt-2" style={lightTextStyle}>{data.personal.role}</p>

        <div className="flex justify-center gap-4 mt-4 text-sm" style={lightTextStyle}>
          <a href={getMailtoLink(data.personal.email)} className="flex items-center gap-1 hover:underline"><Mail size={14} /> {data.personal.email}</a>
          <a href={getWhatsAppLink(data.personal.phone)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline"><Phone size={14} /> {data.personal.phone}</a>
          <div className="flex items-center gap-1"><MapPin size={14} /> {data.personal.location}</div>
          {data.personal.website && (
            <a href={getWebsiteLink(data.personal.website)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" style={{ color }}><Globe size={14} /> {data.personal.website}</a>
          )}
        </div>
      </header>

      {/* Profile */}
      {data.personal.description && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ ...sectionTitleStyle, ...fontStyle }}><User />{t(language, 'profile')}</h2>
          <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{data.personal.description}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ ...sectionTitleStyle, ...fontStyle }}><Briefcase />{t(language, 'experience')}</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold" style={textStyle}>{exp.role}</h3>
                  <p className="text-sm" style={lightTextStyle}>{exp.date}</p>
                </div>
                <h4 className="font-medium mb-1" style={{ color }}>{exp.company}</h4>
                <p className="text-sm whitespace-pre-line" style={lightTextStyle}>{exp.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div>
          {/* Education */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ ...sectionTitleStyle, ...fontStyle }}><GraduationCap />{t(language, 'education')}</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold" style={textStyle}>{edu.institution}</h3>
                  <p className="text-sm" style={lightTextStyle}>{edu.date}</p>
                </div>
                <h4 className="font-medium mb-1" style={{ color }}>{edu.degree}</h4>
                <p className="text-sm" style={lightTextStyle}>{edu.description}</p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ ...sectionTitleStyle, ...fontStyle }}><Wrench />{t(language, 'skills')}</h2>
            <div className="flex flex-wrap gap-2">
              {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <span key={skill} className="px-2 py-1 text-sm rounded" style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}` }}>{skill}</span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ ...sectionTitleStyle, ...fontStyle }}><Code />{t(language, 'projects')}</h2>
          <div className="grid grid-cols-1 gap-3">
            {data.projects.map(proj => (
              <div key={proj.id} className="border-l-2 pl-3" style={{ borderLeftColor: color }}>
                <div className="flex justify-between">
                  <h3 className="font-semibold" style={textStyle}>{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm hover:underline" style={{ color }}>{proj.link}</a>
                  )}
                </div>
                <p className="text-sm mb-1" style={lightTextStyle}>{proj.description}</p>
                <p className="text-xs font-medium" style={{ color }}>{proj.technologies}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};