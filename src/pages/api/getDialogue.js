// // pages/api/getDialogue.js

// import axios from "axios";

// export default async function handler(req, res) {
//   const { prompt } = req.body;
//   console.log(prompt);
//   const response = await axios.post(
//     "https://api.openai.com/v1/chat/completions", // Use chat completions endpoint
//     {
//       model: "gpt-4", // GPT-4 model
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant that can speak both Traditional Chinese and English.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       max_tokens: 150, // Limit response length (adjust if necessary)
//       temperature: 0.7, // Adjust creativity level
//     },

//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//     }
//   );

//   console.log("OpenAI Response:", response.data);
//     const responseData = response.data;
//   if (responseData && responseData.choices && responseData.choices.length > 0) {
//     const dialogueText = responseData.choices[0].message.content.trim();

//     // Check if the response text looks valid JSON
//     try {
//       const parsedData = JSON.parse(dialogueText);
//       console.log("Parsed Dialogue:", parsedData);

//       // Send the valid parsed response back to the frontend
//       res.status(200).json({ data: parsedData });
//     } catch (parseError) {
//       console.error("Error parsing JSON:", parseError);
//       res.status(400).json({ error: "Failed to parse response data from OpenAI" });
//     }
//   } else {
//     res.status(400).json({ error: "Invalid response from OpenAI" });
//   }
// //   console.log(data);
//   // Send the response data back to the frontend
// //   res.status(200).json({
// //     data: response.data.choices[0].message.content.trim(), // Extract dialogue content
// //   });
// }
import axios from "axios";

export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that can speak both Traditional Chinese and English.",
          },
          {
            role: "user",
            content: `Generate a short, natural dialogue in Traditional Chinese using the word "${prompt}". The response should be a JSON array of objects, where each object has the following structure:
            - "traditionalChinese": Dialogue in Traditional Chinese.
            - "english": English translation of the dialogue.

            Example:
            [
              { "traditionalChinese": "你好！你叫什麼名字？", "english": "Hello! What is your name?" },
              { "traditionalChinese": "我叫小明。你呢？", "english": "My name is Xiao Ming. And you?" }
            ]
            Ensure the output is valid JSON.`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const responseData = response.data;

    if (
      responseData &&
      responseData.choices &&
      responseData.choices.length > 0
    ) {
      const dialogueText = responseData.choices[0].message.content.trim();

      try {
        const parsedData = JSON.parse(dialogueText); // Parse OpenAI's response
        console.log("Parsed Dialogue:", parsedData);
        res.status(200).json({ data: parsedData });
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        console.error("Raw Dialogue Text:", dialogueText);
        res.status(400).json({
          error:
            "Failed to parse response data from OpenAI. Please ensure the prompt generates valid JSON.",
        });
      }
    } else {
      res.status(400).json({ error: "Invalid response from OpenAI" });
    }
  } catch (error) {
    console.error("Error in API call to OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch dialogue from OpenAI" });
  }
}
