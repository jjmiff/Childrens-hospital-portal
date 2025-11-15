// Medicine.jsx
// Purpose: Medical guidance for children taking medicines
// Age-appropriate tips and information about different types of medicine

import { Link } from "react-router-dom";

export default function Medicine() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="text-6xl mb-4">💊</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Taking Your Medicine
              </h1>
              <p className="text-lg text-gray-600">
                Medicine helps you get better! Here's everything you need to
                know about taking it safely.
              </p>
            </div>

            {/* Why Do I Need Medicine? */}
            <section className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🤔 Why Do I Need Medicine?
              </h2>
              <p className="text-gray-700 mb-4">
                Medicine is like a helper for your body! It can:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">🦠</span>
                  <span>Fight germs and infections to make you better</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🤕</span>
                  <span>Stop pain and make you feel more comfortable</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🌡️</span>
                  <span>Bring down a fever (when you feel too hot)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💪</span>
                  <span>
                    Help your body work better if you have a long-term condition
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">😴</span>
                  <span>Help you sleep, breathe better, or feel less sick</span>
                </li>
              </ul>
            </section>

            {/* Types of Medicine */}
            <section className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                💉 Different Types of Medicine
              </h2>

              <div className="space-y-4">
                {/* Tablets/Pills */}
                <div className="bg-white rounded-lg p-4 border border-purple-300">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">💊</span>
                    Tablets or Pills
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Hard medicine you swallow with water.
                  </p>
                  <p className="text-gray-700 text-sm font-semibold">
                    💡 Tips: Take a big sip of water, pop the tablet in your
                    mouth, and swallow quickly. Some tablets can be cut in half
                    if they're too big - ask first!
                  </p>
                </div>

                {/* Liquid Medicine */}
                <div className="bg-white rounded-lg p-4 border border-purple-300">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">🥄</span>
                    Liquid Medicine (Syrup)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Medicine in liquid form, usually measured with a spoon or
                    syringe.
                  </p>
                  <p className="text-gray-700 text-sm font-semibold">
                    💡 Tips: Measure it carefully! If it tastes yucky, you can
                    have a drink of juice or eat something nice straight after
                    (if the nurse says it's okay).
                  </p>
                </div>

                {/* Injections */}
                <div className="bg-white rounded-lg p-4 border border-purple-300">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">💉</span>
                    Injections (Shots)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Medicine given with a needle, usually in your arm, leg, or
                    tummy.
                  </p>
                  <p className="text-gray-700 text-sm font-semibold">
                    💡 Tips: Look away, take deep breaths, and it'll be over in
                    seconds! Some injections sting a tiny bit, but the nurse can
                    use special numbing cream first.
                  </p>
                </div>

                {/* IV Medicine */}
                <div className="bg-white rounded-lg p-4 border border-purple-300">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">💧</span>
                    IV (Intravenous) Medicine
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Medicine given through a small tube in your hand or arm.
                  </p>
                  <p className="text-gray-700 text-sm font-semibold">
                    💡 Tips: You can still move around (carefully!) with an IV.
                    Tell a nurse if the tube feels uncomfortable or if you see
                    any redness.
                  </p>
                </div>

                {/* Inhalers */}
                <div className="bg-white rounded-lg p-4 border border-purple-300">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">🌬️</span>
                    Inhalers or Nebulizers
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Medicine you breathe in, often for asthma or breathing
                    problems.
                  </p>
                  <p className="text-gray-700 text-sm font-semibold">
                    💡 Tips: Breathe slowly and deeply. Hold your breath for a
                    few seconds after breathing in so the medicine can work.
                  </p>
                </div>

                {/* Creams/Ointments */}
                <div className="bg-white rounded-lg p-4 border border-purple-300">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">🧴</span>
                    Creams or Ointments
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Medicine you rub on your skin.
                  </p>
                  <p className="text-gray-700 text-sm font-semibold">
                    💡 Tips: Wash your hands before and after. Rub gently in
                    circles until it soaks in. Don't touch your eyes!
                  </p>
                </div>
              </div>
            </section>

            {/* Important Safety Rules */}
            <section className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ⚠️ Important Safety Rules
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-xl">🚫</span>
                  <span>
                    <strong>NEVER take medicine by yourself</strong> - always
                    ask an adult first
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">👨‍⚕️</span>
                  <span>
                    <strong>Only take YOUR medicine</strong> - never share with
                    friends or take someone else's
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">📝</span>
                  <span>
                    <strong>Follow the instructions</strong> - take the right
                    amount at the right time
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">💬</span>
                  <span>
                    <strong>Tell an adult if something feels wrong</strong> -
                    like feeling sick, dizzy, or getting a rash
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">🍬</span>
                  <span>
                    <strong>Medicine is NOT candy</strong> - even if it tastes
                    nice or looks colorful!
                  </span>
                </li>
              </ul>
            </section>

            {/* Tips to Remember */}
            <section className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ✅ Tips to Remember Your Medicine
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3">⏰</span>
                  <span>
                    <strong>Set an alarm:</strong> Use a phone or watch to
                    remind you when it's medicine time
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">📅</span>
                  <span>
                    <strong>Use a chart:</strong> Put a sticker on a calendar
                    each time you take your medicine
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">📦</span>
                  <span>
                    <strong>Keep it in the same spot:</strong> Always store
                    medicine in the same place (but out of reach of little
                    kids!)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">🎵</span>
                  <span>
                    <strong>Make it routine:</strong> Take it at the same time
                    each day, like after breakfast
                  </span>
                </li>
              </ul>
            </section>

            {/* Making Medicine Easier to Take */}
            <section className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🌟 Making Medicine Easier to Take
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3">😖</span>
                  <span>
                    <strong>If it tastes bad:</strong> Ask if you can have a
                    flavored version, or have a nice drink ready to wash it down
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">😰</span>
                  <span>
                    <strong>If you feel nervous:</strong> Talk to the nurse -
                    they can help and explain exactly what will happen
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">🎁</span>
                  <span>
                    <strong>Reward yourself:</strong> After taking medicine, do
                    something you enjoy like reading a book or playing a game
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">💪</span>
                  <span>
                    <strong>Remember why:</strong> Medicine helps you get better
                    and feel good again!
                  </span>
                </li>
              </ul>
            </section>

            {/* What If I Forget? */}
            <section className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                🤷 What If I Forget a Dose?
              </h3>
              <p className="text-gray-700 text-center mb-3">
                If you forget to take your medicine:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center justify-center">
                  <span className="mr-2">1️⃣</span>
                  <span>Tell your parent, carer, or nurse right away</span>
                </li>
                <li className="flex items-center justify-center">
                  <span className="mr-2">2️⃣</span>
                  <span>
                    They'll check what to do (sometimes you take it late,
                    sometimes you skip it)
                  </span>
                </li>
                <li className="flex items-center justify-center">
                  <span className="mr-2">3️⃣</span>
                  <span>
                    <strong>NEVER take double</strong> to catch up!
                  </span>
                </li>
              </ul>
            </section>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <Link
                to="/medical-guidance"
                className="bg-sky-200 hover:bg-sky-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
              >
                ← Back to Medical Help
              </Link>
              <Link
                to="/"
                className="bg-mint-200 hover:bg-mint-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
