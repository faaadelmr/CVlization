"use client";
import type { ResumeData } from '@/lib/types';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Use standard fonts for PDF compatibility
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 10,
    color: '#333',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: '#333',
    paddingBottom: 4,
    textTransform: 'uppercase',
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
  },
  date: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 10,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 4,
    color: '#555',
  },
  description: {
    fontSize: 10,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#EAEAEA',
    color: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    margin: 3,
  },
});

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


// PDF Component
export const ModernTemplatePDF = ({ data, color }: { data: ResumeData, color: string }) => {
  const dynamicStyles = StyleSheet.create({
    name: {
      color: color,
    },
    sectionTitle: {
      borderBottomColor: color,
      color: color,
    },
    skill: {
      backgroundColor: `${color}20`,
      color: color,
    }
  });

  return (
    <Document title={`${data.personal.name} - Resume`} author={data.personal.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={[styles.name, dynamicStyles.name]}>{data.personal.name || ''}</Text>
          <Text style={styles.contactInfo}>
            {(data.personal.email || '')} | {(data.personal.phone || '')} | {(data.personal.location || '')}
            {data.personal.website && (
              <Text> | <Link src={`https://${data.personal.website}`} style={{color: 'blue', textDecoration: 'underline'}}>{data.personal.website}</Link></Text>
            )}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Experience</Text>
          {data.experience.map(exp => (
            <View key={exp.id} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.title}>{exp.role || ''}</Text>
                <Text style={styles.date}>{exp.date || ''}</Text>
              </View>
              <Text style={styles.subtitle}>{exp.company || ''}</Text>
              <Text style={styles.description}>{exp.description || ''}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Education</Text>
          {data.education.map(edu => (
            <View key={edu.id} style={styles.entry}>
               <View style={styles.entryHeader}>
                <Text style={styles.title}>{edu.institution || ''}</Text>
                <Text style={styles.date}>{edu.date || ''}</Text>
              </View>
              <Text style={styles.subtitle}>{edu.degree || ''}</Text>
              <Text style={styles.description}>{edu.description || ''}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Skills</Text>
          <View style={styles.skills}>
            {(data.skills || '').split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
              <Text key={skill} style={[styles.skill, {backgroundColor: `${color}20`, color: '#333'}]}>{skill}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
