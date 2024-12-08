import Person from "../../../../models/PersonModel/PersonModel";
import { db } from "../../../../lib/firebaseConfig";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Extract the email from the query parameter
  //   const params=useParams();
  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ error: "Word Id is required", success: false });
  }

  // try {
    // Reference to the "persons" collection
    console.log(id);
    const wordRef = doc(db, "words", id);
    console.log(wordRef);
    // Create a query to find a document where the email matches
    const wordDoc = await getDoc(wordRef);

    // Check if a user document is found
    if (!wordDoc.exists()) {
      return res.status(404).json({ error: "Word not found", success: false });
    }

    //DELETE THE WORD
    await deleteDoc(wordRef);
    // Return the updated word data
    const wordData = { id: wordDoc.id, ...wordDoc.data() };
    return res.status(200).json(wordData);
  // } catch (error) {
  //   console.error("Error fetching user:", error);
  //   return res
  //     .status(500)
  //     .json({ error: "Internal server error", success: false });
  // }
}
