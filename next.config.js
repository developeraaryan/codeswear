/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.IMG_DOMAIN]
  }
}

module.exports = nextConfig
