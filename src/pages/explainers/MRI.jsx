// MRI.jsx
// Purpose: Explain MRI scanner in child-friendly way (FR-5)

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MRI() {
  useEffect(() => {
    document.title = "MRI Scanner — Children's Hospital Portal";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🔬 MRI Scanner
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            A special camera that takes pictures inside your body
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                What is an MRI?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                An MRI (Magnetic Resonance Imaging) is like a really smart
                camera that can take pictures of the inside of your body without
                cutting you open! It uses magnets and radio waves (kind of like
                the radio in a car) to create detailed pictures.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <h4 className="text-lg font-bold text-blue-900 mb-2">
                🎵 It's Noisy!
              </h4>
              <p className="text-blue-800">
                The MRI machine makes loud knocking and buzzing sounds - like a
                very loud washing machine! Don't worry, this is totally normal.
                You'll get special headphones or earplugs to protect your ears.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                What Happens During an MRI?
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">1.</span>
                  <span>
                    You'll lie down on a special bed that slides into a big tube
                    (like a tunnel).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">2.</span>
                  <span>
                    You need to stay very still so the pictures come out clear -
                    just like when you take a regular photo!
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">3.</span>
                  <span>
                    The scan can take 15 to 45 minutes depending on which
                    pictures the doctor needs.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">4.</span>
                  <span>
                    You can't bring metal objects (like jewelry) because the MRI
                    uses strong magnets.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-indigo-600">5.</span>
                  <span>
                    When it's done, you can go right back to your room or home!
                  </span>
                </li>
              </ol>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <h4 className="text-lg font-bold text-green-900 mb-2">
                💪 Tips to Make It Easier
              </h4>
              <ul className="space-y-2 text-green-800">
                <li>• Think of it like lying in a cozy cave or spaceship</li>
                <li>• Practice lying still at home before your scan</li>
                <li>
                  • Some hospitals let you listen to music or watch movies!
                </li>
                <li>
                  • Remember: the staff can see and hear you the whole time
                </li>
                <li>• You can ask questions before you go in</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Will It Hurt?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-bold text-green-600">No!</span> An MRI
                doesn't hurt at all. You won't feel the magnets or radio waves.
                The only hard part is staying still and dealing with the noise.
                Some kids even fall asleep during the scan!
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
              <h4 className="text-lg font-bold text-yellow-900 mb-2">
                ❓ Questions You Can Ask
              </h4>
              <ul className="space-y-1 text-yellow-800">
                <li>• "How long will my scan take?"</li>
                <li>• "Can my parent stay with me?"</li>
                <li>• "Can I bring a stuffed animal?"</li>
                <li>• "What kind of music can I listen to?"</li>
              </ul>
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
