Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.safeArea = void 0;

var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var o = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        o.get || o.set ? Object.defineProperty(t, r, o) : t[r] = e[r];
    }
    return t.default = e, t;
}(require("../../../utils/wx.js"));

var t = null;

exports.safeArea = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = r.safeAreaInsetBottom, s = void 0 === o || o, a = r.safeAreaInsetTop;
    return Behavior({
        properties: {
            safeAreaInsetTop: {
                type: Boolean,
                value: void 0 !== a && a
            },
            safeAreaInsetBottom: {
                type: Boolean,
                value: s
            }
        },
        created: function() {
            var r = this;
            new Promise(function(r, o) {
                null != t ? r(t) : e.default.getSystemInfo({
                    success: function(e) {
                        var o = e.model, s = e.screenHeight, a = e.statusBarHeight, n = /iphone x/i.test(o), i = /iPhone11/i.test(o) && 812 === s;
                        r(t = {
                            isIPhoneX: n || i,
                            statusBarHeight: a
                        });
                    },
                    fail: o
                });
            }).then(function(e) {
                var t = e.isIPhoneX, o = e.statusBarHeight;
                r.set({
                    isIPhoneX: t,
                    statusBarHeight: o
                });
            });
        }
    });
};