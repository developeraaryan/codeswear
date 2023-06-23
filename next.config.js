/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://images.unsplash.com', process.env.NEXT_PUBLIC_IMG_DOMAIN, 'lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
    ]
  },
  experimental: {
    optimizeCss: true,
    css: false,
  }
}

const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["@madzadev/image-slider"]);
module.exports = withImages(withTM());

module.exports = nextConfig
