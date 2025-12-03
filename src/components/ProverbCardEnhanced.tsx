'use client';
import { useState } from 'react';
import { Share2, Heart, Volume2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SuspenseImage from './ui/SuspenseImage';
import ActionButton from './ui/ActionButton';
import ImageErrorBoundary from './ui/ImageErrorBoundary';
import styles from './ProverbCardEnhanced.module.css';

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
  variant?: 'default' | 'compact' | 'expanded';
  onAction?: (action: string, proverbId: number) => void;
}

const cardVariants = {
  default: 'max-w-2xl',
  compact: 'max-w-xl',
  expanded: 'max-w-4xl',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
    },
  },
};

export default function ProverbCardEnhanced({ proverb, variant = 'default', onAction }: ProverbCardEnhancedProps) {
  const [loved, setLoved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const trackAction = (action: string) => {
    if (onAction) onAction(action, proverb.id);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: 'proverb_interaction',
        event_label: proverb.text,
        value: proverb.id,
      });
    }
  };

  const handleShare = async () => {
    trackAction('share');
    if (navigator.share) {
      try {
        await navigator.share({
          title: proverb.text,
          text: `${proverb.text} - ${proverb.meaning}`,
          url: window.location.href,
        });
      } catch {
        // user cancelled share or not supported
      }
    }
  };

  const handleAudio = () => {
    trackAction('audio_play');
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(proverb.text);
    utterance.lang = 'ro-RO';
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const handleLove = () => {
    const next = !loved;
    setLoved(next);
    trackAction(next ? 'love' : 'unlove');
  };

  return (
    <motion.div
      className={`${styles.cardContainer} ${cardVariants[variant]} mx-auto`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Imagine cu overlay, progressive loading și error boundary */}
      <motion.div className={styles.imageContainer} variants={itemVariants}>
        <ImageErrorBoundary>
          <SuspenseImage
            src={
              proverb.imageUrl ||
              'https://images.unsplash.com/photo-1507842217343-583f20270fe0?w=800&q=80'
            }
            alt={proverb.text}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
          />
        </ImageErrorBoundary>
        <div className={styles.imageOverlay} />

        {/* Badge categorie */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <span className="px-4 py-2 bg-folk-gold/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white shadow-lg flex items-center gap-2">
            <Sparkles size={16} aria-hidden="true" />
            <span>{proverb.category}</span>
          </span>
        </motion.div>

        {/* Actions overlay cu stagger */}
        <motion.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          aria-label="Acțiuni proverb"
        >
          <ActionButton
            icon={Heart}
            label={loved ? 'Elimină din favorite' : 'Adaugă la favorite'}
            variant="love"
            isActive={loved}
            iconFill
            onClick={handleLove}
          />
          <ActionButton
            icon={Volume2}
            label="Redă audio proverb"
            variant="audio"
            isActive={isPlaying}
            onClick={handleAudio}
          />
          <ActionButton
            icon={Share2}
            label="Distribuie proverb"
            variant="share"
            onClick={handleShare}
          />
        </motion.div>
      </motion.div>

      {/* Conținut proverb cu staggered animation */}
      <motion.div className={styles.contentCard} variants={itemVariants}>
        <div className={styles.quoteMark} aria-hidden="true">
          &quot;
        </div>

        <motion.blockquote
          className={styles.proverbText}
          variants={itemVariants}
          aria-label="Text proverb"
        >
          {proverb.text}
        </motion.blockquote>

        <motion.div className={styles.separatorContainer} variants={itemVariants} aria-hidden="true">
          <div className={styles.separatorLine} />
          <svg className="w-6 h-6 text-folk-red" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 9L22 9L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9L9 9Z" />
          </svg>
          <div className={styles.separatorLine} />
        </motion.div>

        <motion.p className={styles.meaningText} variants={itemVariants}>
          <span className={styles.meaningLabel}>Înțeles:</span> {proverb.meaning}
        </motion.p>

        {proverb.region && (
          <motion.div className={styles.regionInfo} variants={itemVariants}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z"
              />
            </svg>
            <span>Regiune: </span>
            <span className={styles.regionName}>{proverb.region}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
