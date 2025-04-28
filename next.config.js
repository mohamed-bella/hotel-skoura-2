/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'cdn.jsdelivr.net', 'images.unsplash.com'],
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    forceSwcTransforms: true,
    esmExternals: false
  }
}

module.exports = nextConfig