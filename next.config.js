module.exports = {
  env: {
    npm_package_version: process.env.npm_package_version,
    base_autotrader_api: process.env.base_autotrader_api,
    autotrader_key: process.env.autotrader_key,
    autotrader_secret: process.env.autotrader_secret,
    GOOGLE_TAG: process.env.GOOGLE_TAG,
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
    base_web_api: process.env.base_web_api
  },
  async redirects() {
    return [
      {
        source: "/agent",
        permanent: false,
        destination: "/?isAgent=true",
      },
    ];
  },
};
