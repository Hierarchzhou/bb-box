'use client'; // 声明这是一个客户端组件

import { useState, useEffect } from 'react'; // 导入React钩子
import Link from 'next/link'; // 导入Next.js的Link组件
import { usePathname } from 'next/navigation'; // 导入Next.js的路径钩子

/**
 * 导航栏组件
 * 提供网站的主要导航功能
 */
const Navbar = () => {
  // 获取当前路径
  const pathname = usePathname();
  
  // 移动端菜单状态
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 滚动状态
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 监听滚动事件，用于导航栏样式变化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);
    
    // 初始检查
    handleScroll();
    
    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 切换移动端菜单
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // 导航链接数据
  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/search', label: '搜索' },
    { href: '/about', label: '关于' },
  ];
  
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-matrix-black bg-opacity-80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 网站Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold flicker">Matrix Blog</span>
            </Link>
          </div>
          
          {/* 桌面端导航链接 */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-300 ${
                  pathname === link.href ? 'text-white' : 'text-matrix-green hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-matrix-green focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-matrix-black bg-opacity-95 border-t border-matrix-green">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base ${
                  pathname === link.href
                    ? 'bg-matrix-green bg-opacity-20 text-white'
                    : 'text-matrix-green hover:bg-matrix-green hover:bg-opacity-10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; // 导出组件 