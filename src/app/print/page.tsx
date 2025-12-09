// src/app/print/page.tsx
import { Suspense } from 'react';
import PrintContent from './PrintContent';

export default function PrintPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg">Loading resume for printing...</p>
        </div>
      </div>
    }>
      <PrintContent />
    </Suspense>
  );
}