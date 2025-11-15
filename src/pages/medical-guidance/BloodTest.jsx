// BloodTest.jsx
// Purpose: Medical guidance for children having blood tests
// Age-appropriate explanation of what happens during blood tests

import { Link } from "react-router-dom";

export default function BloodTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="text-6xl mb-4">💉</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Having a Blood Test
              </h1>
              <p className="text-lg text-gray-600">
                Blood tests help doctors check how your body is doing. Here's
                what to expect!
              </p>
            </div>

            {/* What is a Blood Test? */}
            <section className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🩸 What is a Blood Test?
              </h2>
              <p className="text-gray-700 mb-4">
                A blood test is when a nurse or doctor takes a tiny bit of blood
                from your body. They send it to a special lab where scientists
                look at it under microscopes to check it's healthy.
              </p>
              <p className="text-gray-700">
                Your blood can tell doctors lots of important things, like if
                you need more iron, if you're fighting an infection, or if your
                medicine is working properly.
              </p>
            </section>

            {/* What Will Happen? */}
            <section className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📋 What Will Happen?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">1️⃣</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Sitting Down
                    </h3>
                    <p className="text-gray-700">
                      You'll sit in a comfy chair or lie on a bed. The nurse
                      will ask you to roll up your sleeve.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-3">2️⃣</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Finding a Vein
                    </h3>
                    <p className="text-gray-700">
                      The nurse will look for a small tube in your arm called a
                      vein. They might put a soft band around your arm - this
                      helps them see the vein better.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-3">3️⃣</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Cleaning the Area
                    </h3>
                    <p className="text-gray-700">
                      They'll wipe your skin with a cold wipe to make sure it's
                      really clean.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-3">4️⃣</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Taking the Blood
                    </h3>
                    <p className="text-gray-700">
                      The nurse will use a very thin needle to take a small
                      amount of blood. It might feel like a little pinch or a
                      quick sharp scratch, but it only takes a few seconds!
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-3">5️⃣</span>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">All Done!</h3>
                    <p className="text-gray-700">
                      The nurse will put a small plaster on your arm, and you're
                      finished! You might get a sticker for being brave. 🌟
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips to Make It Easier */}
            <section className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                💪 Tips to Make It Easier
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3">🌟</span>
                  <span>
                    <strong>Look away:</strong> You don't have to watch! Look at
                    a picture on the wall or chat to your parent.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">😮‍💨</span>
                  <span>
                    <strong>Take deep breaths:</strong> Breathe in slowly
                    through your nose and out through your mouth. This helps you
                    relax.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">🧸</span>
                  <span>
                    <strong>Bring a comfort item:</strong> You can hold your
                    favorite toy or squeeze someone's hand.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">💬</span>
                  <span>
                    <strong>Tell the nurse:</strong> If you're worried, tell the
                    nurse! They're really kind and can help you feel better.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">🎵</span>
                  <span>
                    <strong>Listen to music:</strong> Bring headphones and
                    listen to your favorite song to distract yourself.
                  </span>
                </li>
              </ul>
            </section>

            {/* After the Blood Test */}
            <section className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ⏰ After the Blood Test
              </h2>
              <p className="text-gray-700 mb-4">
                After your blood test, you should:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Keep the plaster on for a few hours</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Tell an adult if your arm feels sore or bruised</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>
                    Drink some water and have a snack if you feel a bit wobbly
                  </span>
                </li>
              </ul>
              <p className="text-gray-700">
                The results usually take a day or two to come back from the lab.
                Your doctor will let you know what they find out.
              </p>
            </section>

            {/* Did You Know? */}
            <section className="bg-yellow-100 rounded-2xl p-6 border-2 border-yellow-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                🔬 Did You Know?
              </h3>
              <p className="text-gray-700 text-center">
                Your body makes new blood all the time! The tiny bit taken for
                the test gets replaced super quickly - your body is amazing at
                fixing itself. 🌟
              </p>
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
