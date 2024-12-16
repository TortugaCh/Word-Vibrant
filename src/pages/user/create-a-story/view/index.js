import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import axios from "axios";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../../lib/getMessages";
import { useRouter } from "next/router";
import { message } from "antd";
import { useSpeechSynthesis } from "react-speech-kit";
import { FaVolumeUp, FaPauseCircle } from "react-icons/fa"; // Volume and Pause icons
import { GiBookCover } from "react-icons/gi"; // Icon for a book (kids' theeeme)

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const { speak, voices, cancel } = useSpeechSynthesis();
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const [taiwaneseVoice, setTaiwaneseVoice] = useState(null);
  const t = useTranslations("strokeOrder");
  const [words, setWords] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access sessionStorage safely
      const storedWords = sessionStorage.getItem("words");
      setWords(JSON.parse(storedWords));
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
    if (words.length>0) {
      console.log(words?.map((word) => word.name));
      genStory(words?.map((word) => word.name));
    }
  }, [words?.length]);

  const genStory = async (words) => {
    try {
      const prompt = `Write a simple and engaging children's story in Traditional Chinese using these words mentioned in this array : "${words}".  
        The story should be suitable for beginners, with animals, children, or cute characters, and provide a simple inspirational message. (Note: Don't use any words outside the list I provided you)`;
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
