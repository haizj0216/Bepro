var t = function (t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t)
        for (var r in t)
            if (Object.prototype.hasOwnProperty.call(t, r)) {
                var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                a.get || a.set ? Object.defineProperty(e, r, a) : e[r] = t[r];
            }
    return e.default = t, e;
}(require("../../utils/wx.js"));

function e(t, e, r, a, n, o, i) {
    try {
        var s = t[o](i),
            u = s.value;
    } catch (t) {
        return void r(t);
    }
    s.done ? e(u) : Promise.resolve(u).then(a, n);
}

function r(t) {
    return function () {
        var r = this,
            a = arguments;
        return new Promise(function (n, o) {
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
var net = require("../../common/config.default");

var a = getApp();

Page({
    data: {
        product: {
        }
    },
    onLoad: function (options) {
        var productJson = JSON.parse(options.product)
        this.setData({
            product: productJson
        })
    },

    addToCart: function () {
        
        var e = r(t.regeneratorRuntime.mark(function e(r) {
            return t.regeneratorRuntime.wrap(function (e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        var token = wx.getStorageSync("token")
                        let that = this
                        var products = [{
                            productId: that.data.product.id,
                            count: 1,
                        }]
                        return e.next = 12, t.default.request({
                            url: net.apiUrl.addCart + "?token=" + token,
                            method: "POST",
                            header:{
                                "content-type": "application/json"
                            },
                            data: products
                        });

                    case 12:
                        99999 === e.sent.code ? (t.default.showToast({
                            title: "加购成功"
                        }), this.goCart()) : t.default.showToast({
                            icon: "none",
                            title: "加购失败"
                        });

                    case 14:
                    case "end":
                        return e.stop();
                }
            }, e, this);
        }));
        return function (t) {
            return e.apply(this, arguments);
        };
    }(),

    goHome: function () {
        t.default.switchTab({
            url: "/pages/home/home"
        });
    },
    goCart: function () {
        t.default.switchTab({
            url: "/pages/cart/cart"
        });
    },

    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {
        
    }
});