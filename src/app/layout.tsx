import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'VorbaBună - Proverbe Românești Ilustrate cu AI',
  description: 'Descoperă înțelepciunea populară românească prin 1000+ proverbe autentice, ilustrate cu AI și animate cu voce sintetizată',
  keywords: 'proverbe românești, wisdom, AI, TTS, cultură română, înțelepciune, folclor, proverbe populare',
  authors: [{ name: 'VorbaBună Team', url: 'https://github.com/Gzeu/vorbabuna' }],
  creator: 'George Gîdei',
  publisher: 'VorbaBună',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'VorbaBună - Proverbe Românești Ilustrate cu AI',
    description: 'Descoperă înțelepciunea populară românească prin proverbe ilustrate',
    url: 'https://vorbabuna.vercel.app',
    siteName: 'VorbaBună',
    locale: 'ro_RO',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VorbaBună - Proverbe Românești',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VorbaBună - Proverbe Românești',
    description: 'Descoperă înțelepciunea populară românească',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
