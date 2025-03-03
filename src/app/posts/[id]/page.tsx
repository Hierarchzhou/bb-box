import { getPostData, getAllPostIds } from '@/lib/posts'; // 导入获取文章数据和ID的函数
import Link from 'next/link'; // 导入Next.js的Link组件
import { notFound } from 'next/navigation'; // 导入Next.js的notFound函数

// 定义页面参数接口
interface PostPageParams {
  params: {
    id: string; // 文章ID
  };
}

// 设置页面重新验证时间（ISR）
export const revalidate = 3600; // 每小时重新验证一次

/**
 * 生成静态页面路径
 * 返回所有可能的文章ID，用于静态生成页面
 */
export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths;
}

/**
 * 生成页面元数据
 * 根据文章ID获取文章数据，并设置页面标题和描述
 * @param {PostPageParams} params - 页面参数，包含文章ID
 */
export async function generateMetadata({ params }: PostPageParams) {
  try {
    const post = await getPostData(params.id);
    
    return {
      title: `${post.title} | Matrix Blog`, // 页面标题
      description: post.excerpt, // 页面描述
    };
  } catch (error) {
    return {
      title: '文章未找到 | Matrix Blog',
      description: '请求的文章不存在或已被移除',
    };
  }
}

/**
 * 文章详情页面组件
 * 显示单篇文章的完整内容
 * @param {PostPageParams} props - 组件属性，包含文章ID
 */
export default async function Post({ params }: PostPageParams) {
  try {
    // 获取文章数据
    const post = await getPostData(params.id);
    
    // 格式化日期
    const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回首页链接 */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
        </div>
        
        {/* 文章容器 */}
        <article className="matrix-card p-6 md:p-8">
          {/* 文章标题 */}
          <h1 className="text-3xl font-bold mb-4 flicker">{post.title}</h1>
          
          {/* 文章日期 */}
          <div className="text-sm text-matrix-darkGreen mb-8">{formattedDate}</div>
          
          {/* 文章内容 - 使用dangerouslySetInnerHTML渲染HTML内容 */}
          <div 
            className="prose prose-invert prose-green max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
          />
        </article>
      </div>
    );
  } catch (error) {
    // 如果文章不存在，返回404页面
    notFound();
  }
} 