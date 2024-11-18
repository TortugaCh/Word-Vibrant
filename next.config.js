// next.config.js

const nextConfig= {
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
};

module.exports = nextConfig;
