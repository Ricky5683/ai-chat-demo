// 用户资料页逻辑
class ProfilePage {
    constructor() {
        this.currentRole = null;
        this.isFavorite = false;
        this.init();
    }

    init() {
        this.loadRoleData();
        this.setupEventListeners();
    }

    // 加载角色数据
    loadRoleData() {
        // 从URL参数获取角色ID
        const urlParams = new URLSearchParams(window.location.search);
        const roleId = urlParams.get('roleId');
        
        if (!roleId) {
            this.showError('未找到角色信息');
            return;
        }

        // 从localStorage获取角色数据
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        const myRoles = JSON.parse(localStorage.getItem('myRoles') || '[]');
        
        // 查找角色
        this.currentRole = roles.find(role => role.id == roleId) || 
                          myRoles.find(role => role.id == roleId);

        if (!this.currentRole) {
            this.showError('角色不存在');
            return;
        }

        this.renderProfile();
    }

    // 渲染资料页面
    renderProfile() {
        if (!this.currentRole) return;

        // 设置头像
        const avatarElement = document.getElementById('profile-avatar');
        avatarElement.innerHTML = this.currentRole.avatar;
        avatarElement.style.fontSize = '80px';

        // 设置姓名和年龄
        const nameAgeElement = document.getElementById('profile-name-age');
        nameAgeElement.textContent = `${this.currentRole.name} ${this.currentRole.age}`;

        // 设置职业
        const jobZodiacElement = document.getElementById('profile-job-zodiac');
        const job = this.currentRole.job || '自由职业';
        jobZodiacElement.textContent = job;

        // 设置关于我
        const aboutMeElement = document.getElementById('about-me-text');
        const description = this.currentRole.description || this.currentRole.persona || '暂无描述';
        aboutMeElement.textContent = description;

        // 设置标签
        this.renderTags();
    }

    // 渲染标签
    renderTags() {
        const tagsElement = document.getElementById('profile-tags');
        const tags = this.currentRole.tags || [];
        
        // 添加基础信息标签
        const allTags = [
            this.currentRole.location && `现居${this.currentRole.location}`,
            this.currentRole.location && `${this.currentRole.location}人`,
            ...tags
        ].filter(Boolean);

        tagsElement.innerHTML = allTags.map(tag => 
            `<span class="profile-tag">${tag}</span>`
        ).join('');
    }

    // 开始聊天
    startChat() {
        if (!this.currentRole) return;
        
        // 跳转到聊天页面
        window.location.href = `index-original.html?roleId=${this.currentRole.id}&action=chat`;
    }

    // 返回上一页
    goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index-original.html';
        }
    }

    // 设置事件监听器
    setupEventListeners() {
        // 暂时没有需要的事件监听器
    }

    // 显示提示
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // 显示错误
    showError(message) {
        this.showToast(message, 'error');
        setTimeout(() => {
            this.goBack();
        }, 2000);
    }
}

// 全局函数
function goBack() {
    window.profilePage.goBack();
}

function startChat() {
    window.profilePage.startChat();
}

// 移除toggleFavorite函数，因为不再需要

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.profilePage = new ProfilePage();
}); 