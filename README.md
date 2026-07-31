# Virtu Capital 帮助中心

这是一个由 Markdown 驱动的使用指南仓库，包含两套独立网站：

- 根目录：面向普通投资者的公开 APP 使用指南。
- `admin-guide/`：面向获授权管理员、运营和风控人员的内部管理员手册。

两个站点共享开发仓库和视觉规范，但拥有独立的内容、导航、构建产物与部署出口。公开用户站不会生成管理员手册页面，也不提供管理员站入口。

## 内容维护

- 用户指南：`docs/`
- 用户截图：`docs/assets/`
- 管理员指南：`admin-guide/docs/`
- 管理员截图：`admin-guide/docs/assets/`
- 用户站视觉与目录：`src/css/custom.css`、`sidebars.js`
- 管理员站视觉与目录：`admin-guide/src/css/custom.css`、`admin-guide/sidebars.js`

编辑 Markdown 或替换同名截图后，网页会自动更新，无需修改 HTML。

## 一键发布

在 Finder 中双击根目录的 `一键发布指南.command`，或运行：

```bash
npm run publish
```

脚本会构建两套网站、提交正式内容、推送 `main`，并更新 GitHub Pages。

- APP 用户指南：<https://wxmlife.github.io/VirtuCapital/app-guide/>
- 管理员手册：<https://wxmlife.github.io/VirtuCapital/admin/>
- 管理员手册 Release 快捷入口：<https://github.com/wxmlife/VirtuCapital/releases/tag/Web>

两套网站会合并为一次 GitHub Pages 部署，管理员手册位于 `admin/` 子目录。`Web` Release 不包含下载附件，只保存管理员手册在线网址，方便从仓库首页快速进入。

## 本地预览

在 macOS Finder 中双击根目录的 `一键本地运行.command`，可同时启动 APP 用户端和管理员端。两个站点就绪后会自动在浏览器中打开：

- APP 用户端：`http://localhost:3000`
- 管理员端：`http://localhost:3001`

保持弹出的 Terminal 窗口开启；按 `Ctrl+C` 可同时停止两个站点。首次运行前需要先执行一次 `npm install`。

也可以分别从终端启动：

```bash
npm install
npm run start:user
npm run start:admin
```

`start:user` 和 `start:admin` 是快速编辑模式，只加载简体中文；修改 Markdown 后会自动刷新。管理员站使用 `http://localhost:3001`。

需要在同一个地址预览并切换简体中文、繁体中文和英文时，使用：

```bash
npm run preview:user -- --port 3000
npm run preview:admin
```

完整用户站会打开在 `http://localhost:3000`，完整管理员站会打开在 `http://localhost:3001`。完整预览会先构建全部语言，因此启动稍慢，但可以正常验证语言切换和所有正式路由。管理员站的语言路径分别为：

- 简体中文：`/getting-started/dashboard`
- 繁体中文：`/zh-Hant/getting-started/dashboard`
- 英文：`/en/getting-started/dashboard`

`docusaurus start` 一次只加载一种语言，因此不要使用快速编辑模式验证带 `/en/` 或 `/zh-Hant/` 前缀的路由。运行完整预览前，请先停止占用相同端口的快速编辑进程。

## 生产构建

```bash
npm run build:user
npm run build:admin
npm run build:all
npm run check:admin-routes
```

用户站构建产物位于 `build/`，管理员站构建产物位于 `admin-guide/build/`。管理员站构建会自动检查简体中文、繁体中文和英文的全部页面路由；也可使用 `check:admin-routes` 单独复查现有构建。发布 GitHub Pages 时，管理员构建会复制到 `build/admin/` 后与用户站一起发布。

管理员口令只在当前浏览器标签会话内有效，关闭会话后需要重新输入；这只是前端访问提示，不能替代真正的身份认证。当前 GitHub Pages 仅用于临时公开预览，不得放入敏感资料；正式上线时必须改用身份认证、VPN 或访问白名单。

## 推荐写作规范

1. 每篇文章只解决一个明确问题。
2. 每个二级标题对应一个操作阶段。
3. 操作使用编号列表，页面说明使用普通段落或项目列表。
4. 补充说明使用 `:::info`，风险提示使用 `:::warning`。
5. 截图使用 1080 × 2400 或相同比例，并在 Markdown 中填写准确的替代文字。
