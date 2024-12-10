const fetchWithTimeout = async (resource, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(resource, { ...options, signal: controller.signal }).finally(
    () => clearTimeout(id)
  );
};

const fetchWithRetry = async (url, options, retries = 3, timeout = 30000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchWithTimeout(url, options, timeout);
      if (response.ok) return response;
    } catch (error) {
      if (i === retries - 1) throw error; // Throw error after last retry
    }
  }
};

export default async function handler(req, res) {
  try {
    const { word } = JSON.parse(req.body);

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

    const response = await fetchWithRetry(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          Allow,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: refinedPrompt,
          n: 1,
          size: "1024x1024",
        }),
      },
      3, // Retry up to 3 times
      30000 // Timeout of 30 seconds
    );

    const data = await response.json();
    if (!data || !data.data || !data.data.length) {
      throw new Error("No image generated");
    }

    res.status(200).json({ imageUrl: data.data[0].url });
  } catch (error) {
    console.error("Error generating image:", error.message || error);
    res.status(500).json({
      error:
        error.name === "AbortError"
          ? "The request timed out. Please try again."
          : "Failed to generate image",
    });
  }
}
