var e = function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var a in e) if (Object.prototype.hasOwnProperty.call(e, a)) {
    var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, a) : {};
    n.get || n.set ? Object.defineProperty(t, a, n) : t[a] = e[a];
  }
  return t.default = e, t;
}(require("./utils/wx.js"));

function t(e, t, a, n, r, o, s) {
  try {
    var i = e[o](s), c = i.value;
  } catch (e) {
    return void a(e);
  }
  i.done ? t(c) : Promise.resolve(c).then(n, r);
}

var n = require("./common/config.default");

App({
  onLaunch: function () {
    var r, o = (r = e.regeneratorRuntime.mark(function t(r) {
      var o, s, i, c, u, d, f, l, g, h, p, y, m;
      return e.regeneratorRuntime.wrap(function (t) {
        for (; ;) switch (t.prev = t.next) {
          case 0:
            return r.sceneStr = n.scene[r.scene] || n.scene[1001], this.globalData.lanchOption = r,
              (o = e.default.getSystemInfoSync()).capsuleHeight = "ios" === o.platform ? 40 : "android" === o.platform ? 48 : 44,
              o.showHeight = o.windowHeight - o.capsuleHeight - o.statusBarHeight, s = /iphone x/i.test(o.model),
              i = /iPhone11/i.test(o.model) && 812 === o.screenHeight, o.iphoneX = s || i, this.globalData.systemInfo = o,
              console.log("info", this.globalData.systemInfo), t.next = 12, e.default.login();

          case 12:
            if (c = t.sent, u = e.default.getStorageSync("token"), d = !!u, !(c.errMsg.indexOf("ok") > -1)) {
              t.next = 22;
              break;
            }
            if (!c.code) {
              t.next = 21;
              break;
            }
            return t.next = 19;

          case 19:
            0 === (f = t.sent).code && (a.login(f.data.user_id), e.default.setStorageSync("backenUserInfo", f.data),
              e.default.setStorageSync("token", f.data.token), f.data && f.data.user_info && f.data.user_info.username && (l = {
                nickName: f.data.user_info.username,
                gender: f.data.user_info.sex,
                city: f.data.user_info.city,
                province: f.data.user_info.province,
                avatarUrl: f.data.user_info.avatar
              }, e.default.setStorageSync("userInfo", JSON.stringify(l))));

          case 21:
            this.globalData.loginCode = c.code;

          case 22:
            if (g = e.default.getStorageSync("hasStartQ"),  !(u = e.default.getStorageSync("token"))) {
              t.next = 30;
              break;
            }
            

          case 28:
            // if (0 === (h = t.sent).code && h.data && h.data.content) {
            //   e.default.setStorage({
            //     key: "hasDoneQuestion",
            //     data: !0
            //   }), e.default.setStorageSync("qData", h.data.content);
              
            // }

          case 30:
            d || this.appLaunchFinish();

          case 31:
          case "end":
            return t.stop();
        }
      }, t, this);
    }), function () {
      var e = this, a = arguments;
      return new Promise(function (n, o) {
        var s = r.apply(e, a);
        function i(e) {
          t(s, n, o, i, c, "next", e);
        }
        function c(e) {
          t(s, n, o, i, c, "throw", e);
        }
        i(void 0);
      });
    });
    return function (e) {
      return o.apply(this, arguments);
    };

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }(),

  globalData: {
    systemInfo: {},
    userInfo: null,
    analysis:null
  },
  appLaunchFinish: function () { }
});