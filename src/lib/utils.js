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
import jsPDF from "jspdf";
import { Canvg } from "canvg";

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
    return response.data;
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

export const checkCredits = async (action, word, remainingCredits) => {
  try {
    console.log("Checking credits for:", action, word, remainingCredits);
    const response = await axios.put(
      "/api/auth/checkCredits",
      {
        action,
        word,
        remainingCredits,
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

const fetchWithTimeout = async (resource, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(resource, { ...options, signal: controller.signal }).finally(
    () => clearTimeout(id)
  );
};

const fetchWithRetry = async (url, options, retries = 3, timeout = 30000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchWithTimeout(url, options, timeout);
      if (response.ok) return response;
    } catch (error) {
      if (i === retries - 1) throw error; // Throw error after last retry
    }
  }
};

// Get Coloring Page

// export const getColoringPage = async (word) => {
//   console.log("Generating coloring page for word:", word);
//   const refinedPrompt = `
//     Create a delightful, black-and-white line art coloring page designed specifically for children.
//     The illustration should creatively represent the concept of the word "${word}" with playful visuals.
//   `;
//   try {
//     const response = await fetchWithRetry(
//       "https://api.openai.com/v1/images/generations",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer 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`,
//         },
//         body: JSON.stringify({
//           model: "dall-e-3",
//           prompt: refinedPrompt,
//           n: 1,
//           size: "1024x1024",
//         }),
//       },
//       3, // Retry up to 3 times
//       30000 // Timeout of 30 seconds
//     );

//     const data = await response.json();
//     if (!data || !data.data || !data.data.length) {
//       throw new Error("No image generated");
//     }

//     return { imageUrl: data.data[0].url };
//   } catch (error) {
//     console.error("Error generating image:", error.message || error);
//     return null;
//   }
// };

// Example usage inside your function where you get the image URL from OpenAI API

const getBase64FromImageUrl = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob(); // Fetch the image as a blob
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result); // Base64 encoded string
    };
    reader.onerror = reject;

    reader.readAsDataURL(blob); // Convert the blob to Base64
  });
};
export const getColoringPage = async (word) => {
  console.log("Generating coloring page for word:", word);
  const refinedPrompt = `
    Create a delightful, black-and-white line art coloring page designed specifically for children.
    The illustration should creatively represent the concept of the word "${word}" with playful visuals.
  `;
  
  try {
    const response = await fetchWithRetry(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`, // Use your actual API key
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: refinedPrompt,
          n: 1,
          size: "1024x1024",
          response_format: "b64_json", // This tells the API to return the image as base64
        }),
      },
      3, // Retry up to 3 times
      30000 // Timeout of 30 seconds
    );

    const data = await response.json();
    
    if (!data || !data.data || !data.data.length) {
      throw new Error("No image generated");
    }

    const base64Image = data.data[0].b64_json; // Base64 encoded image data
    
    console.log("Base64 image:", base64Image);
    return { imageUrl: base64Image };
  } catch (error) {
    console.error("Error generating image:", error.message || error);
    return null;
  }
};

/**
 * Generates a two-page PDF containing the word image and background image.
 * @param {Object} params - Parameters for the function.
 * @param {HTMLElement} wordContainer - The container holding the SVG of the word image.
 * @param {string} backgroundImageUrl - The URL of the background image.
 * @param {string} fileName - The name of the generated PDF file.
 * @param {HTMLCanvasElement} canvasElement - A canvas element used for rendering.
 */
// export const generateColoringPDF = async ({
//   wordContainer,
//   backgroundImageUrl,
//   fileName,
//   canvasElement,
// }) => {
//   if (!wordContainer || !backgroundImageUrl || !canvasElement) {
//     console.error("Required elements are missing.");
//     return;
//   }
//   console.log(
//     "Generating PDF with word:",
//     wordContainer,
//     backgroundImageUrl,
//     fileName,
//     canvasElement
//   );

//   try {
//     // Initialize jsPDF
//     const pdf = new jsPDF();

//     // Handle the word image (SVG rendering)
//     const svgElement = wordContainer.querySelector("svg");
//     if (svgElement) {
//       const svgData = new XMLSerializer().serializeToString(svgElement);
//       const ctx = canvasElement.getContext("2d");

//       canvasElement.width = 500;
//       canvasElement.height = 500;

//       const v = Canvg.fromString(ctx, svgData);
//       await v.render();

//       const wordImageData = canvasElement.toDataURL("image/png");
//       pdf.addImage(wordImageData, "PNG", 10, 10, 190, 190);
//     }

//     // Add a new page and handle the background image
//     if (backgroundImageUrl) {
//       const response = await fetch(backgroundImageUrl, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json", // Informing the server of expected response format
//           "Accept": "image/png",             // Indicating the desired response type
//         },
//         mode: "cors", // Allow cross-origin requests
//       });      const blob = await response.blob();
//       const reader = new FileReader();

//       const backgroundImageData = await new Promise((resolve, reject) => {
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });

//       pdf.addPage();
//       pdf.addImage(backgroundImageData, "PNG", 10, 10, 190, 190);
//     }
//     // Save the PDF
//     pdf.save(`${fileName}.pdf`);
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//   }
// };

// export const generateColoringPDF = async (
//   wordContainer,
//   backgroundImageUrl,
//   fileName,
//   canvasElement
// ) => {
//   try {
//     const pdf = new jsPDF();

//     // Page 1: Add the word SVG to the PDF
//     const svgElement = wordContainer.querySelector("svg");
//     if (svgElement) {
//       const svgData = new XMLSerializer().serializeToString(svgElement);
//       const ctx = canvasElement.getContext("2d");

//       canvasElement.width = 500;
//       canvasElement.height = 500;

//       const v = Canvg.fromString(ctx, svgData);
//       await v.render();

//       const wordImageData = canvasElement.toDataURL("image/png");
//       pdf.addImage(wordImageData, "PNG", 10, 10, 190, 190);
//     }

//     // Page 2: Add the background image to the PDF
//     if (backgroundImageUrl) {
//       const response = await fetch(backgroundImageUrl, { mode: "cors" });
//       const blob = await response.blob();
//       const reader = new FileReader();

//       const backgroundImageData = await new Promise((resolve, reject) => {
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });

//       pdf.addPage();
//       pdf.addImage(backgroundImageData, "PNG", 10, 10, 190, 190);
//     }

//     // Save the PDF
//     pdf.save(`${fileName}_coloring_pages.pdf`);
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//   }
// };

export const generateColoringPDF = async ({
  wordContainer,
  backgroundContainer,
  fileName,
  canvasElement,
}) => {
  try {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Set the page size (A4 dimensions, you can adjust as needed)
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    // Draw the background image from the background container (if it exists)
    if (backgroundContainer) {
      const backgroundImageUrl =
        backgroundContainer.style.backgroundImage.slice(5, -2); // Extract URL
      const img = new Image();
      img.src = backgroundImageUrl;

      // Wait for the image to load
      await new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
      });

      // Add background image to the first page of the PDF
      pdf.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);
      
      // If you want to add the word image on a new page, uncomment the line below:
      pdf.addPage();
    }

    // Draw the word (Hanzi character) on the PDF
    if (wordContainer) {
      const svgElement = wordContainer.querySelector("svg");
      if (svgElement) {
        // Convert the SVG to a string and render it to a canvas
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const ctx = canvasElement.getContext("2d");

        // Set canvas size
        canvasElement.width = 500;
        canvasElement.height = 500;

        // Render the SVG to the canvas using Canvg
        const v = Canvg.fromString(ctx, svgData);
        await v.render();

        // Convert the canvas to image data
        const wordImageData = canvasElement.toDataURL("image/png");

        // Add the word image (Hanzi character) to the PDF (adjust position and size)
        // Adjust the position to ensure it doesn't overlap with the background image
        pdf.addImage(wordImageData, "PNG", 10, pageHeight - 200, 190, 190); // Change the position as needed
      }
    }

    // Save the generated PDF
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

