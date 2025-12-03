'use server';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface GenerateImagePromptParams { 
  proverbText: string;
  category: string | null;
  region?: string | null;
}

/**
 * Generate image prompt for Pollinations AI based on proverb content
 * Uses category and proverb text to create contextual prompts
 */
function generatePollinationsPrompt(params: GenerateImagePromptParams): string {
  const { proverbText, category, region } = params;
  
  // Create context-aware prompts based on category
  const categoryPrompts: Record<string, string> = {
    'Familie': 'warm family gathering, generations together, traditional Romanian heritage, folk art style',
    'Filozofie': 'contemplative wisdom, ancient philosophy, sacred geometry, mystical wisdom illustration',
    'Muncă': 'honest labor, craftsperson at work, traditional Romanian crafts, folk wisdom at work',
    'Natură': 'Romanian nature landscape, forests mountains water, seasonal beauty, natural harmony',
    'Prietenie': 'friendship bonds, community gathering, people laughing together, unity and trust',
    'Dragoste': 'romantic connections, tender moments, heart symbolism, emotional depth, warm colors',
    'Intelepciune': 'ancient wise figure, knowledge scrolls, enlightenment light, sacred symbols',
    'Viață': 'life journey, seasons cycle, growth and transformation, philosophical beauty',
  };

  const basePrompt = categoryPrompts[category] || 'Romanian folk wisdom, traditional art, cultural heritage';
  const regionContext = region ? `, from ${region} region of Romania` : '';
  
  return `Illustrate Romanian proverb wisdom: "${proverbText}". Style: traditional Romanian folk art, watercolor painting, nostalgic mood, warm earthly colors (gold, rust, cream, brown). Context: ${basePrompt}${regionContext}. High quality, detailed, cultural authenticity, 16:9 aspect ratio`;
}

/**
 * Generate image URL using Pollinations API
 * Free, no-auth required image generation service
 */
async function generatePollinationsImage(prompt: string): Promise<string> {
  try {
    // Pollinations API endpoint - free, no authentication needed
    const pollinationsUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}`;
    
    // Return direct URL (Pollinations handles the generation)
    return pollinationsUrl;
  } catch (error) {
    console.error('Error generating Pollinations prompt:', error);
    // Fallback to Unsplash wisdom image
    return 'https://images.unsplash.com/photo-1507842217343-583f20270fe0?w=800&q=80';
  }
}

/**
 * POST /api/proverb-images
 * Generate and update proverb with AI-generated image
 * Body: { proverbId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { proverbId } = await request.json();

    if (!proverbId) {
      return NextResponse.json(
        { error: 'proverbId is required' },
        { status: 400 }
      );
    }

    // Fetch proverb from database
    const proverb = await prisma.proverb.findUnique({
      where: { id: proverbId },
    });

    if (!proverb) {
      return NextResponse.json(
        { error: 'Proverb not found' },
        { status: 404 }
      );
    }

    // Generate Pollinations prompt
    const prompt = generatePollinationsPrompt({
      proverbText: proverb.text,
      category: proverb.category,    });
          region: proverb.region,

    // Get image URL
    const imageUrl = await generatePollinationsImage(prompt);

    // Update proverb with image URL and prompt
    const updated = await prisma.proverb.update({
      where: { id: proverbId },
      data: {
        imageUrl,
        imagePrompt: prompt,
      },
    });

    return NextResponse.json({
      success: true,
      proverbId: updated.id,
      imageUrl: updated.imageUrl,
      imagePrompt: updated.imagePrompt,
    });
  } catch (error) {
    console.error('Error in proverb-images API:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/proverb-images?proverbId=xxx
 * Fetch image URL for specific proverb
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const proverbId = searchParams.get('proverbId');

    if (!proverbId) {
      return NextResponse.json(
        { error: 'proverbId query parameter is required' },
        { status: 400 }
      );
    }

    const proverb = await prisma.proverb.findUnique({
      where: { id: proverbId },
      select: { imageUrl: true, imagePrompt: true },
    });

    if (!proverb) {
      return NextResponse.json(
        { error: 'Proverb not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(proverb);
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/proverb-images/batch
 * Generate images for multiple proverbs
 * Body: { proverbIds: string[] }
 */
export async function PUT(request: NextRequest) {
  try {
    const { proverbIds } = await request.json();

    if (!Array.isArray(proverbIds) || proverbIds.length === 0) {
      return NextResponse.json(
        { error: 'proverbIds array is required and cannot be empty' },
        { status: 400 }
      );
    }

    const results = [];

    for (const proverbId of proverbIds) {
      try {
        const proverb = await prisma.proverb.findUnique({
          where: { id: proverbId },
        });

        if (!proverb) continue;

        const prompt = generatePollinationsPrompt({
          proverbText: proverb.text,
        region: proverb.region,        });

        const imageUrl = await generatePollinationsImage(prompt);

        const updated = await prisma.proverb.update({
          where: { id: proverbId },
          data: {
            imageUrl,
            imagePrompt: prompt,
          },
        });

        results.push({
          proverbId: updated.id,
          success: true,
          imageUrl: updated.imageUrl,
        });
      } catch (error) {
        results.push({
          proverbId,
          success: false,
          error: String(error),
        });
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error('Error in batch image generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate batch images' },
      { status: 500 }
    );
  }
}
