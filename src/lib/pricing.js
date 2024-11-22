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

// Fetch all pricing plans
export async function fetchPricingPlans() {
  try {
    const response = await axios.get(`${API_LINK}/plans/get-pricing-plans`);
    return response.data;
  } catch (error) {}
}
