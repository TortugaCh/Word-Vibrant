import axios from "axios";

// Function to get default icons based on module name
export const getDefaultIcon = (name) => {
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
export const getDefaultColor = (name) => {
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
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error checking credits:", response.data);
      return null;
    }
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

export const fetchWithRetry = async (
  url,
  options,
  retries = 3,
  timeout = 30000
) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchWithTimeout(url, options, timeout);
      if (response.ok) return response;
    } catch (error) {
      if (i === retries - 1) throw error; // Throw error after last retry
    }
  }
};

export function cleanJSON(input) {
  const jsonMatch = input.match(/\[.*\]/s); // Matches JSON array inside square brackets
  return jsonMatch ? jsonMatch[0] : null;
}

export async function setCredits(creditsToAdd,id) {
  return await axios.put(
    "/api/auth/setCredits",
    {  creditsToAdd,id },
    { withCredentials: true }
  );
}
