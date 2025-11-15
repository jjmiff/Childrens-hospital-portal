// LoadingSkeleton.jsx
// Purpose: Reusable loading skeleton components for better UX
// Shows placeholder content while data loads

export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-xl p-4 sm:p-5 border-2 border-gray-200">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-xl p-4 border-2 border-gray-200">
      <div className="w-8 h-8 bg-gray-200 rounded mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-12 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-20"></div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="animate-pulse">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: rows }).map((_, rowIdx) =>
          Array.from({ length: cols }).map((_, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              className="h-10 bg-gray-200 rounded"
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

const LoadingSkeleton = {
  CardSkeleton,
  ListSkeleton,
  StatCardSkeleton,
  ProfileSkeleton,
  TableSkeleton,
};

export default LoadingSkeleton;
