/** @type {import('next').NextConfig} */
const nextConfig = {
  // 输出模式，可以是'standalone'或'export'
  // output: 'standalone',
  
  // 图片域名白名单，用于Next.js Image组件
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  
  // 严格模式
  reactStrictMode: true,
};

module.exports = nextConfig; 