import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proverb = await prisma.proverb.findUnique({
      where: { id: params.id },
    });

    if (!proverb) {
      return NextResponse.json(
        { error: 'Proverb not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(proverb, { status: 200 });
  } catch (error) {
    console.error('Error fetching proverb:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
