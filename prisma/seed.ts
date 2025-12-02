import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.proverb.deleteMany();
  console.log('✅ Cleared existing proverbs');

  // Minimal seed - just 3 proverbs to test
  const proverbs = [
    {
      text: 'Apa trece, pietrele rămân',
      meaning: 'Lucrurile importante rămân, cele trecătoare dispar',
      category: 'filosofie',
      validated: true,
    },
    {
      text: 'Cine seamănă vânt, culege furtună',
      meaning: 'Acțiunile negative au consecințe negative',
      category: 'morală',
      validated: true,
    },
    {
      text: 'Nu-i bai dacă cazi, bai-i dacă nu te mai ridici',
      meaning: 'Eșecul nu e final, doar dacă renunți',
      category: 'curaj',
      validated: true,
    },
  ];

  for (const proverb of proverbs) {
    await prisma.proverb.create({
      data: proverb,
    });
  }

  console.log(`✅ Seeded ${proverbs.length} proverbs`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
