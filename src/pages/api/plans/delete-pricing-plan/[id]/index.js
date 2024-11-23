import { db } from "../../../../../lib/firebaseConfig";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      // Reference to the "persons" document
      const planDocRef = doc(db, "pricingplans", id);
      const planDocSnap = await getDoc(planDocRef);

      if (!planDocSnap.exists()) {
        return res.status(404).json({ error: "Plan not found in Firestore" });
      }

      const planData = planDocSnap.data();

      // Delete Plan
      await deleteDoc(planDocRef);

      res.status(201).json({
        message: "Pricing Plan Deleted successfully",
        data: planData,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
