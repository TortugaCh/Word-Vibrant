import { db } from "../../../lib/firebaseConfig";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import Semester from "../../../models/SemesterModel/SemesterModel";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const names = ["Semester 1", "Semester 2"];
      const gradeIds = [
        "jgx7kWIX11a1A3W3kmiU",
        "Kp9YsVcvle62cfVXcRRT",
        "7KkQaQyHDVIvkmwVXTLk",
        "vDAeyvqJFNtDE6mvcOc6",
        "1Rzai1MFWcCrKdnZiqpx",
        "y1orzsNfOvsVJNU2jxcC",
      ];

      const semesterArr = [];

      for (let i = 0; i < gradeIds.length; i++) {
        const semesterCollection = collection(db, "semesters");

        for (let j = 0; j < names.length; j++) {
          const semesterName = names[j];
          const gradeId = gradeIds[i];

          // Check if the document already exists
          const q = query(
            semesterCollection,
            where("name", "==", semesterName),
            where("gradeId", "==", gradeId)
          );
          const querySnapshot = await getDocs(q);

          // If the document exists, skip creation
          if (!querySnapshot.empty) {
            console.log(`Document with name "${semesterName}" and gradeId "${gradeId}" already exists`);
            continue;
          }

          // Prepare new semester data
          const newSemester = {
            name: semesterName,
            gradeId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };

          // Add new document
          const addedSemester = await addDoc(semesterCollection, newSemester);
          semesterArr.push(addedSemester.id);
        }
      }

      res.status(201).json({
        message: "Semesters created successfully",
        data: semesterArr,
      });
    } catch (err) {
      console.error("Error creating semesters:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}