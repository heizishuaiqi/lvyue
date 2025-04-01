# 中国电子学会履职系统

## 1. 项目概述

### 1.1 项目背景
中国电子学会每年举办一次理事级年度工作会及数次小型会议。年度工作会可参加角色包括：理事、常务理事、监事、分支机构负责人及地方学会负责人。小型会议仅限180位理事参加。为提高理事会议出席率，降低报名门槛，开发本履职系统。

### 1.2 系统架构
- 管理端（Web）：admin.snaptoidphoto.online
- 移动端（WAP）：wap.snaptoidphoto.online
- 数据库：Supabase
- 部署平台：Vercel

### 1.3 技术栈
- 前端：HTML5 + CSS3 + 原生 JavaScript
- 数据库：Supabase（PostgreSQL）
- 部署：Vercel

## 2. 用户角色

### 2.1 移动端用户
- 理事
- 常务理事
- 监事
- 分支机构负责人
- 地方学会负责人

### 2.2 管理端用户
- 学会管理员

## 3. 功能模块

### 3.1 管理端功能

#### 3.1.1 账号管理
- 账号列表展示
  - 支持分页
  - 支持手机号和姓名搜索
  - 字段：姓名、手机号码、学会职务、工作单位、工作职务、最后登录时间、操作
- 账号创建
  - 字段：姓名、手机号码、密码、确认密码、学会职务、工作单位、工作职务
- 账号导入/导出
- 账号编辑
- 账号删除（软删除）
- 密码修改

#### 3.1.2 会议管理
- 会议列表
  - 支持分页
  - 支持会议名称搜索
  - 支持会议时间筛选
  - 字段：会议类型、会议形式、会议名称、会议时间、会议地点、更新时间、操作
- 会议创建
  - 字段：会议类型、会议形式、会议名称、会议时间、会议地点
- 会议导入
- 会议编辑
- 会议删除
- 会议报名开关控制

#### 3.1.3 报名信息管理
- 报名列表
  - 支持分页
  - 支持会议切换
  - 支持手机号和姓名搜索
  - 字段：姓名、手机号码、出席类型、学会职务、工作单位、工作职务、被委托人信息、审核状态、备注、操作
- 报名信息导出
- 报名信息审核

#### 3.1.4 履职统计
- 履职列表
  - 支持分页
  - 支持时间筛选
  - 支持姓名和手机号搜索
  - 支持会议类型排序
  - 字段：姓名、手机号码、学会职务、工作单位、工作职务、各类会议次数、操作
- 数据导出
- 详情查看

### 3.2 移动端功能

#### 3.2.1 会议报名
- 扫码进入报名页面
- 身份选择
- 报名信息填写
  - 基础信息：姓名、手机号码、工作单位、工作职务
  - 委托信息（仅理事、常务理事、监事可选）：被委托人姓名、单位、职务、手机号码
- 信息校验
  - 身份验证
  - 重复报名检查
- 报名信息修改

#### 3.2.2 履职统计
- 登录功能
  - 手机验证码登录
  - 账号密码登录
- 履职统计展示
  - 时间筛选（默认2024年5月-至今）
  - 身份相关会议统计
    - 理事：理事会议次数、学术会议次数
    - 常务理事：常务理事会议次数、理事会议次数、学术会议次数
- 出席会议详情列表

## 4. 数据库设计

### 4.1 用户表（users）
```sql
- id: uuid
- name: string
- phone: string
- password: string
- role: enum('理事','常务理事','监事','分支机构负责人','地方学会负责人')
- work_unit: string
- work_position: string
- created_at: timestamp
- updated_at: timestamp
- is_deleted: boolean
```

### 4.2 会议表（meetings）
```sql
- id: uuid
- type: enum('理事会议','常务理事会议','学术会议')
- form: enum('线下会议','线上会议')
- name: string
- start_time: timestamp
- end_time: timestamp
- location: string
- qr_code: string
- is_registration_open: boolean
- created_at: timestamp
- updated_at: timestamp
```

### 4.3 报名表（registrations）
```sql
- id: uuid
- meeting_id: uuid
- user_id: uuid
- attend_type: enum('本人出席','委托代表出席')
- delegate_name: string
- delegate_phone: string
- delegate_unit: string
- delegate_position: string
- status: enum('待审核','已通过','已拒绝')
- created_at: timestamp
- updated_at: timestamp
```

