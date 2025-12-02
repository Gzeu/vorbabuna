import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateImageUrl } from '@/lib/pollinations';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('name');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!category) {
      return NextResponse.json(
        { error: 'Category name required' },
        { status: 400 }
      );
    }

    const proverbs = await prisma.proverb.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive',
        },
        validated: true,
      },
      take: Math.min(limit, 100),
      orderBy: [
        { popularity: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    const proverbsWithImages = proverbs.map((p) => ({
      ...p,
      imageUrl: generateImageUrl(p.imagePrompt, {
        seed: p.id,
        width: 800,
        height: 600,
      }),
      keywords: JSON.parse(p.keywords),
    }));

    return NextResponse.json(proverbsWithImages);
  } catch (error) {
    console.error('Category fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proverbs by category' },
      { status: 500 }
    );
  }
}
