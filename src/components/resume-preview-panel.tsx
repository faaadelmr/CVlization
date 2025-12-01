
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
import { TimelineTemplatePreview } from "./templates/timeline-template";
import { Skeleton } from "./ui/skeleton";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cn } from "@/lib/utils";
import { SmartStartTemplatePreview } from "./templates/smart-start-template";
import { VektoristikTemplatePreview } from "./templates/vektoristik-template";
import { AwesomeTemplatePreview } from "./templates/awesome-template";
import { CooperTemplatePreview } from "./templates/cooper-template";
import { QueteTemplatePreview } from "./templates/quete-template";
import { DiamondTemplatePreview } from "./templates/diamond-template";
import { HexagonvyTemplatePreview } from "./templates/hexagonvy-template";
import { StarlightTemplatePreview } from "./templates/starlight-template";
import { ConstructTemplatePreview } from "./templates/construct-template";
import { LedgerTemplatePreview } from "./templates/ledger-template";
import { BloxTemplatePreview } from "./templates/blox-template";
import { AtsFriendlyTemplatePreview } from "./templates/ats-friendly-template";

const templateMap = {
  'ats-friendly': {
    preview: AtsFriendlyTemplatePreview,
  },
  blox: {
    preview: BloxTemplatePreview,
  },
  ledger: {
    preview: LedgerTemplatePreview,
  },
  construct: {
    preview: ConstructTemplatePreview,
  },
  starlight: {
    preview: StarlightTemplatePreview,
  },
  hexagonvy: {
    preview: HexagonvyTemplatePreview,
  },
  diamond: {
    preview: DiamondTemplatePreview,
  },
  quete: {
    preview: QueteTemplatePreview,
  },
  cooper: {
    preview: CooperTemplatePreview,
  },
  awesome: {
    preview: AwesomeTemplatePreview,
  },
  vektoristik: {
    preview: VektoristikTemplatePreview,
  },
  'smart-start': {
    preview: SmartStartTemplatePreview,
  },
  timeline: {
    preview: TimelineTemplatePreview,
  },
  professional: {
    preview: ProfessionalTemplatePreview,
  },
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
};

export function ResumePreviewPanel() {
  const { resumeData, selectedTemplate, selectedColor, selectedFont, selectedBgColor, selectedTextColor } = useResume();
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
        const canvas = await html2canvas(resumeRef.current, {
            scale: 2, // Increase scale for better quality
            useCORS: true, // Important for external images and some CSS properties
        });

        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(fileName);

    } catch (error) {
        console.error('Oops, something went wrong!', error);
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
           <div id="resume-preview" ref={resumeRef} className={cn("w-full h-full", fontClass)} style={{ fontFamily: selectedFont, background: selectedBgColor }}>
              {isClient ? (
                <div className="w-full h-full overflow-auto">
                  <TemplatePreview data={resumeData} color={selectedColor} bgColor={selectedBgColor} textColor={selectedTextColor}/>
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

    