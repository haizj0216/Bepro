var t = function (t) {
  if (t && t.__esModule) return t;
  var e = {};
  if (null != t) for (var r in t) if (Object.prototype.hasOwnProperty.call(t, r)) {
    var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
    n.get || n.set ? Object.defineProperty(e, r, n) : e[r] = t[r];
  }
  return e.default = t, e;
}(require("../../utils/wx.js"));

function e(t, e, r, n, a, o, s) {
  try {
    var i = t[o](s), u = i.value;
  } catch (t) {
    return void r(t);
  }
  i.done ? e(u) : Promise.resolve(u).then(n, a);
}

function r(t) {
  return function () {
    var r = this, n = arguments;
    return new Promise(function (a, o) {
      var s = t.apply(r, n);
      function i(t) {
        e(s, a, o, i, u, "next", t);
      }
      function u(t) {
        e(s, a, o, i, u, "throw", t);
      }
      i(void 0);
    });
  };
}

var net = require("../../common/config.default");

var n = require("../../utils/util"), a = getApp(), o = ["待支付", "待发货", "发货中", "待收货", "已完成", "已关闭", "已关闭","已退款", "已退款"];

Page({
  showRequest: !1,
  page: 1,
  data: {
    orderList: [],
    userInfo: {},
    loading: !0,
    hasDoneQ: !1
  },
  onLoad: function () {
    if(!wx.getStorageSync('token')) {
      return
    }
    var e = r(t.regeneratorRuntime.mark(function e(r) {
      var n;
      return t.regeneratorRuntime.wrap(function (e) {
        for (; ;) switch (e.prev = e.next) {
          case 0:
            this.getOrderList();
          case 3:
          case "end":
            return e.stop();
        }
      }, e, this);
    }));
    return function (t) {
      return e.apply(this, arguments);
    };
  }(),
  onShow: function () {
    this.showRequest && (this.page = 1, this.getOrderList()), this.showRequest = !0;
    // this.mockdata();
  },
  getOrderList: function () {
    var e = r(t.regeneratorRuntime.mark(function e() {
      var r, n, a, o = this;
      var token = wx.getStorageSync("token")
      return t.regeneratorRuntime.wrap(function (e) {
        for (; ;) switch (e.prev = e.next) {
          case 0:
            return t.default.showTabBar(), this.data.loading && t.default.showLoading(), r = t.default.getStorageSync("hasDoneQuestion"),
              n = {}, e.prev = 4, e.next = 7, t.default.request({
                url: net.apiUrl.orderList + "?token=" + token,
                method:"GET"
              });

          case 7:
            n = e.sent, e.next = 13;
            break;

          case 10:
            e.prev = 10, e.t0 = e.catch(4), n = {
              code: 0,
              data: {
                list: []
              }
            };

          case 13:
            99999 === n.code && (a = n.data.map(function (t) {
              return o.transData(t);
            }), this.setData({
              orderList: a,
              loading: !1,
              hasDoneQ: r
            })), t.default.hideLoading();

          case 15:
          case "end":
            return e.stop();
        }
      }, e, this, [[4, 10]]);
    }));
    return function () {
      return e.apply(this, arguments);
    };
  }(),
  transData: function (t) {
    var text;
    if(t.status == 1) {
      text = "待支付"
    } else if(t.status == 2) {
      if(t.expressStatus == 1) {
        text = "待发货"
      } else if(t.expressStatus == 4) {
        text = "已完成"
      } else {
        text = "待收货"
      }
    } else if(t.status == 3 || t.status == 4) {
      text = "已取消"
    } else if(t.status == 5 || t.status == 6) {
      text = "已关闭"
    } else{
      text = "已完成"
    }
    t.statusText = text;
     return t;
  },
  goCoupon: function () {
    t.default.navigateTo({
      url: "/pages/coupon/coupon"
    });
  },
  goReWard: function () {
    t.default.navigateTo({
      url: "/pages/reward/reward"
    });
  },
  goRecommendProduct: function () {
    t.default.navigateTo({
      url: "/pages/recommend/recommend?from=空我的"
    });
  },
  goContact: function () {
    a.sensors.track("clickButton", {
      name_of_button: "联系客服"
    });
  },
  orderReload: function () {
    this.getOrderList()
  },
  onReady: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { 
    this.getOrderList()
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
    
  },

});