'use client';

export default function PatternDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-folk-red to-transparent" />
      <svg className="w-8 h-8 text-folk-red" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L15 9L22 9L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9L9 9Z"/>
      </svg>
      <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-folk-red to-transparent" />
    </div>
  );
}
