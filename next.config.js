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
    defaultLocale: "en",
    locales: ["en", "zh"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: true,
  },
});

module.exports = nextConfig;
