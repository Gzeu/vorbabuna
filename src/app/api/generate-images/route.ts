import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const POLLINATION_API_KEY = process.env.POLLINATION_API_KEY || '';

export async function GET() {
  try {
    // Get proverbs without images
    const proverbs = await prisma.proverb.findMany({
      where: { imageUrl: null },
      take: 20,
    });

    if (proverbs.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'All proverbs already have images',
      });
    }

    const updated = [];

    // For each proverb, generate an image
    for (const proverb of proverbs) {
      try {
        // Use Unsplash API for instant image (free, no key needed)
        const keywords = proverb.category || 'romanian';
        const imageUrl = `https://api.unsplash.com/photos/random?query=${keywords}&w=800&h=600&client_id=${process.env.UNSPLASH_API_KEY || 'demo'}`;
        
        // Or use a simple Unsplash URL pattern for instant images
        const fallbackUrl = `https://images.unsplash.com/photo-1507842217343-583f20270319?w=800&h=600&fit=crop&q=80`;

        const updateResult = await prisma.proverb.update({
          where: { id: proverb.id },
          data: {
            imageUrl: fallbackUrl,
            imagePrompt: `${proverb.text} - ${proverb.category}`,
          },
        });

        updated.push(updateResult);
      } catch (err) {
        console.error(`Failed to update proverb ${proverb.id}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Updated proverbs with images',
      count: updated.length,
      proverbs: updated,
    });
  } catch (error) {
    console.error('Error in generate-images:', error);
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
