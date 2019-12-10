// pages/test_baseinfo/test_1.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ages: [{
      name: " 小于20"
    }, {
      name: " 21-35"
    }, {
      name: "36-45"
    }, {
      name: "46-55"
    }, {
      name: "大于55"
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: 'XITBZ-3SBLG-4R3QN-IXXPJ-TD5TE-QUFPR'
    });
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))

        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      this.gettitude();
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })


                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          this.gettitude();
        } else {
          this.gettitude();

        }
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
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {

      },
    })
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

  data: {
    region: ['', '', ''],
    customItem: '全部',
  },

  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },

  toTest2: function() {
    wx.navigateTo({
      url: '../test_photo/test_photo'
    })
  },

  onChange(event) {
    const {
      key
    } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  },

  gettitude: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: function(res) {
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        vm.getlocal(latitude, longitude);
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {},
    })
  },

  getlocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        console.log(res);
        let province = res.result.address_component.province;
        let city = res.result.address_component.city;
        let district = res.result.address_component.district;
        vm.setData({
          region:[province, city, district]
        });
      },
      fail: function(e) {
        console.log(e);
      }
    });
  },
})