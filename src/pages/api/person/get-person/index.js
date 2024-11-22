import Person from "../../../../models/PersonModel/PersonModel";
import { db } from "../../../../lib/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Reference to the "persons" collection
    const usersRef = collection(db, "persons");
    const usersSnapshot = await getDocs(usersRef);
    const users = usersSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