### 4.4 操作日志表（operation_logs）
```sql
- id: uuid
- user_id: uuid
- action: string
- target: string
- created_at: timestamp
```

## 5. 页面设计规范

### 5.1 设计风格
- 参考苹果设计风格
- 主色调：白色背景
- 强调色：苹果蓝（#4086FF）
- 文字颜色：深灰（#333333）
- 次要文字：中灰（#666666）
- 圆角：8px-12px
- 简洁阴影效果
- 平滑过渡动画

### 5.2 布局结构
- 移动端：单列布局，底部导航
- 管理端：左侧菜单，顶部导航
  - 左侧菜单：
    - 宽度：240px
    - 背景色：深色主题（#001529）
    - 固定定位，高度100vh
    - 菜单项悬停效果：背景色变为蓝色（#1890ff）
  - 顶部导航：
    - 高度：64px
    - 背景色：白色
    - 固定定位，宽度自适应
  - 内容区域：
    - 左侧边距：240px（与菜单宽度相同）
    - 背景色：浅灰（#F5F7FA）
    - 内边距：顶部88px（导航栏高度+间距），左右24px
    - 最小高度：100vh

### 5.3 响应式设计
- 移动端断点：768px
- 移动端适配：
  - 左侧菜单默认隐藏，可通过按钮显示
  - 内容区域占满全屏
  - 顶部导航栏宽度自适应
  - 表格区域可横向滚动
  - 操作按钮自适应排列

### 5.4 浏览器兼容性
- 移动端：
  - 微信内置浏览器
  - Safari
  - QQ浏览器
  - Chrome移动版
- 管理端：
  - Chrome
  - Firefox

### 5.5 性能优化
- 使用 CSS transform 实现动画效果
- 合理使用 z-index 层级管理
- 避免不必要的重排重绘
- 优化滚动性能
- 合理使用固定定位和绝对定位

## 6. 部署配置

### 6.1 域名配置（Spaceship）
1. 主域名：snaptoidphoto.online
2. 子域名配置：
   - admin.snaptoidphoto.online（管理端）
   - wap.snaptoidphoto.online（移动端）
3. DNS 记录配置：
   - 类型：CNAME
   - 值：cname.vercel-dns.com
   - TTL：30分钟

### 6.2 项目部署（Vercel）
1. 管理端项目（lvyue-admin）：
   - 框架：Vite + React
   - 部署域名：admin.snaptoidphoto.online
   - 部署分支：main
   - 自动部署：已启用

2. 移动端项目（lvyue-wap）：
   - 框架：Vite + React
   - 部署域名：wap.snaptoidphoto.online
   - 部署分支：main
   - 自动部署：已启用

### 6.3 开发环境
1. 本地开发：
   - Node.js
   - npm/yarn
   - Git

2. 代码管理：
   - 版本控制：Git
   - 代码托管：GitHub
   - 自动部署：Vercel（关联 GitHub）

3. 项目结构：
   ```
   /lvyue-admin          # 管理端项目
   ├── src/              # 源代码
   │   ├── assets/       # 静态资源
   │   ├── components/   # 组件
   │   ├── pages/        # 页面
   │   └── styles/       # 样式文件
   └── package.json      # 项目配置

   /lvyue-wap           # 移动端项目
   ├── src/             # 源代码
   │   ├── assets/      # 静态资源
   │   ├── components/  # 组件
   │   ├── pages/       # 页面
   │   └── styles/      # 样式文件
   └── package.json     # 项目配置
   ```

## 7. 开发计划

### 第一阶段：基础架构搭建
1. 配置域名和部署环境
2. 创建数据库表结构
3. 搭建基础页面框架

### 第二阶段：管理端开发
1. 登录系统
2. 账号管理模块
3. 会议管理模块
4. 报名信息管理模块
5. 履职统计模块

### 第三阶段：移动端开发
1. 会议报名模块
2. 履职统计模块
3. 登录系统

### 第四阶段：测试和优化
1. 功能测试
2. 兼容性测试
3. 性能优化 