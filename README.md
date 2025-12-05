# 🇷🇴 VorbaBună - Proverbe Românești Ilustrate cu AI

> Descoperă înțelepciunea strămoșească românească printr-o experiență modernă și interactivă

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2d3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vorbabuna.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gzeu/vorbabuna)

---

## 📸 Preview

> **Live Demo**: [vorbabuna.vercel.app](https://vorbabuna.vercel.app)

**Ultima actualizare**: Decembrie 2025 - Integrare completă Pollinations AI pentru generarea automată de ilustrații

---

## ✨ Features

### 🤖 AI-Powered Features (NOU!)
- **Pollinations AI Integration**: Generare automată de imagini unice pentru fiecare proverb
- **Category-Aware Prompts**: Prompturi inteligente adaptate la categoria proverbului
- **Batch Processing**: Procesare în masă pentru generarea de imagini multiple
- **Smart Fallbacks**: Sistem automat de fallback la Unsplash dacă generarea eșuează
- **Image Prompt Storage**: Stocarea prompturilor pentru referință viitoare

### 🎨 Design
- **Paleta de culori inspiră din ie tradițională**: Roșu #C41E3A, Galben #FECE00, Albastru #002868
- **Tipografie premium**: Playfair Display serif + Cinzel decorative
- **Animații fluide**: Framer Motion pentru tranziții și micro-interacțiuni
- **Responsive design**: Optimizat pentru mobile, tablet și desktop
- **Dark mode ready**: Teme vizuale cu motive populare românești
- **ProverbCardEnhanced**: Component UI îmbunătățit cu imagini AI și styling avansat

### 📚 Conținut
- **50+ Proverbe autentice** din toate regiunile României (extensibil la 1000+)
- **6 Categorii**: Filozofie, Familie, Muncă, Natură, Dragoste, Prietenie
- **Imagini AI Generate**: Fiecare proverb are ilustrații unice create cu Pollinations.ai
- **Text-to-Speech**: Pronunție vocală pentru fiecare proverb (implementare în curs)

### 🔍 Funcționalități Interactive
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
  category     String?
  region       String?
  keywords     String   // JSON array
  imageUrl     String?  // Generated AI image or Unsplash fallback
  imagePrompt  String?  // AI prompt used for generation
  validated    Boolean  @default(false)
  popularity   Int      @default(0)
  createdAt    DateTime @default(now())
}
```

---

## 📡 API Endpoints

### Proverbs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/proverb` | Random proverb |
| GET | `/api/proverb/search?q=term` | Full-text search |
| GET | `/api/proverb/:id` | Specific proverb |
| GET | `/api/proverb/category?name=cat` | Filter by category |
| POST | `/api/contribute` | Submit new proverb |

### AI Image Generation (NOU!)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/proverb-images` | Generate AI image for single proverb |
| PUT | `/api/proverb-images` | Batch generate images for multiple proverbs |

#### Example: Generate Image

```bash
# Single proverb
curl -X POST https://vorbabuna.vercel.app/api/proverb-images \
  -H "Content-Type: application/json" \
  -d '{
    "proverbText": "Cine seamănă vânt culege furtună",
    "category": "Filozofie",
    "region": "Moldova"
  }'

# Batch processing
curl -X PUT https://vorbabuna.vercel.app/api/proverb-images
```

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
│   ├── app/                  # Next.js 14 App Router
│   │   ├── api/              # API routes
│   │   │   ├── proverb/      # Proverb CRUD endpoints
│   │   │   └── proverb-images/ # AI image generation (NOU!)
│   │   ├── search/           # Search page
│   │   ├── quiz/             # Quiz page
│   │   ├── contribute/       # Contribution form
│   │   └── proverb/[id]/     # Individual proverb
│   ├── components/       # React components
│   │   └── ProverbCardEnhanced.tsx  # Enhanced card with AI images
│   ├── lib/              # Utilities
│   │   ├── db.ts         # Prisma client
│   │   ├── pollinations.ts # AI image generation (NOU!)
│   │   └── utils.ts      # Helper functions
│   └── types/            # TypeScript types
├── public/               # Static assets
├── prisma/               # Database schema
├── scripts/              # Seed scripts
└── data/                 # Sample data
```

---

## 🛠️ Tech Stack

### Core
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript 5.3
- **Styling**: Tailwind CSS 3.4, Framer Motion
- **Database**: Prisma ORM + PostgreSQL/SQLite

### AI & Media
- **Image Generation**: [Pollinations.ai](https://pollinations.ai) (free, no API key required)
- **Image Fallback**: Unsplash API
- **Text-to-Speech**: Web Speech API (implementare viitoare)

### Infrastructure
- **Deployment**: Vercel (serverless, auto-deploy from main branch)
- **CI/CD**: GitHub Actions
- **Icons**: Lucide React
- **Monitoring**: Vercel Analytics

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
npm run db:studio   # Open Prisma Studio
```
---

