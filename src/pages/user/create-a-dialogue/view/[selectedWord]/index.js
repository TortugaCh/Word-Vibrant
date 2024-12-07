import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import axios from "axios";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../../../lib/getMessages";
import { useRouter } from "next/router";
import { message, Spin } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Page() {
  const router = useRouter();
  const t = useTranslations("strokeOrder");
  const { selectedWord } = router.query;
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState([]);

  // Dialogue Card Component
  const DialogueCard = ({ dialogue }) => (
    <div className="p-6 mb-4 rounded-lg shadow-lg bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300">
      <div className="text-purple-800 font-semibold mb-2">{dialogue.traditionalChinese}</div>
      <div className="text-purple-700">{dialogue.english}</div>
    </div>
  );

  useEffect(() => {
    setLoading(true);
    if (selectedWord) {
      genDialogue();
    }

    return () => { };
  }, [selectedWord]);

  const genDialogue = async () => {
    try {
      const prompt = `Create a short dialogue using the word "${selectedWord}". Include both the Traditional Chinese and the English translation for each line. Limit the dialogue to 3-4 exchanges. Format the response as a JSON array with the following keys:
        - "traditionalChinese": Dialogue in Traditional Chinese.
        - "english": English translation of the dialogue.`;

      const resp = await axios.post("/api/getDialogue", { prompt });

      if (resp.status === 200 && Array.isArray(resp.data.data)) {
        console.log("Parsed Dialogue:", resp.data.data);
        // message.success(t("dialogueSuccess"));
        setDialogue(resp.data.data); // Set the dialogue data
      } else {
        console.error("Invalid response structure:", resp.data);
        message.error("Invalid response from server.");
      }
    } catch (error) {
      console.error("Error generating dialogue:", error.response?.data || error);
      message.error(error.response?.data?.error || t("dialogueError"));
      setDialogue([]); // Reset dialogue on error
    } finally {
      setLoading(false); // Ensure loading state is cleared
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-16 h-16 border-4 border-purple-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4">
          {dialogue.length > 0 ? (
            dialogue.map((dia, index) => (
              <DialogueCard dialogue={dia} key={index} />
            ))
          ) : (
            <p className="text-center text-gray-500">{t("noDialogue")}</p>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
