// import "../styles/globals.css"; // Global CSS import
// import Layout from "../components/Layout";
// import { NextIntlClientProvider } from "next-intl";
// import { useRouter } from "next/router";
// import { ConfigProvider } from "antd";
// import theme from "../theme/themeConfig"
// const App = ({ Component, pageProps }) => {
//   const { locale, push, asPath } = useRouter(); // Get router methods and current path
//   const messages = pageProps.messages || {};

//   // Function to change the language
//   const changeLanguage = (lang) => {
//     if (lang !== locale) {
//       push(asPath, asPath, { locale: lang });
//     }
//   };
//   return (
//     <NextIntlClientProvider locale={locale} messages={messages}>
//       <ConfigProvider theme={theme}>
//         <Layout>
//           {/* Render the component */}
//           <Component {...pageProps} />
//           {/* Language Switcher */}
//           <div className="fixed bottom-4 right-4 flex gap-4">
//             <button
//               onClick={() => changeLanguage("en")}
//               className="px-4 py-2 bg-gray-200 rounded"
//             >
//               EN
//             </button>
//             <button
//               onClick={() => changeLanguage("zh")}
//               className="px-4 py-2 bg-gray-200 rounded"
//             >
//               中文
//             </button>
//           </div>
//         </Layout>
//       </ConfigProvider>
//     </NextIntlClientProvider>
//   );
// };

// export default App;
import "../styles/globals.css"; // Global CSS import
import Layout from "../components/Layout";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import { ConfigProvider } from "antd";
import theme from "../theme/themeConfig";

const App = ({ Component, pageProps }) => {
  const { locale, push, asPath, pathname } = useRouter(); // Get router methods and current path
  const messages = pageProps.messages || {};

  // Function to change the language
  const changeLanguage = (lang) => {
    if (lang !== locale) {
      push(asPath, asPath, { locale: lang });
    }
  };

  // Exclude Layout for specific routes like /loading
  const isStandalonePage = ["/loading"].includes(pathname);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ConfigProvider theme={theme}>
        {isStandalonePage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            {/* Render the component */}
            <Component {...pageProps} />
            {/* Language Switcher */}
            <div className="fixed bottom-4 right-4 flex gap-4">
              <button
                onClick={() => changeLanguage("en")}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("zh")}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                中文
              </button>
            </div>
          </Layout>
        )}
      </ConfigProvider>
    </NextIntlClientProvider>
  );
};

export default App;
