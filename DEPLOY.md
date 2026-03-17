# Railway 部署指南

本指南将帮助你在 Railway 上部署 KnitHub 全栈应用。

## 前置要求

- GitHub 账号
- Railway 账号（可用 GitHub 登录）

## 部署步骤

### 第一步：创建 Railway 项目

1. 访问 [Railway](https://railway.app)
2. 使用 GitHub 账号登录
3. 点击 **New Project** 创建新项目
4. 选择 **Empty Project**（空白项目）

### 第二步：添加数据库服务

在项目中添加以下服务：

#### 1. PostgreSQL

1. 点击 **Add Service** → **Database** → **PostgreSQL**
2. 服务名称：`postgres`
3. Railway 会自动创建数据库并注入 `DATABASE_URL` 环境变量

#### 2. Redis

1. 点击 **Add Service** → **Database** → **Redis**
2. 服务名称：`redis`
3. Railway 会自动注入 `REDIS_URL` 环境变量

### 第三步：部署后端

#### 1. 添加后端服务

1. 点击 **Add Service** → **GitHub Repo**
2. 选择你的 `knithub` 仓库
3. Railway 会开始部署

#### 2. 配置后端

在服务设置中：

- **Root Directory**: `apps/api`
- **Build Command**: `pnpm install && pnpm --filter @knithub/api build`
- **Start Command**: `cd apps/api && pnpm start`

#### 3. 设置环境变量

在后端服务的 **Variables** 标签中添加：

```bash
# 数据库和 Redis（自动注入，如果没注入请手动引用）
DATABASE_URL=${{postgres.DATABASE_URL}}
REDIS_URL=${{redis.REDIS_URL}}

# JWT 密钥（手动设置，建议 32 位以上随机字符串）
JWT_SECRET=your-super-secret-jwt-key-here

# 前端地址（部署前端后填入）
FRONTEND_URL=https://你的前端域名.railway.app

# Token 有效期
JWT_EXPIRES_IN=7d
```

**生成 JWT_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 4. 运行数据库迁移

后端部署成功后，需要运行数据库迁移：

1. 进入后端服务 → **Settings** → **Deploy**
2. 找到 **Custom Start Command**，临时改为：
   ```
   cd apps/api && npx prisma migrate deploy && pnpm start
   ```
3. 或者使用 Railway CLI：
   ```bash
   railway run --service api npx prisma migrate deploy
   railway run --service api pnpm prisma db seed
   ```

### 第四步：部署前端

#### 1. 添加前端服务

1. 点击 **Add Service** → **GitHub Repo**
2. 再次选择你的 `knithub` 仓库（同一仓库可多次添加）

#### 2. 配置前端

在服务设置中：

- **Root Directory**: `apps/web`
- **Build Command**: `pnpm install && pnpm build`
- **Start Command**: `npx serve -s dist -l ${PORT:-3000}`

#### 3. 设置环境变量

在前端服务的 **Variables** 标签中添加：

```bash
# 后端 API 地址（引用后端服务）
VITE_API_URL=${{api.RAILWAY_PUBLIC_DOMAIN}}

# 或者使用完整域名
VITE_API_URL=https://你的后端域名.railway.app
```

### 第五步：配置域名

#### 自动域名

Railway 会为每个服务自动生成域名：
- 前端：`https://knithub-production.up.railway.app`
- 后端：`https://knithub-api-production.up.railway.app`

#### 自定义域名（可选）

1. 进入服务 → **Settings** → **Domains**
2. 点击 **Add Custom Domain**
3. 按照提示配置 DNS

### 第六步：更新 CORS 配置

部署完成后，确保后端的 CORS 配置正确：

1. 进入后端服务 → **Variables**
2. 更新 `FRONTEND_URL` 为你的前端域名
3. Railway 会自动重新部署

## 项目结构

```
Railway 项目
├── postgres (PostgreSQL 数据库)
├── redis (Redis 缓存)
├── api (后端服务)
│   ├── Root: apps/api
│   └── Port: 3000
└── web (前端服务)
    ├── Root: apps/web
    └── Port: 3000
```

## 环境变量总览

### 后端 (apps/api)

| 变量名 | 来源 | 说明 |
|--------|------|------|
| `DATABASE_URL` | PostgreSQL 服务 | 自动注入 |
| `REDIS_URL` | Redis 服务 | 自动注入 |
| `JWT_SECRET` | 手动设置 | JWT 签名密钥 |
| `FRONTEND_URL` | 手动设置 | 前端域名 |
| `JWT_EXPIRES_IN` | 手动设置 | Token 有效期 |

### 前端 (apps/web)

| 变量名 | 来源 | 说明 |
|--------|------|------|
| `VITE_API_URL` | 手动设置 | 后端 API 地址 |

## 常见问题

### 1. 数据库迁移失败

使用 Railway CLI 运行迁移：
```bash
railway run --service api npx prisma migrate deploy
```

### 2. CORS 错误

检查后端环境变量中的 `FRONTEND_URL` 是否正确。

### 3. 构建失败

确保 `pnpm-lock.yaml` 已提交到仓库。

### 4. 服务间通信

在 Railway 中，服务间可以通过服务名访问：
- 前端调用后端：`https://api.railway.internal`（内网）
- 或使用公网域名：`https://你的后端域名.railway.app`

## 费用说明

Railway 免费额度：
- 每月 $5 免费额度
- 512MB 内存
- 1GB 磁盘空间

超出免费额度后按量付费，对于个人项目通常免费额度足够。

## 相关链接

- [Railway 文档](https://docs.railway.app/)
- [Railway CLI](https://docs.railway.app/develop/cli)
- [Nixpacks 文档](https://nixpacks.com/)
