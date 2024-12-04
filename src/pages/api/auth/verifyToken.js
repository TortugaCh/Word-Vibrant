import { adminAuth } from "../../../lib/firebaseAdmin";
import { collection, getDocs, query, where } from "firebase/firestore";
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
    const usersRef = collection(db, "persons");
    const q = query(usersRef, where("userId", "==", decodedToken.userId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return res.status(404).json({ error: "Person not found" });
    }
    const userDoc = querySnapshot.docs[0];    
    const userData = { id: userDoc.id, ...userDoc.data() };
    return res.status(200).json({ valid: true, userData });

  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ valid: false, message: "Unauthorized" });
  }
}
