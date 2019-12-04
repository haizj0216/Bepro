// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [{
      name: "干燥",
      img: "../../images/keyboard_0_new.png"
    }, {
      name: "泛红",
      img: "../../images/keyboard_1_new.png"
    }, {
      name: "容易出油",
      img: "../../images/keyboard_2_new.png"
    }, {
      name: "毛孔显著",
      img: "../../images/keyboard_3_new.png"
    }, {
      name: "肤质粗糙",
      img: "../../images/keyboard_4_new.png"
    }, {
      name: "痘痘肌",
      img: "../../images/keyboard_5_new.png"
    }, {
      name: "暗沉",
      img: "../../images/keyboard_6_new.png"
    }, {
      name: "色斑",
      img: "../../images/keyboard_7_new.png"
    }, {
      name: "黑眼圈",
      img: "../../images/keyboard_8_new.png"
    }, {
      name: "皱纹",
      img: "../../images/keyboard_9_new.png"
    }, {
      name: "松弛",
      img: "../../images/keyboard_10_new.png"
    }, {
      name: "松弛",
      img: "../../images/keyboard_11_new.png"
    }],
    texts: ["紧绷","舒适", "泛油"],
    
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


  onSwitch(event) {
    this.setData({
      active: event.detail.index
    });
  }
})