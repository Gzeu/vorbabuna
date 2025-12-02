'use client';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Vorbă Bună</h3>
            <p className="text-gray-400">
              Platforma dedicată prezervării și promovării înțelepciunii populare românești
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Link-uri</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-400 transition">Despre proiect</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Contribuie</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Made with ❤️ in Romania</p>
            <p className="text-gray-400 mt-2">© 2024 Vorbă Bună</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
