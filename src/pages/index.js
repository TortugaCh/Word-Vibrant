import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import Template from "../components/Template";
import { useTranslations } from "next-intl";
import { withMessages } from "../lib/getMessages";
import { useUserContext } from "../context/UserContext";
import Footer from "../components/Footer";
import PricingSection from "../components/pricing/PricingSection";
import Image from "next/image"; // Import next/image for optimized image handling

export default function HomePage() {
  const [loading, setLoading] = useState(true); // Add a loading state
  const router = useRouter();
  const t = useTranslations("common");
  const { userData } = useUserContext();

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
    <>
      <Template t={t}>
        <div className="relative flex flex-col items-center ">
          {/* Images on Top-Right */}
          <div
            className="absolute top-0 right-0 z-10"
            style={{ height: "300px", width: "300px" }}
          >
            <Image
              src="/images/dash.png"
              alt="Background Top Right"
              layout="intrinsic"
              width={200}
              height={300}
              objectFit="cover"
              objectPosition="top right"
              className="w-full h-full"
            />
            <Image
              src="/images/pencil.png"
              alt="Background Bottom Right"
              width={200}
              height={300}
              objectFit="cover"
              objectPosition="bottom"
              className="w-full h-full"
            />
          </div>

          {/* Images on Top-Left */}
          <div
            className="absolute top-0 left-0 z-10"
            style={{ height: "300px", width: "300px" }}
          >
            <Image
              src="/images/paint.png"
              alt="Background Top Left"
              layout="intrinsic"
              width={300}
              height={400}
              objectFit="cover"
              objectPosition="top left"
              className="w-full h-full"
            />
            <Image
              src="/images/pouch.png"
              alt="Background Bottom Left"
              width={300}
              height={300}
              objectFit="cover"
              objectPosition="bottom"
              className="w-full h-full"
            />
          </div>

          {/* Main Content Area */}
          <main className="container mx-auto px-6 pt-32 text-center relative z-10">
            <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-12 overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-3xl">
              {/* Animated Top SVG Decoration */}
              <div
                className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 animate-floating"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute -top-20 -right-20 w-48 h-48 bg-yellow-500 rounded-full opacity-20 animate-floating"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Card Content */}
              <div className="relative z-10 text-center animate-fade-in">
                <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#7E57C2] to-[#42A5F5] mb-8">
                  {t("welcomeTitle")}
                </h2>
                <p className="text-gray-600 text-xl mb-10 leading-relaxed">
                  {t("welcomeDescription")}
                </p>
                <div className="flex justify-center gap-8 mb-10">
                  {!userData && (
                    <button
                      onClick={() => router.push("/auth")}
                      className="px-8 py-4 bg-[#42A5F5] text-white font-semibold rounded-full transition-transform transform hover:scale-110 hover:shadow-lg"
                    >
                      {t("loginSignup")}
                    </button>
                  )}
                  <button
                    onClick={() => router.push("/user/dashboard")}
                    className="px-8 py-4 bg-[#FFCA28] text-gray-900 font-semibold rounded-full transition-transform transform hover:scale-110 hover:shadow-lg"
                  >
                    {t("dashboard")}
                  </button>
                </div>
              </div>

              {/* Animated Bottom SVG Decoration */}
              <div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300 rounded-full opacity-20 animate-floating"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute -bottom-20 -right-20 w-48 h-48 bg-pink-300 rounded-full opacity-20 animate-floating"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </main>

          {/* Other Sections */}
          <section className="container mx-auto px-6 py-24 text-center relative z-10">
            <h3 className="text-4xl font-bold text-[#7E57C2] mb-8">
              {t("aboutTitle")}
            </h3>
            <p className="text-gray-600 text-lg">{t("aboutDescription")}</p>
          </section>
          {/* Plan */}

          {/* Pricing Section */}
          <PricingSection isSection={true} t={t} />
        </div>
      </Template>

      {/* Footer Section outside of Template */}
      <Footer t={t} />
    </>
  );
}

export const getServerSideProps = withMessages("common");
