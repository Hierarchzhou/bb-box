# Matrix Blog - 黑客帝国风格博客

一个具有黑客帝国风格的个人博客网站，使用Next.js框架构建。

![Matrix Blog](https://via.placeholder.com/800x400?text=Matrix+Blog)

## 功能特点

- 🎨 黑客帝国风格的UI设计，包括代码雨效果和绿色主题
- 📝 从Markdown文件中读取和展示博客文章
- 🔍 文章搜索功能
- 🎵 背景音乐播放器
- 📱 响应式设计，适配各种设备
- 👤 个人名片展示

## 技术栈

- [Next.js](https://nextjs.org/) - React框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript超集
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - 解析Markdown文件的前置元数据
- [remark](https://github.com/remarkjs/remark) - Markdown处理器
- [Howler.js](https://howlerjs.com/) - 音频库

## 安装和运行

### 前提条件

- Node.js 18.0.0 或更高版本
- npm 或 yarn

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/matrix-blog.git
cd matrix-blog
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 运行开发服务器

```bash
npm run dev
# 或
yarn dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 添加新文章

1. 在 `src/posts/content` 目录下创建新的 Markdown 文件
2. 文件开头添加前置元数据，格式如下：

```markdown
---
title: "文章标题"
date: "YYYY-MM-DD"
excerpt: "文章摘要"
---

# 文章内容

这里是文章的正文内容...
```

## 项目结构

```
matrix-blog/
├── public/              # 静态资源
│   ├── images/          # 图片资源
│   └── music/           # 音乐文件
├── src/                 # 源代码
│   ├── app/             # Next.js App Router
│   │   ├── about/       # 关于页面
│   │   ├── posts/       # 文章详情页面
│   │   ├── search/      # 搜索页面
│   │   ├── layout.tsx   # 根布局组件
│   │   └── page.tsx     # 首页组件
│   ├── components/      # React组件
│   │   ├── Footer.tsx   # 页脚组件
│   │   ├── MatrixRain.tsx # 代码雨效果组件
│   │   ├── MusicPlayer.tsx # 音乐播放器组件
│   │   ├── Navbar.tsx   # 导航栏组件
│   │   ├── PostCard.tsx # 文章卡片组件
│   │   ├── ProfileCard.tsx # 个人名片组件
│   │   └── SearchBar.tsx # 搜索栏组件
│   ├── lib/             # 工具函数
│   │   └── posts.ts     # 文章处理函数
│   ├── posts/           # 博客文章
│   │   └── content/     # Markdown文章
│   └── styles/          # 样式文件
│       └── globals.css  # 全局样式
├── .gitignore           # Git忽略文件
├── next.config.js       # Next.js配置
├── package.json         # 项目依赖
├── postcss.config.js    # PostCSS配置
├── README.md            # 项目说明
├── tailwind.config.js   # Tailwind CSS配置
└── tsconfig.json        # TypeScript配置
```

## 自定义

### 修改个人信息

编辑 `src/components/ProfileCard.tsx` 文件，更新个人信息。

### 更换背景音乐

1. 将新的音乐文件放在 `public/music/` 目录下
2. 编辑 `src/components/MusicPlayer.tsx` 文件，更新音乐文件路径

### 修改样式

编辑 `src/styles/globals.css` 和 `tailwind.config.js` 文件，自定义网站样式。

## 许可证

MIT 