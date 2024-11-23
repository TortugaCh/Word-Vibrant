import { db } from "../../../../../lib/firebaseConfig";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;

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
    const updatedData = { ...userDoc.data(), ...req.body };
    await updateDoc(doc(db, "persons", userDoc.id), updatedData);
    const userData = { id: userDoc.id, ...updatedData };
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
