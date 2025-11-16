// AandE.jsx
// Purpose: Explain Accident & Emergency (A&E) in a child-friendly way

import { Link } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import ContentSection from "../../components/ContentSection";
import { useEffect } from "react";

export default function AandE() {
  useEffect(() => {
    document.title = "A&E Department — Children's Hospital Portal";
  }, []);

  return (
    <AnimatedPage>
      <ContentSection>
        <div className="text-center mb-8">
          <div className="text-6xl sm:text-7xl mb-4">🚑</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            A&E Department
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            What happens at Accident & Emergency
          </p>
        </div>

        {/* What is A&E? */}
        <section className="bg-red-50 rounded-2xl p-6 sm:p-8 border-2 border-red-200 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🏥</span>
            <span>What is A&E?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            A&E stands for <strong>Accident & Emergency</strong>. It's also
            called the <strong>Emergency Department</strong> or{" "}
            <strong>ER</strong>.
          </p>
          <p className="text-base sm:text-lg text-gray-700">
            It's the part of the hospital where people go when they need help
            right away — like if they've had an accident, are very unwell, or
            hurt themselves badly.
          </p>
        </section>

        {/* Why would you go? */}
        <section className="bg-orange-50 rounded-2xl p-6 sm:p-8 border-2 border-orange-200 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🤔</span>
            <span>When do people go to A&E?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            You might visit A&E if:
          </p>
          <ul className="space-y-3 text-base sm:text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🩹</span>
              <span>
                You've hurt yourself badly (broken bone, bad cut, or burn)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🤒</span>
              <span>
                You're very unwell and need to see a doctor straight away
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">😰</span>
              <span>
                You're having trouble breathing or are in a lot of pain
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚑</span>
              <span>
                You arrived by ambulance after an accident or emergency
              </span>
            </li>
          </ul>
        </section>

        {/* What happens when you arrive */}
        <section className="bg-blue-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🚪</span>
            <span>What happens when you arrive?</span>
          </h2>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span>1️⃣</span>
                <span>Reception (Check-in)</span>
              </h3>
              <p className="text-gray-700">
                First, you'll check in at the desk. They'll ask your name, what
                happened, and take some details. Don't worry — this is quick!
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span>2️⃣</span>
                <span>Triage (Priority Check)</span>
              </h3>
              <p className="text-gray-700 mb-2">
                A nurse will check how urgent your problem is. They might:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Take your temperature</li>
                <li>Check your heart rate and breathing</li>
                <li>Ask where it hurts</li>
                <li>Look at any injuries</li>
              </ul>
              <p className="text-gray-700 mt-2">
                This helps the hospital decide who needs to be seen first.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span>3️⃣</span>
                <span>Waiting Room</span>
              </h3>
              <p className="text-gray-700">
                You'll wait in a special area until it's your turn. The most
                urgent cases are seen first, so you might have to wait a while.
                There are usually toys, books, or TVs to help pass the time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span>4️⃣</span>
                <span>Seeing the Doctor</span>
              </h3>
              <p className="text-gray-700">
                When it's your turn, you'll see a doctor or nurse. They'll ask
                what happened, check you over, and decide what treatment you
                need.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span>5️⃣</span>
                <span>Treatment or Tests</span>
              </h3>
              <p className="text-gray-700 mb-2">You might need:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>An X-ray to check for broken bones</li>
                <li>Stitches if you have a bad cut</li>
                <li>Medicine to help you feel better</li>
                <li>A cast or bandage</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span>6️⃣</span>
                <span>Going Home or Staying</span>
              </h3>
              <p className="text-gray-700">
                Most people can go home after treatment. But if you're very
                poorly, you might need to stay in the hospital overnight so the
                doctors can keep an eye on you.
              </p>
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="bg-purple-50 rounded-2xl p-6 sm:p-8 border-2 border-purple-200 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>👀</span>
            <span>What will A&E look like?</span>
          </h2>
          <ul className="space-y-3 text-base sm:text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚨</span>
              <span>
                <strong>Busy and fast-paced:</strong> Lots of people, doctors,
                and nurses moving around quickly
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <span>
                <strong>Bright lights:</strong> The lights are very bright so
                doctors can see clearly
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔊</span>
              <span>
                <strong>Noisy:</strong> You might hear machines beeping, people
                talking, or alarms
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🛏️</span>
              <span>
                <strong>Cubicles or bays:</strong> Treatment areas are often
                separated by curtains for privacy
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🧑‍⚕️</span>
              <span>
                <strong>Lots of staff:</strong> Doctors, nurses, receptionists,
                and porters all working together
              </span>
            </li>
          </ul>
        </section>

        {/* Tips for visiting */}
        <section className="bg-green-50 rounded-2xl p-6 sm:p-8 border-2 border-green-200 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>💡</span>
            <span>Tips for Your Visit</span>
          </h2>
          <ul className="space-y-3 text-base sm:text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>
                <strong>Bring a grown-up:</strong> Always have a parent or
                guardian with you
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>
                <strong>Be patient:</strong> You might have to wait — bring
                something to do
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>
                <strong>Tell the truth:</strong> Explain exactly what happened
                and how you feel
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>
                <strong>Ask questions:</strong> If you don't understand
                something, ask!
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>
                <strong>It's okay to be scared:</strong> Everyone feels worried
                sometimes — tell the staff
              </span>
            </li>
          </ul>
        </section>

        {/* Remember */}
        <section className="bg-yellow-50 rounded-2xl p-6 sm:p-8 border-2 border-yellow-300 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>⭐</span>
            <span>Remember</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            The A&E team are there to help you feel better. They see lots of
            children every day, and they're very good at looking after you!
          </p>
          <p className="text-base sm:text-lg text-gray-700 font-semibold">
            You're safe, and they'll do their best to make you comfortable. 💙
          </p>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/explainers"
            className="bg-sky-200 hover:bg-sky-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
          >
            ← Back to Explainers
          </Link>
          <Link
            to="/"
            className="bg-mint-200 hover:bg-mint-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
          >
            Home
          </Link>
        </div>
      </ContentSection>
    </AnimatedPage>
  );
}
