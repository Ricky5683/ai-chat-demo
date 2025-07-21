// 国际化配置
const i18n = {
    currentLanguage: 'zh-CN',
    
    // 语言包
    translations: {
        'zh-CN': {
            // 通用
            loading: '正在加载...',
            'common.cancel': '取消',
            'common.save': '保存',
            'common.submit': '提交',
            'common.confirm': '确认',
            'common.delete': '删除',
            'common.edit': '编辑',
            'common.back': '返回',
            
            // 应用标题
            'app.title': 'AI Chat',
            
            // 认证
            'auth.email': '邮箱或手机号',
            'auth.password': '密码',
            'auth.confirmPassword': '确认密码',
            'auth.login': '登录',
            'auth.register': '注册',
            
            // 登录页
            'login.subtitle': '与AI虚拟角色开始对话',
            'login.noAccount': '没有账号？',
            
            // 注册页
            'register.title': '创建账号',
            'register.subtitle': '加入AI Chat开始体验',
            'register.hasAccount': '已有账号？',
            
            // 导航
            'nav.roles': '角色',
            'nav.chat': '聊天',
            'nav.settings': '设置',
            
            // 角色页面
            'roles.title': 'AI 角色',
            'roles.public': '公开角色',
            'roles.my': '我的角色',
            'roles.create': '创建',
            'roles.createRole': '创建AI虚拟角色',
            'roles.startChat': '开始聊天',
            'roles.age': '岁',
            'roles.tags': '标签',
            
            // 创建角色
            'createRole.title': '创建AI虚拟角色',
            'createRole.name': '角色名称',
            'createRole.gender': '性别',
            'createRole.male': '男',
            'createRole.female': '女',
            'createRole.secret': '保密',
            'createRole.avatar': '头像选择',
            'createRole.persona': '人设设定',
            'createRole.personaPlaceholder': '请用几句话描述你的AI角色，例如：他是一个来自未来的侦探，说话严谨，但内心很温柔。',
            'createRole.templateSelect': '选择模板',
            'createRole.corePersona': '一句话核心人设',
            'createRole.customPersona': '自定义人设设定',
            
            // 创建模式选择
            'createMode.title': '选择创建模式',
            'createMode.templateTitle': '使用模板创建',
            'createMode.templateDesc': '推荐！快速创建高质量角色',
            'createMode.customTitle': '完全自定义',
            'createMode.customDesc': '适合Prompt专家',
            
            // 聊天页面
            'chat.aiIndicator': 'AI',
            'chat.inputPlaceholder': '输入消息...',
            'chat.suggestions': '智能建议',
            'chat.typing': '正在输入...',
            'chat.sendMessage': '发送消息',
            'chat.getSuggestions': '获取回复建议',
            'chat.deleteChatConfirm': '确定要删除这个会话吗？',
            'chat.deleteMessage': '删除消息',
            'chat.messageDeleted': '消息已删除',
            'chat.noMessages': '还没有消息，开始聊天吧！',
            
            // 设置页面
            'settings.title': '设置',
            'settings.userId': '用户ID',
            'settings.userIdCopied': '用户ID已复制',
            'settings.appSettings': '应用设置',
            'settings.language': '语言/Language',
            'settings.selectLanguage': '选择语言',
            'settings.support': '支持与业务',
            'settings.contactSales': '联系销售',
            'settings.logout': '退出登录',
            'settings.logoutConfirm': '确定要退出登录吗？',
            
            // 联系销售
            'contactSales.title': '获取专属解决方案',
            'contactSales.description': '请留下您的手机号码，我们的解决方案专家将尽快与您联系。',
            'contactSales.phonePlaceholder': '请输入手机号码',
            'contactSales.success': '提交成功，感谢您的关注！',
            'contactSales.error': '提交失败，请稍后再试',
            
            // 消息提示
            'message.loginSuccess': '登录成功',
            'message.registerSuccess': '注册成功',
            'message.loginFailed': '登录失败，请检查账号密码',
            'message.registerFailed': '注册失败，请稍后再试',
            'message.passwordMismatch': '两次密码输入不一致',
            'message.invalidEmail': '请输入有效的邮箱地址',
            'message.passwordTooShort': '密码长度不能少于6位',
            'message.createRoleSuccess': '创建角色成功',
            'message.createRoleFailed': '创建角色失败',
            'message.fieldRequired': '此字段为必填项',
            'message.networkError': '网络错误，请检查网络连接',
            'message.unknownError': '未知错误，请稍后再试',
        },
        
        'en-US': {
            // Common
            loading: 'Loading...',
            'common.cancel': 'Cancel',
            'common.save': 'Save',
            'common.submit': 'Submit',
            'common.confirm': 'Confirm',
            'common.delete': 'Delete',
            'common.edit': 'Edit',
            'common.back': 'Back',
            
            // App title
            'app.title': 'AI Chat',
            
            // Authentication
            'auth.email': 'Email or Phone',
            'auth.password': 'Password',
            'auth.confirmPassword': 'Confirm Password',
            'auth.login': 'Login',
            'auth.register': 'Register',
            
            // Login page
            'login.subtitle': 'Start chatting with AI virtual characters',
            'login.noAccount': 'No account?',
            
            // Register page
            'register.title': 'Create Account',
            'register.subtitle': 'Join AI Chat to start experiencing',
            'register.hasAccount': 'Already have an account?',
            
            // Navigation
            'nav.roles': 'Roles',
            'nav.chat': 'Chat',
            'nav.settings': 'Settings',
            
            // Roles page
            'roles.title': 'AI Roles',
            'roles.public': 'Public Roles',
            'roles.my': 'My Roles',
            'roles.create': 'Create',
            'roles.createRole': 'Create AI Virtual Character',
            'roles.startChat': 'Start Chat',
            'roles.age': 'years old',
            'roles.tags': 'Tags',
            
            // Create role
            'createRole.title': 'Create AI Virtual Character',
            'createRole.name': 'Character Name',
            'createRole.gender': 'Gender',
            'createRole.male': 'Male',
            'createRole.female': 'Female',
            'createRole.secret': 'Secret',
            'createRole.avatar': 'Avatar Selection',
            'createRole.persona': 'Character Setting',
            'createRole.personaPlaceholder': 'Describe your AI character in a few sentences, e.g.: He is a detective from the future, speaks rigorously, but has a gentle heart.',
            'createRole.templateSelect': 'Select Template',
            'createRole.corePersona': 'One-sentence Core Persona',
            'createRole.customPersona': 'Custom Persona Setting',
            
            // Create mode selection
            'createMode.title': 'Choose Creation Mode',
            'createMode.templateTitle': 'Create using Template',
            'createMode.templateDesc': 'Recommended! Quick creation of high-quality characters',
            'createMode.customTitle': 'Fully Custom',
            'createMode.customDesc': 'Suitable for Prompt experts',
            
            // Chat page
            'chat.aiIndicator': 'AI',
            'chat.inputPlaceholder': 'Type a message...',
            'chat.suggestions': 'Smart Suggestions',
            'chat.typing': 'Typing...',
            'chat.sendMessage': 'Send Message',
            'chat.getSuggestions': 'Get Reply Suggestions',
            'chat.deleteChatConfirm': 'Are you sure you want to delete this conversation?',
            'chat.deleteMessage': 'Delete Message',
            'chat.messageDeleted': 'Message deleted',
            'chat.noMessages': 'No messages yet, start chatting!',
            
            // Settings page
            'settings.title': 'Settings',
            'settings.userId': 'User ID',
            'settings.userIdCopied': 'User ID copied',
            'settings.appSettings': 'App Settings',
            'settings.language': 'Language/Language',
            'settings.selectLanguage': 'Select Language',
            'settings.support': 'Support & Business',
            'settings.contactSales': 'Contact Sales',
            'settings.logout': 'Logout',
            'settings.logoutConfirm': 'Are you sure you want to logout?',
            
            // Contact sales
            'contactSales.title': 'Get Exclusive Solutions',
            'contactSales.description': 'Please leave your phone number, and our solution experts will contact you as soon as possible.',
            'contactSales.phonePlaceholder': 'Please enter your phone number',
            'contactSales.success': 'Submitted successfully, thank you for your attention!',
            'contactSales.error': 'Submission failed, please try again later',
            
            // Messages
            'message.loginSuccess': 'Login successful',
            'message.registerSuccess': 'Registration successful',
            'message.loginFailed': 'Login failed, please check your credentials',
            'message.registerFailed': 'Registration failed, please try again later',
            'message.passwordMismatch': 'Passwords do not match',
            'message.invalidEmail': 'Please enter a valid email address',
            'message.passwordTooShort': 'Password must be at least 6 characters',
            'message.createRoleSuccess': 'Role created successfully',
            'message.createRoleFailed': 'Failed to create role',
            'message.fieldRequired': 'This field is required',
            'message.networkError': 'Network error, please check your connection',
            'message.unknownError': 'Unknown error, please try again later',
        },
        
        'ar-SA': {
            // Common
            loading: 'جاري التحميل...',
            'common.cancel': 'إلغاء',
            'common.save': 'حفظ',
            'common.submit': 'إرسال',
            'common.confirm': 'تأكيد',
            'common.delete': 'حذف',
            'common.edit': 'تحرير',
            'common.back': 'رجوع',
            
            // App title
            'app.title': 'AI Chat',
            
            // Authentication
            'auth.email': 'البريد الإلكتروني أو الهاتف',
            'auth.password': 'كلمة المرور',
            'auth.confirmPassword': 'تأكيد كلمة المرور',
            'auth.login': 'تسجيل الدخول',
            'auth.register': 'التسجيل',
            
            // Login page
            'login.subtitle': 'ابدأ المحادثة مع الشخصيات الافتراضية الذكية',
            'login.noAccount': 'لا تملك حساب؟',
            
            // Register page
            'register.title': 'إنشاء حساب',
            'register.subtitle': 'انضم إلى AI Chat لبدء التجربة',
            'register.hasAccount': 'لديك حساب بالفعل؟',
            
            // Navigation
            'nav.roles': 'الأدوار',
            'nav.chat': 'المحادثة',
            'nav.settings': 'الإعدادات',
            
            // Roles page
            'roles.title': 'أدوار الذكاء الاصطناعي',
            'roles.public': 'الأدوار العامة',
            'roles.my': 'أدواري',
            'roles.create': 'إنشاء',
            'roles.createRole': 'إنشاء شخصية افتراضية ذكية',
            'roles.startChat': 'بدء المحادثة',
            'roles.age': 'سنة',
            'roles.tags': 'العلامات',
            
            // Create role
            'createRole.title': 'إنشاء شخصية افتراضية ذكية',
            'createRole.name': 'اسم الشخصية',
            'createRole.gender': 'الجنس',
            'createRole.male': 'ذكر',
            'createRole.female': 'أنثى',
            'createRole.secret': 'سري',
            'createRole.avatar': 'اختيار الصورة الرمزية',
            'createRole.persona': 'إعداد الشخصية',
            'createRole.personaPlaceholder': 'صف شخصيتك الذكية في بضع جمل، مثل: هو محقق من المستقبل، يتحدث بصرامة، لكن لديه قلب لطيف.',
            'createRole.templateSelect': 'اختيار القالب',
            'createRole.corePersona': 'شخصية قلبية واحدة',
            'createRole.customPersona': 'إعداد شخصية مخصصة',
            
            // Create mode selection
            'createMode.title': 'اختيار وضع الإنشاء',
            'createMode.templateTitle': 'إنشاء باستخدام القالب',
            'createMode.templateDesc': 'موصى به! إنشاء أحرف عالية الجودة بسرعة',
            'createMode.customTitle': 'الكامل المخصص',
            'createMode.customDesc': 'مناسب لمحامي البرمجة',
            
            // Chat page
            'chat.aiIndicator': 'AI',
            'chat.inputPlaceholder': 'اكتب رسالة...',
            'chat.suggestions': 'اقتراحات ذكية',
            'chat.typing': 'يكتب...',
            'chat.sendMessage': 'إرسال رسالة',
            'chat.getSuggestions': 'الحصول على اقتراحات الرد',
            'chat.deleteChatConfirm': 'هل أنت متأكد من أنك تريد حذف هذه المحادثة؟',
            'chat.deleteMessage': 'حذف الرسالة',
            'chat.messageDeleted': 'تم حذف الرسالة',
            'chat.noMessages': 'لا توجد رسائل بعد، ابدأ المحادثة!',
            
            // Settings page
            'settings.title': 'الإعدادات',
            'settings.userId': 'معرف المستخدم',
            'settings.userIdCopied': 'تم نسخ معرف المستخدم',
            'settings.appSettings': 'إعدادات التطبيق',
            'settings.language': 'اللغة/Language',
            'settings.selectLanguage': 'اختر اللغة',
            'settings.support': 'الدعم والأعمال',
            'settings.contactSales': 'اتصل بالمبيعات',
            'settings.logout': 'تسجيل الخروج',
            'settings.logoutConfirm': 'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
            
            // Contact sales
            'contactSales.title': 'احصل على حلول حصرية',
            'contactSales.description': 'يرجى ترك رقم هاتفك، وسيتصل بك خبراء الحلول في أقرب وقت ممكن.',
            'contactSales.phonePlaceholder': 'يرجى إدخال رقم هاتفك',
            'contactSales.success': 'تم الإرسال بنجاح، شكرا لاهتمامك!',
            'contactSales.error': 'فشل الإرسال، يرجى المحاولة مرة أخرى لاحقا',
            
            // Messages
            'message.loginSuccess': 'تم تسجيل الدخول بنجاح',
            'message.registerSuccess': 'تم التسجيل بنجاح',
            'message.loginFailed': 'فشل تسجيل الدخول، يرجى التحقق من بيانات الاعتماد',
            'message.registerFailed': 'فشل التسجيل، يرجى المحاولة مرة أخرى لاحقا',
            'message.passwordMismatch': 'كلمات المرور غير متطابقة',
            'message.invalidEmail': 'يرجى إدخال عنوان بريد إلكتروني صحيح',
            'message.passwordTooShort': 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
            'message.createRoleSuccess': 'تم إنشاء الدور بنجاح',
            'message.createRoleFailed': 'فشل في إنشاء الدور',
            'message.fieldRequired': 'هذا الحقل مطلوب',
            'message.networkError': 'خطأ في الشبكة، يرجى التحقق من الاتصال',
            'message.unknownError': 'خطأ غير معروف، يرجى المحاولة مرة أخرى لاحقا',
        }
    },
    
    // 获取翻译文本
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    },
    
    // 设置语言
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.updateUI();
    },
    
    // 初始化语言
    init() {
        const savedLang = localStorage.getItem('language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        }
        this.updateUI();
    },
    
    // 更新UI文本
    updateUI() {
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== key) {
                element.textContent = translation;
            }
        });
        
        // 更新所有带有 data-i18n-placeholder 属性的元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation !== key) {
                element.placeholder = translation;
            }
        });
        
        // 更新HTML语言属性
        document.documentElement.lang = this.currentLanguage;
        
        // 更新文档标题
        document.title = this.t('app.title') + ' - ' + this.t('login.subtitle');
        
        // 更新当前语言显示
        const currentLangElement = document.getElementById('current-language');
        if (currentLangElement) {
            const langNames = {
                'zh-CN': '简体中文',
                'en-US': 'English',
                'ar-SA': 'العربية'
            };
            currentLangElement.textContent = langNames[this.currentLanguage] || this.currentLanguage;
        }
        
        // 更新RTL支持
        if (this.currentLanguage === 'ar-SA') {
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl');
        } else {
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl');
        }
    }
};

// 确保在DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}
