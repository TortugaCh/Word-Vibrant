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
    Create a black-and-white line art coloring page designed for children. 
    The illustration should visually and creatively represent the concept of the word "${word}" Do not include any text, letters, numbers, or symbols in the image. 
    using playful, imaginative, and age-appropriate visuals. Focus on creating a fun, engaging, and whimsical scene that appeals to kids. 
    
    Ensure the design has clear, bold outlines suitable for coloring, with elements that spark creativity and joy.
  `;

    const response = await fetchWithRetry(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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
