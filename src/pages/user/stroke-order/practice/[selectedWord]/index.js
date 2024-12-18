// import { useRouter } from "next/router";
// import HanziStroke from "../../../../../components/HanziStroke/HanziStroke";
// import { useSpeechSynthesis } from "react-speech-kit";
// import { useEffect, useState } from "react";
// import { withMessages } from "../../../../../lib/getMessages";
// import { useTranslations } from "next-intl";
// import DashboardLayout from "../../../layout";

// export default function Page() {
//   const router = useRouter();
//   const { speak, voices } = useSpeechSynthesis();
//   const { selectedWord } = router.query;

//   const [voiceLoaded, setVoiceLoaded] = useState(false);
//   const [taiwaneseVoice, setTaiwaneseVoice] = useState(null);
//   const t = useTranslations("strokeOrder");

//   useEffect(() => {
//     if (voices.length > 0) {
//       const voice = voices.filter((v) => v.lang === "zh-TW")[2];
//       setTaiwaneseVoice(voice);
//       setVoiceLoaded(true);
//     }
//   }, [voices]);

//   function speakTaiwanese(text) {
//     if (taiwaneseVoice) {
//       speak({ text, voice: taiwaneseVoice });
//     } else {
//       console.warn("Taiwanese Mandarin voice not available.");
//     }
//   }

//   if (!selectedWord) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <DashboardLayout>
//       <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center h-full">
//         {/* Left Box */}
//         <div className="flex flex-col items-center space-y-6 p-4 lg:p-6 box-purple w-full lg:w-auto">
//           <div className="font-bold text-xl sm:text-2xl lg:text-3xl text-purple-700">
//             {t("practice.prev")}
//           </div>
//           <HanziStroke word={selectedWord?.length > 1 ? selectedWord[0] : selectedWord} draw={false} t={t} />
//         </div>

//         {/* Right Box */}
//         <div className="flex flex-col items-center space-y-6 p-4 lg:p-6 box-purple w-full lg:w-auto">
//           <div className="font-bold text-xl sm:text-2xl lg:text-3xl text-purple-700">
//             {t("practice.prac")}
//           </div>
//           <HanziStroke
//             word={selectedWord?.length > 1 ? selectedWord[0] : selectedWord}
//             draw={true}
//             t={t}
//             voiceLoaded={voiceLoaded}
//             speakTaiwanese={speakTaiwanese}
//           />
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// export const getServerSideProps = withMessages("strokeOrder");


import { useRouter } from "next/router";
import HanziStroke from "../../../../../components/HanziStroke/HanziStroke";
import { useEffect, useState } from "react";
import { withMessages } from "../../../../../lib/getMessages";
import { useTranslations } from "next-intl";
import DashboardLayout from "../../../layout";

export default function Page() {
  const router = useRouter();
  const { selectedWord } = router.query;
  const t = useTranslations("strokeOrder");

  const [audioSrc, setAudioSrc] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  // Fetch audio using Google Cloud TTS API
  async function fetchSpeech(text) {
    if (!text) return;
    setLoadingAudio(true);
    try {
      const response = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (data.audioContent) {
        setAudioSrc(`data:audio/mp3;base64,${data.audioContent}`);
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
    } finally {
      setLoadingAudio(false);
    }
  }

  // Fetch audio when the word changes
  useEffect(() => {
    if (selectedWord) {
      fetchSpeech(selectedWord);
    }
  }, [selectedWord]);

  if (!selectedWord) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center h-full">
        {/* Left Box */}
        <div className="flex flex-col items-center space-y-6 p-4 lg:p-6 box-purple w-full lg:w-auto">
          <div className="font-bold text-xl sm:text-2xl lg:text-3xl text-purple-700">
            {t("practice.prev")}
          </div>
          <HanziStroke
            word={selectedWord?.length > 1 ? selectedWord[0] : selectedWord}
            draw={false}
            t={t}
          />
        </div>

        {/* Right Box */}
        <div className="flex flex-col items-center space-y-6 p-4 lg:p-6 box-purple w-full lg:w-auto">
          <div className="font-bold text-xl sm:text-2xl lg:text-3xl text-purple-700">
            {t("practice.prac")}
          </div>
          <HanziStroke
            word={selectedWord?.length > 1 ? selectedWord[0] : selectedWord}
            draw={true}
            t={t}
            loadingAudio={loadingAudio}
            audioSrc={audioSrc}
          />
          {/* {loadingAudio ? (
            <div>Loading pronunciation...</div>
          ) : audioSrc ? (
            <audio controls>
              <source src={audioSrc} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <div>No pronunciation available</div>
          )} */}
        </div>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
