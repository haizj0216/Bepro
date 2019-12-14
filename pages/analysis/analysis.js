// pages/analysis/analysis.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    faceresult: [
      [{
        icon: "/images/icon_skin_maokong.png",
        name: "毛孔",
        score: "1",
      }, {
        icon: "/images/icon_skin_heitou.png",
        name: "黑头",
        score: "0",
      }],
      [{
        icon: "/images/icon_skin_eye.png",
        name: "细纹",
        score: "1",
      }, {
        icon: "/images/icon_skin_doudou.png",
        name: "痘痘",
        score: "0",
      }],
      [{
        icon: "/images/icon_skin_seban.png",
        name: "色斑",
        score: "2",
      }, {
        icon: "/images/icon_skin_fanhong.png",
        name: "泛红",
        score: "",
      }],
      [{
        icon: "/images/icon_skin_yanquan.png",
        name: "黑眼圈",
        score: "2",
      }, {
        icon: "/images/icon_skin_falingwen.png",
        name: "法令纹",
        score: "1",
      }]
    ],
    faceanalysis: null,
    analysisresult: "作为资深的夜行动物，生活已经对你痛下狠手啦。皮肤急救刻不容缓，但是病急也不能乱投医，猛药背后肯定要付出代价的，EWG级别原料产品，特别适合现在的你，对自己好一点，才是最正经的罗曼史",
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      userInfo: app.globalData.userInfo,
      faceanalysis: app.globalData.analysis
    })
    console.log(faceanalysis);
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