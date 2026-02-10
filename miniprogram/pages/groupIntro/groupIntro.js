Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 查看组别介绍
   */
  viewIntro() {
    wx.showModal({
      title: '运营组介绍',
      content: '运营组负责项目的日常运营、用户维护与活动策划，是连接产品与用户的核心桥梁。',
      showCancel: false,
      confirmText: '知道了'
    })
  },


  /**
   * 跳转到首页
   */
  goToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  /**
   * 跳转到我的页面
   */
  goToMy() {
    wx.switchTab({
      url: '/pages/my/my'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  }
})