/**
 * React hook for favorites management
 */

import { useState, useEffect } from 'react';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  toggleFavorite,
  clearFavorites,
  getHistory,
  addToHistory,
  clearHistory
} from '@/lib/favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<Array<{ id: string; timestamp: number }>>([]);

  useEffect(() => {
    // Load favorites and history on mount
    setFavorites(getFavorites());
    setHistory(getHistory());
  }, []);

  const add = (proverbId: string) => {
    const success = addFavorite(proverbId);
    if (success) {
      setFavorites(getFavorites());
    }
    return success;
  };

  const remove = (proverbId: string) => {
    const success = removeFavorite(proverbId);
    if (success) {
      setFavorites(getFavorites());
    }
    return success;
  };

  const toggle = (proverbId: string) => {
    const isFav = toggleFavorite(proverbId);
    setFavorites(getFavorites());
    return isFav;
  };

  const clear = () => {
    clearFavorites();
    setFavorites([]);
  };

  const addToViewHistory = (proverbId: string) => {
    addToHistory(proverbId);
    setHistory(getHistory());
  };

  const clearViewHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return {
    favorites,
    history,
    addFavorite: add,
    removeFavorite: remove,
    toggleFavorite: toggle,
    isFavorite,
    clearFavorites: clear,
    addToHistory: addToViewHistory,
    clearHistory: clearViewHistory,
    favoritesCount: favorites.length,
    historyCount: history.length
  };
}
