// Get Modules

import { collection, getDocs } from "firebase/firestore";
import { getDefaultColor, getDefaultIcon } from "../utils";
import { db } from "../firebaseConfig";

export const fetchModules = async () => {
    try {
      const modulesCollection = collection(db, "modules");
      const querySnapshot = await getDocs(modulesCollection);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Add default icons and colors if not present
      const defaultModules = data.map((module) => ({
        ...module,
        icon: module.icon || getDefaultIcon(module.value),
        color: module.color || getDefaultColor(module.value),
      }));
  
      return defaultModules;
    } catch (error) {
      console.error("Error fetching modules:", error);
      return [];
    }
  };