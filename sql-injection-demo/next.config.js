/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Permitir que o better-sqlite3 e outras libs nativas funcionem com Next.js
    if (isServer) {
      config.externals.push('better-sqlite3');
    }
    return config;
  },
}

module.exports = nextConfig 