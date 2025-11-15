// FAQ.jsx
// Purpose: Frequently Asked Questions about the hospital (FR-8)
// Age-appropriate answers to common questions children have

import { useEffect } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Why do I have to stay in the hospital?",
    answer:
      "Sometimes our bodies need extra help to get better. The hospital is a special place where doctors and nurses can watch you closely and give you the medicine and care you need. Once you're feeling better, you can go home!",
  },
  {
    question: "Will it hurt?",
    answer:
      "We try our best to make sure you don't feel pain. If something might be uncomfortable, the doctors and nurses will tell you first and help you feel better. You can always ask for help if something hurts.",
  },
  {
    question: "Can my parents stay with me?",
    answer:
      "Yes! Most of the time, one parent or guardian can stay with you in your room. They can sleep in a special chair or bed next to you. Ask your nurse about visiting hours.",
  },
  {
    question: "What will I eat?",
    answer:
      "The hospital has a kitchen that makes healthy food for patients. You'll get breakfast, lunch, and dinner. If you have favorite foods or foods you can't eat, let your nurse know!",
  },
  {
    question: "Can I bring my toys?",
    answer:
      "Yes! You can bring a few favorite toys, books, or stuffed animals from home. They can help you feel more comfortable. Just make sure to put your name on them so they don't get lost.",
  },
  {
    question: "What are all those beeping sounds?",
    answer:
      "Those are machines that help the doctors and nurses take care of you. They measure things like your heartbeat and temperature. The beeps let the nurses know everything is working well!",
  },
  {
    question: "When can I play?",
    answer:
      "Most hospitals have a playroom where you can play games, do crafts, watch TV, or read books. Ask your nurse when you can visit the playroom. You can also play in your room when you're feeling up to it.",
  },
  {
    question: "Who are all these people coming into my room?",
    answer:
      "Lots of people work together to help you get better! You might see doctors, nurses, specialists, and other helpers. They're all part of your care team. You can ask anyone their name and what they do.",
  },
  {
    question: "How long will I be here?",
    answer:
      "It depends on what you need to get better. Your doctor will talk to you and your family about how long you might stay. Some kids stay for just a day, and some stay longer. We'll help you get home as soon as you're ready!",
  },
  {
    question: "What if I'm scared or worried?",
    answer:
      "It's completely normal to feel scared or worried in the hospital. You can talk to your parents, nurses, doctors, or a child life specialist about your feelings. They're here to help you feel better - both your body AND your feelings!",
  },
];

export default function FAQ() {
  useEffect(() => {
    document.title = "FAQ — Children's Hospital Portal";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4">❓</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Common questions about the hospital
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-6 border-b border-gray-200 last:border-0 last:pb-0"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-2">
                  <span className="text-2xl" aria-hidden="true">
                    ❓
                  </span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-700 leading-relaxed ml-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-6 text-center mb-6">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">💬 Still have questions?</span>
                <br />
                Ask your nurse, doctor, or a hospital staff member. We're here
                to help! 💙
              </p>
            </div>
            <div className="text-center">
              <Link
                to="/"
                className="inline-block bg-sky-200 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-sky-300 transition-colors shadow-md"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
