// Surgery.jsx
// Purpose: Medical guidance for children preparing for surgery
// Age-appropriate explanation of what happens before, during, and after an operation

import { Link } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import ContentSection from "../../components/ContentSection";

export default function Surgery() {
  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
            <div className="space-y-6 md:space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="text-5xl md:text-6xl mb-4" aria-hidden="true">
                  🏥
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Getting Ready for Surgery
                </h1>
                <p className="text-lg text-gray-600">
                  Having an operation can feel a bit scary, but we're here to
                  help you know what to expect!
                </p>
              </div>

              {/* What is Surgery? */}
              <ContentSection
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  🔍 What is Surgery?
                </h2>
                <p className="text-gray-700 mb-4">
                  Surgery (also called an operation) is when doctors fix or help
                  a part of your body while you're asleep. You won't feel
                  anything because you'll be given special medicine called
                  anesthetic that makes you sleep deeply.
                </p>
                <p className="text-gray-700">
                  The doctors are specially trained and will take really good
                  care of you the whole time!
                </p>
              </ContentSection>

              {/* Before Your Operation */}
              <ContentSection
                bgColor="bg-purple-50"
                borderColor="border-purple-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  📅 Before Your Operation
                </h2>

                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  The Days Before:
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">👨‍⚕️</span>
                    <span>
                      You'll meet your surgeon (the doctor doing the operation)
                      and they'll explain everything
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🍽️</span>
                    <span>
                      You'll be told when to stop eating and drinking (usually
                      the night before)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🛁</span>
                    <span>You might need to have a special bath or shower</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🎒</span>
                    <span>
                      Pack your hospital bag with comfy clothes, pajamas, and
                      your favorite things
                    </span>
                  </li>
                </ul>

                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  On the Day:
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">👕</span>
                    <span>You'll put on a special hospital gown</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🆔</span>
                    <span>
                      The nurse will put a name band on your wrist to make sure
                      they know who you are
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💬</span>
                    <span>
                      The anesthetist (sleep doctor) will visit you to explain
                      how they'll help you sleep
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">👨‍👩‍👧</span>
                    <span>
                      Your parent or carer can stay with you until you go to
                      sleep
                    </span>
                  </li>
                </ul>
              </ContentSection>

              {/* During Your Operation */}
              <ContentSection
                bgColor="bg-green-50"
                borderColor="border-green-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  ⏱️ During Your Operation
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Going to Sleep:
                    </h3>
                    <p className="text-gray-700">
                      You might breathe in some special air through a mask (it
                      might smell funny but it's safe!), or have medicine
                      through a small tube in your hand. Either way, you'll fall
                      asleep very quickly - usually in less than a minute!
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      While You're Asleep:
                    </h3>
                    <p className="text-gray-700 mb-2">
                      The surgeons and nurses will:
                    </p>
                    <ul className="space-y-2 sm:space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-2">✅</span>
                        <span>Do the operation very carefully</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✅</span>
                        <span>
                          Watch your heart and breathing on special screens
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✅</span>
                        <span>Make sure you're comfortable and safe</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✅</span>
                        <span>Keep everything super clean and sterile</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-green-300">
                    <p className="text-gray-700 font-semibold text-center">
                      💭 You won't remember anything, feel anything, or dream
                      during the operation!
                    </p>
                  </div>
                </div>
              </ContentSection>

              {/* After Your Operation */}
              <ContentSection
                bgColor="bg-yellow-50"
                borderColor="border-yellow-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  🌅 After Your Operation (Recovery)
                </h2>

                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  Waking Up:
                </h3>
                <p className="text-gray-700 mb-4">
                  You'll wake up in a special room called the Recovery Room. A
                  nurse will be right there with you. You might feel:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">😴</span>
                    <span>Sleepy or confused at first (this is normal!)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤒</span>
                    <span>
                      A bit sore where the operation was (you'll get medicine
                      for pain)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🥶</span>
                    <span>Cold (they'll give you warm blankets)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤢</span>
                    <span>A bit sick or thirsty (the nurse will help)</span>
                  </li>
                </ul>

                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  Going Back to the Ward:
                </h3>
                <p className="text-gray-700 mb-4">
                  Once you're more awake, you'll go back to your bed on the
                  ward. Your family will be waiting for you there! 👨‍👩‍👧
                </p>

                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  Getting Better:
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">💊</span>
                    <span>
                      Take your medicine when the nurses give it to you
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🚶</span>
                    <span>
                      Try to move around a bit when the nurses say it's okay
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💧</span>
                    <span>Drink lots of water</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">😴</span>
                    <span>
                      Rest as much as you need - your body is working hard to
                      heal!
                    </span>
                  </li>
                </ul>
              </ContentSection>

              {/* Tips for Feeling Better */}
              <ContentSection
                bgColor="bg-pink-50"
                borderColor="border-pink-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  💪 Tips for Feeling Better
                </h2>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3">🧸</span>
                    <span>
                      <strong>Bring comfort items:</strong> Your favorite toy,
                      blanket, or photos from home
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">❓</span>
                    <span>
                      <strong>Ask questions:</strong> If you're worried about
                      anything, ask! No question is silly
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🎮</span>
                    <span>
                      <strong>Bring entertainment:</strong> Books, tablets,
                      games to keep you busy while you rest
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">💬</span>
                    <span>
                      <strong>Talk about your feelings:</strong> It's okay to
                      feel scared, worried, or upset
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🌟</span>
                    <span>
                      <strong>You're brave:</strong> Remember, lots of children
                      have operations and they're fine!
                    </span>
                  </li>
                </ul>
              </ContentSection>

              {/* Important to Know */}
              <ContentSection bgColor="bg-red-50" borderColor="border-red-200">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 text-center">
                  ⚠️ Important to Know
                </h3>
                <p className="text-gray-700 text-center mb-3">
                  If you feel pain, feel sick, or something doesn't feel right,
                  ALWAYS tell a nurse or your parent right away. They're there
                  to help you!
                </p>
                <p className="text-gray-700 text-center">
                  You can also press the call button next to your bed anytime
                  you need help. 🔔
                </p>
              </ContentSection>

              {/* Navigation Buttons */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4">
                <Link
                  to="/medical-guidance"
                  className="bg-sky-200 hover:bg-sky-300 text-gray-800 font-bold py-2.5 px-5 md:py-3 md:px-6 rounded-xl transition-colors shadow-md text-sm md:text-base"
                >
                  ← Back to Medical Help
                </Link>
                <Link
                  to="/"
                  className="bg-mint-200 hover:bg-mint-300 text-gray-800 font-bold py-2.5 px-5 md:py-3 md:px-6 rounded-xl transition-colors shadow-md text-sm md:text-base"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
