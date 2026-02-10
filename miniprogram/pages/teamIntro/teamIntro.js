Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1, // 当前选中的选项卡（默认“组别介绍”）
    introContent: "" // 团队介绍输入内容
  },

  /**
   * 切换选项卡
   */
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
  },

  /**
   * 输入团队介绍内容
   */
  onInput(e) {
    this.setData({
      introContent: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  }
});