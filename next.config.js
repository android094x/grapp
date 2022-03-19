/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.rawg.io'],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
