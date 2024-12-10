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
              "You are a helpful assistant that can speak both Traditional Chinese.",
          },
          {
            role: "user",
            content: `Generate a short, natural dialogue in Traditional Chinese using the word "${prompt}". The response should be a JSON array of objects, where each object has the following structure:
            - "traditionalChinese": Dialogue in Traditional Chinese.
            Example:
            [
              { "traditionalChinese": "你好！你叫什麼名字？" },
              { "traditionalChinese": "我叫小明。你呢？"}
            ]
            Limit the dialogue to 5-6 exchanges. Ensure the output is valid JSON.`,
          },
        ],
        max_tokens: 300,
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

        // Validate that it's an array of objects with required keys
        if (
          Array.isArray(parsedData) &&
          parsedData.every((d) => d.traditionalChinese && d.english)
        ) {
          res.status(200).json({ data: parsedData });
        } else {
          throw new Error("Parsed data is not in the expected format.");
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        res.status(400).json({
          error:
            "Failed to parse response data from OpenAI. Invalid JSON format.",
        });
      }
    } else {
      res.status(400).json({ error: "Invalid response from OpenAI." });
    }
  } catch (error) {
    console.error("Error in API call to OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch dialogue from OpenAI." });
  }
}
