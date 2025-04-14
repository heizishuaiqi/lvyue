<<<<<<< HEAD
# 中国电子学会履职系统 - 管理端

## 项目说明
本项目是中国电子学会履职系统的管理端，使用 React + Vite 开发。

## 开发环境配置
1. Node.js 版本要求：>= 16.0.0
2. 包管理器：npm
3. 开发工具：VS Code（推荐）

## 项目启动步骤
1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问地址：http://localhost:5173

## 项目结构
```
lvyue-admin/
├── src/              # 源代码
│   ├── assets/       # 静态资源
│   ├── components/   # 公共组件
│   ├── layouts/      # 布局组件
│   ├── pages/        # 页面组件
│   └── services/     # API 服务
├── public/           # 公共资源
└── package.json      # 项目配置
```

## 常见问题及解决方案

### 1. React Router v6 嵌套路由配置问题
#### 问题描述
- 使用嵌套路由时页面显示空白
- 控制台报错："No routes matched location '/account'"
- 路由正确配置但组件不显示

#### 解决方案
1. 正确的路由配置方式：
```jsx
// App.jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<MainLayout />}>  {/* 父路由 */}
    <Route index element={<Navigate to="/account" replace />} />
    <Route path="account" element={<Account />} />  {/* 子路由 */}
    {/* 其他子路由 */}
  </Route>
</Routes>
```

2. 布局组件中使用 Outlet：
```jsx
// MainLayout.jsx
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main>
        <Outlet />  {/* 用于渲染子路由内容 */}
      </main>
    </div>
  );
};
```

#### 关键点
1. 不要在父路由的 element 中嵌套 `<Routes>`
2. 使用 `<Outlet />` 组件来渲染子路由内容
3. 子路由的 path 不需要写完整路径，会自动继承父路由的路径

### 2. 依赖版本问题
#### 问题描述
- 项目无法启动或运行异常
- 控制台报错显示依赖版本不兼容

#### 解决方案
1. 确保使用正确的依赖版本：
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.1"
  }
}
```

2. 版本更新步骤：
   - 删除 node_modules 目录和 package-lock.json 文件
   - 更新 package.json 中的依赖版本
   - 重新运行 npm install
   - 重启开发服务器

#### 注意事项
1. 不要使用不存在的版本号（如 react@19.0.0）
2. 保持 react 和 react-dom 版本一致
3. 使用兼容的 react-router-dom 版本

## 开发规范
1. 组件文件使用 .jsx 扩展名
2. 样式文件使用 .css 扩展名
3. 组件名使用大驼峰命名法
4. 文件夹使用小驼峰命名法

## 部署说明
// ... 其他内容 ...

## 项目技术栈

- React 18
- Vite
- React Router v6
- CSS Modules

## 功能模块

### 1. 用户认证
- 登录功能
  - 手机号/密码登录
  - 图片验证码验证
  - 登录状态保持
- 路由守卫
  - 未登录用户重定向到登录页
  - 记住访问路径
- 退出登录
  - 清除登录状态
  - 确认提示

### 2. 账号管理
- 用户列表展示
- 搜索功能
  - 按企业名称搜索
  - 按手机号搜索
- 用户操作
  - 创建用户
  - 修改用户信息
  - 删除用户
  - 重置密码
  - 禁用/启用账号
- 批量操作
  - 批量删除

### 3. 布局组件
- 主布局
  - 左侧菜单导航
  - 顶部面包屑
  - 用户信息显示
- 响应式设计

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── Captcha/        # 验证码组件
│   └── PrivateRoute/   # 路由守卫组件
├── layouts/
│   └── MainLayout/     # 主布局组件
├── pages/
│   ├── Login/          # 登录页面
│   └── Account/        # 账号管理页面
└── App.jsx             # 路由配置
```

## 开发指南

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.14.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 路由说明

- `/login` - 登录页面
- `/` - 重定向到账号管理
- `/account` - 账号管理页面
- `/meeting` - 会议管理页面（待开发）
- `/registration` - 报名管理页面（待开发）
- `/performance` - 履职统计页面（待开发）

## 状态管理

目前使用 localStorage 存储以下信息：
- `token` - 登录令牌
- `userInfo` - 用户信息（角色、手机号）

## 开发规范

1. 组件开发
   - 使用函数式组件
   - 使用 Hooks 进行状态管理
   - 组件文件使用 index.jsx 命名
   - 样式文件使用 style.css 命名

2. 路由管理
   - 使用 React Router v6
   - 受保护路由使用 PrivateRoute 组件包装
   - 路由配置集中在 App.jsx 中管理

3. 样式管理
   - 使用 CSS Modules
   - 遵循 BEM 命名规范
   - 响应式设计优先

4. 代码规范
   - 使用 ESLint 进行代码检查
   - 使用 Prettier 进行代码格式化
   - 遵循 React 最佳实践

## 待开发功能

1. 会议管理模块
2. 报名管理模块
3. 履职统计模块
4. 用户权限管理
5. 系统配置功能

## 更新日志

### v0.1.0 (2024-03-21)
- 初始化项目
- 实现登录功能
- 实现账号管理基础功能
- 添加路由守卫
- 实现退出登录功能
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

While this project uses React, Vite supports many popular JS frameworks. [See all the supported frameworks](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

## Deploy Your Own

Deploy your own Vite project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/vite-react&template=vite-react)

_Live Example: https://vite-react-example.vercel.app_

### Deploying From Your Terminal

You can deploy your new Vite project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
$ vercel
```
>>>>>>> 0964f4a35faffa21612c8a467afa50c1c2d04c10
