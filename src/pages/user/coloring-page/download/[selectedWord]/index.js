import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";
import { Canvg } from "canvg";
import DashboardLayout from "../../../layout";
import { DollarCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import ReusableButton from "../../../../../components/Buttons/gradientButton";
import {
  generateColoringPDF,
  getColoringPage,
} from "../../../../../lib/utils/coloring";
import { withMessages } from "../../../../../lib/getMessages";
import { useTranslations } from "next-intl";
import { useUserContext } from "../../../../../context/UserContext";
import { message } from "antd";
import Loader from "../../../../../components/Loader";
export default function DownloadPage() {
  const router = useRouter();
  const t = useTranslations("strokeOrder");
  const { selectedWord } = router.query;
  const downloadContainerRef = useRef(null);
  const coloringPageContainerRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const { deductCredits, reverseCredits } = useUserContext();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedWord) {
      fetchBackgroundImage(selectedWord);
      renderHanziCharacter();
    }
  }, [selectedWord]);

  const fetchBackgroundImage = async (word, description) => {
    try {
      const creditsDeducted = await deductCredits(
        "coloring-page",
        selectedWord
      );
      if (!creditsDeducted) {
        message.error("Not enough credits to generate a story.");
        return;
      }
      const resp = await getColoringPage(word);
      if (!resp)
        throw new Error(
          "Failed to generate a backgroundImage. Credits have been refunded."
        );
      setBackgroundImage(resp.imageUrl);
      if (coloringPageContainerRef.current) {
        coloringPageContainerRef.current.style.backgroundImage = `url(data:image/png;base64,${resp.imageUrl})`;
      }
    } catch (error) {
      await reverseCredits("coloring-page");
      console.error("Error fetching background image:", error);
    }
  };

  const renderHanziCharacter = () => {
    if (downloadContainerRef.current) {
      downloadContainerRef.current.innerHTML = "";

      const writer = HanziWriter.create(
        downloadContainerRef.current,
        selectedWord,
        {
          width: 500, // Set a fixed width for the character box
          height: 500, // Set a fixed height for the character box
          padding: 5,
          strokeColor: "#dddddd",
          showCharacter: false,
          showOutline: true,
          outlineColor: "#000000",
        }
      );

      writer.showCharacter();
    }
  };

  const handleDownloadImage = async () => {
    const svgElement = downloadContainerRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;

    const v = Canvg.fromString(ctx, svgData);
    await v.render();

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${selectedWord}_coloring.png`;
    link.click();
  };

  const handleDownloadPDF = async () => {
    if (
      !downloadContainerRef.current ||
      !coloringPageContainerRef.current ||
      !canvasRef.current
    ) {
      console.error("Missing required elements for PDF generation.");
      return;
    }

    await generateColoringPDF({
      wordContainer: downloadContainerRef.current,
      backgroundContainer: coloringPageContainerRef.current,
      fileName: `${selectedWord}_coloring_pages`,
      canvasElement: canvasRef.current,
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">
          {t("coloringPage.coloringPageFor", { word: selectedWord })}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center items-center">
          {/* Word Box */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              ref={downloadContainerRef}
              className="p-4 rounded-lg shadow-lg mb-6 bg-white bg-cover bg-center w-[500px] h-[500px] flex items-center justify-center"
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />

            <ReusableButton
              onClick={handleDownloadImage}
              icon={DownloadOutlined} // Pass the icon (with appropriate styles)
              text={t("coloringPage.downloadWord")}
              isDisabled={false} // Button is enabled by default
            />
          </div>

          {/* Coloring Page Box */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              ref={coloringPageContainerRef}
              className="p-4 rounded-lg shadow-lg mb-6 bg-white w-[500px] h-[500px] bg-contain bg-center flex items-center justify-center"
            >
              {backgroundImage ? (
                <img
                  src={`data:image/png;base64,${backgroundImage}`}
                  alt="Coloring Page"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Loader /> // Show loader when backgroundImage is not available
              )}
            </div>
            {backgroundImage ? (
              <ReusableButton
                onClick={handleDownloadPDF}
                icon={DownloadOutlined}
                text={t("coloringPage.downloadPage")}
                isDisabled={false}
              />
            ) : (
              <p className="text-gray-500">Loading coloring page...</p>
            )}
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-700 transition duration-200"
        >
          {t("goBack")}
        </button>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
