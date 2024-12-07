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
  const [userProgress, setUserProgress] = useState([]); // Track user progress
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
          setUserProgress(res.data.userData.deductedActions);
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
  // useEffect(() => {
  //   const handleRouteChange = async (url) => {
  //     if (!isInitialized || !userData) return;

  //     const isProtected = protectedPaths.some((path) => url.startsWith(path));

  //     if (isProtected) {
  //       const action = getAction(url); // Map URL to corresponding action
  //       console.log("Action:", action);

  //       if (userCredits < 1) {
  //         return router.push("/no-credits");
  //       }

  //       const pathnameParts = url.split("/");
  //       const selectedWordEncoded = pathnameParts[pathnameParts.length - 1];
  //       const selectedWord = decodeURIComponent(selectedWordEncoded);
  //       const wordExists = containsActionWord(
  //         userProgress,
  //         action,
  //         selectedWord
  //       );
  //       if(wordExists) {

  //         const requiredCredits = getRequiredCredits(action, modules);

  //         if (userCredits < requiredCredits) {
  //         return router.push("/no-credits");
  //       }
  //     }

  //       // Temporarily hold updated credits for consistency
  //       const creditsBeforeDeduction = userCredits;
  //       const remainingCredits = userCredits - requiredCredits;

  //       try {
  //         const creditData = await checkCredits(
  //           action,
  //           selectedWord,
  //           remainingCredits
  //         );

  //         console.log("Credit data:", creditData);
  //         if (!creditData.success) {
  //           return router.push("/no-credits");
  //         }

  //         if (creditData.creditsDeducted) {
  //           setUserCredits(creditData.remainingCredits); // Update credits
  //         }

  //         // Navigate only after credits are verified
  //         router.push(url);
  //       } catch (error) {
  //         console.error("Error occurred while updating credits:", error);

  //         // Restore credits to their original value
  //         setUserCredits(creditsBeforeDeduction);

  //         return router.push("/no-credits");
  //       }
  //     }
  //   };

  //   router.events.on("routeChangeStart", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, [isInitialized, userCredits, userData]);
  useEffect(() => {
    const handleRouteChange = async (url) => {
      if (!isInitialized || !userData) return;
  
      const isProtected = protectedPaths.some((path) => url.startsWith(path));
  
      if (isProtected) {
        const action = getAction(url); // Map URL to corresponding action
  
        const pathnameParts = url.split("/");
        const selectedWordEncoded = pathnameParts[pathnameParts.length - 1];
        const selectedWord = decodeURIComponent(selectedWordEncoded);
  
        // Check if the action-word pair already exists in userProgress
        const wordExists = containsActionWord(userProgress, action, selectedWord);
        
       
  
        const requiredCredits = getRequiredCredits(action, modules);
  
        // Check if the user has enough credits for the action
        if (userCredits < requiredCredits && !wordExists) {
          console.log("Not enough credits.");
          return router.push("/no-credits");
        }
  
        // Deduct credits and update progress before navigating
        const creditsBeforeDeduction = userCredits;
        const remainingCredits = userCredits - requiredCredits;
  
        try {
          const creditData = await checkCredits(
            action,
            selectedWord,
            remainingCredits
          );
  
          if (!creditData.success) {
            console.log("Credit check failed.");
            return router.push("/no-credits");
          }
  
          if (creditData.creditsDeducted) {
            setUserCredits(creditData.remainingCredits); // Update credits
            setUserProgress([...userProgress, `${action}-${selectedWord}`]); // Update progress
          }
  
          router.push(url);
        } catch (error) {
          console.error("Error occurred while updating credits:", error);
  
          // Restore credits to their original value in case of an error
          setUserCredits(creditsBeforeDeduction);
          return router.push("/no-credits");
        }
      }
    };
  
    router.events.on("routeChangeStart", handleRouteChange);
  
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isInitialized, userData]);
  

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

const containsActionWord = (actions, targetAction, targetWord) => {
  console.log("Actions:", actions);
  const actionKey = `${targetAction}-${targetWord}`; // Unique key for this action and word
  console.log("Action key:", actionKey);
  if (actions?.includes(actionKey)) {
    return true;
  }
  return false;
};
