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
        const subscriptionRef = collection(db, "subscriptions");
        const subscriptionQuery = query(
          subscriptionRef,
          where("userId", "==", personDoc.data().userId)
        );
        const subscriptionQuerySnapshot = await getDocs(subscriptionQuery);
        let plan = "Free";
        if (!subscriptionQuerySnapshot.empty) {
          const subscriptionSnapshot = await getDocs(subscriptionQuery);
          const subscriptionDoc = subscriptionSnapshot.docs[0];
          console.log("Subscription:", subscriptionDoc.data());
          const planRef = doc(
            db,
            "pricingplans",
            subscriptionDoc.data().planId
          ); // Reference to the specific document
          const planDoc = await getDoc(planRef); // Fetch the document

          if (planDoc.exists()) {
            console.log("Plan:", planDoc.data()); // Access the document's data
            plan = planDoc.data().name.split(" ")[0];
          }
        }
        const userData = { id: userDoc.id, ...userDoc.data(), planName: plan };
        return res.status(200).json({ valid: true, userData });
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
