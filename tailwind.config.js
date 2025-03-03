/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          green: '#00FF41', // 黑客帝国绿色
          darkGreen: '#008F11', // 深绿色
          black: '#0D0208', // 黑客帝国黑色
          gray: '#2E2E2E', // 灰色背景
        },
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'], // 等宽字体，适合黑客帝国风格
      },
      animation: {
        'matrix-rain': 'matrix-rain 2s linear infinite', // 代码雨动画
        'flicker': 'flicker 0.5s linear infinite', // 闪烁效果
      },
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
} 