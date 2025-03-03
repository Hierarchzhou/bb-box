import Link from 'next/link'; // 导入Next.js的Link组件，用于页面导航
import { PostMetadata } from '@/lib/posts'; // 导入文章元数据接口

/**
 * 文章卡片组件属性接口
 */
interface PostCardProps {
  post: PostMetadata; // 文章元数据
}

/**
 * 文章卡片组件
 * 在首页展示文章的预览信息，包括标题、日期和摘要
 * @param {PostCardProps} props - 组件属性
 */
const PostCard = ({ post }: PostCardProps) => {
  // 格式化日期
  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <Link href={`/posts/${post.id}`} className="block">
      <article className="matrix-card h-full transition-all duration-300 hover:scale-105">
        {/* 文章标题 */}
        <h2 className="text-xl font-bold mb-2 flicker">{post.title}</h2>
        
        {/* 文章日期 */}
        <div className="text-sm text-matrix-darkGreen mb-3">{formattedDate}</div>
        
        {/* 文章摘要 */}
        <p className="text-sm opacity-80">{post.excerpt}</p>
        
        {/* 阅读更多按钮 */}
        <div className="mt-4 text-right">
          <span className="text-sm inline-flex items-center">
            阅读更多
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
};

export default PostCard; // 导出组件 