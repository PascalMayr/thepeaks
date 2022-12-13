// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultRuntimeCaching = require('next-pwa/cache')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp('/api/v1/search'),
      handler: 'StaleWhileRevalidate',
      cacheName: 'loadMoreCache',
    },
    {
      urlPattern: new RegExp('/api/v1/bookmarks'),
      handler: 'StaleWhileRevalidate',
      method: 'POST',
      cacheName: 'bookmarksCache',
    },
    ...defaultRuntimeCaching,
  ],
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
