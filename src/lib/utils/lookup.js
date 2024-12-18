import { db } from "../firebaseConfig";
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
  