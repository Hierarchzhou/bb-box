'use server'; // 声明这是服务器端代码

import fs from 'fs'; // 导入文件系统模块，用于读取文件
import path from 'path'; // 导入路径模块，用于处理文件路径
import matter from 'gray-matter'; // 导入gray-matter，用于解析Markdown文件的前置元数据
import { remark } from 'remark'; // 导入remark，用于处理Markdown
import html from 'remark-html'; // 导入remark-html，用于将Markdown转换为HTML

// 定义文章目录路径
const postsDirectory = path.join(process.cwd(), 'src/posts/content');

// 定义文章元数据接口
export interface PostMetadata {
  id: string; // 文章ID
  title: string; // 文章标题
  date: string; // 文章日期
  excerpt: string; // 文章摘要
}

// 定义完整文章接口
export interface Post extends PostMetadata {
  contentHtml: string; // 文章HTML内容
}

/**
 * 获取所有文章的元数据
 * @returns 所有文章的元数据数组，按日期降序排序
 */
export async function getSortedPostsData(): Promise<PostMetadata[]> {
  // 获取posts目录下的所有文件名
  const fileNames = fs.readdirSync(postsDirectory);
  
  // 获取所有文章的数据
  const allPostsData = fileNames.map((fileName) => {
    // 从文件名中移除".md"后缀，作为文章ID
    const id = fileName.replace(/\.md$/, '');

    // 读取Markdown文件内容
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用gray-matter解析文章的元数据部分
    const matterResult = matter(fileContents);

    // 合并数据
    return {
      id,
      ...(matterResult.data as { title: string; date: string; excerpt: string }),
    };
  });

  // 按日期降序排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * 获取所有文章的ID
 * @returns 所有文章ID的数组
 */
export async function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

/**
 * 根据ID获取文章数据
 * @param id 文章ID
 * @returns 包含文章数据和HTML内容的对象
 */
export async function getPostData(id: string): Promise<Post> {
  // 构建文章的完整路径
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // 读取文章内容
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 使用gray-matter解析文章的元数据和内容
  const matterResult = matter(fileContents);

  // 使用remark将Markdown转换为HTML字符串
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 合并数据并返回
  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; excerpt: string }),
  };
}

/**
 * 搜索文章
 * @param query 搜索关键词
 * @returns 匹配的文章元数据数组
 */
export async function searchPosts(query: string): Promise<PostMetadata[]> {
  // 获取所有文章数据
  const allPosts = await getSortedPostsData();
  
  // 如果没有查询词，返回所有文章
  if (!query) {
    return allPosts;
  }
  
  // 将查询词转为小写，用于不区分大小写的搜索
  const lowerCaseQuery = query.toLowerCase();
  
  // 过滤匹配的文章
  return allPosts.filter((post) => {
    // 在标题、摘要中搜索关键词
    return (
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      post.excerpt.toLowerCase().includes(lowerCaseQuery)
    );
  });
} 