import { PrismaClient } from '@prisma/client';
import { getFolkArtPrompt } from '../src/lib/pollinations';

const prisma = new PrismaClient();

const PROVERBS = [
  {
    text: 'Apa trece, pietrele rămân',
    meaning: 'Lucrurile importante și durabile rămân, în timp ce cele trecătoare dispar',
    category: 'filozofie',
    region: 'național',
  },
  {
    text: 'Așchia nu sare departe de trunchi',
    meaning: 'Copiii seamănă cu părinții lor, moștenind calitățile și defectele acestora',
    category: 'familie',
    region: 'Ardeal',
  },
  {
    text: 'Cine se scoală de dimineață, departe ajunge',
    meaning: 'Persoanele active și harnice reușesc mai ușor în viață',
    category: 'muncă',
    region: 'național',
  },
  {
    text: 'Nu-i frunză fără rouă',
    meaning: 'Totul are o cauză și o explicație; nimic nu se întâmplă fără motiv',
    category: 'filozofie',
    region: 'Moldova',
  },
  {
    text: 'Graba strică treaba',
    meaning: 'Când faci lucrurile pe grabă, riscăm să greșim și să înrăutățim situația',
    category: 'muncă',
    region: 'național',
  },
  {
    text: 'Privește-ți gura, că te privește lumea',
    meaning: 'Fii atent la ceea ce spui, pentru că cuvintele tale te definesc în fața altora',
    category: 'înțelepciune',
    region: 'național',
  },
  {
    text: 'Cine se aseamănă se adună',
    meaning: 'Oamenii cu calități sau interese similare tind să devină prieteni',
    category: 'prietenie',
    region: 'național',
  },
  {
    text: 'Unde-i fum, e și foc',
    meaning: 'Zvonurile și bârfele de obicei au un fond de adevăr',
    category: 'înțelepciune',
    region: 'național',
  },
  {
    text: 'Vorba dulce mult aduânge',
    meaning: 'Prin politete și amabilitate poți obține mai multe decât prin forță',
    category: 'prietenie',
    region: 'național',
  },
  {
    text: 'La nevoie se cunoaște prietenul',
    meaning: 'Adevărații prieteni se dovedesă a fi alături de tine în momente dificile',
    category: 'prietenie',
    region: 'național',
  },
];

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data
    await prisma.proverb.deleteMany();
    console.log('✅ Cleared existing proverbs');

    // Seed proverbs
    for (const proverb of PROVERBS) {
      const keywords = proverb.text.split(' ').filter(w => w.length > 3);
      const imagePrompt = getFolkArtPrompt(proverb.text, proverb.category);

      await prisma.proverb.create({
        data: {
          ...proverb,
          keywords: JSON.stringify(keywords),
          imagePrompt,
          validated: true,
          popularity: Math.floor(Math.random() * 100),
        },
      });

      console.log(`✅ Added: ${proverb.text}`);
    }

    // Seed categories
    const categories = [
      { name: 'filozofie', description: 'Proverbe despre viață și înțelepciune', icon: '🧘', color: '#C41E3A' },
      { name: 'familie', description: 'Proverbe despre familie și relații', icon: '👨‍👩‍👧', color: '#FECE00' },
      { name: 'muncă', description: 'Proverbe despre muncă și efort', icon: '💪', color: '#002868' },
      { name: 'prietenie', description: 'Proverbe despre prieteni și camaraderie', icon: '🤝', color: '#DAA520' },
      { name: 'înțelepciune', description: 'Proverbe începute', icon: '🦉', color: '#8B4513' },
    ];

    await prisma.category.deleteMany();
    for (const category of categories) {
      await prisma.category.create({ data: category });
    }

    console.log('\n✨ Seeding completed successfully!');
    console.log(`📊 Total proverbs: ${PROVERBS.length}`);
    console.log(`🏷️ Total categories: ${categories.length}`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
