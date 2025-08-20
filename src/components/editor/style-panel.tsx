
"use client";

import { useResume } from "@/context/resume-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Font, Template } from "@/lib/types";

const templates: { id: Template, name: string, image: string, hint: string }[] = [
  { id: 'modern', name: 'Modern', image: 'https://placehold.co/400x565' , hint: 'resume modern'},
  { id: 'classic', name: 'Classic', image: 'https://placehold.co/400x565', hint: 'resume classic' },
  { id: 'creative', name: 'Creative', image: 'https://placehold.co/400x565', hint: 'resume creative' },
  { id: 'swiss', name: 'Swiss', image: 'https://placehold.co/400x565', hint: 'resume swiss design' },
  { id: 'elegant', name: 'Elegant', image: 'https://placehold.co/400x565', hint: 'resume elegant' },
  { id: 'professional', name: 'Professional', image: 'https://placehold.co/400x565', hint: 'resume professional' },
];

const colors = [
  { id: 'dusty-blue', value: '#6A89CC', name: 'Dusty Blue' },
  { id: 'soft-lavender', value: '#BCA0DC', name: 'Soft Lavender' },
  { id: 'slate-gray', value: '#708090', name: 'Slate Gray' },
  { id: 'midnight-blue', value: '#2c3e50', name: 'Midnight Blue' },
  { id: 'teal', value: '#008080', name: 'Teal' },
  { id: 'forest-green', value: '#2D572C', name: 'Forest Green' },
  { id: 'crimson', value: '#990000', name: 'Crimson' },
  { id: 'coral-pink', value: '#F88379', name: 'Coral Pink' },
  { id: 'sunflower', value: '#f1c40f', name: 'Sunflower' },
  { id: 'amethyst', value: '#9b59b6', name: 'Amethyst' },
  { id: 'emerald', value: '#2ecc71', name: 'Emerald' },
  { id: 'charcoal', value: '#34495e', name: 'Charcoal' },
  { id: 'deep-ocean', value: '#005f73', name: 'Deep Ocean' },
  { id: 'burnt-sienna', value: '#e55a32', name: 'Burnt Sienna' },
  { id: 'sage-green', value: '#8f9d7d', name: 'Sage Green' },
  { id: 'royal-purple', value: '#6a0dad', name: 'Royal Purple' },
  { id: 'mustard-yellow', value: '#ffdb58', name: 'Mustard Yellow' },
];

const fonts: { id: Font; name: string }[] = [
  { id: 'Inter', name: 'Inter' },
  { id: 'Space Grotesk', name: 'Space Grotesk' },
  { id: 'Roboto', name: 'Roboto' },
  { id: 'Lato', name: 'Lato' },
  { id: 'Montserrat', name: 'Montserrat' },
  { id: 'Open Sans', name: 'Open Sans' },
  { id: 'Merriweather', name: 'Merriweather' },
  { id: 'Source Sans Pro', name: 'Source Sans Pro' },
  { id: 'Playfair Display', name: 'Playfair Display' },
];

export function StylePanel() {
  const { selectedTemplate, setSelectedTemplate, selectedColor, setSelectedColor, selectedFont, setSelectedFont } = useResume();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-headline mb-4">Template</h3>
        <div className="grid grid-cols-2 gap-4">
          {templates.map(template => (
            <Card
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={cn(
                "cursor-pointer transition-all",
                selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:shadow-md"
              )}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-base font-body">{template.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Image
                  src={template.image}
                  alt={`${template.name} template preview`}
                  width={400}
                  height={565}
                  data-ai-hint={template.hint}
                  className="rounded-b-lg"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-headline mb-4">Color Scheme</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <button
              key={color.id}
              title={color.name}
              onClick={() => setSelectedColor(color.value)}
              className={cn(
                "w-8 h-8 rounded-full transition-transform transform hover:scale-110",
                selectedColor === color.value ? "ring-2 ring-primary ring-offset-2" : ""
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
