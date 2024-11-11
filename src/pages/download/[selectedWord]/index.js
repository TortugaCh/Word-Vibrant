import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";
import { Canvg } from "canvg";

const DownloadPage = () => {
  const router = useRouter();
  const { selectedWord } = router.query;
  const downloadContainerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedWord) {
      renderHanziCharacter();
    }
  }, [selectedWord]);

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
          strokeColor: "#000",
          showCharacter: false,
          showOutline: true,
        }
      );
      writer.quiz();

      // Add a background to the SVG after rendering
      setTimeout(() => {
        const svgElement = downloadContainerRef.current.querySelector("svg");
        if (svgElement) {
          injectSVGBackground(svgElement);
        }
      }, 100);
    }
  };

  // Function to inject a white background into the SVG
  const injectSVGBackground = (svgElement) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "#ffffff");
    svgElement.insertBefore(rect, svgElement.firstChild);
  };

  const handleDownloadImage = async () => {
    const svgElement = downloadContainerRef.current.querySelector("svg");
    if (!svgElement) {
      console.error("SVG element not found in download container.");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    // Serialize the SVG content
    const svgData = new XMLSerializer().serializeToString(svgElement);

    // Use Canvg to render the SVG onto the canvas
    const v = await Canvg.fromString(ctx, svgData);
    await v.render();

    // Download the canvas content as a PNG
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png", 1.0);
    link.download = `${selectedWord}_coloring.png`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">
        Download Coloring Page for {selectedWord}
      </h1>
      <div
        ref={downloadContainerRef}
        className="p-4 rounded-lg shadow-lg mb-6 bg-white"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <button
        onClick={handleDownloadImage}
        className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
      >
        Download Image
      </button>
      <button
        onClick={() => router.back()}
        className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-700 transition duration-200"
      >
        Go Back
      </button>
    </div>
  );
};

export default DownloadPage;
