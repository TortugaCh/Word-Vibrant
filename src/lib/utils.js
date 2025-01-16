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

export const checkCredits = async (
  action,
  word,
  remainingCredits,
  creditsSpent
) => {
  try {
    console.log(
      "Checking credits for:",
      action,
      word,
      remainingCredits,
      creditsSpent
    );
    const response = await axios.put(
      "/api/auth/checkCredits",
      {
        action,
        word,
        remainingCredits,
        creditsSpent,
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

import React from "react";

export const highlightWords = (inputString, validWords, options = {}) => {
  // Normalize validWords for consistency
  const wordsSet = new Set(validWords.map((word) => word.trim()));

  // Default options
  const { validClassName = "", invalidClassName = "underline text-red-500" } =
    options;

  // inputString=inputString.split(/[\s,，。！？；：“”‘’]/).filter(Boolean); // Split on common punctuation
  // Initialize an array to hold the highlighted dialogue
  const highlightedOutput = [];
  let i = 0;

  // Traverse the string and look for matches
  while (i < inputString.length) {
    let foundMatch = false;

    // Check for the longest matching phrase in the wordsSet
    for (let j = inputString.length; j > i; j--) {
      const phrase = inputString.slice(i, j); // Extract substring
      if (wordsSet.has(phrase)) {
        // If phrase is valid, add it with the valid style
        highlightedOutput.push(
          <span key={i} className={validClassName}>
            {phrase}
          </span>
        );
        i = j; // Move the pointer to the end of the matched phrase
        foundMatch = true;
        break;
      }
    }

    // If no match found, treat the current character as invalid
    if (!foundMatch) {
      highlightedOutput.push(
        <span key={i} className={invalidClassName}>
          {inputString[i]}
        </span>
      );
      i++; // Move pointer to the next character
    }
  }

  return highlightedOutput;
};

export async function setCredits(creditsToAdd, id) {
  return await axios.put(
    "/api/auth/setCredits",
    { creditsToAdd, id },
    { withCredentials: true }
  );
}

export const handleSearch = (value, setSearch, setData, data) => {
  setSearch(value);
  const filteredData = data.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(value.toLowerCase())
    );
  });
  setData(filteredData);
};

export const sortData = (sortingOptions, setData, data, sortingKey) => {
  // Make a copy of the original array to prevent mutation
  const dataCopy = [...data];

  if (sortingOptions.orderBy === "none") {
    // If orderBy is "none", reset the data without sorting
    setData(dataCopy);
    return;
  }

  const sortedData = dataCopy.sort((a, b) => {
    if (sortingOptions.orderBy === "asc") {
      return a[sortingKey] - b[sortingKey];
    } else if (sortingOptions.orderBy === "desc") {
      console.log("orderBy", sortingOptions.orderBy);
      return b[sortingKey] - a[sortingKey];
    }
  });

  // Update the state with the sorted data
  setData([...sortedData]);
};

