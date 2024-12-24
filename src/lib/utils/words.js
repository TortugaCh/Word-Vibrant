import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function fetchWordsByFilters(
  curriculum,
  grade,
  semester,
  wordType,
  moduleName,
  grades, // Array of grade objects { name: '1st', ... }
  semesters // Array of semester objects { name: '1', ... }
) {
  const wordsCollection = collection(db, "words");

  console.log("Fetching words for:", curriculum, grade, semester, wordType);

  // Build the base query
  let q = query(
    wordsCollection,
    where("curriculum", "==", curriculum.id),
    where("grade", "==", grade.id),
    where("semester", "==", semester.id)
  );

  if (
    moduleName === "stroke-order" ||
    moduleName === "coloring" ||
    moduleName === "admin"
  ) {
    q = query(q, where("wordType", "==", wordType.id));
  }

  const querySnapshot = await getDocs(q);
  const words = querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((word) => filterByWordType(word));

  const sortedWords = words.sort(
    (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()
  );

  if (moduleName === "admin") {
    return sortedWords;
  } else if (moduleName !== "stroke-order" && moduleName !== "coloring") {
    return applyGradeSemesterSplit(
      wordsCollection,
      grades,
      semesters,
      grade,
      semester,
      curriculum.id
    );
  }
  return sortedWords.filter((word) => word.wordType !== "m4xvaJmSSeORT9gH3UXo");
}

// Utility function to filter words by wordType
function filterByWordType(word) {
  const { wordType, name } = word;

  if (
    wordType === "Q42TlBt4cvPrEXc9u7Nk" ||
    wordType === "907D0C34ChEIp550SrfD"
  ) {
    return name.length === 1; // Apply length filter for specific wordTypes
  }

  return true;
}

// Split words into 85% current grade/semester and 15% previous ones
async function applyGradeSemesterSplit(
  wordsCollection,
  grades, // Array of grades { name: 'Grade 1', 'Grade 2', ... }
  semesters, // Array of semesters { name: '1', '2' }
  currentGrade, // Current grade object { name: 'Grade 5' }
  currentSemester, // Current semester object { name: '2' }
  curriculum
) {
  const allWords = [];

  // Helper to parse grade names into numbers
  const parseGrade = (grade) => parseInt(grade.name.replace(/\D/g, ""), 10);
  const currentGradeNumber = parseGrade(currentGrade);
  const currentSemesterNumber = parseInt(currentSemester.name);

  // Loop through grades and semesters (filter earlier grades and semesters)
  for (const grade of grades) {
    const gradeNumber = parseGrade(grade);

    if (gradeNumber < currentGradeNumber) {
      // Fetch all semesters for earlier grades
      for (const semester of semesters) {
        await fetchWords(
          wordsCollection,
          curriculum,
          grade,
          semester,
          allWords
        );
      }
    } else if (gradeNumber === currentGradeNumber) {
      // Fetch only earlier semesters in the current grade
      for (const semester of semesters) {
        const semesterNumber = parseInt(semester.name);
        if (semesterNumber < currentSemesterNumber) {
          await fetchWords(
            wordsCollection,
            curriculum,
            grade,
            semester,
            allWords
          );
        }
      }
    }
  }

  // Fetch current grade and semester
  await fetchWords(
    wordsCollection,
    curriculum,
    currentGrade,
    currentSemester,
    allWords
  );

  console.log(`Total words fetched: ${allWords.length}`);
  if (allWords.length < 300) {
    return allWords;
  }

  // Split words into 85% current and 15% previous
  let currentWords = [];

  console.log(`Current Grade: ${currentGrade.id}`);
  console.log(`Current Semester: ${currentSemester.id}`);
  console.log(`Current Grade: ${allWords[0].grade}`);
  console.log(`Current Semester: ${allWords[0].semester}`);

  currentWords = allWords.filter(
    (word) =>
      word.grade === currentGrade.id && word.semester === currentSemester.id
  );

  const previousWords = allWords.filter(
    (word) =>
      word.grade !== currentGrade.id || word.semester !== currentSemester.id
  );

  const totalTarget = currentWords.length + previousWords.length;
  const targetPreviousCount = Math.ceil(totalTarget * 0.15);

  let selectedCurrentWords = currentWords

  const selectedPreviousWords = previousWords.slice(0, targetPreviousCount);

  const finalWords = [...selectedCurrentWords, ...selectedPreviousWords];
  console.log(`Final Selected Words: ${finalWords.length}`);
  return finalWords;
}

// Utility function to fetch words and push into the allWords array
async function fetchWords(
  wordsCollection,
  curriculum,
  grade,
  semester,
  allWords
) {
  console.log(`Fetching words for ${curriculum} - ${semester.name}`);
  const q = query(
    wordsCollection,
    where("curriculum", "==", curriculum),
    where("grade", "==", grade.id),
    where("semester", "==", semester.id)
  );
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    allWords.push({ id: doc.id, ...doc.data() });
  });

  console.log(`Fetched words for ${grade.name} - ${semester.name}`);
}
