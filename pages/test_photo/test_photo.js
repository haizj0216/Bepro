// pages/test_photo/test_photo.js
const app = getApp()
var n = require("../../common/config.default");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList1: [],
    image:"",
    imageUrl:"",
    showCamera:false,
    showPop:true,
    question:{},
    analysis_result:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getStorage({
      key: 'question',
      success (res) {
        that.setData({
          question:res.data
        })
        console.log(res.data)
      }
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

  douploader:function(){
    // wx.request({
    //   url:n.apiUrl.uploadFile,
    //   method:"POST",
    //   data:{
    //     file:''
    //   },
    //   success(res){
        
    //   }
    // })
    let that = this
    var filePath = that.data.image
    wx.uploadFile({
      url:n.apiUrl.fileUpload + "?token=123",
      filePath:filePath,
      name:'file',
      success(res){
        console.log(res.data)
      }
    })
  },

  doget:function(){
    let that = this
    var result = JSON.stringify(that.data.analysis_result)
    wx.request({
      url:n.apiUrl.testSave+"?token=123",
      method:"POST",
      data:{
        name:that.data.question.name,
        sex:that.data.question.sex,
        age:that.data.question.age,
        zone:that.data.question.zone,
        photo:that.data.imageUrl,
        skinQuestion:that.data.question.skin_question,
        sleepTime:that.data.question.sleep_time,
        shineTime:that.data.question.shine_time,
        electronicsTime:that.data.question.electronics_time,
        analysisResult:result,
      },
      success(res){
        that.toTest2();
      },
      fail(res){

      }

    })
  },

  toTest2: function() {
    wx.hideLoading();
    wx.navigateTo({
      url: '../analysis/analysis'
    })
  },

  skinanalyze() {
    let that = this;
    wx.showLoading();
    wx.request({
      url: 'https://api-cn.faceplusplus.com/facepp/v1/skinanalyze?api_key=JYYPRM-kN-WY69UKEvx16R3COm2yqZim&api_secret=p6OCDBZd5bl2U1X-p8BLDuNUCNdFYN0N&image_url=https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/f636afc379310a557919c6dfb44543a9822610df.jpg',
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
        console.log(res.data);
        that.saveAnalysis(res.data.result);
        that.updateAnalysis(res.data.result);
        that.doget();
      }

    })
  },

  saveAnalysis(result) {
    app.globalData.analysis = result;
    this.setData({
      analysis_result:result,
    })
  },

  chooseimage:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        if(tempFilePaths.length > 0) {
          that.setData({
            image:tempFilePaths[0],
            showCamera: false,
          });
        }
      },
    })
  },

  error:function(event) {
    wx.showToast({
      title: "相机未授权！",
    })
  },

  takePhoto() {
    let that = this;
    let show = that.data.showCamera;
    if(!show) {
      that.setData({
        showCamera:true,
        image:"",
      })
    } else {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          console.log(res.tempImagePath)
          that.setData({
            image: res.tempImagePath,
          })
          that.setData({
            showCamera:false,
          })
        },
        fail:(msg)=>{
          wx.showToast({
            title: "相机拍照出错！！",
          })
        }

      })
    }
  },

  hidePop:function() {
    this.setData({
      showPop:false,
    })
    this.setData({
      showCamera:true,
    })
  },

  updateAnalysis(result) {
    let maokong = result.pores_left_cheek.confidence * 100;
    let falingwen = result.nasolabial_fold.confidence * 100;
    let heiyanquan = result.dark_circle.confidence * 100;
    let yandai = result.eye_pouch.confidence * 100;
    let seban = result.skin_spot.confidence * 100;
    let doudou = result.acne.confidence * 100;
    let xiwen = result.eye_finelines.confidence * 100;
    let blackhead = result.blackhead.confidence * 100;
    console.log(maokong);
  }
})