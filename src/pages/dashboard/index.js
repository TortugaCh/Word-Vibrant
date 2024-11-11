// src/pages/dashboard/index.js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import DashboardOptionCard from "../../components/DashboardOptionCard";
import { auth } from "../../lib/firebaseConfig";
import Template from "../../components/Template";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Template title="Chinese Literacy AI Dashboard" userData={userData}>
      <main className="container mx-auto px-6 py-3 mt-5 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl w-full p-8 mb-12">
          <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
            Welcome, {userData ? userData.email : "User"}!
          </h2>

          {/* Dashboard Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardOptionCard
              title="✍️ Stroke Orders"
              description="Learn the proper stroke order for Hanzi characters to improve your writing skills."
              color="bg-blue-100 border-blue-200"
              icon="✍️"
              route="/strokeOrders"
            />
            <DashboardOptionCard
              title="🎨 Hanzi Coloring Page"
              description="Color and learn Hanzi characters interactively with fun, engaging activities."
              color="bg-green-100 border-green-200"
              icon="🎨"
              route="/coloringPage"
            />
            <DashboardOptionCard
              title="📖 Create a Short Story"
              description="Develop your language skills by creating short stories in Chinese."
              color="bg-yellow-100 border-yellow-200"
              icon="📖"
              route="/createStory"
            />
            <DashboardOptionCard
              title="💬 Create a Dialogue"
              description="Practice conversation skills by creating dialogues that enhance learning."
              color="bg-pink-100 border-pink-200"
              icon="💬"
              route="/createDialogue"
            />
          </div>
        </div>
      </main>
    </Template>
  );
}
