import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl"; // Importing the translations hook

import { withMessages } from "../../../lib/getMessages";
import ReusableHandler from "../../../components/ReusableHandler/ReusableHandler";

export default function StrokeOrders() {
  const t = useTranslations("strokeOrder"); // Access translations for strokeOrders page
  const [messages, setMessages] = useState([
    {
      text: t("welcomeMessage"),
      sender: "bot",
    },
  ]);

  const [selectedWord, setSelectedWord] = useState(null);
  const router = useRouter();
  const cleanedPath = router.asPath.replace(/\/$/, ""); // Remove trailing slash
  const strokeRef = useRef(null);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleGetStroke = (word) => {
    setSelectedWord(word);
    addMessage(t("getStrokeButton").replace("{word}", word.name), "bot");
    setTimeout(() => {
      strokeRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 flex flex-col items-center overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-md w-full fixed top-0 z-20 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            {t("headerTitle")}
          </h1>
        </div>
      </header>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="circle1 animate-bounce-slow"></div>
        <div className="circle2 animate-bounce-slow"></div>
        <div className="circle3 animate-bounce-slow"></div>
        <div className="star1 animate-spin-slow">⭐</div>
        <div className="star2 animate-spin-slow">⭐</div>
        <div className="star3 animate-spin-slow">⭐</div>
        <div className="triangle1"></div>
        <div className="triangle2"></div>
        <div className="chinese-word1">汉</div>
        <div className="chinese-word2">字</div>
      </div>

      {/* Modern Notification Panel */}
      <div className="fixed top-24 right-8 w-72 max-w-full bg-white rounded-3xl shadow-lg p-4 z-30 transition-transform transform duration-500 ease-in-out">
        <h3 className="text-lg font-semibold text-purple-600 mb-2">
          {t("notificationTitle")}
        </h3>
        <div className="overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-purple-300">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 mb-2 rounded-lg shadow-md text-purple-800 text-sm ${
                msg.sender === "bot"
                  ? "bg-gradient-to-r from-purple-100 to-purple-200"
                  : "bg-gradient-to-r from-blue-100 to-blue-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-32 mt-16 relative z-10 flex flex-col items-center">
        <ReusableHandler handleFunc={handleGetStroke} t={t} />
        {/* Stroke Order Display */}
        {selectedWord && (
          <div
            ref={strokeRef}
            className="w-full max-w-2xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-3xl shadow-lg mt-10 flex justify-center"
          >
            <button
              onClick={() =>
                router.push(`${cleanedPath}/practice/${selectedWord.name}`)
              }
              className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              {t("getStrokeButton", { word: selectedWord.name })}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
export const getServerSideProps = withMessages("strokeOrder");
