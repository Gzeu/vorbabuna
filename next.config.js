/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pollinations.ai'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pollinations.ai',
        port: '',
        pathname: '/p/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
