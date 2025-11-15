// MathChallenge.jsx
// Purpose: Math problems educational game with varied problem types

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAgeGroup } from "../utils/userUtils";
import { apiFetch } from "../utils/api";
import AchievementToast from "../components/AchievementToast";
import { sfx } from "../utils/sfx";

// Generate math problems based on age with more variety
const generateProblem = (ageGroup) => {
  let num1, num2, operation, answer;

  if (ageGroup === "4-8") {
    // Simple addition and subtraction (1-20) with varied ranges
    const problemType = Math.floor(Math.random() * 3);
    operation = Math.random() > 0.5 ? "+" : "-";

    if (problemType === 0) {
      // Small numbers (1-10)
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
    } else if (problemType === 1) {
      // Medium numbers (5-20)
      num1 = Math.floor(Math.random() * 16) + 5;
      num2 = Math.floor(Math.random() * 10) + 1;
    } else {
      // Adding to make 10, 20, etc
      const target = Math.random() > 0.5 ? 10 : 20;
      num1 = Math.floor(Math.random() * (target - 1)) + 1;
      num2 = target - num1;
      operation = "+";
    }

    if (operation === "-" && num1 < num2) {
      [num1, num2] = [num2, num1]; // Ensure positive result
    }
    answer = operation === "+" ? num1 + num2 : num1 - num2;
  } else if (ageGroup === "9-14") {
    // Addition, subtraction, multiplication (varied difficulty)
    const ops = ["+", "-", "×", "+", "×"]; // Weight toward + and ×
    operation = ops[Math.floor(Math.random() * ops.length)];
    const problemType = Math.floor(Math.random() * 3);

    if (operation === "×") {
      if (problemType === 0) {
        // Times tables (1-12)
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
      } else if (problemType === 1) {
        // One digit × two digit
        num1 = Math.floor(Math.random() * 9) + 2;
        num2 = Math.floor(Math.random() * 20) + 10;
      } else {
        // Multiples of 10
        num1 = (Math.floor(Math.random() * 9) + 1) * 10;
        num2 = Math.floor(Math.random() * 9) + 1;
      }
      answer = num1 * num2;
    } else {
      if (problemType === 0) {
        // Standard (1-50)
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 30) + 1;
      } else if (problemType === 1) {
        // Larger numbers (20-100)
        num1 = Math.floor(Math.random() * 81) + 20;
        num2 = Math.floor(Math.random() * 40) + 10;
      } else {
        // Round numbers
        num1 = (Math.floor(Math.random() * 10) + 1) * 10;
        num2 = (Math.floor(Math.random() * 5) + 1) * 10;
      }
      if (operation === "-" && num1 < num2) {
        [num1, num2] = [num2, num1];
      }
      answer = operation === "+" ? num1 + num2 : num1 - num2;
    }
  } else {
    // Older group: expand complexity & ranges, occasional power or chained op
    const advancedMode = Math.random() < 0.3; // 30% chance of advanced composite problem
    const ops = ["+", "-", "×", "÷"];
    operation = ops[Math.floor(Math.random() * ops.length)];
    const problemType = Math.floor(Math.random() * 5); // more variety

    if (advancedMode) {
      // Generate a chained operation: (a op b) op c with consistent integer results
      const innerOp = ops[Math.floor(Math.random() * ops.length)];
      let a = Math.floor(Math.random() * 50) + 10;
      let b = Math.floor(Math.random() * 40) + 5;
      let c = Math.floor(Math.random() * 30) + 2;

      // Ensure division yields integer for innerOp
      if (innerOp === "÷") {
        b = Math.floor(Math.random() * 9) + 2;
        const tempAns = Math.floor(Math.random() * 10) + 2;
        a = b * tempAns;
      }

      let innerAnswer;
      if (innerOp === "+") innerAnswer = a + b;
      else if (innerOp === "-") innerAnswer = a - b;
      else if (innerOp === "×") innerAnswer = a * b;
      else innerAnswer = a / b;

      // Prepare outer operation ensuring integer if division
      let outerOp = ops[Math.floor(Math.random() * ops.length)];
      if (outerOp === "÷") {
        c = Math.max(2, Math.floor(Math.random() * 9) + 2);
        innerAnswer = innerAnswer * c; // make divisible
      }

      if (outerOp === "+") answer = innerAnswer + c;
      else if (outerOp === "-") answer = innerAnswer - c;
      else if (outerOp === "×") answer = innerAnswer * c;
      else answer = innerAnswer / c;

      // Represent as single numbers for existing UI by collapsing to (innerAnswer) outerOp c
      num1 = innerAnswer;
      num2 = c;
      operation = outerOp;
    } else if (operation === "÷") {
      if (problemType === 0) {
        // Division with larger answers (up to 30)
        num2 = Math.floor(Math.random() * 12) + 2;
        answer = Math.floor(Math.random() * 29) + 2;
        num1 = num2 * answer;
      } else if (problemType === 1) {
        // Division by 10/100 with larger multiplicands
        num2 = Math.random() > 0.5 ? 10 : 100;
        answer = Math.floor(Math.random() * 90) + 10;
        num1 = num2 * answer;
      } else if (problemType === 2) {
        // Factor style: product of two mid-size numbers
        const f1 = Math.floor(Math.random() * 20) + 5;
        const f2 = Math.floor(Math.random() * 15) + 5;
        answer = f1;
        num2 = f2;
        num1 = f1 * f2;
      } else {
        num2 = Math.floor(Math.random() * 15) + 2;
        answer = Math.floor(Math.random() * 25) + 5;
        num1 = num2 * answer;
      }
    } else if (operation === "×") {
      if (problemType === 0) {
        // Larger multiplication range
        num1 = Math.floor(Math.random() * 25) + 5;
        num2 = Math.floor(Math.random() * 25) + 5;
      } else if (problemType === 1) {
        // Two-digit × two-digit
        num1 = Math.floor(Math.random() * 90) + 10;
        num2 = Math.floor(Math.random() * 90) + 10;
      } else if (problemType === 2) {
        // Multiples of 25/50/100
        const base = [25, 50, 100][Math.floor(Math.random() * 3)];
        num1 = base * (Math.floor(Math.random() * 9) + 2);
        num2 = Math.floor(Math.random() * 12) + 2;
      } else if (problemType === 3) {
        // Square numbers (represent as n × n)
        num1 = Math.floor(Math.random() * 30) + 5;
        num2 = num1;
      } else {
        // Near-square pair
        num1 = Math.floor(Math.random() * 40) + 10;
        num2 = num1 + (Math.floor(Math.random() * 5) - 2);
      }
      answer = num1 * num2;
    } else {
      // Addition/Subtraction harder ranges
      if (problemType === 0) {
        num1 = Math.floor(Math.random() * 900) + 100; // 3-digit
        num2 = Math.floor(Math.random() * 900) + 100;
      } else if (problemType === 1) {
        num1 = Math.floor(Math.random() * 4000) + 1000; // 4-digit
        num2 = Math.floor(Math.random() * 2000) + 500;
      } else if (problemType === 2) {
        // Mixed near-round numbers
        num1 = (Math.floor(Math.random() * 90) + 10) * 10;
        num2 = (Math.floor(Math.random() * 90) + 10) * 10;
      } else if (problemType === 3) {
        // Difference of close large numbers
        const base = Math.floor(Math.random() * 3000) + 2000;
        num2 = base - (Math.floor(Math.random() * 200) + 20);
        num1 = base;
        operation = "-";
      } else {
        // Sum of three collapsed into a + b (simulate complexity by larger numbers)
        num1 = Math.floor(Math.random() * 1500) + 500;
        num2 = Math.floor(Math.random() * 1500) + 500;
      }
      if (operation === "-" && num1 < num2) [num1, num2] = [num2, num1];
      answer = operation === "+" ? num1 + num2 : num1 - num2;
    }
  }

  return { num1, num2, operation, answer };
};

