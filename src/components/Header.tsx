'use client';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🇷🇴</span>
          <h1 className="text-2xl font-bold text-gray-900">Vorbă Bună</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-600 hover:text-orange-600 transition">
            Acasă
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-600 transition">
            Despre
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-600 transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
