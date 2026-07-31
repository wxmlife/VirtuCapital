# 双指南一键发布设计

## 目标

一次运行 `npm run publish`，同时完成以下工作：

- 将 APP 用户指南与管理员手册的正式源文件提交并推送到 `main`。
- 将两套静态网站合并为一个 GitHub Pages 发布快照。
- 保留 GitHub 仓库右侧现有的两个查找入口：
  - `Deployments` 用于查看 APP 用户指南。
  - `Releases` 用于打开管理员手册网址。

本方案用于临时公开预览。管理员手册的前端口令不是安全边界，不能替代身份认证。

## 在线结构

GitHub Pages 只发布一次，页面路径保持独立：

- APP 用户指南：`https://wxmlife.github.io/VirtuCapital/app-guide/`
- 管理员手册：`https://wxmlife.github.io/VirtuCapital/admin/`

管理员手册必须继续存在于 `/VirtuCapital/admin/`，因为 GitHub Release 只是快捷入口，不承载网页文件。

## GitHub 展示方式

保留当前分开展示方式：

- GitHub Pages 的 `Deployments` 显示统一 Pages 部署，主要用于进入 APP 用户指南。
- 标签为 `Web` 的 GitHub Release 不附带下载包，只在正文中保留管理员手册在线网址。
- Release 标题改为 `管理员手册（在线预览）`，使入口用途清楚。

不新增站点选择页，不将管理员手册打包为 Release 附件，也不创建第二套 Pages 部署。

## 构建流程

发布流程只清理一次根目录 `build/`，然后依次：

1. 以 GitHub Pages 配置构建 APP 用户指南到根目录 `build/`。
2. 以 GitHub Pages 配置构建管理员手册到 `admin-guide/build/`。
3. 将完整管理员构建复制到根目录 `build/admin/`。
4. 在根目录 `build/` 写入 `.nojekyll`。

管理员站的 GitHub Pages 配置继续使用 `/VirtuCapital/admin/` 作为 `baseUrl`。

## 发布前验证

发布必须在任何 Git 提交或远程写入之前完成以下检查：

- Markdown 与 Git 差异没有空白错误。
- 两套站点均能成功完成三语言生产构建。
- 用户指南关键入口存在：
  - `build/index.html`
  - `build/app-guide/index.html`
  - 对应英文、繁体中文关键路由
- 管理员手册关键入口存在：
  - `build/admin/index.html`
  - `build/admin/getting-started/login/index.html`
  - `build/admin/en/index.html`
  - `build/admin/zh-Hant/index.html`
- 管理员手册路由检查脚本通过。

任一检查失败即退出，不提交源码、不推送 `main`、不更新 `gh-pages` 或 Release。

## 源码提交范围

一键发布收集两套指南的正式源文件，包括：

- 根目录用户指南配置、内容、图片、脚本和样式。
- 整个 `admin-guide/` 目录。
- 一键发布命令文件与发布脚本。

临时文件、构建目录、原型目录以及 `.codex-tmp/` 不进入提交。

脚本继续要求当前分支为 `main`，并拒绝在暂存区已有内容时运行，避免混入不明确的暂存变更。

## 远程发布

本地构建和验证全部通过后：

1. 仅暂存正式源文件。
2. 有变更时创建一个提交并推送到 `origin/main`；无变更时继续刷新预览。
3. 使用一次 `gh-pages -d build` 更新完整 Pages 快照，防止两套网站互相覆盖。
4. 使用 GitHub CLI 创建或更新 `Web` Release：
   - 标题：`管理员手册（在线预览）`
   - 正文：管理员手册在线网址
   - 不上传附件
5. 输出 APP 用户指南、管理员手册和 Release 三个链接。

若 `Web` Release 不存在则创建；存在则更新。脚本在发布前检查 GitHub CLI 是否可用且已经登录。

## 失败处理

- 构建或本地验证失败：立即停止，不产生远程变化。
- `main` 推送失败：停止，不发布旧源码对应的新 Pages。
- Pages 推送失败：保留已推送的源码提交并输出明确错误，不更新 Release。
- Release 更新失败：Pages 仍然有效；脚本返回失败并提示手动重试 Release 更新。

发布脚本不删除现有 Release，不删除标签，不重写用户已有提交。

## 验收标准

- 一次运行能够提交两套指南源码并生成一个完整 Pages 快照。
- 发布产物同时包含用户指南和 `admin/` 管理员手册。
- 再次发布用户指南时不会删除管理员手册，反之亦然。
- `Web` Release 只包含管理员手册网址，没有下载附件。
- 终端在成功后明确输出所有访问地址。
- 本地验证命令及现有测试全部通过。