export default function MathChallenge() {
  const navigate = useNavigate();
  const ageGroup = getAgeGroup();
  const totalProblems = 10;

  const [currentProblem, setCurrentProblem] = useState(() =>
    generateProblem(ageGroup)
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [problemCount, setProblemCount] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [streak, setStreak] = useState(0);
  const [newAchievements, setNewAchievements] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    document.title = "Math Challenge — Children's Hospital Portal";
  }, []);

  const checkAnswer = () => {
    const correct = parseInt(userAnswer) === currentProblem.answer;

    if (correct) {
      sfx.play("correct");
      setScore(score + 1);
      setStreak(streak + 1);
      setFeedback("✅ Correct!");

      setTimeout(() => {
        if (problemCount < totalProblems) {
          sfx.play("next");
          setProblemCount(problemCount + 1);
          setCurrentProblem(generateProblem(ageGroup));
          setUserAnswer("");
          setFeedback("");
        } else {
          completeGame();
        }
      }, 1000);
    } else {
      sfx.play("wrong");
      setStreak(0);
      setFeedback(`❌ Not quite! The answer is ${currentProblem.answer}`);

      setTimeout(() => {
        if (problemCount < totalProblems) {
          sfx.play("next");
          setProblemCount(problemCount + 1);
          setCurrentProblem(generateProblem(ageGroup));
          setUserAnswer("");
          setFeedback("");
        } else {
          completeGame();
        }
      }, 2000);
    }
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
            total: totalProblems,
            gameType: "math-challenge",
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
    setCurrentProblem(generateProblem(ageGroup));
    setUserAnswer("");
    setScore(0);
    setProblemCount(1);
    setIsComplete(false);
    setFeedback("");
    setStreak(0);
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
      setCurrentAchievement(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
          <h2 className="title mb-4">🔢 Math Challenge</h2>
          <p className="text-gray-600 mb-6">
            Solve math problems as fast as you can!
          </p>

          {!isComplete ? (
            <>
              {/* Progress and Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-900">
                    {problemCount}/{totalProblems}
                  </div>
                  <div className="text-xs text-blue-600">Problem</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-900">
                    {score}
                  </div>
                  <div className="text-xs text-green-600">Correct</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-orange-900">
                    {streak}
                  </div>
                  <div className="text-xs text-orange-600">Streak</div>
                </div>
              </div>

              {/* Math Problem */}
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-12 mb-6">
                <div className="text-6xl font-bold text-purple-900 text-center">
                  {currentProblem.num1} {currentProblem.operation}{" "}
                  {currentProblem.num2} = ?
                </div>
              </div>

              {/* Answer Input */}
              <div className="mb-4">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                  placeholder="Enter your answer..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg text-center focus:outline-none focus:ring-2 focus:ring-mint-400"
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

              {/* Submit Button */}
              <button
                onClick={() => {
                  sfx.play("click");
                  checkAnswer();
                }}
                className="btn btn-primary w-full"
              >
                Submit Answer
              </button>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Challenge Complete!
                </h3>
                <div className="text-2xl font-semibold text-gray-700 mb-2">
                  Final Score: {score}/{totalProblems}
                </div>
                {saveError && (
                  <div className="mt-2 text-sm text-red-700 bg-red-100 border border-red-200 rounded px-3 py-2 inline-block">
                    {saveError}
                  </div>
                )}
                <div className="text-xl text-gray-600 mb-6">
                  {score === totalProblems
                    ? "Perfect! You're a math wizard! 🧙‍♂️"
                    : score >= totalProblems * 0.7
                    ? "Excellent work! 🌟"
                    : "Good try! Keep practicing! 💪"}
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      sfx.play("click");
                      restartGame();
                    }}
                    className="btn btn-primary"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => {
                      sfx.play("click");
                      navigate("/games");
                    }}
                    className="btn btn-secondary"
                  >
                    Back to Games
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
  );
}
