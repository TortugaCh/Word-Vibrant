import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import Template from "../components/Template";
import { useTranslations } from "next-intl";
import { withMessages } from "../lib/getMessages";
import { useUserContext } from "../context/UserContext";
import Footer from "../components/Footer";
import PricingSection from "../components/pricing/PricingSection";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Rocket,
  Sparkles,
  Star,
  Trophy,
  Target,
  Users,
  Zap,
  PenTool,
  Brush,
  Play,
  Edit3,
  Palette,
  MessageCircle,
  Heart,
  Lightbulb,
  Check,
  ArrowRight,
} from "lucide-react";
import { modules } from "../constants/constants";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const t = useTranslations("common");
  const { userData } = useUserContext();
  const { locale } = router;
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleLearnMore = () => {
    if (userData) router.push("/user/dashboard");
    else router.push("/auth");
  };

  function ModuleCard({ module, index }) {
    const isZh = locale === "zh"; // Check if the locale is 'zh'

    return (
      <div
        className={`relative ${
          module.bgColor
        } p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed border-opacity-50 border-${
          module.color.split("-")[1]
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Achievement Badge */}
        <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg transform rotate-6">
          <span className="text-sm font-bold text-gray-700">
            {isZh ? module.achievementZh : module.achievement}
          </span>
        </div>

        <div className="mb-6 flex justify-center">
          <div
            className={`p-4 rounded-2xl bg-gradient-to-br ${module.color
            } bg-opacity-10`}
          >
            {module.icon}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {isZh ? module.titleZh : module.title}
        </h3>

        <p className="text-gray-600 mb-6">
          {isZh ? module.descriptionZh : module.description}
        </p>

        <ul className="space-y-3 mb-8">
          {(isZh ? module.pointsZh : module.points).map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full bg-gradient-to-br ${module.color} flex items-center justify-center flex-shrink-0 mt-1`}
              >
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-4 bg-gradient-to-br ${module.color} text-white font-semibold rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
          onClick={handleLearnMore}
        >
          {isZh ? "開始學習" : "Start Learning"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  const features = [
    {
      icon: <Target className="w-8 h-8 text-indigo-500" />,
      title: "Personalized Learning",
      description:
        "Adaptive learning paths tailored to your progress and goals",
    },
    {
      icon: <Trophy className="w-8 h-8 text-amber-500" />,
      title: "Achievement System",
      description:
        "Earn rewards and track your progress with gamified learning",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-cyan-500" />,
      title: "Interactive Practice",
      description: "Engage with dynamic exercises and real-time feedback",
    },
  ];

  return (
    <>
      <Template t={t}>
        <div className="relative flex flex-col items-center">
          {/* Hero Section */}
          <section className="relative pt-20 pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-8">
                    <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                      {locale !== "zh" ? "Learning Made" : "學習變得"}{" "}
                    </span>
                    <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      {locale !== "zh" ? "Fun & Easy" : "有趣且輕鬆"}
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-10">
                    {t("welcomeDescription")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    {!userData && (
                      <button
                        onClick={() => router.push("/auth")}
                        className="px-8 py-4 bg-[#42A5F5] text-white font-bold rounded-xl text-lg transform transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        {t("loginSignup")} <Rocket className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() =>
                        userData
                          ? router.push("/user/dashboard")
                          : router.push("/auth")
                      }
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl text-lg transform transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {t("dashboard")}
                    </button>{" "}
                  </div>
                </div>

                {/* <div className="flex-1">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {
                        icon: <Users className="w-8 h-8" />,
                        stat: "10K+",
                        label: locale === "zh" ? "學生" : "Students",
                        color: "bg-blue-50",
                      },
                      {
                        icon: <Star className="w-8 h-8" />,
                        stat: "4.9",
                        label: locale === "zh" ? "評分" : "Rating",
                        color: "bg-yellow-50",
                      },
                      {
                        icon: <Trophy className="w-8 h-8" />,
                        stat: "1M+",
                        label: locale === "zh" ? "獎勵" : "Rewards",
                        color: "bg-green-50",
                      },
                      {
                        icon: <BookOpen className="w-8 h-8" />,
                        stat: "500+",
                        label: locale === "zh" ? "故事" : "Stories",
                        color: "bg-purple-50",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={`${item.color} p-6 rounded-2xl transform hover:scale-105 transition-all duration-300`}
                      >
                        <div className="text-purple-600 mb-4">{item.icon}</div>
                        <div className="text-3xl font-bold text-gray-800 mb-1">
                          {item.stat}
                        </div>
                        <div className="text-gray-600">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </section>
          <section className="py-24  relative ">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  <Sparkles className="w-8 h-8 text-purple-200" />
                </div>
              ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  {t("learningSection.title")} 🚀
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t("learningSection.description")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {modules.map((module, index) => (
                  <ModuleCard key={index} module={module} index={index} />
                ))}
              </div>
            </div>
          </section>
          {/* About Section */}
          <section className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center mb-20">
                <span className="text-purple-600 font-semibold tracking-wider uppercase mb-4 block">
                  {t("about.heading")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    {t("about.title")}
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {t("about.description")}
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="col-span-1 lg:col-span-3 mb-12">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-full md:w-1/3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl transform rotate-6 scale-105"></div>
                          <img
                            src="/images/ab.jpg"
                            alt="Teaching Chinese"
                            className="relative rounded-2xl shadow-lg w-full h-[300px] object-cover"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-2/3">
                        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-6">
                          <Heart className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {t("about.moreThanParents")}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {t("about.moreThanParentsDescription")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-1">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-6">
                      <Lightbulb className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {t("about.teachingMethod")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("about.teachingMethodDescription")}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-1">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white mb-6">
                      <Rocket className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {t("about.ourVision")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("about.ourVisionDescription")}
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          100+
                        </div>
                        <div className="text-sm text-gray-600">
                          {locale === "zh" ? "滿意學生" : "Satisfied Students"}
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          5000+
                        </div>
                        <div className="text-sm text-gray-600">
                          {locale === "zh" ? "學習時數" : "Learning Hours"}
                        </div>
                      </div>
                      <div className="bg-pink-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-pink-600 mb-1">
                          98%
                        </div>
                        <div className="text-sm text-gray-600">
                          {locale === "zh"
                            ? "學生滿意度"
                            : "Student Satisfaction"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          {/* Pricing Section */}
          <PricingSection isSection={true} t={t} />
        </div>
        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-b ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-6">
                {t("chooseSection.title")}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t("chooseSection.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Target className="w-12 h-12" />,
                  title: t("chooseSection.personalizedLearning.title"),
                  description: t(
                    "chooseSection.personalizedLearning.description"
                  ),
                  color: "from-purple-500 to-indigo-500",
                },
                {
                  icon: <Trophy className="w-12 h-12" />,
                  title: t("chooseSection.achievementSystem.title"),
                  description: t("chooseSection.achievementSystem.description"),
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Star className="w-12 h-12" />,
                  title: t("chooseSection.interactivePractice.title"),
                  description: t(
                    "chooseSection.interactivePractice.description"
                  ),
                  color: "from-pink-500 to-rose-500",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div
                    className={`inline-block p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Template>
      <Footer t={t} />
    </>
  );
}

export const getServerSideProps = withMessages("common");
