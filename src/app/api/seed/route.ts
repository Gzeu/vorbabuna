import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const PROVERBS = [
  { text: "Apa trece, piatra ramân", meaning: "Lucrurile importante si durabile ramân, în timp ce cele trecutoare dispar", category: "filozofie", region: "Muntenia" },
  { text: "Cine se-asconde, de dumnezeu se-ascunde", meaning: "Personanele active si harnice reusesc mai ușor în viață", category: "munca", region: "Oltenia" },
  { text: "Cand faci lucrurile pe graba, greșesti", meaning: "Cand faci lucrul pe grabă pierzi calitate", category: "munca", region: "Banat" },
  { text: "Prieste-ți gura, ca te priveste lumea", meaning: "Fii atent la ceea spui, pentru că cuvintele tale te definesc în fața altora", category: "munca", region: "Dobrogea" },
  { text: "La nevoe se cunsoaste prietenul", meaning: "Adevărații prieteni se dovedesc a fi alături de tine în momente dificile", category: "prietenie", region: "Muntenia" },
  { text: "Vorba dulce nădălter adunce", meaning: "Prin politete si amabilitate poți obtine mai multe decât prin forță", category: "prietenie", region: "Transilvania" },
  { text: "Ochii care nu vad de uit", meaning: "Absența înțelegerii oamenilor", category: "dragoste", region: "national" },
  { text: "Cu rândoare si noroc ajungi departe", meaning: "Perseverență si șansă pot duce spre succes", category: "munca", region: "national" },
  { text: "Omul sfinteste locul", meaning: "Calitatea personei defineste valoarea pozitiei", category: "filozofie", region: "national" },
  { text: "Cine umileste pe altul, se umileste", meaning: "Comportamentul nostru ne defineste pe noi însiși", category: "intelepciune", region: "national" },
  { text: "Famiglia este temelia", meaning: "Familie este baza tuturor valorilor", category: "familie", region: "national" },
];

export async function POST() {
  try {
    await prisma.proverb.deleteMany({});
    
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
    message: "POST to this endpoint to seed the database with proverbs",
  });
}
