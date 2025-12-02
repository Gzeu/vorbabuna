import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const romanianProverbs = [
  { text: 'Vorba lunga saraceste omenirea', category: 'Comunicație', popularity: 85 },
  { text: 'Cine se scoala de dimineata, departe ajunge', category: 'Muncă', popularity: 95 },
  { text: 'Cainele care latra nu musca', category: 'Înțelepciune', popularity: 90 },
  { text: 'Cu răbdarea treci marea', category: 'Răbdare', popularity: 88 },
  { text: 'Unde-i fum, e si foc', category: 'Adevăr', popularity: 82 },
  { text: 'Cine seamana vant, culege furtuna', category: 'Consecințe', popularity: 87 },
  { text: 'Degeaba ai cap daca nu-l folosesti', category: 'Inteligență', popularity: 78 },
  { text: 'La nevoie se cunoaște prietenul', category: 'Prietenie', popularity: 92 },
  { text: 'Nu e fum fara foc', category: 'Adevăr', popularity: 85 },
  { text: 'Cine are carte, are parte', category: 'Educație', popularity: 91 },
  { text: 'Graba strica treaba', category: 'Prudentă', popularity: 89 },
  { text: 'Așteaptă popa popa sa-l spovedeasca', category: 'Ipocrizie', popularity: 75 },
  { text: 'Banii fac bani', category: 'Bogăție', popularity: 84 },
  { text: 'Casa buna isi gaseste stapan', category: 'Calitate', popularity: 76 },
  { text: 'Cine alearga dupa doi iepuri, nu prinde niciunul', category: 'Focalizare', popularity: 88 },
  { text: 'Cine fuge de lup, da de urs', category: 'Destin', popularity: 80 },
  { text: 'Cine iubeste lantisor, iubeste si pisica', category: 'Dragoste', popularity: 77 },
  { text: 'Cine n-are bani, n-are nici muzica', category: 'Bani', popularity: 72 },
  { text: 'Cine nu munceste, sa nu manance', category: 'Muncă', popularity: 86 },
  { text: 'Cine se aseamana, se aduna', category: 'Asemănare', popularity: 83 },
  { text: 'Din gura in gura, se invarte poveste-ncurcata', category: 'Zvonuri', popularity: 74 },
  { text: 'Drumul spre iad e pavat cu bune intentii', category: 'Intenții', popularity: 79 },
  { text: 'Fiecare cu painea lui', category: 'Independență', popularity: 71 },
  { text: 'Gluma de prost iese prost', category: 'Umor', popularity: 73 },
  { text: 'Hopul de la coadat nu se pierde niciodata', category: 'Caract', popularity: 70 },
];

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.proverb.deleteMany({});

  // Seed proverbs
  for (const proverb of romanianProverbs) {
    await prisma.proverb.create({
      data: proverb,
    });
  }

  console.log(`Seeded ${romanianProverbs.length} proverbs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
