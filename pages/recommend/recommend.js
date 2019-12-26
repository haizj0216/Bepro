require("../../@babel/runtime/helpers/Arrayincludes");
var netUtils = require("../../common/config.default");

var t = function (t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t)
        for (var n in t)
            if (Object.prototype.hasOwnProperty.call(t, n)) {
                var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, n) : {};
                r.get || r.set ? Object.defineProperty(e, n, r) : e[n] = t[n];
            }
    return e.default = t, e;
}(require("../../utils/wx.js"));

function e(t, e, n, r, o, a, i) {
    try {
        var c = t[a](i),
            u = c.value;
    } catch (t) {
        return void n(t);
    }
    c.done ? e(u) : Promise.resolve(u).then(r, o);
}

function n(t) {
    return function () {
        var n = this,
            r = arguments;
        return new Promise(function (o, a) {
            var i = t.apply(n, r);

            function c(t) {
                e(i, o, a, c, u, "next", t);
            }

            function u(t) {
                e(i, o, a, c, u, "throw", t);
            }
            c(void 0);
        });
    };
}

var r = getApp();

Page({
    options: {
        from: ""
    },
    data: {
        recommendList: [],
        allSelect: !0,
        solution: "",
        home: !1
    },
    onLoad: function () {
        // var e = n(t.regeneratorRuntime.mark(function e(n) {
        //     var o;
        //     return t.regeneratorRuntime.wrap(function(e) {
        //         for (;;) switch (e.prev = e.next) {
        //           case 0:
        //             return n.home && this.setData({
        //                 home: !0
        //             }), e.next = 3, t.default.request({
        //                 url: "recommentProducts",
        //                 method: "POST"
        //             });

        //           case 3:
        //             0 === (o = e.sent).code && this.setData({
        //                 recommendList: o.data.product_list.map(function(t) {
        //                     return t.selected = !0, t.quantity = 1, t;
        //                 }),
        //                 solution: o.data.solution
        //             }), r.sensors.track("clickCheckRecommendation", {
        //                 click_check_source: n.from
        //             }), this.options = n, console.log("resp", o);

        //           case 8:
        //           case "end":
        //             return e.stop();
        //         }
        //     }, e, this);
        // }));

        // this.mockdata();
        // return function(t) {
        //     return e.apply(this, arguments);
        // };
        this.getrecommend();
    },
    onProductSelectChange: function (t) {
        var e = this.data.recommendList.map(function (e) {
            return e.id === t.detail.id && (e.selected = !e.selected), e;
        });
        this.setData({
            recommendList: e,
            allSelect: !e.some(function (t) {
                return !t.selected;
            })
        });
    },
    onAllSelectChange: function () {
        var t = !this.data.allSelect;
        this.setData({
            allSelect: t,
            recommendList: this.data.recommendList.map(function (e) {
                return e.selected = t, e;
            })
        });
    },
    onQuantityChange: function (t) {
        var e = this.data.recommendList.map(function (e) {
            return e.id === t.detail.id && (e.quantity = t.detail.quantity), e;
        });
        this.setData({
            recommendList: e
        });
    },
    addToCart: function () {
        wx.showLoading()
        let that = this
        var list
        list = this.data.recommendList.filter(function (t) {
            return t.selected;
        })
        var productList=[]
        for (var i = 0; i < list.length; i++) {
            productList[i] = {
                productId: list[i].id,
                count: list[i].quantity
            }
        }
        wx.request({
            url: netUtils.apiUrl.addCart + "?token=123",
            method: "POST",
            data: productList,
            success(res) {
                console.log(res)
                wx.switchTab({
                    url: "/pages/cart/cart"
                })
            },
            fail(res) {

            },
            complete(res) {
                wx.hideLoading()
            }

        })
    },



    goHome: function () {
        r.sensors.track("clickButton", {
            name_of_button: "返回主页"
        }), t.default.switchTab({
            url: "/pages/index/index"
        });
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {
        return {
            path: "/pages/index/index",
            imageUrl: "https://cdn.effortless.cn/assets/images/coupon-image.jpg"
        };
    },

    getrecommend: function () {
        let that = this
        wx.showLoading()
        wx.request({
            url: netUtils.apiUrl.recommendInfo + "?token=123",
            method: "GET",
            success(res) {
                if (res.data.code == 99999) {
                    that.setData({
                        recommendList: res.data.data.map(function (t) {
                            return t.selected = !0, t.quantity = 1, t
                        })
                    })
                    that.updateList()
                } else {
                    that.mockdata()
                }
            },
            fail(res) {
                that.mockdata()
            },
            complete(res) {
                wx.hideLoading()
            }

        })
    },

    updateList: function () {
        console.log(data)

    },

    mockdata: function () {
        var list = [{
            image: "https://gd4.alicdn.com/imgextra/i2/0/TB1gQJTJpXXXXb4XFXXXXXXXXXX_!!0-item_pic.jpg",
            title: "BEPRO BASE EMULSION 基础乳液",
            description: "主要作用成分介绍以及容量文字区域针对的皮肤属性能简短介绍文字区域",
            quantity: 1,
            num: 2,
            price: 100,
            selected: true
        }];
        this.setData({
            recommendList: list,
            home: !1,
            solution: "2019-12-17"
        })
    }
});