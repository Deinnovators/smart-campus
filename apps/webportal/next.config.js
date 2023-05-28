/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  images: {
    domains: ['picsum.photos', 'cloudflare-ipfs.com', 'localhost'],
  },
};

module.exports = nextConfig;
