import { db } from "../../../lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const lookupData = [
      // Curriculums
      { name: "NanYi", type: "curriculum", value: "NanYi" },
      { name: "Kangxuan", type: "curriculum", value: "Kangxuan" },
      { name: "Hanlin", type: "curriculum", value: "Hanlin" },

      // Grades
      { name: "Grade 1", type: "grade", value: 1 },
      { name: "Grade 2", type: "grade", value: 2 },
      { name: "Grade 3", type: "grade", value: 3 },
      { name: "Grade 4", type: "grade", value: 4 },
      { name: "Grade 5", type: "grade", value: 5 },
      { name: "Grade 6", type: "grade", value: 6 },

      // Semesters
      { name: "Semester 1", type: "semester", value: 1 },
      { name: "Semester 2", type: "semester", value: 2 },

      // Word Types
      { name: "New Words", type: "wordType", value: "New Words" },
      { name: "Sight Words", type: "wordType", value: "Sight Words" }
    ];

    const lookupCollection = collection(db, "lookup");

    const addedDocs = [];
    for (const item of lookupData) {
      const docRef = await addDoc(lookupCollection, {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      addedDocs.push(docRef.id);
    }

    res.status(201).json({
      message: "Lookup data populated successfully",
      data: addedDocs,
    });
  } catch (err) {
    console.error("Error populating lookup data:", err);
    res.status(500).json({ error: err.message });
  }
}
