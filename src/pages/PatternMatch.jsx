// PatternMatch.jsx
// Purpose: Pattern recognition and matching game

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAgeGroup } from "../utils/userUtils";
import { apiFetch } from "../utils/api";
import AchievementToast from "../components/AchievementToast";
import AnimatedPage from "../components/AnimatedPage";
import GameToolbar from "../components/GameToolbar";
import { sfx } from "../utils/sfx";

const shapes = [
  "🔴",
  "🔵",
  "🟢",
  "🟡",
  "🟣",
  "🟠",
  "⭐",
  "❤️",
  "🔶",
  "🔷",
  "🟤",
  "⚫",
  "⚪",
  "🔺",
  "🔻",
];

// Generate a pattern based on age with randomized answer positions
const generatePattern = (ageGroup) => {
  let patternLength, optionCount;

  if (ageGroup === "4-8") {
    patternLength = 3;
    optionCount = 4;
  } else if (ageGroup === "9-14") {
    patternLength = 4;
    optionCount = 6;
  } else {
    patternLength = 7; // longer sequence for oldest group
    optionCount = 8;
  }

  // Randomly select shapes for this round
  const shuffled = [...shapes].sort(() => Math.random() - 0.5);
  const availableShapes = shuffled.slice(0, optionCount);

  // Create different pattern types (add more for oldest group)
  const maxTypes = ageGroup === "15-18" ? 7 : 4;
  const patternType = Math.floor(Math.random() * maxTypes);
  let pattern = [];
  let correctAnswer;

  if (patternType === 0) {
    // Repeating pattern: A-B-A-B-A...
    const shapeA = availableShapes[0];
    const shapeB = availableShapes[1];
    for (let i = 0; i < patternLength; i++) {
      pattern.push(i % 2 === 0 ? shapeA : shapeB);
    }
    correctAnswer = patternLength % 2 === 0 ? shapeA : shapeB;
  } else if (patternType === 1) {
    // ABC repeating: A-B-C-A-B-C-A...
    const shapeA = availableShapes[0];
    const shapeB = availableShapes[1];
    const shapeC = availableShapes[2];
    const sequence = [shapeA, shapeB, shapeC];
    for (let i = 0; i < patternLength; i++) {
      pattern.push(sequence[i % 3]);
    }
    correctAnswer = sequence[patternLength % 3];
  } else if (patternType === 2) {
    // Growing pattern: A-A-B-A-A-B-A...
    const shapeA = availableShapes[0];
    const shapeB = availableShapes[1];
    const sequence = [shapeA, shapeA, shapeB];
    for (let i = 0; i < patternLength; i++) {
      pattern.push(sequence[i % 3]);
    }
    correctAnswer = sequence[patternLength % 3];
  } else if (patternType === 3) {
    // Simple repetition: A-A-A-A...
    const shapeA = availableShapes[0];
    for (let i = 0; i < patternLength; i++) {
      pattern.push(shapeA);
    }
    correctAnswer = shapeA;
  } else if (patternType === 4) {
    // Mirror pattern: A-B-C-B-A-? (answer is C if odd length continuation)
    const shapeA = availableShapes[0];
    const shapeB = availableShapes[1];
    const shapeC = availableShapes[2];
    const core = [shapeA, shapeB, shapeC];
    // Build mirrored sequence up to patternLength - 1
    const seq = [...core, shapeB, shapeA];
    pattern = seq.slice(0, patternLength - 1);
    // Determine next: continue mirror cycle
    const mirrorCycle = [...core, shapeB, shapeA];
    correctAnswer = mirrorCycle[(patternLength - 1) % mirrorCycle.length];
  } else if (patternType === 5) {
    // Incremental block: A, A, B, B, C, C, ... answer next block start
    const shapeA = availableShapes[0];
    const shapeB = availableShapes[1];
    const shapeC = availableShapes[2];
    const shapeD = availableShapes[3] || shapeA;
    const seq = [
      shapeA,
      shapeA,
      shapeB,
      shapeB,
      shapeC,
      shapeC,
      shapeD,
      shapeD,
    ];
    pattern = seq.slice(0, patternLength - 1);
    correctAnswer = seq[patternLength - 1];
  } else {
    // Extended cycle ABCD repeating
    const cycle = availableShapes.slice(0, 4);
    for (let i = 0; i < patternLength - 1; i++) {
      pattern.push(cycle[i % cycle.length]);
    }
    correctAnswer = cycle[(patternLength - 1) % cycle.length];
  }

  // Shuffle options so correct answer isn't always in same position
  const shuffledOptions = [...availableShapes].sort(() => Math.random() - 0.5);

  return { pattern, correctAnswer, options: shuffledOptions };
};

