import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl"; // Importing the translations hook
import { withMessages } from "../../../lib/getMessages";
import ReusableHandler from "../../../components/ReusableHandler/ReusableHandler";
import CollapsibleNotificationPanel from "../../../components/notificationPenal/CollapsibleNotificationPanel";
import DashboardLayout from "../layout";

import { DollarCircleOutlined } from "@ant-design/icons";
import ReusableButton from "../../../components/Buttons/gradientButton";

export default function CreateDialogue() {
  const t = useTranslations("strokeOrder"); // Access translations for strokeOrders page
  const [messages, setMessages] = useState([
    {
      key: "createADialogue.msg",
      sender: "bot",
      params: {},
    },
  ]);

  const [selectedWord, setSelectedWord] = useState(null);
  const router = useRouter();
  const { locale } = router;
  const cleanedPath = router.asPath.replace(/\/$/, ""); // Remove trailing slash
  const buttonRef = useRef(null); // Reference for the button

  // Function to add a new message
  const addMessage = (key, sender, params = {}) => {
    setMessages((prev) => [...prev, { key, sender, params }]);
  };

  const handleDialoge = (word) => {
    setSelectedWord(word);
    addMessage("createADialogue.createDialogueButton", "bot", { word: word.name });

    // Use setTimeout for smooth scrolling after the word is selected
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 200); // Slight delay to ensure the button appears before scroll
  };

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
      <CollapsibleNotificationPanel
        initialCollapsed={true} // Start collapsed
        messages={translatedMessages} // Pass messages
        title={t("notificationTitle")} // Localized title
        onToggle={(isCollapsed) =>
          console.log("Notification panel toggled:", isCollapsed)
        } // Optional toggle handler
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 mt-8 relative z-10 flex flex-col items-center">
        <ReusableHandler
          handleFunc={handleDialoge}
          t={t}
          moduleName="dialogue"
        />

        {/* Stroke Order Display area */}
        {selectedWord && (
          <div ref={buttonRef}>
            {" "}
            {/* Button wrapper with reference */}
            <ReusableButton
              onClick={() =>
                router.push(`${cleanedPath}/view/${selectedWord.name}`)
              } // Passing onClick function to navigate
              icon={DollarCircleOutlined} // Pass the icon (with appropriate styles)
              text={t("createADialogue.createDialogueButton", {
                word: selectedWord.name,
              })} // Pass the button text with translation  
              isDisabled={false} // Button is enabled by default
            />
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
