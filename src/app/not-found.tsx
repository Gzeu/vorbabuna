import Link from 'next/link';
import FolkButton from '@/components/ui/FolkButton';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 py-32 text-center">
      <div className="max-w-2xl mx-auto">
        {/* 404 with folk pattern */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-display font-bold text-folk-gradient opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-32 h-32 text-folk-red animate-folk-spin" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 9L22 9L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9L9 9Z"/>
            </svg>
          </div>
        </div>

        <h2 className="text-4xl font-display font-bold text-folk-brown mb-4">
          Pagina nu a fost găsită
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Se pare că această pagină s-a pierdut printre proverbe. 
          <br />
          Dar nu-i bai, &quot;Cine caută, găsește!&quot;
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <FolkButton size="lg">
              <Home size={20} className="inline mr-2" />
              Acasă
            </FolkButton>
          </Link>
          <Link href="/search">
            <FolkButton variant="outline" size="lg">
              <Search size={20} className="inline mr-2" />
              Caută Proverbe
            </FolkButton>
          </Link>
        </div>

        {/* Decorative quote */}
        <div className="mt-16 p-6 bg-folk-cream rounded-2xl border-2 border-folk-red/20">
          <blockquote className="text-2xl font-serif text-folk-brown italic">
            &quot;Nu-i frunză fără rouă&quot;
          </blockquote>
          <p className="text-gray-600 mt-2">— Proverb românesc</p>
        </div>
      </div>
    </div>
  );
}
