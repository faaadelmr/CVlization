
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ResumeContextProps, ResumeData, Template, Font } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import { analyzeResume } from '@/ai/flows/analyze-resume-flow';

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('diamond');
  const [selectedColor, setSelectedColor] = useState<string>('#2c3e50'); // Midnight Blue
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#FFFFFF'); // White
  const [selectedTextColor, setSelectedTextColor] = useState<string>('#1F2937'); // Black
  const [selectedFont, setSelectedFont] = useState<Font>('Lato');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAnalyzeResume = async (photoDataUri: string) => {
    setIsAiLoading(true);
    try {
      const analyzedData = await analyzeResume({ photoDataUri });
      
      // Add unique IDs to experience and education items
      const experienceWithIds = analyzedData.experience.map(exp => ({ ...exp, id: crypto.randomUUID() }));
      const educationWithIds = analyzedData.education.map(edu => ({ ...edu, id: crypto.randomUUID() }));
      
      const fullData = {
          ...initialData,
          ...analyzedData,
          personal: {
              ...initialData.personal,
              ...analyzedData.personal,
          },
          experience: experienceWithIds,
          education: educationWithIds,
      }

      setResumeData(fullData);
    } catch (error) {
      console.error("Failed to analyze resume:", error);
      // Optionally, show a toast notification to the user
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
