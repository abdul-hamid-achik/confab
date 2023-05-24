import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: "loose",
    serverActions: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }] // required to make Konva & react-konva work
    return config
  },
}

export default nextConfig
