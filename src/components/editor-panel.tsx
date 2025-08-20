"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeForm } from "./editor/resume-form";
import { StylePanel } from "./editor/style-panel";
import { AiAssistPanel } from "./editor/ai-assist-panel";
import { FileText, Palette, Wand2 } from "lucide-react";

export function EditorPanel() {
  return (
    <div className="flex flex-col h-screen bg-card border-r shadow-lg xl:shadow-none">
      <header className="p-6 border-b">
        <h1 className="text-2xl font-headline font-bold text-primary">CVlization</h1>
        <p className="text-sm text-muted-foreground">Craft your professional story.</p>
      </header>
      <Tabs defaultValue="content" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content"><FileText className="mr-2 h-4 w-4" /> Content</TabsTrigger>
            <TabsTrigger value="style"><Palette className="mr-2 h-4 w-4" /> Style</TabsTrigger>
            <TabsTrigger value="ai-assist"><Wand2 className="mr-2 h-4 w-4" /> AI Assist</TabsTrigger>
          </TabsList>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-6">
            <TabsContent value="content" className="mt-0">
              <ResumeForm />
            </TabsContent>
            <TabsContent value="style" className="mt-0">
              <StylePanel />
            </TabsContent>
             <TabsContent value="ai-assist" className="mt-0">
              <AiAssistPanel />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
