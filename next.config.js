// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
})

/** @type {import('next').NextConfig} */

const config = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    domains: ['media.guim.co.uk', 'static.guim.co.uk'],
  },
}

const nextConfig = withPWA(config)

module.exports = nextConfig
