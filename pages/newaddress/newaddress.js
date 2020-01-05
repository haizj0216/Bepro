var e = function(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var a in e) if (Object.prototype.hasOwnProperty.call(e, a)) {
      var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, a) : {};
      n.get || n.set ? Object.defineProperty(t, a, n) : t[a] = e[a];
  }
  return t.default = e, t;
}(require("../../utils/wx.js"));

function t(e, t, a, n, r, s, i) {
  try {
      var o = e[s](i), d = o.value;
  } catch (e) {
      return void a(e);
  }
  o.done ? t(d) : Promise.resolve(d).then(n, r);
}

function a(e) {
  return function() {
      var a = this, n = arguments;
      return new Promise(function(r, s) {
          var i = e.apply(a, n);
          function o(e) {
              t(i, r, s, o, d, "next", e);
          }
          function d(e) {
              t(i, r, s, o, d, "throw", e);
          }
          o(void 0);
      });
  };
}

var net = require("../../common/config.default");


Page({
  setStorage: !1,
  changeDirect: !1,
  orderId: 0,
  tag: !1,
  data: {
      tags: [ "家", "公司", "其他" ],
      tag: "",
      id: "",
      name: "",
      phone: "",
      street: "",
      region: [ "", "", "" ],
      default: !1,
      selectAddressId: 0
  },
  onLoad: function(e) {
      e.change && (this.changeDirect = !0, this.orderId = parseInt(e.orderId)), (e.from = "payment") && (this.setStorage = !0), 
      Object.keys(e).length && this.setData({
          name: e.name || "",
          phone: e.phone || "",
          street: e.street || "",
          region: [ e.province, e.city, e.area ],
          default: 1 === parseInt(e.isDefault),
          id: e.id || "",
          selectAddressId: e.selectAddressId || 0,
          tag: e.tag || ""
      });
  },
  bindNameChange: function(e) {
      this.setData({
          name: e.detail.value
      });
  },
  bindPhoneChange: function(e) {
      this.setData({
          phone: e.detail.value
      });
  },
  bindStreetChange: function(e) {
      this.setData({
          street: e.detail.value
      });
  },
  onSelectTag: function(e) {
      this.setData({
          tag: e.currentTarget.dataset.item
      });
  },
  bindRegionChange: function(e) {
      this.setData({
          region: e.detail.value
      }), console.log(e.detail.value);
  },
  onDefaultChange: function(e) {
      this.setData({
          default: e.detail.value
      });
  },
  saveAddress: function() {
      var t = a(e.regeneratorRuntime.mark(function t() {
          var a, n, r = this;
          return e.regeneratorRuntime.wrap(function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  if (!this.tag) {
                      t.next = 2;
                      break;
                  }
                  return t.abrupt("return");

                case 2:
                  if (this.tag = !0, this.data.name) {
                      t.next = 7;
                      break;
                  }
                  return e.default.showToast({
                      icon: "none",
                      title: "请输入收货人姓名"
                  }), this.tag = !1, t.abrupt("return");

                case 7:
                  if (this.data.phone) {
                      t.next = 11;
                      break;
                  }
                  return e.default.showToast({
                      icon: "none",
                      title: "请输入手机号码"
                  }), this.tag = !1, t.abrupt("return");

                case 11:
                  if (/^1[3456789]\d{9}$/.test(this.data.phone)) {
                      t.next = 15;
                      break;
                  }
                  return e.default.showToast({
                      icon: "none",
                      title: "请输入正确的手机号码"
                  }), this.tag = !1, t.abrupt("return");

                case 15:
                  if (!this.data.region.some(function(e) {
                      return !e;
                  })) {
                      t.next = 19;
                      break;
                  }
                  return e.default.showToast({
                      icon: "none",
                      title: "请选择所在地区"
                  }), this.tag = !1, t.abrupt("return");

                case 19:
                  if (this.data.street) {
                      t.next = 23;
                      break;
                  }
                  return e.default.showToast({
                      icon: "none",
                      title: "请输入详细地址"
                  }), this.tag = !1, t.abrupt("return");

                case 23:
                    var token = wx.getStorageSync("token")
                  return a = {
                      phone: this.data.phone,
                      name: this.data.name,
                      address: this.data.region[0] + this.data.region[1] + this.data.region[2] + this.data.street,
                      province: this.data.region[0],
                      city: this.data.region[1],
                      area: this.data.region[2],
                      street:this.data.street,
                      tag: this.data.tag,
                  }, this.data.default && (a.isDefault = 1), this.data.id && (a.id = this.data.id), 
                  t.next = 28, e.default.request({
                      url: net.apiUrl.addAddress + "?token=" + token,
                      method: "POST", 
                      header:{
                        "Content-Type":"application/json"
                      },                                        
                      data: a
                  });

                case 28:
                  if (99999 !== (n = t.sent).code) {
                      t.next = 37;
                      break;
                  }
                  if (this.setStorage && (e.default.setStorageSync("reSelectAddress", n.data)), 
                  !this.changeDirect) {
                      t.next = 35;
                      break;
                  }
                  return t.next = 34;

                case 34:
                  t.sent;

                case 35:
                  return e.default.navigateBack({
                      delta: 1,
                      complete: function() {
                          console.log("complete"), r.tag = !1;
                      }
                  }), t.abrupt("return");

                case 37:
                  e.default.showToast({
                      icon: "none",
                      title: n.msg
                  }), this.tag = !1;

                case 39:
                case "end":
                  return t.stop();
              }
          }, t, this);
      }));
      return function() {
          return t.apply(this, arguments);
      };
  }(),
  showModal: function() {
      this.selectComponent("#modal").show();
  },
  hideModal: function() {
      this.selectComponent("#modal").hide();
  },
  delAddress: function() {
      var token = wx.getStorageSync("token")
      var t = a(e.regeneratorRuntime.mark(function t() {
          var a;
          return e.regeneratorRuntime.wrap(function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return t.next = 2, e.default.request({
                      url: net.apiUrl.addressDelete + "?token=" + token,
                      method: "POST",
                      data: {
                          id: this.data.id
                      }
                  });

                case 2:
                  a = t.sent, console.log("resp", a), 0 === a.code && (e.default.setStorageSync("delAddressId", this.data.id), 
                  e.default.navigateBack({
                      delta: 1
                  }));

                case 5:
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
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
      
  }
});