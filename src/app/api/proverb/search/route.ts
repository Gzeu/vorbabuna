import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { removeAccents } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (query.length < 2 && !category) {
      return NextResponse.json([]);
    }

    // Build search conditions
    const where: any = {
      validated: true,
    };

    if (category) {
      where.category = category;
    }

    if (query.length >= 2) {
      // Search in text, meaning, and keywords (case-insensitive, accent-insensitive)
      const normalizedQuery = removeAccents(query.toLowerCase());
      
      where.OR = [
        { text: { contains: query, mode: 'insensitive' } },
        { meaning: { contains: query, mode: 'insensitive' } },
        { keywords: { contains: query, mode: 'insensitive' } },
      ];
    }

    const results = await prisma.proverb.findMany({
      where,
      take: Math.min(limit, 100),
      orderBy: [
        { popularity: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(
      results.map((p) => ({
        ...p,
        keywords: JSON.parse(p.keywords),
      }))
    );
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
