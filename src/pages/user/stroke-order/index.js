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
      key: "welcomeMessage",
      sender: "bot",
      params: {},
    },
  ]);

  const [selectedWord, setSelectedWord] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true); // Collapsible state
  const router = useRouter();
  const { locale } = router;
  const cleanedPath = router.asPath.replace(/\/$/, ""); // Remove trailing slash
  const strokeRef = useRef(null);
  const buttonRef = useRef(null); // Reference for the button

  // Function to add a new message
  const addMessage = (key, sender, params = {}) => {
    setMessages((prev) => [...prev, { key, sender, params }]);
  };

  const handleGetStroke = (word) => {
    setSelectedWord(word);
    addMessage("getStrokeButton", "bot", { word: word.name });
  };

  useEffect(() => {
    if (selectedWord) {
      // Scroll to the button when the word is selected
      buttonRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedWord]);

  // Update message translations when locale changes
  useEffect(() => {
    setMessages(
      (prev) => prev.map((msg) => ({ ...msg })) // Ensure messages remain intact
    );
  }, [locale]);

  // Translate messages dynamically
  const translatedMessages = messages.map((msg) => ({
    text: t(msg.key, msg.params),
    sender: msg.sender,
  }));

  return (
    <DashboardLayout>
      {/* Collapsible Notification Panel */}
      <CollapsibleNotificationPanel
        initialCollapsed={true} // Start collapsed
        messages={translatedMessages} // Pass dynamically translated messages
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
          <div ref={buttonRef}>
            {" "}
            {/* Button wrapper with reference */}
            <ReusableButton
              onClick={() =>
                router.push(`${cleanedPath}/practice/${selectedWord.name}`)
              } // Passing onClick function to navigate
              icon={DollarCircleOutlined} // Pass the icon (with appropriate styles)
              text={t("getStrokeButton", { word: selectedWord.name })} // Pass the button text with translation
              isDisabled={false} // Button is enabled by default
            />
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
