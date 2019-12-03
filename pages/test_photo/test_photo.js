// pages/test_photo/test_photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList1: [],
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

  oversize() {
    wx.showToast({ title: '文件超出大小限制', icon: 'none' });
  },

  beforeRead(event) {
    const {
      file,
      callback = () => {}
    } = event.detail;
    if (file.path.indexOf('jpeg') < 0) {
      wx.showToast({
        title: '请选择jpg图片上传',
        icon: 'none'
      });
      callback(false);
      return;
    }
    callback(true);
  },

  afterRead(event) {
    const {
      file,
      name
    } = event.detail;
    const fileList = this.data[`fileList${name}`];

    this.setData({
      [`fileList${name}`]: fileList.concat(file)
    });
  },

  delete(event) {
    const { index, name } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({ [`fileList${name}`]: fileList });
  },
  toTest2: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },

  clickPreview() { }

})