import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get('q') || '';
    const take = Math.min(parseInt(searchParams.get('take') || '10'), 100);

    if (!q || q.length < 2) {
      return NextResponse.json([], { status: 200 });
    }

    const results = await prisma.proverb.findMany({
      where: {
        OR: [
          { text: { contains: q, mode: 'insensitive' } },
          { meaning: { contains: q, mode: 'insensitive' } },
        ],
      },
      take,
    });

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
