"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { TemplatePreviewComponent } from '@/components/template-preview';
import type { Font } from '@/lib/types';

function RenderContent() {
    const searchParams = useSearchParams();
    const [templateData, setTemplateData] = useState<{
        data: any;
        template: string;
        color: string;
        bgColor: string;
        textColor: string;
        font: Font;
    } | null>(null);

    useEffect(() => {
        const dataParam = searchParams.get('data');
        const templateParam = searchParams.get('template');
        const colorParam = searchParams.get('color');
        const bgColorParam = searchParams.get('bgColor');
        const textColorParam = searchParams.get('textColor');
        const fontParam = searchParams.get('font');

        if (dataParam) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(dataParam));
                setTemplateData({
                    data: parsedData,
                    template: templateParam || 'modern',
                    color: colorParam || '#1f2937',
                    bgColor: bgColorParam || '#ffffff',
                    textColor: textColorParam || '#000000',
                    font: (fontParam as Font) || 'Inter'
                });
            } catch (e) {
                console.error('Error parsing resume data:', e);
            }
        }
    }, [searchParams]);

    if (!templateData) {
        return (
            <div
                style={{
                    width: '210mm',
                    height: '297mm',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }}
            >
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div
            id="pdf-render-container"
            style={{
                width: '210mm',
                height: '297mm',
                margin: 0,
                padding: 0,
                backgroundColor: 'white',
                overflow: 'hidden',
            }}
        >
            <TemplatePreviewComponent
                data={templateData.data}
                template={templateData.template}
                color={templateData.color}
                bgColor={templateData.bgColor}
                textColor={templateData.textColor}
                font={templateData.font}
            />
        </div>
    );
}

export default function RenderPdfPage() {
    return (
        <Suspense fallback={
            <div
                style={{
                    width: '210mm',
                    height: '297mm',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }}
            >
                <p>Loading...</p>
            </div>
        }>
            <RenderContent />
        </Suspense>
    );
}
