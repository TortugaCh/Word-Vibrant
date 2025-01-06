import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import DashboardOptionCard from "../../../components/DashboardOptionCard";
import { auth } from "../../../lib/firebaseConfig";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../lib/getMessages";
import { fetchModules } from "../../../lib/utils/modules";
import DashboardLayout from "../layout";
import { useRouter } from "next/router";
import Progress from "../../../components/Progress/Progress";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();
  const t = useTranslations("dashboard"); // Use the 'dashboard' namespace

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        router.push("/auth"); // Redirect if no user is authenticated
      }
    });
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const res = await fetchModules();
        setModules(res);
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      {userData && <Progress userId={userData?.uid} t={t} />}
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("dashboard");
