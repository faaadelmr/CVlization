
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ResumeContextProps, ResumeData, Template, Font } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import { analyzeResume } from '@/ai/flows/analyze-resume-flow';

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

// Helper function to determine if a color is light or dark
const isColorLight = (hexColor: string): boolean => {
  const color = hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  // Using the HSP (Highly Sensitive Poo) equation
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  // Using the threshold of 127.5, you can classify the color as light or dark
  return hsp > 127.5;
};


export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('professional');
  const [selectedColor, setSelectedColor] = useState<string>('#2c3e50'); // Midnight Blue
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#FFFFFF'); // White
  const [selectedTextColor, setSelectedTextColor] = useState<string>('#374151'); // Gray 700
  const [selectedFont, setSelectedFont] = useState<Font>('Lato');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  useEffect(() => {
    // Automatically adjust text color for readability based on background color
    const isBgLight = isColorLight(selectedBgColor);
    setSelectedTextColor(isBgLight ? '#374151' : '#F9FAFB'); // Dark text on light bg, light text on dark bg
  }, [selectedBgColor]);

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
