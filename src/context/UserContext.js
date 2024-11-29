import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { checkCredits, getAction } from "../lib/utils";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserState = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [tokenExists, setTokenExists] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization state
  const router = useRouter();

  const protectedPaths = [
    "/user/stroke-order/practice",
    "/user/coloring-page/download",
    "/user/create-a-story/view",
    "/user/create-a-dialogue/view",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenExistsInStorage = !!localStorage.getItem("tokenExists");
      setTokenExists(tokenExistsInStorage);
      setIsInitialized(true); // Mark as initialized after checking token
    }
  }, []);

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
          if (router.pathname === "/")
            router.push(`${res.data.userData.role.toLowerCase()}/dashboard`); // Refresh the page to update the user data
        } else {
          setUserData(null);
          localStorage.removeItem("tokenExists"); // Remove invalid token
          setTokenExists(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }
    };

    fetchUserData();
  }, [tokenExists]);

  useEffect(() => {
    if (
      isInitialized &&
      tokenExists &&
      protectedPaths.some((path) => router.pathname.startsWith(path))
    ) {
      const fetchUserData = async () => {
        try {
          const action = getAction(router.pathname);
          console.log("Action:", action);
          const creditData = await checkCredits(
            action,
            router.query.selectedWord
          );
          console.log(creditData);

          // if (!creditData.success) {
          //   router.push("/no-credits"); // Redirect if credits are insufficient
          // }

          setUserData(creditData.userData);
        } catch (error) {
          console.error("Error refetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [router.pathname, tokenExists, isInitialized]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
