'use client';

import { Suspense } from 'react';
import SearchPageContent from '@/components/SearchPageContent';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