export default function PatternMatch() {
  const navigate = useNavigate();
  const ageGroup = getAgeGroup();
  const totalRounds = 8;

  const [currentRound, setCurrentRound] = useState(1);
  const [gameData, setGameData] = useState(() => generatePattern(ageGroup));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showPattern, setShowPattern] = useState(true);
  const [newAchievements, setNewAchievements] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    document.title = "Pattern Match — Children's Hospital Portal";
  }, []);

  // Hide pattern after showing it for a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPattern(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentRound]);

  const handleAnswer = (shape) => {
    setSelectedAnswer(shape);
    const correct = shape === gameData.correctAnswer;

    if (correct) {
      sfx.play("correct");
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      sfx.play("wrong");
      setFeedback(`❌ Not quite! The answer was ${gameData.correctAnswer}`);
    }

    setTimeout(() => {
      if (currentRound < totalRounds) {
        sfx.play("next");
        setCurrentRound(currentRound + 1);
        setGameData(generatePattern(ageGroup));
        setSelectedAnswer(null);
        setFeedback("");
        setShowPattern(true);
      } else {
        completeGame();
      }
    }, 2000);
  };

  const completeGame = async () => {
    setIsComplete(true);
    sfx.play("complete");
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await apiFetch("/api/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            score,
            total: totalRounds,
            gameType: "pattern-match",
          }),
        });
        if (!res.ok) {
          setSaveError("Couldn't save score. Please log in again.");
          return;
        }
        const data = await res.json();
        if (data.newAchievements && data.newAchievements.length > 0) {
          setNewAchievements(data.newAchievements);
        }
      } catch (error) {
        console.error("Error saving score:", error);
        setSaveError("Couldn't save score. Check your connection.");
      }
    } else {
      setSaveError("You're not logged in. Scores won't be saved.");
    }
  };

  const restartGame = () => {
    sfx.play("restart");
    setCurrentRound(1);
    setGameData(generatePattern(ageGroup));
    setSelectedAnswer(null);
    setScore(0);
    setIsComplete(false);
    setFeedback("");
    setShowPattern(true);
    setNewAchievements([]);
    setCurrentAchievement(null);
  };

  // Show achievement toasts
  useEffect(() => {
    if (newAchievements.length > 0 && !currentAchievement) {
      const timer = setTimeout(() => {
        setCurrentAchievement(newAchievements[0]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [newAchievements, currentAchievement]);

  const handleCloseAchievement = () => {
    const currentIdx = newAchievements.indexOf(currentAchievement);
    if (currentIdx < newAchievements.length - 1) {
      setTimeout(() => {
        setCurrentAchievement(newAchievements[currentIdx + 1]);
      }, 500);
    } else {
      // Finished the queue; clear to prevent re-triggering the first toast
      setCurrentAchievement(null);
      setNewAchievements([]);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Number keys to select pattern options (only if pattern hidden and not complete)
      if (
        !isComplete &&
        !showPattern &&
        !selectedAnswer &&
        e.key >= "1" &&
        e.key <= "9"
      ) {
        const optionIndex = parseInt(e.key) - 1;
        if (gameData.options[optionIndex]) {
          e.preventDefault();
          handleAnswer(gameData.options[optionIndex]);
        }
      }
      // Space to restart (with confirmation)
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        if (
          window.confirm(
            "Restart Pattern Match? Your current progress will be lost."
          )
        ) {
          restartGame();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isComplete, showPattern, selectedAnswer, gameData.options]);

  return (
    <AnimatedPage>
      {/* Live region for screen reader announcements */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {isComplete
          ? `Pattern Match complete! Final score: ${score} out of ${totalRounds}.`
          : showPattern
          ? `Round ${currentRound} of ${totalRounds}. Memorizing pattern...`
          : `Round ${currentRound}. Score: ${score}. ${
              feedback || "Select the next shape in the pattern."
            }`}
      </div>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
            <h2 className="title mb-4 text-center">🧩 Pattern Match</h2>
            <p className="text-gray-700 mb-6 text-center">
              {showPattern
                ? "Memorize the pattern!"
                : "Which shape completes the pattern?"}
            </p>

            {!isComplete && (
              <GameToolbar
                onRestart={restartGame}
                confirmMessage="Restart Pattern Match? Your current progress will be lost."
              />
            )}

            {!isComplete ? (
              <>
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-center gap-6 text-sm text-gray-700 mb-2">
                    <span>
                      Round {currentRound} of {totalRounds}
                    </span>
                    <span>
                      Score: {score}/{totalRounds}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-mint-400 h-3 rounded-full transition-all"
                      style={{
                        width: `${(currentRound / totalRounds) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Pattern Display */}
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl p-4 sm:p-6 md:p-8 mb-6">
                  {showPattern ? (
                    <>
                      <p className="text-sm text-indigo-700 mb-4 text-center font-semibold">
                        Memorize this pattern:
                      </p>
                      <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
                        {gameData.pattern.map((shape, idx) => (
                          <div
                            key={idx}
                            className="text-4xl sm:text-5xl md:text-6xl"
                          >
                            {shape}
                          </div>
                        ))}
                        <div className="text-4xl sm:text-5xl md:text-6xl">
                          ❓
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-indigo-700 mb-4 text-center font-semibold">
                        What comes next?
                      </p>
                      <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
                        {gameData.pattern.map((shape, idx) => (
                          <div
                            key={idx}
                            className="text-4xl sm:text-5xl md:text-6xl"
                          >
                            {shape}
                          </div>
                        ))}
                        <div className="text-4xl sm:text-5xl md:text-6xl">
                          {selectedAnswer || "❓"}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Feedback */}
                {feedback && (
                  <div
                    className={`mb-6 p-4 rounded-lg text-center font-semibold text-lg ${
                      feedback.includes("✅")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {feedback}
                  </div>
                )}

                {/* Answer Options */}
                {!showPattern && !selectedAnswer && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {gameData.options.map((shape, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(shape)}
                        className="aspect-square bg-white border-4 border-gray-300 rounded-xl p-4 sm:p-6 text-4xl sm:text-5xl md:text-6xl hover:border-mint-400 hover:bg-mint-50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                )}

                {showPattern && (
                  <div className="text-center text-gray-500 animate-pulse">
                    Pattern showing... Get ready!
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Results */}
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Game Complete!
                  </h3>
                  <div className="text-2xl font-semibold text-gray-700 mb-2">
                    Final Score: {score}/{totalRounds}
                  </div>
                  {saveError && (
                    <div className="mt-2 text-sm text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2 inline-block">
                      {saveError}
                    </div>
                  )}
                  <div className="text-xl text-gray-700 mb-6">
                    {score === totalRounds
                      ? "Perfect memory! 🧠✨"
                      : score >= totalRounds * 0.7
                      ? "Great pattern recognition! 👏"
                      : "Keep practicing! 💪"}
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => {
                        sfx.play("click");
                        restartGame();
                      }}
                      className="btn btn-primary"
                    >
                      🔄 Play Again
                    </button>
                    <button
                      onClick={() => {
                        sfx.play("click");
                        navigate("/games");
                      }}
                      className="btn btn-secondary"
                    >
                      🎮 Back to Games
                    </button>
                    <button
                      onClick={() => {
                        sfx.play("click");
                        navigate("/");
                      }}
                      className="btn bg-sky-200 text-gray-800 hover:bg-sky-300"
                    >
                      🏠 Home
                    </button>
                  </div>
                </div>
              </>
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
    </AnimatedPage>
  );
}
