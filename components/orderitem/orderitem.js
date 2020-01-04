var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        a.get || a.set ? Object.defineProperty(t, r, a) : t[r] = e[r];
    }
    return t.default = e, t;
}(require("../../utils/wx.js"));

function t(e, t, r, a, n, o, s) {
    try {
        var i = e[o](s), d = i.value;
    } catch (e) {
        return void r(e);
    }
    i.done ? t(d) : Promise.resolve(d).then(a, n);
}

function r(e) {
    return function() {
        var r = this, a = arguments;
        return new Promise(function(n, o) {
            var s = e.apply(r, a);
            function i(e) {
                t(s, n, o, i, d, "next", e);
            }
            function d(e) {
                t(s, n, o, i, d, "throw", e);
            }
            i(void 0);
        });
    };
}
var net = require("../../common/config.default");

getApp();

Component({
    properties: {
        data: {
            type: Object,
            value: {}
        }
    },
    zeroOrderId: "",
    data: {
        expressNo: "",
        expressCom: ""
    },
    methods: {
        payNow: function() {
            var t = r(e.regeneratorRuntime.mark(function t(r) {
                var a, n, o;
                return e.regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                          var token = wx.getStorageSync('token')
                          wx.showLoading()
                        return t.next = 2, e.default.request({
                            url: net.apiUrl.payWechat + "?token=" + token,
                            data: {
                                orderNumber: r.currentTarget.dataset.orderId
                            }
                        });

                      case 2:
                        if (99999 !== (a = t.sent).code) {
                            t.next = 11;
                            break;
                        }
                        if (a.data ) {
                            t.next = 8;
                            break;
                        }
                        return this.zeroOrderId = a.data.order_id, this.zeroModalShow(), t.abrupt("return");

                      case 8:
                        n = a.data, o = this, e.default.requestPayment({
                            timeStamp: n.timeStamp + "",
                            nonceStr: n.nonceStr,
                            package: n.payPackage,
                            signType: n.signType,
                            paySign: n.paySign,
                            success: function(e) {
                                console.log("payment success res", e), o.triggerEvent("reload", o.data.data.id);
                            },
                            fail: function(e) {},
                            complete: function(e) {
                                console.log("payment complete", e);
                                wx.hideLoading()
                            }
                        });

                      case 11:
                        wx.hideLoading()
                        console.log("res", a);

                      case 12:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
            return function(e) {
                return t.apply(this, arguments);
            };
        }(),
        zeroPay: function() {
            var t = r(e.regeneratorRuntime.mark(function t() {
                return e.regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, e.default.request({
                            url: "orderZeroPay",
                            data: {
                                order_id: this.zeroOrderId,
                                pay_type: 2
                            }
                        });

                      case 2:
                        0 === t.sent.code && (this.zeroModalHide(), this.triggerEvent("reload", this.data.data.id));

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
        zeroModalShow: function() {
            this.selectComponent("#zeroModal").show();
        },
        zeroModalHide: function() {
            this.selectComponent("#zeroModal").hide(), this.triggerEvent("reload", this.data.data.id);
        },
        goReturn: function(t) {
            e.default.navigateTo({
                url: "/pages/return/return?orderId=".concat(t.currentTarget.dataset.orderId)
            });
        },
        goExpress: function(t) {
            var r = t.currentTarget.dataset, a = r.expressno, n = r.orderId, o = r.orderNum;
            e.default.navigateTo({
                url: "/pages/expressTail/expressTail?orderId=".concat(n, "&expressNo=").concat(a)
            });
        },
        receiveModalShow: function(e) {
            this.selectComponent("#confirmReceive").show();
        },
        receiveModalHide: function() {
            this.selectComponent("#confirmReceive").hide();
        },
        confirmReceive: function() {
            var t = r(e.regeneratorRuntime.mark(function t(r) {
                var a;
                return e.regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, e.default.request({
                            url: "confirmReceive",
                            data: {
                                order_id: this.data.data.id
                            }
                        });

                      case 2:
                        0 === (a = t.sent).code && (e.default.showToast({
                            icon: "none",
                            title: "收货成功"
                        }), this.triggerEvent("reload", this.data.data.id), this.receiveModalHide()), console.log("confirm", a);

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
        goAfterUse: function(t) {
            e.default.navigateTo({
                url: "/pages/feedback/feedback?orderId=".concat(t.currentTarget.dataset.orderId, "&didi=me&current=0")
            });
        },
        changeExpressNo: function(e) {
            this.setData({
                expressNo: e.detail.value
            });
        },
        changeExpressCom: function(e) {
            this.setData({
                expressCom: e.detail.value
            });
        },
        copyOrderId: function(t) {
            console.log(t.currentTarget.dataset.orderId), e.default.setClipboardData({
                data: t.currentTarget.dataset.orderId,
                success: function(t) {
                    e.default.showToast({
                        title: "复制成功"
                    });
                }
            });
        },
        modalVisible: function(e) {
            e.currentTarget.dataset.show ? (this.selectComponent("#modal").show(), this.orderId = e.currentTarget.dataset.orderId) : (this.selectComponent("#modal").hide(), 
            this.setData({
                expressNo: "",
                expressCom: ""
            }), this.orderId = "");
        },
        changeAddress: function(t) {
            e.default.navigateTo({
                url: "/pages/address/address?addressId=".concat(this.data.data.address.id, "&change=1&orderId=").concat(this.data.data.id)
            });
        },
        requestSend: function() {
            var t = r(e.regeneratorRuntime.mark(function t(r) {
                return e.regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (this.data.expressNo) {
                            t.next = 3;
                            break;
                        }
                        return e.default.showToast({
                            title: "请输入快递单号",
                            icon: "none"
                        }), t.abrupt("return");

                      case 3:
                        if (this.data.expressCom) {
                            t.next = 6;
                            break;
                        }
                        return e.default.showToast({
                            title: "请输入快递公司名称",
                            icon: "none"
                        }), t.abrupt("return");

                      case 6:
                        return t.next = 8, e.default.request({
                            url: "applyAfterSaleExpress",
                            data: {
                                order_id: this.orderId,
                                user_send_info: {
                                    express_no: this.data.expressNo,
                                    express_company: this.data.expressCom
                                }
                            }
                        });

                      case 8:
                        0 === t.sent.code && (this.selectComponent("#modal").hide(), this.triggerEvent("reload", this.data.data.id));

                      case 10:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
            return function(e) {
                return t.apply(this, arguments);
            };
        }()
    }
});