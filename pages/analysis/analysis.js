// pages/analysis/analysis.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    faceresult: [
      [{
        icon: "/images/keyboard_0_new.png",
        name: "毛孔",
        score: "1",
      }, {
        icon: "/images/keyboard_1_new.png",
        name: "黑头",
        score: "0",
      }],
      [{
        icon: "/images/keyboard_2_new.png",
        name: "细纹",
        score: "1",
      }, {
        icon: "/images/keyboard_3_new.png",
        name: "法令纹",
        score: "1",
      }],
      [{
        icon: "/images/keyboard_4_new.png",
        name: "色斑",
        score: "2",
      }, {
        icon: "/images/keyboard_5_new.png",
        name: "肤质",
        score: "",
      }],
      [{
        icon: "/images/keyboard_6_new.png",
        name: "黑眼圈",
        score: "2",
      }, {
        icon: "/images/keyboard_7_new.png",
        name: "痘痘",
        score: "0",
      }]
    ],
    analysisresult: "",
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    setData({
      userInfo: app.globalData.userInfo
    })
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