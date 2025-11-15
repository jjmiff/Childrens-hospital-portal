// Quiz.jsx
// Purpose: Multiple-choice quiz for ages 4–8.
// Flow: show question -> select -> lock -> show Next/Results.
// A11y: page title, labels, keyboard (Enter/Space) on options.

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { getAgeGroup, getAgeGroupLabel } from "../utils/userUtils";
import { apiFetch } from "../utils/api";

// Age-appropriate question banks
const QUESTIONS_4_8 = [
  {
    question: "Which one helps doctors see your bones?",
    options: ["X-Ray", "Microscope", "Stethoscope", "Bandage"],
    answer: "X-Ray",
  },
  {
    question: "Who brings you your medicine?",
    options: ["Nurse", "Chef", "Driver", "Teacher"],
    answer: "Nurse",
  },
  {
    question: "What should you do before seeing the doctor?",
    options: ["Wash hands", "Eat sweets", "Run around", "Hide"],
    answer: "Wash hands",
  },
  {
    question: "Which tool lets doctors listen to your heartbeat?",
    options: ["Stethoscope", "Drum", "Camera", "Whistle"],
    answer: "Stethoscope",
  },
  {
    question: "Where do you wait before your appointment?",
    options: ["Waiting Room", "Garage", "Kitchen", "Playground"],
    answer: "Waiting Room",
  },
  {
    question: "What helps you cover a small cut?",
    options: ["Bandage", "Paint", "Sticker", "Leaf"],
    answer: "Bandage",
  },
  {
    question: "What checks your temperature?",
    options: ["Thermometer", "Flashlight", "Whistle", "Spoon"],
    answer: "Thermometer",
  },
  {
    question: "Where can you play in the hospital?",
    options: ["Playroom", "X-Ray Room", "Office", "Cafeteria"],
    answer: "Playroom",
  },
];

const QUESTIONS_9_14 = [
  {
    question: "What does an MRI scan mostly use to take pictures?",
    options: ["Magnets and radio waves", "X-rays", "Ultrasound", "Sunlight"],
    answer: "Magnets and radio waves",
  },
  {
    question: "Who gives you medicine to help you sleep during surgery?",
    options: ["Anesthetist", "Physiotherapist", "Radiographer", "Receptionist"],
    answer: "Anesthetist",
  },
  {
    question: "Why might you need to stop eating before an operation?",
    options: [
      "For safety while asleep",
      "To save time",
      "To lose weight",
      "To make photos clearer",
    ],
    answer: "For safety while asleep",
  },
  {
    question: "What is the best way to prevent spreading infections?",
    options: ["Wash hands well", "Wear a hat", "Talk quietly", "Bring toys"],
    answer: "Wash hands well",
  },
  {
    question: "Who checks your medicines are correct and safe?",
    options: ["Pharmacist", "Porter", "Chef", "Caretaker"],
    answer: "Pharmacist",
  },
  {
    question: "What does 'consent' mean in hospitals?",
    options: [
      "Agreeing to a plan",
      "Getting lunch",
      "Choosing a game",
      "Wearing a uniform",
    ],
    answer: "Agreeing to a plan",
  },
  {
    question: "In A&E, what is 'triage'?",
    options: [
      "Sorting who needs help first",
      "Taking blood",
      "Giving medicine",
      "Filling forms",
    ],
    answer: "Sorting who needs help first",
  },
  {
    question: "What is an IV?",
    options: [
      "Medicine through a vein",
      "An eye test",
      "A breathing check",
      "A skin cream",
    ],
    answer: "Medicine through a vein",
  },
];

const QUESTIONS_15_18 = [
  {
    question: "Which imaging is best for soft tissues like brain or ligaments?",
    options: ["MRI", "X-ray", "CT", "Ultrasound"],
    answer: "MRI",
  },
  {
    question: "What is PACU?",
    options: [
      "Recovery area after surgery",
      "X-ray control room",
      "Blood bank",
      "Pharmacy store",
    ],
    answer: "Recovery area after surgery",
  },
  {
    question: "Why must you complete an antibiotic course?",
    options: [
      "Prevent resistance & relapse",
      "Be polite",
      "Save money",
      "Change flavor",
    ],
    answer: "Prevent resistance & relapse",
  },
  {
    question: "What does an ECG measure?",
    options: [
      "Electrical activity of the heart",
      "Lung volume",
      "Blood sugar",
      "Body temperature",
    ],
    answer: "Electrical activity of the heart",
  },
  {
    question: "IM vs IV medicine mainly differ by?",
    options: ["Where medicine enters body", "Color", "Taste", "Package"],
    answer: "Where medicine enters body",
  },
  {
    question: "Why take baseline 'vitals'?",
    options: [
      "Track changes over time",
      "Print labels",
      "Unlock Wi‑Fi",
      "Fill time",
    ],
    answer: "Track changes over time",
  },
  {
    question: "Confidentiality for teens means?",
    options: [
      "Private unless safety risk",
      "Always public",
      "Parents only",
      "Online only",
    ],
    answer: "Private unless safety risk",
  },
  {
    question: "CT scans are especially good for?",
    options: [
      "Fast bone/trauma imaging",
      "Hearing tests",
      "Allergies",
      "Balance",
    ],
    answer: "Fast bone/trauma imaging",
  },
];

