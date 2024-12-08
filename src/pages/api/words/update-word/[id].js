import { db } from "../../../../lib/firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log(req.query,req.body)
  const { id } = req.query;
  const { word } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Word ID is required" });
  }

  try {
    // Reference the specific document in the "words" collection
    const wordRef = doc(db, "words", id);

    // Get the document data
    const wordDoc = await getDoc(wordRef);

    // Check if the document exists
    if (!wordDoc.exists()) {
      return res.status(404).json({ error: "Word not found" });
    }

    // Update the word document
    const updatedWord = {
      ...wordDoc.data(),
      name: word,
      updatedAt: serverTimestamp(),
    };

    // Save the updated document
    await setDoc(wordRef, updatedWord, { merge: true });
    console.log(`Updated word: ${word}`);

    // Return the updated word data
    return res.status(200).json({ id, ...updatedWord,success:true });
  } catch (error) {
    console.error("Error updating word:", error);
    return res.status(500).json({ error: "Internal server error",success:false });
  }
}
