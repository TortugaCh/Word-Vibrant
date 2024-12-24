import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import axios from "axios";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../../lib/getMessages";
import { message } from "antd";
import { FaVolumeUp, FaPauseCircle } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { useSpeak } from "../../../../hooks/useSpeak";
import { generateStory } from "../../../../lib/utils/story";
import { useUserContext } from "../../../../context/UserContext";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const [highlightedStory, setHighlightedStory] = useState([]);
  const t = useTranslations("strokeOrder");
  const [words, setWords] = useState([]);
  const [topic, setTopic] = useState("");
  const { audioSrc, loadingAudio, isPlaying, togglePlayback } = useSpeak();
  const { reverseCredits, deductCredits } = useUserContext();

  // Fetch words and topic from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWords = sessionStorage.getItem("words");
      const storedTopic = sessionStorage.getItem("topic");
      setWords(JSON.parse(storedWords) || []);
      setTopic(storedTopic || "");
    }
  }, []);

  // Generate story when words are available
  useEffect(() => {
    if (words.length > 0) {
      genStory(
        words?.map((word) => word.name),
        topic
      );
    }
  }, [words?.length]);

  const genStory = async (words, topic) => {
    try {
      setLoading(true);
      // Deduct credits before generating the story
      const creditsDeducted = await deductCredits("create-a-story");
      if (!creditsDeducted) {
        message.error("Not enough credits to generate a story.");
        return;
      }
      const prompt = `
        Write a complete and engaging children's story in Traditional Chinese on the topic: "${topic}".  
        Use ONLY the following words provided in this array: "${words}".  
        The story should:
        1. Have a clear beginning, middle, and a positive ending.
        2. Include cute and relatable characters like animals, children, or friendly figures.
        3. Convey a simple and inspirational message suitable for beginners.  
        4. Be short, engaging, and beginner-friendly in language.
      `;
      const resp = await generateStory(prompt);

      if (!resp.data) {
        throw new Error(
          "Failed to generate a story. Credits have been refunded."
        );
      }

      // If story generation succeeds
      setStory(resp.data);
      highlightWords(resp.data, words);
      await togglePlayback(resp.data);
    } catch (error) {
      // Reverse credits on any error
      await reverseCredits("create-a-story");
      console.error("Error generating the story:", error.message || error);
      message.error(
        error.message || "An error occurred. Credits have been refunded."
      );
    } finally {
      setLoading(false);
    }
  };

  const highlightWords = (storyText, validWords) => {
    // Normalize validWords for consistency
    const wordsSet = new Set(validWords.map((word) => word.trim())); // No case conversion needed for Chinese
    console.log("Valid Words:", wordsSet);

    // Split text into individual characters, words, and preserve spaces/punctuation
    const storyWords = storyText?.split("").map((word, index) => {
      // const cleanedWord = word.trim(); // No need to clean further since split isolates parts
      if (word && !wordsSet.has(word)) {
        return (
          <span key={index} className="underline text-red-500">
            {word} {/* Keep the original word for display */}
          </span>
        );
      }
      return <span key={index}>{word}</span>;
    });

    setHighlightedStory(storyWords);
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full mx-auto py-10">
          <div className="bg-blue-50 p-8 rounded-lg shadow-lg max-w-2xl w-full flex items-center justify-center flex-col gap-8 border border-blue-200">
            <h1 className="text-4xl font-semibold text-gray-800 text-center">
              {t("createAStory.storyTime")}
            </h1>

            {/* Fun Book Icon */}
            <div className="mt-4 text-center">
              <GiBookCover size={80} color="#4F6D7A" />
            </div>

            <div className="flex flex-col items-center gap-4">
              {/* Highlighted Story */}
              <p className="text-center text-lg text-gray-700 leading-relaxed">
                {highlightedStory.length > 0 ? highlightedStory : story}
              </p>
              <button
                onClick={() => togglePlayback(story)}
                className={`mt-6 px-6 py-3 rounded-lg flex items-center gap-3 transition-all transform duration-300 ease-in-out ${
                  audioSrc
                    ? "bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 text-white hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!audioSrc || loadingAudio}
              >
                {isPlaying ? (
                  <FaPauseCircle size={32} color="white" />
                ) : (
                  <FaVolumeUp size={32} color="white" />
                )}
                {isPlaying ? "Pause Story" : t("practice.listen")}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
