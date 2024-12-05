import { useState, useRef } from "react";
import { useRouter } from "next/router";
import ReusableHandler from "../../../components/ReusableHandler/ReusableHandler";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../lib/getMessages";
import Dashboard from "../dashboard";
import CollapsibleNotificationPanel from "../../../components/notificationPenal/CollapsibleNotificationPanel";
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
  const cleanedPath = router.asPath.replace(/\/$/, ""); // Remove trailing slash

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
      <CollapsibleNotificationPanel
        initialCollapsed={true} // Start collapsed
        messages={messages} // Pass messages
        title={t("notificationTitle")} // Localized title
        onToggle={(isCollapsed) =>
          console.log("Notification panel toggled:", isCollapsed)
        } // Optional toggle handler
      />

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
