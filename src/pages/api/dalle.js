export default async function handler(req, res) {
  const { word } = JSON.parse(req.body);

  // Refined strict prompttttttttttt
  const refinedPrompt = `
  Create a delightful, black-and-white line art coloring page designed specifically for children. 
  The illustration should creatively and playfully represent the concept of the word "${word}" through cheerful and engaging visuals. 
  Focus on fun, imaginative scenes that children will love to color, featuring friendly animals, whimsical nature elements like flowers, trees, hills, flowing rivers, rainbows, and happy sunshine. 
  Include playful details such as smiling clouds, animals interacting joyfully, or simple abstract shapes arranged in patterns.
  
  The artwork must be simple and easy to color, with bold, clean outlines suitable for young children. 
  Avoid intricate details, shading, or anything overly complex, ensuring the design is stress-free and enjoyable for kids.
  
  **Strictly avoid** including any text, symbols, letters, or representations of the word itself within the image. 
  The scene should inspire happiness, creativity, and storytelling, making it perfect for a child’s coloring page.
  `;

  try {
    const response = await fetch(
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
      }
    );

    const data = await response.json();

    if (!data || !data.data || !data.data.length) {
      throw new Error("No image generated");
    }

    res.status(200).json({ imageUrl: data.data[0].url });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
