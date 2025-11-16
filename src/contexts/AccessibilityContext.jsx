// AccessibilityContext.jsx
// Global accessibility preferences: high contrast, text size, reduced motion

import { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider"
    );
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem("a11y-highContrast");
    return saved === "true";
  });

  const [textSize, setTextSize] = useState(() => {
    const saved = localStorage.getItem("a11y-textSize");
    return saved || "normal"; // "small" | "normal" | "large" | "xlarge"
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem("a11y-reducedMotion");
    if (saved) return saved === "true";
    // Default to system preference
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Sync high contrast to DOM
  useEffect(() => {
    localStorage.setItem("a11y-highContrast", highContrast.toString());
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  // Sync text size to DOM
  useEffect(() => {
    localStorage.setItem("a11y-textSize", textSize);
    document.documentElement.setAttribute("data-text-size", textSize);
  }, [textSize]);

  // Sync reduced motion to DOM
  useEffect(() => {
    localStorage.setItem("a11y-reducedMotion", reducedMotion.toString());
    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reducedMotion]);

  const value = {
    highContrast,
    setHighContrast,
    textSize,
    setTextSize,
    reducedMotion,
    setReducedMotion,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
