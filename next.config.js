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
    domains: ['via.placeholder.com'], // 如果您使用了外部图片域名
  },
  
  // 严格模式
  reactStrictMode: true,
  
  // 实验性功能
  experimental: {
    // 应用目录
    // appDir: true,
  },
};

module.exports = nextConfig; 