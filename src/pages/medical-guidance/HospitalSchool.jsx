// HospitalSchool.jsx
// Purpose: Medical guidance about hospital school services
// Age-appropriate information about continuing education during hospital stays

import { Link } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import ContentSection from "../../components/ContentSection";

export default function HospitalSchool() {
  return (
    <AnimatedPage>
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 sm:py-12 px-4 rounded-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
            <div className="space-y-6 md:space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="text-5xl md:text-6xl mb-4" aria-hidden="true">
                  📚
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Hospital School
                </h1>
                <p className="text-lg text-gray-600">
                  You can keep learning even when you're in hospital! Here's how
                  it works.
                </p>
              </div>

              {/* What is Hospital School? */}
              <ContentSection
                bgColor="bg-green-50"
                borderColor="border-green-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  🏫 What is Hospital School?
                </h2>
                <p className="text-gray-700 mb-4">
                  Hospital school is a special classroom right here in the
                  hospital! It's a place where you can keep up with your
                  schoolwork, learn new things, and have fun while you're
                  getting better.
                </p>
                <p className="text-gray-700">
                  The teachers are specially trained to work with children who
                  are unwell. They understand that some days you might feel
                  great and some days you might need to rest.
                </p>
              </ContentSection>

              {/* Why Go to Hospital School? */}
              <ContentSection
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  💡 Why Go to Hospital School?
                </h2>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3">📖</span>
                    <span>
                      <strong>Keep learning:</strong> You won't fall behind with
                      your schoolwork
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">👫</span>
                    <span>
                      <strong>Meet other children:</strong> Make friends with
                      other kids in the hospital
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🎨</span>
                    <span>
                      <strong>Have fun:</strong> Learning can be fun! There are
                      art projects, science experiments, and interesting stories
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🧠</span>
                    <span>
                      <strong>Stay sharp:</strong> Keeping your brain active
                      helps you feel better
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">⏰</span>
                    <span>
                      <strong>Pass the time:</strong> Hospital days can feel
                      long - school helps time go faster!
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">😊</span>
                    <span>
                      <strong>Feel normal:</strong> Doing schoolwork can help
                      you feel more like yourself
                    </span>
                  </li>
                </ul>
              </ContentSection>

              {/* What Happens in Hospital School? */}
              <ContentSection
                bgColor="bg-purple-50"
                borderColor="border-purple-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  🎒 What Happens in Hospital School?
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Regular Lessons:
                    </h3>
                    <p className="text-gray-700">
                      The hospital teachers will help you with reading, writing,
                      math, and other subjects. They can follow what your
                      regular school is doing, so you don't miss important
                      lessons.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Special Projects:
                    </h3>
                    <p className="text-gray-700">
                      You might do art projects, science experiments, creative
                      writing, or even coding! Hospital school often has fun
                      activities you don't get at regular school.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      One-on-One or Small Groups:
                    </h3>
                    <p className="text-gray-700">
                      Classes are much smaller than regular school. Sometimes
                      you might work alone with a teacher, or in a tiny group of
                      2-3 children. This means you get lots of help!
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Flexible Schedule:
                    </h3>
                    <p className="text-gray-700">
                      If you have medical appointments, tests, or just don't
                      feel well enough, that's totally okay! You can do
                      schoolwork when you're feeling up to it.
                    </p>
                  </div>
                </div>
              </ContentSection>

              {/* Where Does It Happen? */}
              <ContentSection
                bgColor="bg-yellow-50"
                borderColor="border-yellow-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  📍 Where Does It Happen?
                </h2>
                <p className="text-gray-700 mb-4">
                  Hospital school can happen in different places depending on
                  how you're feeling:
                </p>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3">🏫</span>
                    <span>
                      <strong>The classroom:</strong> There's usually a special
                      hospital school room with desks, books, computers, and art
                      supplies
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🛏️</span>
                    <span>
                      <strong>Your bed:</strong> If you can't get up, the
                      teacher can bring work to you on the ward
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🎮</span>
                    <span>
                      <strong>The playroom:</strong> Sometimes lessons happen in
                      the hospital playroom where it's more relaxed
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">💻</span>
                    <span>
                      <strong>Online:</strong> Some hospitals offer online
                      lessons through tablets or computers
                    </span>
                  </li>
                </ul>
              </ContentSection>

              {/* What Do I Need? */}
              <ContentSection
                bgColor="bg-pink-50"
                borderColor="border-pink-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  🎒 What Do I Need to Bring?
                </h2>
                <p className="text-gray-700 mb-4">
                  You don't need much! The hospital school has most supplies.
                  But you might want to bring:
                </p>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">✏️</span>
                    <span>Your favorite pens or pencils</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📔</span>
                    <span>Any homework or books from your regular school</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💻</span>
                    <span>
                      A tablet or laptop if you have one (check with staff
                      first!)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📚</span>
                    <span>Your reading book or anything you're working on</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4 font-semibold">
                  The hospital teacher will contact your regular school to find
                  out what you're learning, so you stay on track! 📞
                </p>
              </ContentSection>

              {/* Different Types of Learning */}
              <ContentSection
                bgColor="bg-orange-50"
                borderColor="border-orange-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  🌈 Different Ways to Learn
                </h2>
                <p className="text-gray-700 mb-4">
                  Hospital school understands that everyone learns differently:
                </p>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3">📝</span>
                    <span>
                      <strong>Written work:</strong> Worksheets, writing
                      stories, solving problems
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🎨</span>
                    <span>
                      <strong>Creative projects:</strong> Drawing, painting,
                      making models
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">💬</span>
                    <span>
                      <strong>Talking and discussing:</strong> Chatting about
                      topics, asking questions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🎮</span>
                    <span>
                      <strong>Games and activities:</strong> Educational games
                      on tablets or computers
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">📺</span>
                    <span>
                      <strong>Videos and documentaries:</strong> Watching
                      educational content
                    </span>
                  </li>
                </ul>
              </ContentSection>

              {/* What If I Don't Feel Well Enough? */}
              <ContentSection bgColor="bg-red-50" borderColor="border-red-200">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 text-center">
                  🤒 What If I Don't Feel Well Enough?
                </h3>
                <p className="text-gray-700 text-center mb-3">
                  That's completely okay! Hospital school is flexible:
                </p>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✅</span>
                    <span>
                      You can do as much or as little as you feel able to
                    </span>
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✅</span>
                    <span>
                      Lessons can be really short - even 10 minutes is great!
                    </span>
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✅</span>
                    <span>
                      You can skip days when you're having treatment or feeling
                      poorly
                    </span>
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✅</span>
                    <span>
                      There's no pressure - your health comes first! 💚
                    </span>
                  </li>
                </ul>
              </ContentSection>

              {/* Tips for Hospital School */}
              <ContentSection
                bgColor="bg-teal-50"
                borderColor="border-teal-200"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  ⭐ Tips for Hospital School
                </h2>
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3">💬</span>
                    <span>
                      <strong>Tell the teacher how you're feeling</strong> -
                      they'll adjust lessons to suit you
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">❓</span>
                    <span>
                      <strong>Ask questions</strong> - hospital teachers love
                      curious students!
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🎯</span>
                    <span>
                      <strong>Do your best</strong> - but remember, it's okay if
                      you can't do as much as normal
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">👫</span>
                    <span>
                      <strong>Make friends</strong> - other children in hospital
                      school understand what you're going through
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">🌟</span>
                    <span>
                      <strong>Try to enjoy it</strong> - learning can take your
                      mind off being in hospital!
                    </span>
                  </li>
                </ul>
              </ContentSection>

              {/* Fun Fact */}
              <ContentSection
                bgColor="bg-indigo-50"
                borderColor="border-indigo-200"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 text-center">
                  🎓 Did You Know?
                </h3>
                <p className="text-gray-700 text-center">
                  Many famous people kept up with their education while in
                  hospital as children! Some even say it helped them become
                  successful because they learned to be strong and determined.
                  You're doing great! 🌟
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
