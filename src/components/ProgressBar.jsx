// ProgressBar.jsx
// Purpose: Show quiz progress with a growing gradient bar.
// Accessibility: Adds a clear ARIA label and ensures proper role semantics.

export default function ProgressBar({ current, total }) {
  // Calculate the percentage of completion
  const pct = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={`Question ${current + 1} of ${total}`}
      className="progress-track"
    >
      <div
        className="progress-fill"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
