import { NextRequest, NextResponse } from 'next/server';
import { getProverbs, searchProverbs } from '@/lib/proverbs';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
    const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  try {
    if (query) {
    const results = await searchProverbs(query, limit, category);            
    return NextResponse.json(results);
          }
    const proverbs = await getProverbs(page, limit);
    return NextResponse.json(proverbs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch proverbs' },
      { status: 500 }
    );
  }
}
