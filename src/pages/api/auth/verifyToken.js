import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    // Verify the Firebase ID token using the admin SDK
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);  
    const usersRef = collection(db, "persons");
    const q = query(usersRef, where("userId", "==", decodedToken.userId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return res.status(404).json({ error: "Person not found" });
    }
    const userDoc = querySnapshot.docs[0];
    const subscriptionRef = collection(db, "subscriptions");
    const subscriptionQuery = query(
      subscriptionRef,
      where("userId", "==", decodedToken.userId)
    );
    const subscriptionQuerySnapshot = await getDocs(subscriptionQuery);
    let plan = "Free";
    if (!subscriptionQuerySnapshot.empty) {
      const subscriptionSnapshot = await getDocs(subscriptionQuery);
      const subscriptionDoc = subscriptionSnapshot.docs[0];
      console.log("Subscription:", subscriptionDoc.data());
      const planRef = doc(db, "pricingplans", subscriptionDoc.data().planId); // Reference to the specific document
      const planDoc = await getDoc(planRef); // Fetch the document

      if (planDoc.exists()) {
        console.log("Plan:", planDoc.data()); // Access the document's data
        plan = planDoc.data().name.split(" ")[0]; 
      }
    }
    const userData = { id: userDoc.id, ...userDoc.data(), planName: plan };
    return res.status(200).json({ valid: true, userData });
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ valid: false, message: "Unauthorized" });
  }
}
