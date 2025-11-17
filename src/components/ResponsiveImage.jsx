import React from "react";
import manifest from "../assets/images/manifest.json";

/**
 * ResponsiveImage
 *
 * Props:
 * - name: string (base filename without extension)
 * - alt: string (required for accessibility)
 * - sizes: string (optional sizes attribute, defaults to responsive layout)
 * - className: string (optional)
 * - priority: boolean (if true, adds fetchpriority=high to first source)
 */
export default function ResponsiveImage({
  name,
  alt,
  sizes,
  className = "",
  priority = false,
}) {
  const entry = manifest[name];
  if (!entry) {
    // Fallback: render nothing if not found
    return null;
  }

  const defaultSizes =
    sizes || "(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 800px";

  const avifSrcSet = entry.variants
    .map((v) => `${v.avif} ${v.width}w`)
    .join(", ");
  const webpSrcSet = entry.variants
    .map((v) => `${v.webp} ${v.width}w`)
    .join(", ");

  // Choose a mid-size as default src
  const mid =
    entry.variants[Math.min(2, entry.variants.length - 1)] || entry.variants[0];
  const fallback = entry.fallback || (mid ? mid.webp : undefined);

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={avifSrcSet}
        sizes={defaultSizes}
        {...(priority ? { fetchpriority: "high" } : {})}
      />
      <source type="image/webp" srcSet={webpSrcSet} sizes={defaultSizes} />
      <img
        src={fallback}
        alt={alt}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
