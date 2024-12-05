import { useState, useRef } from "react";
import { useRouter } from "next/router";
import ReusableHandler from "../../../components/ReusableHandler/ReusableHandler";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../lib/getMessages";
import Dashboard from "../dashboard";
import DashboardLayout from "../layout";

export default function ColoringPage() {
  const [messages, setMessages] = useState([
    {
      text: "Welcome! I’m here to help you with Hanzi Coloring. Select a curriculum, grade, semester, and word type to get started!",
      sender: "bot",
    },
  ]);
  const [selectedWord, setSelectedWord] = useState(null);
  const router = useRouter();
  const cleanedPath = router.asPath.replace(/\/$/, ""); // Remove trailing slashhhhhh

  const coloringRef = useRef(null);

  const t = useTranslations("strokeOrder");

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSelectWord = (word) => {
    setSelectedWord(word);
    addMessage(`Displaying coloring outline for "${word.name}".`, "bot");
    setTimeout(() => {
      coloringRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <DashboardLayout>
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
        <ReusableHandler t={t} handleFunc={handleSelectWord} />

        {selectedWord && (
          <div
            ref={coloringRef}
            className="w-full max-w-2xl mt-10 flex justify-center"
          >
            <button
              onClick={() =>
                router.push(`${cleanedPath}/download/${selectedWord.name}`)
              }
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
            >
              Download Coloring Page for "{selectedWord.name}"
            </button>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
export const getServerSideProps = withMessages("strokeOrder");
