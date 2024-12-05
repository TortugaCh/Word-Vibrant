// import { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { checkCredits, getAction } from "../lib/utils";

// const UserContext = createContext();

// export const useUserContext = () => useContext(UserContext);

// export const UserState = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [tokenExists, setTokenExists] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false); // Track initialization state
//   const router = useRouter();

//   const protectedPaths = [
//     "/user/stroke-order/practice",
//     "/user/coloring-page/download",
//     "/user/create-a-story/view",
//     "/user/create-a-dialogue/view",
//   ];

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const tokenExistsInStorage = !!localStorage.getItem("tokenExists");
//       setTokenExists(tokenExistsInStorage);
//       setIsInitialized(true); // Mark as initialized after checking token
//     }
//   }, []);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!tokenExists) return; // Exit early if no token

//       try {
//         const config = {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         };

//         const res = await axios.post("/api/auth/verifyToken", {}, config);
//         if (res?.data?.valid) {
//           setUserData(res.data.userData);
//           if (router.pathname === "/")
//             if (userData)
//               router.push(`${res.data.userData.role.toLowerCase()}/dashboard`); // Refresh the page to update the user data
//         } else {
//           setUserData(null);
//           localStorage.removeItem("tokenExists"); // Remove invalid token
//           setTokenExists(false);
//           router.push("/auth"); // Redirect to login if token is invalid
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setUserData(null);
//       }
//     };

//     fetchUserData();
//   }, [tokenExists]);

//   useEffect(() => {
//     if (
//       isInitialized &&
//       tokenExists &&
//       protectedPaths.some((path) => router.pathname.startsWith(path))
//     ) {
//       const fetchUserData = async () => {
//         try {
//           const action = getAction(router.pathname);
//           const creditData = await checkCredits(
//             action,
//             router.query.selectedWord
//           );

//           if (!creditData.success) {
//             router.push("/no-credits"); // Redirect if credits are insufficient
//           }
//           else{

//             setUserData(creditData.userData);
//           }

//         } catch (error) {
//           console.error("Error refetching user data:", error);
//         }
//       };

//       fetchUserData();
//     }
//   }, [router.pathname, tokenExists, isInitialized]);

//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { checkCredits, getAction } from "../lib/utils";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserState = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [tokenExists, setTokenExists] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userCredits, setUserCredits] = useState(0); // Track the user credits
  const router = useRouter();

  const protectedPaths = [
    "/user/stroke-order/practice",
    "/user/coloring-page/download",
    "/user/create-a-story/view",
    "/user/create-a-dialogue/view",
  ];

  // Step 1: Check if the token exists in localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenExistsInStorage = !!localStorage.getItem("tokenExists");
      setTokenExists(tokenExistsInStorage);
      setIsInitialized(true); // Mark as initialized after checking token
    }
  }, []);

  // Step 2: Fetch user data and verify token
  useEffect(() => {
    const fetchUserData = async () => {
      if (!tokenExists) return; // Exit early if no token

      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };

        const res = await axios.post("/api/auth/verifyToken", {}, config);
        if (res?.data?.valid) {
          setUserData(res.data.userData);
          setUserCredits(res.data.userData.credits); // Set the user credits from the backend data
        } else {
          setUserData(null);
          localStorage.removeItem("tokenExists");
          setTokenExists(false);
          router.push("/auth");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }
    };

    fetchUserData();
  }, [tokenExists]);

  // Step 3: Handle credit check before accessing protected routes
  useEffect(() => {
    if (
      isInitialized &&
      tokenExists &&
      protectedPaths.some((path) => router.pathname.startsWith(path))
    ) {
      const fetchCreditsAndRedirect = async () => {
        try {
          const action = getAction(router.pathname);
          // Check credits on the frontend before proceeding
          const requiredCredits = getRequiredCredits(action); // Define this function to get the required credits for the module
          console.log("Required credits:", requiredCredits);
          console.log("User credits:", userCredits);
          if (userCredits < requiredCredits) {
            router.push("/no-credits"); // Redirect if credits are insufficient
          } else {
            // If credits are enough, proceed to fetch user data or load the module
            const creditData = await checkCredits(action, router.query.selectedWord);
            console.log("Credit data:", creditData);

            if (!creditData.success) {
              router.push("/no-credits"); // Redirect if credits are insufficient
            } else {
              setUserCredits(creditData.userData.credits); // Update the credits if needed
              setUserData(creditData.userData);
            }
          }
        } catch (error) {
          console.error("Error checking credits:", error);
          router.push("/no-credits"); // Handle failure and redirect to no-credits page
        }
      };

      fetchCreditsAndRedirect();
    }
  }, [router.pathname, tokenExists, isInitialized, userCredits]);

  return (
    <UserContext.Provider value={{ userData, setUserData, userCredits, setUserCredits }}>
      {children}
    </UserContext.Provider>
  );
};

// Define a function to get the required credits based on the module or action
const getRequiredCredits = (action) => {
  // Example: Return different required credits based on the action/module
  const creditMap = {
    "stroke-order": 1,
    "coloring-page": 2,
    "create-a-story": 3,
    "create-a-dialogue": 4,
  };
  return creditMap[action] || 0; // Default to 0 if no action found
};

// import { createContext, useState, useContext, useEffect } from "react";
// import { useRouter } from "next/router";
// import Cookies from "js-cookie";
// import { fetchModules } from "../lib/utils";

// const UserContext = createContext();

// export const useUserContext = () => useContext(UserContext);

// export const UserState = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [userCredits, setUserCredits] = useState(0); // Track user credits
//   const [modules, setModules] = useState([]);
//   const router = useRouter();

//   const getRequiredCredits = (action) => {
//     const moduleCredits = modules?.find((module) => module.value === action);
//     return moduleCredits?.creditCost || 0;
//   };

//   const protectedPaths = [
//     "/user/stroke-order/practice",
//     "/user/coloring-page/download",
//     "/user/create-a-story/view",
//     "/user/create-a-dialogue/view",
//   ];

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Read user data from cookies
//         const role = Cookies.get("role");
//         const id = Cookies.get("userId");
//         const email = Cookies.get("email");
//         const credits = Cookies.get("credits");
//         const name = Cookies.get("name");
//         const modulesData = await fetchModules();
//         if (role && id && email) {
//           if (modulesData.length > 0 && modulesData) setModules(modulesData);
//           setUserData({ role, id, email, credits, name });
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         router.push("/auth"); // Redirect to login on error
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (protectedPaths.some((path) => router.pathname.startsWith(path))) {
//       if (userCredits <= 0) router.push("/no-credits");
//       const requiredCredits = getRequiredCredits(router.pathname);
//       if (userCredits < requiredCredits) router.push("/no-credits");
//     }
//   }, [router.pathname, userCredits]);

//   return (
//     <UserContext.Provider
//       value={{ userData, setUserData, userCredits, setUserCredits }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };
