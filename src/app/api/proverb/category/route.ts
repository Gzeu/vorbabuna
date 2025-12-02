import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = Math.min(parseInt(searchParams.get('take') || '10'), 100);

    const proverbs = await prisma.proverb.findMany({
      skip,
      take,
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(proverbs, { status: 200 });
  } catch (error) {
    console.error('Error fetching proverbs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
