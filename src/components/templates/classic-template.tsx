"use client";
import type { ResumeData } from '@/lib/types';

// Web Preview Component
export const ClassicTemplatePreview = ({ data, color }: { data: ResumeData, color: string }) => {
  const leftColStyle = { backgroundColor: `${color}1A` }; // 10% opacity
  const nameStyle = { color: color };
  const sectionTitleStyle = { borderBottomColor: color };

  return (
    <div className="flex bg-white h-full font-body">
      {/* Left Column */}
      <div className="w-1/3 p-6" style={leftColStyle}>
        <h1 className="text-3xl font-headline font-bold mb-4" style={nameStyle}>{data.personal.name}</h1>
        <div className="space-y-3 text-sm">
          <div>
            <h3 className="font-bold text-base mb-1" style={nameStyle}>Contact</h3>
            <p>{data.personal.phone}</p>
            <p>{data.personal.email}</p>
            <p>{data.personal.location}</p>
            {data.personal.website && <a href={`https://${data.personal.website}`} className="text-primary hover:underline">{data.personal.website}</a>}
          </div>
          <div>
            <h3 className="font-bold text-base mb-1" style={nameStyle}>Skills</h3>
            <ul className="list-disc list-inside">
              {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          {data.references && (
            <div>
              <h3 className="font-bold text-base mb-1" style={nameStyle}>References</h3>
              <p className="whitespace-pre-line">{data.references}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-8">
        <section className="mb-6">
          <h2 className="text-xl font-headline font-bold uppercase border-b-2 pb-1 mb-4" style={sectionTitleStyle}>Experience</h2>
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
        <section>
          <h2 className="text-xl font-headline font-bold uppercase border-b-2 pb-1 mb-4" style={sectionTitleStyle}>Education</h2>
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
      </div>
    </div>
  );
};
