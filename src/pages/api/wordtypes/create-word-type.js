import { db } from "../../../lib/firebaseConfig";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import WordType from "../../../models/WordTypeModel/WordTypeModel";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const wordType = WordType.validate(req.body);
      const typeData = {
        ...wordType,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const wordTypesCollection = collection(db, "wordtypes");
      const q = query(
        wordTypesCollection,
        where("type", "==", wordType.type),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        throw new Error(`Document already exists`);
      }
      const addedType = await addDoc(
        wordTypesCollection,
        typeData
      );
      res
        .status(201)
        .json({
          message: "Word Type created successfully",
          data: addedType,
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}


