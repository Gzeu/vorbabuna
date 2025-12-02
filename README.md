# 🇷🇴 VorbaBună - Proverbe Românești Ilustrate cu AI

> Descoperă înțelepciunea strămoșească românească printr-o experiență modernă și interactivă

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2d3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gzeu/vorbabuna)

---

## 📸 Preview

> **Live Demo**: [vorbabuna.vercel.app](https://vorbabuna.vercel.app)

---

## ✨ Features

### 🎨 Design
- **Paleta de culori inspiră din ie tradițională**: Roșu #C41E3A, Galben #FECE00, Albastru #002868
- **Tipografie premium**: Playfair Display serif + Cinzel decorative
- **Animații fluide**: Framer Motion pentru tranziții și micro-interacțiuni
- **Responsive design**: Optimizat pentru mobile, tablet și desktop
- **Dark mode ready**: Teme vizuale cu motive populare românești

### 📚 Conținut
- **50+ Proverbe autentice** din toate regiunile României (extensibil la 1000+)
- **6 Categorii**: filozofie, familie, muncă, natură, dragoste, prietenie
- **Imagini AI**: Fiecare proverb are ilustrații unice generate de Pollinations.ai
- **Text-to-Speech**: Pronunție vocală pentru fiecare proverb

### 🔍 Funcționalități
- **Căutare full-text** cu autocomplete și debounce
- **Filtrare după categorie** și regiune
- **Quiz interactiv** pentru testarea cunoștințelor
- **Contribuții comunitare** cu sistem de validare
- **Share social** (Web Share API)
- **Favorite/Love** cu state management
- **Error handling** profesional (404, error boundaries)
- **SEO optimized** (sitemap, robots.txt, meta tags)

---

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

# Seed database with 50 proverbs
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

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
  validated    Boolean  @default(false)
  popularity   Int      @default(0)
  createdAt    DateTime @default(now())
}
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/proverb` | Random proverb |
| GET | `/api/proverb/search?q=term` | Full-text search |
| GET | `/api/proverb/:id` | Specific proverb |
| GET | `/api/proverb/category?name=cat` | Filter by category |
| POST | `/api/contribute` | Submit new proverb |

---

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

---

## 📱 Project Structure

```
vorbabuna/
├── src/
│   ├── app/              # Next.js 14 App Router
│   │   ├── api/          # API routes
│   │   ├── search/       # Search page
│   │   ├── quiz/         # Quiz page
│   │   ├── contribute/   # Contribution form
│   │   └── proverb/[id]/ # Individual proverb
│   ├── components/   # React components
│   ├── lib/          # Utilities (db, pollinations, utils)
│   └── types/        # TypeScript types
├── public/           # Static assets
├── prisma/           # Database schema
├── scripts/          # Seed scripts
└── data/             # Sample data
```

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Prisma ORM + PostgreSQL
- **Image Generation**: Pollinations.ai (free, no API key)
- **Icons**: Lucide React
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

---

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
---

## 🌐 Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gzeu/vorbabuna&env=DATABASE_URL&envDescription=PostgreSQL%20connection%20string&project-name=vorbabuna&repository-name=vorbabuna)

### Manual Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `DATABASE_URL`
4. Deploy automatically!

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for detailed guide.

---

## 🤝 Contributing

Contribuțiile sunt binevenite! Vezi [CONTRIBUTING.md](CONTRIBUTING.md) pentru detalii.

---

## 📜 License

MIT License - vezi [LICENSE](LICENSE) pentru detalii.

---

## 👥 Credits

- **Design inspirație**: Ie tradițională românească
- **Proverbe**: Wikipedia, WikiQuote, Gokid.ro
- **Imagini**: Pollinations.ai
- **Icons**: Lucide React
- **Developer**: [@Gzeu](https://github.com/Gzeu)

---

## 📧 Contact

- **GitHub**: [@Gzeu](https://github.com/Gzeu)
- **Website**: [vorbabuna.vercel.app](https://vorbabuna.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/Gzeu/vorbabuna/issues)

---

## 🌟 Star History

If you like this project, please consider giving it a star ⭐️

---

Făcut cu ❤️ în România 🇷🇴
