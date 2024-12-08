import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import axios from "axios";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../../../lib/getMessages";
import { useRouter } from "next/router";
import { message } from "antd";
import { useSpeechSynthesis } from "react-speech-kit";
import { PiEar, PiPause } from "react-icons/pi";

export default function Page() {
  const router = useRouter();
  const { selectedWord } = router.query;
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const { speak, voices, cancel } = useSpeechSynthesis();
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const [taiwaneseVoice, setTaiwaneseVoice] = useState(null);
  const t = useTranslations("strokeOrder");

  useEffect(() => {
    if (voices.length > 0) {
      let voice = voices.filter((v) => v.lang === "zh-TW")[2] || voices.filter((v) => v.lang === "zh-CN")[0];
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
    setLoading(true);
    if (selectedWord) {
      genStory();
    }
  }, [selectedWord]);

  const genStory = async () => {
    try {
      const prompt = `Write a simple and engaging children's story in Traditional Chinese using the word "${selectedWord}".  
        The story should be suitable for beginners, with animals, children, or cute characters, and provide a simple inspirational message.`;
      const resp = await axios.post("/api/getStory", { prompt });

      if (resp.status === 200) {
        // message.success(t("dialogueSuccess"));
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
          <div className="w-16 h-16 border-4 border-purple-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full mx-auto py-10">
          <div className="bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 p-8 rounded-lg shadow-xl max-w-2xl w-full flex items-center justify-center flex-col gap-8">
            <h1 className="text-4xl font-semibold text-white text-center">Story</h1>
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-lg text-gray-800">{story}</p>
              <button
                onClick={() => (isPlaying ? pauseAudio() : speakTaiwanese(story))}
                className={`mt-6 px-6 py-3 rounded-lg flex items-center gap-3 transition-all transform duration-300 ease-in-out ${voiceLoaded
                  ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:scale-110 hover:bg-gradient-to-l hover:from-purple-500 hover:to-blue-400"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                disabled={!voiceLoaded}
              >
                {isPlaying ? (
                  <PiPause color="white" size={32} />
                ) : (
                  <PiEar color="white" size={32} />
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
