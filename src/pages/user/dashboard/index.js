import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import DashboardOptionCard from "../../../components/DashboardOptionCard";
import { auth } from "../../../lib/firebaseConfig";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../lib/getMessages";
import { fetchModules } from "../../../lib/utils";
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
        router.push("/login"); // Redirect if no user is authenticated
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    // <DashboardLayout>
    //   {/* Header */}
    //   <header className="flex justify-between items-center bg-gray-200 px-2 py-4 shadow-md mb-4">
    //     <div>
    //       <h1 className="text-2xl font-bold text-purple-700">
    //         {t("dashboardTitle")}
    //       </h1>
    //       <p>{t("welcome", { user: userData ? userData.email : "User" })}</p>
    //     </div>
    //   </header>

    //   {/* Loader or Content */}
    //   {loading ? (
    //     <div className="flex justify-center items-center h-[70vh]">
    //       <div className="w-16 h-16 border-4 border-purple-400 border-dashed rounded-full animate-spin"></div>
    //     </div>
    //   ) : (
    //     <main className="container mx-auto px-6 py-3">
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //         {modules.map((module) => (
    //           <DashboardOptionCard
    //             key={module.id}
    //             title={module.name}
    //             description={module.description}
    //             color={module.color}
    //             icon={module.icon}
    //             route={module.value}
    //           />
    //         ))}
    //       </div>
    //     </main>
    //   )}
    // </DashboardLayout>
    <DashboardLayout>
      {userData && <Progress userId={userData?.uid} />}
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("dashboard");
