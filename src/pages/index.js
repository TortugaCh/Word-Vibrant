// src/pages/index.js
import { useRouter } from "next/router";
import Header from "../components/Header";
import Template from "../components/Template";

export default function HomePage() {
  const router = useRouter();

  return (
    <Template>
      <div className="bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen relative overflow-hidden">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <main className="container mx-auto px-6 pt-20 text-center relative z-10">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-10 transition duration-500 hover:shadow-xl transform hover:scale-105">
            <h2 className="text-5xl font-extrabold text-purple-700 mb-6">
              Welcome to Chinese Literacy AI
            </h2>
            <p className="text-gray-700 text-xl mb-10">
              Explore interactive lessons and master the art of Chinese
              characters. Our curriculum is designed to make learning fun and
              effective for everyone!
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex justify-center gap-8">
              <button
                onClick={() => router.push("/auth")}
                className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-800 transition duration-300"
              >
                Login or Sign Up
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    </Template>
  );
}
