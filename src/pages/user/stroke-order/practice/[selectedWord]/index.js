import { useRouter } from "next/router";
import HanziStroke from "../../../../../components/HanziStroke/HanziStroke";
import Template from "../../../../../components/Template";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useState } from "react";
import { withMessages } from "../../../../../lib/getMessages";
import { useTranslations } from "next-intl";
import { PiEar } from "react-icons/pi";
import { MdReplay } from "react-icons/md";

export default function Page() {
  const router = useRouter();
  const { speak, voices } = useSpeechSynthesis();
  const { selectedWord } = router.query;

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
          <div className="font-bold text-2xl text-purple-700">
            {t("practice.prev")}
          </div>
          <HanziStroke word={selectedWord} draw={false} t={t} />
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="font-bold text-2xl text-purple-700">
            {t("practice.prac")}
          </div>
          <HanziStroke word={selectedWord} draw={true} t={t} voiceLoaded={voiceLoaded} speakTaiwanese={speakTaiwanese}/>
        </div>
      </div>
    </Template>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
