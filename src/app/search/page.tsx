'use client'; // 声明这是一个客户端组件

import { useState, useEffect, useCallback, useTransition } from 'react'; // 导入React钩子
import { useSearchParams, useRouter } from 'next/navigation'; // 导入Next.js的搜索参数和路由钩子
import { searchPosts } from '@/lib/posts'; // 导入搜索文章的函数
import SearchBar from '@/components/SearchBar'; // 导入搜索栏组件
import PostCard from '@/components/PostCard'; // 导入文章卡片组件
import { PostMetadata } from '@/lib/posts'; // 导入文章元数据接口

/**
 * 搜索结果骨架屏组件
 */
function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="matrix-card h-64 animate-pulse">
          <div className="h-6 bg-matrix-green bg-opacity-20 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-matrix-green bg-opacity-10 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-matrix-green bg-opacity-10 rounded w-full mb-2"></div>
          <div className="h-4 bg-matrix-green bg-opacity-10 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-matrix-green bg-opacity-10 rounded w-4/6 mb-6"></div>
          <div className="flex justify-end">
            <div className="h-4 bg-matrix-green bg-opacity-20 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 搜索页面组件
 * 允许用户搜索文章并显示搜索结果
 */
export default function SearchPage() {
  // 获取URL中的搜索参数和路由
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  // 搜索结果状态
  const [searchResults, setSearchResults] = useState<PostMetadata[]>([]);
  // 是否已搜索状态
  const [hasSearched, setHasSearched] = useState(false);
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 错误状态
  const [error, setError] = useState<string | null>(null);
  // 使用useTransition来优化UI响应
  const [isPending, startTransition] = useTransition();
  
  // 防抖搜索函数
  const debouncedSearch = useCallback(
    (searchTerm: string) => {
      let timeoutId: NodeJS.Timeout;
      
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (searchTerm.trim()) {
            startTransition(() => {
              router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            });
          }
        }, 300); // 300ms延迟
      };
    },
    [router]
  );
  
  // 当搜索参数变化时执行搜索
  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setIsLoading(true);
        setError(null);
        try {
          const results = await searchPosts(query);
          setSearchResults(results);
          setHasSearched(true);
        } catch (error) {
          console.error('搜索出错:', error);
          setError('搜索过程中发生错误，请稍后再试。');
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setHasSearched(false);
        setError(null);
      }
    };
    
    fetchResults();
  }, [query]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold text-center mb-8 flicker">
        搜索文章
      </h1>
      
      {/* 搜索栏 */}
      <SearchBar />
      
      {/* 搜索结果区域 */}
      <div className="mt-10">
        {/* 加载中状态 */}
        {isLoading && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-6 border-b border-matrix-green pb-2">
              正在搜索 "{query}"...
            </h2>
            <SearchResultsSkeleton />
          </div>
        )}
        
        {/* 错误状态 */}
        {error && !isLoading && (
          <div className="text-center py-10 matrix-card">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-sm text-matrix-darkGreen">
              请检查您的网络连接或稍后再试
            </p>
          </div>
        )}
        
        {/* 搜索结果标题 */}
        {!isLoading && !error && hasSearched && (
          <h2 className="text-2xl font-bold mb-6 border-b border-matrix-green pb-2">
            {query ? `"${query}" 的搜索结果` : '所有文章'}
            <span className="text-sm font-normal ml-2">
              (找到 {searchResults.length} 篇文章)
            </span>
          </h2>
        )}
        
        {/* 搜索结果列表 */}
        {!isLoading && !error && hasSearched && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        
        {/* 无搜索结果提示 */}
        {!isLoading && !error && hasSearched && searchResults.length === 0 && (
          <div className="text-center py-10 matrix-card">
            <p className="mb-4">没有找到与 "{query}" 相关的文章</p>
            <p className="text-sm text-matrix-darkGreen">
              尝试使用不同的关键词，或者浏览我们的所有文章
            </p>
          </div>
        )}
        
        {/* 未搜索时的提示 */}
        {!isLoading && !error && !hasSearched && (
          <div className="text-center py-10 matrix-card">
            <p className="mb-4">输入关键词搜索文章</p>
            <p className="text-sm text-matrix-darkGreen">
              你可以搜索文章标题或摘要中的关键词
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 