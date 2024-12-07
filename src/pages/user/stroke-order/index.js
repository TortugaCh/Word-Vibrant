import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl"; // Importing the translations hook
import { DollarCircleOutlined } from "@ant-design/icons";
import ReusableButton from "../../../components/Buttons/gradientButton";
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
  const buttonRef = useRef(null); // Reference for the button

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleGetStroke = (word) => {
    setSelectedWord(word);
    addMessage(t("getStrokeButton", { word: word.name }), "bot");
  };

  useEffect(() => {
    if (selectedWord) {
      // Scroll to the button when the word is selected
      buttonRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedWord]);

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
          <div ref={buttonRef}> {/* Button wrapper with reference */}
            <ReusableButton
              onClick={() => router.push(`${cleanedPath}/practice/${selectedWord.name}`)}  // Passing onClick function to navigate
              icon={DollarCircleOutlined}  // Pass the icon (with appropriate styles)
              text={t("getStrokeButton", { word: selectedWord.name })}  // Pass the button text with translation
              isDisabled={false}  // Button is enabled by default
            />
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
