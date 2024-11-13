import { db } from "../../../lib/firebaseConfig";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const planCollection = collection(db, "pricingplans");
      const q = query(planCollection, orderBy("createdAt", "desc")); // Sort by creation date in descending order
      const planSnapshot = await getDocs(q);
      const planData = planSnapshot.docs.map((doc) => {
        return { planId: doc.id, ...doc.data() };
      });

      res
        .status(201)
        .json({
          message: "Pricing Plans fetched successfully",
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
