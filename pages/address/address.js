var e = function(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
      var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
      n.get || n.set ? Object.defineProperty(t, r, n) : t[r] = e[r];
  }
  return t.default = e, t;
}(require("../../utils/wx.js"));

function t(e, t, r, n, a, s, d) {
  try {
      var i = e[s](d), o = i.value;
  } catch (e) {
      return void r(e);
  }
  i.done ? t(o) : Promise.resolve(o).then(n, a);
}

function r(e) {
  return function() {
      var r = this, n = arguments;
      return new Promise(function(a, s) {
          var d = e.apply(r, n);
          function i(e) {
              t(d, a, s, i, o, "next", e);
          }
          function o(e) {
              t(d, a, s, i, o, "throw", e);
          }
          i(void 0);
      });
  };
}

Page({
  changeDirect: !1,
  orderId: 0,
  data: {
      listEmpty: !1,
      list: [],
      selected: 0,
      addressId: 0,
      onShow: !1
  },
  onLoad: function() {
      var t = r(e.regeneratorRuntime.mark(function t(r) {
          return e.regeneratorRuntime.wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return r.change && (this.changeDirect = !0, this.orderId = parseInt(r.orderId)), 
                  e.next = 3, this.getAddressList(r.addressId);

                case 3:
                  this.setData({
                      onShow: !0
                  });

                case 4:
                case "end":
                  return e.stop();
              }
          }, t, this);
      }));
      return function(e) {
          return t.apply(this, arguments);
      };
  }(),
  onShow: function() {
      this.data.onShow && this.getAddressList();
  },
  getAddressList: function() {
      var t = r(e.regeneratorRuntime.mark(function t(r) {
          var n, a, s, d;
          return e.regeneratorRuntime.wrap(function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return t.next = 2, e.default.request({
                      url: "addressList"
                  });

                case 2:
                  0 === (n = t.sent).code && (a = n.data.list, s = {
                      list: a
                  }, r && (d = a.findIndex(function(e) {
                      return parseInt(e.id) === parseInt(r);
                  }), s.selected = d > -1 ? d : 0, s.addressId = r), this.setData(s));

                case 4:
                case "end":
                  return t.stop();
              }
          }, t, this);
      }));
      return function(e) {
          return t.apply(this, arguments);
      };
  }(),
  goNewAddress: function() {
      var t = "";
      this.data.addressId && (t = "?selectAddressId=".concat(this.data.addressId)), e.default.navigateTo({
          url: "/pages/newAddress/newAddress".concat(t)
      });
  },
  onSelectedChange: function() {
      var t = r(e.regeneratorRuntime.mark(function t(r) {
          return e.regeneratorRuntime.wrap(function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  if (this.setData({
                      selected: r.currentTarget.dataset.index
                  }), !this.changeDirect) {
                      t.next = 7;
                      break;
                  }
                  return t.next = 4, e.default.request({
                      url: "orderChangeAddress",
                      data: {
                          order_id: this.orderId,
                          address_id: r.currentTarget.dataset.item.id
                      }
                  });

                case 4:
                  t.sent, t.next = 8;
                  break;

                case 7:
                  e.default.setStorageSync("reSelectAddress", JSON.stringify(r.currentTarget.dataset.item));

                case 8:
                  e.default.navigateBack({
                      delta: 1
                  });

                case 9:
                case "end":
                  return t.stop();
              }
          }, t, this);
      }));
      return function(e) {
          return t.apply(this, arguments);
      };
  }(),
  editAddress: function(t) {
      if (t.currentTarget.dataset && t.currentTarget.dataset.item) {
          var r = t.currentTarget.dataset.item;
          this.data.addressId && (r.selectAddressId = this.data.addressId), this.changeDirect && (r.change = 1, 
          r.orderId = this.orderId);
          var n = Object.keys(r).map(function(e) {
              return "".concat(e, "=").concat(r[e]);
          }).join("&");
          e.default.navigateTo({
              url: "/pages/newAddress/newAddress?".concat(n)
          });
      }
  },
  onReady: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
      return {
          path: "/pages/index/index",
          imageUrl: "https://cdn.effortless.cn/assets/images/coupon-image.jpg"
      };
  }
});