// // pages/api/getStory.js

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
//       max_tokens: 750, // Limit response length (adjust if necessary)
//       temperature: 0.7, // Adjust creativity level
//     },

//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//     }
//   );

//   const responseData = response.data;
//   if (responseData && responseData.choices && responseData.choices.length > 0) {
//     const dialogueText = responseData.choices[0].message.content.trim();
//     return res.status(200).json({ data: dialogueText });
  
//   } else {
//     res.status(400).json({ error: "Invalid response from OpenAI" });
//   }
// }


import axios from "axios";

export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    console.log("Prompt:", prompt);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that writes complete, detailed stories in Traditional Chinese.",
          },
          {
            role: "user",
            content: `${prompt} Please write a complete, detailed, and structured story with a clear beginning, middle, and ending.`,
          },
        ],
        max_tokens: 1500, // Increase token limit
        temperature: 0.8, // Adjust creativity
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const responseData = response.data;

    if (responseData && responseData.choices && responseData.choices.length > 0) {
      const storyText = responseData.choices[0].message.content.trim();
      return res.status(200).json({ data: storyText });
    } else {
      return res.status(400).json({ error: "Invalid response from OpenAI" });
    }
  } catch (error) {
    console.error("Error fetching story from OpenAI:", error.message || error);
    return res.status(500).json({ error: "An error occurred while generating the story." });
  }
}
