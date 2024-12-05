import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { checkCredits, getAction, fetchModules } from "../lib/utils";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserState = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userCredits, setUserCredits] = useState(0); // Track user credits
  const [modules, setModules] = useState([]); // Store fetched modules
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization state
  const router = useRouter();

  const protectedPaths = [
    "/user/stroke-order/practice",
    "/user/coloring-page/download",
    "/user/create-a-story/view",
    "/user/create-a-dialogue/view",
  ];

  // Step 1: Fetch modules and initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Fetch modules only once when the app is initialized
        const moduleData = await fetchModules();
        setModules(moduleData);
        setIsInitialized(true); // Mark as initialized
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    initializeApp();
  }, []);

  // Step 2: Check token and fetch user data once
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("tokenExists");

      if (!token) {
        setUserData(null);
        return;
      }

      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };

        const res = await axios.post("/api/auth/verifyToken", {}, config);

        if (res?.data?.valid) {
          setUserData(res.data.userData);
          setUserCredits(res.data.userData.credits);
        } else {
          setUserData(null);
          localStorage.removeItem("tokenExists");
          router.push("/auth");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Step 3: Check credits before navigating to protected routes
  useEffect(() => {
    const handleRouteChange = async (url) => {
      if (!isInitialized || !userData) return;

      const isProtected = protectedPaths.some((path) => url.startsWith(path));
      if (isProtected) {
        const action = getAction(url); // Map URL to corresponding action
        console.log("Action:", action);
        if (userCredits < 1) return router.push("/no-credits");
        const requiredCredits = getRequiredCredits(action); // Get required credits for the action

        if (userCredits < requiredCredits) {
          router.push("/no-credits"); // Redirect if insufficient credits
        } else {
          // Update credits dynamically before navigating
          try {
            const creditData = await checkCredits(action);
            if (!creditData.success) {
              router.push("/no-credits");
            } else {
              setUserCredits(creditData.updatedCredits);
            }
          } catch (error) {
            console.error("Error updating credits:", error);
            router.push("/no-credits");
          }
        }
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isInitialized, userCredits, userData]);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, userCredits, modules }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Utility function to get required credits for a specific action
const getRequiredCredits = (action, modules) => {
  const moduleData = modules.find((module) => module.value === action);
  return moduleData.creditsCost || 0; // Default to 0 if no matching action
};
