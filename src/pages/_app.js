import "../styles/globals.css"; // Global CSS import
import Layout from "../components/Layout";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import { ConfigProvider } from "antd";
import theme from "../theme/themeConfig";
import { UserState } from "../context/UserContext";
import Head from "next/head";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import { useEffect } from "react";

const App = ({ Component, pageProps }) => {
  const { locale, push, asPath, pathname } = useRouter(); // Get router methods and current path
  const messages = pageProps.messages || {};

  // Function to change the language
  const changeLanguage = (lang) => {
    if (lang !== locale) {
      push(asPath, asPath, { locale: lang });
    }
  };

  useEffect(() => {
    // Dynamically add locale as a class to the <html> tag
    document.documentElement.lang = locale;
    document.documentElement.classList.remove("en", "zh");
    document.documentElement.classList.add(locale);
  }, [locale]);

  // Exclude Layout for specific routes like /loading
  const isStandalonePage = ["/loading"].includes(pathname);

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>
          {locale === "en"
            ? "Word Vibrant - Primary Literacy Platform"
            : "語動 - 國小識字網 | 一站式小學識字平台"}
        </title>
        <meta
          name="description"
          content={
            locale === "en"
              ? "Word Vibrant is designed for grades 1 to 6, providing interactive stroke order practice, creative character coloring sheets, and AI stories to make literacy fun and effective!"
              : "語動專為一到六年級學生和家長設計，提供互動筆順練習、生字創意著色紙、生字AI故事及對話模組，讓學習生字變得有趣且有效！"
          }
        />
        <meta
          name="keywords"
          content="國小生字, 認字寫字, 低年級功課, 小一生字, 識字策略, 南一生字, 康軒生字, 翰林生字, 國小一年級到六年級生字簿, 新北市生字詞語簿, 地方爸爸生字簿, 小學橋梁書, 認字遊戲, 自學國字"
        />
        <meta name="author" content="語動 | 國小識字網" />
        <meta
          property="og:title"
          content="語動 - 國小識字網 | 一站式小學識字平台"
        />
        <meta
          property="og:description"
          content="專為小學生設計的識字學習平台，結合生字筆順、AI故事與對話模組，打造有趣有效的學習方式！"
        />
        <meta property="og:url" content="https://wordvibrant.com.tw" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        <link rel="canonical" href="https://wordvibrant.com.tw" />
      </Head>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ConfigProvider locale={locale === "zh" ? zhCN : enUS} theme={theme}>
          <UserState>
            {isStandalonePage ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                {/* Render the component */}
                <Component {...pageProps} />
                {/* Language Switcher */}
                <div className="fixed bottom-4 right-4 flex gap-4 z-10">
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`px-4 py-2 ${
                      locale === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
                    } rounded`}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <button
                    onClick={() => changeLanguage("zh")}
                    className={`px-4 py-2 ${
                      locale === "zh" ? "bg-blue-500 text-white" : "bg-gray-200"
                    } rounded`}
                    aria-label="Switch to Chinese"
                  >
                    中文
                  </button>
                </div>
              </Layout>
            )}
          </UserState>
        </ConfigProvider>
      </NextIntlClientProvider>
    </>
  );
};

export default App;
