'use client';

import { useState, useEffect } from 'react';
import ProverbCard from './ProverbCard';
import { Proverb } from '@/types/proverb';

export default function ProverbGallery() {
  const [proverbs, setProverbs] = useState<Proverb[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProverbs();
  }, [page, searchQuery]);

  const fetchProverbs = async () => {
    setLoading(true);
    try {
      const query = searchQuery ? `?q=${encodeURIComponent(searchQuery)}&page=${page}` : `?page=${page}`;
      const response = await fetch(`/api/proverbs${query}`);
      const data = await response.json();
      setProverbs(data.proverbs || []);
    } catch (error) {
      console.error('Failed to fetch proverbs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Caută proverbe..."
          className="w-full max-w-md px-6 py-3 rounded-full border-2 border-orange-300 focus:border-orange-500 focus:outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proverbs.map((proverb) => (
              <ProverbCard key={proverb.id} proverb={proverb} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-6 py-2 bg-orange-500 text-white rounded-full disabled:opacity-50 hover:bg-orange-600 transition"
            >
              Anterior
            </button>
            <span className="px-6 py-2 bg-gray-100 rounded-full">Pagina {page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Următorul
            </button>
          </div>
        </>
      )}
    </div>
  );
}
