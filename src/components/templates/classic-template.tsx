"use client";
import type { ResumeData } from '@/lib/types';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Use standard fonts for PDF compatibility
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 11,
  },
  leftColumn: {
    flexDirection: 'column',
    width: '30%',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  rightColumn: {
    flexDirection: 'column',
    width: '70%',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
  },
  contactItem: {
    marginBottom: 5,
    fontSize: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 3,
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
    fontSize: 12,
  },
  date: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 10,
  },
  subtitle: {
    fontSize: 11,
    marginBottom: 4,
    color: '#555',
  },
  description: {
    fontSize: 10,
  },
  skill: {
    marginBottom: 4,
  },
});


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
              {data.skills.split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base mb-1" style={nameStyle}>References</h3>
            <p>{data.references}</p>
          </div>
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

// PDF Component
export const ClassicTemplatePDF = ({ data, color }: { data: ResumeData, color: string }) => {
  const dynamicStyles = StyleSheet.create({
    leftColumn: {
      backgroundColor: `${color}1A`,
    },
    name: {
      color: color,
    },
    sectionTitleRight: {
        borderBottomColor: color,
    },
  });

  return (
    <Document title={`${data.personal.name} - Resume`} author={data.personal.name}>
      <Page size="A4" style={styles.page}>
        <View style={[styles.leftColumn, dynamicStyles.leftColumn]}>
          <Text style={[styles.name, dynamicStyles.name]}>{data.personal.name}</Text>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: color, borderBottomColor: color}]}>Contact</Text>
            <Text style={styles.contactItem}>{data.personal.phone}</Text>
            <Text style={styles.contactItem}>{data.personal.email}</Text>
            <Text style={styles.contactItem}>{data.personal.location}</Text>
            {data.personal.website && <Link src={`https://${data.personal.website}`} style={[styles.contactItem, {color: 'blue', textDecoration: 'underline'}]}>{data.personal.website}</Link>}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: color, borderBottomColor: color}]}>Skills</Text>
            {data.skills.split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                <Text key={skill} style={styles.skill}>{skill}</Text>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: color, borderBottomColor: color}]}>References</Text>
            <Text style={styles.skill}>{data.references}</Text>
          </View>
        </View>

        <View style={styles.rightColumn}>
           <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitleRight]}>Experience</Text>
            {data.experience.map(exp => (
              <View key={exp.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{exp.role}</Text>
                  <Text style={styles.date}>{exp.date}</Text>
                </View>
                <Text style={styles.subtitle}>{exp.company}</Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitleRight]}>Education</Text>
            {data.education.map(edu => (
              <View key={edu.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.title}>{edu.institution}</Text>
                  <Text style={styles.date}>{edu.date}</Text>
                </View>
                <Text style={styles.subtitle}>{edu.degree}</Text>
                <Text style={styles.description}>{edu.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
