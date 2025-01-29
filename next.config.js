// next.config.js

const withTM = require("next-transpile-modules")([
  "rc-util","rc-pagination","rc-picker","@ant-design/icons","@ant-design/icons-svg","rc-tree","rc-table","rc-input"
]);
const nextConfig= withTM({
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve("stream-browserify"),
    };
    return config;
  },
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    localeDetection: false

  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all pages
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
});

module.exports = nextConfig;
