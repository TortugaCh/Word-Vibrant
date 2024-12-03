import { db } from "../../../../lib/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }
    try {
  const { userId } = req.query;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User Id is required", status: 400 });
  }

  const personCollection = collection(db, "persons");
  const q = query(personCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  // If the document does not exist, add it
  if (querySnapshot.empty) {
    return res.json({ message: "User does not exist" });
  }

  // Get User Progress
  const userDoc = querySnapshot.docs[0];
  const userProgress = userDoc.data().deductedActions;
  // Process the actions to group words by module
  const groupedWords = {};

  console.log("User Progress:", userProgress);
  // userProgress?.forEach((action) => {
  //   // Find the position of the first '%'
  //   const percentIndex = action.indexOf("%");
  
  //   if (percentIndex !== -1) {
  //     // Split the string into module name and the URL-encoded word
  //     const moduleName = action.substring(0, percentIndex-1); // Everything before the '%'
  //     const encodedWord = action.substring(percentIndex); // Everything after the '%'
  
  //     // Initialize the module in the groupedWords object if it doesn't exist
  //     if (!groupedWords[moduleName]) {
  //       groupedWords[moduleName] = [];
  //     }
  
  //     // Decode the URL-encoded word and add it to the corresponding module
  //     groupedWords[moduleName].push(decodeURIComponent(encodedWord));
  //   } else {
  //     console.error("Invalid format: No '%' found in action", action);
  //   }
  // });
  userProgress?.forEach((action) => {
    // Split by the last '-' to separate the action from the character
    const lastDashIndex = action.lastIndexOf('-');
    const actionName = action.substring(0, lastDashIndex); // Everything before the last '-'
    const character = action.substring(lastDashIndex + 1); // Everything after the last '-'

    // Initialize the module group if it doesn't exist
    if (!groupedWords[actionName]) {
      groupedWords[actionName] = [];
    }

    // Add the character to the action group
    groupedWords[actionName].push(decodeURIComponent(character));
  });

  console.log("Grouped Words:", decodeURI(groupedWords));  
  // Return the grouped words by module
  return res
    .status(201)
    .json({ message: "Progress fetched successfully", data: groupedWords });
    } catch (error) {
      console.error("Error adding word:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    }
}
