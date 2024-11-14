import React, { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";

const HanziStroke = ({ word, draw }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear the container's innerHTML to avoid re-initialization issues
    containerRef.current.innerHTML = "";

    // Initialize HanziWriter instance with traditional characters support
    if (word.length > 1) {
      word = word[0];
    }
    const writer = HanziWriter.create(containerRef.current, word, {
      width: 250,
      height: 250,
      padding: 10,
      showOutline: true,
      charDataLoader: (char) => {
        // Force using traditional character data
        return HanziWriter.loadCharacterData(char, { traditional: true });
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
