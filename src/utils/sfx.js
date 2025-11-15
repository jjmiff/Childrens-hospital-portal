// Simple sound effects utility with basic caching

const cache = {};

const files = {
  click: "/sfx/click.mp3",
  next: "/sfx/next.mp3",
  correct: "/sfx/correct.mp3",
  wrong: "/sfx/wrong.mp3",
  complete: "/sfx/complete.mp3",
  restart: "/sfx/restart.mp3",
};

export function play(name) {
  try {
    const src = files[name];
    if (!src) return;
    if (!cache[name]) {
      cache[name] = new Audio(src);
    }
    const audio = cache[name].cloneNode();
    audio.volume = 0.6;
    audio.play().catch(() => {});
  } catch (_) {
    // no-op if playback blocked
  }
}

export const sfx = { play };
