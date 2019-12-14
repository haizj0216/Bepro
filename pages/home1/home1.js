// pages/home1/home1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    home_3: [{
        name: "无香精",
        img: "/images/home_3_xiangjing.png",
      },
      {
        name: "无激素",
        img: "/images/home_3_wujishu.png",
      },
      {
        name: "无色素",
        img: "/images/home_3_wuseshu.png",
      },
      {
        name: "无酒精",
        img: "/images/home_3_wujiujing.png",
      },
      {
        name: "无荧光剂",
        img: "/images/home_3_wuyinguangji.png",
      },
      {
        name: "无塑料微粒",
        img: "/images/home_3_wushuliao.png",
      }
    ],

    des: [{
      icons: [{
        name: "性别",
        icon: "p-1",
        img: "../../images/home_2_sex.png",

      }, {
        name: "年龄",
        icon: "p-2",
        img: "../../images/home_2_age.png",
      }, {
        name: "皮肤类型",
        icon: "p-3",
        img: "../../images/home_2_skin_class.png",
      }, {
        name: "皮肤问题",
        icon: "p-4",
        img: "../../images/home_2_skin_q.png",
      }],
      title: "个人因素"
    }, {
      icons: [{
        name: "温度",
        icon: "p-5",
        img: "../../images/home_2_tem.png",
      }, {
        name: "湿度",
        icon: "p-6",
        img: "../../images/home_2_shidu.png",
      }, {
        name: "日晒强度",
        icon: "p-7",
        img: "../../images/home_2_sun.png",
      }, {
        name: "空气质量",
        icon: "p-8",
        img: "../../images/home_2_air.png",
      }],
      title: "环境因素"
    }, {
      icons: [{
        name: "护肤习惯",
        icon: "p-10",
        img: "../../images/home_2_skin_p.png",
      }, {
        name: "运动频率",
        icon: "p-11",
        img: "../../images/home_2_sport.png",
      }, {
        name: "压力水平",
        icon: "p-12",
        img: "../../images/home_2_y.png",
      }],
      title: "生活方式"
    }],
    userInfo: {},
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideTabBar();

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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

  },

  onSwiperChange: function(t) {
    var n = t.detail.current;
    if (n == 2) {
      wx.showTabBar();
    } else {
      wx.hideTabBar();
    }
  },

  goQuestionnaire: function() {
    wx.navigateTo({
      url: '/pages/question/question',
    })
  }
})