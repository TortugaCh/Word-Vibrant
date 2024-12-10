import React from "react";
import Template from "../components/Template";
import Footer from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import { withMessages } from "../lib/getMessages";
import { useTranslations } from "next-intl";
export default function AboutUs() {
  const t = useTranslations("common");
  return (
    <Template t={t}>
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-[#7E57C2] mb-8">關於我們</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          不只是個地方媽媽
          <br />
          作為一位小學一年級孩子的媽媽，並曾擔任國際學校的華語老師，在陪讀的過程中，我常覺得現有的教育工具還可以更多更簡單。於是，我決定創建這個學習工具。雖然這個小工具可能還不夠完美，但它承載了我對孩子的愛，也希望能夠得到大家的參與，一起讓它變得更好。
        </p>

        <h2 className="text-4xl font-semibold text-[#42A5F5] mb-6">
          關於教學法
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          「重複」和「視覺」是幼兒學習的兩大關鍵。我們的工具利用了視覺化的識字方法：通過筆順動畫病互動嘗試，以及讓這些生字在一整篇故事或對話中出現，這些一直複現的方法不但可以幫助小朋友們記住生字的字形，還能讓他們在語境中理解和應用，增加更多連結。
        </p>

        <h2 className="text-4xl font-semibold text-[#42A5F5] mb-6">
          我們的願景
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          在全球掀起AI熱潮的背景下，不同領域都在利用AI創新，其中不乏商務、交友和教育。我們希望「語動」能成為一個起點，不僅讓孩子的識字之路更順暢，還能與AI一起成長，探索這項技術帶來的無限可能。
        </p>

        <h2 className="text-4xl font-semibold text-[#42A5F5] mb-6">與我聯絡</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          主題: 糾錯或建議 / 合作提案 / 款項或退費相關 / 打個招呼
          <br />
          <a
            href="mailto:chiahuammx@gmail.com"
            className="text-[#7E57C2] underline"
          >
            chiahuammx@gmail.com
          </a>
        </p>
      </div>
      <Footer t={t}/>
    </Template>
  );
}

export const getServerSideProps = withMessages("common");
