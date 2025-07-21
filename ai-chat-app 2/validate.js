// 功能验证脚本
console.log('🔍 AI Chat 功能验证开始...');

// 检查关键DOM元素是否存在
const requiredElements = [
    'create-mode-page',
    'create-role-page',
    'template-create-form',
    'custom-create-form',
    'template-mode',
    'custom-mode',
    'template-grid',
    'template-avatar-grid',
    'custom-avatar-grid'
];

console.log('📋 检查DOM元素...');
requiredElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        console.log(`✅ ${id} - 存在`);
    } else {
        console.log(`❌ ${id} - 缺失`);
    }
});

// 检查AIChat类是否存在
if (typeof AIChat !== 'undefined') {
    console.log('✅ AIChat类 - 已定义');
    
    // 检查关键方法是否存在
    const requiredMethods = [
        'showCreateModePage',
        'selectCreateMode',
        'showCreateRolePage',
        'setupTemplateCreatePage',
        'setupCustomCreatePage',
        'handleTemplateCreate',
        'handleCustomCreate'
    ];
    
    console.log('🔧 检查关键方法...');
    requiredMethods.forEach(method => {
        if (typeof aiChat[method] === 'function') {
            console.log(`✅ ${method} - 已定义`);
        } else {
            console.log(`❌ ${method} - 缺失`);
        }
    });
    
    // 检查模板数据
    if (aiChat.roleTemplates && aiChat.roleTemplates.length > 0) {
        console.log(`✅ 角色模板 - ${aiChat.roleTemplates.length}个模板`);
        aiChat.roleTemplates.forEach(template => {
            console.log(`  - ${template.name}: ${template.description}`);
        });
    } else {
        console.log('❌ 角色模板 - 未定义或为空');
    }
} else {
    console.log('❌ AIChat类 - 未定义');
}

// 检查国际化支持
if (typeof i18n !== 'undefined') {
    console.log('✅ i18n - 已定义');
    
    // 检查关键翻译
    const requiredTranslations = [
        'createMode.title',
        'createMode.templateTitle',
        'createMode.customTitle',
        'createRole.templateSelect',
        'createRole.corePersona',
        'createRole.customPersona'
    ];
    
    console.log('🌐 检查翻译...');
    requiredTranslations.forEach(key => {
        const translation = i18n.t(key);
        if (translation && translation !== key) {
            console.log(`✅ ${key} - ${translation}`);
        } else {
            console.log(`❌ ${key} - 翻译缺失`);
        }
    });
} else {
    console.log('❌ i18n - 未定义');
}

console.log('🎉 功能验证完成！');

// 测试创建模式选择功能
function testCreateModeSelection() {
    console.log('🧪 测试创建模式选择...');
    
    // 模拟点击创建角色按钮
    const createBtn = document.getElementById('create-role-btn');
    if (createBtn) {
        createBtn.click();
        console.log('✅ 创建角色按钮点击成功');
        
        // 检查是否显示创建模式页面
        setTimeout(() => {
            const modePage = document.getElementById('create-mode-page');
            if (modePage && modePage.style.display !== 'none') {
                console.log('✅ 创建模式页面显示成功');
            } else {
                console.log('❌ 创建模式页面显示失败');
            }
        }, 100);
    } else {
        console.log('❌ 创建角色按钮未找到');
    }
}

// 页面加载完成后运行测试
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(testCreateModeSelection, 1000);
    });
} else {
    setTimeout(testCreateModeSelection, 1000);
} 