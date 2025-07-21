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
        this.updateTime();
        this.startTimeUpdate();
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
        this.checkFavoriteStatus();
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

        // 设置职业和星座
        const jobZodiacElement = document.getElementById('profile-job-zodiac');
        const job = this.currentRole.job || 'AI助手';
        const zodiac = this.getZodiacSign(this.currentRole.age);
        jobZodiacElement.textContent = `${job} · ${zodiac}`;

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
            this.currentRole.height && `${this.currentRole.height}cm`,
            ...tags
        ].filter(Boolean);

        tagsElement.innerHTML = allTags.map(tag => 
            `<span class="profile-tag">${tag}</span>`
        ).join('');
    }

    // 获取星座
    getZodiacSign(age) {
        const zodiacSigns = [
            '白羊座', '金牛座', '双子座', '巨蟹座', 
            '狮子座', '处女座', '天秤座', '天蝎座',
            '射手座', '摩羯座', '水瓶座', '双鱼座'
        ];
        
        // 根据年龄简单计算星座（这里用随机方式）
        const index = (age % 12);
        return zodiacSigns[index] || '双子座';
    }

    // 检查收藏状态
    checkFavoriteStatus() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        this.isFavorite = favorites.includes(this.currentRole.id);
        this.updateFavoriteIcon();
    }

    // 更新收藏图标
    updateFavoriteIcon() {
        const iconElement = document.getElementById('favorite-icon');
        iconElement.textContent = this.isFavorite ? '❤️' : '🤍';
    }

    // 切换收藏状态
    toggleFavorite() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (this.isFavorite) {
            // 取消收藏
            const index = favorites.indexOf(this.currentRole.id);
            if (index > -1) {
                favorites.splice(index, 1);
            }
        } else {
            // 添加收藏
            favorites.push(this.currentRole.id);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.isFavorite = !this.isFavorite;
        this.updateFavoriteIcon();
        
        // 显示提示
        this.showToast(this.isFavorite ? '已添加到收藏' : '已取消收藏', 'success');
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
        // 关于我展开/收起
        const expandElement = document.querySelector('.about-me-expand');
        const aboutMeText = document.getElementById('about-me-text');
        
        expandElement.addEventListener('click', () => {
            aboutMeText.classList.toggle('expanded');
            const isExpanded = aboutMeText.classList.contains('expanded');
            expandElement.querySelector('.expand-text').textContent = isExpanded ? '收起' : '展开';
            expandElement.querySelector('.expand-arrow').textContent = isExpanded ? '▲' : '▼';
        });

        // 分享按钮
        document.querySelector('.btn-share').addEventListener('click', () => {
            this.shareProfile();
        });
    }

    // 分享资料
    shareProfile() {
        if (navigator.share) {
            navigator.share({
                title: `${this.currentRole.name}的资料`,
                text: `查看${this.currentRole.name}的详细资料`,
                url: window.location.href
            });
        } else {
            // 复制链接到剪贴板
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showToast('链接已复制到剪贴板', 'success');
            });
        }
    }

    // 更新时间
    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        document.querySelector('.time').textContent = timeString;
    }

    // 开始时间更新
    startTimeUpdate() {
        setInterval(() => {
            this.updateTime();
        }, 60000); // 每分钟更新一次
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

function toggleFavorite() {
    window.profilePage.toggleFavorite();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.profilePage = new ProfilePage();
}); 