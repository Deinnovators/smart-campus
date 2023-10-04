/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  images: {
    domains: [
      'picsum.photos',
      'cloudflare-ipfs.com',
      'localhost',
      '66.29.130.137',
    ],
  },
};

module.exports = nextConfig;
