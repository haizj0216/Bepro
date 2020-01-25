// pages/question/question.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {},
    sex: 1,
    zone:"",
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
    images: [{
      id: 1,
      name: "干燥",
      img: "../../images/icon_question_ganzao.png",
      img_s:"../../images/icon_question_ganzao_s.png",
      checked: false,
    }, {
      id: 2,
      name: "泛红",
      img: "../../images/icon_skin_fanhong.png",
      img_s:"../../images/icon_skin_fanhong_s.png",
      checked: false,
    }, {
      id: 3,
      name: "容易出油",
      img: "../../images/icon_question_fayou.png",
      img_s:"../../images/icon_question_fayou_s.png",
      checked: false,
    }, {
      id: 4,
      name: "毛孔显著",
      img: "../../images/icon_skin_maokong.png",
      img_s:"../../images/icon_skin_maokong_s.png",
      checked: false,
    }, {
      id: 5,
      name: "色斑",
      img: "../../images/icon_skin_seban.png",
      img_s:"../../images/icon_skin_seban_s.png",
      checked: false,
    }, {
      id: 6,
      name: "痘痘",
      img: "../../images/icon_skin_doudou.png",
      img_s:"../../images/icon_skin_doudou_s.png",
      checked: false,
    }, {
      id: 7,
      name: "暗沉",
      img: "../../images/icon_question_anchen.png",
      img_s:"../../images/icon_question_anchen_s.png",
      checked: false,
    }, {
      id: 8,
      name: "粗糙",
      img: "../../images/icon_question_cuchao.png",
      img_s:"../../images/icon_question_cuchao_s.png",
      checked: false,
    }, {
      id: 9,
      name: "黑眼圈",
      img: "../../images/icon_skin_eye.png",
      img_s:"../../images/icon_skin_eye_s.png",
      checked: false,
    }, {
      id: 10,
      name: "皱纹",
      img: "../../images/icon_question_zouwen.png",
      img_s:"../../images/icon_question_zouwen_s.png",
      checked: false,
    }, {
      id: 11,
      name: "刺痒",
      img: "../../images/icon_question_songchi.png",
      img_s:"../../images/icon_question_songchi_s.png",
      checked: false,
    }, {
      id: 12,
      name: "黑头",
      img: "../../images/icon_skin_heitou.png",
      img_s:"../../images/icon_skin_heitou_s.png",
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
    var question = JSON.parse(options.question);
    this.setData({
      age:question.age,
      sex:question.sex,
      name:question.name,
      zone:question.zone,
      sleepValue:question.sleep_time,
      sunValue:question.shine_time,
      phoneValue:question.electronics_time
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
    
    var skin_question = [];
    var index = 0;
    for (let i = 0; i < this.data.images.length; i++) {
      if (this.data.images[i].checked == true) {
        skin_question[index] = this.data.images[i].id
        index++
      }
    }
    var skinQuestion = skin_question.join(',')
     
    
    var questiondata = {
      age: that.data.age + 1,
      sex: that.data.sex,
      zone: that.data.zone,
      sleep_time: that.data.sleepValue + 1,
      shine_time: that.data.sunValue + 1,
      electronics_time: that.data.phoneValue + 1,
      skin_question: skinQuestion,
      name: that.data.name,
    }
    console.log(questiondata)
    wx.setStorage({
      key: 'question',
      data: questiondata
    })
    wx.navigateTo({
      url: '../test_photo/test_photo'
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