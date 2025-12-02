import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateImageUrl } from '@/lib/pollinations';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    }

    const proverb = await prisma.proverb.findUnique({
      where: { id },
    });

    if (!proverb || !proverb.validated) {
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
      where: { id },
      data: { popularity: { increment: 1 } },
    });

    return NextResponse.json({
      ...proverb,
      imageUrl,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching proverb:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
