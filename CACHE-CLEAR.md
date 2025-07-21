# GitHub Pages 缓存清理指南

## 问题描述

如果GitHub Pages显示的是老版本内容，通常是因为浏览器缓存或GitHub Pages缓存问题。

## 解决方案

### 1. 浏览器缓存清理

#### Chrome/Edge
1. 按 `Ctrl + Shift + R` (Windows) 或 `Cmd + Shift + R` (Mac)
2. 或者按 `F12` 打开开发者工具，右键刷新按钮选择"清空缓存并硬性重新加载"

#### Firefox
1. 按 `Ctrl + F5` (Windows) 或 `Cmd + Shift + R` (Mac)
2. 或者按 `F12` 打开开发者工具，右键刷新按钮选择"清空缓存并重新加载"

#### Safari
1. 按 `Cmd + Option + R`
2. 或者按住 `Option` 键点击刷新按钮

### 2. 强制刷新特定页面

在浏览器地址栏中添加参数来强制刷新：

```
https://ricky5683.github.io/ai-chat-demo/?v=2
https://ricky5683.github.io/ai-chat-demo/index.html?t=2024
```

### 3. 检查部署状态

访问以下页面检查部署状态：

- **测试页面**: https://ricky5683.github.io/ai-chat-demo/test-pages.html
- **部署状态**: https://ricky5683.github.io/ai-chat-demo/deployment-status.html

### 4. GitHub Pages 设置检查

1. 访问: https://github.com/Ricky5683/ai-chat-demo/settings/pages
2. 确认设置：
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/ (root)`

### 5. 等待部署完成

GitHub Pages 部署通常需要几分钟时间：
- 检查 Actions 标签页: https://github.com/Ricky5683/ai-chat-demo/actions
- 等待绿色勾号表示部署成功

## 最新版本验证

### 当前版本特征

1. **首页** (`index.html`): 显示"AI Chat Demo"标题和功能特性
2. **完整应用** (`index-original.html`): 包含创建模式选择功能
3. **测试页面** (`test-pages.html`): 显示"GitHub Pages 测试成功！"

### 功能验证

1. 访问 https://ricky5683.github.io/ai-chat-demo/
2. 应该看到新的欢迎页面，而不是老版本
3. 点击"启动应用"进入完整应用
4. 测试创建模式选择功能

## 联系支持

如果问题仍然存在，请：

1. 检查 GitHub Actions 是否有错误
2. 确认 gh-pages 分支内容是否正确
3. 等待 10-15 分钟后再次尝试

## 技术说明

- **部署时间**: 通常 2-5 分钟
- **缓存时间**: GitHub Pages 缓存约 10 分钟
- **文件结构**: 所有文件必须在根目录，不能在子目录中 