# 🚀 部署到 GitHub Pages

本指南帮助你将 React 项目部署到 GitHub Pages。

## ✅ 已完成的配置

以下配置已经为你设置好了：

- ✅ 安装了 `gh-pages` 包
- ✅ 配置了 Vite 的 base URL (`/Corelab_Interactive_Archive/`)
- ✅ 添加了部署脚本到 package.json
- ✅ 创建了 `.nojekyll` 文件（防止 Jekyll 处理）

## 📋 部署步骤

### 方法一：使用命令行部署（推荐）

**第一次部署：**

```bash
# 1. 确保所有代码已提交到 git
cd rearranging-narratives
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main

# 2. 运行部署命令（会自动构建并部署）
npm run deploy
```

**之后每次更新：**

```bash
# 1. 提交你的更改
git add .
git commit -m "Update content"
git push origin main

# 2. 重新部署
npm run deploy
```

### 方法二：使用 GitHub Actions 自动部署

如果你想每次 push 到 main 分支时自动部署，可以创建 GitHub Actions workflow。

**创建文件：** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: ./rearranging-narratives
        run: npm ci

      - name: Build
        working-directory: ./rearranging-narratives
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./rearranging-narratives/dist
```

## 🌐 访问你的网站

部署成功后，你的网站将在以下地址可用：

```
https://zzyyyyyyyyyyyyyy.github.io/Corelab_Interactive_Archive/
```

**注意**：首次部署后，可能需要等待几分钟才能访问。

## ⚙️ GitHub 仓库设置

部署后，需要在 GitHub 上进行一次设置：

1. 进入你的 GitHub 仓库：https://github.com/Zzyyyyyyyyyyyyyy/Corelab_Interactive_Archive
2. 点击 `Settings` (设置)
3. 在左侧菜单找到 `Pages`
4. 在 `Source` 下拉菜单中选择 `gh-pages` 分支
5. 点击 `Save` (保存)

**截图示意：**
```
Source: gh-pages
Folder: / (root)
```

## 🔍 检查部署状态

### 查看部署是否成功

```bash
# 检查 gh-pages 分支是否存在
git branch -a | grep gh-pages
```

你应该看到：
```
remotes/origin/gh-pages
```

### 查看构建输出

部署命令会显示进度：
```
> rearranging-narratives@0.0.0 predeploy
> npm run build

> rearranging-narratives@0.0.0 build
> tsc -b && vite build

✓ built in xxx ms

Published
```

## 🐛 常见问题

### 1. 页面显示空白

**原因**：Base URL 配置不正确

**解决方案**：
- 检查 `vite.config.ts` 中的 `base` 是否为 `/Corelab_Interactive_Archive/`
- 确保与你的仓库名完全匹配（区分大小写）

### 2. CSS 或图片加载失败

**原因**：资源路径不正确

**解决方案**：
- 图片应该放在 `public/` 或 `src/assets/` 文件夹
- 使用相对路径或以 `/` 开头的绝对路径
- Vite 会自动处理路径，确保使用 `import` 或放在 `public` 文件夹

### 3. 404 错误

**原因**：路由配置问题

**解决方案**：
- 如果使用 React Router，需要使用 `HashRouter` 而不是 `BrowserRouter`
- 或者添加自定义 404 页面：在 `public/` 创建 `404.html` 并重定向到 `index.html`

### 4. 部署命令失败

**错误信息**：`fatal: A branch named 'gh-pages' already exists.`

**解决方案**：
```bash
# 删除本地 gh-pages 分支
git branch -D gh-pages

# 重新部署
npm run deploy
```

## 📱 本地测试生产构建

在部署前，先在本地测试构建版本：

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

访问显示的本地地址（通常是 http://localhost:4173）检查是否正常。

## 🔄 更新部署

每次修改代码后，只需运行：

```bash
npm run deploy
```

这个命令会：
1. 自动运行 `npm run build` (通过 predeploy 脚本)
2. 将 `dist` 文件夹的内容推送到 `gh-pages` 分支

## 📝 部署检查清单

- [ ] 代码已提交到 git
- [ ] 运行 `npm run build` 成功
- [ ] 本地 `npm run preview` 测试通过
- [ ] 运行 `npm run deploy`
- [ ] 在 GitHub Settings > Pages 中设置 Source 为 `gh-pages`
- [ ] 等待几分钟后访问网站
- [ ] 检查所有功能是否正常

## 🎯 快速命令参考

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 预览构建
npm run preview

# 部署到 GitHub Pages
npm run deploy

# 完整流程
git add .
git commit -m "Your message"
git push origin main
npm run deploy
```

## 🆘 需要帮助？

如果遇到问题：
1. 检查浏览器控制台的错误信息
2. 查看 GitHub Actions 的日志（如果使用 Actions）
3. 确认 gh-pages 分支已成功创建
4. 检查 GitHub Pages 设置是否正确

---

**首次部署后记得在 GitHub 仓库设置中启用 Pages！**
