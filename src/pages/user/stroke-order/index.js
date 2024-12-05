import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl"; // Importing the translations hook
import { DollarCircleOutlined } from "@ant-design/icons";
import { withMessages } from "../../../lib/getMessages";
import ReusableHandler from "../../../components/ReusableHandler/ReusableHandler";
import CollapsibleNotificationPanel from "../../../components/notificationPenal/CollapsibleNotificationPanel";
import DashboardLayout from "../layout";

export default function StrokeOrders() {
  const t = useTranslations("strokeOrder"); // Access translations for strokeOrders page
  const [messages, setMessages] = useState([
    {
      text: t("welcomeMessage"),
      sender: "bot",
    },
  ]);

  const [selectedWord, setSelectedWord] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true); // Collapsible state
  const router = useRouter();
  const cleanedPath = router.asPath.replace(/\/$/, ""); // Remove trailing slash
  const strokeRef = useRef(null);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleGetStroke = (word) => {
    setSelectedWord(word);
    addMessage(t("getStrokeButton", { word: word.name }), "bot");

    setTimeout(() => {
      strokeRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <DashboardLayout>
      {/* Collapsible Notification Panel */}
      <CollapsibleNotificationPanel
        initialCollapsed={true} // Start collapsed
        messages={messages} // Pass messages
        title={t("notificationTitle")} // Localized title
        onToggle={(isCollapsed) =>
          console.log("Notification panel toggled:", isCollapsed)
        } // Optional toggle handler
      />

      {/* Main Contents */}
      <main className="container mx-auto px-6 py-12 mt-8 relative z-10 flex flex-col items-center">
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
              <DollarCircleOutlined
                style={{ marginRight: 8, color: "#FFD700" }}
              />
              {t("getStrokeButton", { word: selectedWord.name })}
            </button>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
export const getServerSideProps = withMessages("strokeOrder");
