import { useRouter } from "next/router";
import HanziStroke from "../../../../../components/HanziStroke/HanziStroke";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useState } from "react";
import { withMessages } from "../../../../../lib/getMessages";
import { useTranslations } from "next-intl";
import DashboardLayout from "../../../layout";

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
    <DashboardLayout >
      <div className="flex gap-10 items-center justify-center h-full">
        <div className="flex flex-col items-center space-y-6">
          <div className="font-bold text-2xl text-purple-700">
            {t("practice.prev")}
          </div>
          <HanziStroke word={selectedWord?.length>1?selectedWord[0]:selectedWord} draw={false} t={t} />
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="font-bold text-2xl text-purple-700">
            {t("practice.prac")}
          </div>
          <HanziStroke
            word={selectedWord?.length>1?selectedWord[0]:selectedWord}
            draw={true}
            t={t}
            voiceLoaded={voiceLoaded}
            speakTaiwanese={speakTaiwanese}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
