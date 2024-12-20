import axios from "axios";
import { cleanJSON } from "../utils";

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const generateDialogue = async (prompt) => {
  if (!prompt) return { error: "Prompt is required" };

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
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const responseData = response.data;
    console.log("Response from OpenAI:", responseData);

    if (responseData?.choices?.length > 0) {
      const dialogueText = responseData.choices[0].message.content.trim();
      console.log("Raw Dialogue from OpenAI:", dialogueText);

      // Parse and validate JSON
      const cleanedJSON = cleanJSON(dialogueText);
      if (!cleanedJSON) throw new Error("Invalid JSON format received.");

      const parsedData = JSON.parse(cleanedJSON);
      if (
        Array.isArray(parsedData) &&
        parsedData.every((item) => item.traditionalChinese && item.english)
      ) {
        console.log("Validated Parsed Dialogue:", parsedData);
        return { data: parsedData };
      } else {
        throw new Error("Parsed data is not in the expected format.");
      }
    }

    return { error: "Invalid response from OpenAI." };
  } catch (error) {
    console.error("Error in generateDialogue:", error.message);
    return { error: "Failed to generate dialogue." };
  }
};
