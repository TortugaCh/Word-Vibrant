// src/pages/dashboard/index.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import CurriculumSelector from "../../components/CurriculumSelector";
import ModuleSelector from "../../components/ModuleSelector";
import HanziStroke from "../../components/HanziStroke/HanziStroke";

export default function Dashboard() {
  const router = useRouter();
  const { userData: userDataString } = router.query;
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (userDataString) {
      setUserData(JSON.parse(userDataString)); // Parse the userData JSON
    }
  }, [userDataString]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       setUser(currentUser);
  //     } else {
  //       router.push("/auth");
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [router]);

  console.log(userData);
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {userData && <p>Welcome, {userData.email}</p>}
      <button onClick={handleLogout}>Logout</button>
      <CurriculumSelector />
      <ModuleSelector />
      <HanziStroke word="激" />
    </div>
  );
}
