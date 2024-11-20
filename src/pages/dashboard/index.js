import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import DashboardOptionCard from "../../components/DashboardOptionCard";
import { auth } from "../../lib/firebaseConfig";
import Template from "../../components/Template";
import { useTranslations } from "next-intl";
import { withMessages } from "../../lib/getMessages";
import { fetchModules } from "../../lib/utils";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [modules, setModules] = useState([]);
  const t = useTranslations("dashboard"); // Use the 'dashboard' namespace

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchModules();
        setModules(res);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Template title={t("dashboardTitle")} userData={userData}>
      <main className="container mx-auto px-6 py-3 mt-5 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl w-full p-8 mb-12">
          <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
            {t("welcome", { user: userData ? userData.email : "User" })}
          </h2>

          {/* Dashboard Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module) => (
              <DashboardOptionCard
                key={module.id}
                title={module.name}
                description={module.description}
                color={module.color}
                icon={module.icon}
                route={module.value}
              />
            ))}
          </div>
        </div>
      </main>
    </Template>
  );
}

export const getServerSideProps = withMessages("dashboard"); // Add this line
