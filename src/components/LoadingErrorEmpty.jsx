// LoadingErrorEmpty.jsx
// Purpose: Reusable wrapper for loading, error, and empty states
import React from "react";

export default function LoadingErrorEmpty({
  loading,
  error,
  empty,
  loadingText = "Loading...",
  errorText = "Something went wrong.",
  emptyText = "No data found.",
  children,
}) {
  if (loading) {
    return (
      <div className="text-center py-6 text-gray-500 animate-pulse">
        <span>{loadingText}</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-6 text-red-600 font-semibold">
        <span>{errorText}</span>
      </div>
    );
  }
  if (empty) {
    return (
      <div className="text-center py-6 text-gray-500">
        <span>{emptyText}</span>
      </div>
    );
  }
  return <>{children}</>;
}
