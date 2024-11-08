import { db } from "../../../lib/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Curriculum from "../../../models/CurriculumModel/CurriculumModel";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const curriculum = Curriculum.validate(req.body);
      console.log(curriculum);
      const curriculumData = Object.assign({}, curriculum);
      const curriculumCollection = collection(db, "curriculums");
      const addedCurriculum = await addDoc(
        curriculumCollection,
        curriculumData
      );
      //   await moduleCollection.add(module.toFirestore());
      res
        .status(201)
        .json({
          message: "Curriculum created successfully",
          data: addedCurriculum,
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
