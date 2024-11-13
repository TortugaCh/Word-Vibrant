import Person from "../../../models/PersonModel/PersonModel";
import { db } from "../../../lib/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const personDetails = Person.validate(req.body);
      console.log(personDetails);
      const personData = Object.assign({}, personDetails);
      const personCollection = collection(db, "persons");
      const addedPerson = await addDoc(personCollection, personData);
      res
        .status(200)
        .json({ message: "Module created successfully", data: addedPerson });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
