import { adminAuth } from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    // Verify the Firebase ID token using the admin SDK
    const decodedToken = await adminAuth.verifyIdToken(token);
    return res.status(200).json({ valid: true, uid: decodedToken.uid });
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ valid: false, message: "Unauthorized" });
  }
}
