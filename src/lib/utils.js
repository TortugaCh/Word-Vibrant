import { db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";
import axios from "axios";

const API_LINK = process.env.NEXT_PUBLIC_API_LINK;

// Fetch all lookup data based on type
export async function fetchLookupData(type) {
  const lookupCollection = collection(db, "lookup");
  const q = query(lookupCollection, where("type", "==", type));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Fetch All lookup data

export async function fetchAllLookupData() {
  const lookupCollection = collection(db, "lookup");
  const querySnapshot = await getDocs(lookupCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Add new lookup entry
export async function addLookupItem(data) {
  const lookupCollection = collection(db, "lookup");
  const newItem = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await addDoc(lookupCollection, newItem);
  return docRef.id;
}

// Update existing lookup entry
export async function updateLookupItem(id, data) {
  const docRef = doc(db, "lookup", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Delete a lookup entry
export async function deleteLookupItem(id) {
  const docRef = doc(db, "lookup", id);
  await deleteDoc(docRef);
}

// Fetch all words

export async function fetchWords() {
  const wordsCollection = collection(db, "words");
  const querySnapshot = await getDocs(wordsCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get Modules

export const fetchModules = async () => {
  try {
    const modulesCollection = collection(db, "modules");
    const querySnapshot = await getDocs(modulesCollection);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Add default icons and colors if not present
    const defaultModules = data.map((module) => ({
      ...module,
      icon: module.icon || getDefaultIcon(module.value),
      color: module.color || getDefaultColor(module.value),
    }));

    return defaultModules;
  } catch (error) {
    console.error("Error fetching modules:", error);
    return [];
  }
};

// Function to get default icons based on module name
const getDefaultIcon = (name) => {
  switch (name.toLowerCase()) {
    case "stroke-order":
      return "✍️";
    case "coloring-page":
      return "🎨";
    case "create-a-story":
      return "📖";
    case "create-a-dialogue":
      return "💬";
    default:
      return "📚"; // Default icon
  }
};

// Function to get default colors based on module name
const getDefaultColor = (name) => {
  switch (name.toLowerCase()) {
    case "stroke-order":
      return "bg-blue-100 border-blue-200";
    case "coloring-page":
      return "bg-green-100 border-green-200";
    case "create-a-story":
      return "bg-yellow-100 border-yellow-200";
    case "create-a-dialogue":
      return "bg-pink-100 border-pink-200";
    default:
      return "bg-gray-100 border-gray-200"; // Default color
  }
};

// Fetch all words based on curriculum, grade, semester, and word type

export async function fetchWordsByFilters(
  curriculum,
  grade,
  semester,
  wordType
) {
  const wordsCollection = collection(db, "words");
  const q = query(
    wordsCollection,
    where("curriculum", "==", curriculum),
    where("grade", "==", grade),
    where("semester", "==", semester),
    where("wordType", "==", wordType)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Function to check if a user already exists in the database
export const checkUserExists = async (email) => {
  try {
    const response = await axios.get(`${API_LINK}/person/get-person/${email}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error checking user:", error);
    return false;
  }
};

// Function to create a new user in the database
export const createUserInDB = async (email, name, userId) => {
  try {
    const response = await axios.post(`${API_LINK}/person/create-person`, {
      email,
      name,
      userId,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

// Function to set the cookie
const setAuthCookie = async (token) => {
  await axios.post("/api/auth/setCookie", { token });
};

// Handle email and password authentication
export const handleEmailAuth = async (email, password, isLogin, username) => {
  let user;
  if (isLogin) {
    user = await signInWithEmailAndPassword(auth, email, password);
  } else {
    user = await createUserWithEmailAndPassword(auth, email, password);
  }
  const token = await user.user.getIdToken();
  await setAuthCookie(token);
  return user;
};

// Handle Google Authentication
export const handleGoogleAuth = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const token = await result.user.getIdToken();
  await setAuthCookie(token);
  return result.user;
};

// Function to log out the user
export const handleLogout = async () => {
  try {
    // Sign out from Firebase
    await signOut(auth);

    // Clear the session cookie by calling the API route
    await axios.post("/api/auth/logout");

    // Optionally, redirect the user to the login page
    window.location.href = "/auth";
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// export async function fetchWordsByFilters(curriculum, grade, semester, wordType) {
//   const wordsCollection = collection(db, "words");

//   // Fetch documents matching the original curriculum
//   const q = query(
//     wordsCollection,
//     where("curriculum", "==", "NanYi")
//   );
//   const querySnapshot = await getDocs(q);

//   // Update the curriculum field for each matching document
//   const updatePromises = querySnapshot.docs.map((docSnapshot) =>
//     updateDoc(doc(db, "words", docSnapshot.id), { curriculum: "kD9EBxwuoe3a9yWRKm7d" })
//   );

//   await Promise.all(updatePromises);

//   // Fetch the documents again with the updated curriculum
//   const updatedQuery = query(
//     wordsCollection,
//     where("curriculum", "==", "kD9EBxwuoe3a9yWRKm7d"),
//     where("grade", "==", grade),
//     where("semester", "==", semester),
//     where("wordType", "==", wordType)
//   );

//   const updatedSnapshot = await getDocs(updatedQuery);

//   // Return the updated documents
//   return updatedSnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// }
