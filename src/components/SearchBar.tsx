'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: number;
  text: string;
  category: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounce search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/proverb/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.slice(0, 5));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Caută proverbe..."
            className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-folk-red/20 
              focus:border-folk-red focus:outline-none focus:ring-4 focus:ring-folk-red/10
              bg-white shadow-folk transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                hover:text-folk-red transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </form>

      {/* Autocomplete dropdown */}
      {isOpen && (query.length >= 2) && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl 
          border-2 border-folk-red/10 overflow-hidden z-50 animate-scale-in">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Se caută...</div>
          ) : results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto scrollbar-folk">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => {
                      router.push(`/proverb/${result.id}`);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="w-full text-left px-6 py-4 hover:bg-folk-cream transition-colors
                      border-b border-gray-100 last:border-0"
                  >
                    <p className="font-medium text-folk-brown">{result.text}</p>
                    <span className="text-sm text-folk-gold mt-1 inline-block">
                      {result.category}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Niciun proverb găsit pentru &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
