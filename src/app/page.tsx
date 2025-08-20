import { EditorPanel } from "@/components/editor-panel";
import { ResumePreviewPanel } from "@/components/resume-preview-panel";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(400px,2fr)_3fr] h-screen">
        <EditorPanel />
        <ResumePreviewPanel />
      </div>
    </main>
  );
}
