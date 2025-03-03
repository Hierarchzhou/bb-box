import Link from 'next/link'; // 导入Next.js的Link组件

/**
 * 页脚组件
 * 显示网站的版权信息和链接
 */
const Footer = () => {
  // 获取当前年份
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-matrix-green mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 版权信息 */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} Matrix Blog. All rights reserved.
            </p>
          </div>
          
          {/* 页脚链接 */}
          <div className="flex space-x-6">
            <Link href="/" className="text-sm hover:text-white">
              首页
            </Link>
            <Link href="/search" className="text-sm hover:text-white">
              搜索
            </Link>
            <Link href="/about" className="text-sm hover:text-white">
              关于
            </Link>
          </div>
        </div>
        
        {/* 黑客帝国风格的装饰线 */}
        <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-matrix-green to-transparent"></div>
        
        {/* 黑客帝国风格的标语 */}
        <div className="mt-6 text-center">
          <p className="text-xs opacity-70 flicker">
            <span className="font-mono">FOLLOW THE WHITE RABBIT</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // 导出组件 