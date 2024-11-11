// src/pages/strokeOrders/index.js
import { useState, useEffect, useRef } from "react";
import wordData from "../../data/wordData";
import HanziStroke from "../../components/HanziStroke/HanziStroke";
import { useRouter } from "next/router";

export default function StrokeOrders() {
  const [messages, setMessages] = useState([
    {
      text: "Welcome! I’m here to help you with Hanzi Stroke Orders. Select a curriculum, grade, semester, and word type to get started!",
      sender: "bot",
    },
  ]);
  const [curriculum, setCurriculum] = useState("");
  const [grade, setGrade] = useState("");
  const [semester, setSemester] = useState("");
  const [wordType, setWordType] = useState("");
  const [wordList, setWordList] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const router = useRouter();
  const strokeRef = useRef(null);

  useEffect(() => {
    if (curriculum && grade && semester && wordType) {
      const words = wordData[curriculum]?.[grade]?.[semester]?.[wordType];
      setWordList(words || []);
      addMessage(
        `Here are the available words for ${grade} - ${semester} (${wordType}). Click a word to view its stroke order.`,
        "bot"
      );
    }
  }, [curriculum, grade, semester, wordType]);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleGetStroke = (word) => {
    setSelectedWord(word);
    addMessage(`Displaying stroke order for "${word}".`, "bot");
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
            Stroke Order Chatbot
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
          Notifications
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
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-4">
          <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-4">
            Select Options for Stroke Order
          </h2>
          <div className="flex flex-col gap-4">
            <select
              onChange={(e) => setCurriculum(e.target.value)}
              className="p-3 rounded-full border border-purple-300 shadow-sm focus:outline-none focus:border-purple-500 transition"
            >
              <option value="">Select Curriculum</option>
              {Object.keys(wordData).map((curriculum) => (
                <option key={curriculum} value={curriculum}>
                  {curriculum}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setGrade(e.target.value)}
              className="p-3 rounded-full border border-purple-300 shadow-sm focus:outline-none focus:border-purple-500 transition"
            >
              <option value="">Select Grade</option>
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i} value={`Grade ${i + 1}`}>
                  {`Grade ${i + 1}`}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSemester(e.target.value)}
              className="p-3 rounded-full border border-purple-300 shadow-sm focus:outline-none focus:border-purple-500 transition"
            >
              <option value="">Select Semester</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
            </select>
            <select
              onChange={(e) => setWordType(e.target.value)}
              className="p-3 rounded-full border border-purple-300 shadow-sm focus:outline-none focus:border-purple-500 transition"
            >
              <option value="">Select Word Type</option>
              <option value="New Words">New Words</option>
              <option value="Sight Words">Sight Words</option>
            </select>
          </div>

          {/* Word Grid */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="font-bold text-lg text-purple-700">
              Available Words:
            </div>
            {wordList.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 text-blue-600">
                {wordList.map((word, index) => (
                  <div
                    key={index}
                    onClick={() => handleGetStroke(word)}
                    className="cursor-pointer text-center bg-gradient-to-br from-purple-200 to-blue-300 p-2 rounded-full hover:shadow-lg transition-transform transform hover:scale-105 text-lg font-semibold"
                  >
                    {word}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Select a curriculum, grade, semester, and word type to get
                stroke.
              </p>
            )}
          </div>
        </div>

        {/* Stroke Order Display */}
        {selectedWord && (
          <div
            ref={strokeRef}
            className="w-full max-w-2xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-3xl shadow-lg mt-10 flex justify-center"
          >
            <button
              onClick={() =>
                router.push(`/strokeOrders/practice/${selectedWord}`)
              }
              className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Get Stroke For {selectedWord}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
