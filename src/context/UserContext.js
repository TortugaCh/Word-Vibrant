import { createContext, useState, useContext, useEffect, use } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { checkCredits, getAction, fetchModules } from "../lib/utils";
import { message } from "antd";

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
        // Handle error response
        if (error.response && error.response.status === 401) {
          message.error("Your session has expired. Please login again.");
          setUserData(null);
          localStorage.removeItem("tokenExists");
          router.push("/auth");
        } else {
          console.error("Error fetching user data:", error);
          message.error("An unexpected error occurred. Please try again.");
        }
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

        if (userCredits < 1) {
          // Redirect if no credits
          return router.push("/no-credits");
        }

        // Extract the word from the pathname (URL-decoded)
        const pathnameParts = url.split("/");
        const selectedWordEncoded = pathnameParts[pathnameParts.length - 1]; // The last part after 'view/'
        const selectedWord = decodeURIComponent(selectedWordEncoded); // Decode if necessary

        console.log("Selected Word:", selectedWord);
        const requiredCredits = getRequiredCredits(action, modules); // Get required credits for the action

        if (userCredits < requiredCredits) {
          // Redirect if insufficient credits
          return router.push("/no-credits");
        } else {
          // Credits are sufficient, so we proceed to deduct them
          let creditsBeforeDeduction = userCredits;
          try {
            const remainingCredits = userCredits - requiredCredits;
            // Proceed to check and deduct credits
            const creditData = await checkCredits(action, selectedWord, remainingCredits);

            console.log("Credit data:", creditData);
            if (!creditData.success) {
              // If the credit check fails, redirect to the "no-credits" page
              return router.push("/no-credits");
            }

            if (creditData.creditsDeducted) {
              // Update credits only if deduction is successful
              setUserCredits(creditData.remainingCredits);
            }

            // Proceed with navigation only if credit deduction was successful
            router.push(url); // Navigate to the intended page

          } catch (error) {
            // If an error occurs in the process, rollback the credit deduction
            console.error("Error occurred while updating credits:", error);

            // Restore credits to their original value
            setUserCredits(creditsBeforeDeduction);

            // Redirect to the "no-credits" page if there's an error
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
      value={{ userData, setUserData, userCredits, modules, setUserCredits }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Utility function to get required credits for a specific action
const getRequiredCredits = (action, modules) => {
  const moduleData = modules?.find((module) => module.value === action);
  console.log("Module data:", moduleData);
  return moduleData.creditCost;
};
