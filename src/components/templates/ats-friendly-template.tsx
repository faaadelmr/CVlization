
"use client";
import type { ResumeData } from '@/lib/types';
import { useResume } from '@/context/resume-context';

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 pb-1 mb-3">{title}</h2>
        {children}
    </section>
);

export const AtsFriendlyTemplatePreview = ({ data, color, bgColor, textColor }: { data: ResumeData, color: string, bgColor: string, textColor: string }) => {
  const { selectedFont } = useResume();
  const fontStyle = { fontFamily: selectedFont };
  const textStyle = { color: textColor };
  const lightTextStyle = { color: textColor, opacity: 0.8 };
  const sectionTitleStyle = { borderColor: textColor, color: textColor };
  const linkStyle = { color: color };

  return (
    <div className="p-8 h-full overflow-auto" style={{...fontStyle, backgroundColor: bgColor, color: textColor}}>
        {/* Header */}
        <header className="text-center mb-8">
            <h1 className="text-4xl font-bold">{data.personal.name}</h1>
            <p className="text-md mt-1">{data.personal.role}</p>
            <div className="flex justify-center items-center gap-x-4 text-sm mt-2" style={lightTextStyle}>
              <span>{data.personal.location}</span>
              <span>&bull;</span>
              <span>{data.personal.phone}</span>
              <span>&bull;</span>
              <span>{data.personal.email}</span>
              {data.personal.website && (
                <>
                  <span>&bull;</span>
                  <a href={`https://${data.personal.website}`} target="_blank" rel="noreferrer" className="hover:underline" style={linkStyle}>{data.personal.website}</a>
                </>
              )}
            </div>
        </header>

        {/* Profile / Summary */}
        <Section>
            <h2 className="text-xl font-bold uppercase" style={sectionTitleStyle}>Summary</h2>
            <p className="text-sm whitespace-pre-line mt-2" style={lightTextStyle}>{data.personal.description}</p>
        </Section>
        
        {/* Skills */}
        <Section>
            <h2 className="text-xl font-bold uppercase" style={sectionTitleStyle}>Skills</h2>
            <p className="text-sm whitespace-pre-line mt-2" style={lightTextStyle}>{data.skills}</p>
        </Section>
        
        {/* Experience */}
        <Section>
            <h2 className="text-xl font-bold uppercase" style={sectionTitleStyle}>Experience</h2>
            {data.experience.map(exp => (
                <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-bold">{exp.company}</h3>
                        <p className="text-sm font-mono" style={lightTextStyle}>{exp.date}</p>
                    </div>
                    <p className="font-semibold italic">{exp.role}</p>
                    <div className="text-sm whitespace-pre-line prose max-w-none mt-1" style={lightTextStyle}>{exp.description}</div>
                </div>
            ))}
        </Section>
        
        {/* Projects */}
        <Section>
            <h2 className="text-xl font-bold uppercase" style={sectionTitleStyle}>Projects</h2>
            {data.projects.map(proj => (
                <div key={proj.id} className="mb-4">
                     <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-bold">{proj.name}</h3>
                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm hover:underline" style={linkStyle}>View Project</a>}
                    </div>
                    <p className="font-semibold italic text-sm" style={lightTextStyle}>Technologies: {proj.technologies}</p>
                    <div className="text-sm whitespace-pre-line prose max-w-none mt-1" style={lightTextStyle}>{proj.description}</div>
                </div>
            ))}
        </Section>
        
        {/* Education */}
        <Section>
            <h2 className="text-xl font-bold uppercase" style={sectionTitleStyle}>Education</h2>
            {data.education.map(edu => (
                <div key={edu.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-bold">{edu.institution}</h3>
                        <p className="text-sm font-mono" style={lightTextStyle}>{edu.date}</p>
                    </div>
                    <p className="font-semibold italic">{edu.degree}</p>
                    <p className="text-sm whitespace-pre-line mt-1" style={lightTextStyle}>{edu.description}</p>
                </div>
            ))}
        </Section>
        
        {/* References */}
        {data.references && (
             <Section>
                <h2 className="text-xl font-bold uppercase" style={sectionTitleStyle}>References</h2>
                <p className="text-sm whitespace-pre-line mt-2" style={lightTextStyle}>{data.references}</p>
            </Section>
        )}
    </div>
  );
};

    