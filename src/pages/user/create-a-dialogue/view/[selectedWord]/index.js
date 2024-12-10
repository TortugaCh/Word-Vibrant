import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import axios from "axios";
import { useTranslations } from "next-intl";
import { message } from "antd";
import Loader from "../../../../../components/Loader";
import { GiBookmarklet, GiPencilBrush } from "react-icons/gi"; // Icons

// Page Component
export default function Page() {
  const router = useRouter();
  const t = useTranslations("strokeOrder"); // For translations
  const { selectedWord } = router.query;
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState([]);

  useEffect(() => {
    if (selectedWord) {
      fetchDialogue();
    }
  }, [selectedWord]);

  // Fetch Dialogue from API
  const fetchDialogue = async () => {
    try {
      setLoading(true);
      const prompt = `Create a short dialogue using the word "${selectedWord}". Include both Traditional Chinese and English translations. Limit to 7-8 exchanges. Format as a JSON array: [{"traditionalChinese": "...", "english": "..."}].`;
      console.log("Prompt:", prompt);

      const resp = await axios.post("/api/getDialogue", { prompt });
      console.log("API Response:", resp.data);

      if (resp.status === 200 && Array.isArray(resp.data.data)) {
        setDialogue(resp.data.data);
        message.success(t("dialogueSuccess"));
      } else {
        console.error("Invalid response:", resp.data);
        message.error("Invalid response format from server.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error(t("dialogueError"));
    } finally {
      setLoading(false);
    }
  };

  // Dialogue Card Component
  const DialogueCard = ({ dialogue, index }) => {
    const isEven = index % 2 === 0;
    return (
      <div
        className={`p-6 mb-6 rounded-xl shadow-lg max-w-4xl mx-auto ${
          isEven
            ? "bg-yellow-200 hover:bg-yellow-300"
            : "bg-pink-200 hover:bg-pink-300"
        }`}
        style={{
          marginLeft: isEven ? "0" : "auto",
          marginRight: isEven ? "auto" : "0",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Traditional Chinese */}
        <div className="flex items-center mb-2">
          <GiPencilBrush size={30} className="text-indigo-600 mr-3" />
          <div className="text-xl font-semibold text-gray-800">
            {dialogue.traditionalChinese}
          </div>
        </div>
        {/* English Translation */}
        <div className="flex items-center">
          <GiBookmarklet size={30} className="text-teal-600 mr-3" />
          <div className="text-md text-gray-700">{dialogue.english}</div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {loading ? (
          // Replace the "Loading..." text with the Loader component
          <Loader />
        ) : dialogue.length > 0 ? (
          dialogue.map((dia, index) => (
            <DialogueCard dialogue={dia} key={index} index={index} />
          ))
        ) : (
          <p>{t("noDialogue")}</p>
        )}
      </div>
    </DashboardLayout>
  );
}
