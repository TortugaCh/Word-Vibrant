import { db } from "../../../lib/firebaseConfig";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

//   try {
    const curriculum = {
      name: "NanYi",
      type: "curriculum",
      nameZh: "南逸",
    };

    const lookupCollection = collection(db, "lookup");

    // Use setDoc to set the document with a specific ID
    const docRef = doc(lookupCollection, "kD9EBxwuoe3a9yWRKm7d");

    await setDoc(docRef, {
      ...curriculum,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    res.status(201).json({
      message: "Lookup data populated successfully",
      data: curriculum,  // Adjusted to reflect the actual data added
    });
//   } catch (err) {
//     console.error("Error populating lookup data:", err);
//     res.status(500).json({ error: err.message });
//   }
}
