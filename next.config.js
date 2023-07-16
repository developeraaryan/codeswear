/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  images: {
    // unoptimized: true,
    domains: ['https://images.unsplash.com', process.env.NEXT_PUBLIC_IMG_DOMAIN, 'lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
      },
    ]
  },

}

const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["@madzadev/image-slider"]);
module.exports = withImages(withTM());

module.exports = nextConfig
