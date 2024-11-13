// import React, { useEffect, useRef } from "react";
// import HanziWriter from "hanzi-writer";

// const HanziStroke = ({ word, draw }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     // Clear the container's innerHTML to avoid re-initialization issues
//     containerRef.current.innerHTML = "";

//     // Initialize HanziWriter instance
//     const writer = HanziWriter.create(containerRef.current, word, {
//       width: 250,
//       height: 250,
//       padding: 10,
//       showOutline: true,
//     });

//     if (draw) {
//       writer.quiz();
//     } else {
//       function startLoopedAnimation() {
//         writer.animateCharacter({
//           onComplete: () => {
//             setTimeout(startLoopedAnimation, 500); // Add a delay before looping
//           },
//         });
//       }
//       startLoopedAnimation();
//     }

//     // Cleanup on component unmount or when `word` changes
//     return () => {
//       if (containerRef.current) containerRef.current.innerHTML = ""; // Clear previous instance
//     };
//   }, [word, draw]); // Re-run if `word` or `draw` changes

//   return (
//     <div
//       ref={containerRef}
//       className="bg-gray-100 rounded-lg shadow-md flex items-center justify-center p-6"
//       style={{ width: 300, height: 300 }}
//     ></div>
//   );
// };

// export default HanziStroke;

import React, { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";

const HanziStroke = ({ word, draw }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear the container's innerHTML to avoid re-initialization issues
    containerRef.current.innerHTML = "";

    // Initialize HanziWriter instance with traditional characters support
    const writer = HanziWriter.create(containerRef.current, word, {
      width: 250,
      height: 250,
      padding: 10,
      showOutline: true,
      charDataLoader: (char) => {
        // Force using traditional character data
        return HanziWriter.loadCharacterData(char, {traditional: true});
      },
    });

    if (draw) {
      writer.quiz();
    } else {
      function startLoopedAnimation() {
        writer.animateCharacter({
          onComplete: () => {
            setTimeout(startLoopedAnimation, 500);
          },
        });
      }
      startLoopedAnimation();
    }

    // Cleanup on component unmount or when `word` changes
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [word, draw]);

  return (
    <div
      ref={containerRef}
      className="bg-gray-100 rounded-lg shadow-md flex items-center justify-center p-6"
      style={{ width: 300, height: 300 }}
    ></div>
  );
};

export default HanziStroke;
