// Playroom.jsx
// Purpose: Explain play areas in child-friendly way (FR-5)

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Playroom() {
  useEffect(() => {
    document.title = "Play Areas — Children's Hospital Portal";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🎨 Play Areas
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Fun places to play and do activities
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                What is the Playroom?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The playroom is a special room in the hospital just for kids
                like you! It's filled with toys, games, books, and art supplies.
                It's a place where you can have fun, make friends, and forget
                about being in the hospital for a while.
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-4 border-2 border-pink-200">
              <h4 className="text-lg font-bold text-pink-900 mb-2">
                🎮 What Can You Do?
              </h4>
              <div className="grid md:grid-cols-2 gap-3 text-pink-800">
                <div>• Play board games</div>
                <div>• Draw and color</div>
                <div>• Read books</div>
                <div>• Build with blocks</div>
                <div>• Watch movies</div>
                <div>• Play video games</div>
                <div>• Do crafts</div>
                <div>• Listen to music</div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Who Works There?
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex gap-3">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <p className="font-bold">Child Life Specialists</p>
                    <p>
                      Special staff who help kids feel comfortable in the
                      hospital through play and activities
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-bold">Play Therapists</p>
                    <p>
                      Help you understand and cope with hospital experiences
                      through games and creative activities
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">🤹</span>
                  <div>
                    <p className="font-bold">Volunteers</p>
                    <p>
                      Friendly people who come to play games, read stories, or
                      do activities with you
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
              <h4 className="text-lg font-bold text-yellow-900 mb-2">
                ⏰ When Can You Visit?
              </h4>
              <p className="text-yellow-800 mb-2">
                Most playrooms are open during the day, but you need to check
                with your nurse first. They'll make sure:
              </p>
              <ul className="space-y-1 text-yellow-800">
                <li>✓ You're feeling well enough to go</li>
                <li>✓ You don't have any treatments scheduled</li>
                <li>✓ It's safe for you to be around other children</li>
                <li>
                  ✓ You have any equipment you might need (like your IV pole)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Special Activities
              </h3>
              <p className="text-gray-700 mb-3">
                Many playrooms have special events throughout the week:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="font-bold text-blue-900">
                    🎪 Visits from Performers
                  </p>
                  <p className="text-blue-800 text-sm">
                    Magicians, musicians, clowns
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="font-bold text-green-900">
                    🎂 Birthday Celebrations
                  </p>
                  <p className="text-green-800 text-sm">
                    Cake and parties for kids
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <p className="font-bold text-purple-900">🐕 Therapy Dogs</p>
                  <p className="text-purple-800 text-sm">
                    Friendly dogs to pet and play with
                  </p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <p className="font-bold text-orange-900">🎬 Movie Nights</p>
                  <p className="text-orange-800 text-sm">
                    Watch movies with other kids
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200">
              <h4 className="text-lg font-bold text-indigo-900 mb-2">
                📏 Playroom Rules
              </h4>
              <ul className="space-y-2 text-indigo-800">
                <li>• Be kind and share toys with others</li>
                <li>• Clean up when you're done playing</li>
                <li>• Use gentle hands - no throwing or breaking toys</li>
                <li>• Wash your hands before and after playing</li>
                <li>• Tell staff if you don't feel well</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <h4 className="text-lg font-bold text-green-900 mb-2">
                🏠 Bedside Play
              </h4>
              <p className="text-green-800 mb-2">
                Can't make it to the playroom? No problem! Play staff can bring
                activities to your room:
              </p>
              <ul className="space-y-1 text-green-800">
                <li>• Coloring books and crayons</li>
                <li>• Tablets with games and movies</li>
                <li>• Books and puzzles</li>
                <li>• Craft kits</li>
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
