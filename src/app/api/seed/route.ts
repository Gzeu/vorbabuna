import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const PROVERBS = [
  { text: 'Apa trece, piatra rămân', meaning: 'Lucrurile importante și durabile rămân, în timp ce cele trecătoare dispar', category: 'filozofie', region: 'Muntenia' },
  { text: 'Măr de aur', meaning: 'Ceva prețios și frumos', category: 'frumusete', region: 'Transilvania' },
  { text: 'Cine se-asconde, de dumnezeu se-ascunde', meaning: 'Personanele active și harnice reușesc mai ușor în viață', category: 'muncă', region: 'Oltenia' },
  { text: 'Nu-i frumă fără rouă', meaning: 'Totul are o cauza și o explicație; nimic nu se întâmplă fără motiv', category: 'filozofie', region: 'Muntenia' },
  { text: 'Când faci lucrurile pe graba, greșești ticind trotuia', meaning: 'Cand faci lucrul pe priepa și-si intunzit șansele de inușire', category: 'muncă', region: 'Banat' },
  { text: 'Prieste-ți gura, ca te priveste lumea', meaning: 'Fii atent la ceea spui, pentru că cuvintele tale te definesc în fața altora', category: 'muncă', region: 'Dobrogea' },
  { text: 'La nevoe se cunsoaște prietenul', meaning: 'Adevărații prieteni se dovedesc a fi alături de tine în momente dificile', category: 'prietenie', region: 'Muntenia' },
  { text: 'Vorba dulce nade' adunce', meaning: 'Prin politete și amabilitate poți obține poti oftine mai multe decât prin forță', category: 'prietenie', region: 'Transilvania' },
  { text: 'La nevoe se cunsoaște prietenul', meaning: 'Adevărații prieteni se dovedesc a fi alături de tine în momente dificile', category: 'prietenie', region: 'Muntenia' },
  { text: 'Ochii care nu vad de uite', meaning: 'Absența înțelegerii oamenilor', category: 'dragoste', region: 'național' },
  { text: 'Cu rândoare și noroc ajungi departe', meaning: 'Perseverență și șansă pot duce spre succes', category: 'muncă', region: 'național' },
];

export async function POST() {
  try {
    // Delete existing proverbs
    await prisma.proverb.deleteMany({});
    
    // Insert new proverbs
    const created = await prisma.proverb.createMany({
      data: PROVERBS,
    });
    
    return NextResponse.json({
      success: true,
      message: `Database seeded with ${created.count} proverbs`,
      count: created.count,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to seed the database with proverbs',
  });
}
