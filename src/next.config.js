const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,

  allowedDevOrigins: [
    "192.168.1.161",
  ],
};

module.exports = nextConfig;