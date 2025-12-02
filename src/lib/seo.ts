/**
 * SEO utilities for dynamic pages
 */

import { Metadata } from 'next';

interface ProverbMetadata {
  text: string;
  meaning: string;
  category: string;
  id: number;
}

export function generateProverbMetadata(proverb: ProverbMetadata): Metadata {
  const title = `${proverb.text} - VorbaBună`;
  const description = `${proverb.meaning} | Proverb românesc din categoria ${proverb.category}`;
  const url = `https://vorbabuna.vercel.app/proverb/${proverb.id}`;

  return {
    title,
    description,
    keywords: `proverb, românesc, ${proverb.category}, înțelepciune, ${proverb.text}`,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: proverb.text,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateStructuredData(proverb: ProverbMetadata) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: proverb.text,
    description: proverb.meaning,
    author: {
      '@type': 'Organization',
      name: 'VorbaBună',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VorbaBună',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vorbabuna.vercel.app/logo.svg',
      },
    },
    inLanguage: 'ro-RO',
    about: {
      '@type': 'Thing',
      name: 'Proverbe Românești',
    },
  };
}
