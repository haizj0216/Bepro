// pages/home1/home1.js

var t = function (t) {
  if (t && t.__esModule) return t;
  var e = {};
  if (null != t)
    for (var n in t)
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, n) : {};
        r.get || r.set ? Object.defineProperty(e, n, r) : e[n] = t[n];
      }
  return e.default = t, e;
}(require("../../utils/wx.js"));

function e(t, e, n, r, o, a, i) {
  try {
    var c = t[a](i),
      u = c.value;
  } catch (t) {
    return void n(t);
  }
  c.done ? e(u) : Promise.resolve(u).then(r, o);
}

function n(t) {
  return function () {
    var n = this,
      r = arguments;
    return new Promise(function (o, a) {
      var i = t.apply(n, r);

      function c(t) {
        e(i, o, a, c, u, "next", t);
      }

      function u(t) {
        e(i, o, a, c, u, "throw", t);
      }
      c(void 0);
    });
  };
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

    home_3: [{
        name: "无香精",
        img: "/images/home_3_xiangjing.png",
      },
      {
        name: "无激素",
        img: "/images/home_3_wujishu.png",
      },
      {
        name: "无色素",
        img: "/images/home_3_wuseshu.png",
      },
      {
        name: "无酒精",
        img: "/images/home_3_wujiujing.png",
      },
      {
        name: "无荧光剂",
        img: "/images/home_3_wuyinguangji.png",
      },
      {
        name: "无塑料微粒",
        img: "/images/home_3_wushuliao.png",
      }
    ],

    des: [{
      icons: [{
        name: "性别",
        icon: "p-1",
        img: "../../images/home_2_sex.png",

      }, {
        name: "年龄",
        icon: "p-2",
        img: "../../images/home_2_age.png",
      }, {
        name: "皮肤类型",
        icon: "p-3",
        img: "../../images/home_2_skin_class.png",
      }, {
        name: "皮肤问题",
        icon: "p-4",
        img: "../../images/home_2_skin_q.png",
      }],
      title: "个人因素"
    }, {
      icons: [{
        name: "温度",
        icon: "p-5",
        img: "../../images/home_2_tem.png",
      }, {
        name: "湿度",
        icon: "p-6",
        img: "../../images/home_2_shidu.png",
      }, {
        name: "日晒强度",
        icon: "p-7",
        img: "../../images/home_2_sun.png",
      }, {
        name: "空气质量",
        icon: "p-8",
        img: "../../images/home_2_air.png",
      }],
      title: "环境因素"
    }, {
      icons: [{
        name: "护肤习惯",
        icon: "p-10",
        img: "../../images/home_2_skin_p.png",
      }, {
        name: "运动频率",
        icon: "p-11",
        img: "../../images/home_2_sport.png",
      }, {
        name: "压力水平",
        icon: "p-12",
        img: "../../images/home_2_y.png",
      }],
      title: "生活方式"
    }],
    userInfo: {},
    hasUserInfo: false,
    hasDoneQ: !1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar();
    if (wx.getStorageSync("hasDoneQ")) {
      this.setData({
        hasDoneQ: 1
      })
    } else {
      this.getdata()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  onSwiperChange: function (t) {
    var n = t.detail.current;
    if (n == 2) {
      wx.showTabBar();
    } else {
      wx.hideTabBar();
    }
  },

  goQuestionnaire: function () {
    var token = wx.getStorageSync("token")
    if(token) {
      if (wx.getStorageSync("hasDoneQ")) {
        this.setData({
          hasDoneQ: 1
        })
      }
      wx.navigateTo({
        url: '/pages/question/question',
      })

    }
    
  },

  getdata: function () {
    let that = this
    token = wx.getStorageSync("token")
    if (token) {
      wx.showLoading()
      wx.request({
        url: n.apiUrl.testResult,
        method: "GET",
        header: {
          "token": token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success(res) {
          if (res.data.code == 99999 && res.data.data.analysisString) {
            that.setData({
              hasDoneQ: 1
            })
            wx.setStorageSync('hasDoneQ', 1)
          } else {
            that.setData({
              hasDoneQ: 0
            })
          }

        },
        fail(res) {

        },
        complete(res) {
          wx.hideLoading()
        }
      })
    }

  },

})