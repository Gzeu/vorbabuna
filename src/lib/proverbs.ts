import { Proverb, ProverbSearchResult } from '@/types/proverb';
import prisma from './db';

export async function getProverbs(
  page: number = 1,
  limit: number = 20
): Promise<ProverbSearchResult> {
  const skip = (page - 1) * limit;

  const [proverbs, total] = await Promise.all([
    prisma.proverb.findMany({
      skip,
      take: limit,
      orderBy: { popularity: 'desc' },
    }),
    prisma.proverb.count(),
  ]);

  return {
    proverbs,
    total,
    page,
    limit,
  };
}

export async function searchProverbs(
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<ProverbSearchResult> {
  const skip = (page - 1) * limit;

  const [proverbs, total] = await Promise.all([
    prisma.proverb.findMany({
      where: {
        OR: [
          { text: { contains: query, mode: 'insensitive' } },
          { meaning: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
        ],
      },
      skip,
      take: limit,
      orderBy: { popularity: 'desc' },
    }),
    prisma.proverb.count({
      where: {
        OR: [
          { text: { contains: query, mode: 'insensitive' } },
          { meaning: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
        ],
      },
    }),
  ]);

  return {
    proverbs,
    total,
    page,
    limit,
  };
}

export async function getProverbById(id: string): Promise<Proverb | null> {
  return prisma.proverb.findUnique({
    where: { id },
  });
}
