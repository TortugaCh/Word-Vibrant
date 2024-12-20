const API_KEY = process.env.GOOGLE_CLOUD_API_KEY;
const url = `https://texttospeech.googleapis.com/v1/voices?key=${API_KEY}`;

export default async function handler(req, res) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Available Voices:", data); // Logs all voices
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching voices:", error);
    res.status(500).json({ error: "Failed to fetch available voices." });
  }
}
