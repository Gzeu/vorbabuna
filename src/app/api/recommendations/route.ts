'use server';

import { NextRequest, NextResponse } from 'next/server';
import {
  getRecommendedProverbs,
  getPopularProverbs,
  getSimilarProverbs,
  getProverbsByCategory,
  getProverbsByRegion,
  getRandomProverbs,
  getRelatedProverbs,
  getTrendingInCategory,
  getNewProverbs,
  getPersonalizedFeed
} from '@/lib/recommendations';

/**
 * GET /api/recommendations
 * Get personalized recommendations based on user preferences
 * Query params:
 * - favorites: comma-separated list of favorite proverb IDs
 * - history: comma-separated list of viewed proverb IDs
 * - limit: number of recommendations (default: 5)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const favoritesParam = searchParams.get('favorites');
    const historyParam = searchParams.get('history');
    const limitParam = searchParams.get('limit');
    const type = searchParams.get('type');

    const favorites = favoritesParam ? favoritesParam.split(',').filter(Boolean) : [];
    const history = historyParam ? historyParam.split(',').filter(Boolean) : [];
    const limit = limitParam ? parseInt(limitParam, 10) : 5;

    // Handle different recommendation types
    switch (type) {
      case 'popular':
        const popular = await getPopularProverbs(limit);
        return NextResponse.json({
          success: true,
          type: 'popular',
          data: popular,
          count: popular.length
        });

      case 'new':
        const newProverbs = await getNewProverbs(limit);
        return NextResponse.json({
          success: true,
          type: 'new',
          data: newProverbs,
          count: newProverbs.length
        });

      case 'random':
        const random = await getRandomProverbs(limit);
        return NextResponse.json({
          success: true,
          type: 'random',
          data: random,
          count: random.length
        });

      case 'feed':
        const feed = await getPersonalizedFeed(favorites, history, limit);
        return NextResponse.json({
          success: true,
          type: 'feed',
          data: feed,
          totalCount: Object.values(feed).flat().length
        });

      case 'similar':
        const proverbId = searchParams.get('proverbId');
        if (!proverbId) {
          return NextResponse.json(
            { success: false, error: 'proverbId required for similar recommendations' },
            { status: 400 }
          );
        }
        const similar = await getSimilarProverbs(proverbId, limit);
        return NextResponse.json({
          success: true,
          type: 'similar',
          proverbId,
          data: similar,
          count: similar.length
        });

      case 'related':
        const relatedProverbId = searchParams.get('proverbId');
        if (!relatedProverbId) {
          return NextResponse.json(
            { success: false, error: 'proverbId required for related recommendations' },
            { status: 400 }
          );
        }
        const related = await getRelatedProverbs(relatedProverbId, limit);
        return NextResponse.json({
          success: true,
          type: 'related',
          proverbId: relatedProverbId,
          data: related,
          count: related.length
        });

      case 'category':
        const category = searchParams.get('category');
        if (!category) {
          return NextResponse.json(
            { success: false, error: 'category required' },
            { status: 400 }
          );
        }
        const categoryProverbs = await getProverbsByCategory(category, limit);
        return NextResponse.json({
          success: true,
          type: 'category',
          category,
          data: categoryProverbs,
          count: categoryProverbs.length
        });

      case 'region':
        const region = searchParams.get('region');
        if (!region) {
          return NextResponse.json(
            { success: false, error: 'region required' },
            { status: 400 }
          );
        }
        const regionProverbs = await getProverbsByRegion(region, limit);
        return NextResponse.json({
          success: true,
          type: 'region',
          region,
          data: regionProverbs,
          count: regionProverbs.length
        });

      case 'trending':
        const trendingCategory = searchParams.get('category');
        if (!trendingCategory) {
          return NextResponse.json(
            { success: false, error: 'category required for trending' },
            { status: 400 }
          );
        }
        const trending = await getTrendingInCategory(trendingCategory, limit);
        return NextResponse.json({
          success: true,
          type: 'trending',
          category: trendingCategory,
          data: trending,
          count: trending.length
        });

      default:
        // Default: personalized recommendations
        const recommendations = await getRecommendedProverbs(favorites, history, limit);
        return NextResponse.json({
          success: true,
          type: 'personalized',
          data: recommendations,
          count: recommendations.length,
          basedOn: {
            favorites: favorites.length,
            history: history.length
          }
        });
    }
  } catch (error) {
    console.error('Error in recommendations API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get recommendations',
        details: String(error)
      },
      { status: 500 }
    );
  }
}
