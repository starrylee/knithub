你是一位全栈工程师，请根据以下架构和技术栈，为一个名为 "KnitHub" 的编织爱好者平台搭建完整的前后端服务框架，并实现首页页面。

---

## 技术栈

### 前端
- React 18 + TypeScript
- Vite（构建工具）
- Tailwind CSS + Radix UI（样式与组件）
- Zustand（本地状态管理）
- React Query / TanStack Query（服务端数据获取）
- React Router v6（路由）
- Axios（HTTP 客户端）

### 后端
- Node.js + Fastify（API 服务）
- TypeScript
- Prisma ORM + PostgreSQL（数据库）
- Redis（缓存与会话）
- JWT（鉴权）
- Zod（入参校验）
- dotenv（环境变量）

### 工程结构
Monorepo，使用 pnpm workspace，结构如下：
```
kint_hub_demo/
├── apps/
│   ├── web/          # React 前端
│   └── api/          # Fastify 后端
├── packages/
│   └── types/        # 共享类型定义
├── pnpm-workspace.yaml
└── package.json
```
---

## 后端要求

1. 初始化 Fastify 服务，注册以下插件：
   - @fastify/cors（允许前端跨域）
   - @fastify/jwt（JWT 鉴权）
   - @fastify/redis（Redis 客户端）
   - fastify-zod 或手动用 Zod 做 schema 校验

2. 数据库使用 Prisma，创建以下初始 Schema：
   - User（id, email, username, avatar, bio, createdAt）
   - Project（id, title, status, progress, userId, createdAt）
   - YarnStash（id, brand, color, weight, quantity, userId）
   - Post（id, content, imageUrl, userId, likesCount, createdAt）

3. 实现以下 REST API（首页所需）：
   - GET  /api/health                    — 健康检查
   - POST /api/auth/register             — 注册
   - POST /api/auth/login                — 登录，返回 JWT
   - GET  /api/users/me                  — 获取当前用户（需鉴权）
   - GET  /api/feed?page=1&limit=12      — 社区动态（作品展示）
   - GET  /api/projects?status=active    — 我的进行中项目
   - GET  /api/stats                     — 首页统计（项目数/线材数/作品数）

4. 错误处理：统一返回 { success, data, error } 结构

---

## 前端要求

1. 路由结构：
   - /              首页（已登录：个人 Dashboard；未登录：Landing Page）
   - /explore       社区探索
   - /projects      我的项目
   - /stash         线材库
   - /tools         实用工具
   - /login         登录
   - /register      注册

2. 首页（Landing Page，未登录状态）需包含：
   - 顶部 Navbar：Logo + 导航链接 + 登录/注册按钮
   - Hero 区域：标语、副标题、两个 CTA 按钮（"开始使用" / "浏览作品"）
   - 功能特色区：用卡片展示项目管理、图解库、线材管理、社区分享、实用工具五大功能
   - 社区展示区：展示 6 张示例作品卡（调用 /api/feed 接口，未登录时展示公开内容）
   - 底部 Footer

3. 首页（Dashboard，已登录状态）需包含：
   - 顶部 Navbar：Logo + 导航 + 用户头像下拉菜单
   - 统计卡片行：进行中项目数 / 线材库存数 / 已完成作品数（调用 /api/stats）
   - 进行中的项目列表（调用 /api/projects?status=active，展示最多 4 个，含进度条）
   - 社区动态 Feed（调用 /api/feed，瀑布流或 Grid 布局）
   - 快捷入口：新建项目 / 添加线材 / 打开工具

4. 视觉设计风格：
   - 主色调：温暖的米白色背景 (#FAF7F2)，搭配深茶色文字 (#3D2B1F)
   - 强调色：珊瑚粉 (#E8735A) 用于按钮和高亮
   - 卡片圆角 12px，阴影柔和
   - 字体：标题使用 Playfair Display，正文使用 Inter
   - 整体风格温暖、手工感、有质感

5. 状态管理：
   - useAuthStore（Zustand）：存储 user、token、isLoggedIn，持久化到 localStorage
   - 所有 API 请求通过 Axios instance 统一添加 Authorization header

---

## 其他要求

- 前端开发服务器运行在 http://localhost:5173
- 后端 API 服务运行在 http://localhost:8000
- 提供完整的 .env.example 文件（前端和后端各一份）
- 提供 README.md，说明如何从零启动项目（pnpm install → prisma migrate → dev）
- 所有代码使用 TypeScript 严格模式，不允许 any
- 共享 types 包中定义前后端通用的接口类型（User, Project, Post, ApiResponse 等）

请按以下顺序输出：
1. 完整目录结构（tree 格式）
2. 根目录配置文件（pnpm-workspace.yaml, 根 package.json, tsconfig.base.json）
3. packages/types 全部文件
4. apps/api 全部文件（按 src/plugins → src/models → src/routes → src/index.ts 顺序）
5. apps/web 全部文件（按 src/lib → src/store → src/components → src/pages → src/App.tsx → src/main.tsx 顺序）
6. 各应用的 .env.example 和 README.md
