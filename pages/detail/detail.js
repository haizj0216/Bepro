var t = function(t) {
  if (t && t.__esModule) return t;
  var e = {};
  if (null != t) for (var r in t) if (Object.prototype.hasOwnProperty.call(t, r)) {
      var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
      a.get || a.set ? Object.defineProperty(e, r, a) : e[r] = t[r];
  }
  return e.default = t, e;
}(require("../../utils/wx.js"));

function e(t, e, r, a, n, o, i) {
  try {
      var s = t[o](i), u = s.value;
  } catch (t) {
      return void r(t);
  }
  s.done ? e(u) : Promise.resolve(u).then(a, n);
}

function r(t) {
  return function() {
      var r = this, a = arguments;
      return new Promise(function(n, o) {
          var i = t.apply(r, a);
          function s(t) {
              e(i, n, o, s, u, "next", t);
          }
          function u(t) {
              e(i, n, o, s, u, "throw", t);
          }
          s(void 0);
      });
  };
}

var a = getApp();

Page({
  options: {
      from: ""
  },
  data: {
      images: [],
      id: 0,
      carouselCurrent: 0,
      name: "",
      sub_title: "",
      des: "",
      price: "",
      volume: 0,
      attributes: [],
      formula: {},
      cartNum: 0,
      currentProductExistInCart: 0,
      canbuy: !0,
      loading: !0,
      category: "",
      is_recommond: !1,
      iphoneX: a.globalData.systemInfo.iphoneX,
      goods: {
          item_code: "1"
      },
      show: !1,
      goodsPush: !1
  },
  onLoad: function() {
      var e = r(t.regeneratorRuntime.mark(function e(r) {
          var n, o;
          return t.regeneratorRuntime.wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return t.default.showLoading(), e.next = 3, t.default.request({
                      url: "productDetail",
                      method: "POST",
                      data: {
                          product_id: r.id || 48
                      }
                  });

                case 3:
                  0 === (n = e.sent).code && (o = n.data, console.log("商品详情", o), this.setData({
                      loading: !1,
                      images: JSON.parse(o.imgs),
                      id: o.id,
                      name: o.name,
                      sub_title: o.sub_title,
                      des: o.description,
                      price: o.price,
                      volume: o.volume,
                      category: o.category,
                      is_recommond: !!o.is_recommond,
                      canbuy: o.status && o.stock > 0,
                      formula: (i = void 0, i = o.attributes.find(function(t) {
                          return "formula" === t.en_name;
                      }), i && (i.content = i.content.split("\n").map(function(t) {
                          return t.split("\t");
                      }), console.log("formula.content", i.content)), i),
                      attributes: o.attributes.filter(function(t) {
                          return "formula" !== t.en_name;
                      }).sort(function(t, e) {
                          return t.sort - e.sort;
                      }).map(function(t) {
                          return t.content = JSON.parse(t.content), 2 === t.type && (t.content = t.content.map(function(t) {
                              return {
                                  image: t instanceof Array,
                                  data: t
                              };
                          })), t;
                      }),
                      goods: {
                          item_code: "".concat(o.id),
                          title: o.name,
                          desc: o.description,
                          category_list: [ o.category ],
                          image_list: JSON.parse(o.imgs),
                          src_mini_program_path: "/pages/detail/detail?id=".concat(o.id)
                      },
                      goodsPush: !!o.push_hwq
                  }), a.sensors.track("commodityDetail", {
                      commodity_name: o.name,
                      commodity_type: o.type,
                      commodity_price: o.price,
                      page_source: r.from || "产品分享点击"
                  }), t.default.hideLoading()), this.options = r, this.getCartNum();

                case 7:
                case "end":
                  return e.stop();
              }
              var i;
          }, e, this);
      }));
      return function(t) {
          return e.apply(this, arguments);
      };
  }(),
  getCartNum: function() {
      var e = r(t.regeneratorRuntime.mark(function e() {
          var r, a, n = this;
          return t.regeneratorRuntime.wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, t.default.request({
                      url: "cartList",
                      method: "POST"
                  });

                case 2:
                  0 === (r = e.sent).code && (a = r.data.list.find(function(t) {
                      return t.product_id === n.data.id;
                  }), console.log("cartCurrentProduct", a), this.setData({
                      cartNum: r.data.list.reduce(function(t, e) {
                          return t + e.num;
                      }, 0),
                      currentProductExistInCart: a && a.num || 0
                  }));

                case 4:
                case "end":
                  return e.stop();
              }
          }, e, this);
      }));
      return function() {
          return e.apply(this, arguments);
      };
  }(),
  onCarouselChange: function(t) {
      var e = t.detail.current;
      this.setData({
          carouselCurrent: e
      });
  },
  showFormulaTable: function(t) {
      this.selectComponent("#modal").show();
  },
  addToCart: function() {
      var e = r(t.regeneratorRuntime.mark(function e(r) {
          return t.regeneratorRuntime.wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, this.getUserInfo();

                case 2:
                  if (e.sent) {
                      e.next = 5;
                      break;
                  }
                  return e.abrupt("return");

                case 5:
                  if (a.sensors.track("productPageAdd", {
                      commodity_name: this.data.name,
                      commodity_type: this.data.category,
                      commodity_price: this.data.price,
                      page_before_product_page_add: this.options.from || "产品分享点击",
                      if_recommendation_product: this.data.is_recommond,
                      if_out_of_stock: !this.data.canbuy
                  }), !r.detail) {
                      e.next = 14;
                      break;
                  }
                  if (this.data.canbuy) {
                      e.next = 10;
                      break;
                  }
                  return t.default.showToast({
                      title: "商品缺货",
                      icon: "none"
                  }), e.abrupt("return");

                case 10:
                  return e.next = 12, t.default.request({
                      url: "addToCart",
                      method: "POST",
                      data: {
                          product_id: this.data.id,
                          num: this.data.currentProductExistInCart + 1
                      }
                  });

                case 12:
                  0 === e.sent.code ? (t.default.showToast({
                      title: "加购成功"
                  }), this.getCartNum()) : t.default.showToast({
                      icon: "none",
                      title: "加购失败"
                  });

                case 14:
                case "end":
                  return e.stop();
              }
          }, e, this);
      }));
      return function(t) {
          return e.apply(this, arguments);
      };
  }(),
  getUserInfo: function() {
      var e = r(t.regeneratorRuntime.mark(function e() {
          var r, a, n;
          return t.regeneratorRuntime.wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (!t.default.getStorageSync("token")) {
                      e.next = 3;
                      break;
                  }
                  return e.abrupt("return", !0);

                case 3:
                  return e.next = 5, t.default.login();

                case 5:
                  if (!((r = e.sent).errMsg.toLowerCase().indexOf("ok") > -1)) {
                      e.next = 19;
                      break;
                  }
                  return e.next = 9, t.default.getUserInfo();

                case 9:
                  if (!((a = e.sent).errMsg.toLowerCase().indexOf("ok") > -1)) {
                      e.next = 19;
                      break;
                  }
                  return e.next = 13, t.default.request({
                      url: "login",
                      method: "POST",
                      data: {
                          code: r.code,
                          iv: a.iv,
                          encryptedData: a.encryptedData
                      }
                  });

                case 13:
                  if (0 !== (n = e.sent).code) {
                      e.next = 19;
                      break;
                  }
                  return t.default.setStorage({
                      key: "token",
                      data: n.data.token
                  }), t.default.setStorage({
                      key: "userInfo",
                      data: JSON.stringify(a.userInfo)
                  }), e.abrupt("return", !0);

                case 19:
                  return t.default.showToast({
                      title: "授权失败，请重试"
                  }), e.abrupt("return", !1);

                case 21:
                case "end":
                  return e.stop();
              }
          }, e);
      }));
      return function() {
          return e.apply(this, arguments);
      };
  }(),
  goPayment: function(e) {
      if (a.sensors.track("productPageClickBuy", {
          commodity_name: this.data.name,
          commodity_type: this.data.category,
          commodity_price: this.data.price,
          if_recommendation_product: this.data.is_recommond,
          page_before_product_page_add: this.options.from || "产品分享点击",
          if_out_of_stock: !this.data.canbuy
      }), e.detail) {
          if (!this.data.canbuy) return void t.default.showToast({
              icon: "none",
              title: "商品缺货"
          });
          t.default.navigateTo({
              url: "/pages/payment/payment?products=".concat(JSON.stringify([ {
                  product_id: this.data.id,
                  num: 1
              } ]))
          });
      }
  },
  goHome: function() {
      t.default.switchTab({
          url: "/pages/index/index"
      });
  },
  goCart: function() {
      t.default.switchTab({
          url: "/pages/cart/cart"
      });
  },
  shareProduct: function() {
      this.data.goodsPush ? this.setData({
          show: !0
      }) : this.shareProductReport();
  },
  shareProductReport: function() {
      var e = getCurrentPages(), r = t.default.getStorageSync("backenUserInfo");
      a.sensors.track("shareCommodity", {
          commodity_name: this.data.name,
          commodity_type: this.data.category,
          commodity_price: this.data.price,
          $share_depth: e.length,
          $share_distinct_id: r.user_id,
          $share_url_path: "/pages/detail/detail?id=" + this.data.id
      }), this.hidePopup();
  },
  hidePopup: function() {
      var t = this;
      if (this.data.show) {
          if ("android" === a.globalData.systemInfo.platform) return void setTimeout(function() {
              t.setData({
                  show: !1
              });
          }, 100);
          this.setData({
              show: !1
          });
      }
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
      return {
          path: "/pages/detail/detail?id=".concat(this.data.id),
          imageUrl: this.data.images[0]
      };
  }
});