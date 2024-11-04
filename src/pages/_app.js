// src/pages/_app.js
import "../styles/globals.css"; // This is the only place where global CSS should be imported
import Layout from "./index";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
