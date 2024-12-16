// import { createContext, useState, useContext, useEffect, use } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { checkCredits, getAction, fetchModules } from "../lib/utils";
// import { message } from "antd";

// const UserContext = createContext();

// export const useUserContext = () => useContext(UserContext);

// export const UserState = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [userCredits, setUserCredits] = useState(0); // Track user credits
//   const [modules, setModules] = useState([]); // Store fetched modules
//   const [isInitialized, setIsInitialized] = useState(false); // Track initialization state
//   const [userProgress, setUserProgress] = useState([]); // Track user progress
//   const router = useRouter();

//   const protectedPaths = [
//     "/user/stroke-order/practice",
//     "/user/coloring-page/download",
//     "/user/create-a-story/view",
//     "/user/create-a-dialogue/view",
//   ];

//   // Step 1: Fetch modules and initialize app
//   useEffect(() => {
//     const initializeApp = async () => {
//       try {
//         // Fetch modules only once when the app is initialized
//         const moduleData = await fetchModules();
//         setModules(moduleData);
//         setIsInitialized(true); // Mark as initialized
//       } catch (error) {
//         console.error("Error fetching modules:", error);
//       }
//     };

//     initializeApp();
//   }, []);

//   // Step 2: Check token and fetch user data once
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("tokenExists");

//       if (!token) {
//         setUserData(null);
//         return;
//       }

//       try {
//         const config = {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         };

//         const res = await axios.post("/api/auth/verifyToken", {}, config);

//         if (res?.data?.valid) {
//           setUserData(res.data.userData);
//           setUserProgress(res.data.userData.deductedActions);
//           setUserCredits(res.data.userData.credits);
//         } else {
//           setUserData(null);
//           localStorage.removeItem("tokenExists");
//           router.push("/auth");
//         }
//       } catch (error) {
//         // Handle error response
//         if (error.response && error.response.status === 401) {
//           message.error("Your session has expired. Please login again.");
//           setUserData(null);
//           localStorage.removeItem("tokenExists");
//           router.push("/auth");
//         } else {
//           console.error("Error fetching user data:", error);
//           message.error("An unexpected error occurred. Please try again.");
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Step 3: Check credits before navigating to protected routes
//   // useEffect(() => {
//   //   const handleRouteChange = async (url) => {
//   //     if (!isInitialized || !userData) return;

//   //     const isProtected = protectedPaths.some((path) => url.startsWith(path));

//   //     if (isProtected) {
//   //       const action = getAction(url); // Map URL to corresponding action
//   //       console.log("Action:", action);

//   //       if (userCredits < 1) {
//   //         return router.push("/no-credits");
//   //       }

//   //       const pathnameParts = url.split("/");
//   //       const selectedWordEncoded = pathnameParts[pathnameParts.length - 1];
//   //       const selectedWord = decodeURIComponent(selectedWordEncoded);
//   //       const wordExists = containsActionWord(
//   //         userProgress,
//   //         action,
//   //         selectedWord
//   //       );
//   //       if(wordExists) {

//   //         const requiredCredits = getRequiredCredits(action, modules);

//   //         if (userCredits < requiredCredits) {
//   //         return router.push("/no-credits");
//   //       }
//   //     }

//   //       // Temporarily hold updated credits for consistency
//   //       const creditsBeforeDeduction = userCredits;
//   //       const remainingCredits = userCredits - requiredCredits;

//   //       try {
//   //         const creditData = await checkCredits(
//   //           action,
//   //           selectedWord,
//   //           remainingCredits
//   //         );

//   //         console.log("Credit data:", creditData);
//   //         if (!creditData.success) {
//   //           return router.push("/no-credits");
//   //         }

//   //         if (creditData.creditsDeducted) {
//   //           setUserCredits(creditData.remainingCredits); // Update credits
//   //         }

//   //         // Navigate only after credits are verified
//   //         router.push(url);
//   //       } catch (error) {
//   //         console.error("Error occurred while updating credits:", error);

//   //         // Restore credits to their original value
//   //         setUserCredits(creditsBeforeDeduction);

//   //         return router.push("/no-credits");
//   //       }
//   //     }
//   //   };

//   //   router.events.on("routeChangeStart", handleRouteChange);

//   //   return () => {
//   //     router.events.off("routeChangeStart", handleRouteChange);
//   //   };
//   // }, [isInitialized, userCredits, userData]);
//   useEffect(() => {
//     const handleRouteChange = async (url) => {
//       if (!isInitialized || !userData) return;

//       if (router.asPath === url) return; // Prevent handling the same route

//       const isProtected = protectedPaths.some((path) => url.startsWith(path));
//       if (isProtected) {
//         const action = getAction(url);
//         const pathnameParts = url.split("/");
//         const selectedWordEncoded = pathnameParts[pathnameParts.length - 1];
//         const selectedWord = decodeURIComponent(selectedWordEncoded);

//         const wordExists =
//           action === "create-a-dialogue" || action === "create-a-story"
//             ? false
//             : containsActionWord(userProgress, action, selectedWord);
//         console.log("User credits:", userCredits);
//         const requiredCredits = getRequiredCredits(action, modules) || 0;

//         if (Math.abs(userCredits) < requiredCredits && !wordExists) {
//           console.log(userCredits, requiredCredits);
//           console.log("Not enough credits.");
//           return router.push("/no-credits");
//         }

