"use client";

import { useResume } from "@/context/resume-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

const templates = [
  { id: 'modern', name: 'Modern', image: 'https://placehold.co/400x565' , hint: 'resume modern'},
  { id: 'classic', name: 'Classic', image: 'https://placehold.co/400x565', hint: 'resume classic' },
];

const colors = [
  { id: 'dusty-blue', value: '#6A89CC', name: 'Dusty Blue' },
  { id: 'soft-lavender', value: '#BCA0DC', name: 'Soft Lavender' },
  { id: 'forest-green', value: '#2ecc71', name: 'Forest Green' },
  { id: 'charcoal', value: '#34495e', name: 'Charcoal' },
  { id: 'crimson', value: '#e74c3c', name: 'Crimson' },
];

export function StylePanel() {
  const { selectedTemplate, setSelectedTemplate, selectedColor, setSelectedColor } = useResume();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-headline mb-4">Template</h3>
        <div className="grid grid-cols-2 gap-4">
          {templates.map(template => (
            <Card
              key={template.id}
              onClick={() => setSelectedTemplate(template.id as 'modern' | 'classic')}
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
    </div>
  );
}
