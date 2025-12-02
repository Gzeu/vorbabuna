'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Proverb } from '@/types/proverb';
import { PlayCircle, Heart, Share2 } from 'lucide-react';

interface ProverbCardProps {
  proverb: Proverb;
}

export default function ProverbCard({ proverb }: ProverbCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const playAudio = async () => {
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: proverb.text }),
      });

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error('Failed to play audio:', error);
      setIsPlaying(false);
    }
  };

  const shareProverb = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Proverb Românesc',
        text: proverb.text,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative h-64">
        <Image
          src={proverb.imageUrl || '/placeholder-proverb.jpg'}
          alt={proverb.text}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="p-6">
        <p className="text-lg font-semibold text-gray-900 mb-4 line-clamp-3">
          {proverb.text}
        </p>

        {proverb.meaning && (
          <p className="text-sm text-gray-600 mb-4 italic">
            {proverb.meaning}
          </p>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition disabled:opacity-50"
          >
            <PlayCircle size={20} />
            {isPlaying ? 'Se redă...' : 'Ascultă'}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-full transition ${
                liked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={shareProverb}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
