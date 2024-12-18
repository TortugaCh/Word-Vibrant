export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  console.log("text", text);
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const API_KEY = process.env.GOOGLE_CLOUD_API_KEY; // Replace with your API key
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
  console.log("url", url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: "zh-TW", name: "zh-TW-Wavenet-A" },
        audioConfig: { audioEncoding: "MP3" },
      }),
    });

    if (!response.ok) {
      throw new Error(`Google TTS API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json({ audioContent: data.audioContent });
  } catch (error) {
    console.error("Error calling Google TTS API:", error);
    res.status(500).json({ error: "Failed to generate speech." });
  }
}
