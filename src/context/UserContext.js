import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { fetchModules } from "../lib/utils/modules";
import { checkCredits, setCredits } from "../lib/utils";
import { message } from "antd";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserState = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userCredits, setUserCredits] = useState(0);
  const [modules, setModules] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const initializeModules = async () => {
      try {
        const moduleData = await fetchModules();
        setModules(moduleData);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    const fetchUserData = async () => {
      const token = !!localStorage.getItem("tokenExists");  // Best approach
      if (!token) {
        setUserData(null);
        return;
      }

      try {
        const res = await axios.post(
          "/api/auth/verifyToken",
          {},
          {
            headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
            withCredentials: true,
          }
        );
        setUserData(res.data.userData);
        setUserCredits(res.data.userData.credits);
        setUserProgress(res.data.userData.deductedActions);
      } catch (error) {
        // Prevent Next.js from showing an internal error page
        console.error("Error fetching user data:", error);

        if (error.response?.status === 401) {
          // Handle 401 Unauthorized error specifically
          message.error("Session expired. Please login again.");
          localStorage.removeItem("tokenExists");
          router.push("/auth");
        } else {
          // Handle other errors gracefully
          message.error("An error occurred. Please try again later.");
        }
      }
    };

    initializeModules();
    fetchUserData();
  }, []);

  // Helper function to get required credits for an action
  const getRequiredCredits = (action) => {
    const moduleData = modules.find((module) => module.value === action);
    return moduleData?.creditCost || 0;
  };

  // Deduct credits and update user progress
  const deductCredits = async (action, targetWord = "") => {
    const requiredCredits = getRequiredCredits(action);
    if (userCredits < requiredCredits) {
      router.push("/no-credits");
      return false;
    }

    try {
      const creditData = await checkCredits(
        action,
        targetWord,
        userCredits - requiredCredits,
        requiredCredits
      );
      if (creditData.success) {
        console.log(creditData);
        setUserCredits(creditData.remainingCredits);
        if (creditData.creditsDeducted) {
          setUserProgress(creditData.userData.deductedActions);
        }
        return true;
      } else {
        message.error("Unable to deduct credits.");
        return false;
      }
    } catch (error) {
      console.error("Error deducting credits:", error);
      return false;
    }
  };

  // Reverse the deduction of credits
  const reverseCredits = async (action) => {
    const creditsToAddBack = getRequiredCredits(action);
    const resp = await setCredits(creditsToAddBack, userData.id);
    if (resp.status === 200) {
      setUserCredits(resp.data.updatedCredits);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        userCredits,
        setUserCredits,
        userProgress,
        setUserProgress,
        getRequiredCredits,
        deductCredits,
        reverseCredits,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
