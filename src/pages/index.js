import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import Template from "../components/Template";
import { useTranslations } from "next-intl";
import { withMessages } from "../lib/getMessages";

export default function HomePage() {
  const [loading, setLoading] = useState(true); // Add a loading state
  const router = useRouter();
  const t = useTranslations("common");

  // Simulate data fetching or page load delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // Render the loader if loading is true
  if (loading) {
    return <Loader />;
  }

  return (
    <Template>
      <div className="relative flex flex-col items-center overflow-hidden">
        <main className="container mx-auto px-6 pt-32 text-center">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12">
            <h2 className="text-5xl font-extrabold text-[#7E57C2] mb-8">
              {t("welcomeTitle")}
            </h2>
            <p className="text-gray-600 text-xl mb-10">
              {t("welcomeDescription")}
            </p>
            <div className="flex justify-center gap-8 mb-10">
              <button
                onClick={() => router.push("/auth")}
                className="px-8 py-4 bg-[#42A5F5] text-white font-semibold rounded-full"
              >
                {t("loginSignup")}
              </button>
              <button
                onClick={() => router.push("/user/dashboard")}
                className="px-8 py-4 bg-[#FFCA28] text-gray-900 font-semibold rounded-full"
              >
                {t("dashboard")}
              </button>
            </div>
          </div>
        </main>

        <section className="container mx-auto px-6 py-24 text-center">
          <h3 className="text-4xl font-bold text-[#7E57C2] mb-8">
            {t("aboutTitle")}
          </h3>
          <p className="text-gray-600 text-lg">{t("aboutDescription")}</p>
        </section>

        <section className="container mx-auto px-6 py-20 text-center">
          <h3 className="text-4xl font-bold text-purple-700 mb-12">
            {t("choosePlan")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { name: t("freePlan"), credits: 5, cost: 0 },
              { name: t("credits25"), credits: 25, cost: 250 },
              { name: t("credits70"), credits: 70, cost: 490 },
              { name: t("credits200"), credits: 200, cost: 999 },
            ].map((plan, index) => (
              <div
                key={index}
                className="p-10 bg-gradient-to-b from-blue-100 to-blue-200 rounded-3xl shadow-lg"
              >
                <h4 className="text-3xl font-bold">{plan.name}</h4>
                <p className="text-gray-700">
                  {plan.credits} {t("credits")}
                </p>
                {plan.cost > 0 && (
                  <p className="text-gray-700">NT${plan.cost}</p>
                )}
                <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full">
                  {t(plan.cost > 0 ? "buyNow" : "getStarted")}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Template>
  );
}

export const getServerSideProps = withMessages("common");
