import { useState, useEffect, useRef } from "react";
import wordData from "../../data/wordData";
import HanziColoring from "../../components/HanziColoring";
import html2canvas from "html2canvas";
import HanziWriter from "hanzi-writer";
import { useRouter } from "next/router";

export default function ColoringPage() {
  const [messages, setMessages] = useState([
    {
      text: "Welcome! I’m here to help you with Hanzi Coloring. Select a curriculum, grade, semester, and word type to get started!",
      sender: "bot",
    },
  ]);
  const [curriculum, setCurriculum] = useState("");
  const [grade, setGrade] = useState("");
  const [semester, setSemester] = useState("");
  const [wordType, setWordType] = useState("");
  const [wordList, setWordList] = useState([]);
  const router = useRouter();

  const [selectedWord, setSelectedWord] = useState(null);
  const coloringRef = useRef(null);
  const coloringContainerRef = useRef(null);
  const downloadTargetRef = useRef(null);

  useEffect(() => {
    if (curriculum && grade && semester && wordType) {
      const words = wordData[curriculum]?.[grade]?.[semester]?.[wordType];
      setWordList(words || []);
      addMessage(
        `Here are the available words for ${grade} - ${semester} (${wordType}). Click a word to start coloring.`,
        "bot"
      );
    }
  }, [curriculum, grade, semester, wordType]);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSelectWord = (word) => {
    setSelectedWord(word);
    addMessage(`Displaying coloring outline for "${word}".`, "bot");
    setTimeout(() => {
      coloringRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // const handleDownload = async () => {
  //   if (coloringContainerRef.current) {
  //     const canvas = await html2canvas(coloringContainerRef.current);
  //     const link = document.createElement("a");
  //     link.download = `${selectedWord}_coloring.png`;
  //     link.href = canvas.toDataURL("image/png");
  //     link.click();
  //   }
  // };

  const handleDownload = async () => {
    if (selectedWord) {
      // Draw the outline in the hidden download container
      // Capture the hidden outline-only div
      drawOutlineOnly();
      const downloadDiv = document.getElementById("download-target-div");
      if (downloadDiv) {
        const canvas = await html2canvas(downloadDiv);
        const link = document.createElement("a");
        link.download = `${selectedWord}_coloring.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 flex flex-col items-center overflow-hidden">
      <header className="bg-white shadow-md w-full fixed top-0 z-20 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            Hanzi Coloring Page
          </h1>
        </div>
      </header>

      <div className="fixed top-24 right-8 w-72 max-w-full bg-white rounded-3xl shadow-lg p-4 z-30">
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

      <main className="container mx-auto px-6 py-32 mt-16 relative z-10 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-4">
          <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-4">
            Select Options for Coloring
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

          <div className="mt-6 flex flex-col gap-2">
            <div className="font-bold text-lg text-purple-700">
              Available Words:
            </div>
            {wordList.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 text-blue-600">
                {wordList.map((word, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectWord(word)}
                    className="cursor-pointer text-center bg-gradient-to-br from-purple-200 to-blue-300 p-2 rounded-full hover:shadow-lg transition-transform transform hover:scale-105 text-lg font-semibold"
                  >
                    {word}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Select a curriculum, grade, semester, and word type to start
                coloring.
              </p>
            )}
          </div>
        </div>

        {selectedWord && (
          <div
            ref={coloringRef}
            className="w-full max-w-2xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-3xl shadow-lg mt-10"
          >
            <h3 className="text-center text-2xl font-bold text-purple-600 mb-4">
              Coloring Outline for "{selectedWord}"
            </h3>
            <div className="flex justify-center" ref={coloringContainerRef}>
              <HanziColoring word={selectedWord} />
              <div
                ref={downloadTargetRef}
                id="download-target-div"
                className="hidden"
              />
            </div>
            <button
              onClick={() => router.push(`/download/${selectedWord}`)}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
            >
              Download Coloring Page
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
