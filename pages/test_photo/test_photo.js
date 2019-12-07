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
    wx.showToast({
      title: '文件超出大小限制',
      icon: 'none'
    });
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
    const {
      index,
      name
    } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({
      [`fileList${name}`]: fileList
    });
  },
  toTest2: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },

  skinanalyze() {
    wx.request({
      url: 'https://api-cn.faceplusplus.com/facepp/v1/skinanalyze?api_key=JYYPRM-kN-WY69UKEvx16R3COm2yqZim&api_secret=p6OCDBZd5bl2U1X-p8BLDuNUCNdFYN0N&image_url=https://5b0988e595225.cdn.sohucs.com/images/20180501/dc952082bdb542e6b1effea9e62410af.png',
      header: {
        'content-type': 'multipart/form-data'
      },
      method: 'POST',
      dataType: 'json',
      // data:{
      //   api_key:'JYYPRM-kN-WY69UKEvx16R3COm2yqZim',
      //   api_secret:'p6OCDBZd5bl2U1X-p8BLDuNUCNdFYN0N',
      //   image_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575624974981&di=de114370f310f4ee225c8cf0c73cb59f&imgtype=0&src=http%3A%2F%2Fupload.ct.youth.cn%2F2015%2F0831%2F1440999645254.jpg'
      // },
      success: function(res) {
        console.log(res.data)
        if (res.data.code == 0) {

        }
      }

    })
  },

  saveAnalysis() {
    wx.setStorage({
      key: 'analysis',
      data: '',
    })
  },


  clickPreview() {}

})