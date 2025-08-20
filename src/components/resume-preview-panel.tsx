
"use client";

import { useEffect, useRef, useState } from "react";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { ModernTemplatePreview } from "./templates/modern-template";
import { ClassicTemplatePreview } from "./templates/classic-template";
import { CreativeTemplatePreview } from "./templates/creative-template";
import { SwissTemplatePreview } from "./templates/swiss-template";
import { ElegantTemplatePreview } from "./templates/elegant-template";
import { ProfessionalTemplatePreview } from "./templates/professional-template";
import { Skeleton } from "./ui/skeleton";
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import { cn } from "@/lib/utils";

const templateMap = {
  modern: {
    preview: ModernTemplatePreview,
  },
  classic: {
    preview: ClassicTemplatePreview,
  },
  creative: {
    preview: CreativeTemplatePreview,
  },
  swiss: {
    preview: SwissTemplatePreview,
  },
  elegant: {
    preview: ElegantTemplatePreview,
  },
  professional: {
    preview: ProfessionalTemplatePreview,
  }
};

export function ResumePreviewPanel() {
  const { resumeData, selectedTemplate, selectedColor, selectedFont } = useResume();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const TemplatePreview = templateMap[selectedTemplate].preview;

  const fileName = resumeData.personal.name ? `${resumeData.personal.name.replace(/\s+/g, '-')}-Resume.pdf` : 'resume.pdf';
  
  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setLoading(true);

    const a4WidthMm = 210;
    const a4HeightMm = 297;
    const scale = 2;

    try {
      const dataUrl = await domtoimage.toPng(resumeRef.current, {
        width: resumeRef.current.clientWidth * scale,
        height: resumeRef.current.clientHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${resumeRef.current.clientWidth}px`,
          height: `${resumeRef.current.clientHeight}px`,
        },
      });
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, a4WidthMm, a4HeightMm);
      pdf.save(fileName);

    } catch (error) {
      console.error('oops, something went wrong!', error);
    } finally {
      setLoading(false);
    }
  };

  const fontClass = `font-${selectedFont.toLowerCase().replace(' ', '-')}`;

  return (
    <div className="h-screen bg-secondary flex flex-col items-center justify-start p-4 md:p-8 overflow-auto">
      <div className="w-full max-w-4xl flex justify-end mb-4 flex-shrink-0">
        {isClient ? (
          <Button onClick={handleDownload} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {loading ? "Generating..." : "Download PDF"}
          </Button>
        ) : (
          <Button disabled>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        )}
      </div>
      <div className="w-full max-w-4xl mx-auto flex-grow flex items-center justify-center">
        <div className="bg-white dark:bg-card-foreground/5 shadow-2xl rounded-lg w-full aspect-[210/297] overflow-hidden">
          <div ref={resumeRef} className={cn("w-full h-full", fontClass)} style={{ fontFamily: selectedFont }}>
              {isClient ? (
                <div className="w-full h-full overflow-auto">
                  <TemplatePreview data={resumeData} color={selectedColor} />
                </div>
              ) : (
                <Skeleton className="w-full h-full rounded-lg" />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
