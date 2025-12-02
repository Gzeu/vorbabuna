'use client';

import { useEffect } from 'react';
import FolkButton from '@/components/ui/FolkButton';
import { RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-6 py-32 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Error icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-red-50 rounded-full flex items-center justify-center">
            <svg 
              className="w-16 h-16 text-folk-red" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        <h2 className="text-4xl font-display font-bold text-folk-brown mb-4">
          Oops! Ceva n-a mers bine
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Ne pare rău, dar a apărut o eroare neașteptată.
          <br />
          &quot;Graba strică treaba&quot; - hai să încercăm din nou!
        </p>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-red-50 rounded-lg text-left">
            <p className="text-sm text-red-800 font-mono">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <FolkButton onClick={reset} size="lg">
            <RefreshCw size={20} className="inline mr-2" />
            Încearcă din nou
          </FolkButton>
          <Link href="/">
            <FolkButton variant="outline" size="lg">
              <Home size={20} className="inline mr-2" />
              Înapoi acasă
            </FolkButton>
          </Link>
        </div>

        {/* Decorative quote */}
        <div className="mt-16 p-6 bg-folk-cream rounded-2xl border-2 border-folk-red/20">
          <blockquote className="text-2xl font-serif text-folk-brown italic">
            &quot;Omul greșește, Dumnezeu iartă&quot;
          </blockquote>
          <p className="text-gray-600 mt-2">— Proverb românesc</p>
        </div>
      </div>
    </div>
  );
}
