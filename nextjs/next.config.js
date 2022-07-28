/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'abs.twimg.com', 'pbs.twimg.com']
  }
}

module.exports = nextConfig
