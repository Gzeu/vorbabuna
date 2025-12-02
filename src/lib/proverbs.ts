// Proverbs library
// This module provides proverb-related functions

import prisma from './db';

export async function getProverbs(page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit;
  return prisma.proverb.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProverbById(id: string) {
  return prisma.proverb.findUnique({
    where: { id },
  });
}

export async function searchProverbs(query: string, limit: number = 20) {
  if (!query || query.length < 2) return [];

  return prisma.proverb.findMany({
    where: {
      OR: [
        { text: { contains: query, mode: 'insensitive' } },
        { meaning: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: limit,
  });
}
