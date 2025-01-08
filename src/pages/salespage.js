import React, { useState } from "react";
import Template from "../components/Template";
import Footer from "../components/Footer";
import { withMessages } from "../lib/getMessages";
import PricingSection from "../components/pricing/PricingSection";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  Star,
  Trophy,
  Brain,
  Rocket,
  Crown,
  PlayCircle,
  ArrowRight,
  PenTool,
  Palette,
  Gamepad,
  Sparkles,
  Medal,
  Heart,
  MessageCircle,
  Check,
} from "lucide-react";
import { FiMail, FiBook, FiStar, FiAward } from "react-icons/fi";
import { FiEdit, FiBrush, FiMessageSquare, FiBookOpen } from "react-icons/fi";
import { modules } from "../constants/constants";
import { useRouter } from "next/router";

export default function AboutUs() {
  const t = useTranslations("common");
  const router = useRouter();
  const { locale } = router;
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
            className={`p-4 rounded-2xl bg-gradient-to-br ${module.color} bg-opacity-10`}
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
                className={`w-5 h-5 rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center flex-shrink-0 mt-1`}
              >
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-4 bg-gradient-to-r ${module.color} text-white font-semibold rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
          onClick={handleLearnMore}
        >
          {isZh ? "開始學習" : "Start Learning"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }
  return (
    <>
      <Template t={t}>
        {/* Main Container */}

        {/* Hero Section with Playful Elements */}
        <section className="relative py-24 px-4 sm:px-6 rounded-3xl   lg:px-8 bg-gradient-to-br from-[#EEDDFD] via-[#FEEEF6] to-[#7D57C1] overflow-hidden">
          {/* Floating Animation Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <Sparkles className="w-8 h-8 text-[#42A5F5]/20" />
              </div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-left relative">
                {/* Decorative Badge */}
                <div className="absolute -top-6 -left-6 bg-[#FF8534] text-white px-4 py-2 rounded-lg rotate-[-6deg] shadow-lg">
                  <span className="flex items-center gap-2">
                    <Crown className="w-4 h-4" /> {locale !== "zh" ? "For Ages 5-12" : "5-12歲"}
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-[#2D3648] mb-6 leading-tight">
                  {locale !== "zh" ? "Make Learning Chinese" : "學習中文"}{" "}
                  <span className="block text-[#42A5F5] mt-2">
                    {locale !== "zh" ? "Super Fun" : "超級好玩"} 🎮
                  </span>
                </h1>
                <p className="text-xl text-[#4A5567] mb-8 leading-relaxed">
                  {t("salesPage.description")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-[#42A5F5] text-white rounded-xl font-semibold hover:bg-[#FF8534] transition-all flex items-center gap-2 shadow-lg shadow-orange-200 transform hover:scale-105" onClick={handleLearnMore}>
                    {t("salesPage.startAdventure")}{" "}
                    <Rocket className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 bg-white/80 text-[#2D3648] rounded-xl font-semibold hover:bg-white transition-all flex items-center gap-2 backdrop-blur-sm shadow-lg transform hover:scale-105">
                    {t("salesPage.watchFunDemo")}{" "}
                    <PlayCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Content */}
              <div className="relative">
                {/* Parent Testimonial Bubble */}
                <div className="absolute -top-2 right-0 bg-white rounded-2xl p-4 shadow-xl max-w-xs transform rotate-3 z-14">
                  <div className="flex items-start gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-[#4A5567]">
                      {locale !== "zh"
                        ? "My kids love learning Chinese now!"
                        : "我的孩子現在喜歡學中文了！"}
                    </p>
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative rounded-2xltransform hover:scale-[1.02] transition-transform">
                  <img
                    src="/images/sales.png"
                    alt="Happy kids learning"
                    className="rounded-2xl"
                  />
                  {/* Achievement Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2">
                    <Medal className="w-5 h-5 text-[#FF8534]" />
                    <span className="text-sm font-semibold text-[#2D3648]">
                      {locale !== "zh" ? "Learn While Playing" : "玩遊戲學習"}
                    </span>
                  </div>
                </div>
              </div>
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 transform -rotate-3 scale-105"></div>
                  <img
                    src="/images/salepage.png"
                    alt="Teaching"
                    className="relative w-full h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-12">
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-500">
                    <h3 className="text-2xl font-bold text-[#2D3648]">
                      🎓 {t("salesPage.interactiveLessons.title")}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {t("salesPage.interactiveLessons.description")}
                    </p>
                  </div>

                  {/* Comprehensive Approach */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-purple-500">
                    <h3 className="text-2xl font-bold text-[#2D3648]">
                      💡 {t("salesPage.comprehensiveApproach.title")}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {t("salesPage.comprehensiveApproach.description")}
                    </p>
                  </div>

                  {/* Proven Success */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-yellow-500">
                    <h3 className="text-2xl font-bold text-[#2D3648]">
                      🏆 {t("salesPage.provenSuccess.title")}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {t("salesPage.provenSuccess.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PricingSection isSection={true} t={t} />
        {/* Interactive Features Section */}
        <section className="py-24  relative ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative">
              <h2 className="text-4xl font-bold text-[#2D3648] mb-4">
                {t("salesPage.learningSection.title")}
              </h2>
              <p className="text-xl text-[#4A5567]">
                {t("salesPage.learningSection.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Gamepad className="w-8 h-8" />,
                  title: t("salesPage.learningSection.personalizedLearning.title"),
                  description: t("salesPage.learningSection.personalizedLearning.description"),
                  color: "bg-purple-100 text-purple-500",
                },
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: t("salesPage.learningSection.smartLearning.title"),
                  description: t("salesPage.learningSection.smartLearning.description"),
                  color: "bg-blue-100 text-blue-500",
                },
                {
                  icon: <Medal className="w-8 h-8" />,
                  title: t("salesPage.learningSection.interactivePractice.title"),
                  description: t("salesPage.learningSection.interactivePractice.description"),
                  color: "bg-yellow-100 text-yellow-500",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-dashed border-[#EEDDFD]"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${feature.color} mb-6`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D3648] mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-[#4A5567] leading-relaxed">
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
