import { useRouter } from "next/router";
import HanziStroke from "../../../../../components/HanziStroke/HanziStroke";
import { useEffect, useState } from "react";
import { withMessages } from "../../../../../lib/getMessages";
import { useTranslations } from "next-intl";
import DashboardLayout from "../../../layout";
import { useSpeak } from "../../../../../hooks/useSpeak";
import { useUserContext } from "../../../../../context/UserContext";

export default function Page() {
  const router = useRouter();
  const { selectedWord } = router.query;
  const t = useTranslations("strokeOrder");

  const { audioSrc, loadingAudio, fetchSpeech } = useSpeak();
  const { deductCredits, reverseCredits } = useUserContext();
  // Fetch audio when the word changes
  useEffect(() => {
    if (selectedWord) {
      const fetchData = async () => {
        const creditsDeducted = await deductCredits("stroke-order",selectedWord);
        if (!creditsDeducted) {
          message.error("Not enough credits to generate a story.");
          return;
        }
        fetchSpeech(selectedWord, "cmn-TW-Wavenet-A");
      };
      fetchData();
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
        </div>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
