import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import ReusableHandler from "../../../components/ReusableHandler/ReusableHandler";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../lib/getMessages";
import DashboardLayout from "../layout";
import CollapsibleNotificationPanel from "../../../components/notificationPenal/CollapsibleNotificationPanel";
import { DollarCircleOutlined } from "@ant-design/icons";
import ReusableButton from "../../../components/Buttons/gradientButton";

export default function ColoringPage() {
  const t = useTranslations("strokeOrder"); // Access translations for strokeOrders page

  const [messages, setMessages] = useState([
    {
      key: "coloringPage.msg",
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

  const handleSelectWord = (word) => {
    setSelectedWord(word);
    addMessage("coloringPage.getColoringButton", "bot",{ word: word.name });
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
      <CollapsibleNotificationPanel
        initialCollapsed={true} // Start collapsed
        messages={translatedMessages} // Pass messages
        title={t("notificationTitle")} // Localized title
        onToggle={(isCollapsed) =>
          console.log("Notification panel toggled:", isCollapsed)
        } // Optional toggle handler
      />

      <main className="container mx-auto px-6 py-12 mt-8 relative z-10 flex flex-col items-center">
        <ReusableHandler t={t} handleFunc={handleSelectWord} moduleName="coloring"/>

        {selectedWord && (
          <div ref={buttonRef}> {/* Button wrapper with reference */}
            <ReusableButton
              onClick={() => router.push(`${cleanedPath}/download/${selectedWord.name}`)}  // Passing onClick function to navigate
              icon={DollarCircleOutlined}  // Pass the icon (with appropriate styles)
              text={t("coloringPage.getColoringButton", { word: selectedWord.name })}  // Pass the button text with translation
              isDisabled={false}  // Button is enabled by default
            />
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
