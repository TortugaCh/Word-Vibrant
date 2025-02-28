import { db } from "../../../lib/firebaseConfig";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import Grade from "../../../models/GradeModel/GradeModel";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const grade = Grade.validate(req.body);
      const gradeData = {
        ...grade,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const gradeCollection = collection(db, "grades");
      const q = query(
        gradeCollection,
        where("name", "==", "Grade 6"),
        where("curriculumId", "==", "xORllVexHzFfQOS0dTBh")
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        throw new Error(`Document already exists`);
      }
      const addedGrade = await addDoc(
        gradeCollection,
        gradeData
      );
      res
        .status(201)
        .json({
          message: "Grade created successfully",
          data: addedGrade,
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}


