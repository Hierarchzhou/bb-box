import Link from 'next/link';

/**
 * 404页面组件
 * 当访问不存在的页面时显示
 */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="matrix-card p-8 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold mb-6 flicker">404 - 页面不存在</h2>
        
        {/* 黑客帝国风格的错误代码 */}
        <div className="bg-matrix-black p-4 mb-6 font-mono text-left overflow-auto">
          <p className="text-matrix-green">{'>'} 正在搜索请求的页面...</p>
          <p className="text-matrix-green">{'>'} 扫描矩阵...</p>
          <p className="text-red-500">{'>'} 错误: 无法在矩阵中定位请求的节点</p>
          <p className="text-matrix-green animate-pulse">{'>'} 建议: 返回已知节点</p>
        </div>
        
        <p className="mb-6">
          您尝试访问的页面似乎已经被从矩阵中移除或从未存在过。
        </p>
        
        <div className="flex justify-center">
          {/* 返回首页链接 */}
          <Link href="/" className="matrix-button py-2 px-6">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
} 