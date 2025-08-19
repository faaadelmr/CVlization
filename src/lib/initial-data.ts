import type { ResumeData } from './types';

export const initialData: ResumeData = {
  personal: {
    name: "Alex Doe",
    email: "alex.doe@email.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    website: "alexdoe.dev",
  },
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Developer",
      date: "Jan 2020 - Present",
      description: `- Led the development of a new e-commerce platform, resulting in a 30% increase in sales.
- Mentored junior developers and conducted code reviews to maintain code quality.
- Collaborated with UX/UI designers to implement responsive and accessible user interfaces.`,
    },
     {
      id: "exp2",
      company: "Web Innovators",
      role: "Frontend Developer",
      date: "Jun 2017 - Dec 2019",
      description: `- Developed and maintained client websites using React, and Redux.
- Improved website performance by 20% through code optimization and lazy loading.`,
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "State University",
      degree: "B.S. in Computer Science",
      date: "2013 - 2017",
      description: "- Graduated with honors (Cum Laude)\n- Member of the university coding club.",
    },
  ],
  skills: "React, Next.js, TypeScript, Tailwind CSS, JavaScript, HTML, CSS, Git, UI/UX Design",
  references: "Available upon request",
};
