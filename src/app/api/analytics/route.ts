'use server';

import { NextRequest, NextResponse } from 'next/server';
import {
  trackEvent,
  getTrendingProverbs,
  getProverbStats,
  getCategoryStats,
  getRegionStats,
  getOverallStats,
  getRecentProverbs
} from '@/lib/analytics';

/**
 * POST /api/analytics/track
 * Track user interaction event
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proverbId, eventType, userId, metadata } = body;

    if (!proverbId || !eventType) {
      return NextResponse.json(
        { success: false, error: 'proverbId and eventType are required' },
        { status: 400 }
      );
    }

    await trackEvent({ proverbId, eventType, userId, metadata });

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully'
    });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics
 * Get analytics data based on query parameters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const proverbId = searchParams.get('proverbId');
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    switch (type) {
      case 'trending':
        const trending = await getTrendingProverbs(limit);
        return NextResponse.json({
          success: true,
          data: trending,
          count: trending.length
        });

      case 'proverb':
        if (!proverbId) {
          return NextResponse.json(
            { success: false, error: 'proverbId required' },
            { status: 400 }
          );
        }
        const proverbStats = await getProverbStats(proverbId);
        return NextResponse.json({
          success: true,
          data: proverbStats
        });

      case 'categories':
        const categoryStats = await getCategoryStats();
        return NextResponse.json({
          success: true,
          data: categoryStats,
          count: categoryStats.length
        });

      case 'regions':
        const regionStats = await getRegionStats();
        return NextResponse.json({
          success: true,
          data: regionStats,
          count: regionStats.length
        });

      case 'overall':
        const overallStats = await getOverallStats();
        return NextResponse.json({
          success: true,
          data: overallStats
        });

      case 'recent':
        const recentProverbs = await getRecentProverbs(limit);
        return NextResponse.json({
          success: true,
          data: recentProverbs,
          count: recentProverbs.length
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get analytics data' },
      { status: 500 }
    );
  }
}
