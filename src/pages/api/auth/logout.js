import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  console.log("Logging out");
  // Clear the cookie by setting its maxAge to 0
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ message: "Logged out successfully" });
}
