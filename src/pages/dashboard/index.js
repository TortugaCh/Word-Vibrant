// src/pages/dashboard/index.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import CurriculumSelector from "../../components/CurriculumSelector";
import ModuleSelector from "../../components/ModuleSelector";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/auth");
      }
    });
    return () => unsubscribe();
  }, [router]);
  x``;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.email}</p>}
      <button onClick={handleLogout}>Logout</button>
      <CurriculumSelector />
      <ModuleSelector />
    </div>
  );
}
