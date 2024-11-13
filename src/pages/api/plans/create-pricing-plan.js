// import { addDoc, collection } from "firebase/firestore";
// import PricingPlan from "../../../models/PricingPlan/PricingPlan";
// import { db } from "../../../lib/firebaseConfig";

// export default async function handler(req, res) {
//     if (req.method === "POST") {
//       try {
//         console.log(req.body);
//         const plan = PricingPlan.validate(req.body);
//         console.log(plan);
//         const planData = Object.assign({}, plan);
//         const planCollection = collection(db, "pricingplans");
//         const addedPlan = await addDoc(
//           planCollection,
//           planData
//         );
//         res
//           .status(201)
//           .json({
//             message: "Plan created successfully",
//             data: addedPlan,
//           });
//       } catch (err) {
//         res.status(500).json({ error: err.message });
//       }
//     } else {
//       res.setHeader("Allow", "POST");
//       res.status(405).end("Method Not Allowed");
//     }
//   }

import { addDoc, collection, serverTimestamp, getDoc, doc } from "firebase/firestore";
import PricingPlan from "../../../models/PricingPlan/PricingPlan";
import { db } from "../../../lib/firebaseConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("Request Body:", req.body);

      // Validate the incoming request data
      const plan = PricingPlan.validate(req.body);
      console.log("Validated Plan:", plan);

      // Prepare the data to include Firestore timestamps
      const planData = {
        ...plan,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add the new plan to Firestore
      const planCollection = collection(db, "pricingplans");
      const addedPlanRef = await addDoc(planCollection, planData);

      // Fetch the newly created document to return it with the response
      const addedPlanDoc = await getDoc(addedPlanRef);

      if (!addedPlanDoc.exists()) {
        return res.status(404).json({ error: "Plan not found after creation" });
      }

      // Return the newly created document with its ID
      const addedPlan = { id: addedPlanDoc.id, ...addedPlanDoc.data() };

      res.status(201).json({
        message: "Plan created successfully",
        data: addedPlan,
      });
    } catch (err) {
      console.error("Error creating plan:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
