var e = function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e)
            if (Object.prototype.hasOwnProperty.call(e, r)) {
                var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
                a.get || a.set ? Object.defineProperty(t, r, a) : t[r] = e[r];
            }
    return t.default = e, t;
}(require("../../utils/wx.js"));

function t(e, t, r, a, s, n, i) {
    try {
        var o = e[n](i),
            d = o.value;
    } catch (e) {
        return void r(e);
    }
    o.done ? t(d) : Promise.resolve(d).then(a, s);
}

function r(e) {
    return function () {
        var r = this,
            a = arguments;
        return new Promise(function (s, n) {
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

var math = require("../../utils/lib/number");
var net = require("../../common/config.default");

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
        orderPreview: {},
        nickname: "",
        selectCoupon: {},
        displayPayPrice: 0,
        loading: !0,
        list: [],
        productlist: []
    },
    onLoad: function () {
        var t = r(e.regeneratorRuntime.mark(function t(r) {
            var a;
            var proList = JSON.parse(r.products);
            return this.getOrderPerview(), e.regeneratorRuntime.wrap(function (t) {
                for (;;) switch (t.prev = t.next) {
                    case 0:
                        console.log(r),
                            this.setData({
                                products: proList
                            });
                    case 5:
                    case "end":
                        return t.stop();
                }
            }, t, this);
        }));

        return function (e) {
            return t.apply(this, arguments);
        };
    }(),
    onShow: function () {
        this.computeTotal()
        var addressStore = wx.getStorageSync('reSelectAddress')
        
        if (addressStore) {
            this.setData({
                hasDefaultAddress:!0,
                orderPreview: addressStore
            })
        }
    },
    getOrderPerview: function () {
        
        var t = r(e.regeneratorRuntime.mark(function t() {
            var r, a, s, n, i, o, d = this;
            return e.regeneratorRuntime.wrap(function (t) {
                for (;;) switch (t.prev = t.next) {
                    case 0:
                        var token = wx.getStorageSync("token")
                        return this.data.loading && e.default.showLoading(),
                            t.next = 12, e.default.request({
                                url: net.apiUrl.addressDefault + "?token=" + token,
                                method: "GET"
                            });

                    case 12:
                        n = t.sent, i = !1, e.default.hideLoading(),
                            this.setData({
                                loading: !1,
                            });
                        if (99999 === n.code && n.data) {
                            this.setData({
                                orderPreview: n.data,
                                hasDefaultAddress: !0,
                            })
                            wx.setStorageSync('reSelectAddress', n.data)
                        };
                    case 19:
                        console.log("orderPreview", a);

                    case 20:
                    case "end":
                        return t.stop();
                }
            }, t, this);
        }));
        return function () {
            return t.apply(this, arguments);
        };
    }(),
    triggerMsgModal: function () {
        a.sensors.track("clickButton", {
            name_of_button: "点击定制留言"
        }), this.selectComponent("#modal").show();
    },
    triggerHideModal: function (e) {
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
    changeMsg: function (e) {
        if (/^[a-zA-Z]/.test(e.detail.value)) {
            if (e.detail.value.length > 20) return e.detail.value.slice(0, 20);
        } else if (e.detail.value.length > 14) return e.detail.value.slice(0, 14);
        this.setData({
            msg: e.detail.value
        });
    },
    changeName: function (e) {
        var t = this.checkNameLength(e.detail.value),
            r = t.str;
        if (t.length > 12) return r;
        this.setData({
            nickname: e.detail.value
        });
    },
    checkNameLength: function (e) {
        for (var t = 0, r = "", a = 0; a < e.length; a++) {
            var s = e.charAt(a);
            /^[\u0000-\u00ff]$/.test(s) ? t += 1 : t += 2, !r && t > 12 && (r = e.slice(0, a));
        }
        return {
            str: r,
            length: t
        };
    },
    onSelectScoreUse: function (e) {
        //   var t = this, r = e.detail.value;
        //   this.setData({
        //       isUseScore: r
        //   }, function() {
        //       t.getOrderPerview();
        //   });
    },
    onPriceChange: function () {},
    goNewAddress: function () {
        e.default.navigateTo({
            url: "/pages/newaddress/newaddress?from=payment"
        });
    },
    goCoupon: function () {
        //   this.data.hasUsefulCoupon && e.default.navigateTo({
        //       url: "/pages/coupon/coupon?amount=".concat(this.data.orderPreview.total_product_price)
        //   });
    },
    goAddressList: function () {
        this.data.hasDefaultAddress && e.default.navigateTo({
            url: "/pages/address/address?addressId=".concat(this.data.orderPreview.id)
        });
    },
    payment: function () {
        
        var t = r(e.regeneratorRuntime.mark(function t() {
            var r, a, s, n;
            return e.regeneratorRuntime.wrap(function (t) {
                for (;;) switch (t.prev = t.next) {
                    case 0:
                        if (this.data.orderPreview && this.data.orderPreview && this.data.orderPreview.id) {
                            t.next = 3;
                            break;
                        }
                        return e.default.showToast({
                            icon: "none",
                            title: "请选择收货地址"
                        }), t.abrupt("return");

                    case 3:
                        var productList = []
                        var list = this.data.products
                        for (var i = 0; i < list.length; i++) {
                            productList[i] = {
                                productId: list[i].id,
                                count: list[i].quantity,
                                price:list[i].price/100
                            }
                        }
                        wx.showLoading()
                        var token = wx.getStorageSync("token")
                        return a = {
                                addressId: this.data.orderPreview.id,
                                product: JSON.stringify(productList),
                                payPrice: this.data.displayPayPrice,
                            },
                            t.next = 9, e.default.request({
                                url: net.apiUrl.saveOrder + "?token=" + token,
                                header:{
                                    "Content-Type":"application/json"
                                },
                                data: a
                            });

                    case 9:
                        if (99999 !== (s = t.sent).code) {
                            t.next = 20;
                            wx.hideLoading();
                            break;
                        }
                        t.next = 15;
                        var token = wx.getStorageSync("token");
                        return e.default.request({
                            url: net.apiUrl.payWechat + "?token=" + token,
                            data: {
                                orderNumber: s.data.id
                            }
                        });

                    case 15:
                        if (99999 !== (n = t.sent).code) {
                            t.next = 20;
                            wx.hideLoading();
                            break;
                        }
                        e.default.removeStorageSync("selectCouponId"), e.default.removeStorageSync("reSelectAddress"),
                            e.default.removeStorageSync("delAddressId"), e.default.requestPayment({
                                timeStamp: n.data.timeStamp + "",
                                nonceStr: n.data.nonceStr,
                                package: n.data.payPackage,
                                signType: n.data.signType,
                                paySign: n.data.paySign,
                                success: function (t) {
                                    console.log("payment success res", t), e.default.switchTab({
                                        url: "/pages/my/my"
                                    });
                                },
                                fail: function (t) {
                                    e.default.switchTab({
                                        url: "/pages/my/my"
                                    });
                                },
                                complete: function (e) {
                                    wx.hideLoading()
                                }
                            });

                    case 20:
                        wx.hideLoading()
                        console.log("data", s);

                    case 21:
                    case "end":
                        return t.stop();
                }
            }, t, this);
        }));
        return function () {
            return t.apply(this, arguments);
        };
    }(),
    zeroModalShow: function () {
        this.selectComponent("#zeroModal").show();
    },
    zeroModalHide: function () {
        this.selectComponent("#zeroModal").hide(), e.default.switchTab({
            url: "/pages/my/my"
        });
    },
    zeroPay: function () {
        var t = r(e.regeneratorRuntime.mark(function t() {
            return e.regeneratorRuntime.wrap(function (t) {
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
        return function () {
            return t.apply(this, arguments);
        };
    }(),
    onReady: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {
        
    },
    

    computeTotal: function () {
        this.setData({
            displayPayPrice: this.data.products.reduce(function (t, e) {
                return math.plus(t, math.times(e.price/100, e.quantity));
            }, 0)
        });
    },
});