import type { Metadata } from 'next'; // 导入Next.js的元数据类型

// 定义页面元数据
export const metadata: Metadata = {
  title: '关于 | Matrix Blog', // 页面标题
  description: '了解更多关于Matrix Blog和博主的信息', // 页面描述
};

/**
 * 关于页面组件
 * 介绍博客和作者的信息
 */
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold text-center mb-8 flicker">
        关于 Matrix Blog
      </h1>
      
      {/* 内容区域 */}
      <div className="matrix-card p-6 md:p-8">
        {/* 博客介绍 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 border-b border-matrix-green pb-2">
            博客介绍
          </h2>
          <p className="mb-4">
            Matrix Blog 是一个具有黑客帝国风格的个人博客网站，旨在分享技术知识和个人见解。
            网站的设计灵感来自于经典科幻电影《黑客帝国》，采用了其标志性的绿色代码雨和黑色背景。
          </p>
          <p>
            在这个博客中，你可以找到关于编程、技术趋势、个人项目和其他有趣话题的文章。
            所有内容都以简洁明了的方式呈现，希望能为读者提供有价值的信息和启发。
          </p>
        </section>
        
        {/* 技术栈 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 border-b border-matrix-green pb-2">
            技术栈
          </h2>
          <p className="mb-4">
            本博客使用以下技术构建：
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Next.js - React框架，用于构建服务端渲染和静态生成的网站</li>
            <li>TypeScript - 类型安全的JavaScript超集</li>
            <li>Tailwind CSS - 实用优先的CSS框架</li>
            <li>Markdown - 用于编写和格式化文章内容</li>
            <li>Howler.js - 用于背景音乐播放</li>
          </ul>
        </section>
        
        {/* 关于作者 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-matrix-green pb-2">
            关于作者
          </h2>
          <p className="mb-4">
            我是一名热爱技术的开发者，喜欢探索新的技术和分享知识。
            我的专业领域包括前端开发、React生态系统和用户体验设计。
          </p>
          <p className="mb-4">
            除了编程，我还喜欢阅读科幻小说、观看电影和探索新的创意项目。
            《黑客帝国》是我最喜欢的电影之一，它不仅仅是一部优秀的科幻作品，
            更是对现实与虚拟、自由与控制等哲学问题的深刻探讨。
          </p>
          <p>
            如果你有任何问题或建议，欢迎通过社交媒体或电子邮件与我联系。
          </p>
        </section>
      </div>
    </div>
  );
} 