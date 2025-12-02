import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getFolkArtPrompt } from '@/lib/pollinations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, meaning, category, region, email } = body;

    // Validation
    if (!text || !meaning || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (text.length < 10 || text.length > 200) {
      return NextResponse.json(
        { error: 'Text must be between 10 and 200 characters' },
        { status: 400 }
      );
    }

    // Check for duplicates
    const existing = await prisma.proverb.findFirst({
      where: {
        text: {
          equals: text,
          mode: 'insensitive',
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'This proverb already exists' },
        { status: 409 }
      );
    }


    // Optionally create proverb (unvalidated) for future approval
    const imagePrompt = getFolkArtPrompt(text, category);
      // const keywords = text.split(' ').slice(0, 10);

    await prisma.proverb.create({
      data: {
        text,
        meaning,
        category,
        region: region || null,
        keywords: JSON.stringify(keywords),
        imagePrompt,
        validated: false,
        userId: email || null,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contribution submitted successfully',
        id: contribution.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contribution error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contribution' },
      { status: 500 }
    );
  }
}
