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
  const { action, word, remainingCredits } = req.body;
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
    if (action === "stroke-order" || action === "coloring-page") {
      if (userData.deductedActions?.includes(actionKey)) {
        return res
          .status(200)
          .json({ creditsDeducted: false, success: true, userData });
      }
    }
    // Check if user has enough credits
    if (userData.credits < 0) {
      return res
        .status(403)
        .json({ success: false, message: "Insufficient credits" });
    }

    const updatedActions = [...(userData.deductedActions || []), actionKey];

    // Update user credits in Firestore
    const userDocRef = doc(db, "persons", userDoc.id);
    await updateDoc(userDocRef, {
      credits: remainingCredits,
      deductedActions: updatedActions,
    });

    // Fetch the updated user data correctly
    const updatedUserDoc = await getDoc(userDocRef); // Use getDoc instead of getDocs
    const updatedUserData = updatedUserDoc.data(); // Get the document data

    return res.status(200).json({
      success: true,
      creditsDeducted: true,
      remainingCredits,
      userData: updatedUserData,
    });
  } catch (error) {
    console.error("Error in deductCredits:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
