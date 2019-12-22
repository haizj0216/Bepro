// pages/question/question.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {},
    sex: "2",
    sexs: [{
      value: 1,
      name: "女",
      checked: true
    }, {
      value: 2,
      name: "男",
      checked: false
    }],
    region: [],
    ageRange: ['<20', '21~35', '36~45', '46~55', '>55'],
    age: '<20',
    sunRange: ['<0.5小时', '0.5~1小时', '1~3小时', '>3小时'],
    sunValue: '<0.5小时',
    phoneRange: ['<3小时', '3~6小时', '>6小时'],
    phoneValue: '<3小时',
    sleepRange: ['<6小时', '6~8小时', '>8小时'],
    sleepValue: '<6小时',
    images: [{
      id: 1,
      name: "干燥",
      img: "../../images/icon_question_ganzao.png",
      checked: false,
    }, {
      id: 2,
      name: "泛红",
      img: "../../images/icon_skin_fanhong.png",
      checked: false,
    }, {
      id: 3,
      name: "容易出油",
      img: "../../images/icon_question_fayou.png",
      checked: false,
    }, {
      id: 4,
      name: "毛孔显著",
      img: "../../images/icon_skin_maokong.png",
      checked: false,
    }, {
      id: 5,
      name: "色斑",
      img: "../../images/icon_skin_seban.png",
      checked: false,
    }, {
      id: 6,
      name: "痘痘",
      img: "../../images/icon_skin_doudou.png",
      checked: false,
    }, {
      id: 7,
      name: "暗沉",
      img: "../../images/icon_question_anchen.png",
      checked: false,
    }, {
      id: 8,
      name: "色斑",
      img: "../../images/icon_skin_seban.png",
      checked: false,
    }, {
      id: 9,
      name: "黑眼圈",
      img: "../../images/icon_skin_yanquan.png",
      checked: false,
    }, {
      id: 10,
      name: "皱纹",
      img: "../../images/icon_question_zouwen.png",
      checked: false,
    }, {
      id: 11,
      name: "松弛",
      img: "../../images/icon_question_songchi.png",
      checked: false,
    }, {
      id: 12,
      name: "",
      img: "",
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

    sleeps: [{
      id: 1,
      name: "小于8小时",
      checked: false
    }, {
      id: 2,
      name: "大于8小时",
      checked: false
    }],

    phones: [{
      id: 1,
      name: "小于3小时",
      checked: false
    }, {
      id: 2,
      name: "大于3小时",
      checked: false
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  onSwitch(event) {
    this.setData({
      active: event.detail.index
    });
  },

  radioChange: function (e) {
    e.detail.value
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

  setSleepSelected(event) {
    let id = event.currentTarget.dataset.id;
    for (let i = 0; i < this.data.sleeps.length; i++) {
      if (this.data.sleeps[i].id == id) {
        this.data.sleeps[i].checked = true;
      } else {
        this.data.sleeps[i].checked = false;
      }
    }
    this.setData({
      sleeps: this.data.sleeps,
    })
  },

  setPhoneSelected(event) {
    let id = event.currentTarget.dataset.id;
    for (let i = 0; i < this.data.phones.length; i++) {
      if (this.data.phones[i].id == id) {
        this.data.phones[i].checked = true;
      } else {
        this.data.phones[i].checked = false;
      }
    }
    this.setData({
      phones: this.data.phones,
    })
  },

  toNext: function () {
    let that = this;
    var questiondata = {
      city: that.region,
      age: that.age,
      sex: that.sex,
    }
    this.setData({
      question: questiondata,
    })
    wx.navigateTo({
      url: '../test_photo/test_photo?question=' + question
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
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

  gettitude: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: function (res) {
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        vm.getlocal(latitude, longitude);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {},
    })
  },

  getlocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res);
        let province = res.result.address_component.province;
        let city = res.result.address_component.city;
        let district = res.result.address_component.district;
        vm.setData({
          region: [province, city, district]
        });
      },
      fail: function (e) {
        console.log(e);
      }
    });
  },

  onAgeChange: function (e) {
    console.log(e.detail.value), this.setData({
      age: e.detail.value
    });
  },

  onSunChange: function (e) {
    console.log(e.detail.value),
      this.setData({
        sunValue: e.detail.value
      });
  },

  onPhoneChange: function (e) {
    console.log(e.detail.value),
      this.setData({
        phoneValue: e.detail.value
      });
  },

  onSleepChange: function (e) {
    console.log(e.detail.value),
      this.setData({
        sleepValue: e.detail.value
      });
  },
})