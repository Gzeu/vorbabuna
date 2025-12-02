# 🇷🇴 VorbaBună - Proverbe Românești Ilustrate cu AI

> Descoperă înțelepciunea strămoșească românească printr-o experiență modernă și interactivă

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2d3748)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🎨 Design
- **Paleta de culori inspiră din ie tradițională**: Roșu #C41E3A, Galben #FECE00, Albastru #002868
- **Tipografie premium**: Playfair Display serif + Cinzel decorative
- **Animații fluide**: Framer Motion pentru tranziții și micro-interacțiuni
- **Responsive design**: Optimizat pentru mobile, tablet și desktop
- **Dark mode ready**: Teme vizuale cu motive populare românești

### 📚 Conținut
- **1000+ Proverbe autentice** din toate regiunile României
- **12 Categorii**: filozofie, familie, muncă, natură, dragoste, prietenie, etc.
- **Imagini AI**: Fiecare proverb are ilustrații unice generate de Pollinations.ai
- **Text-to-Speech**: Pronunție vocală pentru fiecare proverb

### 🔍 Funcționalități
- **Căutare full-text** cu autocomplete și debounce
- **Filtrare după categorie** și regiune
- **Quiz interactiv** pentru testarea cunoștințelor
- **Contribuții comunitare** cu sistem de validare
- **Share social** (Web Share API)
- **Favorite/Love** cu state management

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

```bash
# Clone repository
git clone https://github.com/Gzeu/vorbabuna.git
cd vorbabuna

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Setup database
npx prisma db push
npx prisma generate

# Seed database with proverbs
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📊 Database Schema

```prisma
model Proverb {
  id           Int      @id @default(autoincrement())
  text         String   @unique
  meaning      String
  category     String
  region       String?
  keywords     String   // JSON array
  imagePrompt  String
  imageUrl     String?
  audioUrl     String?
  popularity   Int      @default(0)
  source       String?
  validated    Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  userId       String?
}
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/proverb` | Random proverb |
| GET | `/api/proverb/search?q=term` | Full-text search |
| GET | `/api/proverb/:id` | Specific proverb |
| GET | `/api/proverb/category?name=cat` | Filter by category |
| POST | `/api/contribute` | Submit new proverb |

## 🎨 Design System

### Colors

```typescript
folk: {
  red: '#C41E3A',      // Roșu ie tradițională
  yellow: '#FECE00',   // Galben miere
  blue: '#002868',     // Albastru ceresc
  brown: '#8B4513',    // Maro pământ
  cream: '#FFF8DC',    // Crem natural
  gold: '#DAA520',     // Auriu fir
}
```

### Typography

- **Display**: Cinzel Decorative (headers)
- **Serif**: Playfair Display (proverbs)
- **Sans**: Inter (body text)

## 📱 Project Structure

```
vorbabuna/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── search/           # Search page
│   │   ├── quiz/             # Quiz page
│   │   ├── contribute/       # Contribution form
│   │   ├── proverb/[id]/     # Individual proverb
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchBar.tsx
│   │   └── ProverbCardEnhanced.tsx
│   ├── lib/
│   │   ├── db.ts             # Prisma client
│   │   ├── pollinations.ts   # Image generation
│   │   └── utils.ts          # Helper functions
│   └── types/
├── prisma/
│   └── schema.prisma     # Database schema
├── public/
├── scripts/
│   └── seed-proverbs.ts  # Database seeding
└── data/
    └── proverbs.json     # Proverbs collection
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Image Generation**: Pollinations.ai (free, no API key)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📝 Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run format      # Format with Prettier
npm run db:push     # Push schema to database
npm run db:seed     # Seed database with proverbs
npm run db:migrate  # Run Prisma migrations
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="https://vorbabuna.vercel.app"
```

## 🤝 Contributing

Contribuțiile sunt binevenite! Vezi [CONTRIBUTING.md](CONTRIBUTING.md) pentru detalii.

## 📜 License

MIT License - vezi [LICENSE](LICENSE) pentru detalii.

## 👥 Credits

- **Design inspirație**: Ie tradițională românească
- **Proverbe**: Wikipedia, WikiQuote, Gokid.ro
- **Imagini**: Pollinations.ai
- **Icons**: Lucide React

## 📧 Contact

- **GitHub**: [@Gzeu](https://github.com/Gzeu)
- **Email**: contact@vorbabuna.ro
- **Website**: [vorbabuna.vercel.app](https://vorbabuna.vercel.app)

---

Făcut cu ❤️ în România
