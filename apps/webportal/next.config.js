/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  images: {
    domains: [
      'picsum.photos',
      'cloudflare-ipfs.com',
      'localhost',
      process.env['NEXT_PUBLIC_BASE_URL_HOST'],
    ],
  },
};

module.exports = nextConfig;
