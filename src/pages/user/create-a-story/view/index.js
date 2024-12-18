import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import axios from "axios";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../../lib/getMessages";
import { message } from "antd";
import { useSpeechSynthesis } from "react-speech-kit";
import { FaVolumeUp, FaPauseCircle } from "react-icons/fa"; // Volume and Pause icons
import { GiBookCover } from "react-icons/gi"; // Icon for a book (kids' theeeme)

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const { speak, voices, cancel } = useSpeechSynthesis();
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const [taiwaneseVoice, setTaiwaneseVoice] = useState(null);
  const t = useTranslations("strokeOrder");
  const [words, setWords] = useState([]);
  const [topic, setTopic] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access sessionStorage safely
      const storedWords = sessionStorage.getItem("words");
      const storedTopic = sessionStorage.getItem("topic");
      setWords(JSON.parse(storedWords));
      setTopic(storedTopic);
    }
  }, []);
  useEffect(() => {
    if (voices.length > 0) {
      let voice =
        voices.filter((v) => v.lang === "zh-TW")[2] ||
        voices.filter((v) => v.lang === "zh-CN")[0];
      setTaiwaneseVoice(voice);
      setVoiceLoaded(true);
    }
  }, [voices]);

  function speakTaiwanese(text) {
    if (taiwaneseVoice) {
      speak({ text, voice: taiwaneseVoice });
      setIsPlaying(true);
    }
  }

  function pauseAudio() {
    cancel();
    setIsPlaying(false);
  }

  useEffect(() => {
    if (words.length > 0) {
      console.log(words?.map((word) => word.name));
      genStory(words?.map((word) => word.name),topic);
    }
  }, [words?.length]);

  const genStory = async (words, topic) => {
    try {
      const prompt = `
      Write a complete and engaging children's story in Traditional Chinese on the topic: "${topic}".  
      Use ONLY the following words provided in this array: "${words}".  
      The story should:
      1. Have a clear beginning, middle, and a positive ending.
      2. Include cute and relatable characters like animals, children, or friendly figures.
      3. Convey a simple and inspirational message suitable for beginners.  
      4. Be short, engaging, and beginner-friendly in language.
      
      Ensure the story is complete, without cutting off, and avoid using any words outside the provided list and stick to the topic provided.
      `;
      
    console.log(prompt);
      const resp = await axios.post("/api/getStory", { prompt });

      if (resp.status === 200) {
        setLoading(false);
        setStory(resp.data.data);
      }
    } catch (error) {
      setLoading(false);
      message.error(t("dialogueError"));
    }
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
              <p className="text-center text-lg text-gray-700 leading-relaxed">
                {story}
              </p>
              <button
                onClick={() =>
                  isPlaying ? pauseAudio() : speakTaiwanese(story)
                }
                className={`mt-6 px-6 py-3 rounded-lg flex items-center gap-3 transition-all transform duration-300 ease-in-out ${
                  voiceLoaded
                    ? "bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 text-white hover:scale-105 hover:bg-gradient-to-l hover:from-pink-600 hover:to-purple-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!voiceLoaded}
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
