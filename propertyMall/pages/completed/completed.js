// pages/completed/completed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    completedList: [],
    showMessage: "数据加载中"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 10000
    });

    //请求服务端 接口
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bbaffff9495ba5402eb73cb/property/completedList', //仅为示例，并非真实的接口地址
      data: {
        userName: '1111',
        password: '22222'
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("----------");
        var list = res.data.completedList;
        var msg = "";
        console.log(res.data.completedList.length);
        if (list.length == 0) {
          msg = "暂无数据";
        }
        that.setData({
          completedList: list,
          showMessage: msg
        });
        wx.hideToast();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})