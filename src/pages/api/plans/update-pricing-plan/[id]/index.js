import { db } from "../../../../../lib/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    try {
      // Reference to the "pricingplans" document
      const planDocRef = doc(db, "pricingplans", id);
      const planDocSnap = await getDoc(planDocRef);

      if (!planDocSnap.exists()) {
        return res.status(404).json({ error: "Plan not found in Firestore" });
      }

      const planData = planDocSnap.data();

      // Update Plan
      await updateDoc(planDocRef, { ...planData, ...req.body });

      res.status(201).json({
        message: "Pricing Plan updated successfully",
        data: planData,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method Not Allowed");
  }
}
