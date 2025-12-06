'use server';

import { NextRequest, NextResponse } from 'next/server';
import {
  getAdminStats,
  getPendingModeration,
  approveContent,
  rejectContent,
  bulkApprove,
  bulkDelete,
  getSystemHealth,
  getAnalyticsByDateRange,
  exportProverbs,
  flagContent
} from '@/lib/admin';

/**
 * GET /api/admin
 * Get admin data based on query parameters
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // if (!isAdmin(request)) return unauthorized();

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'stats':
        const stats = await getAdminStats();
        return NextResponse.json({
          success: true,
          data: stats
        });

      case 'moderation':
        const type = searchParams.get('type') as any;
        const pending = await getPendingModeration(type);
        return NextResponse.json({
          success: true,
          data: pending,
          count: pending.length
        });

      case 'health':
        const health = await getSystemHealth();
        return NextResponse.json({
          success: true,
          data: health
        });

      case 'analytics':
        const start = searchParams.get('start');
        const end = searchParams.get('end');
        
        if (!start || !end) {
          return NextResponse.json(
            { success: false, error: 'start and end dates required' },
            { status: 400 }
          );
        }

        const analytics = await getAnalyticsByDateRange(
          new Date(start),
          new Date(end)
        );
        
        return NextResponse.json({
          success: true,
          data: analytics
        });

      case 'export':
        const exported = await exportProverbs();
        return new NextResponse(exported, {
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="proverbs.json"'
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin
 * Perform admin actions
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // if (!isAdmin(request)) return unauthorized();

    const body = await request.json();
    const { action, id, type, ids, reason } = body;

    switch (action) {
      case 'approve':
        if (!id || !type) {
          return NextResponse.json(
            { success: false, error: 'id and type required' },
            { status: 400 }
          );
        }
        const approved = await approveContent(id, type);
        return NextResponse.json({
          success: approved,
          message: approved ? 'Content approved' : 'Failed to approve'
        });

      case 'reject':
        if (!id || !type) {
          return NextResponse.json(
            { success: false, error: 'id, type, and reason required' },
            { status: 400 }
          );
        }
        const rejected = await rejectContent(id, type, reason);
        return NextResponse.json({
          success: rejected,
          message: rejected ? 'Content rejected' : 'Failed to reject'
        });

      case 'bulk-approve':
        if (!ids || !Array.isArray(ids)) {
          return NextResponse.json(
            { success: false, error: 'ids array required' },
            { status: 400 }
          );
        }
        const approvedCount = await bulkApprove(ids);
        return NextResponse.json({
          success: true,
          count: approvedCount,
          message: `${approvedCount} items approved`
        });

      case 'bulk-delete':
        if (!ids || !Array.isArray(ids)) {
          return NextResponse.json(
            { success: false, error: 'ids array required' },
            { status: 400 }
          );
        }
        const deletedCount = await bulkDelete(ids);
        return NextResponse.json({
          success: true,
          count: deletedCount,
          message: `${deletedCount} items deleted`
        });

      case 'flag':
        if (!id || !type || !reason) {
          return NextResponse.json(
            { success: false, error: 'id, type, and reason required' },
            { status: 400 }
          );
        }
        const flagged = await flagContent(id, type, reason);
        return NextResponse.json({
          success: flagged,
          message: flagged ? 'Content flagged' : 'Failed to flag'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
