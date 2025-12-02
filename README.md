# 🇷🇴 Vorbă Bună - Proverbe Românești Ilustrate cu AI

**Aplicație web full-stack** pentru descoperirea și aprecierea înțelepciunii populare românești prin 1000+ proverbe autentice, imagini generate cu AI, text-to-speech și funcții interactive.

## ✨ Caracteristici

- 📚 **1000+ Proverbe Autentice** - Colecție cuprinzătoare de înțelepciune populară românească
- 🎨 **Imagini Generate cu AI** - Ilustrații unice create cu DALL-E 3
- 🔊 **Text-to-Speech** - Ascultă proverbele cu voce sintetizată românească (Google Cloud TTS)
- 🔍 **Căutare Avansată** - Găsește proverbe după conținut, categorie sau regiune
- ❤️ **Favorite & Share** - Salvează și distribuie proverbele preferate
- 📱 **Responsive Design** - Experiență optimă pe toate dispozitivele
- ⚡ **Performance** - Optimizat cu Next.js 14, App Router și caching inteligent

## 🛠️ Stack Tehnologic

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**

### AI & Services
- **OpenAI API** (DALL-E 3 pentru generare imagini, GPT-4 pentru explicații)
- **Google Cloud Text-to-Speech**
- **Vercel** (deployment)

## 🚀 Quick Start

### Prерезquisite

```bash
node >= 18.0.0
pnpm >= 8.0.0
postgresql >= 14.0
```

### Instalare

```bash
# Clone repository
git clone https://github.com/Gzeu/vorbabuna.git
cd vorbabuna

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local cu API keys

# Setup database
pnpm prisma generate
pnpm prisma db push
pnpm prisma db seed

# Start development server
pnpm dev
```

Vizitează [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

Crează `.env.local` cu următoarele:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vorbabuna"

# OpenAI
OPENAI_API_KEY="sk-..."

# Google Cloud (pentru TTS)
GOOGLE_CREDENTIALS='{"type":"service_account","project_id":"..."}'

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 📚 Structura Proiectului

```
vorbabuna/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── proverbs/     # Proverbs endpoints
│   │   │   ├── tts/          # Text-to-speech
│   │   │   └── generate-image/ # AI image generation
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ProverbGallery.tsx
│   │   ├── ProverbCard.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── lib/                  # Utility libraries
│   │   ├── db.ts             # Prisma client
│   │   ├── proverbs.ts       # Proverb utilities
│   │   ├── tts.ts            # Text-to-speech
│   │   └── ai/
│   │       └── image-generation.ts
│   └── types/                # TypeScript types
│       └── proverb.ts
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 📝 API Endpoints

### GET `/api/proverbs`
Obține lista de proverbe cu paginație și căutare.

**Query params:**
- `page` - Numărul paginii (default: 1)
- `limit` - Rezultate per pagină (default: 20)
- `q` - Query de căutare (opțional)

### POST `/api/tts`
Generează audio pentru un text dat.

**Body:**
```json
{
  "text": "Proverb românesc"
}
```

### POST `/api/generate-image`
Generează imagine AI pentru un proverb.

**Body:**
```json
{
  "proverb": "Textul proverbului"
}
```

## 🛡️ Development

```bash
# Development mode with hot reload
pnpm dev

# Type checking
pnpm type-check

# Linting
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start

# Database migrations
pnpm prisma migrate dev
pnpm prisma studio  # Database GUI
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gzeu/vorbabuna)

1. Connect repository to Vercel
2. Add environment variables
3. Deploy!

### Docker

```bash
# Build image
docker build -t vorbabuna .

# Run container
docker run -p 3000:3000 --env-file .env.local vorbabuna
```

## 📊 Roadmap

- [ ] User authentication & profiles
- [ ] Advanced search filters (categorie, regiune, popularitate)
- [ ] Daily proverb notifications
- [ ] Community contributions
- [ ] Mobile app (React Native)
- [ ] API public documentation
- [ ] Multilingual support
- [ ] Gamification & badges

## 🤝 Contributing

Contribuțiile sunt binevenite! Vezi [CONTRIBUTING.md](CONTRIBUTING.md) pentru detalii.

1. Fork proiectul
2. Crează branch pentru feature (`git checkout -b feature/AmazingFeature`)
3. Commit schimbările (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Deschide Pull Request

## 📝 License

Acest proiect este licențiat sub MIT License - vezi [LICENSE](LICENSE) pentru detalii.

## 👤 Author

**George** - [@Gzeu](https://github.com/Gzeu)

## 🙏 Mulțumiri

- Proverbe colectate din surse autentice de folclor românesc
- OpenAI pentru DALL-E 3 și GPT-4
- Google Cloud pentru Text-to-Speech
- Comunitatea open-source

---

<p align="center">
  Made with ❤️ in Romania 🇷🇴
</p>
