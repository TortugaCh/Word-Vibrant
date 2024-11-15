import { db } from "../../../lib/firebaseConfig";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const semesterCollection = collection(db, "lookup");
    const name = "Semester 1";
    const id = "YhimHVA4W0bNP400EVq7"; // Custom document ID
    const type = "semester";
    try {
      const q = query(semesterCollection, where("name", "==", name));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Reference to the document with the custom ID
        const docRef = doc(semesterCollection, id);

        const newSemester = {
          name: name,
          type: type,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        // Set the document with the custom ID
        await setDoc(docRef, newSemester);
        console.log(`Added semester with ID "${id}" and name "${name}"`);
        res.status(201).json({ message: "Semester added successfully" });
      } else {
        console.log(`Semester "${name}" already exists`);
        res.status(200).json({ message: "Semester already exists" });
      }
    } catch (err) {
      console.error("Error adding semester:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
