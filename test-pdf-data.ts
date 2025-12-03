import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

// Test data for the API endpoint
const testData = {
  resumeData: {
    personal: {
      name: "John Doe",
      role: "Software Engineer",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      website: "johndoe.com",
      description: "Experienced software engineer with a passion for creating efficient and scalable applications."
    },
    experience: [
      {
        company: "Tech Corp",
        role: "Senior Developer",
        date: "2020 - Present",
        description: "Developed and maintained web applications using React and Node.js. Led a team of 5 developers."
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        date: "2016 - 2020",
        description: "Graduated with honors. Specialized in software engineering."
      }
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "A full-stack e-commerce solution with payment integration.",
        technologies: "React, Node.js, MongoDB",
        link: "https://github.com/johndoe/ecommerce"
      }
    ],
    skills: "JavaScript, TypeScript, React, Node.js, Python, SQL"
  },
  template: "modern",
  color: "#1f2937",
  bgColor: "#ffffff",
  textColor: "#000000",
  font: "Inter",
  fileName: "test-resume.pdf"
};

export default testData;