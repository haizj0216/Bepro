// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [{
      id: 1,
      name: "干燥",
      img: "../../images/keyboard_0_new.png",
      checked: false,
    }, {
      id: 2,
      name: "泛红",
      img: "../../images/keyboard_1_new.png",
      checked: false,
    }, {
      id: 3,
      name: "容易出油",
      img: "../../images/keyboard_2_new.png",
      checked: false,
    }, {
      id: 4,
      name: "毛孔显著",
      img: "../../images/keyboard_3_new.png",
      checked: false,
    }, {
      id: 5,
      name: "肤质粗糙",
      img: "../../images/keyboard_4_new.png",
      checked: false,
    }, {
      id: 6,
      name: "痘痘肌",
      img: "../../images/keyboard_5_new.png",
      checked: false,
    }, {
      id: 7,
      name: "暗沉",
      img: "../../images/keyboard_6_new.png",
      checked: false,
    }, {
      id: 8,
      name: "色斑",
      img: "../../images/keyboard_7_new.png",
      checked: false,
    }, {
      id: 9,
      name: "黑眼圈",
      img: "../../images/keyboard_8_new.png",
      checked: false,
    }, {
      id: 10,
      name: "皱纹",
      img: "../../images/keyboard_9_new.png",
      checked: false,
    }, {
      id: 11,
      name: "松弛",
      img: "../../images/keyboard_10_new.png",
      checked: false,
    }, {
      id: 12,
      name: "松弛",
      img: "../../images/keyboard_11_new.png",
      checked: false,
    }],
    texts: [{
      id: 1,
      name: "紧绷",
      checked: false
    }, {
      id: 2,
      name: "舒适",
      checked: false
    }, {
      id: 3,
      name: "泛油",
      checked: false
    }],
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
  },

  setChecked(event) {
    let id = event.currentTarget.dataset.id;
    for (let i = 0; i < this.data.images.length; i++) {
      if (this.data.images[i].id == id) {
        if (this.data.images[i].checked == false) {
          this.data.images[i].checked = true;
        } else {
          this.data.images[i].checked = false;
        }
      }
    }
    this.setData({
      images: this.data.images,
    })
  },
  setSelected(event) {
    let id = event.currentTarget.dataset.id;
    for (let i = 0; i < this.data.texts.length; i++) {
      if (this.data.texts[i].id == id) {
        this.data.texts[i].checked = true;
      } else {
        this.data.texts[i].checked = false;
      }
    }
    this.setData({
      texts: this.data.texts,
    })
  },

  toNext: function () {
    wx.navigateTo({
      url: '../sleep/sleep'
    })
  },
})