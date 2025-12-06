/**
 * Favorites/Bookmarks management system
 * Uses localStorage for client-side persistence
 */

const FAVORITES_KEY = 'vorbabuna_favorites';
const HISTORY_KEY = 'vorbabuna_history';

/**
 * Get all favorite proverbs
 */
export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

/**
 * Add proverb to favorites
 */
export function addFavorite(proverbId: string): boolean {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(proverbId)) {
      favorites.push(proverbId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
}

/**
 * Remove proverb from favorites
 */
export function removeFavorite(proverbId: string): boolean {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(id => id !== proverbId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
}

/**
 * Check if proverb is favorited
 */
export function isFavorite(proverbId: string): boolean {
  const favorites = getFavorites();
  return favorites.includes(proverbId);
}

/**
 * Toggle favorite status
 */
export function toggleFavorite(proverbId: string): boolean {
  if (isFavorite(proverbId)) {
    removeFavorite(proverbId);
    return false;
  } else {
    addFavorite(proverbId);
    return true;
  }
}

/**
 * Clear all favorites
 */
export function clearFavorites(): void {
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Error clearing favorites:', error);
  }
}

/**
 * Get viewing history
 */
export function getHistory(): Array<{ id: string; timestamp: number }> {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}

/**
 * Add proverb to history
 */
export function addToHistory(proverbId: string): void {
  try {
    let history = getHistory();
    
    // Remove if already exists
    history = history.filter(item => item.id !== proverbId);
    
    // Add to beginning
    history.unshift({ id: proverbId, timestamp: Date.now() });
    
    // Keep only last 50
    history = history.slice(0, 50);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
}

/**
 * Clear history
 */
export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}

/**
 * Get favorite proverbs count
 */
export function getFavoritesCount(): number {
  return getFavorites().length;
}

/**
 * Get history count
 */
export function getHistoryCount(): number {
  return getHistory().length;
}

/**
 * Export favorites as JSON
 */
export function exportFavorites(): string {
  const favorites = getFavorites();
  return JSON.stringify(favorites, null, 2);
}

/**
 * Import favorites from JSON
 */
export function importFavorites(json: string): boolean {
  try {
    const imported = JSON.parse(json);
    if (Array.isArray(imported)) {
      const current = getFavorites();
      const merged = [...new Set([...current, ...imported])];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(merged));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing favorites:', error);
    return false;
  }
}
