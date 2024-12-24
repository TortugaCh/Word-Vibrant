import axios from "axios";
import { setCredits } from "../utils";
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const generateStory = async (prompt) => {
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
        temperature: 0.5, // Adjust creativity
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const responseData = response.data;

    if (
      responseData &&
      responseData.choices &&
      responseData.choices.length > 0
    ) {
      const storyText = responseData.choices[0].message.content.trim();

      return { data: storyText };
    } else {
      return {
        error: "Invalid response from OpenAI your credits are added back...",
      };
    }
  } catch (error) {
    console.error("Error fetching story from OpenAI:", error.message || error);
    return {
      error:
        "An error occurred while generating the story your credits are added back...",
    };
  }
};
