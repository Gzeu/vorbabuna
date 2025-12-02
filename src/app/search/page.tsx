'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProverbCardEnhanced from '@/components/ProverbCardEnhanced';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Filter } from 'lucide-react';

interface Proverb {
  id: number;
  text: string;
  meaning: string;
  category: string;
  region?: string;
  imageUrl: string;
}

const categories = [
  'Toate',
  'familie',
  'filozofie',
  'muncă',
  'natură',
  'prietenie',
  'dragoste',
  'înțelepciune',
  'viață',
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Proverb[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Toate');

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (query: string) => {
    if (query.length < 2 && selectedCategory === 'Toate') return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (selectedCategory !== 'Toate') params.append('category', selectedCategory);
      params.append('limit', '50');

      const res = await fetch(`/api/proverb/search?${params}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl font-display font-bold text-folk-gradient text-center mb-8">
          Caută Proverbe
        </h1>
        <SearchBar />
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-folk-red" />
          <span className="font-semibold text-folk-brown">Categorii:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                handleSearch(initialQuery);
              }}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-folk-red text-white shadow-folk'
                  : 'bg-white text-folk-brown hover:bg-folk-cream border-2 border-folk-red/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <LoadingSpinner />
        ) : results.length > 0 ? (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Găsite <span className="font-bold text-folk-red">{results.length}</span> proverbe
              </p>
            </div>
            {results.map((proverb) => (
              <div key={proverb.id} className="animate-fade-in">
                <ProverbCardEnhanced proverb={proverb} />
              </div>
            ))}
          </div>
        ) : initialQuery || selectedCategory !== 'Toate' ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">Nu s-au găsit proverbe</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">Caută sau selectează o categorie</p>
          </div>
        )}
      </div>
    </div>
  );
}
