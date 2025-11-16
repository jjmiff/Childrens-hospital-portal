// XRay.jsx
// Purpose: Explain X-Ray imaging in child-friendly way (FR-5)

import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import ContentSection from "../../components/ContentSection";

export default function XRay() {
  useEffect(() => {
    document.title = "X-Ray — Children's Hospital Portal";
  }, []);

  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              <span aria-hidden="true">📷</span> X-Ray Room
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              Special photos that show your bones!
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  What is an X-Ray?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  An X-ray is a special type of picture that can see through
                  your skin and muscles to show your bones! It's like having
                  superhero vision, but it's a machine doing the work instead of
                  you.
                </p>
              </div>

              <ContentSection
                bgColor="bg-indigo-50"
                borderColor="border-indigo-200"
              >
                <h4 className="text-base md:text-lg font-bold text-indigo-900 mb-2">
                  <span aria-hidden="true">🦴</span> Why Bones Show Up
                </h4>
                <p className="text-indigo-800">
                  X-rays are a special kind of light that can go through soft
                  things (like your skin) but not hard things (like your bones).
                  That's why bones look white in the pictures - they block the
                  X-ray light!
                </p>
              </ContentSection>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  What Happens During an X-Ray?
                </h3>
                <ol className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">1.</span>
                    <span>
                      You'll stand, sit, or lie down depending on which part of
                      your body needs the picture.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">2.</span>
                    <span>
                      The X-ray technician might put a heavy apron on you - it
                      protects the rest of your body.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">3.</span>
                    <span>
                      You need to hold very still for a few seconds - like
                      playing freeze tag!
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">4.</span>
                    <span>
                      The technician will step behind a window and the machine
                      goes "click" - that's it!
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-indigo-600">5.</span>
                    <span>
                      The whole thing usually takes less than 5 minutes.
                    </span>
                  </li>
                </ol>
              </div>

              <ContentSection
                bgColor="bg-green-50"
                borderColor="border-green-200"
              >
                <h4 className="text-base md:text-lg font-bold text-green-900 mb-2">
                  <span aria-hidden="true">✨</span> Cool Facts About X-Rays
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-green-800">
                  <li>
                    • X-rays were discovered by accident over 100 years ago!
                  </li>
                  <li>
                    • They're super fast - each picture takes less than 1 second
                  </li>
                  <li>• You can't see or feel X-rays - they're invisible!</li>
                  <li>• Dentists use X-rays to look at your teeth too</li>
                  <li>• X-rays help doctors see if a bone is broken</li>
                </ul>
              </ContentSection>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Will It Hurt?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-green-600">No!</span> Getting
                  an X-ray doesn't hurt at all. You won't feel anything when the
                  picture is taken. The only tricky part might be holding still
                  or staying in one position if you have an injury, but the
                  technician will help make you comfortable.
                </p>
              </div>

              <ContentSection
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
              >
                <h4 className="text-base md:text-lg font-bold text-blue-900 mb-2">
                  <span aria-hidden="true">🤔</span> Good Questions to Ask
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-blue-800">
                  <li>• "Which part of my body will you X-ray?"</li>
                  <li>• "Can I see the picture after?"</li>
                  <li>• "Will I need to change my clothes?"</li>
                  <li>• "How long do I need to stay still?"</li>
                </ul>
              </ContentSection>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
              <Link
                to="/explainers"
                className="btn btn-primary py-2.5 px-5 md:py-3 md:px-6 text-sm md:text-base"
              >
                Back to Explainers
              </Link>
              <Link
                to="/"
                className="btn btn-secondary py-2.5 px-5 md:py-3 md:px-6 text-sm md:text-base"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
