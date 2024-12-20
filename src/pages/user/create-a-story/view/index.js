import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import axios from "axios";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../../lib/getMessages";
import { message } from "antd";
import { FaVolumeUp, FaPauseCircle } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { useSpeak } from "../../../../hooks/useSpeak";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const [highlightedStory, setHighlightedStory] = useState([]);
  const t = useTranslations("strokeOrder");
  const [words, setWords] = useState([]);
  const [topic, setTopic] = useState("");
  const { audioSrc, loadingAudio, isPlaying, togglePlayback } = useSpeak();

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
      const prompt = `
        Write a complete and engaging children's story in Traditional Chinese on the topic: "${topic}".  
        Use ONLY the following words provided in this array: "${words}".  
        The story should:
        1. Have a clear beginning, middle, and a positive ending.
        2. Include cute and relatable characters like animals, children, or friendly figures.
        3. Convey a simple and inspirational message suitable for beginners.  
        4. Be short, engaging, and beginner-friendly in language.
      `;
      const resp = await axios.post("/api/getStory", { prompt });

      if (resp.status === 200) {
        setStory(resp.data.data);
        highlightWords(resp.data.data, words);
        await togglePlayback(resp.data.data);
      }
    } catch (error) {
      message.error(t("dialogueError"));
    } finally {
      setLoading(false);
    }
  };

  // Highlight unmatched words
  const highlightWords = (storyText, validWords) => {
    const wordsSet = new Set(validWords.map((word) => word.trim())); // Trim validWords for consistency
    console.log("Valid Words:", wordsSet);

    const storyWords = storyText.split(/(\s+)/).map((word, index) => {
      const cleanedWord = word.trim().replace(/[^\w]/g, ""); // Remove punctuation for comparison
      if (cleanedWord && !wordsSet.has(cleanedWord)) {
        return (
          <span key={index} className="underline text-red-500">
            {word}
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
