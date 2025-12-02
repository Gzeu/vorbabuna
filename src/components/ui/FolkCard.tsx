'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FolkCardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'featured';
  className?: string;
}

export default function FolkCard({ children, variant = 'default', className = '' }: FolkCardProps) {
  const variants = {
    default: 'bg-white border-2 border-folk-red/20',
    elevated: 'bg-gradient-to-br from-folk-cream to-white shadow-folk',
    featured: 'bg-folk-red text-white shadow-glow',
  };

  return (
    <motion.div
      className={`rounded-2xl p-6 backdrop-blur-sm ${variants[variant]} 
        hover:scale-[1.02] transition-all duration-300 relative overflow-hidden ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Motiv decorativ colț */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="fill-current">
          <path d="M0,0 L100,0 L100,100 Q50,50 0,100 Z" />
        </svg>
      </div>
      {children}
    </motion.div>
  );
}
