import React, { useState } from "react";
import Template from "../components/Template";
import Footer from "../components/Footer";
import { withMessages } from "../lib/getMessages";
import { useTranslations } from "next-intl";
import { Heart, Lightbulb, Rocket, BookOpen, Target, Mail } from "lucide-react";
import { FiMail } from "react-icons/fi";

export default function AboutUs() {
  const t = useTranslations("common");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Template t={t}>
        {/* Main Container */}
        <div className="min-h-screen ">
          {/* Hero Section */}
          <section className="relative pt-24 pb-16 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    關於我們
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  深入了解我們的故事、教學方法和未來願景
                </p>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 transform -rotate-3 scale-105"></div>
                    <img
                      src="/images/mother.png"
                      alt="Teaching"
                      className="relative w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-12">
                    <div className="inline-flex p-3 rounded-xl bg-purple-50 text-purple-600 mb-6">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      不只是個地方媽媽
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      作為一位小學一年級孩子的媽媽，並曾擔任國際學校的華語老師，在陪讀的過程中，我常覺得現有的教育工具還可以更多更簡單。於是，我決定創建這個學習工具。雖然這個小工具可能還不夠完美，但它承載了我對孩子的愛，也希望能夠得到大家的參與，一起讓它變得更好。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teaching Method Section */}
          <section className="py-16 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-8">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-3xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <div className="p-8 md:p-12 lg:p-16">
                    <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow-lg mb-6">
                      <BookOpen className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                      關於教學法
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      「重複」和「視覺」是幼兒學習的兩大關鍵。我們的工具利用了視覺化的識字方法：通過筆順動畫病互動嘗試，以及讓這些生字在一整篇故事或對話中出現，這些一直複現的方法不但可以幫助小朋友們記住生字的字形，還能讓他們在語境中理解和應用，增加更多連結。
                    </p>
                    <a
                      href="#"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-medium rounded-lg shadow hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                      Learn More
                    </a>
                  </div>

                  {/* Right Image */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 transform rotate-3 scale-110 rounded-3xl opacity-50"></div>
                    <img
                      src="images/vision.png"
                      alt="Learning Method"
                      className="relative rounded-3xl shadow-lg w-full h-[400px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="py-16">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl shadow-xl p-12">
                <div className="text-center mb-12">
                  <div className="inline-flex p-3 rounded-xl bg-pink-50 text-pink-600 mb-6">
                    <Rocket className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    我們的願景
                  </h2>
                  <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    在全球掀起AI熱潮的背景下，不同領域都在利用AI創新，其中不乏商務、交友和教育。我們希望「語動」能成為一個起點，不僅讓孩子的識字之路更順暢，還能與AI一起成長，探索這項技術帶來的無限可能。
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center transform hover:-translate-y-1 transition-all duration-300">
                    <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">創新教學</h3>
                    <p className="text-gray-600">
                      結合AI技術，打造個性化學習體驗
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center transform hover:-translate-y-1 transition-all duration-300">
                    <Lightbulb className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">互動學習</h3>
                    <p className="text-gray-600">通過遊戲和故事激發學習興趣</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 text-center transform hover:-translate-y-1 transition-all duration-300">
                    <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">用心設計</h3>
                    <p className="text-gray-600">專注於每個孩子的學習需求</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex p-3 rounded-xl bg-purple-50 text-purple-600 mb-6">
                  <Mail className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  聯絡我們
                </h2>
                <p className="text-gray-600">
                  有任何問題或建議嗎？請填寫以下表單，我們會盡快回覆您。
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      姓名
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="請輸入您的姓名"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      電子郵件
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="請輸入您的電子郵件"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      訊息內容
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                      placeholder="請輸入您的訊息"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    發送訊息
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </Template>
      <Footer t={t} />
    </>
  );
}

export const getServerSideProps = withMessages("common");
