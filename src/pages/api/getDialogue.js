// pages/api/getDialogue.js

import axios from "axios";

export default async function handler(req, res) {
  const { prompt } = req.body;
  console.log(prompt);
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions", // Use chat completions endpoint
    {
      model: "gpt-4", // GPT-4 model
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that can speak both Traditional Chinese and English.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150, // Limit response length (adjust if necessary)
      temperature: 0.7, // Adjust creativity level
    },

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  console.log("OpenAI Response:", response.data);
    const responseData = response.data;
  if (responseData && responseData.choices && responseData.choices.length > 0) {
    const dialogueText = responseData.choices[0].message.content.trim();
    
    // Check if the response text looks valid JSON
    try {
      const parsedData = JSON.parse(dialogueText);
      console.log("Parsed Dialogue:", parsedData);

      // Send the valid parsed response back to the frontend
      res.status(200).json({ data: parsedData });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(400).json({ error: "Failed to parse response data from OpenAI" });
    }
  } else {
    res.status(400).json({ error: "Invalid response from OpenAI" });
  }
//   console.log(data);
  // Send the response data back to the frontend
//   res.status(200).json({
//     data: response.data.choices[0].message.content.trim(), // Extract dialogue content
//   });
}
