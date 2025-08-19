"use client";

import { useEffect, useState } from "react";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { ModernTemplatePreview, ModernTemplatePDF } from "./templates/modern-template";
import { ClassicTemplatePreview, ClassicTemplatePDF } from "./templates/classic-template";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Skeleton } from "./ui/skeleton";

const templateMap = {
  modern: {
    preview: ModernTemplatePreview,
    pdf: ModernTemplatePDF,
  },
  classic: {
    preview: ClassicTemplatePreview,
    pdf: ClassicTemplatePDF,
  },
};

export function ResumePreviewPanel() {
  const { resumeData, selectedTemplate, selectedColor } = useResume();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const TemplatePreview = templateMap[selectedTemplate].preview;
  const TemplatePDF = templateMap[selectedTemplate].pdf;

  const fileName = resumeData.personal.name ? `${resumeData.personal.name.replace(/\s+/g, '-')}-Resume.pdf` : 'resume.pdf';

  return (
    <div className="h-screen bg-secondary flex flex-col items-center justify-center p-4 md:p-8 overflow-auto">
      <div className="w-full max-w-4xl flex justify-end mb-4">
        {isClient ? (
          <PDFDownloadLink
            document={<TemplatePDF data={resumeData} color={selectedColor} />}
            fileName={fileName}
          >
            {({ loading }) => (
              <Button disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {loading ? "Generating..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        ) : (
          <Button disabled>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        )}
      </div>
      <div className="bg-white dark:bg-card-foreground/5 shadow-2xl rounded-lg w-full max-w-4xl aspect-[210/297] overflow-hidden">
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
