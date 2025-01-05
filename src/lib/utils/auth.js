import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../firebaseConfig";
import { checkUserExists, createUserInDB, setAuthCookie } from "./user";
import axios from "axios";
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

// Handle Facebook Authentication
export const handleFacebookAuth = async () => {
  const result = await signInWithPopup(auth, facebookProvider);
  console.log(result)
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
