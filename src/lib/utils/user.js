import axios from "axios";

const API_LINK = "/api";
// Function to check if a user already exists in the database
export const checkUserExists = async (email) => {
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


// Function to set the cookie
export const setAuthCookie = async (token) => {
  await axios.post("/api/auth/setCookie", { token });
  localStorage.setItem("tokenExists", true);
};
