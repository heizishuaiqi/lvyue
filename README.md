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
#### 管理端（lvyue-admin）
- 框架：React 18
- UI组件：自定义组件
- 状态管理：React Hooks
- 路由：React Router v6
- 二维码生成：qrcode.react
- 样式：CSS Modules

#### 移动端（lvyue-wap）
- 框架：React 18
- UI组件：自定义移动端组件
- 状态管理：React Hooks
- 路由：React Router v6
- 样式：CSS Modules

#### 后端服务
- 数据库：Supabase（PostgreSQL）
- API：Supabase REST API
- 文件存储：Supabase Storage
- 认证：Supabase Auth

### 1.4 项目结构
#### 管理端（lvyue-admin）
```
src/
├── assets/         # 静态资源
├── components/     # 公共组件
│   ├── MeetingModal/    # 会议创建/编辑弹窗
│   └── QRCodeModal/     # 二维码展示弹窗
├── layouts/        # 布局组件
├── pages/         # 页面组件
│   ├── AccountManagement/   # 账号管理
│   ├── MeetingManagement/   # 会议管理
│   ├── RegistrationManagement/  # 报名管理
│   └── Statistics/          # 履职统计
├── services/      # API 服务
└── utils/         # 工具函数
```

#### 移动端（lvyue-wap）
```
src/
├── assets/         # 静态资源
├── components/     # 公共组件
│   ├── login-form/      # 登录表单
│   └── registration-form/  # 报名表单
├── pages/         # 页面组件
│   ├── Login/           # 登录页
│   ├── Profile/         # 个人中心
│   ├── Registration/    # 报名页
│   ├── Statistics/      # 履职统计
│   └── Success/         # 报名成功页
├── router/        # 路由配置
├── services/      # API 服务
└── utils/         # 工具函数
```

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
- 会议信息展示
  - 会议名称
  - 会议时间
  - 会议地点
- 身份选择（下拉菜单）
  - 理事
  - 常务理事
  - 监事
  - 分支机构负责人
  - 地方学会负责人
- 报名信息填写
  - 基础信息
    - 姓名（必填）
    - 手机号码（必填，11位手机号验证）
    - 单位名称（必填）
    - 单位职务（必填）
  - 出席方式选择
    - 本人出席
    - 委托代表出席（仅理事、常务理事、监事可选）
  - 委托信息（选择委托代表出席时显示）
    - 被委托人姓名（必填）
    - 被委托人手机号码（必填，11位手机号验证）
    - 被委托人单位名称（必填）
    - 被委托人单位职务（必填）
- 信息校验
  - 身份验证
  - 重复报名检查
  - 必填项验证
  - 手机号格式验证
- 报名成功页面
  - 成功提示
  - 会议信息展示
  - 报名信息展示
  - 委托信息展示（如有）
  - 重新报名按钮

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
- 移动端：
  - 单列布局，内容居中对齐
  - 最大宽度：800px
  - 页面内边距：20px
  - 卡片布局：
    - 会议信息卡片
      - 内边距：24px
      - 圆角：8px
      - 阴影：轻微阴影效果
      - 标题居中，正文左对齐
    - 表单卡片
      - 内边距：24px
      - 圆角：8px
      - 阴影：轻微阴影效果
      - 表单项上下间距：16px
    - 成功页面卡片
      - 内边距：32px 24px
      - 圆角：8px
      - 阴影：轻微阴影效果
      - 成功图标居中显示
  - 表单元素：
    - 输入框
      - 高度：36px
      - 内边距：0 12px
      - 边框：1px solid #e5e6eb
      - 圆角：4px
      - 聚焦效果：蓝色边框+浅蓝色阴影
    - 下拉选择框
      - 样式同输入框
      - 右侧添加下拉箭头图标
    - 单选按钮组
      - 横向布局
      - 间距：12px
      - 选项样式：边框+圆角
      - 选中效果：蓝色边框+浅蓝色背景
    - 委托信息区域
      - 浅灰背景色
      - 内边距：16px
      - 圆角：4px
    - 提交按钮
      - 高度：40px
      - 蓝色背景
      - 圆角：4px
      - 点击效果：透明度变化

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

## 8. 开发进度

### 8.1 已完成功能
1. 项目基础架构搭建
   - 创建项目基础结构
   - 配置开发环境
   - 设置路由系统
   - 实现主布局组件

2. 管理端功能开发
   - 实现主布局（MainLayout）
     - 左侧菜单栏
     - 顶部导航栏
     - 响应式设计
   - 会议管理页面
     - 基础UI结构
     - API服务封装
     - 会议列表展示
     - 会议创建/编辑表单
     - 会议删除确认
     - 报名状态控制
     - 会议二维码生成与管理
   - 报名信息页面框架
   - 履职统计页面框架
   - 退出登录功能

3. 移动端功能开发
   - 会议报名模块
     - 会议信息展示
     - 身份选择功能
     - 报名表单开发
     - 委托代表功能
     - 表单验证
     - 报名成功页面
     - 移动端适配优化
     - UI/UX优化

### 8.2 开发中功能
1. 报名信息管理
   - 报名列表展示
   - 报名信息审核
   - 导出功能

2. 账号管理模块
   - 账号列表展示
   - 账号创建/编辑表单
   - 账号删除功能

3. 移动端功能
   - 履职统计模块
   - 登录功能

### 8.3 待开发功能
1. 数据导入/导出
2. 系统测试和优化

### 8.4 最近更新 (2024-04-30)
1. 完成移动端履职统计页面
   - 实现会议统计数据展示
   - 根据用户角色显示不同类型的会议统计
   - 支持参会记录卡片式布局
   - 会议类型标签化显示
   - 优化移动端适配体验
2. 添加个人中心页面
   - 用户个人信息展示（姓名、手机号、工作单位、单位职务、学会职务）
   - 支持退出登录功能
   - 与履职统计页面联动
3. 优化整体UI/UX体验
   - 统一页面样式和交互模式
   - 内容区域充满屏幕宽度
   - 优化卡片和列表布局
   - 添加动态效果和过渡
4. 版本控制
   - 代码优化和重构
   - 发布V1.0.3版本 