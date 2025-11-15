import { useEffect, useState } from "react";

// Lightweight global toast system using window events
// Usage: import { showToast } from "../components/Toast"; showToast("Saved!", "success");

export function showToast(message, variant = "info", timeout = 3000) {
  if (typeof window === "undefined") return;
  const id = Math.random().toString(36).slice(2);
  const event = new CustomEvent("toast:add", {
    detail: { id, message, variant, timeout },
  });
  window.dispatchEvent(event);
}

export default function ToastContainer() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const onAdd = (e) => {
      const { id, message, variant, timeout } = e.detail;
      setItems((prev) => [...prev, { id, message, variant }]);
      if (timeout > 0) {
        setTimeout(() => {
          setItems((prev) => prev.filter((t) => t.id !== id));
        }, timeout);
      }
    };
    const onClear = () => setItems([]);
    window.addEventListener("toast:add", onAdd);
    window.addEventListener("toast:clear", onClear);
    return () => {
      window.removeEventListener("toast:add", onAdd);
      window.removeEventListener("toast:clear", onClear);
    };
  }, []);

  const getClasses = (variant) => {
    switch (variant) {
      case "success":
        return "bg-green-100 border-green-300 text-green-900";
      case "error":
        return "bg-red-100 border-red-300 text-red-800";
      case "warning":
        return "bg-yellow-100 border-yellow-300 text-yellow-900";
      default:
        return "bg-blue-100 border-blue-300 text-blue-900";
    }
  };

  return (
    <div
      className="fixed top-4 right-4 z-[1000] space-y-3"
      aria-live="polite"
      aria-atomic="true"
    >
      {items.map((t) => (
        <div
          key={t.id}
          className={`rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm ${getClasses(
            t.variant
          )}`}
          role="alert"
          aria-live={t.variant === "error" ? "assertive" : "polite"}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
