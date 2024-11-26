// import { useRouter } from "next/router";
// import { useEffect, useRef, useState } from "react";
// import HanziWriter from "hanzi-writer";
// import { Canvg } from "canvg";

// const DownloadPage = () => {
//   const router = useRouter();
//   const { selectedWord } = router.query;
//   const downloadContainerRef = useRef(null);
//   const colorCanvasRef = useRef(null);
//   const coloringPageContainerRef = useRef(null);
//   const [backgroundImage, setBackgroundImage] = useState(null); // State for background image URL
//   const canvasRef = useRef(null);
//   const { locale } = router;
//   useEffect(() => {
//     if (selectedWord) {
//       fetchBackgroundImage(selectedWord);
//       renderHanziCharacter();
//     }
//   }, [selectedWord, locale]);

//   // Fetch the DALL·E generated background from the API
//   const fetchBackgroundImage = async (word) => {
//     try {
//       const prompt = `A playful and colorful landscape with friendly animals, bright flowers, which explains the meaning of the ${word}, its should be an coloring page where user himself can color such that no coloring. The background is fun, vibrant, and suitable for a children's coloring page.`;
//       const response = await fetch("/api/dalle", {
//         method: "POST",
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await response.json();
//       setBackgroundImage(data.imageUrl); // Set the background image URL
//       if (backgroundImage) {
//         renderHanziCharacter();
//       }
//       if (coloringPageContainerRef.current) {
//         coloringPageContainerRef.current.style.backgroundImage = `url(${data.imageUrl})`; // Apply background image
//         // Wait for the Hanzi character to be rendered and adjust position
//         setTimeout(() => {
//           const svgElement =
//             coloringPageContainerRef.current.querySelector("svg");
//           if (svgElement) {
//             injectSVGBackground(svgElement);
//           }
//         }, 100);
//       }
//     } catch (error) {
//       console.error("Error fetching background image:", error);
//     }
//   };

//   // const renderHanziCharacter = () => {
//   //   if (downloadContainerRef.current) {
//   //     downloadContainerRef.current.innerHTML = "";
//   //     const writer = HanziWriter.create(
//   //       downloadContainerRef.current,
//   //       selectedWord,
//   //       {
//   //         width: 500,
//   //         height: 500,
//   //         padding: 5,
//   //         strokeColor: "#dddddd",
//   //         showCharacter: false,
//   //         showOutline: true,
//   //         outlineColor: "#000000",
//   //       }
//   //     );
//   //     writer.showCharacter();

//   //     // Add a background to the SVG after rendering
//   //     // setTimeout(() => {
//   //     //   const svgElement = downloadContainerRef.current.querySelector("svg");
//   //     //   if (svgElement) {
//   //     //     injectSVGBackground(svgElement);
//   //     //   }
//   //     // }, 100);
//   //   }
//   // };

//   // Function to inject a white background into the SVG

//   // Render Hanzi character on top of the background
//   const renderHanziCharacter = () => {
//     if (downloadContainerRef.current) {
//       downloadContainerRef.current.innerHTML = "";

//       const writer = HanziWriter.create(
//         downloadContainerRef.current,
//         selectedWord,
//         {
//           width: 500,
//           height: 500,
//           padding: 5,
//           strokeColor: "#dddddd",
//           showCharacter: false,
//           showOutline: true,
//           outlineColor: "#000000",
//         }
//       );

//       writer.showCharacter();

//       // Wait for the Hanzi character to be rendered and adjust position
//       setTimeout(() => {
//         const svgElement = downloadContainerRef.current.querySelector("svg");
//         if (svgElement) {
//           // Center the Hanzi character inside the container
//           injectSVGBackground(svgElement);
//           // svgElement.style.position = "absolute";
//           // svgElement.style.top = "50%";
//           // svgElement.style.left = "50%";
//           // svgElement.style.transform = "translate(-50%, -50%)";
//         }
//       }, 100);
//     }
//   };
//   const injectSVGBackground = (svgElement) => {
//     const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//     rect.setAttribute("x", "0");
//     rect.setAttribute("y", "0");
//     rect.setAttribute("width", "100%");
//     rect.setAttribute("height", "100%");
//     rect.setAttribute("fill", "#ffffff");
//     svgElement.insertBefore(rect, svgElement.firstChild);
//   };

//   const handleDownloadImage = async (ref, canvasRef, size) => {
//     console.log(ref, canvasRef);
//     const svgElement = ref.current.querySelector("svg");
//     if (!svgElement) {
//       console.error("SVG element not found in download container.");
//       return;
//     }

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = size;
//     canvas.height = size;

//     // Serialize the SVG content
//     const svgData = new XMLSerializer().serializeToString(svgElement);

