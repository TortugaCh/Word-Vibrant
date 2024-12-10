import { adminAuth } from "../../../../../lib/firebaseAdmin";
import { db } from "../../../../../lib/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query; // Firestore document ID
  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }

  try {
    console.log(id)
    // Reference to the "persons" document
    const userDocRef = doc(db, "persons", id);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      return res.status(404).json({ error: "User not found in Firestore" });
    }

    const userData = userDocSnap.data();

    // Extract the Firebase Authentication userId from the Firestore record
    const { userId } = userData;

    if (!userId) {
      return res.status(400).json({ error: "No associated Firebase Authentication userId found" });
    }

    // Delete the user from Firebase Authentication using the Admin SDK
    await adminAuth.deleteUser(userId);

    // Delete the user document from Firestore
    await deleteDoc(userDocRef);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
