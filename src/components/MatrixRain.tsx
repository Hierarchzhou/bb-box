'use client'; // 声明这是一个客户端组件

import { useEffect, useRef } from 'react'; // 导入React钩子

/**
 * 黑客帝国代码雨效果组件
 * 创建一个全屏的代码雨动画背景
 */
const MatrixRain = () => {
  // 使用useRef获取canvas元素引用
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // 获取canvas元素
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 获取2D绘图上下文
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置canvas尺寸为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // 初始调整尺寸
    resizeCanvas();
    
    // 监听窗口大小变化
    window.addEventListener('resize', resizeCanvas);
    
    // 字符集：包含数字、字母和一些特殊字符
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    
    // 字体大小
    const fontSize = 14;
    
    // 计算列数
    const columns = Math.floor(canvas.width / fontSize);
    
    // 每列的当前位置
    const drops: number[] = [];
    
    // 初始化每列的位置
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100); // 随机起始位置，负值使其从顶部开始
    }
    
    // 绘制代码雨
    const draw = () => {
      // 设置半透明黑色背景，形成拖尾效果
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 设置字体
      ctx.font = `${fontSize}px monospace`;
      
      // 遍历每一列
      for (let i = 0; i < drops.length; i++) {
        // 随机选择一个字符
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // 设置渐变颜色，头部亮一些
        const gradient = ctx.createLinearGradient(0, drops[i] * fontSize, 0, drops[i] * fontSize + fontSize * 5);
        gradient.addColorStop(0, '#FFFFFF'); // 头部白色
        gradient.addColorStop(0.2, '#00FF41'); // 中部亮绿色
        gradient.addColorStop(1, '#008F11'); // 尾部暗绿色
        
        ctx.fillStyle = gradient;
        
        // 绘制字符
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // 更新位置
        drops[i]++;
        
        // 如果到达底部或随机重置，则重新从顶部开始
        if (drops[i] * fontSize > canvas.height || Math.random() > 0.98) {
          drops[i] = 0;
        }
      }
    };
    
    // 设置动画循环
    const animationId = setInterval(draw, 33); // 约30fps
    
    // 清理函数
    return () => {
      clearInterval(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }} // 确保不会干扰用户交互
    />
  );
};

export default MatrixRain; // 导出组件 