// src/components/ConfettiLayer.jsx
// Full-screen confetti canvas with a .burst() API.
// Now accepts onReady() so parent knows exactly when it can call burst().

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import confetti from "canvas-confetti";

const ConfettiLayer = forwardRef(function ConfettiLayer(props, ref) {
  const { onReady } = props;            // NEW: parent callback
  const canvasRef = useRef(null);
  const confettiRef = useRef(null);
  const createdRef = useRef(false);     // guard against StrictMode double run

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || createdRef.current) return;

    const instance = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    confettiRef.current = instance;
    createdRef.current  = true;

    // Tell parent we're ready (safe to call burst() now)
    if (typeof onReady === "function") onReady();

    // Optional console helper
    window.__confettiBurst  = () => burst();
    window.__confettiHearts = () => hearts();

    return () => {
      try { instance.reset(); } catch {}
      confettiRef.current = null;
      createdRef.current  = false;
      delete window.__confettiBurst;
      delete window.__confettiHearts;
    };
  }, [onReady]);

  function burst() {
    const c = confettiRef.current;
    if (!c) return;
    c({ particleCount: 90, spread: 70, startVelocity: 38, decay: 0.9, ticks: 200, origin: { x: 0.2, y: 0.2 }, scalar: 1.0 });
    setTimeout(() => {
      c({ particleCount: 90, spread: 70, startVelocity: 38, decay: 0.9, ticks: 200, origin: { x: 0.8, y: 0.2 }, scalar: 1.0 });
    }, 180);
  }

  function hearts() {
    const c = confettiRef.current;
    if (!c) return;
    c({ particleCount: 60, spread: 50, origin: { y: 0.6 }, scalar: 0.9, colors: ["#FF6B9A", "#FFC1D9", "#FFE4EC"] });
  }

  useImperativeHandle(ref, () => ({ burst, hearts }));

  return (
    <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
  );
});

export default ConfettiLayer;
