import React from "react";
import Template from "../components/Template";
import Footer from "../components/Footer";
import { withMessages } from "../lib/getMessages";
import { useTranslations } from "next-intl";
import {
  FiShield,
  FiInfo,
  FiFileText,
  FiAlertTriangle,
  FiLock,
  FiCheckCircle,
  FiClock,
  FiMinusCircle,
  FiUser,
  FiEdit,
  FiMail,
  FiSmile,
  FiLink,
} from "react-icons/fi";

export default function TermsAndConditions() {
  const t = useTranslations("common");

  return (
    <>
      <Template t={t}>
        <div className="container mx-auto px-6 py-16">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#7E57C2]">條款與條件</h1>
            <p className="text-gray-600 mt-4 text-lg">
              請在使用本網站之前，仔細閱讀以下條款與條件
            </p>
          </div>

          {/* Full Content */}
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Introduction */}
            <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-purple-100">
              <p className="text-gray-700 text-lg leading-relaxed">
                請在使用本網站（語動）之前仔細閱讀以下使用條款與條件。這些條款與條件適用於對本網站的所有訪問和使用。一旦您訪問和使用本網站，即表示您完全同意遵守所有這些條款與條件，以及其他適用的法律或法規。如果您不同意接受這些條款與條件，請立即離開本網站。本網站上的資料均擁有相關智慧財產權及其衍生權，未經授權使用本網站的資料可能觸犯著作權法、商標法及其他法律。
              </p>
            </section>

            {/* Ownership Section */}
            <section className="bg-white rounded-3xl p-8 shadow-lg border border-indigo-50">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-50 rounded-2xl mr-4">
                  <FiShield className="w-7 h-7 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-indigo-600">
                  內容所有權
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                本網站由本公司（簡稱“本公司”）擁有和運作。本網站公開或顯示的所有內容，包括但不限於文字、圖表、照片、圖像、動畫、音效、插圖及軟體，均屬本公司及其許可人所有。本網站內的所有組成要素，包括但不限於整體設計及內容，均受商業外觀、著作權、道德規範、商標及其他所有相關智慧財產權的法律保護。
              </p>
            </section>

            {/* Disclaimer Section */}
            <section className="bg-white rounded-3xl p-8 shadow-lg border border-purple-50">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-50 rounded-2xl mr-4">
                  <FiInfo className="w-7 h-7 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-purple-600">免責聲明</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                在法律允許的最大限度內，本網站及內容均按現狀提供，不包含任何類型的擔保。本公司保留隨時暫停或變更本網站資料與服務的權利。
              </p>
            </section>

            {/* Liability Limitation Section */}
            <section className="bg-white rounded-3xl p-8 shadow-lg border border-indigo-50">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-50 rounded-2xl mr-4">
                  <FiAlertTriangle className="w-7 h-7 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-indigo-600">責任限制</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                您使用本網站需自行承擔風險。本公司及其附屬機構均不對因使用本網站所導致的任何損失負責，包括但不限於利潤損失、資料損失或商務中斷所造成的損害。
              </p>
            </section>

            {/* Legal Guardians Section */}
            <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white rounded-2xl mr-4">
                  <FiUser className="w-7 h-7 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-indigo-600">
                  法定代理人
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                若甲方為限制行為能力人，契約應經法定代理人同意方能生效，否則不具法律效力。
              </p>
            </section>

            {/* Security Section */}
            <section className="bg-white rounded-3xl p-8 shadow-lg border border-purple-50">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-50 rounded-2xl mr-4">
                  <FiLock className="w-7 h-7 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-purple-600">
                  安全性條款
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                我們採用SSL加密保護您的資料傳輸，並確保您的個人資訊和交易安全。
              </p>
            </section>

            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-indigo-100 transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-indigo-100 rounded-full shadow-lg">
                  <FiUser className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="ml-4 text-3xl font-bold text-indigo-700">
                  個人信息
                </h2>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <ul className="space-y-4 text-gray-700 leading-relaxed">
                  <li className="flex items-start">
                    <span className="bg-indigo-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiFileText className="w-5 h-5" />
                    </span>
                    參與、存取或註冊任何服務活動
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiUser className="w-5 h-5" />
                    </span>
                    建立線上帳戶或填寫服務上的任何表格
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiMail className="w-5 h-5" />
                    </span>
                    聯絡我們的客戶服務團隊
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiEdit className="w-5 h-5" />
                    </span>
                    回覆我們的通訊
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiSmile className="w-5 h-5" />
                    </span>
                    參與客戶滿意度調查或其他市場研究
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiLink className="w-5 h-5" />
                    </span>
                    透過社交網站與我們溝通
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-xl border border-purple-100 transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-purple-100 rounded-full shadow-lg">
                  <FiFileText className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="ml-4 text-3xl font-bold text-purple-700">
                  終止契約與退費
                </h2>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <ul className="list-none space-y-4 text-gray-700 leading-relaxed">
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiCheckCircle className="w-5 h-5" />
                    </span>
                    消費者可隨時通知本公司終止契約
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiClock className="w-5 h-5" />
                    </span>
                    按比例結算退費金額
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiAlertTriangle className="w-5 h-5" />
                    </span>
                    可能收取20%違約金
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gray-500 text-white p-2 rounded-full mr-4 shadow-md">
                      <FiMinusCircle className="w-5 h-5" />
                    </span>
                    從退費中扣除違約金
                  </li>
                </ul>
              </div>
            </section>

            {/* Terms Changes Section */}
            <section className="bg-white rounded-3xl p-8 shadow-lg border border-indigo-50">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-50 rounded-2xl mr-4">
                  <FiEdit className="w-7 h-7 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-indigo-600">
                  條款的更改
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                本公司保留自行決定隨時變更、修改、添加或刪除本條款與條件內容的權利。請定期查看本條款與條件。
              </p>
            </section>
          </div>
        </div>
      </Template>
      <Footer t={t} />
    </>
  );
}

export const getServerSideProps = withMessages("common");
