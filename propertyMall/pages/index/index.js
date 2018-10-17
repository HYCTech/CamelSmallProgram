//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      '/pages/images/tooopen_sy_03.png',
      '/pages/images/tooopen_sy_02.png',
      '/pages/images/tooopen_sy_01.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    navItems: [{
        name: '家里报修',
        url: '/pages/images/start-01.png'
      },
      {
        name: '公共报修',
        url: '/pages/images/start-02.png',
        isSplot: true
      },
      {
        name: '公共维修意见',
        url: '/pages/images/start-03.png'
      },
      {
        name: '报修待处理',
        url: '/pages/images/start-04.png'
      },
      {
        name: '报修处理中',
        url: '/pages/images/start-05.png',
        isSplot: true
      },
      {
        name: '报修已完成',
        url: '/pages/images/start-06.png'
      }
    ]

  },
  //点击结算按钮
  gotoInfo: function(e) {
    var id = e.target.id;

    console.log(id);
     
    var goToUrl = "";
    switch (id) {
      case "0"://跳转到家里报修表单
        goToUrl = '/pages/repair/repair?selectedId=' + id;
        break;
      case "1"://跳转到公共报修表单
        goToUrl = '/pages/repair/repair?selectedId=' + id;
        break;
      case "2"://跳转到公共维修意见
        goToUrl = "/pages/opinion/opinion";
        break;
      case "3"://跳转到报修待处理
        goToUrl = '/pages/pending/pending';
        break;
      case "4"://跳转到报修处理中
        goToUrl = '/pages/underway/underway';
        break;
      case "5"://跳转到报修已完成
        goToUrl = '/pages/completed/completed';
        break;
      default: 
        goToUrl = '/pages/opinion/opinion';
        break;
    }
    //执行跳转界面
    wx.navigateTo({
      url: goToUrl
    });

  },
  onLoad: function() {
    console.log('onLoad')
  }

})