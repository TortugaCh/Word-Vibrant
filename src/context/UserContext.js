import { createContext, useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { fetchModules } from "../lib/utils/modules";
import { checkCredits } from "../lib/utils";
import { getAction } from "../lib/utils";
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
        const res = await axios.post(
          "/api/auth/verifyToken",
          {},
          { withCredentials: true }
        );
        setUserData(res.data.userData);
        setUserCredits(res.data.userData.credits);
        setUserProgress(res.data.userData.deductedActions);
      } catch (error) {
        if (error.response?.status === 401) {
          console.warn("Unauthorized: Token invalid or expired.");
          localStorage.removeItem("tokenExists");
          message.error("Session expired. Please login again.");
          router.push("/auth");
        } else {
          console.error("Error fetching user data:", error);
          message.error("An unexpected error occurred.");
        }
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
        const selectedWord = decodeURIComponent(
          pathnameParts[pathnameParts.length - 1]
        );

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

        const creditData = await checkCredits(
          action,
          selectedWord,
          userCredits - requiredCredits
        );
        if (!creditData.success) {
          router.push("/no-credits");
          return;
        }

        if (creditData.creditsDeducted) {
          setUserCredits(creditData.remainingCredits);
          if (userProgress && userProgress.length > 0)
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

  const containsActionWord = (actions, targetAction, targetWord,moduleName) => {
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
