
"use client";

import React, { createContext, useContext, useState } from 'react';
import type { ResumeContextProps, ResumeData, Template, Font } from '@/lib/types';
import { initialData } from '@/lib/initial-data';

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('professional');
  const [selectedColor, setSelectedColor] = useState<string>('#2c3e50'); // Midnight Blue
  const [selectedFont, setSelectedFont] = useState<Font>('Lato');

  const value = {
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
    selectedColor,
    setSelectedColor,
    selectedFont,
    setSelectedFont,
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
