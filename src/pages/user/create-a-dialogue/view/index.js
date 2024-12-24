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
import { useUserContext } from "../../../../context/UserContext";
import { highlightWords } from "../../../../lib/utils";

export default function Page() {
  const router = useRouter();
  const t = useTranslations("strokeOrder");
  const [words, setWords] = useState([]);
  const [wordNames, setWordNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState([]);
  const { reverseCredits, deductCredits } = useUserContext();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access sessionStorage safely
      const storedWords = sessionStorage.getItem("words");
      setWords(JSON.parse(storedWords));
      setWordNames(JSON.parse(storedWords)?.map((word) => word?.name));
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
      // Deduct credits before generating the dialigue
      const creditsDeducted = await deductCredits("create-a-dialogue");
      if (!creditsDeducted) {
        message.error("Not enough credits to generate a dialogue.");
        return;
      }
      const prompt = `
      Create a short and engaging dialogue using ONLY the following words: "${words}".  
      The dialogue must strictly follow these rules:  
      1. Alternate between a **female** and a **male** character. The first line must always be spoken by the female character.  
      2. Ensure logical relationships:
         - If the female character is a "Mom," the male character must be her "Son."
         - If the female character is a "Sister," the male character must be her "Brother."
         - If the female character is a "Friend," the male character must be her "Friend."
      3. Include Traditional Chinese and English translations for each sentence.  
      4. Limit the dialogue to exactly 7-8 exchanges (short back-and-forth conversation).  
      5. Only use the provided words; do not introduce new ones.  
      6. Write roles explicitly as comments before each dialogue line (e.g., "// Female (Mom): ...", "// Male (Son): ...").  
      
      Format the output as a JSON array of objects with this structure:  
      [
        { "role": "Female", "traditionalChinese": "Chinese sentence 1", "english": "English sentence 1" },
        { "role": "Male", "traditionalChinese": "Chinese sentence 2", "english": "English sentence 2" },
        ...
      ]
      
      ### Important:
      - Ensure the dialogue aligns with the logical relationship (e.g., a "Mom" will not address "Dad" as her "Son").
      - Do not deviate from the word list or logical relationships under any circumstances.
      `;

      // Call OpenAI dialogue generator
      const response = await generateDialogue(prompt);
      console.log("API Response:", response);

      if (response.data) {
        const parsedData = response.data;

        // Validate the response format
        if (Array.isArray(parsedData)) {
          setDialogue(parsedData);
          message.success(
            t("dialogueSuccess") || "Dialogue fetched successfully!"
          );
        } else {
          throw new Error("Received invalid dialogue format.");
        }
      } else {
        throw new Error(response.error || "Unknown error occurred.");
      }
    } catch (error) {
      // Reverse credits on any error
      await reverseCredits("create-a-dialogue");
      console.error("Error fetching dialogue:", error.message || error);
      message.error(
        t("dialogueError") ||
          "Failed to fetch dialogue. Your credits have been refunded."
      );
    } finally {
      setLoading(false);
    }
  };

  const DialogueCard = ({ dialogue, index }) => {
    const { loadingAudio, isPlaying, togglePlayback } = useSpeak();
    const [highlightedDialogue, setHighlighedDialogue] = useState("");

    useEffect(() => {
      if (!dialogue?.traditionalChinese || !wordNames) return;

      // const highlightedWords = (tradionalDialogue, validWords) => {
      //   // Normalize validWords for consistency
      //   const wordsSet = new Set(validWords.map((word) => word.trim()));

      //   // Split text into individual characters, words, and preserve spaces/punctuation
      //   const dialogueWords = tradionalDialogue.split("").map((word, index) => {
      //     if (word && !wordsSet.has(word)) {
      //       return (
      //         <span key={index} className="underline text-red-500">
      //           {word}
      //         </span>
      //       );
      //     }
      //     return <span key={index}>{word}</span>;
      //   });

      //   setHighlighedDialogue(dialogueWords);
      // };
      // const highlightedWords = (traditionalDialogue, validWords) => {
      //   // Normalize validWords for consistency
      //   const wordsSet = new Set(validWords.map((word) => word.trim()));

      //   // Initialize an array to hold the highlighted dialogue
      //   const dialogueWords = [];
      //   let i = 0;

      //   // Traverse the dialogue string and look for matches
      //   while (i < traditionalDialogue.length) {
      //     let foundMatch = false;

      //     // Check for the longest matching phrase in the wordsSet
      //     for (let j = traditionalDialogue.length; j > i; j--) {
      //       const phrase = traditionalDialogue.slice(i, j); // Extract substring
      //       if (wordsSet.has(phrase)) {
      //         // If phrase is valid, add it without underline
      //         dialogueWords.push(<span key={i}>{phrase}</span>);
      //         i = j; // Move the pointer to the end of the matched phrase
      //         foundMatch = true;
      //         break;
      //       }
      //     }

      //     // If no match found, treat the current character as invalid
      //     if (!foundMatch) {
      //       dialogueWords.push(
      //         <span key={i} className="underline text-red-500">
      //           {traditionalDialogue[i]}
      //         </span>
      //       );
      //       i++; // Move pointer to the next character
      //     }
      //   }

      //   // Update the highlighted dialogue state
      //   setHighlighedDialogue(dialogueWords);
      // };

      setHighlighedDialogue(
        highlightWords(dialogue.traditionalChinese, wordNames, {
          validClassName: "text-gray-800", // Custom style for valid words
          invalidClassName: "underline text-red-500", // Custom style for invalid words
        })
      );
    }, [dialogue?.traditionalChinese, wordNames]); // Add dependencies to avoid unnecessary calls

    const role = dialogue?.role;
    const englishDialogue = dialogue?.english;
    const tradionalDialogue = dialogue?.traditionalChinese;
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
            {highlightedDialogue || "No content"}
          </div>
        </div>
        {console.log("Role:", role)}
        <button
          onClick={() =>
            togglePlayback(
              tradionalDialogue,
              role?.split(" ")?.[0] !== "Female"
                ? "cmn-TW-Wavenet-B"
                : "cmn-TW-Wavenet-A"
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
