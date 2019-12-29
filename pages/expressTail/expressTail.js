var e = function(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
      var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
      n.get || n.set ? Object.defineProperty(t, r, n) : t[r] = e[r];
  }
  return t.default = e, t;
}(require("../../utils/wx.js"));

function t(e, t, r, n, o, i, s) {
  try {
      var a = e[i](s), c = a.value;
  } catch (e) {
      return void r(e);
  }
  a.done ? t(c) : Promise.resolve(c).then(n, o);
}

var r = require("./mock"), n = require("../../utils/util"), o = {
  1: {
      text: "",
      icon: "express-home"
  },
  100001: {
      text: "已揽件",
      icon: "express-tras"
  },
  300002: {
      text: "派送中",
      icon: "express-run"
  },
  300003: {
      text: "已签收",
      icon: "express-down"
  }
};

Page({
  data: {
      express: [],
      orderId: "",
      expressId: ""
  },
  onLoad: function() {
      var i, s = (i = e.regeneratorRuntime.mark(function t(i) {
          var s, a, c;
          return e.regeneratorRuntime.wrap(function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return s = i.orderId, console.log("mock.reverse()", r), t.next = 4, e.default.request({
                      url: "orderExpress",
                      data: {
                          order_id: s
                      }
                  });

                case 4:
                  a = t.sent, console.log("tail", a), c = a.data.path_item_list, this.setData({
                      orderId: i.orderNum,
                      expressId: a.data.waybill_id,
                      express: [ {
                          action_type: 1,
                          action_msg: "[收货地址] ".concat(i.address),
                          status: {
                              text: "",
                              icon: "express-home"
                          }
                      } ].concat(c.map(function(e) {
                          if (e.action_time) {
                              var t = n.formatTime(new Date(1e3 * e.action_time), "arr");
                              e.day = t[0], e.time = t[1];
                          }
                          return e.status = o[e.action_type] || {
                              icon: "express-dot"
                          }, e;
                      }))
                  });

                case 8:
                case "end":
                  return t.stop();
              }
          }, t, this);
      }), function() {
          var e = this, r = arguments;
          return new Promise(function(n, o) {
              var s = i.apply(e, r);
              function a(e) {
                  t(s, n, o, a, c, "next", e);
              }
              function c(e) {
                  t(s, n, o, a, c, "throw", e);
              }
              a(void 0);
          });
      });
      return function(e) {
          return s.apply(this, arguments);
      };
  }(),
  onReady: function() {},
  onShow: function() {},
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