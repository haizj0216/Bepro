var e = function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e)
    for (var r in e)
      if (Object.prototype.hasOwnProperty.call(e, r)) {
        var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        n.get || n.set ? Object.defineProperty(t, r, n) : t[r] = e[r];
      }
  return t.default = e, t;
}(require("../../utils/wx.js"));

function t(e, t, r, n, a, o, i) {
  try {
    var u = e[o](i),
      s = u.value;
  } catch (e) {
    return void r(e);
  }
  u.done ? t(s) : Promise.resolve(s).then(n, a);
}

function r(e) {
  return function () {
    var r = this,
      n = arguments;
    return new Promise(function (a, o) {
      var i = e.apply(r, n);

      function u(e) {
        t(i, a, o, u, s, "next", e);
      }

      function s(e) {
        t(i, a, o, u, s, "throw", e);
      }
      u(void 0);
    });
  };
}

var n = require("../../common/config.default");

getApp();

Component({
  externalClasses: ["my-class"],
  properties: {
    type: {
      type: String,
      value: "default"
    },
    size: {
      type: String,
      value: "defalut"
    },
    plain: {
      type: Boolean,
      value: !1
    },
    disable: {
      type: Boolean,
      value: !1
    },
    loading: {
      type: Boolean,
      value: !1
    },
    text: {
      type: String,
      value: ""
    },
    class: {
      type: String,
        value: ""
    },
    styles: {
      type: String,
      value: ""
    },
    buttonType: {
      type: String,
      value: "normal"
    },
    openType: {
      type: String,
      value: ""
    },
    btnTip: {
      type: String,
      value: ""
    },
    userLoading: {
      type: Boolean,
      value: !1
    }
  },
  data: {},
  methods: {
    onTap: function () {
      this.triggerEvent("btntap");
    },
    // submit: function () {
    //   var t = r(e.regeneratorRuntime.mark(function t(r) {
    //     var a;
    //     return e.regeneratorRuntime.wrap(function (t) {
    //       for (;;) switch (t.prev = t.next) {
    //         case 0:
    //           if (!(a = r.detail.formId) || -1 !== a.indexOf("mock")) {
    //             t.next = 5;
    //             break;
    //           }
    //           return t.next = 4, e.default.request({
    //             url: n.apiUrl.formId,
    //             method: "POST",
    //             data: {
    //               form_id: a
    //             }
    //           });

    //         case 4:
    //           t.sent;

    //         case 5:
    //         case "end":
    //           return t.stop();
    //       }
    //     }, t);
    //   }));
    //   return function (e) {
    //     return t.apply(this, arguments);
    //   };
    // }(),
    getUserInfo: function () {
      if (wx.getStorageSync("token")) {
        return
      }
      var t = r(e.regeneratorRuntime.mark(function t(r) {
        var a, o, i;
        return e.regeneratorRuntime.wrap(function (t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              return this.data.userLoading && e.default.showLoading(), t.next = 3, e.default.login();

            case 3:
              if (a = t.sent, console.log("loginData", a), !(a.errMsg.toLowerCase().indexOf("ok") > -1)) {
                t.next = 18;
                break;
              }
              return t.next = 8, e.default.getUserInfo();

            case 8:
              if (!((o = t.sent).errMsg.toLowerCase().indexOf("ok") > -1)) {
                t.next = 18;
                break;
              }
              return t.next = 12, e.default.request({
                url: n.apiUrl.login,
                method: "POST",
                data: {
                  code: a.code
                }
              });

            case 12:
              if (99999 !== (i = t.sent).code) {
                t.next = 18;
                break;
              }
              return t.next = 19, e.default.setStorage({
                key: "token",
                data: i.data
              }), e.default.setStorage({
                key: "userInfo",
                data: JSON.stringify(o.userInfo)
              }), e.default.request({
                url: n.apiUrl.testResult1,
                method: "GET",
                header: {
                  "token": i.data,
                  "content-type": "x-www-form-urlencoded"
                },
              });

            case 18:
              return e.default.hideLoading(), e.default.showToast({
                title: "授权失败，请重试"
              }), this.triggerEvent("getUserInfo", !1), t.abrupt("return");
            case 19:
              if (99999 !== (i = t.sent).code) {
                break;
              }
              var hasDoneQ = i.data.analysisResult ? 1 : 0
              return e.default.setStorage({
                key: "hasDoneQ",
                data: hasDoneQ,
              }), this.triggerEvent("getUserInfo", !0), t.abrupt("return");
            case 22:
            case "end":
              return t.stop();
          }
        }, t, this);
      }));
      return function (e) {
        return t.apply(this, arguments);
      };

    }()
  }
});