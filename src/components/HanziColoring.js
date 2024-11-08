// import HanziWriter from "hanzi-writer";

// const HanziColoring = ({ word }) => {
//   const getHanziOutline = () => {
//     document.getElementById("coloring-target-div").innerHTML = "";

//     const writer = HanziWriter.create("coloring-target-div", word, {
//       width: 150,
//       height: 150,
//       padding: 5,
//       // showOutline: true,
//       showCharacter: false,
//       delayBetweenStrokes: 2000, // Keeps the outline visible for coloring
//       // outlineColor: "#333",
//     });
//     writer.quiz();
//   };

//   return (
//     <div>
//       <div id="coloring-target-div" />
//       <button
//         onClick={getHanziOutline}
//         className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
//       >
//         Start Coloring
//       </button>
//     </div>
//   );
// };

// export default HanziColoring;

import HanziWriter from "hanzi-writer";
import { useEffect, useRef } from "react";

const HanziColoring = ({ word }) => {
  const coloringTargetRef = useRef(null);
  const downloadTargetRef = useRef(null);

  useEffect(() => {
    getHanziOutline();
  }, [word]);

  const getHanziOutline = () => {
    // Clear previous content in the coloring target
    coloringTargetRef.current.innerHTML = "";

    const writer = HanziWriter.create(coloringTargetRef.current, word, {
      width: 150,
      height: 150,
      padding: 5,
      showCharacter: false,
      delayBetweenStrokes: 2000,
    });
    writer.quiz();
  };

  // Function to draw only the outline in the download target
  const drawOutlineOnly = () => {
    downloadTargetRef.current.innerHTML = "";

    HanziWriter.create(downloadTargetRef.current, word, {
      width: 150,
      height: 150,
      padding: 5,
      showCharacter: false,
      strokeColor: "#000", // Outline color
      delayBetweenStrokes: 1000,
    }).quiz(); // Shows only the outline for download
  };

  return (
    <div>
      <div ref={coloringTargetRef} id="coloring-target-div" />

      <button
        onClick={getHanziOutline}
        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-800 transition duration-200"
      >
        Start Coloring
      </button>
    </div>
  );
};

export default HanziColoring;
