import { db } from "../../../lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { token } = req.cookies;
  const { action, word } = req.body;
  console.log(req.body);
  if (!token) {
    return res.status(401).json({ success: false, message: "No token found" });
  }

  try {
    // Verify the Firebase token
    // Fetch user data from Firestore
    const usersRef = collection(db, "persons");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const q = query(usersRef, where("userId", "==", decodedToken.userId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Person not found" });
    }

    // Assuming userId is unique, get the first document
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    // Check if credits are already deducted for this action and word
    const actionKey = `${action}-${word}`; // Unique key for this action and word
    if (userData.deductedActions?.includes(actionKey)) {
      return res
        .status(200)
        .json({ valid: true, creditsDeducted: true, success: true, userData });
    }

    // Check if user has enough credits
    if (userData.credits <= 0) {
      return res
        .status(403)
        .json({ success: false, message: "Insufficient credits" });
    }

    const modules = collection(db, "modules");
    const q1 = query(modules, where("value", "==", action));
    const querySnapshot1 = await getDocs(q1);
    if (querySnapshot1.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Module not found" });
    }
    const moduleDoc = querySnapshot1.docs[0];
    const moduleData = moduleDoc.data();
    const creditsToDeduct = moduleData.creditCost;

    // Deduct credits based on action
    const remainingCredits = userData.credits - creditsToDeduct;
    const updatedActions = [...(userData.deductedActions || []), actionKey];

    if (remainingCredits < 0) {
      return res
        .status(403)
        .json({ success: false, message: "Insufficient credits" });
    }
    console.log(remainingCredits);
    // Update user credits in Firestore
    const userDocRef = doc(db, "persons", userDoc.id);
    await updateDoc(userDocRef, {
      credits: remainingCredits,
      deductedActions: updatedActions,
    });

    // Fetch the updated user data correctly
    const updatedUserDoc = await getDoc(userDocRef); // Use getDoc instead of getDocs
    const updatedUserData = updatedUserDoc.data(); // Get the document data

    return res
      .status(200)
      .json({ success: true, remainingCredits, userData: updatedUserData });
  } catch (error) {
    console.error("Error in deductCredits:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
