// src/components/MemoryGame.jsx
import { useState, useEffect, useRef } from "react";
import { getAgeGroup } from "../utils/userUtils";
import { apiFetch } from "../utils/api";
import AchievementToast from "./AchievementToast";
import AnimatedPage from "./AnimatedPage";
import GameToolbar from "./GameToolbar";

const cardImages = ["🍎", "🍌", "🍓", "🍇", "🍉", "🥝", "🍍", "🍑", "🍒", "🍋"];

const shuffleCards = (array) => {
  const newArray = [...array, ...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray.map((card, index) => ({
    id: index,
    content: card,
    isFlipped: false,
    isMatched: false,
  }));
};

export default function MemoryGame() {
  const getPairsForAge = (age) => {
    if (age === "4-8") return 6; // 12 cards
    if (age === "15-18") return 10; // 20 cards
    return 8; // 16 cards default
  };

  const initialAge = getAgeGroup();
  const [pairCount, setPairCount] = useState(getPairsForAge(initialAge));
  const [cards, setCards] = useState(() =>
    shuffleCards(cardImages.slice(0, pairCount))
  );
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space to restart (with confirmation)
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        if (
          window.confirm(
            "Restart Memory Game? Your current progress will be lost."
          )
        ) {
          restartGame();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.content === secondCard.content) {
        // Match found
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.content === firstCard.content
              ? { ...card, isMatched: true, isFlipped: false }
              : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
        setMoves((prev) => prev + 1);
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
          setMoves((prev) => prev + 1);
        }, 1000);
      }
    }
  }, [flippedCards]);

  const handleCardClick = (clickedCard) => {
    // Prevent clicking if: checking a pair, card already flipped, or card already matched
    if (
      isChecking ||
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      flippedCards.length >= 2
    ) {
      return;
    }

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards((prev) => [...prev, clickedCard]);
  };

  const isGameWon = cards.every((card) => card.isMatched);

  // Prevent duplicate score submissions
  const hasSavedRef = useRef(false);

  useEffect(() => {
    if (isGameWon) {
      setIsTimerRunning(false);

      if (!hasSavedRef.current) {
        // Save a simple score for memory: pairs found out of total pairs
        const token = localStorage.getItem("token");
        const totalPairs = cards.length / 2;
        const payload = {
          score: totalPairs,
          total: totalPairs,
          gameType: "memory",
          moves,
          seconds: timer,
        };

        if (token) {
          apiFetch("/api/scores", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.newAchievements && data.newAchievements.length > 0) {
                setNewAchievements(data.newAchievements);
              }
            })
            .catch(() => {
              // Swallow errors for now; non-blocking save
            });
        }
        hasSavedRef.current = true;
      }
    }
  }, [isGameWon]);

  // Show achievement toasts one at a time
  useEffect(() => {
    if (newAchievements.length > 0 && !currentAchievement) {
      // Show first achievement after game completes
      const timer = setTimeout(() => {
        setCurrentAchievement(newAchievements[0]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [newAchievements, currentAchievement]);

  const handleCloseAchievement = () => {
    const currentIndex = newAchievements.indexOf(currentAchievement);
    if (currentIndex < newAchievements.length - 1) {
      // Show next achievement
      setTimeout(() => {
        setCurrentAchievement(newAchievements[currentIndex + 1]);
      }, 500);
    } else {
      // Finished the queue; clear to prevent re-triggering the first toast
      setCurrentAchievement(null);
      setNewAchievements([]);
    }
  };

  const restartGame = () => {
    hasSavedRef.current = false;
    setNewAchievements([]);
    setCurrentAchievement(null);
    const age = getAgeGroup();
    const pairs = getPairsForAge(age);
    setPairCount(pairs);
    setCards(shuffleCards(cardImages.slice(0, pairs)));
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setIsTimerRunning(false);
  };

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                🎴 Memory Game
              </h2>
              <GameToolbar
                onRestart={restartGame}
                className="mb-4"
                confirmMessage="Restart Memory Game? Your current progress will be lost."
              />
              {pairCount === 6 && (
                <p className="text-gray-700 mb-2">Level: Easy (12 cards)</p>
              )}
              {pairCount === 8 && (
                <p className="text-gray-700 mb-2">Level: Medium (16 cards)</p>
              )}
              {pairCount === 10 && (
                <p className="text-gray-700 mb-2">Level: Hard (20 cards)</p>
              )}
              <div
                className="grid gap-4 max-w-md mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${
                    pairCount === 10 ? 5 : 4
                  }, minmax(0, 1fr))`,
                }}
              >
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`card-container base-memory-card md:w-20 md:h-20 w-16 h-16 ${
                      card.isFlipped || card.isMatched ? "flipped" : ""
                    }`}
                    onClick={() => handleCardClick(card)}
                  >
                    <div className="card-inner">
                      <div className="card-front">
                        <span className="text-4xl">{card.content}</span>
                      </div>
                      <div className="card-back"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p>Moves: {moves}</p>
                <p>Time: {timer}s</p>
                {isGameWon && (
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-green-500">
                      You won!
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center mt-4">
                      <button onClick={restartGame} className="btn btn-primary">
                        🔄 Play Again
                      </button>
                      <a href="/games" className="btn btn-secondary">
                        🎮 Back to Games
                      </a>
                      <a
                        href="/"
                        className="btn bg-sky-200 text-gray-800 hover:bg-sky-300"
                      >
                        🏠 Home
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Achievement Toast */}
              {currentAchievement && (
                <AchievementToast
                  achievement={currentAchievement}
                  onClose={handleCloseAchievement}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