//     // Use Canvg to render the SVG onto the canvas
//     const v = Canvg.fromString(ctx, svgData);
//     await v.render();

//     // Download the canvas content as a PNG
//     const link = document.createElement("a");
//     link.href = canvas.toDataURL("image/png", 1.0);
//     link.download = `${selectedWord}_coloring.png`;
//     link.click();
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50">
//       <h1 className="text-3xl font-bold text-purple-700 mb-8">
//         Coloring Page for {selectedWord}
//       </h1>
//       <div className="flex gap-4 md:flex-row flex-col">
//         <div>
//           <div
//             ref={downloadContainerRef}
//             className="p-4 rounded-lg shadow-lg mb-6 bg-white  bg-cover bg-center"
//           />
//           <canvas ref={canvasRef} style={{ display: "none" }} />
//           <button
//             onClick={() =>
//               handleDownloadImage(downloadContainerRef, canvasRef, 500)
//             }
//             className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
//           >
//             Download Word
//           </button>
//         </div>
//         <div>
//           <div
//             ref={coloringPageContainerRef}
//             className="p-4 rounded-lg shadow-lg mb-6 bg-white w-[500px] h-[500px] bg-cover bg-center"
//           />
//           <canvas ref={colorCanvasRef} style={{ display: "none" }} />
//           <button
//             onClick={() =>
//               handleDownloadImage(
//                 coloringPageContainerRef,
//                 colorCanvasRef,
//                 1024
//               )
//             }
//             className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
//           >
//             Download Coloring Page
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={() => router.back()}
//         className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-700 transition duration-200"
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default DownloadPage;
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";
import { Canvg } from "canvg";

const DownloadPage = () => {
  const router = useRouter();
  const { selectedWord } = router.query;
  const downloadContainerRef = useRef(null);
  const colorCanvasRef = useRef(null);
  const coloringPageContainerRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(null); // State for background image URL
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedWord) {
      fetchBackgroundImage(selectedWord);
      renderHanziCharacter();
    }
  }, [selectedWord]);

  // Fetch the DALL·E generated background from the API
  const fetchBackgroundImage = async (word) => {
    try {
      const prompt = `A playful and colorful landscape with friendly animals, bright flowers, which explains the meaning of the ${word}, its should be an coloring page where user himself can color such that no coloring. The background is fun, vibrant, and suitable for a children's coloring page. Note: Don't print the word just the coloring page.`;
      const response = await fetch("/api/dalle", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setBackgroundImage(data.imageUrl); // Set the background image URL
      if (backgroundImage) {
        renderHanziCharacter();
      }
      if (coloringPageContainerRef.current) {
        coloringPageContainerRef.current.style.backgroundImage = `url(${data.imageUrl})`; // Apply background image
      }
    } catch (error) {
      console.error("Error fetching background image:", error);
    }
  };

  // Render Hanzi character on top of the background
  const renderHanziCharacter = () => {
    if (downloadContainerRef.current) {
      downloadContainerRef.current.innerHTML = ""; // Clear previous content

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

      // Ensure the SVG is fully rendered
      setTimeout(() => {
        const svgElement = downloadContainerRef.current.querySelector("svg");
        if (svgElement) {
          injectSVGBackground(svgElement); // Add background to the SVG
        }
      }, 200); // Wait for HanziWriter to complete rendering
    }
  };

  const injectSVGBackground = (svgElement) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "#ffffff");
    svgElement.insertBefore(rect, svgElement.firstChild); // Add white background
  };

  // Handle the download image logic
  const handleDownloadImage = async (ref, canvasRef, size) => {
    const svgElement = ref.current.querySelector("svg");

    if (!svgElement) {
      console.error("SVG element not found in download container.");
      return;
    }
    // Serialize the SVG content
    const svgData = new XMLSerializer().serializeToString(svgElement);

    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;
    
    // Use Canvg to render the SVG onto the canvas
    const v = Canvg.fromString(ctx, svgData);
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
            onClick={() =>
              handleDownloadImage(downloadContainerRef, canvasRef, 500)
            }
            className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200 w-[500px] h-[500px]"
          >
            Download Word
          </button>
        </div>
        <div>
          <div
            ref={coloringPageContainerRef}
            className="p-4 rounded-lg shadow-lg mb-6 bg-white w-[500px]
            h-[500px] bg-contain"
          />
          <canvas ref={colorCanvasRef} style={{ display: "none" }} />
          <a
            href={backgroundImage}
            target=""
            download={`${selectedWord}_coloring_page.png`}
            className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
          >
            Download Coloring Page
          </a>
        </div>
      </div>

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
