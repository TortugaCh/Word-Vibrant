import { collection, getDocs, query, where } from "firebase/firestore";
import { adminAuth } from "../../../lib/firebaseAdmin";
import { serialize } from "cookie";
import { db } from "../../../lib/firebaseConfig";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }

  try {
    // Verify the Firebase ID token using the Firebase Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;
    const usersRef = collection(db, "persons");
    const q = query(usersRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ success: false, message: "Person not found" });
    }

    // Assuming userId is unique, get the first document
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const encodedToken = jwt.sign(
      {
        userId: uid,
        role: userData.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    const cookie = serialize("token", encodedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({ message: "Cookie set successfully", uid });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}
