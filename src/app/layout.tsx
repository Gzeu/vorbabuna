import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vorbă Bună - Proverbe Românești',
  description: 'Proverbe românești ilustrate cu AI, text-to-speech și funcții interactive',
  keywords: 'proverbe românești, wisdom, AI, TTS, cultură română',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
