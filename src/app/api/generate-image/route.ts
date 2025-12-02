import { NextRequest, NextResponse } from 'next/server';
import { generateProverbImage } from '@/lib/ai/image-generation';

export async function POST(request: NextRequest) {
  try {
    const { proverb } = await request.json();

    if (!proverb) {
      return NextResponse.json(
        { error: 'Proverb text is required' },
        { status: 400 }
      );
    }

    const imageUrl = await generateProverbImage(proverb);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
