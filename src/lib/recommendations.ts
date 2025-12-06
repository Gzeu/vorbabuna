/**
 * Proverb recommendation engine
 * Suggests proverbs based on user preferences, history, and similarity
 */

import prisma from '@/lib/db';
import { ProverbClient } from '@/types/proverb';

/**
 * Get recommended proverbs based on user activity
 * Uses favorites and history to determine preferred categories
 */
export async function getRecommendedProverbs(
  userFavorites: string[] = [],
  userHistory: string[] = [],
  limit: number = 5
): Promise<ProverbClient[]> {
  try {
    const userProverbIds = [...new Set([...userFavorites, ...userHistory])];

    if (userProverbIds.length === 0) {
      // No history - return popular proverbs
      return await getPopularProverbs(limit);
    }

    // Get user's preferred categories
    const userProverbs = await prisma.proverb.findMany({
      where: { id: { in: userProverbIds } },
      select: { category: true, region: true }
    });

    const preferredCategories = [...new Set(
      userProverbs.map(p => p.category).filter(Boolean)
    )] as string[];

    const preferredRegions = [...new Set(
      userProverbs.map(p => p.region).filter(Boolean)
    )] as string[];

    // Get recommendations from preferred categories and regions
    const recommendations = await prisma.proverb.findMany({
      where: {
        OR: [
          { category: { in: preferredCategories } },
          { region: { in: preferredRegions } }
        ],
        id: { notIn: userProverbIds },
        validated: true
      },
      orderBy: { popularity: 'desc' },
      take: limit * 2 // Get extra to ensure variety
    });

    // Shuffle and limit
    return shuffleArray(recommendations).slice(0, limit) as ProverbClient[];
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}

/**
 * Get popular proverbs based on engagement
 */
export async function getPopularProverbs(limit: number = 10): Promise<ProverbClient[]> {
  try {
    const proverbs = await prisma.proverb.findMany({
      where: { validated: true },
      orderBy: { popularity: 'desc' },
      take: limit,
      select: {
        id: true,
        text: true,
        meaning: true,
        category: true,
        region: true,
        imageUrl: true,
        imagePrompt: true,
        popularity: true,
        validated: true
      }
    });

    return proverbs as ProverbClient[];
  } catch (error) {
    console.error('Error fetching popular proverbs:', error);
    return [];
  }
}

/**
 * Get similar proverbs by category
 */
export async function getSimilarProverbs(
  proverbId: string,
  limit: number = 3
): Promise<ProverbClient[]> {
  try {
    const proverb = await prisma.proverb.findUnique({
      where: { id: proverbId },
      select: { category: true, region: true }
    });

    if (!proverb) return [];

    // Prioritize same category, then same region
    const similar = await prisma.proverb.findMany({
      where: {
        OR: [
          { category: proverb.category },
          { region: proverb.region }
        ],
        id: { not: proverbId },
        validated: true
      },
      orderBy: { popularity: 'desc' },
      take: limit * 2
    });

    // Prioritize exact category matches
    const categoryMatches = similar.filter(p => p.category === proverb.category);
    const regionMatches = similar.filter(p => p.region === proverb.region && p.category !== proverb.category);

    return [...categoryMatches, ...regionMatches].slice(0, limit) as ProverbClient[];
  } catch (error) {
    console.error('Error fetching similar proverbs:', error);
    return [];
  }
}

/**
 * Get proverbs by category
 */
export async function getProverbsByCategory(
  category: string,
  limit: number = 10,
  offset: number = 0
): Promise<ProverbClient[]> {
  try {
    const proverbs = await prisma.proverb.findMany({
      where: {
        category,
        validated: true
      },
      orderBy: { popularity: 'desc' },
      skip: offset,
      take: limit
    });

    return proverbs as ProverbClient[];
  } catch (error) {
    console.error('Error fetching proverbs by category:', error);
    return [];
  }
}

/**
 * Get proverbs by region
 */
export async function getProverbsByRegion(
  region: string,
  limit: number = 10,
  offset: number = 0
): Promise<ProverbClient[]> {
  try {
    const proverbs = await prisma.proverb.findMany({
      where: {
        region,
        validated: true
      },
      orderBy: { popularity: 'desc' },
      skip: offset,
      take: limit
    });

    return proverbs as ProverbClient[];
  } catch (error) {
    console.error('Error fetching proverbs by region:', error);
    return [];
  }
}

/**
 * Get random proverbs for discovery
 */
export async function getRandomProverbs(limit: number = 5): Promise<ProverbClient[]> {
  try {
    // Get total count
    const count = await prisma.proverb.count({
      where: { validated: true }
    });

    if (count === 0) return [];

    // Generate random skip values
    const randomSkips = Array.from(
      { length: Math.min(limit, count) },
      () => Math.floor(Math.random() * count)
    );

    // Fetch random proverbs
    const proverbs = await Promise.all(
      randomSkips.map(skip =>
        prisma.proverb.findMany({
          where: { validated: true },
          skip,
          take: 1
        })
      )
    );

    return proverbs.flat() as ProverbClient[];
  } catch (error) {
    console.error('Error fetching random proverbs:', error);
    return [];
  }
}

/**
 * Get proverbs you might like based on a single proverb
 */
export async function getRelatedProverbs(
  proverbId: string,
  limit: number = 5
): Promise<ProverbClient[]> {
  try {
    const proverb = await prisma.proverb.findUnique({
      where: { id: proverbId },
      select: {
        category: true,
        region: true,
        keywords: true
      }
    });

    if (!proverb) return [];

    // Parse keywords if available
    let keywords: string[] = [];
    if (proverb.keywords) {
      try {
        keywords = JSON.parse(proverb.keywords);
      } catch {}
    }

    // Find related proverbs
    const related = await prisma.proverb.findMany({
      where: {
        OR: [
          { category: proverb.category },
          { region: proverb.region },
          // Keywords matching (if implemented in schema)
        ],
        id: { not: proverbId },
        validated: true
      },
      orderBy: { popularity: 'desc' },
      take: limit
    });

    return related as ProverbClient[];
  } catch (error) {
    console.error('Error fetching related proverbs:', error);
    return [];
  }
}

/**
 * Get trending proverbs in a specific category
 */
export async function getTrendingInCategory(
  category: string,
  limit: number = 5
): Promise<ProverbClient[]> {
  try {
    const proverbs = await prisma.proverb.findMany({
      where: {
        category,
        validated: true
      },
      orderBy: [
        { popularity: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    });

    return proverbs as ProverbClient[];
  } catch (error) {
    console.error('Error fetching trending in category:', error);
    return [];
  }
}

/**
 * Get newly added proverbs for discovery
 */
export async function getNewProverbs(limit: number = 10): Promise<ProverbClient[]> {
  try {
    const proverbs = await prisma.proverb.findMany({
      where: { validated: true },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return proverbs as ProverbClient[];
  } catch (error) {
    console.error('Error fetching new proverbs:', error);
    return [];
  }
}

/**
 * Utility: Shuffle array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get personalized feed for user
 */
export async function getPersonalizedFeed(
  userFavorites: string[] = [],
  userHistory: string[] = [],
  limit: number = 20
): Promise<{
  recommended: ProverbClient[];
  popular: ProverbClient[];
  new: ProverbClient[];
  random: ProverbClient[];
}> {
  try {
    const [recommended, popular, newProverbs, random] = await Promise.all([
      getRecommendedProverbs(userFavorites, userHistory, Math.floor(limit * 0.4)),
      getPopularProverbs(Math.floor(limit * 0.3)),
      getNewProverbs(Math.floor(limit * 0.2)),
      getRandomProverbs(Math.floor(limit * 0.1))
    ]);

    return {
      recommended,
      popular,
      new: newProverbs,
      random
    };
  } catch (error) {
    console.error('Error creating personalized feed:', error);
    return {
      recommended: [],
      popular: [],
      new: [],
      random: []
    };
  }
}
