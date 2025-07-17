# 部署说明 - AI Chat H5应用

## 🚀 本地开发环境

### 方式1: Python HTTP服务器
```bash
cd ai-chat-app
python -m http.server 8000
# 或
python3 -m http.server 8000
```

### 方式2: Node.js HTTP服务器
```bash
# 安装http-server
npm install -g http-server

# 启动服务器
cd ai-chat-app
http-server -p 8000
```

### 方式3: PHP内置服务器
```bash
cd ai-chat-app
php -S localhost:8000
```

访问地址：http://localhost:8000

## 🌐 生产环境部署

### 1. 静态网站托管

#### GitHub Pages
1. 创建GitHub仓库
2. 上传项目文件
3. 在仓库设置中启用GitHub Pages
4. 选择主分支作为源

#### Vercel
1. 连接GitHub仓库到Vercel
2. 自动部署，无需配置

#### Netlify
1. 将项目文件夹拖拽到Netlify
2. 或连接GitHub仓库自动部署

### 2. 传统Web服务器

#### Apache
1. 将项目文件复制到网站根目录
2. 确保Apache支持HTML5推送状态

#### Nginx
1. 将项目文件复制到网站根目录
2. 配置Nginx支持单页应用

### 3. CDN部署

#### 阿里云OSS
1. 上传文件到OSS存储桶
2. 配置静态网站托管
3. 可选：配置CDN加速

#### 腾讯云COS
1. 上传文件到COS存储桶
2. 启用静态网站功能
3. 配置自定义域名

## 📱 移动端优化

### PWA配置
添加以下文件以支持PWA功能：

#### manifest.json
```json
{
  "name": "AI Chat",
  "short_name": "AI Chat",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#667eea",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

#### Service Worker
创建sw.js文件实现离线缓存功能。

### 移动端测试
- 使用Chrome DevTools模拟移动设备
- 在真实设备上测试触摸交互
- 检查不同屏幕尺寸的适配

## 🔧 配置说明

### 环境变量
如需连接真实API，可配置以下环境变量：
- `API_BASE_URL`: API基础URL
- `API_KEY`: API密钥

### 自定义配置
在script.js中修改以下配置：
```javascript
const CONFIG = {
  API_BASE_URL: 'https://your-api.com',
  DEFAULT_LANGUAGE: 'zh-CN',
  MAX_MESSAGE_LENGTH: 1000
};
```

## 🛡️ 安全配置

### HTTPS部署
- 确保生产环境使用HTTPS协议
- 配置SSL证书
- 设置安全头部

### 内容安全策略（CSP）
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 📊 监控和分析

### Google Analytics
添加GA代码到index.html：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 错误监控
可集成Sentry等错误监控服务。

## 🔄 持续集成/持续部署

### GitHub Actions
创建.github/workflows/deploy.yml：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 📈 性能优化

### 文件压缩
- 压缩CSS和JavaScript文件
- 优化图片资源
- 启用GZIP压缩

### 缓存策略
- 设置合适的缓存头
- 使用CDN加速静态资源
- 实施Service Worker缓存

## 🌍 国际化部署

### 多语言版本
可为不同地区部署不同语言版本：
- zh.your-domain.com（中文）
- en.your-domain.com（英文）
- ar.your-domain.com（阿拉伯语）

### 地理位置路由
使用CDN的地理位置路由功能，根据用户位置提供最佳语言版本。

## 📞 技术支持

如在部署过程中遇到问题，请：
1. 检查浏览器控制台错误
2. 验证文件路径和权限
3. 确认服务器配置正确

## 🔄 更新部署

### 版本更新
1. 更新项目文件
2. 清除浏览器缓存
3. 测试新功能
4. 部署到生产环境

### 回滚策略
保留前一个版本的备份，以便快速回滚。
