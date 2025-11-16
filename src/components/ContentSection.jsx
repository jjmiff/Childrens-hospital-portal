// ContentSection.jsx
// Purpose: Reusable wrapper for content sections in guidance/explainer pages
// Provides consistent tablet-first responsive padding and spacing

export default function ContentSection({
  children,
  bgColor = "bg-white",
  borderColor = "border-gray-200",
  className = "",
}) {
  return (
    <section
      className={`${bgColor} rounded-2xl border-2 ${borderColor} p-4 sm:p-5 md:p-6 ${className}`}
    >
      {children}
    </section>
  );
}
