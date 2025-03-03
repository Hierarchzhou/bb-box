'use client';

import { Suspense } from 'react';
import SearchBar from './SearchBar';

/**
 * SearchBar包装组件
 * 使用Suspense包装SearchBar，以便在服务器组件中安全使用
 */
export default function SearchBarWrapper() {
  return (
    <Suspense fallback={<div className="w-full max-w-md mx-auto mb-8 h-10 bg-matrix-black border border-matrix-green rounded-md animate-pulse"></div>}>
      <SearchBar />
    </Suspense>
  );
} 