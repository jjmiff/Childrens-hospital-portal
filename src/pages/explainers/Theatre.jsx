// Theatre.jsx
// Purpose: Explain operating theatre in child-friendly way (FR-5)

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Theatre() {
  useEffect(() => {
    document.title = "Operating Theatre — Children's Hospital Portal";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🏥 Operating Theatre
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            The special room where operations happen
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                What is an Operating Theatre?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                An operating theatre (also called an OR or operating room) is a
                very clean, special room where doctors do operations (surgery).
                It's called a "theatre" because long ago, students would sit in
                seats to watch and learn from surgeons - just like watching a
                play in a theatre!
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <h4 className="text-lg font-bold text-blue-900 mb-2">
                ✨ Super Clean!
              </h4>
              <p className="text-blue-800">
                Operating theatres are probably the cleanest rooms you've ever
                seen! Everything is spotless and germ-free. That's why everyone
                wears special clothes, masks, and covers on their shoes. The air
                is even specially filtered to keep it extra clean!
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Before Your Operation
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">1.</span>
                  <span>You'll put on a special hospital gown</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">2.</span>
                  <span>
                    You can't eat or drink for several hours before (this keeps
                    you safe during the operation)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">3.</span>
                  <span>
                    You'll meet the surgeon (the doctor doing the operation) and
                    the anaesthetist (who makes you sleep)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">4.</span>
                  <span>
                    You might get special cream on your hand that numbs it (so
                    you don't feel the needle)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">5.</span>
                  <span>
                    You'll say goodbye to your parents - they'll be waiting for
                    you when you wake up!
                  </span>
                </li>
              </ol>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
              <h4 className="text-lg font-bold text-purple-900 mb-2">
                😴 Going to Sleep
              </h4>
              <p className="text-purple-800 mb-2">
                Before the operation starts, the anaesthetist will give you
                special medicine to make you sleep. You have two options:
              </p>
              <ul className="space-y-2 text-purple-800">
                <li>
                  • <span className="font-bold">Through a mask:</span> You
                  breathe in air that smells a bit funny and fall asleep in
                  seconds
                </li>
                <li>
                  •{" "}
                  <span className="font-bold">
                    Through a tiny tube in your hand:
                  </span>{" "}
                  Medicine goes in and you fall asleep quickly
                </li>
              </ul>
              <p className="text-purple-800 mt-2">
                Don't worry - this sleep is different from normal sleep. You
                won't feel anything during the operation and you won't remember
                it!
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Who's in the Theatre?
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex gap-3">
                  <span className="text-2xl">👨‍⚕️</span>
                  <div>
                    <p className="font-bold">Surgeon</p>
                    <p>The main doctor who does the operation</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">💤</span>
                  <div>
                    <p className="font-bold">Anaesthetist</p>
                    <p>Keeps you asleep and comfortable during surgery</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">👩‍⚕️</span>
                  <div>
                    <p className="font-bold">Surgical Nurses</p>
                    <p>Help the surgeon with special tools and equipment</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="font-bold">Other Specialists</p>
                    <p>
                      Depending on your operation, there might be other doctors
                      too
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <h4 className="text-lg font-bold text-green-900 mb-2">
                🌟 Cool Equipment
              </h4>
              <p className="text-green-800 mb-2">
                The operating theatre has amazing equipment:
              </p>
              <ul className="space-y-2 text-green-800">
                <li>
                  • Big bright lights (so surgeons can see everything clearly)
                </li>
                <li>• Monitors showing your heartbeat and breathing</li>
                <li>
                  • Special surgical tools (like tiny scissors and cameras!)
                </li>
                <li>• Warming blankets to keep you cozy</li>
                <li>• Computers and screens</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                After the Operation (Waking Up)
              </h3>
              <p className="text-gray-700 mb-3">
                You'll wake up in a special recovery room (not the operating
                theatre). Here's what might happen:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • You might feel sleepy or confused at first - this is normal!
                </li>
                <li>• A nurse will be right there with you</li>
                <li>• You might have a sore throat from the breathing tube</li>
                <li>
                  • You might feel sick - tell the nurse and they can help
                </li>
                <li>• Once you're more awake, you'll see your parents</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
              <h4 className="text-lg font-bold text-yellow-900 mb-2">
                ❓ Questions You Might Have
              </h4>
              <div className="space-y-3 text-yellow-800">
                <div>
                  <p className="font-bold">Will it hurt?</p>
                  <p>
                    Not during the operation - you'll be asleep! Afterwards, you
                    might feel sore, but you'll get medicine for pain.
                  </p>
                </div>
                <div>
                  <p className="font-bold">What if I wake up during it?</p>
                  <p>
                    This almost never happens. The anaesthetist watches you very
                    carefully the whole time.
                  </p>
                </div>
                <div>
                  <p className="font-bold">Can I bring my teddy bear?</p>
                  <p>
                    Yes! Many hospitals let you bring a special toy to the
                    operating theatre entrance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/explainers" className="btn btn-primary">
              Back to Explainers
            </Link>
            <Link to="/" className="btn btn-secondary">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
