// pages/repair/repair.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evalList: [{ // 存储图片
      tempFilePaths: [],
      imgList: []
    }],
    imgCount:12,
    showModal: false,
    imgNumber: 0,
    eventM: "",
    showImg: "",
    repairName: "",
    repairType: "请选择类别",
    texts: "至少5个字",
    min: 5, //最少字数
    max: 120 //最多字数 (根据自己需求改变)
  },
  //字数限制  
  inputs: function(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "不超过120个字"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  //添加图片
  joinPicture: function(e) {
    var count = this.data.imgCount;
    var index = e.currentTarget.dataset.index;
    var evalList = this.data.evalList;
    var that = this;
    var imgNumber = evalList[index].tempFilePaths;
    console.log("imgNumber:" + imgNumber);
    console.log("index:" + index);
    console.log("evalList:" + evalList);

    if (imgNumber.length >= count) {
      wx.showModal({
        title: '',
        content: '最多上传12张图片',
        showCancel: false,
      })
      return;
    }
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage("album", imgNumber);
          } else if (res.tapIndex == 1) {
            that.chooseWxImage("camera", imgNumber);
          }
        }
      }
    })
  },
  chooseWxImage: function(type, list) {
    var count = this.data.imgCount;
    var img = list;
    var len = img.length;
    var that = this;
    var evalList = this.data.evalList;
    wx.chooseImage({
      count: count,
      sizeType: ["original", "compressed"],
      sourceType: [type],
      success: function(res) {
        var addImg = res.tempFilePaths;
        var addLen = addImg.length;

        if ((len + addLen) > count) {
          for (var i = 0; i < (addLen - len); i++) {
            var str = {};
            str.pic = addImg[i];
            img.push(str);
          }
        } else {
          for (var j = 0; j < addLen; j++) {
            var str = {};
            str.pic = addImg[j];
            img.push(str);
          }
        }
        that.setData({
          evalList: evalList
        })
        that.upLoadImg(img);
      },
    })
  },
  upLoadImg: function(list) {
    var that = this;
    this.upload(that, list);
  },
  //多张图片上传
  upload: function(page, path) {
    var that = this;
    var curImgList = [];
    for (var i = 0; i < path.length; i++) {
      wx.showToast({
          icon: "loading",
          title: "正在上传"
        }),
        wx.uploadFile({
          url: app.globalData.subDomain + '/API/AppletApi.aspx', //接口处理在下面有写
          filePath: path[i].pic,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            douploadpic: '1'
          },
          success: function(res) {
            curImgList.push(res.data);
            var evalList = that.data.evalList;
            evalList[0].imgList = curImgList;
            that.setData({
              evalList: evalList
            })
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }
            var data = res.data
            page.setData({ //上传成功修改显示头像
              src: path[0]
              //src: "/pages/images/home.png"
            })
          },
          fail: function(e) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function() {
            wx.hideToast(); //隐藏Toast
          }
        })
    }
  },
  //删除图片 index 图片所在的位置
  clearImg: function(index) {
    //var index = e.currentTarget.dataset.index;

    var evalList = this.data.evalList;
    var img = evalList[0].tempFilePaths;
    img.splice(index, 1);

    this.setData({
      evalList: evalList
    })
    this.upLoadImg(img);
  },
  /**
   * 弹窗
   */
  showDialogBtn: function(e) {

    var showSrc = e.currentTarget.dataset.showSrc; //图片地址
    var imgnumber = e.currentTarget.dataset.imgNumber; //图片位置

    this.setData({
      showModal: true,
      showImg: showSrc,
      imgNumber: imgnumber
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function(e) {
    this.hideModal();
    var that = this;
    var imgnumber = that.data.imgNumber;
    console.log("\\\\" + imgnumber);
    this.clearImg(imgnumber);
  },
  //弹出选择类别
  open: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['灯具', '厕所', '门锁'],
      success: function(res) {
        if (!res.cancel) {
          console.log(res.tapIndex);
          var typeName = "请选择类别";

          switch (res.tapIndex) {
            case 0:
              typeName = "灯具";
              break;
            case 1:
              typeName = "厕所";
              break;
            case 2:
              typeName = "门锁";
              break;
              typeName = "请选择类别";
            default:

          }
          console.log(typeName);
          that.setData({
            repairType: typeName
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.selectedId;
    console.log(id + "<----");

    var showMsg="报修表单";

    if (id == 0) {
      showMsg = "个人报修";
       
    }else if(id==1){
      showMsg = "公共报修";
    }
    //设置显示标题
    // this.setData({
    //   repairName: showMsg
    // })
    wx.setNavigationBarTitle({
      title: showMsg
    })
  },

  //提交发布
  submitClick: function(e) {
    var evalList = this.data.evalList;
    var imgList = evalList[0].imgList;
    var imgPort = ""; //图片地址，多张以逗号分割
    if (imgList.length != 0) {
      for (var j = 0; j < imgList.length; j++) {
        imgPort = imgList[j] + "," + imgPort;
      }
    } else {
      imgPort = "";
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})