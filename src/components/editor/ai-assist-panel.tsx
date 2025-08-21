"use client";

import { useState, type ChangeEvent } from "react";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export function AiAssistPanel() {
  const { handleAnalyzeResume, isAiLoading } = useResume();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload an image file (e.g., PNG, JPG).",
        });
        e.target.value = ''; // Reset the input
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = () => {
    if (previewUrl) {
      handleAnalyzeResume(previewUrl);
    } else {
       toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload an image of your resume first.",
      });
    }
  };

  return (
    <Card className="bg-background border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline"><Wand2 /> AI Re-write</CardTitle>
        <CardDescription>
          Upload image your old CV, and AI will re-write for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="resume-upload">Upload Resume Image</Label>
          <Input id="resume-upload" type="file" onChange={handleFileChange} accept="image/*" />
        </div>

        {previewUrl && (
          <div className="space-y-4">
             <p className="text-sm text-muted-foreground">Image Preview:</p>
            <div className="border rounded-lg p-2 bg-secondary/50">
              <Image
                src={previewUrl}
                alt="Resume preview"
                width={300}
                height={424}
                className="rounded-md object-contain max-h-[424px] w-auto mx-auto"
              />
            </div>
          </div>
        )}

        <Button onClick={handleAnalyzeClick} disabled={isAiLoading || !selectedFile} className="w-full">
          {isAiLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
             <Wand2 className="mr-2 h-4 w-4" />
              Analyze Resume
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
