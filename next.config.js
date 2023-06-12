/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://images.unsplash.com', process.env.NEXT_PUBLIC_IMG_DOMAIN],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
    ]
  }
}

module.exports = nextConfig
