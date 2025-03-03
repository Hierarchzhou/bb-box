'use client'; // 声明这是一个客户端组件

import { useState, useEffect, useCallback, useTransition, useRef } from 'react'; // 导入React钩子
import { useRouter, useSearchParams } from 'next/navigation'; // 导入Next.js的路由和搜索参数钩子

/**
 * 搜索栏组件属性接口
 */
interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialValue?: string;
}

/**
 * 搜索栏组件
 * 允许用户搜索博客文章
 */
const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
  // 获取路由和搜索参数
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 从URL获取初始搜索词
  const initialQuery = searchParams.get('q') || '';
  
  // 搜索词状态
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  // 使用useTransition来优化UI响应
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 当URL中的搜索参数变化时更新搜索词
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);
  
  // 防抖搜索函数
  const debouncedSearch = useCallback(
    (value: string) => {
      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        if (value.trim()) {
          startTransition(() => {
            router.push(`/search?q=${encodeURIComponent(value.trim())}`);
          });
        } else if (window.location.pathname === '/search') {
          startTransition(() => {
            router.push('/');
          });
        }
      }, 500); // 500ms延迟
    },
    [router]
  );
  
  // 处理搜索表单提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 如果搜索词为空，导航到首页
    if (!searchQuery.trim()) {
      router.push('/');
      return;
    }
    
    // 导航到搜索结果页面
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };
  
  // 处理搜索词变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // 使用防抖函数处理搜索
    debouncedSearch(value);
  };
  
  // 处理清除搜索
  const handleClear = () => {
    setSearchQuery('');
    if (window.location.pathname === '/search') {
      router.push('/');
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto mb-8 relative">
      <div className="relative flex items-center">
        {/* 搜索图标 */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-matrix-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* 搜索输入框 */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="搜索文章..."
          className="matrix-input w-full pl-10 pr-10 py-2 bg-transparent"
          aria-label="搜索文章"
        />
        
        {/* 清除按钮，仅在有搜索词时显示 */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 top-1/2 transform -translate-y-1/2"
            aria-label="清除搜索"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-matrix-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* 搜索按钮 */}
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          aria-label="搜索"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-matrix-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* 加载状态指示器 */}
      {isPending && (
        <div className="absolute -bottom-6 left-0 right-0 text-center">
          <span className="text-xs text-matrix-green animate-pulse">正在搜索...</span>
        </div>
      )}
    </form>
  );
};

export default SearchBar; // 导出组件 