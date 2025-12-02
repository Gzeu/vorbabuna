'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Share2, Heart, Volume2, Sparkles } from 'lucide-react';

interface Proverb {
  id: number;
  text: string;
  meaning: string;
  category: string;
  region?: string;
  imageUrl: string;
}

interface ProverbCardEnhancedProps {
  proverb: Proverb;
}

export default function ProverbCardEnhanced({ proverb }: ProverbCardEnhancedProps) {
  const [loved, setLoved] = useState(false);
  
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: proverb.text,
        text: `${proverb.text} - ${proverb.meaning}`,
        url: window.location.href,
      });
    }
  };
  
  const handleAudio = () => {
    const utterance = new SpeechSynthesisUtterance(proverb.text);
    utterance.lang = 'ro-RO';
    speechSynthesis.speak(utterance);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Imagine cu overlay gradient */}
      <div className="relative h-96 rounded-t-3xl overflow-hidden group">
        <Image
          src={proverb.imageUrl}
          alt={proverb.text}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Badge categorie */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-folk-gold/90 backdrop-blur-sm rounded-full 
            text-sm font-semibold text-white shadow-lg flex items-center gap-2">
            <Sparkles size={16} />
            {proverb.category}
          </span>
        </div>
        
        {/* Actions overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => setLoved(!loved)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-folk-red 
              hover:text-white transition-colors shadow-lg"
            aria-label="Favorite"
          >
            <Heart size={20} fill={loved ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={handleAudio}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full 
              hover:bg-folk-blue hover:text-white transition-colors shadow-lg"
            aria-label="Play audio"
          >
            <Volume2 size={20} />
          </button>
          <button 
            onClick={handleShare}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full 
              hover:bg-folk-yellow hover:text-folk-brown transition-colors shadow-lg"
            aria-label="Share"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Conținut proverb */}
      <div className="bg-white rounded-b-3xl p-8 shadow-2xl -mt-8 relative z-10">
        {/* Ghilimele decorative */}
        <div className="text-folk-gold text-6xl font-serif absolute -top-4 left-4">&quot;</div>
        
        <blockquote className="text-3xl font-serif text-folk-brown leading-relaxed mt-4 mb-6">
          {proverb.text}
        </blockquote>
        
        {/* Separator decorativ */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-folk-red to-transparent" />
          <svg className="w-6 h-6 text-folk-red" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 9L22 9L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9L9 9Z"/>
          </svg>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-folk-red to-transparent" />
        </div>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          <span className="font-semibold text-folk-red">Înțeles:</span> {proverb.meaning}
        </p>
        
        {proverb.region && (
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z"/>
            </svg>
            Regiune: <span className="font-medium text-folk-brown">{proverb.region}</span>
          </div>
        )}
      </div>
    </div>
  );
}
