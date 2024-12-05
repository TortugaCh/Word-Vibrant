import Person from "../../../models/PersonModel/PersonModel";
import { db } from "../../../lib/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { adminAuth } from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let addedPerson = null; // Declare to handle cleanup in case of error
    try {
      const personDetails = Person.validate(req.body);
      const person = Object.assign({}, personDetails);
      // Add person to Firestore
      const personCollection = collection(db, "persons");

      console.log("Adding person to Firestore:", personCollection);
      addedPerson = await addDoc(personCollection, person);

      console.log("Person added with ID:", addedPerson);

      // Fetch the added person document by ID
      const personDocRef = doc(db, "persons", addedPerson.id);
      const personDoc = await getDoc(personDocRef);
      console.log("Person:", personDoc.data());
      if (!personDoc.exists()) {
        throw new Error("Person document not found after creation.");
      }

      // Check for subscriptions
      const subscriptionRef = collection(db, "subscriptions");

      const subscriptionQuery = query(
        subscriptionRef,
        where("userId", "==", personDoc.data().userId)
      );
      const subscriptionQuerySnapshot = await getDocs(subscriptionQuery);

      let plan = "Free"; // Default plan
      if (!subscriptionQuerySnapshot.empty) {
        const subscriptionDoc = subscriptionQuerySnapshot.docs[0];
        console.log("Subscription:", subscriptionDoc.data());

        const planRef = doc(db, "pricingplans", subscriptionDoc.data().planId);
        const planDoc = await getDoc(planRef);

        if (planDoc.exists()) {
          console.log("Plan:", planDoc.data());
          plan = planDoc.data().name.split(" ")[0]; // Extract the first word of the plan name
        }
      }

      const userData = {
        id: personDoc.id,
        ...personDoc.data(),
        planName: plan,
      };
      return res.status(200).json({
        message: "Person Created Successfully!!!",
        success: true,
        userData,
      });
    } catch (err) {
      // Cleanup: Delete the created person and user if something goes wrong
      if (addedPerson) {
        const personDocRef = doc(db, "persons", addedPerson.id);
        const personDoc = await getDoc(personDocRef);

        if (personDoc.exists()) {
          const userId = personDoc.data().userId;
          await adminAuth.deleteUser(userId).catch((authErr) => {
            console.error("Failed to delete user in Firebase Auth:", authErr);
          });
          await deleteDoc(personDocRef).catch((docErr) => {
            console.error("Failed to delete person document:", docErr);
          });
        }
      }
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
