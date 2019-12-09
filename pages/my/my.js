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

var n = require("../../utils/util"), a = getApp(), o = ["待支付", "待发货", "发货中", "待收货", "已完成", "已关闭", "已取消"];

Page({
  showRequest: !1,
  page: 1,
  data: {
    orderList: [],
    userInfo: {},
    loading: !0,
    hasDoneQ: !0
  },
  onLoad: function () {
    var e = r(t.regeneratorRuntime.mark(function e(r) {
      var n;
      return t.regeneratorRuntime.wrap(function (e) {
        for (; ;) switch (e.prev = e.next) {
          case 0:
            (n = t.default.getStorageSync("userInfo")) && (n = JSON.parse(n), this.setData({
              userInfo: n
            })), this.getOrderList();

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
  },
  getOrderList: function () {
    var e = r(t.regeneratorRuntime.mark(function e() {
      var r, n, a, o = this;
      return t.regeneratorRuntime.wrap(function (e) {
        for (; ;) switch (e.prev = e.next) {
          case 0:
            return t.default.showTabBar(), this.data.loading && t.default.showLoading(), r = t.default.getStorageSync("hasFinishQ"),
              n = {}, e.prev = 4, e.next = 7, t.default.request({
                url: "orderList",
                data: {
                  page_size: 20,
                  page: this.page
                }
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
            0 === n.code && (a = n.data.list.map(function (t) {
              return o.transData(t);
            }), this.setData({
              orderList: 1 === this.page ? a : this.data.orderList.concat(a),
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
    t.statusText = o[t.status - 1], 0 !== t.after_sale_status && 500 !== t.after_sale_status && (t.statusText = "售后中"),
      t.createTime = n.formatTime(1e3 * t.ctime), t.productSnapshotList = t.productSnapshotList.map(function (t) {
        return Object.assign({}, {
          quantity: t.num
        }, t.contentObj);
      });
    try {
      t.address = JSON.parse(t.address), t.fullAddress = "".concat(t.address.province, " ").concat(t.address.city, " ").concat(t.address.area, " ").concat(t.address.address);
    } catch (t) {
      console.log("parse Address Error", t);
    }
    return t.hasRecomment = t.productSnapshotList.some(function (t) {
      return !!t.is_recommend;
    }), t;
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
    var e = r(t.regeneratorRuntime.mark(function e(r) {
      var n, a, o;
      return t.regeneratorRuntime.wrap(function (e) {
        for (; ;) switch (e.prev = e.next) {
          case 0:
            return console.log("orderReload", r), e.next = 3, t.default.request({
              url: "orderDetail",
              data: {
                order_id: r.detail
              }
            });

          case 3:
            0 === (n = e.sent).code && (a = this.transData(n.data.order_info), o = this.data.orderList.map(function (t) {
              return t.id === a.id ? a : t;
            }), this.setData({
              orderList: o
            })), console.log("orderDetail", n);

          case 6:
          case "end":
            return e.stop();
        }
      }, e, this);
    }));
    return function (t) {
      return e.apply(this, arguments);
    };
  }(),
  onReady: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () {
    console.log("onReachBottom"), this.page++ , console.log("onReachBottom", this.page),
      this.getOrderList();
  },
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index",
      imageUrl: "https://cdn.effortless.cn/assets/images/coupon-image.jpg"
    };
  }
});