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