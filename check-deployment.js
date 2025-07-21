// 检查GitHub Pages部署状态
console.log('🔍 检查GitHub Pages部署状态...');

// 检查当前页面是否正常运行
fetch('https://ricky5683.github.io/ai-chat-demo/')
  .then(response => {
    if (response.ok) {
      console.log('✅ GitHub Pages 部署成功！');
      console.log('🌐 访问地址: https://ricky5683.github.io/ai-chat-demo/');
    } else {
      console.log('❌ GitHub Pages 部署失败');
      console.log('状态码:', response.status);
    }
  })
  .catch(error => {
    console.log('❌ 无法访问GitHub Pages');
    console.log('错误:', error.message);
    console.log('可能的原因:');
    console.log('1. GitHub Pages 还在部署中');
    console.log('2. 需要手动启用GitHub Pages');
    console.log('3. 网络连接问题');
  });

// 检查GitHub Actions状态
console.log('\n📋 手动检查步骤:');
console.log('1. 访问: https://github.com/Ricky5683/ai-chat-demo/actions');
console.log('2. 查看最新的workflow运行状态');
console.log('3. 如果失败，检查错误信息');

console.log('\n🔧 GitHub Pages 设置步骤:');
console.log('1. 访问: https://github.com/Ricky5683/ai-chat-demo/settings/pages');
console.log('2. Source: Deploy from a branch');
console.log('3. Branch: gh-pages');
console.log('4. 点击 Save');

console.log('\n🌐 预期访问地址:');
console.log('- 主页: https://ricky5683.github.io/ai-chat-demo/');
console.log('- 测试页: https://ricky5683.github.io/ai-chat-demo/test.html'); 