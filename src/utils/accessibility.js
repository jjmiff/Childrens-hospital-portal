// Focus management and keyboard navigation utilities
// Purpose: Improve accessibility with better keyboard navigation

export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  element.addEventListener("keydown", handleTabKey);

  return () => {
    element.removeEventListener("keydown", handleTabKey);
  };
}

export function handleEscapeKey(callback) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      callback();
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}

export function handleEnterKey(callback) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      callback(e);
    }
  };

  return handleKeyDown;
}

export function announceToScreenReader(message, politeness = "polite") {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", politeness);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
