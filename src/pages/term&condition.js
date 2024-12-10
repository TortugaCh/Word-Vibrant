import React from "react";
import Template from "../components/Template";
import Footer from "../components/Footer";
import { withMessages } from "../lib/getMessages";
import { useTranslations } from "next-intl";
import {
  FiShield,
  FiFileText,
  FiLink,
  FiAlertTriangle,
  FiLock,
  FiInfo,
  FiCheckCircle,
  FiClock,
  FiMinusCircle,
  FiEdit,
} from "react-icons/fi";
import { FiUser, FiHeadphones, FiMail, FiSmile, FiGlobe } from "react-icons/fi";

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
              在使用本網站之前，請仔細閱讀以下條款與條件
            </p>
          </div>

          {/* Content */}
          <div className="bg-white shadow-lg rounded-3xl p-10 max-w-6xl mx-auto space-y-16">
            {/* Section 1: Ownership */}
            <section>
              <p className="text-gray-700 text-lg leading-7">
                請在使用本網站（語動）之前仔細閱讀以下使用條款與條件。這些條款與條件適用於對本網站的所有訪問和使用。一旦您訪問和使用本網站，即表示您完全同意遵守所有這些條款與條件，以及其他適用的法律或法規。如果您不同意接受這些條款與條件，請立即離開本網站。本網站上的資料均擁有相關智慧財產權及其衍生權，未經授權使用本網站的資料可能觸犯著作權法、商標法及其他法律。
              </p>
            </section>

            {/* Section 2: Disclaimer */}
            <section>
              <div className="flex items-center mb-4">
                <FiShield className="text-3xl text-[#42A5F5] mr-4" />
                <h2 className="text-3xl font-semibold text-[#42A5F5]">
                  內容所有權
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-7">
                本網站由本公司（簡稱“本公司”）擁有和運作。本網站公開或顯示的所有內容，包括但不限於文字、圖表、照片、圖像、動畫、音效、插圖及軟體（簡稱“內容”）等，均屬本公司及其許可人和/或內容供應商所有。本網站內的所有組成要素，包括但不限於整體設計及內容，均受商業外觀、著作權、道德規範、商標及其他所有相關智慧財產權的法律保護。除非依據本條款與條件或經本公司在其他協議中的聲明同意，否則本網站任何部分或組成要素或內容均不得以任何方式複製或傳播。
              </p>
            </section>

            {/* Section 3: Limitation of Liability */}
            <section>
              <div className="flex items-center mb-4">
                <FiAlertTriangle className="text-3xl text-[#7E57C2] mr-4" />
                <h2 className="text-3xl font-semibold text-[#7E57C2]">
                  責任限制
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-7">
                在法律允許的最大限度內，本網站及內容均按現狀提供，不包含任何類型的擔保，無論明示或隱含，包括但不限於品質滿意、適合特定目的及不構成侵權的隱含擔保。本網站的資訊僅以提供一般資訊為目的，不構成建議。
                本公司保留隨時暫停或撤銷整個網站或網站任何一部分的權利，而無需另行通知或承擔任何責任。本公司得不經通知隨時變更本網站上的資料與服務。本網站上的資料與服務可能過期，本公司未承諾更新本網站上的資料與服務。在法律允許的最大限度內，本公司不保證或表示網站內包含的資訊和/或程式是準確、完整或最新的；或者網站不會中斷或發生錯誤；或者本網站存在的任何缺陷一定會得到更正；或者網站或提供網站服務的伺服器不包含病毒或其他任何有害成分。在您使用本網站內的材料時，本公司不對材料的正確性、準確性、合適性、有用性、及時性、可靠性或其他方面作任何保證或表示。
                若有因可歸責於本公司之事由，本公司應立即更正或修復，並應依消費者已遭扣除之使用點數歸還點數。
              </p>
            </section>

            {/* Section 4: Security Terms */}
            <section>
              <div className="flex items-center mb-4">
                <FiLock className="text-3xl text-[#42A5F5] mr-4" />
                <h2 className="text-3xl font-semibold text-[#42A5F5]">
                  責任限制
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-7">
                您使用本網站需自行承擔風險。本公司及其附屬機構、協力廠商、執行者、董事、代理或任何參與設計、創作或交付本網站內容的其他方均不對使用或無法使用、或因使用本網站或本網站所連結之任何其他網站、或任何或全部這類網站中所含之資料或資訊或服務所導致之任何直接或間接的損失負責（無論依據擔保、合約、侵權或任何其他法律見解，亦不論是否事先告知有這類損害的可能性），包括但不限於利潤損失、資料損失或商務中斷所造成的損害。
                本公司一貫的政策是不處理或接受任何未經徵求的建議、發明、設計、機密或專利性資訊和/或其他材料，無論其是以文本、圖片、音效、軟體、資訊或其他方式構成。因此，請勿將任何此類材料在網站上張貼，或以電子郵件或其他方式發送至本公司，本公司對於這些材料不負任何責任。
                本公司保留自行決定阻截或刪除任何其認為不符合此條款與條件規定，或不受本公司歡迎的通信內容和材料的權利。禁止在本網站張貼或傳送任何非法、威脅、誹謗、破壞名譽、猥褻、色情或其他可能觸犯法律的資料。
                如果我們的服務包含第三方提供的其他網站和資源的鏈接，這些鏈接僅供您參考。此類連結不應被解釋為我們批准這些鏈接網站或您可以從這些網站獲取的資訊。我們無法控制這些網站或資源的內容。
              </p>
            </section>

            {/* Section 5: Personal Information */}
            <section>
              <div className="flex items-center mb-4">
                <FiInfo className="text-3xl text-[#7E57C2] mr-4" />
                <h2 className="text-3xl font-semibold text-[#7E57C2]">
                  法定代理人
                </h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#7E57C2]">
                <li>
                  若甲方為限制行為能力人，本契約訂定時，應經甲方之法定代理人同意，本契約方能生效。
                </li>
                <li>
                  若甲方為無行為能力人，則應由甲方之法定代理人代理訂定契約。
                </li>
                <li>
                  若違反前項約定，除民法第83條另有規定外，本契約不生效，乙方不得要求甲方之法定代理人負擔契約履行或賠償責任。
                </li>
              </ul>
            </section>

            {/* Section 6: Termination */}
            <section>
              <div className="flex items-center mb-4">
                <FiAlertTriangle className="text-3xl text-[#42A5F5] mr-4" />
                <h2 className="text-3xl font-semibold text-[#42A5F5]">
                  安全性條款
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-7">
                本公司在設計和營運技術和服務時，會考慮到使用者的保護和隱私，並盡一切努力在資料收集和使用實踐中保持透明並符合法規。本公司會以適當的商業步驟及合理的技術和程序，確保您在本公司中進行的每筆信用卡交易的安全。您可以放心地購買本公司提供的服務。我們不會讓他人看到您在我們網站上的交易情況。您的個人資料都會經由Secure
                Sockets
                Layer（SSL）加密處理，因此您的資料在網路上傳送時，不會被任意攔截或讀取。{" "}
              </p>
            </section>

            {/* Section 7: Changes to Terms */}
            {/* Section: Personal Information */}
            <section>
              <div className="flex items-center mb-6">
                <FiInfo className="text-4xl text-[#7E57C2] mr-4" />
                <h2 className="text-3xl font-semibold text-[#7E57C2]">
                  個人信息
                </h2>
              </div>
              <p className="text-gray-700 text-lg mb-4 leading-7">
                當您或您的孩子發生以下情況時，我們可能會收集您的個人資訊：
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiUser className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span className="text-gray-700 text-lg leading-7">
                    參與、存取或註冊任何服務活動、線上內容、電子報或競賽。
                  </span>
                </li>
                <li className="flex items-start">
                  <FiFileText className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span className="text-gray-700 text-lg leading-7">
                    建立線上帳戶或填寫服務上的任何其他表格。
                  </span>
                </li>
                <li className="flex items-start">
                  <FiHeadphones className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span className="text-gray-700 text-lg leading-7">
                    聯絡我們的客戶服務團隊或以任何其他方式向我們索取資訊。
                  </span>
                </li>
                <li className="flex items-start">
                  <FiMail className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span className="text-gray-700 text-lg leading-7">
                    回覆我們的通訊。
                  </span>
                </li>
                <li className="flex items-start">
                  <FiSmile className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span className="text-gray-700 text-lg leading-7">
                    參與我們的客戶滿意度調查或其他市場研究。
                  </span>
                </li>
                <li className="flex items-start">
                  <FiGlobe className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span className="text-gray-700 text-lg leading-7">
                    透過社交網站、第三方應用程式或類似技術與我們溝通。
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 text-lg mt-8 leading-7">
                當您瀏覽或使用服務時，我們還將使用cookie和類似技術收集有關您的設備及您對服務使用情況的某些信息。
              </p>
              <p className="text-gray-700 text-lg mt-4 leading-7">
                我們將註明我們要求的任何個人資訊是強制性的還是可選的。請注意，如果您決定不提供我們指示為強制性的某些信息，在某些情況下，我們可能無法為您提供某些服務或產品。
              </p>
              <p className="text-gray-700 text-lg mt-4 leading-7">
                我們也可能從第三方來源（如分包商）收集有關您的個人資訊。
              </p>
            </section>
            {/* Section: Marketing Opt-Out */}
            <section>
              <div className="flex items-center mb-6">
                <FiMail className="text-4xl text-[#7E57C2] mr-4" />
                <h2 className="text-3xl font-semibold text-[#7E57C2]">
                  退出行銷訊息
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-7 mb-4">
                如果您已訂閱接收我們的行銷訊息，或者收到我們發送的未請求的電子郵件，您可以透過以下方式選擇不再接收未來的電子郵件：
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg">
                <li className="flex items-start">
                  <FiLink className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span>點擊電子郵件中的選擇退出連結。</span>
                </li>
                <li className="flex items-start">
                  <FiMail className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span>聯繫我們的支持團隊進行退訂。</span>
                </li>
              </ul>
              <p className="text-gray-700 text-lg mt-6 leading-7">
                我們將在收到您的請求後的合理時間內處理，並確保您不再收到不必要的行銷訊息。
              </p>
            </section>
            {/* Section: Contract Termination and Refund */}
            <section>
              <div className="flex items-center mb-6">
                <FiFileText className="text-4xl text-[#7E57C2] mr-4" />
                <h2 className="text-3xl font-semibold text-[#7E57C2]">
                  終止契約與退費
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-7 mb-4">
                本網站採點數儲值制，當使用期間屆滿或所購點數使用完畢時，契約即告終止。
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg">
                <li className="flex items-start">
                  <FiCheckCircle className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span>消費者得隨時通知本公司終止契約。</span>
                </li>
                <li className="flex items-start">
                  <FiClock className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span>契約終止後，本公司應依按已提供服務比例結算。</span>
                </li>
                <li className="flex items-start">
                  <FiAlertTriangle className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span>
                    若因消費者之由所致，得向消費者收取違約金（應收取金額百分之二十）。
                  </span>
                </li>
                <li className="flex items-start">
                  <FiMinusCircle className="text-2xl text-[#42A5F5] mt-1 mr-4" />
                  <span>
                    違約金將從退費款項中扣除，若退費款項已不足百分之二十，則退費款項為零。
                  </span>
                </li>
              </ul>
            </section>
            {/* Section: How to Contact Us */}
            <section>
              <div className="flex items-center mb-6">
                <FiMail className="text-4xl text-[#7E57C2] mr-4" />
                <h2 className="text-3xl font-semibold text-[#7E57C2]">
                  如何聯繫我們
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-7">
                如對本網站或服務有任何疑問或建議，請前往
                <a
                  href="/contact-us"
                  className="text-[#42A5F5] underline hover:text-[#7E57C2] transition-all duration-300"
                >
                  聯絡我們
                </a>
                頁面與我們聯繫，我們將盡快為您服務。
              </p>
            </section>
            {/* Section: Terms Changes */}
            <section>
              <div className="flex items-center mb-6">
                <FiEdit className="text-4xl text-[#7E57C2] mr-4" />
                <h2 className="text-3xl font-semibold text-[#7E57C2]">
                  條款的更改
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-7">
                本公司保留自行決定隨時變更、修改、添加或刪除本條款與條件內容的權利。請定期查看本條款與條件，以及時瞭解有關變更。
              </p>
            </section>
          </div>
        </div>
      </Template>

      {/* Footer */}
      <Footer t={t} />
    </>
  );
}

export const getServerSideProps = withMessages("common");
