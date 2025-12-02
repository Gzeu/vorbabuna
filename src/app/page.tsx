import ProverbGallery from '@/components/ProverbGallery';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🇷🇴 Proverbe Românești
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descoperă înțelepciunea populară românească prin 1000+ proverbe autentice,
            ilustrate cu AI și animate cu voce sintetizată
          </p>
        </div>
        <ProverbGallery />
      </div>
      <Footer />
    </main>
  );
}
