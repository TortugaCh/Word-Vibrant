import { adminAuth } from "../../../lib/firebaseAdmin";
import { serialize } from "cookie";

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

    // Set an HTTP-only cookie with the token
    const cookie = serialize("token", token, {
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

