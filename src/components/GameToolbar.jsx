import { useNavigate } from "react-router-dom";
import { sfx } from "../utils/sfx";

export default function GameToolbar({
  onRestart,
  className = "mb-6",
  confirmMessage = "Restart the game? Your current progress will be lost.",
}) {
  const navigate = useNavigate();

  const withClick = (fn) => () => {
    try {
      sfx.play("click");
    } catch {}
    if (typeof fn === "function") fn();
  };

  const handleRestart = () => {
    try {
      sfx.play("click");
    } catch {}
    const ok = window.confirm(confirmMessage);
    if (!ok) return;
    if (typeof onRestart === "function") onRestart();
  };

  return (
    <div
      className={`flex flex-wrap justify-center gap-2 ${className}`}
      role="toolbar"
      aria-label="Game controls"
    >
      {onRestart && (
        <button
          onClick={handleRestart}
          className="btn btn-primary text-sm md:text-base px-3 md:px-4 py-2 md:py-2"
          aria-label="Restart game"
        >
          🔄 Restart
        </button>
      )}
      <button
        onClick={withClick(() => navigate("/games"))}
        className="btn btn-secondary text-sm md:text-base px-3 md:px-4 py-2 md:py-2"
        aria-label="Go to games page"
      >
        🎮 Games
      </button>
      <button
        onClick={withClick(() => navigate("/"))}
        className="btn bg-sky-200 text-gray-800 hover:bg-sky-300 text-sm md:text-base px-3 md:px-4 py-2 md:py-2"
        aria-label="Go to home page"
      >
        🏠 Home
      </button>
    </div>
  );
}
