'use client';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface FolkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function FolkButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: FolkButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-folk-red to-folk-gold text-white hover:shadow-glow',
    secondary: 'bg-folk-cream text-folk-brown hover:bg-folk-yellow/20',
    outline: 'border-2 border-folk-red text-folk-red hover:bg-folk-red hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-5 text-lg',
  };

  return (
    <button
      className={`font-semibold rounded-full shadow-folk
        hover:scale-105 transition-all duration-300
        border-2 border-white/20 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
