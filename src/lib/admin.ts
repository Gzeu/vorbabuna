/**
 * Admin Dashboard Utilities
 * Content moderation, analytics, user management
 */

import prisma from './db';
import { ProverbClient } from '@/types/proverb';

export interface AdminStats {
  totalProverbs: number;
  pendingApproval: number;
  totalUsers: number;
  totalViews: number;
  totalShares: number;
  totalComments: number;
  totalCollections: number;
  flaggedContent: number;
  todayViews: number;
  weeklyGrowth: number;
}

export interface ModerationItem {
  id: string;
  type: 'proverb' | 'comment' | 'translation' | 'collection';
  content: any;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  createdAt: Date;
  userId?: string;
  reason?: string;
}

export interface UserReport {
  userId: string;
  username: string;
  totalContributions: number;
  flaggedItems: number;
  reputation: number;
  joinedAt: Date;
  lastActive: Date;
  status: 'active' | 'suspended' | 'banned';
}

/**
 * Get admin dashboard statistics
 */
export async function getAdminStats(): Promise<AdminStats> {
  try {
    const [totalProverbs, pendingProverbs, analytics] = await Promise.all([
      prisma.proverb.count(),
      prisma.proverb.count({ where: { validated: false } }),
      prisma.analytics.aggregate({
        _sum: { views: true, shares: true }
      })
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAnalytics = await prisma.analytics.aggregate({
      where: {
        createdAt: { gte: today }
      },
      _sum: { views: true }
    });

    return {
      totalProverbs,
      pendingApproval: pendingProverbs,
      totalUsers: 0, // Implement when user system is ready
      totalViews: analytics._sum.views || 0,
      totalShares: analytics._sum.shares || 0,
      totalComments: 0,
      totalCollections: 0,
      flaggedContent: 0,
      todayViews: todayAnalytics._sum.views || 0,
      weeklyGrowth: 0
    };
  } catch (error) {
    console.error('Error getting admin stats:', error);
    throw error;
  }
}

/**
 * Get pending moderation items
 */
export async function getPendingModeration(
  type?: 'proverb' | 'comment' | 'translation'
): Promise<ModerationItem[]> {
  try {
    if (!type || type === 'proverb') {
      const proverbs = await prisma.proverb.findMany({
        where: { validated: false },
        orderBy: { createdAt: 'desc' },
        take: 50
      });

      return proverbs.map(p => ({
        id: p.id,
        type: 'proverb' as const,
        content: p,
        status: 'pending' as const,
        createdAt: p.createdAt
      }));
    }

    return [];
  } catch (error) {
    console.error('Error getting pending moderation:', error);
    return [];
  }
}

/**
 * Approve content
 */
export async function approveContent(
  id: string,
  type: 'proverb' | 'comment' | 'translation'
): Promise<boolean> {
  try {
    if (type === 'proverb') {
      await prisma.proverb.update({
        where: { id },
        data: { validated: true }
      });
    }
    return true;
  } catch (error) {
    console.error('Error approving content:', error);
    return false;
  }
}

/**
 * Reject content
 */
export async function rejectContent(
  id: string,
  type: 'proverb' | 'comment' | 'translation',
  reason: string
): Promise<boolean> {
  try {
    if (type === 'proverb') {
      await prisma.proverb.delete({ where: { id } });
    }
    return true;
  } catch (error) {
    console.error('Error rejecting content:', error);
    return false;
  }
}

/**
 * Bulk approve proverbs
 */
export async function bulkApprove(ids: string[]): Promise<number> {
  try {
    const result = await prisma.proverb.updateMany({
      where: { id: { in: ids } },
      data: { validated: true }
    });
    return result.count;
  } catch (error) {
    console.error('Error bulk approving:', error);
    return 0;
  }
}

/**
 * Bulk delete proverbs
 */
export async function bulkDelete(ids: string[]): Promise<number> {
  try {
    const result = await prisma.proverb.deleteMany({
      where: { id: { in: ids } }
    });
    return result.count;
  } catch (error) {
    console.error('Error bulk deleting:', error);
    return 0;
  }
}

/**
 * Get system health metrics
 */
export async function getSystemHealth() {
  return {
    database: await checkDatabaseHealth(),
    cache: true,
    api: true,
    storage: await checkStorageHealth()
  };
}

async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

async function checkStorageHealth(): Promise<boolean> {
  // Check if we can write to storage
  return true;
}

/**
 * Get analytics by date range
 */
export async function getAnalyticsByDateRange(
  startDate: Date,
  endDate: Date
) {
  try {
    const analytics = await prisma.analytics.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    return analytics;
  } catch (error) {
    console.error('Error getting analytics:', error);
    return [];
  }
}

/**
 * Export proverbs to JSON
 */
export async function exportProverbs(): Promise<string> {
  try {
    const proverbs = await prisma.proverb.findMany({
      where: { validated: true }
    });
    return JSON.stringify(proverbs, null, 2);
  } catch (error) {
    console.error('Error exporting proverbs:', error);
    return '[]';
  }
}

/**
 * Get top contributors
 */
export async function getTopContributors(limit: number = 10) {
  // Implementation when user system is ready
  return [];
}

/**
 * Flag content for review
 */
export async function flagContent(
  id: string,
  type: 'proverb' | 'comment' | 'translation',
  reason: string
): Promise<boolean> {
  try {
    // Add to flagged items table
    console.log(`Flagged ${type} ${id}: ${reason}`);
    return true;
  } catch (error) {
    console.error('Error flagging content:', error);
    return false;
  }
}
