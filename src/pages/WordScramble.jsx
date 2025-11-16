// WordScramble.jsx
// Purpose: Unscramble words educational game

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAgeGroup } from "../utils/userUtils";
import { apiFetch } from "../utils/api";
import AchievementToast from "../components/AchievementToast";
import AnimatedPage from "../components/AnimatedPage";
import GameToolbar from "../components/GameToolbar";
import { sfx } from "../utils/sfx";

// Scramble a word randomly
const scrambleWord = (word) => {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const scrambled = letters.join("");
  // Ensure scrambled is different from original
  return scrambled === word && word.length > 1 ? scrambleWord(word) : scrambled;
};

// Word pools by difficulty (expanded lists)
const wordPoolByAge = {
  "4-8": [
    { word: "CAT", hint: "A furry pet that meows" },
    { word: "DOG", hint: "A furry pet that barks" },
    { word: "SUN", hint: "Bright in the sky" },
    { word: "TREE", hint: "Has leaves and branches" },
    { word: "BOOK", hint: "You read this" },
    { word: "STAR", hint: "Twinkles at night" },
    { word: "FISH", hint: "Swims in water" },
    { word: "BALL", hint: "Round toy to play with" },
    { word: "MOON", hint: "Shines at night" },
    { word: "BIRD", hint: "Has wings and flies" },
    { word: "DUCK", hint: "Bird that quacks" },
    { word: "FROG", hint: "Hops and says ribbit" },
    { word: "RAIN", hint: "Water from clouds" },
    { word: "SNOW", hint: "White and cold" },
    { word: "CAKE", hint: "Sweet treat for birthdays" },
    { word: "DOOR", hint: "You open and close this" },
    { word: "HAND", hint: "Part of your arm" },
    { word: "NOSE", hint: "You smell with this" },
    { word: "BATH", hint: "Get clean in this" },
    { word: "TENT", hint: "Sleep in this when camping" },
  ],
  "9-14": [
    { word: "PLANET", hint: "Earth is one" },
    { word: "OCEAN", hint: "Large body of water" },
    { word: "FOREST", hint: "Many trees together" },
    { word: "SCHOOL", hint: "Place to learn" },
    { word: "MUSIC", hint: "Songs and melodies" },
    { word: "SPORTS", hint: "Games like soccer" },
    { word: "PUZZLE", hint: "Game to solve" },
    { word: "ROCKET", hint: "Flies to space" },
    { word: "CASTLE", hint: "Where kings live" },
    { word: "GARDEN", hint: "Grow flowers here" },
    { word: "ANIMAL", hint: "Living creature" },
    { word: "BRIDGE", hint: "Crosses over water" },
    { word: "CAMERA", hint: "Takes pictures" },
    { word: "DOCTOR", hint: "Helps sick people" },
    { word: "ENERGY", hint: "Power to do things" },
    { word: "FRIEND", hint: "Someone you like" },
    { word: "ISLAND", hint: "Land surrounded by water" },
    { word: "MARKET", hint: "Place to buy things" },
    { word: "NATURE", hint: "Trees, animals, outdoors" },
    { word: "WINTER", hint: "Cold season" },
  ],
  "15-18": [
    { word: "ADVENTURE", hint: "Exciting journey" },
    { word: "CHALLENGE", hint: "Difficult task" },
    { word: "DISCOVERY", hint: "Finding something new" },
    { word: "EDUCATION", hint: "Process of learning" },
    { word: "CREATIVE", hint: "Imaginative and artistic" },
    { word: "SCIENCE", hint: "Study of nature" },
    { word: "HISTORY", hint: "Study of the past" },
    { word: "LANGUAGE", hint: "Way to communicate" },
    { word: "TECHNOLOGY", hint: "Computers and devices" },
    { word: "HOSPITAL", hint: "Where doctors work" },
    { word: "CHEMISTRY", hint: "Study of substances" },
    { word: "BIOLOGY", hint: "Study of living things" },
    { word: "LITERATURE", hint: "Books and writing" },
    { word: "MATHEMATICS", hint: "Study of numbers" },
    { word: "PHILOSOPHY", hint: "Study of knowledge" },
    { word: "PSYCHOLOGY", hint: "Study of the mind" },
    { word: "GEOGRAPHY", hint: "Study of Earth" },
    { word: "ENVIRONMENT", hint: "Natural surroundings" },
    { word: "ATMOSPHERE", hint: "Air around Earth" },
    { word: "ARCHITECTURE", hint: "Designing buildings" },
    { word: "PHOTOSYNTHESIS", hint: "Plants making food" },
    { word: "NEUROSCIENCE", hint: "Study of the brain" },
    { word: "BIODIVERSITY", hint: "Variety of life" },
    { word: "MICROORGANISM", hint: "Tiny living thing" },
    { word: "THERMODYNAMICS", hint: "Heat and energy" },
    { word: "ELECTROMAGNETIC", hint: "Type of radiation" },
    { word: "INTERDISCIPLINARY", hint: "Combining subjects" },
    { word: "CONSTITUTIONAL", hint: "Related to laws" },
    { word: "TRANSMISSION", hint: "Passing something on" },
    { word: "RESPIRATORY", hint: "Related to breathing" },
  ],
};