## 🌐 Deployment

### Production URL

**Live**: [vorbabuna.vercel.app](https://vorbabuna.vercel.app)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gzeu/vorbabuna&env=DATABASE_URL&envDescription=PostgreSQL%20connection%20string&project-name=vorbabuna&repository-name=vorbabuna)

### Manual Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `DATABASE_URL`
4. Deploy automatically!

**Note**: Pollinations AI funcționează direct în mediul serverless Vercel fără configurări VPC sau API keys.

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for detailed guide.

---

## 🔧 Recent Updates (Dec 2025)

### Latest Features
- ✅ Pollinations AI integration for automatic image generation
- ✅ Category-aware AI prompts (Familie, Filozofie, Muncă, Natură, Dragoste, Prietenie)
- ✅ Batch processing API endpoint (PUT /api/proverb-images)
- ✅ Smart fallback system to Unsplash
- ✅ Image prompt storage in database
- ✅ ProverbCardEnhanced component with AI-generated images
- ✅ TypeScript improvements for nullable fields
- ✅ Fixed API route syntax errors

### Bug Fixes
- Fixed GenerateImagePromptParams interface for nullable category/region
- Corrected POST handler object literal syntax
- Added nullish coalescing for category index access
- Updated Prisma import paths

---

## 🤝 Contributing

Contribuțiile sunt binevenite! Vezi [CONTRIBUTING.md](CONTRIBUTING.md) pentru detalii.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

MIT License - vezi [LICENSE](LICENSE) pentru detalii.

---

## 👥 Credits

- **Design inspirație**: Ie tradițională românească
- **Proverbe**: Wikipedia, WikiQuote, Gokid.ro, colecții populare
- **AI Images**: [Pollinations.ai](https://pollinations.ai) - Free AI image generation
- **Image Fallback**: Unsplash API
- **Icons**: Lucide React
- **Framework**: Next.js by Vercel
- **Developer**: [@Gzeu](https://github.com/Gzeu) - George Pricop

---

## 📧 Contact

- **GitHub**: [@Gzeu](https://github.com/Gzeu)
- **Website**: [vorbabuna.vercel.app](https://vorbabuna.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/Gzeu/vorbabuna/issues)
- **Location**: București, România 🇷🇴

---

## 📈 Roadmap

### Upcoming Features
- [ ] Integrare completă Text-to-Speech pentru toate proverbele
- [ ] Dashboard admin pentru management conținut
- [ ] API publică cu rate limiting
- [ ] Mobile app (React Native / Flutter)
- [ ] Sistem de gamification cu badges și achievements
- [ ] Multi-language support (English, French, Spanish)
- [ ] Advanced analytics dashboard
- [ ] Social features: comments, ratings, user profiles

### Performance Goals
- [ ] Lighthouse score 95+ pe toate categoriile
- [ ] Sub 2s load time pe 4G
- [ ] PWA certification
- [ ] Edge caching pentru imagini AI

---

## 🌟 Star History

If you like this project, please consider giving it a star ⭐️

[![Star History Chart](https://api.star-history.com/svg?repos=Gzeu/vorbabuna&type=Date)](https://star-history.com/#Gzeu/vorbabuna&Date)

---

## 🙏 Acknowledgments

Mulțumiri speciale tuturor celor care au contribuit la păstrarea și transmiterea proverbelor românești de-a lungul generațiilor.

---

Făcut cu ❤️ în București, România 🇷🇴

**Last Updated**: December 5, 2025