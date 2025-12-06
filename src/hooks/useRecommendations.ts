/**
 * React hook for proverb recommendations
 */

import { useState, useEffect } from 'react';
import { ProverbClient } from '@/types/proverb';

type RecommendationType =
  | 'personalized'
  | 'popular'
  | 'new'
  | 'random'
  | 'similar'
  | 'category'
  | 'region'
  | 'feed';

interface UseRecommendationsOptions {
  type?: RecommendationType;
  favorites?: string[];
  history?: string[];
  proverbId?: string;
  category?: string;
  region?: string;
  limit?: number;
  autoFetch?: boolean;
}

export function useRecommendations(options: UseRecommendationsOptions = {}) {
  const {
    type = 'personalized',
    favorites = [],
    history = [],
    proverbId,
    category,
    region,
    limit = 5,
    autoFetch = true
  } = options;

  const [recommendations, setRecommendations] = useState<ProverbClient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        type,
        limit: String(limit)
      });

      if (favorites.length > 0) params.append('favorites', favorites.join(','));
      if (history.length > 0) params.append('history', history.join(','));
      if (proverbId) params.append('proverbId', proverbId);
      if (category) params.append('category', category);
      if (region) params.append('region', region);

      const response = await fetch(`/api/recommendations?${params}`);
      const result = await response.json();

      if (result.success) {
        setRecommendations(result.data);
      } else {
        setError(result.error || 'Failed to fetch recommendations');
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchRecommendations();
    }
  }, [type, favorites.length, history.length, proverbId, category, region, limit]);

  return {
    recommendations,
    isLoading,
    error,
    refetch: fetchRecommendations
  };
}
