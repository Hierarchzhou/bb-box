import type { Metadata } from 'next'; // 导入Next.js的元数据类型
import '@/styles/globals.css'; // 导入全局样式
import Navbar from '@/components/Navbar'; // 导入导航栏组件
import Footer from '@/components/Footer'; // 导入页脚组件
import MatrixRain from '@/components/MatrixRain'; // 导入代码雨效果组件
import MusicPlayer from '@/components/MusicPlayer'; // 导入音乐播放器组件

// 定义网站元数据
export const metadata: Metadata = {
  title: 'Matrix Blog - 黑客帝国风格博客', // 网站标题
  description: '一个具有黑客帝国风格的个人博客网站，分享技术和知识。', // 网站描述
};

/**
 * 根布局组件
 * 包含所有页面共享的UI元素，如导航栏、页脚等
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件，即页面内容
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 代码雨背景效果 */}
        <MatrixRain />
        
        {/* 导航栏 */}
        <Navbar />
        
        {/* 主要内容区域 */}
        <main className="pt-20 pb-10 min-h-screen">
          {children}
        </main>
        
        {/* 页脚 */}
        <Footer />
        
        {/* 音乐播放器 */}
        <MusicPlayer />
      </body>
    </html>
  );
} 