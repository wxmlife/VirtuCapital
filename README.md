# Virtu Capital 帮助中心

这是一个由 Markdown 驱动的 APP 使用指南网站，视觉结构参考主流金融 APP 帮助中心。

## 内容维护

- 主指南：`docs/VirtuCapital_APP用户指南.md`
- 截图目录：`docs/assets/`
- 新文章模板：`docs/新建指南模板.md.example`
- 全站视觉：`src/css/custom.css`
- 左侧目录：`sidebars.js`

编辑 Markdown 或替换同名截图后，网页会自动更新，无需修改 HTML。

## 本地预览

```bash
npm install
npm start
```

默认打开 `http://localhost:3000`。修改 Markdown 后开发服务器会自动刷新。

## 生产构建

```bash
npm run build
npm run serve
```

构建产物位于 `build/`，可部署到任意静态网站托管服务。

## 推荐写作规范

1. 每篇文章只解决一个明确问题。
2. 每个二级标题对应一个操作阶段。
3. 操作使用编号列表，页面说明使用普通段落或项目列表。
4. 补充说明使用 `:::info`，风险提示使用 `:::warning`。
5. 截图使用 1080 × 2400 或相同比例，并在 Markdown 中填写准确的替代文字。
