import React from "react";
import Template from "../components/Template";
import Footer from "../components/Footer";
import { withMessages } from "../lib/getMessages";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FiMail } from "react-icons/fi";
export default function AboutUs() {
  const t = useTranslations("common");

  return (
    <>
      <Template t={t}>
        {/* Main Container */}
        <div className="container mx-auto px-6 py-16">
          {/* Page Heading */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-[#7E57C2] mb-4">關於我們</h1>
            <p className="text-gray-600 text-lg">
              深入了解我們的故事、教學方法和未來願景
            </p>
          </div>

          {/* About Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg rounded-xl p-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Section */}
            <div>
              <h2 className="text-4xl font-semibold text-[#7E57C2] mb-6">
                我們的故事
              </h2>
              <p className="text-gray-700 text-lg leading-8 mb-6">
                不只是個地方媽媽
                <br />
                作為一位小學一年級孩子的媽媽，並曾擔任國際學校的華語老師，在陪讀的過程中，我常覺得現有的教育工具還可以更多更簡單。於是，我決定創建這個學習工具。雖然這個小工具可能還不夠完美，但它承載了我對孩子的愛，也希望能夠得到大家的參與，一起讓它變得更好。
              </p>
              <p className="text-gray-700 text-lg leading-8">
                「重複」和「視覺」是幼兒學習的兩大關鍵。我們的工具利用了視覺化的識字方法：通過筆順動畫病互動嘗試，以及讓這些生字在一整篇故事或對話中出現，這些一直複現的方法不但可以幫助小朋友們記住生字的字形，還能讓他們在語境中理解和應用，增加更多連結。
              </p>
            </div>

            {/* Framed Image Section */}
            <div className="flex justify-center items-center">
              <div className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src="/images/about.jpg"
                  alt="Illustration of love for children"
                  width={450}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-white shadow-lg rounded-xl p-10 mt-16 max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-semibold text-[#42A5F5] mb-6">
              我們的願景
            </h2>
            <p className="text-gray-700 text-lg leading-8">
              在全球掀起AI熱潮的背景下，不同領域都在利用AI創新，其中不乏商務、交友和教育。我們希望「語動」能成為一個起點，不僅讓孩子的識字之路更順暢，還能與AI一起成長，探索這項技術帶來的無限可能。
            </p>
          </div>

          {/* Teaching Philosophy Section */}
          <div className="bg-gradient-to-l from-purple-50 to-blue-50 shadow-lg rounded-xl p-10 mt-16 max-w-6xl mx-auto">
            <h2 className="text-4xl font-semibold text-[#42A5F5] mb-6 text-center">
              關於教學法
            </h2>
            <p className="text-gray-700 text-lg leading-8">
              「重複」和「視覺」是幼兒學習的兩大關鍵。我們的工具利用了視覺化的識字方法：通過筆順動畫病互動嘗試，以及讓這些生字在一整篇故事或對話中出現，這些一直複現的方法不但可以幫助小朋友們記住生字的字形，還能讓他們在語境中理解和應用，增加更多連結。
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-100 shadow-lg rounded-2xl p-10 mt-16 max-w-6xl mx-auto">
            <h2 className="text-4xl font-semibold text-[#42A5F5] mb-6 text-center">
              聯絡我們
            </h2>
            <div className="flex flex-col items-center gap-4">
              <FiMail className="text-5xl text-[#7E57C2]" />
              <a
                href="mailto:chiahuammx@gmail.com"
                className="text-[#7E57C2] text-lg underline hover:text-[#42A5F5] transition-all duration-300"
              >
                chiahuammx@gmail.com
              </a>
            </div>
          </div>
        </div>
      </Template>
      <Footer t={t} />
    </>
  );
}

export const getServerSideProps = withMessages("common");
