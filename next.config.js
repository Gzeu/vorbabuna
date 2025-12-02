/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'oaidalleapiprodscus.blob.core.windows.net',
      'images.unsplash.com',
      'cdn.pixabay.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
