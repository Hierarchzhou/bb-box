import { NextResponse } from 'next/server';

/**
 * GET 请求处理函数
 * 返回一个简单的JSON响应，用于测试API是否正常工作
 */
export async function GET() {
  return NextResponse.json({ 
    message: 'Hello from Matrix Blog API!',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
} 