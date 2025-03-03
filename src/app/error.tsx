'use client'; // 错误组件必须是客户端组件

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * 错误边界组件属性接口
 */
interface ErrorProps {
  error: Error & { digest?: string }; // 错误对象
  reset: () => void; // 重置函数，尝试重新渲染
}

/**
 * 错误边界组件
 * 当应用中发生未捕获的错误时显示
 * @param {ErrorProps} props - 组件属性
 */
export default function Error({ error, reset }: ErrorProps) {
  // 记录错误到控制台
  useEffect(() => {
    console.error('应用错误:', error);
  }, [error]);
  
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="matrix-card p-8 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold mb-6 flicker">系统故障</h2>
        
        {/* 黑客帝国风格的错误代码 */}
        <div className="bg-matrix-black p-4 mb-6 font-mono text-left overflow-auto max-h-40">
          <p className="text-red-500">ERROR: {error.message || '发生了未知错误'}</p>
          {error.digest && (
            <p className="text-matrix-green text-sm mt-2">错误ID: {error.digest}</p>
          )}
          <p className="text-matrix-green text-sm mt-2 animate-pulse">
            {'> '}系统正在重新校准...
          </p>
        </div>
        
        <p className="mb-6">
          看起来矩阵中出现了一些故障。请尝试重新加载页面或返回首页。
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* 重试按钮 */}
          <button
            onClick={reset}
            className="matrix-button py-2 px-6"
          >
            重新加载
          </button>
          
          {/* 返回首页链接 */}
          <Link href="/" className="matrix-button py-2 px-6">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
} 