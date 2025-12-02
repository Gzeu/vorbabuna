'use client';
import { useState } from 'react';
import FolkButton from '@/components/ui/FolkButton';
import { Send, CheckCircle } from 'lucide-react';

export default function ContributePage() {
  const [formData, setFormData] = useState({
    text: '',
    meaning: '',
    category: 'filozofie',
    region: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          text: '',
          meaning: '',
          category: 'filozofie',
          region: '',
          email: '',
        });
      }
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-display font-bold text-folk-brown mb-4">
              Mulțumim!
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Proverbul tău a fost trimis și va fi verificat de echipa noastră.
            </p>
            <FolkButton onClick={() => setSubmitted(false)} size="lg">
              Trimite Alt Proverb
            </FolkButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold text-folk-gradient mb-4">
            Contribuie
          </h1>
          <p className="text-xl text-gray-700">
            Ajută-ne să păstrăm tradițiile prin adăugarea de noi proverbe românești
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div>
            <label className="block text-folk-brown font-semibold mb-2">
              Textul Proverbului *
            </label>
            <input
              type="text"
              required
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="Ex: Apa trece, pietrele rămân"
              className="w-full px-4 py-3 rounded-xl border-2 border-folk-red/20 
                focus:border-folk-red focus:outline-none focus:ring-4 focus:ring-folk-red/10"
            />
          </div>

          <div>
            <label className="block text-folk-brown font-semibold mb-2">
              Înțelesul *
            </label>
            <textarea
              required
              value={formData.meaning}
              onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
              placeholder="Explică semnificația proverbului"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-folk-red/20 
                focus:border-folk-red focus:outline-none focus:ring-4 focus:ring-folk-red/10"
            />
          </div>

          <div>
            <label className="block text-folk-brown font-semibold mb-2">
              Categorie *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-folk-red/20 
                focus:border-folk-red focus:outline-none focus:ring-4 focus:ring-folk-red/10"
            >
              <option value="filozofie">Filozofie</option>
              <option value="familie">Familie</option>
              <option value="muncă">Muncă</option>
              <option value="natură">Natură</option>
              <option value="prietenie">Prietenie</option>
              <option value="dragoste">Dragoste</option>
            </select>
          </div>

          <div>
            <label className="block text-folk-brown font-semibold mb-2">
              Regiune (opțional)
            </label>
            <input
              type="text"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              placeholder="Ex: Ardeal, Moldova, Muntenia"
              className="w-full px-4 py-3 rounded-xl border-2 border-folk-red/20 
                focus:border-folk-red focus:outline-none focus:ring-4 focus:ring-folk-red/10"
            />
          </div>

          <div>
            <label className="block text-folk-brown font-semibold mb-2">
              Email (opțional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Pentru a fi contactat când proverbul e aprobat"
              className="w-full px-4 py-3 rounded-xl border-2 border-folk-red/20 
                focus:border-folk-red focus:outline-none focus:ring-4 focus:ring-folk-red/10"
            />
          </div>

          <FolkButton type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? (
              'Se trimite...'
            ) : (
              <>
                <Send size={20} className="inline mr-2" />
                Trimite Proverb
              </>
            )}
          </FolkButton>
        </form>
      </div>
    </div>
  );
}
