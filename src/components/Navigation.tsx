'use client';
import { useState, useEffect } from 'react';
import { Home, Search, Sparkles, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-folk rounded-full flex items-center justify-center
              shadow-folk group-hover:shadow-glow transition-shadow">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-2xl font-display text-folk-gradient font-bold">
              VorbaBună
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">
              <Home size={20} />
              Acasă
            </Link>
            <Link href="/search" className="nav-link">
              <Search size={20} />
              Caută
            </Link>
            <Link href="/quiz" className="nav-link">
              <Sparkles size={20} />
              Quiz
            </Link>
            <Link href="/contribute" className="btn-folk">
              Contribuie
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link href="/" className="block py-2 text-lg">Acasă</Link>
            <Link href="/search" className="block py-2 text-lg">Caută</Link>
            <Link href="/quiz" className="block py-2 text-lg">Quiz</Link>
            <Link href="/contribute" className="btn-folk w-full block text-center">
              Contribuie
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
