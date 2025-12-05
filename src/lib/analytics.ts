/**
 * Analytics and tracking utilities for proverb interactions
 * Tracks views, shares, favorites, and user engagement
 */

import prisma from '@/lib/db';

export interface AnalyticsEvent {
  proverbId: string;
  eventType: 'view' | 'share' | 'favorite' | 'audio_play' | 'quiz_attempt';
  userId?: string;
  metadata?: Record<string, any>;
}

/**
 * Track proverb interaction event
 * Automatically increments popularity counter
 */
export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  try {
    // Update proverb popularity
    await prisma.proverb.update({
      where: { id: event.proverbId },
      data: {
        popularity: { increment: 1 }
      }
    });

    // Log event for future analytics dashboard (optional)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event.eventType, event.proverbId);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Track multiple events in batch
 */
export async function trackEventBatch(events: AnalyticsEvent[]): Promise<void> {
  try {
    await Promise.all(events.map(event => trackEvent(event)));
  } catch (error) {
    console.error('Batch analytics tracking error:', error);
  }
}

/**
 * Get trending proverbs based on popularity
 */
export async function getTrendingProverbs(limit: number = 10) {
  try {
    return await prisma.proverb.findMany({
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
        popularity: true
      }
    });
  } catch (error) {
    console.error('Error fetching trending proverbs:', error);
    return [];
  }
}

/**
 * Get trending proverbs by category
 */
export async function getTrendingByCategory(category: string, limit: number = 5) {
  try {
    return await prisma.proverb.findMany({
      where: { 
        category,
        validated: true 
      },
      orderBy: { popularity: 'desc' },
      take: limit
    });
  } catch (error) {
    console.error('Error fetching trending by category:', error);
    return [];
  }
}

/**
 * Get proverb statistics
 */
export async function getProverbStats(proverbId: string) {
  try {
    const proverb = await prisma.proverb.findUnique({
      where: { id: proverbId },
      select: { 
        popularity: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!proverb) {
      return null;
    }

    return {
      views: proverb.popularity || 0,
      createdAt: proverb.createdAt,
      lastUpdated: proverb.updatedAt,
      // Calculate days since creation
      daysOld: Math.floor(
        (Date.now() - new Date(proverb.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      )
    };
  } catch (error) {
    console.error('Error fetching proverb stats:', error);
    return null;
  }
}

/**
 * Get category statistics
 */
export async function getCategoryStats() {
  try {
    const categories = await prisma.proverb.groupBy({
      by: ['category'],
      _count: { id: true },
      _sum: { popularity: true },
      where: { validated: true }
    });

    return categories.map(cat => ({
      category: cat.category || 'Unknown',
      count: cat._count.id,
      totalViews: cat._sum.popularity || 0,
      averageViews: cat._sum.popularity 
        ? Math.round(cat._sum.popularity / cat._count.id) 
        : 0
    })).sort((a, b) => b.totalViews - a.totalViews);
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return [];
  }
}

/**
 * Get region statistics
 */
export async function getRegionStats() {
  try {
    const regions = await prisma.proverb.groupBy({
      by: ['region'],
      _count: { id: true },
      _sum: { popularity: true },
      where: { 
        validated: true,
        region: { not: null }
      }
    });

    return regions.map(reg => ({
      region: reg.region || 'Unknown',
      count: reg._count.id,
      totalViews: reg._sum.popularity || 0
    })).sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Error fetching region stats:', error);
    return [];
  }
}

/**
 * Get overall platform statistics
 */
export async function getOverallStats() {
  try {
    const [totalProverbs, validatedProverbs, totalViews] = await Promise.all([
      prisma.proverb.count(),
      prisma.proverb.count({ where: { validated: true } }),
      prisma.proverb.aggregate({
        _sum: { popularity: true }
      })
    ]);

    return {
      totalProverbs,
      validatedProverbs,
      pendingProverbs: totalProverbs - validatedProverbs,
      totalViews: totalViews._sum.popularity || 0,
      averageViewsPerProverb: totalProverbs > 0 
        ? Math.round((totalViews._sum.popularity || 0) / totalProverbs)
        : 0
    };
  } catch (error) {
    console.error('Error fetching overall stats:', error);
    return {
      totalProverbs: 0,
      validatedProverbs: 0,
      pendingProverbs: 0,
      totalViews: 0,
      averageViewsPerProverb: 0
    };
  }
}

/**
 * Get recently added proverbs
 */
export async function getRecentProverbs(limit: number = 10) {
  try {
    return await prisma.proverb.findMany({
      where: { validated: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        text: true,
        meaning: true,
        category: true,
        imageUrl: true,
        createdAt: true
      }
    });
  } catch (error) {
    console.error('Error fetching recent proverbs:', error);
    return [];
  }
}
