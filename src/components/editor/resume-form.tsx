"use client";

import { useResume } from "@/context/resume-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, MinusCircle, PlusCircle, User, Wrench } from "lucide-react";
import type { ChangeEvent } from "react";
import type { ResumeData } from "@/lib/types";

export function ResumeForm() {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: keyof ResumeData, index?: number, field?: string) => {
    const { name, value } = e.target;
    
    setResumeData(prev => {
      const newData = { ...prev };
      if (section === 'personal' || section === 'skills' || section === 'references') {
        (newData[section] as any)[name] = value;
      } else if ((section === 'experience' || section === 'education') && index !== undefined && field) {
        (newData[section][index] as any)[field] = value;
      }
      return newData;
    });
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: crypto.randomUUID(), company: "", role: "", date: "", description: "" }]
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };
  
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: crypto.randomUUID(), institution: "", degree: "", date: "", description: "" }]
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  return (
    <Accordion type="multiple" defaultValue={['personal', 'experience']} className="w-full space-y-4">
      <AccordionItem value="personal" className="border rounded-lg bg-background">
        <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline"><User className="mr-2 text-primary" /> Personal Details</AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={resumeData.personal.name} onChange={(e) => handleChange(e, 'personal')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={resumeData.personal.email} onChange={(e) => handleChange(e, 'personal')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={resumeData.personal.phone} onChange={(e) => handleChange(e, 'personal')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={resumeData.personal.location} onChange={(e) => handleChange(e, 'personal')} />
            </div>
          </div>
           <div className="space-y-2">
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input id="website" name="website" value={resumeData.personal.website} onChange={(e) => handleChange(e, 'personal')} />
            </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="experience" className="border rounded-lg bg-background">
        <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline"><Briefcase className="mr-2 text-primary" /> Work Experience</AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-md relative space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input value={exp.company} onChange={(e) => handleChange(e, 'experience', index, 'company')} />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value={exp.role} onChange={(e) => handleChange(e, 'experience', index, 'role')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input value={exp.date} onChange={(e) => handleChange(e, 'experience', index, 'date')} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={exp.description} onChange={(e) => handleChange(e, 'experience', index, 'description')} rows={4} />
              </div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeExperience(exp.id)}><MinusCircle /></Button>
            </div>
          ))}
          <Button onClick={addExperience} variant="outline" className="w-full"><PlusCircle className="mr-2"/> Add Experience</Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education" className="border rounded-lg bg-background">
        <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline"><GraduationCap className="mr-2 text-primary" /> Education</AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-4">
           {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-md relative space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input value={edu.institution} onChange={(e) => handleChange(e, 'education', index, 'institution')} />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input value={edu.degree} onChange={(e) => handleChange(e, 'education', index, 'degree')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input value={edu.date} onChange={(e) => handleChange(e, 'education', index, 'date')} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={edu.description} onChange={(e) => handleChange(e, 'education', index, 'description')} rows={2}/>
              </div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeEducation(edu.id)}><MinusCircle /></Button>
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" className="w-full"><PlusCircle className="mr-2" /> Add Education</Button>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="skills" className="border rounded-lg bg-background">
        <AccordionTrigger className="p-4 font-headline text-lg hover:no-underline"><Wrench className="mr-2 text-primary" /> Skills</AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-2">
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Textarea id="skills" name="skills" value={resumeData.skills} onChange={(e) => setResumeData({...resumeData, skills: e.target.value})} rows={4}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
