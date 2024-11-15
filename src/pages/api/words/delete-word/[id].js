import Person from "../../../../models/PersonModel/PersonModel";
import { db } from "../../../../lib/firebaseConfig";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Extract the email from the query parameter
  //   const params=useParams();
  const { id } = req.query;
  console.log(req.query);

  if (!id) {
    return res.status(400).json({ error: "Word Id is required" });
  }

  try {
    // Reference to the "persons" collection
    const wordRef = doc(db, "words",id);

    // Create a query to find a document where the email matches
    const wordDoc = await getDoc(wordRef);

    // Check if a user document is found
    if (!wordDoc.exists()) {
      return res.status(404).json({ error: "Word not found" });
    }

    //DELETE THE WORD
    await deleteDoc(wordRef);
    console.log(`Deleted word: ${word}`);
    // Return the updated word data
    const wordData = { id: wordDoc.id, ...wordDoc.data() };
    return res.status(200).json(wordData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
