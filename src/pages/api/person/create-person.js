import Person from "../../../models/PersonModel/PersonModel";
import { db } from "../../../lib/firebaseConfig";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const personDetails = Person.validate(req.body);
      console.log(personDetails);
      const personData = Object.assign({}, personDetails);
      const personCollection = collection(db, "persons");
      const addedPerson = await addDoc(personCollection, personData);
      // Fetch the added person document by ID
      const personDocRef = doc(db, "persons", addedPerson.id);
      const personDoc = await getDoc(personDocRef);

      if (personDoc.exists()) {
        const personData = { id: personDoc.id, ...personDoc.data() };

        res.status(200).json({
          message: "Person created successfully",
          data: personData,
        });
      } else {
        res.status(404).json({ error: "Person not found after creation" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
