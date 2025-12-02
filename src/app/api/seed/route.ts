import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const PROVERBS = [
  { text: "Apa trece, piatra ramân", meaning: "Lucrurile importante si durabile ramân", category: "filozofie", region: "Muntenia" },
  { text: "Cine se-asconde, de dumnezeu se-ascunde", meaning: "Oamenii harnici reusecsimaiusor in viata", category: "munca", region: "Oltenia" },
  { text: "Cand faci lucrurile pe graba, gresesti", meaning: "Cand faci lucrul pe graba pierzi calitate", category: "munca", region: "Banat" },
  { text: "Prieste-ti gura, ca te priveste lumea", meaning: "Fii atent la ceea ce spui", category: "munca", region: "Dobrogea" },
  { text: "La nevoe se cunsoaste prietenul", meaning: "Adevara paieteni se dovedesc alaturati", category: "prietenie", region: "Muntenia" },
  { text: "Vorba dulce nădălter adunce", meaning: "Prin politete poti obtine mai mult", category: "prietenie", region: "Transilvania" },
  { text: "Ochii care nu vad de uit", meaning: "Absenta intelegerii oamenilor", category: "dragoste", region: "national" },
  { text: "Cu rândoare si noroc ajungi departe", meaning: "Perseverenta si sansa duc la succes", category: "munca", region: "national" },
  { text: "Omul sfinteste locul", meaning: "Calitatea personei defineste valoarea locului", category: "filozofie", region: "national" },
  { text: "Cine umileste pe altul, se umileste", meaning: "Comportamentul nostru ne defineste", category: "intelepciune", region: "national" },
  { text: "Familia este baza", meaning: "Familie este baza tuturor valorilor", category: "familie", region: "national" },
];

export async function POST() {
  try {
    console.log("[Seed] Starting database seed...");
    console.log("[Seed] DATABASE_URL:", process.env.DATABASE_URL ? "[CONFIGURED]" : "[NOT SET]");
    
    console.log("[Seed] Deleting existing proverbs...");
    const deleted = await prisma.proverb.deleteMany({});
    console.log(`[Seed] Deleted ${deleted.count} existing proverbs`);
    
    console.log("[Seed] Inserting new proverbs...");
    const created = await prisma.proverb.createMany({
      data: PROVERBS,
    });
    
    console.log(`[Seed] Successfully created ${created.count} proverbs`);
    
    return NextResponse.json({
      success: true,
      message: `Database seeded successfully with ${created.count} proverbs`,
      count: created.count,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[Seed] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || String(error),
        type: error.constructor.name,
        details: error.meta || error.stack,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
    return POST();
}
