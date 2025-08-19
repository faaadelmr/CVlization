"use client";

import { useEffect, useRef, useState } from "react";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { ModernTemplatePreview } from "./templates/modern-template";
import { ClassicTemplatePreview } from "./templates/classic-template";
import { Skeleton } from "./ui/skeleton";
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

const templateMap = {
  modern: {
    preview: ModernTemplatePreview,
  },
  classic: {
    preview: ClassicTemplatePreview,
  },
};

export function ResumePreviewPanel() {
  const { resumeData, selectedTemplate, selectedColor } = useResume();
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
    try {
      const dataUrl = await domtoimage.toPng(resumeRef.current, {
        style: {
          '@font-face': {
            'font-family': 'Inter',
            src: `url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2emQ.woff2) format('woff2')`,
            'font-weight': '400',
            'font-style': 'normal',
          },
        }
      });
      
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName);

    } catch (error) {
      console.error('oops, something went wrong!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-secondary flex flex-col items-center justify-center p-4 md:p-8 overflow-auto">
      <div className="w-full max-w-4xl flex justify-end mb-4">
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
      <div ref={resumeRef} className="bg-white dark:bg-card-foreground/5 shadow-2xl rounded-lg w-full max-w-4xl aspect-[210/297] overflow-hidden">
        {isClient ? (
          <div className="w-full h-full overflow-auto">
            <TemplatePreview data={resumeData} color={selectedColor} />
          </div>
        ) : (
          <Skeleton className="w-full h-full rounded-lg" />
        )}
      </div>
    </div>
  );
}
