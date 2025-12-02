'use client';
import { useState, useEffect } from 'react';
import ProverbCardEnhanced from '@/components/ProverbCardEnhanced';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PatternDivider from '@/components/ui/PatternDivider';
import FolkButton from '@/components/ui/FolkButton';
import { Sparkles, BookOpen, Users, Zap } from 'lucide-react';
import Link from 'next/link';

interface Proverb {
  id: number;
  text: string;
  meaning: string;
  category: string;
  region?: string;
  imageUrl: string;
}

export default function Home() {
  const [proverb, setProverb] = useState<Proverb | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomProverb = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/proverb');
      const data = await res.json();
      setProverb(data);
    } catch (error) {
      console.error('Failed to fetch proverb:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomProverb();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-folk-gold/10 rounded-full mb-6">
            <Sparkles className="text-folk-gold" size={20} />
            <span className="text-folk-brown font-medium">Înțelepciune Românească</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-folk-gradient mb-6">
            VorbaBună
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Descoperă înțelepciunea strămoșească românească prin peste 
            <span className="font-bold text-folk-red"> 1000+ proverbe autentice</span>, 
            ilustrate cu AI și animate cu voce sintetizată
          </p>

          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-folk-red">1000+</div>
              <div className="text-sm text-gray-600">Proverbe</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-folk-gold">12</div>
              <div className="text-sm text-gray-600">Categorii</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-folk-blue">5</div>
              <div className="text-sm text-gray-600">Regiuni</div>
            </div>
          </div>
        </div>
      </section>

      <PatternDivider />

      {/* Proverb of the Day */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-folk-brown mb-4">
            Proverbul Zilei
          </h2>
          <p className="text-gray-600">Descoperă o nouă pildă de înțelepciune românească</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : proverb ? (
          <div className="animate-fade-in">
            <ProverbCardEnhanced proverb={proverb} />
            <div className="text-center mt-8">
              <FolkButton onClick={fetchRandomProverb} size="lg">
                <Zap size={20} className="inline mr-2" />
                Proverb Nou
              </FolkButton>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Nu s-au găsit proverbe</div>
        )}
      </section>

      <PatternDivider />

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-folk-brown mb-4">
            Caracteristici
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-8 bg-white rounded-2xl shadow-folk hover:shadow-glow transition-shadow">
            <div className="w-16 h-16 bg-gradient-folk rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-folk-brown mb-3">1000+ Proverbe</h3>
            <p className="text-gray-600">
              Colecție vastă de proverbe autentice din toate regiunile României
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-folk hover:shadow-glow transition-shadow">
            <div className="w-16 h-16 bg-gradient-folk rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-folk-brown mb-3">Ilustrații AI</h3>
            <p className="text-gray-600">
              Fiecare proverb vine cu imagini unice generate de inteligență artificială
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-folk hover:shadow-glow transition-shadow">
            <div className="w-16 h-16 bg-gradient-folk rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-folk-brown mb-3">Comunitate</h3>
            <p className="text-gray-600">
              Contribuie cu propriile proverbe și ajută la păstrarea tradițiilor
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/quiz">
            <FolkButton size="lg">
              <Sparkles size={20} className="inline mr-2" />
              Încearcă Quiz-ul
            </FolkButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
