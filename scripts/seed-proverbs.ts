import { PrismaClient } from '@prisma/client';
import { getFolkArtPrompt } from '../src/lib/pollinations';

const prisma = new PrismaClient();

const PROVERBS = [
  { text: 'Apa trece, pietrele rămân', meaning: 'Lucrurile importante și durabile rămân, în timp ce cele trecătoare dispar', category: 'filozofie', region: 'național' },
  { text: 'Așchia nu sare departe de trunchi', meaning: 'Copiii seamănă cu părinții lor, moștenind calitățile și defectele acestora', category: 'familie', region: 'Ardeal' },
  { text: 'Cine se scoală de dimineață, departe ajunge', meaning: 'Persoanele active și harnice reușesc mai ușor în viață', category: 'muncă', region: 'național' },
  { text: 'Nu-i frunză fără rouă', meaning: 'Totul are o cauză și o explicație; nimic nu se întâmplă fără motiv', category: 'filozofie', region: 'Moldova' },
  { text: 'Graba strică treaba', meaning: 'Când faci lucrurile pe grabă, riscăm să greșim și să înrăutățim situația', category: 'muncă', region: 'național' },
  { text: 'Privește-ți gura, că te privește lumea', meaning: 'Fii atent la ceea ce spui, pentru că cuvintele tale te definesc în fața altora', category: 'înțelepciune', region: 'național' },
  { text: 'Cine se aseamănă se adună', meaning: 'Oamenii cu calități sau interese similare tind să devină prieteni', category: 'prietenie', region: 'național' },
  { text: 'Unde-i fum, e și foc', meaning: 'Zvonurile și bârfele de obicei au un fond de adevăr', category: 'înțelepciune', region: 'național' },
  { text: 'Vorba dulce mult adunge', meaning: 'Prin politețe și amabilitate poți obține mai multe decât prin forță', category: 'prietenie', region: 'național' },
  { text: 'La nevoie se cunoaște prietenul', meaning: 'Adevărații prieteni se dovedesc a fi alături de tine în momente dificile', category: 'prietenie', region: 'național' },
  { text: 'Cine seamănă vânt, culege furtună', meaning: 'Acțiunile negative au consecințe grave', category: 'filozofie', region: 'național' },
  { text: 'Nu lăsa pe mâine ce poți face azi', meaning: 'Amânarea lucrurilor importante poate duce la probleme', category: 'muncă', region: 'național' },
  { text: 'Câinele care latră nu mușcă', meaning: 'Cei care amenință mult de obicei nu sunt periculoși', category: 'înțelepciune', region: 'național' },
  { text: 'Banii nu aduc fericirea', meaning: 'Bogăția materială nu garantează mulțumirea sufletească', category: 'filozofie', region: 'național' },
  { text: 'Ochii care nu se văd se uită', meaning: 'Absența înstrăinează oamenii', category: 'dragoste', region: 'național' },
  { text: 'Cu răbdare și noroc ajungi departe', meaning: 'Perseverența și șansa te pot duce spre succes', category: 'muncă', region: 'național' },
  { text: 'Păsările multe belesc ogorul', meaning: 'Când sunt prea mulți implicați într-o treabă, rezultatul poate fi dezastruos', category: 'muncă', region: 'național' },
  { text: 'Măgarul în salcia scăpat', meaning: 'Prostul care a ajuns la putere sau avere', category: 'înțelepciune', region: 'Muntenia' },
  { text: 'Cu cât mergi mai departe, cu atât te afunzi mai tare', meaning: 'Persistența într-o direcție greșită agravează situația', category: 'filozofie', region: 'național' },
  { text: 'Cine aleargă după doi iepuri nu prinde niciunul', meaning: 'Concentrarea pe prea multe obiective duce la eșec', category: 'înțelepciune', region: 'național' },
  { text: 'Mai bine singur decât prost însoțit', meaning: 'Compania proastă e mai rea decât solitudinea', category: 'prietenie', region: 'național' },
  { text: 'Cine nu muncește să nu mănânce', meaning: 'Trebuie să depui efort pentru a beneficia', category: 'muncă', region: 'național' },
  { text: 'A face din țânțar armăsar', meaning: 'A exagera o problemă mică', category: 'înțelepciune', region: 'național' },
  { text: 'Omul sfințește locul', meaning: 'Calitatea persoanei definește valoarea poziției', category: 'filozofie', region: 'național' },
  { text: 'Nu te lăsa dus de val', meaning: 'Nu urma orbește ce face majoritatea', category: 'înțelepciune', region: 'național' },
  { text: 'La un măr bun și corbii ciugulesc', meaning: 'Lucrurile valoroase atrag și răi intenționați', category: 'filozofie', region: 'național' },
  { text: 'Multe puțin fac un mult', meaning: 'Eforturile mici constante duc la rezultate mari', category: 'muncă', region: 'național' },
  { text: 'Nu da cu piatra în cireș', meaning: 'Nu distruge sursa de care te bucuri', category: 'înțelepciune', region: 'național' },
  { text: 'Cine are carte, are parte', meaning: 'Educația deschide oportunități', category: 'înțelepciune', region: 'național' },
  { text: 'Capul plecat sabia nu-l taie', meaning: 'Umilința și evitarea conflictului pot salva situații', category: 'filozofie', region: 'național' },
  { text: 'Minciunile au picioare scurte', meaning: 'Neadevărul este descoperit repede', category: 'filozofie', region: 'național' },
  { text: 'Bate fierul cât e cald', meaning: 'Profită de moment când e prielnic', category: 'muncă', region: 'național' },
  { text: 'Cine râde la urmă, râde mai bine', meaning: 'Răbdarea și persistența sunt răsplătite', category: 'filozofie', region: 'național' },
  { text: 'Nu e fum fără păr', meaning: 'Există un motiv pentru orice zvon', category: 'înțelepciune', region: 'Moldova' },
  { text: 'Cu cât crește pirul, cu atât nu-l ajunge apa', meaning: 'Cu cât cresc pretențiile, cu atât e mai greu de mulțumit', category: 'filozofie', region: 'național' },
  { text: 'Cine se uită în urmă rămâne în urmă', meaning: 'Concentrarea pe trecut împiedică progresul', category: 'filozofie', region: 'național' },
  { text: 'Cât trăiești, înveți', meaning: 'Învățarea e un proces continuu', category: 'înțelepciune', region: 'național' },
  { text: 'Nu schimba caii la mijlocul drumului', meaning: 'Nu schimba strategia când ești deja pe cale', category: 'muncă', region: 'național' },
  { text: 'Lupul își schimbă părul, dar năravul ba', meaning: 'Caracterul fundamental nu se schimbă ușor', category: 'filozofie', region: 'național' },
  { text: 'Soarele răsare pentru toți', meaning: 'Oportunitățile sunt disponibile tuturor', category: 'filozofie', region: 'național' },
  { text: 'Omul e lup pentru om', meaning: 'Oamenii pot fi duri unii cu alții', category: 'filozofie', region: 'național' },
  { text: 'Cine nu riscă nu câștigă', meaning: 'Succesul necesită asumarea riscurilor', category: 'filozofie', region: 'național' },
  { text: 'Un copac doborât cu zgomot, o mie ridicați în tăcere', meaning: 'Distrugerea e ușoară și vizibilă, construcția e grea și discretă', category: 'filozofie', region: 'național' },
  { text: 'Cine sapă groapa altuia cade singur în ea', meaning: 'Răul făcut altora se întoarce împotriva ta', category: 'filozofie', region: 'național' },
  { text: 'La urma urmei vaca cu coada bate', meaning: 'La final, cel de care nu te aștepți decide', category: 'înțelepciune', region: 'național' },
  { text: 'Dracul nu-i așa de negru pe cum îl zugrăvesc', meaning: 'Lucrurile nu sunt niciodată atât de rele pe cât par', category: 'filozofie', region: 'național' },
  { text: 'Cine n-are cap are picioare', meaning: 'Prostia duce la eforturi zadarnice', category: 'înțelepciune', region: 'național' },
  { text: 'Vorba lungă sărăcia omului', meaning: 'Vorbitul prea mult e semn de lipsă de substanță', category: 'înțelepciune', region: 'național' },
  { text: 'Câte parale, atâtea griji', meaning: 'Bogăția aduce responsabilități și probleme', category: 'filozofie', region: 'național' },
  { text: 'Nu tot ce zboară se mănâncă', meaning: 'Nu tot ce pare bun e de fapt folositor', category: 'înțelepciune', region: 'național' },
];

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data
    await prisma.proverb.deleteMany();
    console.log('✅ Cleared existing proverbs');

    // Seed proverbs
    let count = 0;
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

      count++;
      if (count % 10 === 0) {
        console.log(`✅ Added ${count} proverbs...`);
      }
    }

    // Seed categories
    const categories = [
      { name: 'filozofie', description: 'Proverbe despre viață și înțelepciune', icon: '🧘', color: '#C41E3A' },
      { name: 'familie', description: 'Proverbe despre familie și relații', icon: '👨‍👩‍👧', color: '#FECE00' },
      { name: 'muncă', description: 'Proverbe despre muncă și efort', icon: '💪', color: '#002868' },
      { name: 'prietenie', description: 'Proverbe despre prieteni și camaraderie', icon: '🤝', color: '#DAA520' },
      { name: 'înțelepciune', description: 'Proverbe înțelepte', icon: '🦉', color: '#8B4513' },
      { name: 'dragoste', description: 'Proverbe despre iubire și relații', icon: '❤️', color: '#E8B4B8' },
        ];

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
