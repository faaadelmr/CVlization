
export interface ResumeData {
  personal: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    description: string;
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

export type Template = 'modern' | 'classic' | 'creative' | 'swiss' | 'elegant' | 'professional';
export type Font = 'Inter' | 'Space Grotesk' | 'Roboto' | 'Lato' | 'Montserrat' | 'Open Sans' | 'Merriweather' | 'Source Sans Pro' | 'Playfair Display';


export interface ResumeContextProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: Template;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  selectedBgColor: string;
  setSelectedBgColor: React.Dispatch<React.SetStateAction<string>>;
  selectedTextColor: string;
  setSelectedTextColor: React.Dispatch<React.SetStateAction<string>>;
  selectedFont: Font;
  setSelectedFont: React.Dispatch<React.SetStateAction<Font>>;
  handleAnalyzeResume: (photoDataUri: string) => Promise<void>;
  isAiLoading: boolean;
}
