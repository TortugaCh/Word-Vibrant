import { db } from "../../../lib/firebaseConfig";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Create a query to fetch modules in ascending order by 'createdAt'
      const moduleCollection = collection(db, "modules");
      const moduleQuery = query(moduleCollection, orderBy("createdAt", "asc"));
      const moduleSnapshot = await getDocs(moduleQuery);

      // Map through documents to prepare response
      const modules = moduleSnapshot.docs.map((doc) => {
        return { moduleId: doc.id, ...doc.data() };
      });

      res
        .status(200)
        .json({ message: "Modules fetched successfully", data: modules });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