//         const creditsBeforeDeduction = userCredits;
//         const remainingCredits = userCredits - requiredCredits;

//         try {
//           const creditData = await checkCredits(
//             action,
//             selectedWord,
//             remainingCredits
//           );

//           if (!creditData.success) {
//             console.log("Credit check failed.");
//             return router.push("/no-credits");
//           }

//           if (creditData.creditsDeducted) {
//             console.log("Credits deducted successfully.");
//             setUserCredits(creditData.remainingCredits);
//             if (userProgress && userProgress.length > 0) {
//               setUserProgress([...userProgress, `${action}-${selectedWord}`]);
//             }
//           }

//           router.push(url);
//         } catch (error) {
//           console.error("Error occurred while updating credits:", error);
//           setUserCredits(creditsBeforeDeduction); // Rollback credits
//           return router.push("/no-credits");
//         }
//       }
//     };

//     router.events.on("routeChangeStart", handleRouteChange);

//     return () => {
//       router.events.off("routeChangeStart", handleRouteChange);
//     };
//   }, [isInitialized, userData, protectedPaths, modules]);

//   return (
//     <UserContext.Provider
//       value={{ userData, setUserData, userCredits, modules, setUserCredits }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Utility function to get required credits for a specific action
// const getRequiredCredits = (action, modules) => {
//   const moduleData = modules?.find((module) => module.value === action);
//   console.log("Module data:", moduleData);
//   return moduleData.creditCost;
// };

// const containsActionWord = (actions, targetAction, targetWord) => {
//   if (!actions) return false;
//   console.log("Actions:", actions);
//   const actionKey = `${targetAction}-${targetWord}`; // Unique key for this action and word
//   console.log("Action key:", actionKey);
//   if (actions?.includes(actionKey)) {
//     return true;
//   }
//   return false;
// };

import { createContext, useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { checkCredits, getAction, fetchModules } from "../lib/utils";
import { message } from "antd";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserState = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userCredits, setUserCredits] = useState(0);
  const [modules, setModules] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userProgress, setUserProgress] = useState([]);
  const router = useRouter();

  const isNavigatingRef = useRef(false); // Flag to prevent duplicate calls
  const pendingUrl = useRef(null); // To store the next intended URL

  const protectedPaths = [
    "/user/stroke-order/practice",
    "/user/coloring-page/download",
    "/user/create-a-story/view",
    "/user/create-a-dialogue/view",
  ];

  // Step 1: Fetch modules once
  useEffect(() => {
    const initializeModules = async () => {
      try {
        const moduleData = await fetchModules();
        setModules(moduleData);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    initializeModules();
  }, []);

  // Step 2: Fetch user data once
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("tokenExists");
      if (!token) {
        setUserData(null);
        return;
      }

      try {
        const res = await axios.post("/api/auth/verifyToken", {}, { withCredentials: true });
        if (res?.data?.valid) {
          setUserData(res.data.userData);
          setUserCredits(res.data.userData.credits);
          setUserProgress(res.data.userData.deductedActions);
        } else {
          localStorage.removeItem("tokenExists");
          router.push("/auth");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        message.error("Session expired. Please login again.");
        router.push("/auth");
      }
    };
    fetchUserData();
  }, []);

  // Step 3: Handle route protection
  useEffect(() => {
    const handleRouteChange = async (url) => {
      if (isNavigatingRef.current) {
        pendingUrl.current = url; // Store the URL to navigate after processing
        return;
      }

      isNavigatingRef.current = true;

      try {
        if (!isInitialized || !userData) return;

        const isProtected = protectedPaths.some((path) => url.startsWith(path));
        if (!isProtected) return;

        const action = getAction(url);
        const pathnameParts = url.split("/");
        const selectedWord = decodeURIComponent(pathnameParts[pathnameParts.length - 1]);

        const wordExists =
          action === "create-a-dialogue" || action === "create-a-story"
            ? false
            : containsActionWord(userProgress, action, selectedWord);

        const requiredCredits = getRequiredCredits(action) || 0;

        if (userCredits < requiredCredits && !wordExists) {
          console.log("Not enough credits.");
          router.push("/no-credits");
          return;
        }

        const creditData = await checkCredits(action, selectedWord, userCredits - requiredCredits);
        if (!creditData.success) {
          router.push("/no-credits");
          return;
        }

        if (creditData.creditsDeducted) {
          setUserCredits(creditData.remainingCredits);
          if(userProgress && userProgress.length > 0)
          setUserProgress([...userProgress, `${action}-${selectedWord}`]);
        }
      } catch (error) {
        console.error("Error handling route change:", error);
      } finally {
        isNavigatingRef.current = false;

        // Navigate to pending URL if any
        if (pendingUrl.current) {
          router.push(pendingUrl.current);
          pendingUrl.current = null;
        }
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [isInitialized, userData]);

  const getRequiredCredits = (action) => {
    const moduleData = modules.find((module) => module.value === action);
    return moduleData?.creditCost || 0;
  };

  const containsActionWord = (actions, targetAction, targetWord) => {
    return actions?.includes(`${targetAction}-${targetWord}`);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        userCredits,
        modules,
        setUserCredits,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
