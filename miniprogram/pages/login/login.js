Page({
  data: {
    // 表单数据
    name: '',
    phone: '',
    agree: true, // 默认同意协议
    
    // 状态
    canLogin: false,
    loading: false,
    loadingText: '登录中...',
    
    // 当前时间
    currentTime: '12:00'
  },

  onLoad: function() {
    // 获取当前时间
    this.updateCurrentTime();
    // 每秒更新一次时间
    this.timeInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
    
    // 检查本地存储的用户信息
    this.checkLocalStorage();
  },

  onUnload: function() {
    // 清除定时器
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  },

  // 更新当前时间
  updateCurrentTime: function() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.setData({
      currentTime: `${hours}:${minutes}`
    });
  },

  // 检查本地存储
  checkLocalStorage: function() {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    
    if (token && userInfo) {
      // 有登录信息，跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },

  // 姓名输入
  onNameInput: function(e) {
    this.setData({
      name: e.detail.value
    }, () => {
      this.checkLoginStatus();
    });
  },

  // 手机号输入
  onPhoneInput: function(e) {
    let phone = e.detail.value;
    // 限制输入数字
    phone = phone.replace(/[^\d]/g, '');
    
    this.setData({
      phone: phone
    }, () => {
      this.checkLoginStatus();
    });
  },

  // 检查是否可以登录
  checkLoginStatus: function() {
    const { name, phone, agree } = this.data;
    const canLogin = name.length > 0 && phone.length === 11 && agree;
    
    this.setData({
      canLogin: canLogin
    });
  },

  // 协议勾选
  onAgreementChange: function(e) {
    const checked = e.detail.value.includes('agree');
    this.setData({
      agree: checked
    }, () => {
      this.checkLoginStatus();
    });
  },

  // 查看用户协议
  onShowAgreement: function() {
    wx.showModal({
      title: '用户协议',
      content: '感谢您使用小A助手。在使用前，请仔细阅读并同意本协议。本协议约定您与本公司之间关于软件服务使用及相关事宜的权利义务。',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 查看隐私政策
  onShowPrivacy: function() {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    });
  },

  // 登录按钮点击
  onLogin: function() {
    if (!this.data.canLogin) return;
    
    const { name, phone } = this.data;
    
    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return;
    }
    
    // 显示加载状态
    this.setData({
      loading: true,
      loadingText: '登录中...'
    });
    
    // 模拟登录请求（实际项目中应替换为真实的API调用）
    setTimeout(() => {
      // 模拟登录成功
      const userInfo = {
        name: name,
        phone: phone,
        userId: 'USER_' + Date.now()
      };
      
      // 保存用户信息到本地存储
      wx.setStorageSync('token', 'TOKEN_' + Date.now());
      wx.setStorageSync('userInfo', userInfo);
      
      this.setData({
        loading: false
      }, () => {
        // 登录成功提示
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
          success: () => {
            // 跳转到首页
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index'
              });
            }, 1500);
          }
        });
      });
    }, 1500);
  },

  // 注册按钮点击
  onRegister: function() {
    // 跳转到注册页面或显示注册弹窗
    wx.showModal({
      title: '注册提示',
      content: '本应用首次登录即自动注册，如需注册新账户，请使用不同的手机号登录。',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 快速登录（用于测试）
  onQuickLogin: function() {
    this.setData({
      name: '张三',
      phone: '13800138000',
      agree: true
    }, () => {
      this.checkLoginStatus();
    });
  }
});