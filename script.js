// 应用主类
class AIChat {
    constructor() {
        this.currentUser = null;
        this.currentChat = null;
        this.roles = [];
        this.myRoles = [];
        this.chats = [];
        this.currentPage = 'login';
        this.createMode = null; // 当前创建模式：'template' 或 'custom'
        this.selectedTemplate = null; // 选中的模板
        
        // 预设的角色模板
        this.roleTemplates = [
            {
                id: 'romantic_girlfriend',
                name: '浪漫女友',
                icon: '💕',
                description: '温柔体贴，善解人意，充满浪漫情怀的虚拟女友',
                promptTemplate: '你是一个名叫{name}的浪漫女友。你的性格特点是{persona}。你温柔体贴，善解人意，总是能给予对方温暖和关怀。你会用甜美的语气说话，经常表达爱意，但不会过于粘人。你懂得在适当的时候给予鼓励和支持，也会在对方需要时提供建议和安慰。'
            },
            {
                id: 'companion_girlfriend',
                name: '通用陪伴女友',
                icon: '👩‍❤️‍👨',
                description: '活泼开朗，陪伴聊天，分享生活的虚拟女友',
                promptTemplate: '你是一个名叫{name}的陪伴女友。你的性格特点是{persona}。你活泼开朗，喜欢聊天和分享，总是能给对方带来快乐和正能量。你会主动关心对方的生活，分享有趣的话题，也会认真倾听对方的心事。你是一个很好的朋友和伴侣，能够陪伴对方度过各种时光。'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadData();
        this.checkAuthStatus();
    }
    
    // 设置事件监听器
    setupEventListeners() {
        // 认证相关
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('go-register').addEventListener('click', () => this.showRegisterPage());
        document.getElementById('go-login').addEventListener('click', () => this.showLoginPage());
        
        // 主导航
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e));
        });
        
        // Tab切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTabSwitch(e));
        });
        
        // 角色管理
        document.getElementById('create-role-btn').addEventListener('click', () => this.showCreateModePage());
        document.getElementById('back-to-roles-from-mode').addEventListener('click', () => this.showRolesPage());
        document.getElementById('back-to-mode').addEventListener('click', () => this.showCreateModePage());
        
        // 创建模式选择
        document.getElementById('template-mode').addEventListener('click', () => this.selectCreateMode('template'));
        document.getElementById('custom-mode').addEventListener('click', () => this.selectCreateMode('custom'));
        
        // 模板创建表单
        document.getElementById('template-create-form').addEventListener('submit', (e) => this.handleTemplateCreate(e));
        document.getElementById('cancel-template-create').addEventListener('click', () => this.showCreateModePage());
        
        // 自定义创建表单
        document.getElementById('custom-create-form').addEventListener('submit', (e) => this.handleCustomCreate(e));
        document.getElementById('cancel-custom-create').addEventListener('click', () => this.showCreateModePage());
        
        // 聊天相关
        document.getElementById('back-to-chat-list').addEventListener('click', () => this.showChatListPage());
        document.getElementById('send-message').addEventListener('click', () => this.sendMessage());
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        document.getElementById('message-input').addEventListener('input', (e) => this.handleInputChange(e));
        document.getElementById('get-suggestions').addEventListener('click', () => this.getSuggestions());
        document.getElementById('close-suggestions').addEventListener('click', () => this.closeSuggestions());
        
        // 设置相关
        document.getElementById('language-setting').addEventListener('click', () => this.showLanguageModal());
        document.getElementById('contact-sales').addEventListener('click', () => this.showContactSalesModal());
        document.getElementById('copy-user-id').addEventListener('click', () => this.copyUserId());
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
        
        // 模态框
        document.getElementById('close-language-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('close-contact-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeModal();
        });
        document.getElementById('contact-sales-form').addEventListener('submit', (e) => this.handleContactSales(e));
        
        // 语言选择
        document.querySelectorAll('input[name="language"]').forEach(radio => {
            radio.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        });
    }
    
    // 加载数据
    loadData() {
        // 加载公开角色
        this.roles = [
            {
                id: 1,
                name: '小雅',
                avatar: '👩‍💼',
                age: 25,
                gender: 'female',
                description: '温柔体贴的AI助手，擅长倾听和安慰',
                tags: ['温柔', '体贴', '倾听者'],
                isPublic: true
            },
            {
                id: 2,
                name: '博学教授',
                avatar: '👨‍🏫',
                age: 45,
                gender: 'male',
                description: '知识渊博的学者，能解答各种学术问题',
                tags: ['博学', '学者', '教育'],
                isPublic: true
            },
            {
                id: 3,
                name: '萌萌子',
                avatar: '👧',
                age: 18,
                gender: 'female',
                description: '可爱活泼的二次元少女，喜欢动漫和游戏',
                tags: ['可爱', '二次元', '游戏'],
                isPublic: true
            },
            {
                id: 4,
                name: '冷酷侦探',
                avatar: '🕵️‍♂️',
                age: 35,
                gender: 'male',
                description: '理性冷静的侦探，擅长逻辑推理和分析',
                tags: ['理性', '推理', '分析'],
                isPublic: true
            },
            {
                id: 5,
                name: '心理医生',
                avatar: '👩‍⚕️',
                age: 32,
                gender: 'female',
                description: '专业的心理咨询师，善于情感疏导',
                tags: ['专业', '心理', '疏导'],
                isPublic: true
            }
        ];
        
        // 加载我的角色
        this.myRoles = JSON.parse(localStorage.getItem('myRoles') || '[]');
        
        // 加载聊天记录
        this.chats = JSON.parse(localStorage.getItem('chats') || '[]');
        
        // 加载用户信息
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    
    // 检查认证状态
    checkAuthStatus() {
        if (this.currentUser) {
            this.showMainApp();
        } else {
            this.showLoginPage();
        }
        this.hideLoading();
    }
    
    // 隐藏加载动画
    hideLoading() {
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 1000);
    }
    
    // 显示登录页面
    showLoginPage() {
        document.getElementById('login-page').style.display = 'block';
        document.getElementById('register-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'none';
        document.getElementById('chat-page').style.display = 'none';
        document.getElementById('create-role-page').style.display = 'none';
        this.currentPage = 'login';
    }
    
    // 显示注册页面
    showRegisterPage() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('register-page').style.display = 'block';
        document.getElementById('main-app').style.display = 'none';
        document.getElementById('chat-page').style.display = 'none';
        document.getElementById('create-role-page').style.display = 'none';
        this.currentPage = 'register';
    }
    
    // 显示主应用
    showMainApp() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('register-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
        document.getElementById('chat-page').style.display = 'none';
        document.getElementById('create-role-page').style.display = 'none';
        document.getElementById('create-mode-page').style.display = 'none';
        this.showRolesPage();
    }
    
    // 显示角色页面
    showRolesPage() {
        // 隐藏其他页面，显示主应用
        document.getElementById("login-page").style.display = "none";
        document.getElementById("register-page").style.display = "none";
        document.getElementById("main-app").style.display = "flex";
        document.getElementById("chat-page").style.display = "none";
        document.getElementById("create-role-page").style.display = "none";
        document.getElementById("create-mode-page").style.display = "none";
        
        // 设置当前页面状态
        this.currentPage = "roles";
        this.updateNavigation();
        this.updatePageContent();
        this.renderRoles();
    }    
    // 显示聊天列表页面
    showChatListPage() {
        // 隐藏其他页面，显示主应用
        document.getElementById("login-page").style.display = "none";
        document.getElementById("register-page").style.display = "none";
        document.getElementById("main-app").style.display = "flex";
        document.getElementById("chat-page").style.display = "none";
        document.getElementById("create-role-page").style.display = "none";
        document.getElementById("create-mode-page").style.display = "none";
        
        // 设置当前页面状态
        this.currentPage = "chat-list";
        this.updateNavigation();
        this.updatePageContent();
        this.renderChats();
    }    
    // 显示设置页面
    showSettingsPage() {
        // 隐藏其他页面，显示主应用
        document.getElementById("login-page").style.display = "none";
        document.getElementById("register-page").style.display = "none";
        document.getElementById("main-app").style.display = "flex";
        document.getElementById("chat-page").style.display = "none";
        document.getElementById("create-role-page").style.display = "none";
        document.getElementById("create-mode-page").style.display = "none";
        
        // 设置当前页面状态
        this.currentPage = "settings";
        this.updateNavigation();
        this.updatePageContent();
        this.renderSettings();
    }    
    // 显示聊天页面
    showChatPage(role) {
        document.getElementById('main-app').style.display = 'none';
        document.getElementById('chat-page').style.display = 'flex';
        document.getElementById('create-role-page').style.display = 'none';
        document.getElementById('create-mode-page').style.display = 'none';
        
        this.currentChat = this.getOrCreateChat(role);
        this.setupChatPage(role);
        this.renderMessages();
    }
    
    // 显示创建模式选择页面
    showCreateModePage() {
        document.getElementById('main-app').style.display = 'none';
        document.getElementById('chat-page').style.display = 'none';
        document.getElementById('create-role-page').style.display = 'none';
        document.getElementById('create-mode-page').style.display = 'block';
        this.currentPage = 'create-mode';
    }
    
    // 选择创建模式
    selectCreateMode(mode) {
        this.createMode = mode;
        this.showCreateRolePage();
    }
    
    // 显示创建角色页面
    showCreateRolePage() {
        document.getElementById('main-app').style.display = 'none';
        document.getElementById('chat-page').style.display = 'none';
        document.getElementById('create-mode-page').style.display = 'none';
        document.getElementById('create-role-page').style.display = 'block';
        
        // 根据创建模式设置页面标题和显示对应表单
        if (this.createMode === 'template') {
            document.getElementById('create-role-title').textContent = '使用模板创建角色';
            document.getElementById('template-create-form').style.display = 'block';
            document.getElementById('custom-create-form').style.display = 'none';
            this.setupTemplateCreatePage();
        } else if (this.createMode === 'custom') {
            document.getElementById('create-role-title').textContent = '完全自定义角色';
            document.getElementById('template-create-form').style.display = 'none';
            document.getElementById('custom-create-form').style.display = 'block';
            this.setupCustomCreatePage();
        }
    }
    
    // 设置模板创建页面
    setupTemplateCreatePage() {
        // 生成模板选项
        const templateGrid = document.getElementById('template-grid');
        templateGrid.innerHTML = this.roleTemplates.map(template => 
            `<div class="template-option" data-template-id="${template.id}" onclick="aiChat.selectTemplate('${template.id}')">
                <div class="template-icon">${template.icon}</div>
                <div class="template-name">${template.name}</div>
                <div class="template-desc">${template.description}</div>
            </div>`
        ).join('');
        
        // 生成头像选项
        const avatarGrid = document.getElementById('template-avatar-grid');
        const avatars = ['👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍⚕️', '👩‍⚕️', '🧑‍🎨', '👨‍🔬', '👩‍🔬', '🧑‍💻', '👨‍🏫', '👩‍🏫'];
        avatarGrid.innerHTML = avatars.map(avatar => 
            `<div class="avatar-option" data-avatar="${avatar}" onclick="aiChat.selectTemplateAvatar('${avatar}')">${avatar}</div>`
        ).join('');
        
        // 重置表单
        document.getElementById('template-create-form').reset();
        document.querySelectorAll('.template-option').forEach(option => option.classList.remove('selected'));
        document.querySelectorAll('#template-avatar-grid .avatar-option').forEach(option => option.classList.remove('selected'));
        this.selectedTemplate = null;
    }
    
    // 设置自定义创建页面
    setupCustomCreatePage() {
        // 生成头像选项
        const avatarGrid = document.getElementById('custom-avatar-grid');
        const avatars = ['👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍⚕️', '👩‍⚕️', '🧑‍🎨', '👨‍🔬', '👩‍🔬', '🧑‍💻', '👨‍🏫', '👩‍🏫'];
        avatarGrid.innerHTML = avatars.map(avatar => 
            `<div class="avatar-option" data-avatar="${avatar}" onclick="aiChat.selectCustomAvatar('${avatar}')">${avatar}</div>`
        ).join('');
        
        // 重置表单
        document.getElementById('custom-create-form').reset();
        document.querySelectorAll('#custom-avatar-grid .avatar-option').forEach(option => option.classList.remove('selected'));
    }
    
    // 选择模板
    selectTemplate(templateId) {
        document.querySelectorAll('.template-option').forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.templateId === templateId) {
                option.classList.add('selected');
            }
        });
        this.selectedTemplate = this.roleTemplates.find(t => t.id === templateId);
    }
    
    // 选择模板创建头像
    selectTemplateAvatar(avatar) {
        document.querySelectorAll('#template-avatar-grid .avatar-option').forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.avatar === avatar) {
                option.classList.add('selected');
            }
        });
    }
    
    // 选择自定义创建头像
    selectCustomAvatar(avatar) {
        document.querySelectorAll('#custom-avatar-grid .avatar-option').forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.avatar === avatar) {
                option.classList.add('selected');
            }
        });
    }
    
    // 处理登录
    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            this.showToast(i18n.t('message.fieldRequired'), 'error');
            return;
        }
        
        if (!this.validateEmail(email)) {
            this.showToast(i18n.t('message.invalidEmail'), 'error');
            return;
        }
        
        try {
            // 模拟登录API调用
            await this.simulateApiCall();
            
            this.currentUser = {
                id: 'user_' + Date.now(),
                email: email,
                name: email.split('@')[0],
                avatar: '👤'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showToast(i18n.t('message.loginSuccess'), 'success');
            this.showMainApp();
            
        } catch (error) {
            this.showToast(i18n.t('message.loginFailed'), 'error');
        }
    }
    
    // 处理注册
    async handleRegister(e) {
        e.preventDefault();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (!email || !password || !confirmPassword) {
            this.showToast(i18n.t('message.fieldRequired'), 'error');
            return;
        }
        
        if (!this.validateEmail(email)) {
            this.showToast(i18n.t('message.invalidEmail'), 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showToast(i18n.t('message.passwordTooShort'), 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showToast(i18n.t('message.passwordMismatch'), 'error');
            return;
        }
        
        try {
            // 模拟注册API调用
            await this.simulateApiCall();
            
            this.currentUser = {
                id: 'user_' + Date.now(),
                email: email,
                name: email.split('@')[0],
                avatar: '👤'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showToast(i18n.t('message.registerSuccess'), 'success');
            this.showMainApp();
            
        } catch (error) {
            this.showToast(i18n.t('message.registerFailed'), 'error');
        }
    }
    
    // 处理导航
    handleNavigation(e) {
        const page = e.currentTarget.dataset.page;
        switch (page) {
            case 'roles':
                this.showRolesPage();
                break;
            case 'chat-list':
                this.showChatListPage();
                break;
            case 'settings':
                this.showSettingsPage();
                break;
        }
    }
    
    // 处理Tab切换
    handleTabSwitch(e) {
        const tab = e.currentTarget.dataset.tab;
        
        // 更新Tab状态
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // 更新内容
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tab + '-roles-tab').classList.add('active');
        
        // 重新渲染对应内容
        if (tab === 'public') {
            this.renderPublicRoles();
        } else {
            this.renderMyRoles();
        }
    }
    
    // 更新导航状态
    updateNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page === this.currentPage) {
                btn.classList.add('active');
            }
        });
    }
    
    // 更新页面内容
    updatePageContent() {
        document.querySelectorAll('.page-content').forEach(content => {
            content.style.display = 'none';
        });
        
        if (this.currentPage === 'roles') {
            document.getElementById('roles-page').style.display = 'block';
            document.getElementById('page-title').textContent = i18n.t('roles.title');
        } else if (this.currentPage === 'chat-list') {
            document.getElementById('chat-list-page').style.display = 'block';
            document.getElementById('page-title').textContent = i18n.t('nav.chat');
        } else if (this.currentPage === 'settings') {
            document.getElementById('settings-page').style.display = 'block';
            document.getElementById('page-title').textContent = i18n.t('settings.title');
        }
    }
    
    // 渲染角色列表
    renderRoles() {
        this.renderPublicRoles();
        this.renderMyRoles();
    }
    
    // 渲染公开角色
    renderPublicRoles() {
        const container = document.getElementById('public-roles-list');
        container.innerHTML = '';
        
        this.roles.forEach(role => {
            const roleCard = this.createRoleCard(role);
            container.appendChild(roleCard);
        });
    }
    
    // 渲染我的角色
    renderMyRoles() {
        const container = document.getElementById('my-roles-list');
        container.innerHTML = '';
        
        if (this.myRoles.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">还没有创建角色，点击上方按钮创建第一个角色吧！</p>';
            return;
        }
        
        this.myRoles.forEach(role => {
            const roleCard = this.createRoleCard(role);
            container.appendChild(roleCard);
        });
    }
    
    // 创建角色卡片
    createRoleCard(role) {
        const card = document.createElement('div');
        card.className = 'role-card';
        card.innerHTML = `
            <div class="role-avatar">${role.avatar}</div>
            <div class="role-info">
                <div class="role-name">${role.name}</div>
                <div class="role-meta">
                    <span>${role.age} ${i18n.t('roles.age')}</span>
                    <span>•</span>
                    <span>${role.gender === 'male' ? i18n.t('createRole.male') : role.gender === 'female' ? i18n.t('createRole.female') : i18n.t('createRole.secret')}</span>
                </div>
                <div class="role-description">${role.description}</div>
                <div class="role-tags">
                    ${role.tags.map(tag => `<span class="role-tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <button class="btn-start-chat" data-role-id="${role.id}">${i18n.t('roles.startChat')}</button>
        `;
        
        // 添加点击事件
        card.querySelector('.btn-start-chat').addEventListener('click', (e) => {
            e.stopPropagation();
            this.startChat(role);
        });
        
        return card;
    }
    
    // 开始聊天
    startChat(role) {
        this.showChatPage(role);
    }
    
    // 获取或创建聊天
    getOrCreateChat(role) {
        let chat = this.chats.find(c => c.roleId === role.id);
        if (!chat) {
            chat = {
                id: 'chat_' + Date.now(),
                roleId: role.id,
                roleName: role.name,
                roleAvatar: role.avatar,
                messages: [],
                lastMessage: '',
                lastMessageTime: Date.now(),
                unreadCount: 0
            };
            this.chats.push(chat);
            this.saveChats();
        }
        return chat;
    }
    
    // 设置聊天页面
    setupChatPage(role) {
        document.getElementById('chat-name').textContent = role.name;
        document.getElementById('chat-avatar').src = this.getAvatarUrl(role.avatar);
        document.getElementById('chat-avatar').alt = role.name;
        
        // 重置输入框
        document.getElementById('message-input').value = '';
        document.getElementById('send-message').disabled = true;
        
        // 隐藏建议
        document.getElementById('suggestions-container').style.display = 'none';
    }
    
    // 渲染消息
    renderMessages() {
        const container = document.getElementById('chat-messages');
        container.innerHTML = '';
        
        if (this.currentChat.messages.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #666; padding: 40px;">' + i18n.t('chat.noMessages') + '</div>';
            return;
        }
        
        this.currentChat.messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            container.appendChild(messageElement);
        });
        
        // 滚动到底部
        container.scrollTop = container.scrollHeight;
    }
    
    // 创建消息元素
    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender === 'user' ? 'user' : 'ai'}`;
        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${message.sender === 'user' ? this.currentUser.avatar : this.getCurrentRole().avatar}
            </div>
            <div class="message-bubble">
                <div class="message-content">${message.content}</div>
                <div class="message-time">${this.formatTime(message.timestamp)}</div>
                <div class="message-actions">
                    <button class="message-action-btn" onclick="aiChat.deleteMessage('${message.id}')">${i18n.t('chat.deleteMessage')}</button>
                </div>
            </div>
        `;
        return messageDiv;
    }
    
    // 获取当前角色
    getCurrentRole() {
        return [...this.roles, ...this.myRoles].find(r => r.id === this.currentChat.roleId);
    }
    
    // 处理输入变化
    handleInputChange(e) {
        const value = e.target.value.trim();
        document.getElementById('send-message').disabled = !value;
    }
    
    // 发送消息
    async sendMessage() {
        const input = document.getElementById('message-input');
        const content = input.value.trim();
        
        if (!content) return;
        
        // 添加用户消息
        const userMessage = {
            id: 'msg_' + Date.now(),
            sender: 'user',
            content: content,
            timestamp: Date.now()
        };
        
        this.currentChat.messages.push(userMessage);
        this.currentChat.lastMessage = content;
        this.currentChat.lastMessageTime = Date.now();
        
        // 清空输入框
        input.value = '';
        document.getElementById('send-message').disabled = true;
        
        // 重新渲染消息
        this.renderMessages();
        
        // 模拟AI回复
        await this.simulateAIReply();
        
        // 保存聊天记录
        this.saveChats();
    }
    
    // 模拟AI回复
    async simulateAIReply() {
        // 显示输入中状态
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">${this.getCurrentRole().avatar}</div>
            <div class="message-bubble">
                <div class="message-content">${i18n.t('chat.typing')}</div>
            </div>
        `;
        document.getElementById('chat-messages').appendChild(typingDiv);
        
        // 滚动到底部
        const container = document.getElementById('chat-messages');
        container.scrollTop = container.scrollHeight;
        
        // 等待1-3秒
        await this.delay(1000 + Math.random() * 2000);
        
        // 移除输入中状态
        typingDiv.remove();
        
        // 生成AI回复
        const aiReplies = [
            '这是一个很有趣的问题，让我来思考一下...',
            '我理解你的意思，从我的角度来看...',
            '根据我的理解，这个问题可以这样考虑...',
            '谢谢你的提问，这让我想到了...',
            '这确实是个值得深入讨论的话题...',
            '我很乐意和你分享我的想法...',
            '让我们一起探讨这个问题吧...',
            '从另一个角度来看，也许...',
            '这个问题很有意思，我的观点是...',
            '我觉得这个话题很有价值...'
        ];
        
        const aiMessage = {
            id: 'msg_' + Date.now(),
            sender: 'ai',
            content: aiReplies[Math.floor(Math.random() * aiReplies.length)],
            timestamp: Date.now()
        };
        
        this.currentChat.messages.push(aiMessage);
        this.currentChat.lastMessage = aiMessage.content;
        this.currentChat.lastMessageTime = Date.now();
        
        // 重新渲染消息
        this.renderMessages();
    }
    
    // 获取AI回复建议
    async getSuggestions() {
        const suggestionsContainer = document.getElementById('suggestions-container');
        const suggestionsList = document.getElementById('suggestions-list');
        
        suggestionsContainer.style.display = 'block';
        suggestionsList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">正在生成建议...</div>';
        
        // 模拟API调用
        await this.delay(1000);
        
        const suggestions = [
            '告诉我更多关于这个话题的信息',
            '你对这个问题有什么看法？',
            '这个很有趣，还有其他类似的例子吗？',
            '我想了解更多细节',
            '你能帮我分析一下这个情况吗？'
        ];
        
        suggestionsList.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" onclick="aiChat.selectSuggestion('${suggestion}')">${suggestion}</div>`
        ).join('');
    }
    
    // 选择建议
    selectSuggestion(suggestion) {
        document.getElementById('message-input').value = suggestion;
        document.getElementById('send-message').disabled = false;
        this.closeSuggestions();
    }
    
    // 关闭建议
    closeSuggestions() {
        document.getElementById('suggestions-container').style.display = 'none';
    }
    
    // 删除消息
    deleteMessage(messageId) {
        if (confirm(i18n.t('chat.deleteMessage'))) {
            this.currentChat.messages = this.currentChat.messages.filter(m => m.id !== messageId);
            this.renderMessages();
            this.saveChats();
            this.showToast(i18n.t('chat.messageDeleted'), 'success');
        }
    }
    
    // 渲染聊天列表
    renderChats() {
        const container = document.getElementById('chat-list');
        container.innerHTML = '';
        
        if (this.chats.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #666; padding: 40px;">还没有聊天记录，去角色页面开始聊天吧！</div>';
            return;
        }
        
        // 按最后消息时间排序
        const sortedChats = [...this.chats].sort((a, b) => b.lastMessageTime - a.lastMessageTime);
        
        sortedChats.forEach(chat => {
            const chatItem = this.createChatItem(chat);
            container.appendChild(chatItem);
        });
        
        // 更新未读数
        this.updateUnreadBadge();
    }
    
    // 创建聊天项
    createChatItem(chat) {
        const item = document.createElement('div');
        item.className = 'chat-item';
        item.innerHTML = `
            <div class="chat-avatar">${chat.roleAvatar}</div>
            <div class="chat-info">
                <div class="chat-name">
                    ${chat.roleName}
                    <span class="ai-badge">${i18n.t('chat.aiIndicator')}</span>
                </div>
                <div class="chat-preview">${chat.lastMessage}</div>
            </div>
            <div class="chat-meta">
                <div class="chat-time">${this.formatTime(chat.lastMessageTime)}</div>
                ${chat.unreadCount > 0 ? `<div class="chat-badge">${chat.unreadCount}</div>` : ''}
            </div>
        `;
        
        // 添加点击事件
        item.addEventListener('click', () => {
            const role = [...this.roles, ...this.myRoles].find(r => r.id === chat.roleId);
            if (role) {
                this.showChatPage(role);
            }
        });
        
        return item;
    }
    
    // 处理模板创建
    async handleTemplateCreate(e) {
        e.preventDefault();
        
        if (!this.selectedTemplate) {
            this.showToast('请先选择一个模板', 'error');
            return;
        }
        
        const name = document.getElementById('template-role-name').value.trim();
        const avatar = document.querySelector('#template-avatar-grid .avatar-option.selected')?.dataset.avatar;
        const corePersona = document.getElementById('template-core-persona').value.trim();
        
        if (!name || !avatar || !corePersona) {
            this.showToast(i18n.t('message.fieldRequired'), 'error');
            return;
        }
        
        try {
            // 模拟API调用
            await this.simulateApiCall();
            
            // 使用模板生成完整的Prompt
            const fullPrompt = this.selectedTemplate.promptTemplate
                .replace('{name}', name)
                .replace('{persona}', corePersona);
            
            const newRole = {
                id: Date.now(),
                name: name,
                gender: 'female', // 模板角色通常是女性
                avatar: avatar,
                age: 22, // 模板角色年龄
                description: corePersona.substring(0, 50) + (corePersona.length > 50 ? '...' : ''),
                tags: this.extractTags(corePersona),
                isPublic: false,
                persona: fullPrompt,
                templateId: this.selectedTemplate.id
            };
            
            this.myRoles.push(newRole);
            this.saveMyRoles();
            
            this.showToast(i18n.t('message.createRoleSuccess'), 'success');
            this.showRolesPage();
            
        } catch (error) {
            this.showToast(i18n.t('message.createRoleFailed'), 'error');
        }
    }
    
    // 处理自定义创建
    async handleCustomCreate(e) {
        e.preventDefault();
        
        const name = document.getElementById('custom-role-name').value.trim();
        const avatar = document.querySelector('#custom-avatar-grid .avatar-option.selected')?.dataset.avatar;
        const persona = document.getElementById('custom-persona').value.trim();
        
        if (!name || !avatar || !persona) {
            this.showToast(i18n.t('message.fieldRequired'), 'error');
            return;
        }
        
        try {
            // 模拟API调用
            await this.simulateApiCall();
            
            const newRole = {
                id: Date.now(),
                name: name,
                gender: 'secret', // 自定义角色性别保密
                avatar: avatar,
                age: 25, // 自定义角色年龄
                description: persona.substring(0, 50) + (persona.length > 50 ? '...' : ''),
                tags: this.extractTags(persona),
                isPublic: false,
                persona: persona
            };
            
            this.myRoles.push(newRole);
            this.saveMyRoles();
            
            this.showToast(i18n.t('message.createRoleSuccess'), 'success');
            this.showRolesPage();
            
        } catch (error) {
            this.showToast(i18n.t('message.createRoleFailed'), 'error');
        }
    }
    
    // 提取标签
    extractTags(persona) {
        const keywords = ['温柔', '博学', '可爱', '理性', '专业', '活泼', '严谨', '友善', '聪明', '幽默'];
        const tags = [];
        
        keywords.forEach(keyword => {
            if (persona.includes(keyword)) {
                tags.push(keyword);
            }
        });
        
        return tags.length > 0 ? tags : ['个性化'];
    }
    
    // 渲染设置页面
    renderSettings() {
        if (this.currentUser) {
            document.getElementById('user-name').textContent = this.currentUser.name;
            document.getElementById('user-id-value').textContent = this.currentUser.id;
        }
    }
    
    // 显示语言选择模态框
    showLanguageModal() {
        document.getElementById('modal-overlay').style.display = 'flex';
        document.getElementById('language-modal').style.display = 'block';
        
        // 设置当前语言
        document.querySelector(`input[name="language"][value="${i18n.currentLanguage}"]`).checked = true;
    }
    
    // 显示联系销售模态框
    showContactSalesModal() {
        document.getElementById('modal-overlay').style.display = 'flex';
        document.getElementById('contact-sales-modal').style.display = 'block';
    }
    
    // 关闭模态框
    closeModal() {
        document.getElementById('modal-overlay').style.display = 'none';
        document.getElementById('language-modal').style.display = 'none';
        document.getElementById('contact-sales-modal').style.display = 'none';
    }
    
    // 改变语言
    changeLanguage(lang) {
        i18n.setLanguage(lang);
        this.closeModal();
        
        // 重新渲染当前页面
        setTimeout(() => {
            this.renderRoles();
            this.renderChats();
            this.renderSettings();
        }, 100);
    }
    
    // 处理联系销售
    async handleContactSales(e) {
        e.preventDefault();
        
        const countryCode = document.getElementById('country-code').value;
        const phoneNumber = document.getElementById('phone-number').value.trim();
        
        if (!phoneNumber) {
            this.showToast(i18n.t('message.fieldRequired'), 'error');
            return;
        }
        
        try {
            // 模拟API调用
            await this.simulateApiCall();
            
            // 这里应该调用实际的API
            const leadData = {
                phone: countryCode + phoneNumber,
                userId: this.currentUser.id,
                timestamp: Date.now()
            };
            
            console.log('Lead data:', leadData);
            
            this.showToast(i18n.t('contactSales.success'), 'success');
            this.closeModal();
            
        } catch (error) {
            this.showToast(i18n.t('contactSales.error'), 'error');
        }
    }
    
    // 复制用户ID
    copyUserId() {
        const userId = this.currentUser.id;
        navigator.clipboard.writeText(userId).then(() => {
            this.showToast(i18n.t('settings.userIdCopied'), 'success');
        }).catch(() => {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = userId;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast(i18n.t('settings.userIdCopied'), 'success');
        });
    }
    
    // 退出登录
    logout() {
        if (confirm(i18n.t('settings.logoutConfirm'))) {
            localStorage.removeItem('currentUser');
            this.currentUser = null;
            this.showLoginPage();
        }
    }
    
    // 更新未读徽章
    updateUnreadBadge() {
        const totalUnread = this.chats.reduce((sum, chat) => sum + chat.unreadCount, 0);
        const badge = document.getElementById('chat-badge');
        
        if (totalUnread > 0) {
            badge.textContent = totalUnread;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
    
    // 保存聊天记录
    saveChats() {
        localStorage.setItem('chats', JSON.stringify(this.chats));
    }
    
    // 保存我的角色
    saveMyRoles() {
        localStorage.setItem('myRoles', JSON.stringify(this.myRoles));
    }
    
    // 显示Toast提示
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
    
    // 工具函数
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email) || /^\d{11}$/.test(email);
    }
    
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return date.toLocaleDateString();
        }
    }
    
    getAvatarUrl(avatar) {
        return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${avatar}</text></svg>`;
    }
    
    async simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 500 + Math.random() * 1000);
        });
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 初始化应用
let aiChat;
document.addEventListener('DOMContentLoaded', () => {
    aiChat = new AIChat();
});