const getQuestionsForAge = (age) => {
  if (age === "4-8") return QUESTIONS_4_8;
  if (age === "15-18") return QUESTIONS_15_18;
  return QUESTIONS_9_14; // default
};

// Shuffle helper
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.title = "Hospital Quiz — Children's Hospital Portal";
  }, []);

  // Optional sounds (if files missing, play() is safely ignored)
  const sfx = useRef({
    correct: new Audio("/sfx/correct.mp3"),
    wrong: new Audio("/sfx/wrong.mp3"),
    next: new Audio("/sfx/next.mp3"),
  });

  // Quiz state
  const ageGroup = getAgeGroup();
  const ageLabel = ageGroup ? getAgeGroupLabel(ageGroup) : "All Ages";
  const [questions, setQuestions] = useState(() => {
    const rawQuestions = getQuestionsForAge(ageGroup);
    // Shuffle question order AND shuffle options within each question
    return shuffle(rawQuestions).map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));
  });
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const total = questions.length;
  const q = questions[index];

  const play = (name) => {
    const a = sfx.current[name];
    if (!a) return;
    a.currentTime = 0;
    a.volume = 0.45;
    a.play().catch(() => {});
  };

  // Reset if we came from Results with restart flag
  useEffect(() => {
    if (location.state?.restart) {
      const freshAge = getAgeGroup();
      const rawQuestions = getQuestionsForAge(freshAge);
      setQuestions(
        shuffle(rawQuestions).map((q) => ({
          ...q,
          options: shuffle(q.options),
        }))
      );
      setIndex(0);
      setSelected(null);
      setAnswered(false);
      setScore(0);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const choose = (opt) => {
    if (answered) return;
    setSelected(opt);
    const correct = opt === q.answer;
    if (correct) {
      setScore((s) => s + 1);
      play("correct");
    } else {
      play("wrong");
    }
    setAnswered(true);
  };

  const next = async () => {
    if (!answered) return;
    if (index < total - 1) {
      play("next");
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await apiFetch("/api/scores", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ score, total, gameType: "quiz" }),
          });
          const data = await res.json();
          navigate("/results", {
            state: {
              score,
              total,
              newAchievements: data.newAchievements || [],
            },
          });
        } catch (error) {
          console.error("Error saving score:", error);
          navigate("/results", { state: { score, total } });
        }
      } else {
        navigate("/results", { state: { score, total } });
      }
    }
  };

  // Style helper for answers
  const optionClass = (opt) => {
    const isSelected = selected === opt;
    const isCorrect = answered && opt === q.answer;
    const isWrong = answered && isSelected && opt !== q.answer;
    const base = "btn w-full border rounded-xl text-lg";
    const idle = "bg-white border-gray-300 hover:bg-gray-50 text-gray-800";
    const correct = "bg-green-100 border-green-400 text-green-800";
    const wrong = "bg-rose-100 border-rose-400 text-rose-700";
    return [base, isCorrect ? correct : isWrong ? wrong : idle].join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Skip link for screen readers */}
        <a
          href="#quiz-start"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
        >
          Skip to quiz
        </a>

        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
          {/* Heading area */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              🧠 Hospital Quiz
            </h2>
            <p className="text-gray-700">{ageLabel}</p>
          </div>

          {/* Progress */}
          <div className="max-w-3xl mx-auto">
            <div className="text-sm text-gray-700 mb-2 text-center">
              Question {index + 1} of {total}
            </div>
            <ProgressBar current={index} total={total} />
          </div>

          {/* Question card */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              {q.question}
            </h3>
            <div className="grid gap-4">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  onKeyDown={(e) => {
                    // Space/Enter choose the focused option
                    if ((e.key === "Enter" || e.key === " ") && !answered) {
                      e.preventDefault();
                      choose(opt);
                    }
                  }}
                  // We disable all after answering so the state/color is clear
                  disabled={answered}
                  aria-pressed={selected === opt}
                  aria-label={`Answer choice: ${opt}`}
                  className={optionClass(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={next}
                disabled={!answered}
                aria-label={index < total - 1 ? "Next question" : "See results"}
                className={
                  "btn " +
                  (answered
                    ? "btn-primary"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed")
                }
              >
                {index < total - 1 ? "Next" : "See Results"}
              </button>
              <Link
                to="/"
                className="btn btn-secondary"
                aria-label="Back to Home"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
