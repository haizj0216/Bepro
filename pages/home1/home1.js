// pages/home1/home1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_1: "https://www.kiehls.com.cn/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-kiehls-cn-Library/default/dw8024d4e1/images/HB/HBKLS20181119_2.jpg?sw=431&sh=2000&sm=fit",
    image_2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575788793957&di=f3b89a85603ec395cbf368eeb51e5af9&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F75%2F45%2F69A58PICv2i_1024.jpg",
    image_3: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575788793957&di=f3b89a85603ec395cbf368eeb51e5af9&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F75%2F45%2F69A58PICv2i_1024.jpg",

    image_person: [{
      name: "性别",
      img: "../../images/keyboard_0_new.png",
    }, {
      name: "年龄",
      img: "../../images/keyboard_1_new.png",
    }, {
      name: "皮肤类型",
      img: "../../images/keyboard_2_new.png",
    }, {
      name: "干燥",
      img: "../../images/keyboard_3_new.png",
    }],

    image_environment: [{
      name: "湿度",
      img: "../../images/keyboard_4_new.png",
    }, {
      name: "温度",
      img: "../../images/keyboard_5_new.png",
    }, {
      name: "UV",
      img: "../../images/keyboard_6_new.png",
    }, {
      name: "空气质量",
      img: "../../images/keyboard_7_new.png",
    }],

    image_life_style: [{
      name: "护肤习惯",
      img: "../../images/keyboard_8_new.png",
    }, {
      name: "化妆频率",
      img: "../../images/keyboard_9_new.png",
    }, {
      name: "运动频率",
      img: "../../images/keyboard_10_new.png",
    }, {
      name: "压力水平",
      img: "../../images/keyboard_11_new.png",
    }],

    des: [{
      icons: [{
        name: "性别",
        icon: "p-1",
        img: "../../images/keyboard_11_new.png",

      }, {
        name: "年龄",
        icon: "p-2",
        img: "../../images/keyboard_11_new.png",
      }, {
        name: "头皮类型",
        icon: "p-3",
        img: "../../images/keyboard_11_new.png",
      }, {
        name: "发质类型",
        icon: "p-4",
        img: "../../images/keyboard_11_new.png",
      }],
      title: "个人因素"
    }, {
      icons: [{
        name: "水质硬度",
        icon: "p-5",
        img: "../../images/keyboard_11_new.png",
      }, {
        name: "pH值",
        icon: "p-6",
        img: "../../images/keyboard_11_new.png",
      }, {
        name: "温度",
        icon: "p-7",
        img: "../../images/keyboard_11_new.png",
      }, {
        name: "湿度",
        icon: "p-8",
        img: "../../images/keyboard_11_new.png",
      }],
      title: "环境因素"
    }, {
      icons: [{
        name: "造型习惯",
        icon: "p-9",
        img: "../../images/keyboard_11_new.png",
      }, {
        name: "洗护习惯",
        icon: "p-10",
        img: "../../images/keyboard_11_new.png",
      }, {
        name: "运动频率",
        icon: "p-11",
        img: "../../images/keyboard_11_new.png",
      }, {
        name: "压力水平",
        icon: "p-12",
        img: "../../images/keyboard_11_new.png",
      }],
      title: "生活方式"
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideTabBar();
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
      url: '/pages/test_baseinfo/test_1',
    })
  }
})