import React, { useEffect, useRef } from "react";
import strokeData from "zh-stroke-data"; // Importing the zh-stroke-data package

const ZhStroke = ({ word, draw }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear the container to avoid re-initialization issues
    containerRef.current.innerHTML = "";

    // Get stroke data for the character using `zh-stroke-data`
    const strokes = strokeData[word];
    if (!strokes || strokes.length === 0) {
      console.error(`No stroke data found for character: ${word}`);
      return;
    }

    // Create an SVG element
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "300");
    svg.setAttribute("height", "300");
    svg.setAttribute("viewBox", "0 0 1024 1024");
    svg.setAttribute("style", "background-color: #f3f4f6; border-radius: 10px;");
    containerRef.current.appendChild(svg);

    // Function to draw each stroke
    const drawStroke = (path, delay) => {
      const pathElement = document.createElementNS(svgNS, "path");
      pathElement.setAttribute("d", path);
      pathElement.setAttribute("fill", "none");
      pathElement.setAttribute("stroke", "#4F46E5");
      pathElement.setAttribute("stroke-width", "50");
      pathElement.setAttribute("stroke-linecap", "round");
      pathElement.setAttribute("stroke-linejoin", "round");
      pathElement.setAttribute("opacity", "0");

      svg.appendChild(pathElement);

      // Animate the stroke
      setTimeout(() => {
        pathElement.setAttribute("opacity", "1");
      }, delay);
    };

    if (draw) {
      // Draw strokes one by one for quiz mode
      let delay = 0;
      strokes.forEach((stroke) => {
        drawStroke(stroke, delay);
        delay += 500; // 500ms delay between each stroke
      });
    } else {
      // Loop animation for character rendering
      function startLoopedAnimation() {
        let delay = 0;
        strokes.forEach((stroke) => {
          drawStroke(stroke, delay);
          delay += 200;
        });
        setTimeout(() => {
          containerRef.current.innerHTML = "";
          startLoopedAnimation();
        }, delay + 500);
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

export default ZhStroke;
