/**
 * AI-Powered Proverb Analysis
 * Sentiment, wisdom scoring, difficulty classification
 */

import { ProverbClient } from '@/types/proverb';

export interface ProverbAnalysis {
  sentimentScore: number; // -1 to 1
  sentimentLabel: 'Negative' | 'Neutral' | 'Positive';
  wisdomScore: number; // 0 to 100
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  emotionalTone: string[];
  themes: string[];
  culturalRelevance: number; // 0 to 100
  readabilityScore: number; // 0 to 100
}

/**
 * Analyze proverb using AI techniques
 */
export function analyzeProverb(proverb: ProverbClient): ProverbAnalysis {
  const text = proverb.text.toLowerCase();
  const words = text.split(/\s+/);

  return {
    sentimentScore: calculateSentiment(text),
    sentimentLabel: getSentimentLabel(calculateSentiment(text)),
    wisdomScore: calculateWisdomScore(proverb),
    difficultyLevel: calculateDifficulty(text, words),
    emotionalTone: detectEmotionalTone(text),
    themes: extractThemes(text, proverb.category),
    culturalRelevance: calculateCulturalRelevance(text),
    readabilityScore: calculateReadability(words)
  };
}

/**
 * Calculate sentiment score using keyword analysis
 */
function calculateSentiment(text: string): number {
  const positiveWords = [
    'bun', 'fericit', 'bucurie', 'dragoste', 'fericire', 'noroc',
    'succes', 'viață', 'înțelepciune', 'prietenie', 'bogăție'
  ];
  
  const negativeWords = [
    'rău', 'trist', 'durere', 'ură', 'nenorocire', 'ghinion',
    'eșec', 'moarte', 'prostie', 'dușmănie', 'sărăcie'
  ];

  let score = 0;
  positiveWords.forEach(word => {
    if (text.includes(word)) score += 0.1;
  });
  negativeWords.forEach(word => {
    if (text.includes(word)) score -= 0.1;
  });

  return Math.max(-1, Math.min(1, score));
}

/**
 * Get sentiment label
 */
function getSentimentLabel(score: number): 'Negative' | 'Neutral' | 'Positive' {
  if (score < -0.2) return 'Negative';
  if (score > 0.2) return 'Positive';
  return 'Neutral';
}

/**
 * Calculate wisdom score
 */
function calculateWisdomScore(proverb: ProverbClient): number {
  let score = 50; // Base score

  // Length factor (optimal 10-20 words)
  const wordCount = proverb.text.split(/\s+/).length;
  if (wordCount >= 10 && wordCount <= 20) score += 10;

  // Has meaning
  if (proverb.meaning && proverb.meaning.length > 20) score += 15;

  // Category bonus
  if (proverb.category === 'Filozofie' || proverb.category === 'Intelepciune') {
    score += 10;
  }

  // Popularity factor
  if (proverb.popularity && proverb.popularity > 50) score += 15;

  return Math.min(100, Math.max(0, score));
}

/**
 * Calculate difficulty level
 */
function calculateDifficulty(
  text: string,
  words: string[]
): 'Beginner' | 'Intermediate' | 'Advanced' {
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
  const wordCount = words.length;

  // Complex words (over 8 characters)
  const complexWords = words.filter(w => w.length > 8).length;
  const complexityRatio = complexWords / wordCount;

  if (wordCount <= 10 && avgWordLength <= 6 && complexityRatio < 0.2) {
    return 'Beginner';
  } else if (wordCount <= 15 && avgWordLength <= 7 && complexityRatio < 0.4) {
    return 'Intermediate';
  } else {
    return 'Advanced';
  }
}

/**
 * Detect emotional tone
 */
function detectEmotionalTone(text: string): string[] {
  const tones: string[] = [];

  const emotionKeywords = {
    'Optimist': ['soare', 'lumina', 'cer', 'zi', 'dimineata'],
    'Prudent': ['atent', 'grijă', 'caute', 'gândește'],
    'Motivant': ['luptă', 'muncă', 'sforțare', 'succes'],
    'Reflectiv': ['înțelepciune', 'gând', 'cunoaștere', 'viață'],
    'Moral': ['bine', 'rău', 'drept', 'cinste', 'adevăr']
  };

  Object.entries(emotionKeywords).forEach(([tone, keywords]) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      tones.push(tone);
    }
  });

  return tones.length > 0 ? tones : ['Neutru'];
}

/**
 * Extract themes from text
 */
function extractThemes(text: string, category: string | null): string[] {
  const themes: string[] = [];

  if (category) themes.push(category);

  const themeKeywords = {
    'Muncă': ['lucru', 'muncă', 'treabă', 'sforțare'],
    'Cunoaștere': ['știe', 'învață', 'cunoaștere', 'înțelepciune'],
    'Relații': ['prieten', 'drag', 'iubește', 'oameni'],
    'Timp': ['timp', 'ani', 'zi', 'viață'],
    'Bogăție': ['bani', 'bogăție', 'avere', 'aur']
  };

  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      themes.push(theme);
    }
  });

  return [...new Set(themes)];
}

/**
 * Calculate cultural relevance
 */
function calculateCulturalRelevance(text: string): number {
  const culturalMarkers = [
    'român', 'moș', 'strămoș', 'ie', 'port', 'cânt',
    'sat', 'țară', 'câmp', 'munte', 'râu'
  ];

  let score = 50;
  culturalMarkers.forEach(marker => {
    if (text.includes(marker)) score += 5;
  });

  return Math.min(100, score);
}

/**
 * Calculate readability score (Flesch-Kincaid adapted for Romanian)
 */
function calculateReadability(words: string[]): number {
  const wordCount = words.length;
  const syllableCount = words.reduce((sum, word) => sum + countSyllables(word), 0);
  
  // Simplified formula
  const score = 100 - ((syllableCount / wordCount) * 10);
  return Math.min(100, Math.max(0, score));
}

/**
 * Count syllables in Romanian word (approximation)
 */
function countSyllables(word: string): number {
  const vowels = 'aeiouăâî';
  let count = 0;
  let prevWasVowel = false;

  for (const char of word.toLowerCase()) {
    const isVowel = vowels.includes(char);
    if (isVowel && !prevWasVowel) count++;
    prevWasVowel = isVowel;
  }

  return Math.max(1, count);
}

/**
 * Batch analyze multiple proverbs
 */
export function batchAnalyze(proverbs: ProverbClient[]): Map<string, ProverbAnalysis> {
  const results = new Map<string, ProverbAnalysis>();
  
  proverbs.forEach(proverb => {
    results.set(proverb.id, analyzeProverb(proverb));
  });

  return results;
}
