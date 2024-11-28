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
  const [story, setStory] = useState(""); // Renamed 'dialogue' to 'story'
  const { speak, voices, cancel } = useSpeechSynthesis(); // Added cancel for pausing
  const [isPlaying, setIsPlaying] = useState(false); // Track audio playback state

  // State to ensure voices are loaded before attempting to find one
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const [taiwaneseVoice, setTaiwaneseVoice] = useState(null);
  const t = useTranslations("strokeOrder");

  useEffect(() => {
    if (voices.length > 0) {
      // Try to find a Taiwanese Mandarin voice, with fallback to zh-CN if unavailable
      const voice = voices.filter((v) => v.lang === "zh-TW")[2];
      console.log(voices.filter((v) => v.lang === "zh-TW"));
      console.log("Voice", voice);
      setTaiwaneseVoice(voice);
      setVoiceLoaded(true);
    }
  }, [voices]);

  function speakTaiwanese(text) {
    if (taiwaneseVoice) {
      speak({ text, voice: taiwaneseVoice });
      setIsPlaying(true); // Set to playing when the speech starts
    } else {
      console.warn("Taiwanese Mandarin voice not available.");
    }
  }

  function pauseAudio() {
    cancel(); // Cancel the current speech
    setIsPlaying(false); // Set to paused when the speech is cancelled
  }

  if (!selectedWord) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    setLoading(true);
    if (selectedWord) {
      genStory(); // Renamed 'genDialogue' to 'genStory'
    }

    return () => {};
  }, [selectedWord]);

  const genStory = async () => {
    try {
      const prompt = `
        Write a simple and engaging children's story in Traditional Chinese using the word "${selectedWord}".  
        Follow these guidelines:
        1. The story should be suitable for beginners, using simple and easy-to-understand vocabulary and sentences.
        2. Include a clear structure with a beginning, middle, and end.
        3. The main characters should be animals, children, or other cute and relatable characters to capture children's interest.
        4. The plot should be positive and convey a simple lesson or inspirational message.
        5. Keep the story concise, appropriate for children's learning and reading.
        6. Ensure the text is fully written in Traditional Chinese and easy for children to follow.
      `;

      const resp = await axios.post("/api/getStory", { prompt });

      if (resp.status === 200) {
        message.success(t("dialogueSuccess"));
        console.log(resp.data);
        setLoading(false);
        setStory(resp.data.data); // Assuming 'resp.data.data' contains the story
      }
    } catch (error) {
      setLoading(false);
      message.error(t("dialogueError"));
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full mx-auto py-10">
          {/* Display the story content here, and center it */}
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full flex items-center justify-center flex-col gap-8">
            <h1 className="text-4xl font-bold text-purple-700 text-center">Story</h1>
            <div className="flex flex-col items-center gap-2">
              <p className="text-center text-lg text-gray-800">{story}</p>
              <button
                onClick={() => (isPlaying ? pauseAudio() : speakTaiwanese(story))}
                className={`mt-6 px-4 py-2 rounded flex items-center gap-2 ${
                  voiceLoaded
                    ? "bg-blue-500 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!voiceLoaded} // Disable until voices are loaded
              >
                {isPlaying?<PiPause color="white" size={32} />:<PiEar color="white" size={32} />}
                {isPlaying ? "Pause The Story" : t("practice.listen")}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
