Page({
  data: {
    collegeList: ['自动化学院', '计算机学院', '电子信息学院', '机械工程学院', '管理学院'],
    gradeList: ['大一', '大二', '大三', '大四', '研究生'],
    groupList: ['前端组', '后端组', 'UI/UX设计组', '产品组', '算法组'],
    collegeIndex: 0,
    gradeIndex: 0,
    groupIndex: 0,
    wordCount: 0
  },

  // 学院选择
  bindCollegeChange(e) {
    this.setData({
      collegeIndex: e.detail.value
    })
  },

  // 年级选择
  bindGradeChange(e) {
    this.setData({
      gradeIndex: e.detail.value
    })
  },

  // 组别选择
  bindGroupChange(e) {
    this.setData({
      groupIndex: e.detail.value
    })
  },

  // 统计字数
  countWords(e) {
    const length = e.detail.value.length
    this.setData({
      wordCount: length
    })
  },

  // 表单提交
  formSubmit(e) {
    const formData = e.detail.value
    console.log('表单数据：', formData)

    // 简单校验
    if (!formData.name || !formData.contact || !formData.studentId || !formData.majorClass || !formData.introduction) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    // 这里可以发送请求到后端
    wx.showLoading({
      title: '提交中...',
    })

    // 模拟网络请求
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })
      
      // 清空表单（可选）
      this.setData({
        collegeIndex: 0,
        gradeIndex: 0,
        groupIndex: 0,
        wordCount: 0
      })

      // 跳转或重置逻辑
      // wx.navigateBack()
    }, 1500)
  }
})