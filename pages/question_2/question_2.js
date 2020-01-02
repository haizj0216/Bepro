// pages/question/question.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {},
    zone:"",
    sex: 1,
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
    age: 0,
    sunRange: ['<0.5小时', '0.5~1小时', '1~3小时', '>3小时'],
    sunValue: 0,
    phoneRange: ['<3小时', '3~6小时', '>6小时'],
    phoneValue: 0,
    sleepRange: ['<6小时', '6~8小时', '>8小时'],
    sleepValue: 0,

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
    var question = JSON.parse(options.question);
    this.setData({
      age:question.age,
      sex:question.sex,
      name:question.name,
      zone:question.zone
    })
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
    var sexValue = e.detail.value == "女" ? 1:2
    this.setData({
      sex: sexValue
    })

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

  getName: function (e) {
    var val = e.detail.value
    this.setData({
      name: val,
    })
  },

  toNext: function () {
    let that = this;
    
    var questiondata = {
      age: that.data.age,
      sex: that.data.sex,
      zone: that.data.zone,
      sleep_time: that.data.sleepValue,
      shine_time: that.data.sunValue,
      electronics_time: that.data.phoneValue,
      name: that.data.name,
    }
    console.log(questiondata)
    
    wx.navigateTo({
      url: '../question_3/question_3?question=' + JSON.stringify(questiondata)
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