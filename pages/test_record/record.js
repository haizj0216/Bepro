require("../../@babel/runtime/helpers/Arrayincludes");

var t = function (t) {
  if (t && t.__esModule) return t;
  var e = {};
  if (null != t) for (var n in t) if (Object.prototype.hasOwnProperty.call(t, n)) {
    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, n) : {};
    r.get || r.set ? Object.defineProperty(e, n, r) : e[n] = t[n];
  }
  return e.default = t, e;
}(require("../../utils/wx.js"));

function e(t, e, n, r, a, i, o) {
  try {
    var s = t[i](o), c = s.value;
  } catch (t) {
    return void n(t);
  }
  s.done ? e(c) : Promise.resolve(c).then(r, a);
}

function n(t) {
  return function () {
    var n = this, r = arguments;
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
    }
  },
  onLoad: function () {
    this.init();
  },
  onShow: function () {
    this.needShowRequest && this.init(), this.needShowRequest = !0;
  },
  init: function () {
    var e = n(t.regeneratorRuntime.mark(function e() {
      var n, r;
      return t.regeneratorRuntime.wrap(function (e) {
        for (; ;) switch (e.prev = e.next) {
          case 0:
            if (n = t.default.getStorageSync("hasFinishQ")) {
              e.next = 4;
              break;
            }
            return this.setData({
              hasDoneQ: n
            }), e.abrupt("return");

          case 4:
            return e.next = 6, t.default.request({
              url: "recommentProducts",
              method: "POST"
            });

          case 6:
            0 === (r = e.sent).code && this.setData({
              recommendList: r.data.product_list.map(function (t) {
                return t.selected = !0, t.quantity = 1, t;
              }),
              solution: r.data.solution,
              hasDoneQ: n
            });

          case 8:
          case "end":
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
    var e = n(t.regeneratorRuntime.mark(function e() {
      var a, i, o, s;
      return t.regeneratorRuntime.wrap(function (e) {
        for (; ;) switch (e.prev = e.next) {
          case 0:
            return a = this.data.recommendList.filter(function (t) {
              return t.selected;
            }), i = [], o = 0, e.next = 5, Promise.all(a.map(function () {
              var e = n(t.regeneratorRuntime.mark(function e(n) {
                return t.regeneratorRuntime.wrap(function (e) {
                  for (; ;) switch (e.prev = e.next) {
                    case 0:
                      return i.includes(n.category) || i.push(n.category), o += n.quantity, r.sensors.track("oneclickAddDetail", {
                        commodity_name: n.name,
                        commodity_type: n.category,
                        commodity_price: n.price,
                        commodity_quantity: n.quantity,
                        if_out_of_stock: n.stock < n.quantity
                      }), e.next = 5, t.default.request({
                        url: "addToCartBuyNum",
                        method: "POST",
                        data: {
                          product_id: n.id,
                          num: n.quantity
                        }
                      });

                    case 5:
                      return e.abrupt("return", e.sent);

                    case 6:
                    case "end":
                      return e.stop();
                  }
                }, e);
              }));
              return function (t) {
                return e.apply(this, arguments);
              };
            }()));

          case 5:
            s = e.sent, r.sensors.track("oneclickAdd", {
              total_commodity_quantity: o,
              total_type_quantity: i.length,
              oneclick_add_page_name: "档案产品推荐页",
              if_oneclick_add_all: a.length === this.data.recommendList.length
            }), s.every(function (t) {
              return 0 === t.code;
            }) && t.default.switchTab({
              url: "/pages/cart/cart"
            });

          case 8:
          case "end":
            return e.stop();
        }
      }, e, this);
    }));
    return function () {
      return e.apply(this, arguments);
    };
  }(),
  goQuestionnaire: function () {
    t.default.navigateTo({
      url: "/pages/questionnaire/questionnaire"
    });
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
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index",
      imageUrl: "https://cdn.effortless.cn/assets/images/coupon-image.jpg"
    };
  }
});