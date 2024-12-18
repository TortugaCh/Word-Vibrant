import { cleanJSON } from "../utils";

export const generateDialogue = async (prompt) => {
    if (!prompt) {
      return { error: "Prompt is required" };
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
              content: prompt,
              //             content: `Generate a short, natural dialogue in Traditional Chinese using the word "${prompt}" for kids. The response should be a JSON array of objects, where each object has the following structure:
              //             - "traditionalChinese": Dialogue in Traditional Chinese.
              //             - "english": English translation of the dialogue.
              // Limit the dialogue to 5-6 exchanges. Ensure the output is valid JSON.
              //             Example:
              //             [
              //               { "traditionalChinese": "你好！你叫什麼名字？", "english": "Hello! What is your name?" },
              //               { "traditionalChinese": "我叫小明。你呢？", "english": "My name is Xiao Ming. And you?" }
              //             ]
              //             `,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`, // Use your actual API key
          },
        }
      );
  
      const responseData = response.data;
      console.log("Response from OpenAI:", responseData);
  
      if (
        responseData &&
        responseData.choices &&
        responseData.choices.length > 0
      ) {
        const dialogueText = responseData.choices[0].message.content.trim();
        console.log("Dialogue from OpenAI:", dialogueText);
        try {
          const cleanedJSON = cleanJSON(dialogueText); // Parse OpenAI's response
          if (!cleanedJSON) {
            throw new Error("No valid JSON array found in the response.");
          }
          const parsedData = JSON.parse(cleanedJSON);
          console.log("Parsed Dialogue:", parsedData);
  
          // Validate that it's an array of objects with required keys
          if (
            Array.isArray(parsedData) &&
            parsedData.every((d) => d.traditionalChinese && d.english)
          ) {
            return { data: parsedData };
          } else {
            throw new Error("Parsed data is not in the expected format.");
          }
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          return {
            error:
              "Failed to parse response data from OpenAI. Invalid JSON format.",
          };
        }
      } else {
        return { error: "Invalid response from OpenAI." };
      }
    } catch (error) {
      console.error("Error in API call to OpenAI:", error);
      return { error: "Failed to fetch dialogue from OpenAI." };
    }
  };