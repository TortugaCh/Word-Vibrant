import { db } from "../../../lib/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Grade from "../../../models/GradeModel/GradeModel";
import PricingPlan from "../../../models/PricingPlan/PricingPlan";
// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const grade = Grade.validate(req.body);
//       console.log(grade);
//       const gradeData = Object.assign({}, grade);
//       const gradeCollection = collection(db, "grades");
//       const addedGrade = await addDoc(
//         gradeCollection,
//         gradeData
//       );
//       res
//         .status(201)
//         .json({
//           message: "Grade created successfully",
//           data: addedGrade,
//         });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const plan = PricingPlan.validate(req.body);
      console.log(plan);
      const planData = Object.assign({}, plan);
      const planCollection = collection(db, "pricingplans");
      const addedPlan = await addDoc(
        planCollection,
        planData
      );
      res
        .status(201)
        .json({
          message: "Plan created successfully",
          data: addedPlan,
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}