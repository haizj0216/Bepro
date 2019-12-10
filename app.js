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

var a = require("./utils/lib/sensorsdata.min.js");

a.setPara({
  name: "sensors",
  server_url: "https://effortless.datasink.sensorsdata.cn/sa?project=production&token=7d63dfff847af3ce",
  show_log: !1,
  appid: "wx116ea4af222398ac",
  allow_amend_share_path: !0
}), a.init();

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
            return t.next = 19, e.default.request({
              url: "firstLogin",
              data: {
                code: c.code,
                anonymousId: a.quick("getAnonymousID")
              }
            });

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
            if (g = e.default.getStorageSync("hasStartQ"), a.setProfile({
              if_fill_question: !!g
            }), !(u = e.default.getStorageSync("token"))) {
              t.next = 30;
              break;
            }
            return t.next = 28, e.default.request({
              url: "recordDetail",
              method: "POST"
            });

          case 28:
            if (0 === (h = t.sent).code && h.data && h.data.content) {
              e.default.setStorage({
                key: "hasFinishQ",
                data: !0
              }), e.default.setStorageSync("qData", h.data.content);
              try {
                (p = JSON.parse(h.data.content)) && p.exact && (y = ["几乎没有", "偶尔", "经常"].indexOf(p.q11) || 0,
                  m = ["基本无", "中度", "重度"], e.default.setStorageSync("exactTest", [p.q10, m[y]]));
              } catch (e) { }
            }

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
  }(),
  globalData: {
    systemInfo: {}
  },
  appLaunchFinish: function () { }
});