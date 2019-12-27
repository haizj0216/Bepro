require("../../@babel/runtime/helpers/Arrayincludes");
var net = require("../../common/config.default");

var t = function (t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t)
        for (var n in t)
            if (Object.prototype.hasOwnProperty.call(t, n)) {
                var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, n) : {};
                a.get || a.set ? Object.defineProperty(e, n, a) : e[n] = t[n];
            }
    return e.default = t, e;
}(require("../../utils/wx.js"));

function e(t, e, n, a, i, r, o) {
    try {
        var s = t[r](o),
            u = s.value;
    } catch (t) {
        return void n(t);
    }
    s.done ? e(u) : Promise.resolve(u).then(a, i);
}

function n(t) {
    return function () {
        var n = this,
            a = arguments;
        return new Promise(function (i, r) {
            var o = t.apply(n, a);

            function s(t) {
                e(o, i, r, s, u, "next", t);
            }

            function u(t) {
                e(o, i, r, s, u, "throw", t);
            }
            s(void 0);
        });
    };
}

var a = require("../../utils/lib/number"),
    i = getApp();

Page({
    showRequest: !1,
    unselect: [],
    data: {
        isEmpty: !1,
        list: [],
        allSelect: !0,
        total: 0,
        loading: !0,
        hasDoneQ: !0
    },
    goPayment: function () {
        
        var e = 0,
            n = [],
            a = this.data.list.filter(function (t) {
                return t.selected && t.status && t.stock >= t.quantity;
            }).map(function (t) {
                return e += t.quantity, n.includes(t.category) || n.push(t.category), i.sensors.track("clickBuyDetail", {
                    commodity_name: t.name,
                    commodity_type: t.category,
                    commodity_price: t.price,
                    commodity_quantity: t.quantity,
                    if_recommendation_product: !!t.is_recommond
                }), {
                    product_id: t.id,
                    num: t.quantity
                };
            });
        a.length ? (i.sensors.track("clickBuy", {
            if_click_buy_all: !this.data.list.some(function (t) {
                return !t.selected && t.status && t.stock >= t.quantity;
            }),
            total_commodity_quantity: e,
            total_type_quantity: n.length,
            order_amount: this.data.total
        }), t.default.navigateTo({
            url: "/pages/payment/payment?products=".concat(JSON.stringify(a))
        })) : t.default.showToast({
            icon: "none",
            title: "购物车商品无库存"
        });
    },
    onLoad: function (t) {
        this.getList();
    },
    onShow: function () {
        this.showRequest && this.getList(), this.showRequest = !0;
        // this.mockdata();
    },
    getList: function () {
        var e = n(t.regeneratorRuntime.mark(function e() {
            var n, a, r;
            return t.regeneratorRuntime.wrap(function (e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        var token = wx.getStorageSync("token")
                        return t.default.showTabBar(), this.data.loading && t.default.showLoading(), n = t.default.getStorageSync("hasDoneQ"),
                            a = {}, e.prev = 4, e.next = 7, t.default.request({
                                url: net.apiUrl.cartList + "?token=" + token,
                                method: "GET"
                            });

                    case 7:
                        a = e.sent, e.next = 13;
                        break;

                    case 10:
                        e.prev = 10, e.t0 = e.catch(4), a = {
                            code: 0,
                            data: {
                                list: []
                            }
                        };

                    case 13:
                        99999 === a.code && (r = a.data, this.setData({
                            list: r.map(function (t) {
                                return t.selected = !0, t;
                              }),
                            allSelect: r.every(function (t) {
                                return t.selected;
                            }),
                            loading: !1,
                            hasDoneQ: n
                        }), t.default.hideLoading(), this.computeTotal()), i.sensors.track("shoppingCart");

                    case 15:
                    case "end":
                        return e.stop();
                }
            }, e, this, [
                [4, 10]
            ]);
        }));
        return function () {
            return e.apply(this, arguments);
        };
    }(),
    onProductSelectChange: function (t) {
        var e = this,
            n = this.data.list.map(function (e) {
                return e.id === t.detail.id && (e.selected = !t.detail.selected), e;
            });
        this.setData({
            list: n,
            allSelect: !n.some(function (t) {
                return !t.selected;
            })
        }, function () {
            e.computeTotal();
        });
    },
    onAllSelectChange: function (t) {
        var e = this,
            n = !this.data.allSelect;
        this.setData({
            allSelect: n,
            list: this.data.list.map(function (t) {
                return t.selected = !t.disable && n, t;
            })
        }, function () {
            e.computeTotal();
        });
    },
    onQuantityChange: function (e) {
        var token = wx.getStorageSync("token")
        var a = this,
            i = this.data.list.map(function (t) {
                return t.id === e.detail.id && (t.stock < e.detail.quantity ? t.disable = !0 : t.disable = !1,
                    t.quantity = e.detail.quantity), t;
            });
        this.setData({
            list: i
        }, n(t.regeneratorRuntime.mark(function n() {
            return t.regeneratorRuntime.wrap(function (n) {
                for (;;) switch (n.prev = n.next) {
                    case 0:
                        return n.next = 2, t.default.request({
                            url: net.apiUrl.updateCart + "?token=" + token,
                            method: "POST",
                            header:{
                                "content-type": "application/json"
                            },
                            data: {
                                productId: e.detail.id,
                                count: e.detail.quantity
                            }
                        });

                    case 2:
                        n.sent, a.computeTotal();

                    case 4:
                    case "end":
                        return n.stop();
                }
            }, n);
        })));
    },
    computeTotal: function () {
        this.setData({
            total: this.data.list.reduce(function (t, e) {
                return e.selected ? a.plus(t, a.times(e.price, e.quantity)) : t;
            }, 0)
        });
    },
    goRecommendPage: function () {
        t.default.navigateTo({
            url: "/pages/recommend/recommend"
        });
    },
    delProduct: function () {
        var e = n(t.regeneratorRuntime.mark(function e(n) {
            var a;
            return t.regeneratorRuntime.wrap(function (e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2, t.default.request({
                            url: "deleteCart",
                            method: "POST",
                            data: {
                                id: n.detail.cartId
                            }
                        });

                    case 2:
                        if (0 !== (a = e.sent).code) {
                            e.next = 6;
                            break;
                        }
                        return this.getList(), e.abrupt("return");

                    case 6:
                        t.default.showToast({
                            icon: "none",
                            title: a.msg
                        });

                    case 7:
                    case "end":
                        return e.stop();
                }
            }, e, this);
        }));
        return function (t) {
            return e.apply(this, arguments);
        };
    }(),
    onReady: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {
        return {
            path: "/pages/home/home",
            imageUrl: "https://cdn.effortless.cn/assets/images/coupon-image.jpg"
        };
    },

    mockdata: function () {
        var lis = [{
            logo: "https://gd4.alicdn.com/imgextra/i2/0/TB1gQJTJpXXXXb4XFXXXXXXXXXX_!!0-item_pic.jpg",
            name: "BEPRO BASE EMULSION 基础乳液",
            sub_title: "主要作用成分介绍以及容量文字区域针对的皮肤属性能简短介绍文字区域",
            quantity: 1,
            num: 2,
            price: 100,
            selected: true,
            status:true,
            stock:5,
            quantity:5
            
        }];
        this.setData({
            hasDoneQ: 1,
            list: lis,
            loading: 0,
            total:100,
            
        })
    }
});