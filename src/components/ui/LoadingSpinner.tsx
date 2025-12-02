'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative w-20 h-20">
        <svg 
          className="animate-folk-spin text-folk-red" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 2L15 9L22 9L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9L9 9Z"/>
        </svg>
        <div className="absolute inset-0 blur-xl bg-folk-gold/30 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
