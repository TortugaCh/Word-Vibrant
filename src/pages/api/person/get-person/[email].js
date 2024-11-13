import Person from "../../../../models/PersonModel/PersonModel";
import { db } from "../../../../lib/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Extract the email from the query parameter
  //   const params=useParams();
    const { email } = req.query;
  console.log(req.query);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Reference to the "persons" collection
    const usersRef = collection(db, "persons");

    // Create a query to find a document where the email matches
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    // Check if a user document is found
    if (querySnapshot.empty) {
      return res.status(404).json({ error: "Person not found" });
    }

    // Extract user data from the first matching document
    const userDoc = querySnapshot.docs[0];
    const userData = { id: userDoc.id, ...userDoc.data() };

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
