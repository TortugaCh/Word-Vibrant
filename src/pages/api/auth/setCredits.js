import {  doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  const { creditsToAdd, id } = req.body;
  console.log("Updating credits for:", id, creditsToAdd);
  const userDocRef = doc(db, "persons", id);
  const userData = await getDoc(userDocRef);
  if (!userData.exists()) {
    return res.status(404).json({ error: "User not found" });
  }
  const userCredits = Number(userData.data().credits);
  try {
    await setDoc(
      userDocRef,
      { credits: userCredits + Number(creditsToAdd) },
      { merge: true }
    );
    return res.status(200).json({ message: "Credits updated successfully", updatedCredits: Number(userCredits) + Number(creditsToAdd) });
  } catch (error) {
    return res.status(500).json({ error: "Error updating credits" });
  }
}
