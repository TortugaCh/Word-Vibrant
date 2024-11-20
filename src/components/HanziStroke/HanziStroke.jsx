import React, { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";
import { useRouter } from "next/router";

const HanziStroke = ({ word, draw }) => {
  const containerRef = useRef(null);
  const writerRef = useRef(null);
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear the container's innerHTML to avoid re-initialization issues
    if (!writerRef.current || writerRef.current.character !== word) {
      containerRef.current.innerHTML = "";

      // Initialize HanziWriter instance with traditional characters support
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

      writerRef.current = writer;

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
    }
  }, [word, draw, locale]);

  return (
    <div
      ref={containerRef}
      className="bg-gray-100 rounded-lg shadow-md flex items-center justify-center p-6"
      style={{ width: 300, height: 300 }}
    ></div>
  );
};

export default HanziStroke;
