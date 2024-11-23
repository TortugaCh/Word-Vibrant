import React, { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";
import { useRouter } from "next/router";
import { MdReplay } from "react-icons/md";
import { PiEar } from "react-icons/pi";

const HanziStroke = ({ word, draw, t, voiceLoaded, speakTaiwanese }) => {
  const containerRef = useRef(null);
  const writerRef = useRef(null);
  const router = useRouter();
  const { locale } = router;

  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const replayAnimation = () => {
    if (!isAnimationComplete) return; // Prevent replay if the animation isn't completed
    setIsAnimationComplete(false); // Disable the button while the animation replays
    containerRef.current.innerHTML = "";
    const writer = loadCharacter();

    writer.animateCharacter({
      onComplete: () => {
        setIsAnimationComplete(true); // Enable replay after animation finishes
      },
    });
  };

  const loadCharacter = () => {
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
      return writer;
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const writer = loadCharacter();

    if (draw) {
      writer.quiz({
        onComplete: () => {
          setIsAnimationComplete(true); // Enable "Listen" button after quiz interaction completes
        },
      });
    } else {
      writer.animateCharacter({
        onComplete: () => {
          setIsAnimationComplete(true); // Enable replay after animation finishes
        },
      });
    }
  }, [word, draw, locale]);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="bg-gray-100 rounded-lg shadow-md flex items-center justify-center p-6"
        style={{ width: 300, height: 300 }}
      ></div>
      {!draw ? (
        <button
          onClick={replayAnimation}
          className={`mt-6 px-4 py-2 rounded flex items-center gap-2 ${
            isAnimationComplete
              ? "bg-blue-500 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isAnimationComplete} // Disable button until animation is complete
        >
          <MdReplay color="white" size={32} />
          {t("practice.replay")}
        </button>
      ) : (
        <button
          onClick={() => speakTaiwanese(word)}
          className={`mt-6 px-4 py-2 rounded flex items-center gap-2 ${
            voiceLoaded
              ? "bg-blue-500 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!voiceLoaded} // Disable until quiz completes and voice is loaded
        >
          <PiEar color="white" size={32} />
          {t("practice.listen")}
        </button>
      )}
    </div>
  );
};

export default HanziStroke;
