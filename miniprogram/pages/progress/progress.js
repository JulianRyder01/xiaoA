Page({
  data: {},

  // 跳转到首页
  goToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },

  // 跳转到我的
  goToMy() {
    wx.switchTab({
      url: '/pages/my/my'
    });
  }
});