'use client';

export function ProverbCardSkeleton() {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-96 rounded-t-3xl overflow-hidden bg-gray-200" />
      
      {/* Content skeleton */}
      <div className="bg-white rounded-b-3xl p-8 shadow-2xl -mt-8 relative z-10">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6" />
        <div className="h-4 bg-gray-200 rounded w-full mb-3" />
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6" />
        
        {/* Separator */}
        <div className="h-px bg-gray-200 my-6" />
        
        <div className="h-6 bg-gray-200 rounded w-full mb-2" />
        <div className="h-6 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  );
}

export function SearchResultSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-folk">
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-64" />
        </div>
      ))}
    </div>
  );
}
