# KnitHub 🧶

编织爱好者的温暖社区 - 一个全栈编织项目管理与分享平台。

## 技术栈

### 前端
- React 18 + TypeScript
- Vite（构建工具）
- Tailwind CSS + Radix UI
- Zustand（状态管理）
- TanStack Query（数据获取）
- React Router v6

### 后端
- Node.js + Fastify
- TypeScript
- Prisma ORM + PostgreSQL
- Redis（缓存）
- JWT（鉴权）
- Zod（校验）

## 项目结构

```
knithub/
├── apps/
│   ├── web/          # React 前端
│   └── api/          # Fastify 后端
├── packages/
│   └── types/        # 共享类型定义
├── pnpm-workspace.yaml
└── package.json
```

## 快速开始

### 前置要求

- Node.js 18+
- pnpm 8+
- PostgreSQL 14+
- Redis 7+

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

```bash
# 后端环境变量
cp apps/api/.env.example apps/api/.env

# 前端环境变量
cp apps/web/.env.example apps/web/.env
```

编辑 `.env` 文件，配置数据库和 Redis 连接信息。

### 3. 初始化数据库

```bash
# 生成 Prisma 客户端
pnpm db:generate

# 运行数据库迁移
pnpm db:migrate

# 填充示例数据
pnpm --filter @knithub/api db:seed
```

### 4. 启动开发服务器

```bash
# 同时启动前后端
pnpm dev

# 或分别启动
pnpm dev:api   # 后端 http://localhost:3000
pnpm dev:web   # 前端 http://localhost:5173
```

## 可用脚本

```bash
# 根目录
pnpm dev          # 启动所有开发服务器
pnpm dev:web      # 仅启动前端
pnpm dev:api      # 仅启动后端
pnpm build        # 构建所有项目
pnpm lint         # 运行代码检查
pnpm typecheck    # 运行类型检查

# 数据库相关
pnpm db:migrate   # 运行数据库迁移
pnpm db:generate  # 生成 Prisma 客户端
pnpm db:studio    # 打开 Prisma Studio
```

## API 端点

| 方法 | 端点 | 描述 | 鉴权 |
|------|------|------|------|
| GET | /api/health | 健康检查 | - |
| POST | /api/auth/register | 用户注册 | - |
| POST | /api/auth/login | 用户登录 | - |
| GET | /api/users/me | 获取当前用户 | ✅ |
| GET | /api/projects | 获取项目列表 | ✅ |
| GET | /api/feed | 获取社区动态 | - |
| GET | /api/stats | 获取首页统计 | ✅ |

## 默认账号

运行 seed 后会创建以下示例账号：

- 邮箱: alice@knithub.com / 密码: password123
- 邮箱: bob@knithub.com / 密码: password123
- 邮箱: carol@knithub.com / 密码: password123

## 开发计划

- [x] 项目基础架构搭建
- [x] 用户认证系统
- [x] 首页 Dashboard
- [x] 社区动态 Feed
- [ ] 项目管理功能
- [ ] 线材库管理
- [ ] 图解库功能
- [ ] 实用工具（计算器）
- [ ] 评论和点赞系统
- [ ] 图片上传功能

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## License

MIT
