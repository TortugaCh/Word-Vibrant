import { db } from "../../../lib/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Grade from "../../../models/GradeModel/GradeModel";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const grade = Grade.validate(req.body);
      console.log(grade);
      const gradeData = Object.assign({}, grade);
      const gradeCollection = collection(db, "grades");
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
