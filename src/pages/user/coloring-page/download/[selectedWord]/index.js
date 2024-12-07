import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";
import { Canvg } from "canvg";
import DashboardLayout from "../../../layout";

const DownloadPage = () => {
  const router = useRouter();
  const { selectedWord } = router.query;
  const downloadContainerRef = useRef(null);
  const colorCanvasRef = useRef(null);
  const coloringPageContainerRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedWord) {
      fetchBackgroundImage(selectedWord);
      renderHanziCharacter();
    }
  }, [selectedWord]);

  // const fetchBackgroundImage = async (word) => {
  //   try {
  //     const response = await fetch("/api/dalle", {
  //       method: "POST",
  //       body: JSON.stringify({ word }),
  //     });

  //     const data = await response.json();
  //     setBackgroundImage(data.imageUrl);

  //     if (coloringPageContainerRef.current) {
  //       coloringPageContainerRef.current.style.backgroundImage = `url(${data.imageUrl})`;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching background image:", error);
  //   }
  // };
  const fetchBackgroundImage = async (word, description) => {
    try {
      const response = await fetch("/api/dalle", {
        method: "POST",
        body: JSON.stringify({ word: description }),
      });

      const data = await response.json();
      setBackgroundImage(data.imageUrl);

      if (coloringPageContainerRef.current) {
        coloringPageContainerRef.current.style.backgroundImage = `url(${data.imageUrl})`;
      }
    } catch (error) {
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
          width: 500,
          height: 500,
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

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">
          Coloring Page for {selectedWord}
        </h1>
        <div className="flex gap-4 md:flex-row flex-col">
          <div>
            <div
              ref={downloadContainerRef}
              className="p-4 rounded-lg shadow-lg mb-6 bg-white bg-cover bg-center"
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <button
              onClick={handleDownloadImage}
              className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
            >
              Download Word
            </button>
          </div>
          <div>
            <div
              ref={coloringPageContainerRef}
              className="p-4 rounded-lg shadow-lg mb-6 bg-white w-[500px] h-[500px] bg-contain"
            />
            {backgroundImage ? (
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = backgroundImage;
                  link.download = `${selectedWord}_coloring_page.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
              >
                Download Coloring Page
              </button>
            ) : (
              <p className="text-gray-500">Loading coloring page...</p>
            )}
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-700 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </DashboardLayout>
  );
};

export default DownloadPage;
