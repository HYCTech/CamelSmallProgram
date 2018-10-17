//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    wx.reLaunch({
      url: '/pages/index/index'
    })
  //  //请求服务端注册接口
  //   wx.request({
  //     url: 'https://www.easy-mock.com/mock/5bbaffff9495ba5402eb73cb/property/userRegister', //仅为示例，并非真实的接口地址
  //     data: {
  //       userName: '1111',
  //       password: '22222'
  //     },
  //     method: "POST",
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       console.log(res.data);
  //       wx.showModal({
  //         content: '注册成功',
  //         showCancel: false,
  //         success: function (res) {
  //           if (res.confirm) {
  //             console.log('确定');
  //             wx.reLaunch({
  //               url: '/pages/index/index'
  //             })
  //           }
  //         }
  //       });
  //     }
  //   })

  }
})
