'use client';
import { useState, useEffect } from 'react';
import { use } from 'react';
import ProverbCardEnhanced from '@/components/ProverbCardEnhanced';
import { ProverbCardSkeleton } from '@/components/ui/SkeletonLoader';
import FolkButton from '@/components/ui/FolkButton';
import { ArrowLeft, Shuffle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Proverb {
  id: number;
  text: string;
  meaning: string;
  category: string;
  region?: string;
  imageUrl: string;
}

export default function ProverbPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [proverb, setProverb] = useState<Proverb | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProverb();
  }, [resolvedParams.id]);

  const fetchProverb = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/proverb/${resolvedParams.id}`);
      if (res.ok) {
        const data = await res.json();
        setProverb(data);
        
        // Update document title
        if (data.text) {
          document.title = `${data.text} - VorbaBună`;
        }
      }
    } catch (error) {
      console.error('Failed to fetch proverb:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    const res = await fetch('/api/proverb');
    const data = await res.json();
    router.push(`/proverb/${data.id}`);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" aria-label="Înapoi la pagină principală">
            <FolkButton variant="outline" size="sm">
              <ArrowLeft size={16} className="inline mr-2" />
              Înapoi
            </FolkButton>
          </Link>
          <FolkButton onClick={handleRandom} size="sm" aria-label="Proverb aleatoriu">
            <Shuffle size={16} className="inline mr-2" />
            Aleatoriu
          </FolkButton>
        </div>

        {loading ? (
          <ProverbCardSkeleton />
        ) : proverb ? (
          <div className="animate-fade-in">
            <ProverbCardEnhanced proverb={proverb} />
            
            {/* Structured data for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Article',
                  headline: proverb.text,
                  description: proverb.meaning,
                  author: {
                    '@type': 'Organization',
                    name: 'VorbaBună',
                  },
                }),
              }}
            />
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">Proverbul nu a fost găsit</p>
          </div>
        )}
      </div>
    </div>
  );
}
