
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ResumeContextProps, ResumeData, Template, Font } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import { analyzeResume } from '@/ai/flows/analyze-resume-flow';
import { analyzeResumeWithModel } from '@/ai/flows/analyze-resume-with-model';

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('diamond');
  const [selectedColor, setSelectedColor] = useState<string>('#2c3e50'); // Midnight Blue
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#FFFFFF'); // White
  const [selectedTextColor, setSelectedTextColor] = useState<string>('#1F2937'); // Black
  const [selectedFont, setSelectedFont] = useState<Font>('Lato');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<'gemini-2.5-flash' | 'gemini-2.0-flash'>('gemini-2.5-flash');

  const handleAnalyzeResume = async (photoDataUri: string) => {
    setIsAiLoading(true);
    try {
      let analyzedData;

      // Use the selected model for analysis
      if (selectedAiModel === 'gemini-2.5-flash' || selectedAiModel === 'gemini-2.0-flash') {
        analyzedData = await analyzeResumeWithModel({ photoDataUri, model: selectedAiModel });
      } else {
        // Fallback to default model if something goes wrong
        analyzedData = await analyzeResume({ photoDataUri });
      }

      // Add unique IDs to experience, education and projects items
      const experienceWithIds = analyzedData.experience.map(exp => ({ ...exp, id: crypto.randomUUID() }));
      const educationWithIds = analyzedData.education.map(edu => ({ ...edu, id: crypto.randomUUID() }));
      const projectsWithIds = (analyzedData.projects || []).map(proj => ({...proj, id: crypto.randomUUID()}));

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
