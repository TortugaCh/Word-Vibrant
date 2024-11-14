import { useRouter } from "next/router";
import HanziStroke from "../../../../components/HanziStroke/HanziStroke";
import Template from "../../../../components/Template";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { speak, voices } = useSpeechSynthesis();
  const { selectedWord } = router.query;

  // State to ensure voices are loaded before attempting to find one
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const [taiwaneseVoice, setTaiwaneseVoice] = useState(null);

  useEffect(() => {
    if (voices.length > 0) {
      // Try to find a Taiwanese Mandarin voice, with fallback to zh-CN if unavailable
      const voice = voices.filter((v) => v.lang === "zh-TW")[2]
      console.log(voices.filter((v) => v.lang === "zh-TW"));
      console.log("Voice", voice);
      setTaiwaneseVoice(voice);
      setVoiceLoaded(true);
    }
  }, [voices]);

  function speakTaiwanese(text) {
    if (taiwaneseVoice) {
      speak({ text, voice: taiwaneseVoice });
    } else {
      console.warn("Taiwanese Mandarin voice not available.");
    }
  }

  if (!selectedWord) {
    return <div>Loading...</div>;
  }

  return (
    <Template title="Stroke Orders">
      <div className="flex gap-10">
        <div className="flex flex-col items-center space-y-6">
          <div className="font-bold text-2xl text-purple-700">Preview</div>
          <HanziStroke word={"朋友"} draw={false} />
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="font-bold text-2xl text-purple-700">Practice</div>
          <HanziStroke word={"朋友"} draw={true} />
        </div>
      </div>
      <button
        onClick={() => speakTaiwanese("朋友")}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={!voiceLoaded}
      >
        Listen to Word
      </button>
    </Template>
  );
};

export default Page;
