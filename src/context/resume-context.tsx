
"use client";

import React, { createContext, useContext, useState } from 'react';
import type { ResumeContextProps, ResumeData, Template, Font, Language } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import { analyzeResumeWithPuter, type PuterAiModel } from '@/lib/puter-ai';

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('diamond');
  const [selectedColor, setSelectedColor] = useState<string>('#2c3e50'); // Midnight Blue
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#FFFFFF'); // White
  const [selectedTextColor, setSelectedTextColor] = useState<string>('#1F2937'); // Black
  const [selectedFont, setSelectedFont] = useState<Font>('Lato');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<PuterAiModel>('gemini-2.5-flash');

  const handleAnalyzeResume = async (photoDataUri: string) => {
    setIsAiLoading(true);
    try {
      // Use Puter.js free Gemini API (client-side)
      const analyzedData = await analyzeResumeWithPuter(photoDataUri, selectedAiModel);

      // Add unique IDs to experience, education and projects items
      const experienceWithIds = analyzedData.experience.map(exp => ({ ...exp, id: crypto.randomUUID() }));
      const educationWithIds = analyzedData.education.map(edu => ({ ...edu, id: crypto.randomUUID() }));
      const projectsWithIds = (analyzedData.projects || []).map(proj => ({ ...proj, id: crypto.randomUUID() }));

      const fullData = {
        ...initialData,
        ...analyzedData,
        personal: {
          ...initialData.personal,
          ...analyzedData.personal,
        },
        experience: experienceWithIds,
        education: educationWithIds,
        projects: projectsWithIds,
      }

      setResumeData(fullData);
    } catch (error: any) {
      console.error("Failed to analyze resume:", error);

      // Throw the error so the calling component can handle it with toast
      throw new Error(`AI Analysis failed: ${error?.message || 'Unknown error occurred'}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  const value = {
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
    selectedColor,
    setSelectedColor,
    selectedBgColor,
    setSelectedBgColor,
    selectedTextColor,
    setSelectedTextColor,
    selectedFont,
    setSelectedFont,
    selectedLanguage,
    setSelectedLanguage,
    selectedAiModel,
    setSelectedAiModel,
    handleAnalyzeResume,
    isAiLoading,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextProps => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

