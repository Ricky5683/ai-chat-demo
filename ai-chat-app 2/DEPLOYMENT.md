# 部署说明

## GitHub Pages 部署

### 自动部署（推荐）

1. **GitHub Actions 已配置**
   - 每次推送到 `main` 分支时自动触发部署
   - 部署到 `gh-pages` 分支
   - 访问地址：`https://ricky5683.github.io/ai-chat-demo/`

### 手动设置 GitHub Pages

如果自动部署不工作，可以手动设置：

1. 进入 GitHub 仓库设置
2. 找到 "Pages" 选项
3. 选择 "Deploy from a branch"
4. 选择 "gh-pages" 分支
5. 点击 "Save"

### 本地开发

```bash
# 启动本地服务器
python3 -m http.server 8000

# 访问地址
http://localhost:8000
```

## 文件结构

```
ai-chat-demo/
├── index.html          # 主页面
├── script.js           # 主要JavaScript逻辑
├── style.css           # 样式文件
├── i18n.js            # 国际化配置
├── test.html          # 功能测试页面
├── validate.js        # 功能验证脚本
├── README.md          # 项目说明
├── DEPLOYMENT.md      # 部署说明
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions 工作流
```

## 功能特性

### 创建模式选择
- **使用模板创建**：快速创建高质量角色
- **完全自定义**：适合Prompt专家

### 预设模板
- 浪漫女友：温柔体贴，善解人意
- 通用陪伴女友：活泼开朗，陪伴聊天

### 技术特点
- 响应式设计
- 多语言支持（中文、英文、阿拉伯文）
- 本地存储数据
- 无依赖纯前端实现

## 访问地址

- **GitHub Pages**: https://ricky5683.github.io/ai-chat-demo/
- **GitHub 仓库**: https://github.com/Ricky5683/ai-chat-demo

## 更新流程

1. 修改代码
2. 提交更改：
   ```bash
   git add .
   git commit -m "描述更改"
   git push origin main
   ```
3. GitHub Actions 自动部署到 GitHub Pages

## 故障排除

### 如果 GitHub Pages 不工作
1. 检查 Actions 标签页是否有部署错误
2. 确认 gh-pages 分支已创建
3. 检查仓库设置中的 Pages 配置

### 如果本地开发有问题
1. 确保使用 HTTP 服务器（不是直接打开文件）
2. 检查浏览器控制台是否有错误
3. 清除浏览器缓存 