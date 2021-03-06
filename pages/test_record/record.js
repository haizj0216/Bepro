import * as echarts from '../../ec-canvas/echarts';
require("../../@babel/runtime/helpers/Arrayincludes");
var net = require("../../common/config.default");

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

function e(t, e, n, r, a, i, o) {
  try {
    var s = t[i](o),
      c = s.value;
  } catch (t) {
    return void n(t);
  }
  s.done ? e(c) : Promise.resolve(c).then(r, a);
}

function n(t) {
  return function () {
    var n = this,
      r = arguments;
    return new Promise(function (a, i) {
      var o = t.apply(n, r);

      function s(t) {
        e(o, a, i, s, c, "next", t);
      }

      function c(t) {
        e(o, a, i, s, c, "throw", t);
      }
      s(void 0);
    });
  };
}

var r = getApp();

Page({
  needShowRequest: !1,
  data: {
    recommendList: [],
    allSelect: !0,
    bodyHeight: r.globalData.systemInfo.showHeight,
    solution: "",
    hasDoneQ: !0,
    firstEndQ: !1,
    firstEndQStep: 0,
    modalContent: {
      key: "",
      des: ""
    },
    age: "",
    sex: "",
    city: "",
    scores: [],
    ec: {
      lazyLoad: true,
    },
    echartsComponnet: null,
    analysisresult: "",
    ageRange: ['<20', '21~35', '36~45', '46~55', '>55'],
    analysis_string:"",
    totalScore:0,
    userName:"",
  },
  onLoad: function (options) {
    
    this.init();
  },
  onShow: function () {
    this.needShowRequest && this.init(), this.needShowRequest = !0;
    // this.mokelist();
    // this.updateAnalysis();
  },
  init: function () {
    var e = n(t.regeneratorRuntime.mark(function e() {
      var n, r;
      return t.regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            
            var token = wx.getStorageSync("token")
            if(!token) {
              e.next = 8
              this.setData({
                hasDoneQ:!1
              })
              return
            }
            return e.next = 10,wx.showLoading(), t.default.request({
              url: net.apiUrl.testResult1 + "?token=" + token,
              method: "GET",
            });

          case 6:
           return 99999 === (r = e.sent).code && this.setData({
              recommendList: r.data.map(function (t) {
                return t.selected = !0, t.quantity = 1, t;
              }),
            });
          case 10:
            var token = wx.getStorageSync("token")
            return e.next = 6, 99999 === (r = e.sent).code, this.updateResult(r), t.default.request({
              url: net.apiUrl.recommendInfo1 + "?token=" + token,
              method: "GET",
            });
          case 8:
          case "end":
            wx.hideLoading();
            return e.stop();
        }
      }, e, this);
    }));
    return function () {
      return e.apply(this, arguments);
    };
  }(),
  onProductSelectChange: function (t) {
    var e = this.data.recommendList.map(function (e) {
      return e.id === t.detail.id && (e.selected = !e.selected), e;
    });
    this.setData({
      recommendList: e,
      allSelect: !e.some(function (t) {
        return !t.selected;
      })
    });
  },
  onAllSelectChange: function () {
    var t = !this.data.allSelect;
    this.setData({
      allSelect: t,
      recommendList: this.data.recommendList.map(function (e) {
        return e.selected = t, e;
      })
    });
  },
  onQuantityChange: function (t) {
    var e = this.data.recommendList.map(function (e) {
      return e.id === t.detail.id && (e.quantity = t.detail.quantity), e;
    });
    this.setData({
      recommendList: e
    });
  },

  addToCart: function () {
    wx.showLoading()
    let that = this
    var list
    list = this.data.recommendList.filter(function (t) {
      return t.selected;
    })
    var productList = []
    for (var i = 0; i < list.length; i++) {
      productList[i] = {
        productId: list[i].id,
        count: list[i].quantity
      }
    }
    var token = wx.getStorageSync("token")
    wx.request({
      url: net.apiHost + net.apiUrl.addCart + "?token=" + token,
      method: "POST",
      data: productList,
      success(res) {
        wx.switchTab({
          url: "/pages/cart/cart"
        });
      },
      fail(res) {

      },
      complete(res) {
        wx.hideLoading()
      }

    })
  },


  // addToCart: function () {
  //   var token = wx.getStorageSync("token")

  //   var e = n(t.regeneratorRuntime.mark(function e() {
  //     var a, i, o, s;
  //     return t.regeneratorRuntime.wrap(function (e) {
  //       for (;;) switch (e.prev = e.next) {
  //         case 0:
  //           return a = this.data.recommendList.filter(function (t) {
  //             return t.selected;
  //           }), i = [], o = 0, e.next = 5, Promise.all(a.map(function () {
  //             var e = n(t.regeneratorRuntime.mark(function e(n) {
  //               return t.regeneratorRuntime.wrap(function (e) {
  //                 for (;;) switch (e.prev = e.next) {
  //                   case 0:
  //                     return i.includes(n.category) || i.push(n.category), o += n.quantity, r.sensors.track("oneclickAddDetail", {
  //                       commodity_name: n.name,
  //                       commodity_type: n.category,
  //                       commodity_price: n.price,
  //                       commodity_quantity: n.quantity,
  //                       if_out_of_stock: n.stock < n.quantity
  //                     }), e.next = 5, t.default.request({
  //                       url: net.apiUrl.addCart1+ "?token="+token,
  //                       method: "POST",
  //                       data: {
  //                         productId: n.id,
  //                         count: n.quantity
  //                       }
  //                     });

  //                   case 5:
  //                     return e.abrupt("return", e.sent);

  //                   case 6:
  //                   case "end":
  //                     return e.stop();
  //                 }
  //               }, e);
  //             }));
  //             return function (t) {
  //               return e.apply(this, arguments);
  //             };
  //           }()));

  //         case 5:
  //           s = e.sent, r.sensors.track("oneclickAdd", {
  //             total_commodity_quantity: o,
  //             total_type_quantity: i.length,
  //             oneclick_add_page_name: "档案产品推荐页",
  //             if_oneclick_add_all: a.length === this.data.recommendList.length
  //           }), s.every(function (t) {
  //             return 0 === t.code;
  //           }) && t.default.switchTab({
  //             url: "/pages/cart/cart"
  //           });

  //         case 8:
  //         case "end":
  //           return e.stop();
  //       }
  //     }, e, this);
  //   }));
  //   return function () {
  //     return e.apply(this, arguments);
  //   };
  // }(),

  goQuestionnaire: function () {
    var token = wx.getStorageSync("token")
    if(token) {
      t.default.navigateTo({
        url: "/pages/question/question"
      });
    }
    
  },
  goUpdateProfile: function () {
    this.setData({
      firstEndQStep: 0
    });
  },
  modalShow: function (t) {
    var e = this;
    r.sensors.track("clickInfo", {
      name_of_clicked_info: t.detail.key
    }), this.setData({
      modalContent: t.detail
    }, function () {
      e.selectComponent("#modal").show();
    });
  },
  modalHide: function (t) {
    this.selectComponent("#modal").hide();
  },

  onShareAppMessage: function () {
    
  },
  
  updateanalysis(result) {
    if(result) {
      wx.setStorageSync('hasDoneQuestion', 1)
      let maokong = result.pores_left_cheek.confidence * 100;
      let falingwen = 100- result.nasolabial_fold.confidence * 100;
      let heiyanquan = result.dark_circle.confidence * 100;
      let yandai = result.eye_pouch.confidence * 100;
      let seban = result.skin_spot.confidence * 100;
      let doudou = result.acne.confidence * 100;
      let xiwen = 100- result.eye_finelines.confidence * 100;
      let blackhead = 100- result.blackhead.confidence * 100;
      let score = [parseInt(maokong), parseInt(blackhead), parseInt(xiwen), parseInt(doudou), parseInt(seban), parseInt(yandai), parseInt(heiyanquan), parseInt(falingwen)];
      let finalScore = (parseInt(maokong)+parseInt(blackhead)+parseInt(xiwen)+ parseInt(doudou)+ parseInt(seban)+ parseInt(yandai)+ parseInt(heiyanquan)+ parseInt(falingwen)) / 8
      console.log(score);
      this.setData({
        scores: score,
        hasDoneQ:!0,
        totalScore:parseInt(finalScore)
      })
      this.init_echarts();
      this.circleComponnet.initCircle();
    } else {
      this.setData({
        hasDoneQ:!1
      })
    }
    
  },

  updateResult(res) {
    let that = this
    if(res.data.analysisResult) {
      var result = JSON.parse(res.data.analysisResult)
      var date = new Date(res.data.testTime);
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      var createTime = year + "-" + month + "-" + day
      var sexValue = res.data.sex == 1 ? "女":"男"
      var ageValue = that.data.ageRange[res.data.age - 1]
      var regoin = res.data.city.split(",")
      
      that.setData({
        sex:sexValue,
        age:ageValue,
        city:regoin && regoin.length > 2 ? regoin[2] :"",
        solution: createTime,
        analysis_result: result,
        analysis_string: res.data.analysisString,
        userName:res.data.testName,
      })
      that.updateanalysis(result)
    } else {
      this.setData({
        hasDoneQ:!1
      })
    }
    
  },

  init_echarts: function () {
    if(this.echartsComponnet == null) {
      this.echartsComponnet = this.selectComponent('#mychart-dom-graph-record');
    }
    if(this.circleComponnet == null) {
      this.circleComponnet = this.selectComponent('#circle-wewle');

    }

    this.echartsComponnet.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      var option = {
        backgroundColor: "#ffffff",
        color: ["#37A2DA", "#FF9F7F"],
        borderColor: "#FFB6C1",
        tooltip: {},
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },

        radar: {
          // shape: 'circle',
          indicator: [{
              name: '毛孔',
              max: 100
            },
            {
              name: '黑头',
              max: 100
            },
            {
              name: '细纹',
              max: 100
            },
            {
              name: '痘痘',
              max: 100
            },
            {
              name: '色斑',
              max: 100
            },
            {
              name: '泛红',
              max: 100
            },
            {
              name: '黑眼圈',
              max: 100
            },
            {
              name: '法令纹',
              max: 100
            }
          ]
        },
        
        series: [{
          name: '皮肤',
          type: 'radar',
          data: [{
            value: this.data.scores,
            name: '皮肤'
          }],
          label: { 
            name:{
              fontSize:80,
              rich: {}
            }
          },
 
        }]
      };

      chart.setOption(option);
      return chart;
    })
  },


});