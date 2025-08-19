export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  experience: {
    id: string;
    company: string;
    role: string;
    date: string;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    date: string;
    description: string;
  }[];
  skills: string;
  references: string;
}

export type Template = 'modern' | 'classic';

export interface ResumeContextProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: Template;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}
