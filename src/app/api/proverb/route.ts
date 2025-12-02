import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateImageUrl } from '@/lib/pollinations';

export async function GET(req: NextRequest) {
  try {
    // Get total count of validated proverbs
    const count = await prisma.proverb.count({
      where: { validated: true },
    });

    if (count === 0) {
      return NextResponse.json(
        { error: 'No proverbs found in database' },
        { status: 404 }
      );
    }

    // Get random proverb
    const skip = Math.floor(Math.random() * count);
    const proverb = await prisma.proverb.findFirst({
      where: { validated: true },
      skip,
    });

    if (!proverb) {
      return NextResponse.json(
        { error: 'Proverb not found' },
        { status: 404 }
      );
    }

    // Generate image URL
    const imageUrl = generateImageUrl(proverb.imagePrompt, {
      seed: proverb.id,
      width: 800,
      height: 600,
    });

    // Update popularity
    await prisma.proverb.update({
      where: { id: proverb.id },
      data: { popularity: { increment: 1 } },
    });

    return NextResponse.json({
      ...proverb,
      imageUrl,
      keywords: JSON.parse(proverb.keywords),
    });
  } catch (error) {
    console.error('Error fetching random proverb:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
