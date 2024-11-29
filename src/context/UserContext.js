import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { parse } from "cookie";
import { useRouter } from "next/router"; // Import useRouter to track route changes

// Creating UserContext to hold the user data and the setter function
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserState = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [tokenExists, setTokenExists] = useState(false); // Manage tokenExists in state
  const router = useRouter(); // Use the useRouter hook to get the current path

  const protectedPaths = [
    "/user/stroke-order/practice",
    "/user/coloring-page/download",
    "/user/create-a-story/view",
    "/user/create-a-dialogue/view",
  ]; // List of protected paths

  useEffect(() => {
    // Check if running on the client-side (browser)
    if (typeof window !== "undefined") {
      const tokenExistsInStorage = localStorage.getItem("tokenExists");
      setTokenExists(!!tokenExistsInStorage); // Set tokenExists based on localStorage
    }
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    // Only fetch user data if token exists
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    };

    const fetchUserData = async () => {
      if (tokenExists) {
        const res = await axios.post("/api/auth/verifyToken", {}, config);
        if (res?.data?.valid) {
          setUserData(res.data.userData);
        }
      }
    };

    fetchUserData();
  }, [tokenExists]); // Fetch data when tokenExists changes

  useEffect(() => {
    // Re-fetch user data if the path changes to a protected route
    if (protectedPaths.some((path) => router.pathname.startsWith(path))) {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      };

      const fetchUserData = async () => {
        if (tokenExists) {
          const res = await axios.post("/api/auth/verifyToken", {}, config);
          if (res?.data?.valid) {
            setUserData(res.data.userData);
          }
        }
      };

      fetchUserData();
    }
  }, [router.pathname, tokenExists]); // Run when the path changes

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
