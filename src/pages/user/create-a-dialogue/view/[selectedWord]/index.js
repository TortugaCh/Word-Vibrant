import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { message } from "antd";
import axios from "axios";
import { GiPencilBrush, GiBookmarklet } from "react-icons/gi";
import useTranslations from "../hooks/useTranslations";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const t = useTranslations("strokeOrder");

  // Use useEffect to safely access router.query in the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const { selectedWord } = router.query;
      setSelectedWord(selectedWord);
    }
  }, []);

  useEffect(() => {
    if (selectedWord) {
      setLoading(true);
      genDialogue();
    }
  }, [selectedWord]);

  const genDialogue = async () => {
    try {
      const prompt = `Create a short dialogue using the word "${selectedWord}". Include both the Traditional Chinese and the English translation for each line. Limit the dialogue to 7-8 exchanges. Format the response as a JSON array with the following keys:
        - "traditionalChinese": Dialogue in Traditional Chinese.
        - "english": English translation of the dialogue.`;

      const resp = await axios.post("/api/getDialogue", { prompt });

      if (resp.status === 200 && Array.isArray(resp.data.data)) {
        console.log("Parsed Dialogue:", resp.data.data);
        message.success(t("dialogueSuccess"));
        setDialogue(resp.data.data); // Set the dialogue data
      } else {
        console.error("Invalid response structure:", resp.data);
        message.error("Invalid response from server.");
      }
    } catch (error) {
      console.error(
        "Error generating dialogue:",
        error.response?.data || error
      );
      message.error(error.response?.data?.error || t("dialogueError"));
      setDialogue([]); // Reset dialogue on error
    } finally {
      setLoading(false); // Ensure loading state is cleared
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {dialogue.length > 0 ? (
            dialogue.map((dia, index) => (
              <DialogueCard dialogue={dia} key={index} index={index} />
            ))
          ) : (
            <p>{t("noDialogue")}</p>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

const DialogueCard = ({ dialogue, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`p-6 mb-6 rounded-xl shadow-lg max-w-4xl mx-auto ${
        isEven
          ? "bg-yellow-200 hover:shadow-xl hover:bg-yellow-300"
          : "bg-pink-200 hover:shadow-xl hover:bg-pink-300"
      }`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        transition: "all 0.3s ease-in-out",
        marginLeft: isEven ? "0" : "auto",
        marginRight: isEven ? "auto" : "0",
      }}
    >
      <div className={`flex items-center mb-2`}>
        <GiPencilBrush size={40} className="text-indigo-600 mr-3" />
        <div
          className={`text-xl font-semibold ${
            isEven ? "text-yellow-800 text-right" : "text-pink-800 text-left"
          }`}
          style={{ lineHeight: "1.6" }}
        >
          {dialogue.traditionalChinese}
        </div>
      </div>

      <div className={`flex items-center mt-2`}>
        <GiBookmarklet size={40} className="text-teal-600 mr-3" />
        <div
          className={`text-md text-gray-800 ${
            isEven ? "text-left" : "text-right"
          }`}
          style={{ lineHeight: "1.6" }}
        >
          {dialogue.english}
        </div>
      </div>
    </div>
  );
};
