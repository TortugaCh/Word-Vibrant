// pages/api/dalle.js

export default async function handler(req, res) {
    const { prompt } = JSON.parse(req.body);
    
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024", // Adjust the size as needed
      }),
    });
    
    const data = await response.json();
    console.log(data);
    // Return the generated image URL
    const imageUrl = data.data[0].url;
    res.status(200).json({ imageUrl });
  }
  