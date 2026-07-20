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

## 本地预览

```bash
npm install
npm run start:user
npm run start:admin
```

`start:user` 是快速编辑模式，只加载简体中文；修改 Markdown 后会自动刷新。管理员站使用 `http://localhost:3001`。

需要在同一个地址预览并切换简体中文、繁体中文和英文时，使用：

```bash
npm run preview:user -- --port 3000
```

完整用户站会打开在 `http://localhost:3000`。这个模式会先清理旧路径缓存，再构建全部语言，因此启动稍慢，但可以避免 GitHub Pages 路径残留，并正常验证语言切换和所有正式路由。

## 生产构建

```bash
npm run build:user
npm run build:admin
npm run build:all
```

用户站构建产物位于 `build/`，管理员站构建产物位于 `admin-guide/build/`。管理员站上线时必须另行配置身份认证、VPN 或访问白名单，不应直接部署到公开 GitHub Pages。

## 推荐写作规范

1. 每篇文章只解决一个明确问题。
2. 每个二级标题对应一个操作阶段。
3. 操作使用编号列表，页面说明使用普通段落或项目列表。
4. 补充说明使用 `:::info`，风险提示使用 `:::warning`。
5. 截图使用 1080 × 2400 或相同比例，并在 Markdown 中填写准确的替代文字。
