"use client";
import { useState } from 'react';
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { recommendTemplate } from "@/ai/flows/recommend-template";
import type { RecommendTemplateOutput } from "@/ai/flows/recommend-template";
import { Badge } from '../ui/badge';

export function AiAssistPanel() {
  const { resumeData, setResumeData } = useResume();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendTemplateOutput | null>(null);

  const handleAiSuggestions = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await recommendTemplate({ skills: resumeData.skills });
      setResult(response);
    } catch (error) {
      console.error("AI suggestion error:", error);
      toast({
        title: "Error",
        description: "Could not get AI suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const addSkill = (skill: string) => {
    if (!resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: prev.skills ? `${prev.skills}, ${skill}` : skill,
      }));
      toast({
        title: "Skill Added",
        description: `"${skill}" has been added to your skills.`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Sparkles className="text-primary" />
          AI-Powered Suggestions
        </CardTitle>
        <CardDescription>
          Get tailored recommendations for your resume based on your skills.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="ai-skills" className="font-medium text-sm">Your current skills</label>
          <Textarea
            id="ai-skills"
            value={resumeData.skills}
            onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
            rows={4}
            className="mt-2"
            placeholder="e.g., React, Project Management, Graphic Design"
          />
        </div>
        <Button onClick={handleAiSuggestions} disabled={loading || !resumeData.skills} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          {loading ? 'Analyzing...' : 'Get Suggestions'}
        </Button>

        {result && (
          <Card className="bg-background mt-4">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Recommended Template</h4>
                <p className="text-sm">{result.templateRecommendation}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Suggested Additional Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {result.additionalSkills.split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                    <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-primary/20" onClick={() => addSkill(skill)}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
