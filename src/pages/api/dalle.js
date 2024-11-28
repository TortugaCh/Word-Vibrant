// pages/api/dalle.js

export default async function handler(req, res) {
    const { prompt } = JSON.parse(req.body);
    
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
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
  