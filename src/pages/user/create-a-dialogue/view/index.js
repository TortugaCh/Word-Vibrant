import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import axios from "axios";
import { useTranslations } from "next-intl";
import { message } from "antd";
import Loader from "../../../../components/Loader";
import { GiBookmarklet, GiPencilBrush } from "react-icons/gi";
import { generateDialogue } from "../../../../lib/utils/dialogue";
import { withMessages } from "../../../../lib/getMessages";
import { useSpeak } from "../../../../hooks/useSpeak";
import { FaPauseCircle, FaVolumeUp } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const t = useTranslations("strokeOrder");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access sessionStorage safely
      const storedWords = sessionStorage.getItem("words");
      setWords(JSON.parse(storedWords));
    }
  }, []);
  useEffect(() => {
    if (words.length > 0) {
      console.log(words?.map((word) => word.name));
      fetchDialogue(words?.map((word) => word.name));
    }
  }, [words.length]);

  // const fetchDialogue = async () => {
  //   try {
  //     setLoading(true);
  //     console.log("Fetching dialogue for word:", selectedWord);

  //     const prompt = `Create a short dialogue using the word "${selectedWord}". Include both Traditional Chinese and English translations. Limit to 7-8 exchanges. Format as a JSON array: [{"traditionalChinese": "...", "english": "..."}].`;

  //     const resp = await axios.post("/api/getDialogue", { prompt });
  //     console.log("API Response:", resp.data);

  //     const dialogueText = resp.data?.data || "[]";

  //     // Check if `dialogueText` is already an object
  //     const parsedData =
  //       typeof dialogueText === "string"
  //         ? JSON.parse(dialogueText)
  //         : dialogueText;

  //     console.log("Parsed Dialogue:", parsedData);

  //     if (Array.isArray(parsedData)) {
  //       setDialogue(parsedData);
  //       message.success(
  //         t("dialogueSuccess") || "Dialogue fetched successfully!"
  //       );
  //     } else {
  //       console.error("Parsed data is not an array:", parsedData);
  //       message.error("Invalid dialogue format received from server.");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error during API call:",
  //       error.response?.data || error.message
  //     );
  //     message.error(t("dialogueError") || "Failed to fetch dialogue.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchDialogue = async (words) => {
    try {
      setLoading(true);

      const prompt = `
Create a short and engaging dialogue using ONLY the following words: "${words}".  
The dialogue should:  
1. Alternate strictly between a female and a male character. The first line must always be spoken by the female character.  
2. Include Traditional Chinese and English translations for each sentence.  
3. Be limited to exactly 7-8 exchanges (short back-and-forth conversation).  
4. Strictly use the provided words without introducing any new ones.  
5. Include the character roles explicitly as comments before each dialogue line (e.g., "Female: ..." or "Male: ...").  

Format the output as a JSON array of objects with this structure:  
[
  { "role": "Female", "traditionalChinese": "Chinese sentence 1", "english": "English sentence 1" },
  { "role": "Male", "traditionalChinese": "Chinese sentence 2", "english": "English sentence 2" },
  ...
]
`;

      console.log("Prompt:", prompt);

      // Call OpenAI dialogue generator
      const response = await generateDialogue(prompt);
      console.log("API Response:", response);

      if (response?.data) {
        const parsedData = response.data;

        if (Array.isArray(parsedData)) {
          setDialogue(parsedData);
          message.success(
            t("dialogueSuccess") || "Dialogue fetched successfully!"
          );
        } else {
          console.error("Invalid dialogue format:", parsedData);
          message.error("Received invalid dialogue format.");
        }
      } else {
        throw new Error(response.error || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error fetching dialogue:", error.message);
      message.error(t("dialogueError") || "Failed to fetch dialogue.");
    } finally {
      setLoading(false);
    }
  };

  const DialogueCard = ({ dialogue, index }) => {
    const { loadingAudio, isPlaying, togglePlayback } = useSpeak();
    const role = dialogue?.role
    console.log("Role:", role);
    const englishDialogue = dialogue?.english
    const tradionalDialogue = dialogue?.traditionalChinese
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
        <div className="flex items-center mb-2">
          <GiPencilBrush size={30} className="text-indigo-600 mr-3" />
          <div className="text-xl font-semibold text-gray-800">
            {tradionalDialogue || "No content"}
          </div>
        </div>
        <button
          onClick={() =>
            togglePlayback(
              tradionalDialogue,
              `${role === "Male" ? "cmn-TW-Wavenet-B" : "cmn-TW-Wavenet-A"}`
            )
          }
          className={`p-2 rounded-full ${
            isPlaying ? "bg-red-400" : "bg-blue-400"
          } text-white`}
          disabled={loadingAudio}
        >
          {isPlaying ? <FaPauseCircle size={24} /> : <FaVolumeUp size={24} />}
        </button>
        <div className="flex items-center">
          <GiBookmarklet size={30} className="text-teal-600 mr-3" />
          <div className="text-md text-gray-700">
            {englishDialogue || "No content"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {loading ? (
          <Loader />
        ) : dialogue.length > 0 ? (
          dialogue.map((dia, index) => (
            <DialogueCard dialogue={dia} key={index} index={index} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            {t("noDialogue") || "No dialogue available."}
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
