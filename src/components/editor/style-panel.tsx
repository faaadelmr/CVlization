
"use client";

import { useResume } from "@/context/resume-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Font, Template } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { ProfessionalTemplatePreview } from "../templates/professional-template";
import { ModernTemplatePreview } from "../templates/modern-template";
import { ClassicTemplatePreview } from "../templates/classic-template";
import { CreativeTemplatePreview } from "../templates/creative-template";
import { SwissTemplatePreview } from "../templates/swiss-template";
import { ElegantTemplatePreview } from "../templates/elegant-template";

const templates: { id: Template, name: string, component: React.FC<any> }[] = [
  { id: 'professional', name: 'Professional', component: ProfessionalTemplatePreview },
  { id: 'modern', name: 'Modern', component: ModernTemplatePreview },
  { id: 'classic', name: 'Classic', component: ClassicTemplatePreview },
  { id: 'creative', name: 'Creative', component: CreativeTemplatePreview },
  { id: 'swiss', name: 'Swiss', component: SwissTemplatePreview },
  { id: 'elegant', name: 'Elegant', component: ElegantTemplatePreview },
];

const colors = [
  { id: 'midnight-blue', value: '#2c3e50', name: 'Midnight Blue' },
  { id: 'slate-gray', value: '#708090', name: 'Slate Gray' },
  { id: 'dusty-blue', value: '#6A89CC', name: 'Dusty Blue' },
  { id: 'teal', value: '#008080', name: 'Teal' },
  { id: 'forest-green', value: '#2D572C', name: 'Forest Green' },
  { id: 'sage-green', value: '#8f9d7d', name: 'Sage Green' },
  { id: 'burnt-sienna', value: '#e55a32', name: 'Burnt Sienna' },
  { id: 'crimson', value: '#990000', name: 'Crimson' },
  { id: 'royal-purple', value: '#6a0dad', name: 'Royal Purple' },
  { id: 'amethyst', value: '#9b59b6', name: 'Amethyst' },
  { id: 'soft-lavender', value: '#BCA0DC', name: 'Soft Lavender' },
  { id: 'coral-pink', value: '#F88379', name: 'Coral Pink' },
  { id: 'sunflower', value: '#f1c40f', name: 'Sunflower' },
  { id: 'mustard-yellow', value: '#ffdb58', name: 'Mustard Yellow' },
  { id: 'emerald', value: '#2ecc71', name: 'Emerald' },
  { id: 'charcoal', value: '#34495e', name: 'Charcoal' },
  { id: 'deep-ocean', value: '#005f73', name: 'Deep Ocean' },
];
const bgColors = [
    { id: 'white', value: '#FFFFFF', name: 'White' },
    { id: 'ivory', value: '#FFFFF0', name: 'Ivory' },
    { id: 'light-gray', value: '#F5F5F5', name: 'Light Gray' },
    { id: 'beige', value: '#F5F5DC', name: 'Beige' },
    { id: 'light-blue', value: '#E6F0FF', name: 'Light Blue' },
    { id: 'dark-charcoal', value: '#2C2C2C', name: 'Dark Charcoal' },
    { id: 'navy', value: '#1A2A45', name: 'Navy' },
];


const fonts: { id: Font; name: string }[] = [
  { id: 'Lato', name: 'Lato' },
  { id: 'Inter', name: 'Inter' },
  { id: 'Space Grotesk', name: 'Space Grotesk' },
  { id: 'Roboto', name: 'Roboto' },
  { id: 'Montserrat', name: 'Montserrat' },
  { id: 'Open Sans', name: 'Open Sans' },
  { id: 'Merriweather', name: 'Merriweather' },
  { id: 'Source Sans Pro', name: 'Source Sans Pro' },
  { id: 'Playfair Display', name: 'Playfair Display' },
];

const TemplateCard = ({ template, isSelected, onClick, resumeData, color, bgColor, textColor }: { template: typeof templates[0], isSelected: boolean, onClick: () => void, resumeData: any, color: string, bgColor: string, textColor: string }) => {
  const TemplateComponent = template.component;
  return (
      <Card
        onClick={onClick}
        className={cn(
          "cursor-pointer transition-all overflow-hidden",
          isSelected ? "ring-2 ring-primary" : "hover:shadow-md"
        )}
      >
        <CardHeader className="p-4">
          <CardTitle className="text-base font-body">{template.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <div className="aspect-[210/297] w-full h-full relative overflow-hidden" style={{ background: bgColor }}>
             <div className="absolute inset-0 scale-[0.25] origin-top-left" style={{
               transform: 'scale(0.25)', // Adjust scale as needed
               transformOrigin: 'top left',
               width: '400%',
               height: '400%',
             }}>
              <TemplateComponent data={resumeData} color={color} bgColor={bgColor} textColor={textColor} />
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

export function StylePanel() {
  const { resumeData, selectedTemplate, setSelectedTemplate, selectedColor, setSelectedColor, selectedFont, setSelectedFont, selectedBgColor, setSelectedBgColor, selectedTextColor } = useResume();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-headline mb-4">Template</h3>
        <div className="grid grid-cols-2 gap-4">
          {templates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onClick={() => setSelectedTemplate(template.id)}
              resumeData={resumeData}
              color={selectedColor}
              bgColor={selectedBgColor}
              textColor={selectedTextColor}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-headline mb-4">Text Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <button
              key={color.id}
              title={color.name}
              onClick={() => setSelectedColor(color.value)}
              className={cn(
                "w-8 h-8 rounded-full transition-transform transform hover:scale-110 border",
                selectedColor === color.value ? "ring-2 ring-primary ring-offset-2" : ""
              )}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>
       <div>
        <h3 className="text-xl font-headline mb-4">Background Color</h3>
        <div className="flex flex-wrap gap-3">
          {bgColors.map(color => (
            <button
              key={color.id}
              title={color.name}
              onClick={() => setSelectedBgColor(color.value)}
              className={cn(
                "w-8 h-8 rounded-full transition-transform transform hover:scale-110 border",
                selectedBgColor === color.value ? "ring-2 ring-primary ring-offset-2" : ""
              )}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>
       <div>
        <h3 className="text-xl font-headline mb-4">Font</h3>
        <div className="space-y-2">
           <Label htmlFor="font-select">Select a font family</Label>
           <Select value={selectedFont} onValueChange={(value) => setSelectedFont(value as Font)}>
             <SelectTrigger id="font-select">
               <SelectValue placeholder="Select font" />
             </SelectTrigger>
             <SelectContent>
               {fonts.map(font => (
                 <SelectItem key={font.id} value={font.id} style={{fontFamily: font.id}}>
                   {font.name}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
        </div>
      </div>
    </div>
  );
}
