# 🛠️ Setup Guide - VorbaBună

## Local Development

### 1. Prerequisites

```bash
# Check Node.js version (must be >= 18)
node --version

# Check npm version
npm --version
```

### 2. Clone & Install

```bash
git clone https://github.com/Gzeu/vorbabuna.git
cd vorbabuna
npm install
```

### 3. Database Setup

#### Option A: SQLite (Development)

```bash
# Create .env.local
echo 'DATABASE_URL="file:./dev.db"' > .env.local

# Push schema
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed database
npm run db:seed
```

#### Option B: PostgreSQL (Production-like)

```bash
# Install PostgreSQL locally or use cloud service
# Create database: vorbabuna

# Update .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/vorbabuna?schema=public"

# Run migrations
npx prisma migrate dev --name init

# Seed database
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Deployment

### Vercel Deployment

#### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `Gzeu/vorbabuna`
4. Configure project:
   - Framework: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### 3. Environment Variables

Add in Vercel Dashboard:

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=https://vorbabuna.vercel.app
```

#### 4. Database Setup (Production)

**Option 1: Vercel Postgres**

```bash
# In Vercel Dashboard
# Storage > Create Database > Postgres
# Copy DATABASE_URL to environment variables
```

**Option 2: Supabase**

1. Create project at [supabase.com](https://supabase.com)
2. Get connection string from Settings > Database
3. Add to Vercel environment variables

**Option 3: Railway**

1. Create project at [railway.app](https://railway.app)
2. Add PostgreSQL service
3. Copy DATABASE_URL

#### 5. Run Migrations

```bash
# In Vercel CLI or GitHub Actions
npx prisma migrate deploy
```

#### 6. Seed Production Database

```bash
# Option 1: Via Vercel CLI
vercel env pull .env.production
npx tsx scripts/seed-proverbs.ts

# Option 2: Via API endpoint (create admin endpoint)
POST /api/admin/seed
```

### Custom Domain

1. Go to Vercel Dashboard > Domains
2. Add custom domain: `vorbabuna.ro`
3. Configure DNS records
4. Update `NEXT_PUBLIC_APP_URL`

## Monitoring & Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

## Performance Optimization

### 1. Image Optimization

- Using Next.js Image component
- Lazy loading with priority flags
- Responsive images with srcSet

### 2. Code Splitting

- Dynamic imports for heavy components
- Route-based code splitting (automatic)

### 3. Caching Strategy

```typescript
// API routes with revalidation
export const revalidate = 3600; // 1 hour
```

### 4. Database Optimization

- Indexed fields: category, validated
- Pagination for large queries
- Connection pooling

## Troubleshooting

### Issue: Prisma Client not generated

```bash
npx prisma generate
```

### Issue: Database connection failed

```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
npx prisma db pull
```

### Issue: Build fails on Vercel

1. Check Node.js version in `package.json`
2. Verify all dependencies are in `dependencies` (not `devDependencies`)
3. Run `npm run build` locally

### Issue: Images not loading

- Check Pollinations.ai is accessible
- Verify image URLs in database
- Check Next.js image domains config

## Backup & Maintenance

### Database Backup

```bash
# PostgreSQL
pg_dump -U user vorbabuna > backup.sql

# SQLite
cp dev.db backup-$(date +%Y%m%d).db
```

### Update Dependencies

```bash
npm outdated
npm update
```

## Support

For issues, please create a GitHub issue or contact:
- Email: contact@vorbabuna.ro
- GitHub: [@Gzeu](https://github.com/Gzeu)
