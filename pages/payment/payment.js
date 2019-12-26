var e = function(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
      var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
      a.get || a.set ? Object.defineProperty(t, r, a) : t[r] = e[r];
  }
  return t.default = e, t;
}(require("../../utils/wx.js"));

function t(e, t, r, a, s, n, i) {
  try {
      var o = e[n](i), d = o.value;
  } catch (e) {
      return void r(e);
  }
  o.done ? t(d) : Promise.resolve(d).then(a, s);
}

function r(e) {
  return function() {
      var r = this, a = arguments;
      return new Promise(function(s, n) {
          var i = e.apply(r, a);
          function o(e) {
              t(i, s, n, o, d, "next", e);
          }
          function d(e) {
              t(i, s, n, o, d, "throw", e);
          }
          o(void 0);
      });
  };
}

require("../../utils/lib/number");

var a = getApp();

Page({
  orderId: "",
  products: [],
  previewMsg: "无忧无虑每一天 :)",
  previewNickname: "",
  data: {
      products: [],
      hasDefaultAddress: !1,
      msg: "无忧无虑每一天 :)",
      isUseScore: !1,
      orderPreview: {
          address: {}
      },
      nickname: "",
      hasUsefulCoupon: !1,
      couponList: [],
      selectCoupon: {},
      displayPayPrice: 0,
      loading: !0,
      list: [],
      productlist:[]
  },
  onLoad: function() {
      var t = r(e.regeneratorRuntime.mark(function t(r) {
          var a;
          return e.regeneratorRuntime.wrap(function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  console.log(r), (a = e.default.getStorageSync("qData")) && (a = JSON.parse(a) || {}, 
                  this.previewNickname = a.q1 || "", this.setData({
                      nickname: this.previewNickname
                  })), this.products = JSON.parse(r.products), this.getOrderPerview();

                case 5:
                case "end":
                  return t.stop();
              }
          }, t, this);
      }));
      return function(e) {
          return t.apply(this, arguments);
      };
  }(),
  onShow: function() {
      var t = this, r = e.default.getStorageSync("reSelectAddress");
      if (r) {
          try {
              r = JSON.parse(r);
              var a = this.data.orderPreview;
              a.address = r, this.setData({
                  orderPreview: a,
                  hasDefaultAddress: !0
              });
          } catch (e) {
              console.log(e);
          }
          e.default.removeStorageSync("reSelectAddress");
      }
      e.default.getStorageSync("delAddressId") && (this.getOrderPerview(), e.default.removeStorageSync("delAddressId"));
      var s = e.default.getStorageSync("selectCouponId");
      if (s) {
          var n = this.data.couponList.find(function(e) {
              return parseInt(e.id) === parseInt(s);
          });
          e.default.removeStorageSync("selectCouponId"), this.setData({
              selectCoupon: n
          }, function() {
              t.getOrderPerview();
          });
      };
      this.mockdata();
  },
  getOrderPerview: function() {
      var t = r(e.regeneratorRuntime.mark(function t() {
          var r, a, s, n, i, o, d = this;
          return e.regeneratorRuntime.wrap(function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return this.data.loading && e.default.showLoading(), r = {
                      product_info: this.products,
                      use_score: this.data.isUseScore ? 1 : 0
                  }, this.data.selectCoupon && this.data.selectCoupon.id && (r.user_coupon_id = this.data.selectCoupon.id), 
                  t.next = 5, e.default.request({
                      url: "orderPreview",
                      data: r
                  });

                case 5:
                  if (0 !== (a = t.sent).code) {
                      t.next = 19;
                      break;
                  }
                  return (s = a.data).canUseScore = s.can_use_score, s.promotion = parseInt(s.can_use_score / 20), 
                  t.next = 12, e.default.request({
                      url: "getUseFulCouponList",
                      data: {
                          order_price: s.total_product_price
                      }
                  });

                case 12:
                  n = t.sent, i = !1, 0 === n.code && (i = !!n.data.list.length), o = s.product_list.map(function(e) {
                      return e.quantity = d.products.find(function(t) {
                          return t.product_id === e.id;
                      }).num, e;
                  }), this.data.orderPreview && this.data.orderPreview.address && this.data.orderPreview.address.id && (s.address = this.data.orderPreview.address), 
                  this.setData({
                      orderPreview: s,
                      hasDefaultAddress: !!s.address,
                      hasUsefulCoupon: i,
                      couponList: n.data.list,
                      displayPayPrice: s.pay_price,
                      loading: !1,
                      list: o
                  }), e.default.hideLoading();

                case 19:
                  console.log("orderPreview", a);

                case 20:
                case "end":
                  return t.stop();
              }
          }, t, this);
      }));
      return function() {
          return t.apply(this, arguments);
      };
  }(),
  triggerMsgModal: function() {
      a.sensors.track("clickButton", {
          name_of_button: "点击定制留言"
      }), this.selectComponent("#modal").show();
  },
  triggerHideModal: function(e) {
      a.sensors.track("sumbitMessage", {
          if_change_message_name: this.data.nickname !== this.previewNickname,
          message_detail: this.data.msg,
          if_success: !e.currentTarget.dataset.cancel
      }), e.currentTarget.dataset.cancel ? this.setData({
          msg: this.previewMsg,
          nickname: this.previewNickname
      }) : (this.previewMsg = this.data.msg, this.previewNickname = this.data.nickname), 
      this.selectComponent("#modal").hide();
  },
  changeMsg: function(e) {
      if (/^[a-zA-Z]/.test(e.detail.value)) {
          if (e.detail.value.length > 20) return e.detail.value.slice(0, 20);
      } else if (e.detail.value.length > 14) return e.detail.value.slice(0, 14);
      this.setData({
          msg: e.detail.value
      });
  },
  changeName: function(e) {
      var t = this.checkNameLength(e.detail.value), r = t.str;
      if (t.length > 12) return r;
      this.setData({
          nickname: e.detail.value
      });
  },
  checkNameLength: function(e) {
      for (var t = 0, r = "", a = 0; a < e.length; a++) {
          var s = e.charAt(a);
          /^[\u0000-\u00ff]$/.test(s) ? t += 1 : t += 2, !r && t > 12 && (r = e.slice(0, a));
      }
      return {
          str: r,
          length: t
      };
  },
  onSelectScoreUse: function(e) {
      var t = this, r = e.detail.value;
      this.setData({
          isUseScore: r
      }, function() {
          t.getOrderPerview();
      });
  },
  onPriceChange: function() {},
  goNewAddress: function() {
      e.default.navigateTo({
          url: "/pages/newaddress/newaddress?from=payment"
      });
  },
  goCoupon: function() {
      this.data.hasUsefulCoupon && e.default.navigateTo({
          url: "/pages/coupon/coupon?amount=".concat(this.data.orderPreview.total_product_price)
      });
  },
  goAddressList: function() {
      this.data.hasDefaultAddress && e.default.navigateTo({
          url: "/pages/address/address?addressId=".concat(this.data.orderPreview.address.id)
      });
  },
  payment: function() {
      var t = r(e.regeneratorRuntime.mark(function t() {
          var r, a, s, n;
          return e.regeneratorRuntime.wrap(function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  if (this.data.orderPreview && this.data.orderPreview.address && this.data.orderPreview.address.id) {
                      t.next = 3;
                      break;
                  }
                  return e.default.showToast({
                      icon: "none",
                      title: "请选择收货地址"
                  }), t.abrupt("return");

                case 3:
                  return r = {
                      name: "",
                      msg: ""
                  }, this.data.msg && (r.name = this.data.nickname, r.msg = this.data.msg), a = {
                      user_address_id: this.data.orderPreview.address.id,
                      leave_msg: JSON.stringify(r),
                      use_score: this.data.isUseScore ? 1 : 0,
                      product_info: this.products
                  }, this.data.selectCoupon && this.data.selectCoupon.id && (a.user_coupon_id = this.data.selectCoupon.id), 
                  t.next = 9, e.default.request({
                      url: "orderCreate",
                      data: a
                  });

                case 9:
                  if (0 !== (s = t.sent).code) {
                      t.next = 20;
                      break;
                  }
                  if (!s.data.no_pay) {
                      t.next = 15;
                      break;
                  }
                  return this.orderId = s.data.order_id, this.zeroModalShow(), t.abrupt("return");

                case 15:
                  e.default.removeStorageSync("selectCouponId"), e.default.removeStorageSync("reSelectAddress"), 
                  e.default.removeStorageSync("delAddressId"), n = s.data.payParams, e.default.requestPayment({
                      timeStamp: n.timeStamp + "",
                      nonceStr: n.nonceStr,
                      package: n.package,
                      signType: n.signType,
                      paySign: n.paySign,
                      success: function(t) {
                          console.log("payment success res", t), e.default.switchTab({
                              url: "/pages/my/my"
                          });
                      },
                      fail: function(t) {
                          e.default.switchTab({
                              url: "/pages/my/my"
                          });
                      },
                      complete: function(e) {}
                  });

                case 20:
                  console.log("data", s);

                case 21:
                case "end":
                  return t.stop();
              }
          }, t, this);
      }));
      return function() {
          return t.apply(this, arguments);
      };
  }(),
  zeroModalShow: function() {
      this.selectComponent("#zeroModal").show();
  },
  zeroModalHide: function() {
      this.selectComponent("#zeroModal").hide(), e.default.switchTab({
          url: "/pages/my/my"
      });
  },
  zeroPay: function() {
      var t = r(e.regeneratorRuntime.mark(function t() {
          return e.regeneratorRuntime.wrap(function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return t.next = 2, e.default.request({
                      url: "orderZeroPay",
                      data: {
                          order_id: this.orderId,
                          pay_type: 1
                      }
                  });

                case 2:
                  0 === t.sent.code && e.default.switchTab({
                      url: "/pages/my/my"
                  });

                case 4:
                case "end":
                  return t.stop();
              }
          }, t, this);
      }));
      return function() {
          return t.apply(this, arguments);
      };
  }(),
  onReady: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
      return {
          path: "/pages/home/home",
          imageUrl: "https://cdn.effortless.cn/assets/images/coupon-image.jpg"
      };
  },
  mockdata:function() {
    var lis = [{
        logo: "https://gd4.alicdn.com/imgextra/i2/0/TB1gQJTJpXXXXb4XFXXXXXXXXXX_!!0-item_pic.jpg",
        name: "BEPRO BASE EMULSION 基础乳液",
        sub_title: "主要作用成分介绍以及容量文字区域针对的皮肤属性能简短介绍文字区域",
        quantity: 1,
        num: 2,
        price: 100,
        selected: false,
        showSelect:false,
        status:true,
        stock:5,
        quantity:5
        
    }];
    this.setData({
        loading:0,
        productlist:lis
    })
    e.default.hideLoading()
  }
});