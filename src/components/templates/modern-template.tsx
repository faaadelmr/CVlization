"use client";
import type { ResumeData } from '@/lib/types';

// Web Preview Component
export const ModernTemplatePreview = ({ data, color }: { data: ResumeData, color: string }) => {
  const sectionTitleStyle = {
    borderColor: color,
    color: color,
  };

  const skillStyle = {
    backgroundColor: `${color}20`, // 20% opacity
    color: color,
  }

  return (
    <div className="p-8 bg-white text-gray-800 font-body h-full">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold" style={{ color }}>{data.personal.name}</h1>
        <div className="flex justify-center gap-x-4 text-sm text-gray-600 mt-2">
          <span>{data.personal.email}</span>
          <span>&bull;</span>
          <span>{data.personal.phone}</span>
          <span>&bull;</span>
          <span>{data.personal.location}</span>
          {data.personal.website && (
            <>
              <span>&bull;</span>
              <a href={`https://${data.personal.website}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">{data.personal.website}</a>
            </>
          )}
        </div>
      </header>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-2xl font-headline font-bold uppercase border-b-2 pb-1 mb-4" style={sectionTitleStyle}>Experience</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-bold">{exp.role}</h3>
              <p className="text-sm text-gray-500">{exp.date}</p>
            </div>
            <h4 className="text-md font-semibold text-gray-700 mb-1">{exp.company}</h4>
            <div className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-2xl font-headline font-bold uppercase border-b-2 pb-1 mb-4" style={sectionTitleStyle}>Education</h2>
        {data.education.map(edu => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-bold">{edu.institution}</h3>
              <p className="text-sm text-gray-500">{edu.date}</p>
            </div>
            <h4 className="text-md font-semibold text-gray-700 mb-1">{edu.degree}</h4>
            <p className="text-sm text-gray-600 whitespace-pre-line">{edu.description}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-headline font-bold uppercase border-b-2 pb-1 mb-4" style={sectionTitleStyle}>Skills</h2>
        <div className="flex flex-wrap gap-2">
          {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
            <span key={skill} className="text-sm font-medium py-1 px-3 rounded-full" style={skillStyle}>{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
};
