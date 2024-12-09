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
    Create a black-and-white line art coloring page specifically for children. 
    The illustration must depict the concept of the word "${word}" not the word purely through visuals, without any words, without any letters, without any numbers, or without any symbols of any kind appearing in the image. 
    Focus on fun, playful, and imaginative elements that are age-appropriate and visually engaging for kids. 
    The scene should include clear, bold outlines, simple shapes, and visually distinct details suitable for easy coloring. 
    Avoid any text or textual representation within the drawing, and ensure the entire design is kid-friendly, creative, and joyful.
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
