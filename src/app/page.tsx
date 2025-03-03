import { getSortedPostsData } from '@/lib/posts'; // 导入获取文章数据的函数
import ProfileCard from '@/components/ProfileCard'; // 导入个人名片组件
import PostCard from '@/components/PostCard'; // 导入文章卡片组件
import SearchBarWrapper from '@/components/SearchBarWrapper';
import { Suspense } from 'react'; // 导入React的Suspense组件

// 设置页面重新验证时间（ISR）
export const revalidate = 3600; // 每小时重新验证一次

// 文章列表加载骨架屏组件
function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="matrix-card h-64 animate-pulse">
          <div className="h-6 bg-matrix-green bg-opacity-20 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-matrix-green bg-opacity-10 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-matrix-green bg-opacity-10 rounded w-full mb-2"></div>
          <div className="h-4 bg-matrix-green bg-opacity-10 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-matrix-green bg-opacity-10 rounded w-4/6"></div>
        </div>
      ))}
    </div>
  );
}

// 文章列表组件
async function PostsList() {
  // 获取所有文章数据，按日期排序
  const allPosts = await getSortedPostsData();
  
  if (allPosts.length === 0) {
    return (
      <p className="text-center py-10">
        暂无文章。请稍后再来查看。
      </p>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// 客户端组件，用于使用 useSearchParams
function HomeContent() {
  // 这里使用 useSearchParams 的逻辑
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PostsList />
    </div>
  );
}

/**
 * 首页组件
 * 展示个人名片和所有文章的列表
 */
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold text-center mb-8 flicker">
        欢迎来到 Matrix Blog
      </h1>
      
      {/* 搜索栏 */}
      <SearchBarWrapper />
      
      {/* 内容区域 - 使用网格布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 左侧 - 个人名片 */}
        <div className="lg:col-span-1">
          <ProfileCard />
        </div>
        
        {/* 右侧 - 文章列表 */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6 border-b border-matrix-green pb-2">
            最新文章
          </h2>
          
          {/* 使用Suspense包装文章列表，提供加载状态 */}
          <Suspense fallback={<PostsSkeleton />}>
            <PostsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 