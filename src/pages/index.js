import { useRouter } from "next/router";
import Header from "../components/Header";
import Template from "../components/Template";

export default function HomePage() {
  const router = useRouter();

  return (
    <Template>
      {/* Hero Section */}
      <div className="relative flex flex-col items-center overflow-hidden">
        <main className="container mx-auto px-6 pt-32 text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12 transition duration-500 hover:shadow-2xl transform hover:scale-105 relative overflow-hidden">
            <h2 className="text-5xl font-extrabold text-[#7E57C2] mb-8">
              Welcome to Chinese Literacy AI
            </h2>
            <p className="text-gray-600 text-xl mb-10">
              Explore interactive lessons and master the art of Chinese
              characters. Our curriculum is designed to make learning fun and
              effective for everyone!
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex justify-center gap-8 mb-10">
              <button
                onClick={() => router.push("/auth")}
                className="px-8 py-4 bg-[#42A5F5] text-white font-semibold rounded-full hover:bg-[#1E88E5] transition duration-300"
              >
                Login or Sign Up
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-8 py-4 bg-[#FFCA28] text-gray-900 font-semibold rounded-full hover:bg-[#FFB300] transition duration-300"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </main>

        {/* About Section */}
        <section className="container mx-auto px-6 py-24 text-center">
          <h3 className="text-4xl font-bold text-[#7E57C2] mb-8">
            About Chinese Literacy AI
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our platform provides engaging, interactive learning experiences
            that make mastering Chinese characters enjoyable for students of all
            ages.
          </p>
        </section>

        {/* Pricing Plan Section */}
        <section className="container mx-auto px-6 py-20 text-center relative z-20">
          <h3 className="text-4xl font-bold text-purple-700 mb-12">
            Choose Your Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Free Plan */}
            <div className="relative bg-gradient-to-b from-blue-100 to-blue-200 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-visible">
              <h4 className="text-3xl font-bold text-blue-600 mb-4">Free</h4>
              <p className="text-gray-700 mb-4">5 credits</p>
              <p className="text-sm text-gray-500 mb-6">
                = 25 stroke orders, 12 coloring pages, 8 stories
              </p>
              <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                Get Started
              </button>
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-4xl shadow-lg">
                🎉
              </div>
            </div>

            {/* 25 Credits Plan */}
            <div className="relative bg-gradient-to-b from-green-100 to-green-200 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-visible">
              <h4 className="text-3xl font-bold text-green-600 mb-4">
                25 Credits
              </h4>
              <p className="text-gray-700 mb-4">NT$250</p>
              <p className="text-sm text-gray-500 mb-6">
                = 70 stroke orders, 35 coloring pages, 23 stories
              </p>
              <button className="mt-4 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
                Buy Now
              </button>
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-4xl shadow-lg">
                ⭐
              </div>
            </div>

            {/* 70 Credits Plan */}
            <div className="relative bg-gradient-to-b from-red-100 to-red-200 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-visible">
              <h4 className="text-3xl font-bold text-red-600 mb-4">
                70 Credits
              </h4>
              <p className="text-gray-700 mb-4">NT$490</p>
              <p className="text-sm text-gray-500 mb-6">
                = 200 stroke orders, 100 coloring pages, 67 stories
              </p>
              <button className="mt-4 bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-700 transition">
                Buy Now
              </button>
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center text-4xl shadow-lg">
                🌟
              </div>
            </div>

            {/* 200 Credits Plan */}
            <div className="relative bg-gradient-to-b from-purple-100 to-purple-200 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-visible">
              <h4 className="text-3xl font-bold text-purple-600 mb-4">
                200 Credits
              </h4>
              <p className="text-gray-700 mb-4">NT$999</p>
              <p className="text-sm text-gray-500 mb-6">
                = 500 stroke orders, 250 coloring pages, 150 stories
              </p>
              <button className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
                Buy Now
              </button>
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-4xl shadow-lg">
                🚀
              </div>
            </div>
          </div>
        </section>
      </div>
    </Template>
  );
}
