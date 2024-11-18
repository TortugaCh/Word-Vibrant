import { adminAuth } from "../../../lib/firebaseAdmin";
import { db } from "../../../lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { token, action } = req.body;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token found" });
  }

  try {
    // Verify the Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;
    console.log(userId);
    // Fetch user data from Firestore
    const usersRef = collection(db, "persons");
    const q = query(usersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Person not found" });
    }

    // Assuming userId is unique, get the first document
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    console.log(userData);

    // Check if user has enough credits
    if (userData.credits <= 0) {
      return res
        .status(403)
        .json({ success: false, message: "Insufficient credits" });
    }

    const modules = collection(db, "modules");
    const q1 = query(modules, where("value", "==", action));
    const querySnapshot1 = await getDocs(q1);
    console.log(querySnapshot1);
    if (querySnapshot1.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Module not found" });
    }
    const moduleDoc = querySnapshot1.docs[0];
    console.log(moduleDoc);
    const moduleData = moduleDoc.data();
    const creditsToDeduct = moduleData.creditCost;
    console.log(moduleData);
    console.log(creditsToDeduct);

    // Deduct credits based on action
    const remainingCredits = userData.credits - creditsToDeduct;
    console.log(remainingCredits);
    // Update user credits in Firestore
    const userDocRef = doc(db, "persons", userDoc.id);
    await updateDoc(userDocRef, { credits: remainingCredits });

    return res.status(200).json({ success: true, remainingCredits });
  } catch (error) {
    console.error("Error in deductCredits:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
