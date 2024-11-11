import Module from "../../../models/ModuleModel/ModuleModel";
import {db} from "../../../lib/firebaseConfig"
import { addDoc, collection } from "firebase/firestore";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const moduleDetails = Module.validate(req.body);
      console.log(moduleDetails);
      const moduleData = Object.assign({}, moduleDetails);

    //   const moduleData = moduleDetails.toJSON();  // Convert to a plain object
    //   console.log(moduleData);
      const moduleCollection = collection(db,"modules");
      const addedModule = await addDoc(moduleCollection, moduleData);
      //   await moduleCollection.add(moduleDetails.toFirestore());
      res
        .status(201)
        .json({ message: "Module created successfully", data: addedModule });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
