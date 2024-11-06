import { db } from "../../../lib/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const moduleCollection = collection(db, "modules");
      const moduleSnapshot = await getDocs(moduleCollection);
      const modules = moduleSnapshot.docs.map((doc) => {
        return { moduleId: doc.id, ...doc.data() };
      });

      res
        .status(201)
        .json({ message: "Module fetched successfully", data: modules });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
