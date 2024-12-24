import jsPDF from "jspdf";
import { fetchWithRetry, setCredits } from "../utils";
import { Canvg } from "canvg";

const API_KEY =
  "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";

export const getColoringPage = async (word) => {
  console.log("Generating coloring page for word:", word);
  const refinedPrompt = `
  Create a black-and-white line art coloring page exclusively for children aged 5-10.
  The illustration must visually represent the concept of the word "${word}" without explicitly using the word itself or any form of text, symbols, letters, or numbers.
  The design must adhere to the following strict guidelines:
  - **No Text or Symbols of Any Kind:** Under no circumstances should Chinese characters, English letters, numbers, or symbols appear in the design.
  - **Visual Representation Only:** The concept should be communicated entirely through visual elements, such as objects, scenes, or characters.
  - **Kid-Friendly and Playful:** Ensure the design is engaging, joyful, and appropriate for children.
  - **Simple and Clear Details:** Use bold, clean outlines with simple shapes, avoiding intricate or overly complex elements.
  - **No Hidden or Embedded Text:** Double-check to ensure no text or symbols are embedded, hidden, or implied in the drawing.
  **Important Note:** Any inclusion of text, symbols, or characters will render the illustration invalid.
  Focus on creating a visually appealing and fully non-verbal depiction of the concept for an enjoyable coloring experience.
  The resulting image must be simple, bold, visually distinct, and entirely free from any form of text, characters, symbols, or numbers.
`;

  try {
    const response = await fetchWithRetry(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`, // Use your actual API key
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: refinedPrompt,
          n: 1,
          size: "1024x1024",
          response_format: "b64_json", // This tells the API to return the image as base64
        }),
      },
      3, // Retry up to 3 times
      30000 // Timeout of 30 seconds
    );

    const data = await response.json();

    if (!data || !data.data || !data.data.length) {
      throw new Error("No image generated");
    }

    const base64Image = data.data[0].b64_json; // Base64 encoded image data

    console.log("Base64 image:", base64Image);
    return { imageUrl: base64Image };
  } catch (error) {
    console.error("Error generating image:", error.message || error);
    return null;
  }
};


export const generateColoringPDF = async ({
  wordContainer,
  backgroundContainer,
  fileName,
  canvasElement,
}) => {
  try {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Set the page size (A4 dimensions, you can adjust as needed)
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    // Draw the background image from the background container (if it exists)
    if (backgroundContainer) {
      const backgroundImageUrl =
        backgroundContainer.style.backgroundImage.slice(5, -2); // Extract URL
      const img = new Image();
      img.src = backgroundImageUrl;

      // Wait for the image to load
      await new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
      });

      // Add background image to the first page of the PDF
      pdf.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);

      // If you want to add the word image on a new page, uncomment the line below:
      pdf.addPage();
    }

    // Draw the word (Hanzi character) on the PDF
    if (wordContainer) {
      const svgElement = wordContainer.querySelector("svg");
      if (svgElement) {
        // Convert the SVG to a string and render it to a canvas
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const ctx = canvasElement.getContext("2d");

        // Set canvas size
        canvasElement.width = 500;
        canvasElement.height = 500;

        // Render the SVG to the canvas using Canvg
        const v = Canvg.fromString(ctx, svgData);
        await v.render();

        // Convert the canvas to image data
        const wordImageData = canvasElement.toDataURL("image/png");

        // Add the word image (Hanzi character) to the PDF (adjust position and size)
        // Adjust the position to ensure it doesn't overlap with the background image
        pdf.addImage(wordImageData, "PNG", 10, pageHeight - 200, 190, 190); // Change the position as needed
      }
    }

    // Save the generated PDF
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};