'use client';
import Link from 'next/link';
import { Heart, Github, Mail, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-folk-brown to-folk-red text-white mt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Decorative top border */}
        <div className="h-1 bg-gradient-to-r from-transparent via-folk-yellow to-transparent mb-12" />
        
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-folk-gold rounded-full flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <span className="text-2xl font-display font-bold">VorbaBună</span>
            </div>
            <p className="text-folk-cream/80 leading-relaxed mb-4">
              Înțelepciunea strămoșească într-o formă modernă. 
              Descoperă peste 1000+ proverbe românești ilustrate cu AI.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/Gzeu/vorbabuna" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:contact@vorbabuna.ro"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Links rapide */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigare</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-folk-cream/80 hover:text-white transition-colors">Acasă</Link></li>
              <li><Link href="/search" className="text-folk-cream/80 hover:text-white transition-colors">Căutare</Link></li>
              <li><Link href="/quiz" className="text-folk-cream/80 hover:text-white transition-colors">Quiz</Link></li>
              <li><Link href="/contribute" className="text-folk-cream/80 hover:text-white transition-colors">Contribuie</Link></li>
            </ul>
          </div>
          
          {/* Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Informații</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-folk-cream/80 hover:text-white transition-colors">Despre</Link></li>
              <li><Link href="/privacy" className="text-folk-cream/80 hover:text-white transition-colors">Confidențialitate</Link></li>
              <li><Link href="/terms" className="text-folk-cream/80 hover:text-white transition-colors">Termeni</Link></li>
              <li>
                <a 
                  href="https://github.com/Gzeu/vorbabuna/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-folk-cream/80 hover:text-white transition-colors"
                >
                  Contribuie
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-folk-cream/60 text-sm">
            © {currentYear} VorbaBună. Toate drepturile rezervate.
          </p>
          <p className="text-folk-cream/60 text-sm flex items-center gap-2">
            Făcut cu <Heart size={16} className="text-folk-yellow" fill="currentColor" /> în România
          </p>
        </div>
      </div>
      
      {/* Decorative folk pattern */}
      <div className="h-2 bg-repeat-x" style={{
        backgroundImage: 'linear-gradient(90deg, transparent 0%, #FECE00 20%, #FFF8DC 40%, #FECE00 60%, transparent 100%)'
      }} />
    </footer>
  );
}
