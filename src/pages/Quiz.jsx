// Quiz.jsx
// Purpose: Multiple-choice quiz for ages 4–8.
// Flow: show question -> select -> lock -> show Next/Results.
// A11y: page title, labels, keyboard (Enter/Space) on options.

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

// Base questions (could be expanded or fetched from a database later)
const baseQuestions = [
  { question: "Which one helps doctors see your bones?", options: ["X-Ray", "Microscope", "Stethoscope", "Bandage"], answer: "X-Ray" },
  { question: "Who brings you your medicine?", options: ["Nurse", "Chef", "Driver", "Teacher"], answer: "Nurse" },
  { question: "What should you do before seeing the doctor?", options: ["Wash hands", "Eat sweets", "Run around", "Hide"], answer: "Wash hands" },
  { question: "Which tool lets doctors listen to your heartbeat?", options: ["Stethoscope", "Drum", "Camera", "Whistle"], answer: "Stethoscope" },
  { question: "Where do you wait before your appointment?", options: ["Waiting Room", "Garage", "Kitchen", "Playground"], answer: "Waiting Room" },
  { question: "What helps you cover a small cut?", options: ["Bandage", "Paint", "Sticker", "Leaf"], answer: "Bandage" },
  { question: "What checks your temperature?", options: ["Thermometer", "Flashlight", "Whistle", "Spoon"], answer: "Thermometer" },
  { question: "Where do you go to play in the hospital?", options: ["Playroom", "X-Ray Room", "Office", "Cafeteria"], answer: "Playroom" },
];

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
    document.title = "Hospital Quiz — Children’s Hospital Portal";
  }, []);

  // Optional sounds (if files missing, play() is safely ignored)
  const sfx = useRef({
    correct: new Audio("/sfx/correct.mp3"),
    wrong: new Audio("/sfx/wrong.mp3"),
    next: new Audio("/sfx/next.mp3"),
  });

  // Quiz state
  const [questions, setQuestions] = useState(() => shuffle(baseQuestions));
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
      setQuestions(shuffle(baseQuestions));
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
    if (correct) { setScore((s) => s + 1); play("correct"); } 
    else { play("wrong"); }
    setAnswered(true);
  };

  const next = () => {
    if (!answered) return;
    if (index < total - 1) {
      play("next");
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      navigate("/results", { state: { score, total } });
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
    <section className="space-y-6">
      {/* Heading area */}
      <div className="text-center">
        <h2 className="title mb-2">Hospital Quiz</h2>
        <p className="text-gray-700">Ages 4 – 8</p>
      </div>

      {/* Progress */}
      <div className="max-w-3xl mx-auto">
        <div className="text-sm text-gray-700 mb-2 text-center">
          Question {index + 1} of {total}
        </div>
        <ProgressBar current={index} total={total} />
      </div>

      {/* Question card */}
      <div className="card max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">{q.question}</h3>
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
              aria-label={`Answer choice: ${opt}`} // Fixed aria-label
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
            className={"btn " + (answered ? "btn-primary" : "bg-gray-200 text-gray-500 cursor-not-allowed")}
          >
            {index < total - 1 ? "Next" : "See Results"}
          </button>
          <Link to="/" className="btn btn-secondary" aria-label="Back to Home">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
