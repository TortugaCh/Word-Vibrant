import { db } from "../../../lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { traditionalWords } from "../../../data/wordData";
import Word from "../../../models/WordsModel/WordsModel";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     res.setHeader("Allow", "POST");
//     return res.status(405).end("Method Not Allowed");
//   }

// const wordCollection = collection(db, "words");

// // Iterate through the curriculum, grade, semester, and wordType
// for (const grade in traditionalWords) {
//     for (const semester in traditionalWords[grade]) {
//       for (const wordType in traditionalWords[grade][semester]) {
//         const words = traditionalWords[grade][semester][wordType];
//         console.log(words)
//         // Upload each word to Firebase
//         for (const word of words) {
//           try {
//             // Check if the word already exists
//             const q = query(
//               wordCollection,
//               where("name", "==", word),
//               where("curriculum", "==", "un0NKNdriXofFOpiXsSx"),
//               where("grade", "==", grade),
//               where("semester", "==", semester),
//               where("wordType", "==", wordType)
//             );
//             const querySnapshot = await getDocs(q);

//             // If the document does not exist, add it
//             if (querySnapshot.empty) {
//               const newWord = {
//                 name: word,
//                 curriculum: "Kangxuan",
//                 grade: grade,
//                 semester: semester,
//                 wordType: wordType,
//                 createdAt: serverTimestamp(),
//                 updatedAt: serverTimestamp()
//               };
//               await addDoc(wordCollection, newWord);
//               console.log(`Added word: ${word}`);
//             } else {
//               console.log(`Word "${word}" already exists`);
//             }
//           } catch (err) {
//             console.error("Error adding word:", err);
//           }
//         }
//       }
//     }
//   }
//   res.json({ message: "Words added successfully" });
// }
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
  try {
    const { grade, semester, wordType, curriculum, word } = req.body;

    if (!grade || !semester || !wordType || !curriculum) {
      return res
        .status(400)
        .json({ message: "Missing required fields", status: 400 });
    }

    const wordCollection = collection(db, "words");
    const q = query(
      wordCollection,
      where("name", "==", word),
      where("curriculum", "==", curriculum),
      where("grade", "==", grade),
      where("semester", "==", semester),
      where("wordType", "==", wordType)
    );
    const querySnapshot = await getDocs(q);

    // If the document does not exist, add it
    if (querySnapshot.empty) {
      let newWord = {
        name: word,
        curriculum: curriculum,
        grade: grade,
        semester: semester,
        wordType: wordType,
      };
      newWord = Word.validate(newWord);
      newWord = {
        ...newWord,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addDoc(wordCollection, newWord);
      return res.json({ message: "Word added successfully" });
    } else {
      return res.json({ message: "Word already exists" });
    }
  } catch (error) {
    console.error("Error adding word:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
}