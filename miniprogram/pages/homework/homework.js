Page({
  data: {
    isUploading: false,      // 是否正在上传
    uploadProgress: 0,       // 上传进度
    uploadedFiles: [],       // 已上传文件列表
    errorMsg: ''             // 错误提示
  },

  // 选择并上传文件
  chooseAndUploadFile() {
    const that = this;
    // 清空之前的错误提示
    this.setData({ errorMsg: '' });

    // 1. 选择文件
    wx.chooseMessageFile({
      count: 5,                // 最多选择5个文件
      type: 'all',             // 选择所有类型文件（image/video/audio/file）
      extension: [             // 可自定义允许的文件后缀
        'doc', 'docx', 'pdf', 'txt', 'jpg', 'png', 
        'mp4', 'mp3', 'xls', 'xlsx', 'ppt', 'pptx'
      ],
      success(res) {
        // 获取选择的文件列表
        const tempFiles = res.tempFiles;
        if (tempFiles.length === 0) return;

        that.setData({ isUploading: true });
        // 逐个上传文件
        tempFiles.forEach((file, index) => {
          that.uploadSingleFile(file, index, tempFiles.length);
        });
      },
      fail(err) {
        that.setData({ 
          isUploading: false,
          errorMsg: '文件选择失败：' + (err.errMsg || '未知错误')
        });
        console.error('选择文件失败：', err);
      }
    });
  },

  // 上传单个文件
  uploadSingleFile(file, fileIndex, totalCount) {
    const that = this;
    // 2. 上传文件到微信临时服务器
    wx.uploadFile({
      url: 'https://your-server-url.com/upload', // 替换为你的后端上传接口
      filePath: file.path,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
        // 可添加token等认证信息：'Authorization': 'Bearer ' + token
      },
      formData: {
        filename: file.name,
        filetype: file.type
      },
      // 上传进度回调
      progress(progressEvent) {
        const progress = Math.floor((progressEvent.totalBytesSent / progressEvent.totalBytesExpectedToSend) * 100);
        // 计算整体进度
        const overallProgress = Math.floor(((fileIndex * 100) + progress) / totalCount);
        that.setData({ uploadProgress: overallProgress });
      },
      success(res) {
        try {
          const data = JSON.parse(res.data);
          // 上传成功，添加到已上传列表
          if (res.statusCode === 200) {
            const newFile = {
              name: file.name,
              size: file.size,
              path: file.path,
              uploadRes: data
            };
            that.setData({
              uploadedFiles: [...that.data.uploadedFiles, newFile],
              uploadProgress: fileIndex + 1 === totalCount ? 100 : that.data.uploadProgress
            });
          } else {
            throw new Error(data.message || '上传失败');
          }
        } catch (e) {
          that.setData({ errorMsg: `文件 ${file.name} 上传失败：${e.message}` });
        }
      },
      fail(err) {
        that.setData({ 
          errorMsg: `文件 ${file.name} 上传失败：${err.errMsg}`
        });
        console.error('文件上传失败：', err);
      },
      complete() {
        // 所有文件上传完成后重置状态
        if (fileIndex + 1 === totalCount) {
          that.setData({ 
            isUploading: false,
            uploadProgress: 0
          });
        }
      }
    });
  },

  // 格式化文件大小（字节转KB/MB）
  formatSize(bytes) {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  }
});