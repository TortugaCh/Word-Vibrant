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

const API_LINK = "/api";

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
  console.log(id, data);
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
  console.log("Checking user existence for email:", email);

  try {
    const response = await axios.get(`${API_LINK}/person/get-person/${email}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("User not found for email:", email);
      return null;
    } else {
      console.error("Unexpected error:", error);
      throw error; // Re-throw for unexpected errors
    }
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
    return response.data.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

// Function to get the user's data from the database
export const getUserData = async (email) => {
  try {
    const response = await axios.get(`${API_LINK}/person/get-person/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Function to get users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_LINK}/person/get-person`);
    return response.data;
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
};

// Function to set the cookie
const setAuthCookie = async (token) => {
  await axios.post("/api/auth/setCookie", { token });
  localStorage.setItem("tokenExists", true);
};

// Handle email and password authentication
export const handleEmailAuth = async (email, password, isLogin, username) => {
  let user;
  let userData = await checkUserExists(email);
  if (isLogin) {
    user = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", user);
  } else {
    user = await createUserWithEmailAndPassword(auth, email, password);
    userData = await createUserInDB(email, username, user.user.uid);
  }
  const token = await user.user.getIdToken();
  await setAuthCookie(token);
  return userData;
};

// Handle Google Authentication
export const handleGoogleAuth = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  let userExists = await checkUserExists(result.user.email);
  if (!userExists) {
    userExists = await createUserInDB(
      result.user.email,
      result.user.displayName,
      result.user.uid
    );
  }
  const token = await result.user.getIdToken();
  await setAuthCookie(token);
  return userExists;
};

// Update user data
export const updateUserData = async (email, data) => {
  try {
    await axios.put(`${API_LINK}/person/update-person/${email}`, {
      ...data,
    });
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

// Delete user data
export const deleteUserData = async (email) => {
  try {
    await axios.delete(`${API_LINK}/person/delete-person/${email}`);
  } catch (error) {
    console.error("Error deleting user data:", error);
  }
};

// Function to log out the user
export const handleLogout = async () => {
  try {
    // Sign out from Firebase
    await signOut(auth);

    // Clear the session cookie by calling the API route
    const resp = await axios.post("/api/auth/logout");
    if (resp.status === 200) {
      console.log("Logged out successfully");
      localStorage.removeItem("tokenExists");
    }
    // Optionally, redirect the user to the login page
    window.location.href = "/auth";
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// check route

export const checkCredits = async ( action, word) => {
  try {
    console.log("Checking credits for:", action, word);
    const response = await axios.put(
      "/api/auth/checkCredits",
      {
        action,
        word,
      },
      {
        withCredentials: true,
      }
    );
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error checking route:", error);
    return null;
  }
};

// Get action based on pathname

export const getAction = (pathname) => {
  if (pathname.includes("stroke-order")) {
    return "stroke-order";
  } else if (pathname.includes("coloring-page")) {
    return "coloring-page";
  } else if (pathname.includes("create-a-story")) {
    return "create-a-story";
  } else if (pathname.includes("create-a-dialogue")) {
    return "create-a-dialogue";
  }
};