export default function WordScramble() {
  const navigate = useNavigate();
  const ageGroup = getAgeGroup();
  const wordPool = wordPoolByAge[ageGroup] || wordPoolByAge["9-14"];

  // Randomly select and scramble words from the pool (older group gets more)
  const [words] = useState(() => {
    const shuffled = [...wordPool].sort(() => Math.random() - 0.5);
    const selectionCount = ageGroup === "15-18" ? 12 : 10;
    return shuffled.slice(0, selectionCount).map((w) => ({
      ...w,
      scrambled: scrambleWord(w.word),
    }));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [saveError, setSaveError] = useState("");

  const currentWord = words[currentIndex];
  const totalWords = words.length;

  useEffect(() => {
    document.title = "Word Scramble — Children's Hospital Portal";
  }, []);

  const checkAnswer = () => {
    if (userAnswer.toUpperCase() === currentWord.word) {
      sfx.play("correct");
      setScore(score + 1);
      setFeedback("✅ Correct!");
      setTimeout(() => {
        if (currentIndex < totalWords - 1) {
          sfx.play("next");
          setCurrentIndex(currentIndex + 1);
          setUserAnswer("");
          setFeedback("");
          setShowHint(false);
        } else {
          completeGame(score + 1);
        }
      }, 1000);
    } else {
      sfx.play("wrong");
      setFeedback("❌ Try again!");
    }
  };

  const completeGame = async (finalScore = score) => {
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
            score: finalScore,
            total: totalWords,
            gameType: "word-scramble",
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

  const skipWord = () => {
    if (currentIndex < totalWords - 1) {
      sfx.play("next");
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setFeedback("");
      setShowHint(false);
    } else {
      completeGame(score);
    }
  };

  const restartGame = () => {
    sfx.play("restart");
    window.location.reload(); // Full reload to get new word selection
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
      // Enter to submit answer (only if not complete and has answer)
      if (!isComplete && userAnswer.trim() && e.key === "Enter") {
        e.preventDefault();
        checkAnswer();
      }
      // Space to restart (with confirmation)
      if (e.code === "Space" && !e.repeat && !e.target.matches("input")) {
        e.preventDefault();
        if (
          window.confirm(
            "Restart Word Scramble? Your current progress will be lost."
          )
        ) {
          restartGame();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isComplete, userAnswer]);

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
          ? `Word Scramble complete! Final score: ${score} out of ${totalWords}.`
          : `Word ${currentIndex + 1} of ${totalWords}. Score: ${score}. ${
              feedback || "Enter your answer."
            }`}
      </div>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
            <h2 className="title mb-4 text-center">📝 Word Scramble</h2>
            <p className="text-gray-700 mb-6 text-center">
              Unscramble the letters to make a word!
            </p>

            {!isComplete && (
              <GameToolbar
                onRestart={restartGame}
                confirmMessage="Restart Word Scramble? Your current progress will be lost."
              />
            )}

            {!isComplete ? (
              <>
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-center gap-6 text-sm text-gray-700 mb-2">
                    <span>
                      Word {currentIndex + 1} of {totalWords}
                    </span>
                    <span>
                      Score: {score}/{totalWords}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-mint-400 h-3 rounded-full transition-all"
                      style={{
                        width: `${((currentIndex + 1) / totalWords) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Scrambled Word */}
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 sm:p-6 md:p-8 mb-6">
                  <p className="text-sm text-gray-700 mb-2">Unscramble this:</p>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 tracking-wide sm:tracking-wider md:tracking-widest break-all">
                    {currentWord.scrambled}
                  </div>
                </div>

                {/* Hint */}
                <div className="mb-6">
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-sm text-blue-700 hover:text-blue-900 underline font-semibold"
                    >
                      💡 Show Hint
                    </button>
                  ) : (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-900">
                        <strong>Hint:</strong> {currentWord.hint}
                      </p>
                    </div>
                  )}
                </div>

                {/* Answer Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                    placeholder="Type your answer..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-mint-400"
                    autoFocus
                  />
                </div>

                {/* Feedback */}
                {feedback && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-center font-semibold ${
                      feedback.includes("✅")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {feedback}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      sfx.play("click");
                      checkAnswer();
                    }}
                    className="btn btn-primary flex-1"
                  >
                    Check Answer
                  </button>
                  <button
                    onClick={() => {
                      sfx.play("click");
                      skipWord();
                    }}
                    className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Skip
                  </button>
                </div>
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
                    Final Score: {score}/{totalWords}
                  </div>
                  {saveError && (
                    <div className="mt-2 text-sm text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2 inline-block">
                      {saveError}
                    </div>
                  )}
                  <div className="text-xl text-gray-700 mb-6">
                    {score === totalWords
                      ? "Perfect! You got them all! 🌟"
                      : score >= totalWords * 0.7
                      ? "Great job! 👏"
                      : "Good effort! Keep practicing! 💪"}
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
