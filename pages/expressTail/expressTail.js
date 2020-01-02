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

function t(e, t, r, n, o, i, s) {
    try {
        var a = e[i](s),
            c = a.value;
    } catch (e) {
        return void r(e);
    }
    a.done ? t(c) : Promise.resolve(c).then(n, o);
}

var net = require("../../common/config.default");

Page({
    data: {
        express: [],
        orderId: "",
        expressId: "",
        expName: "",
    },
    onLoad: function (options) {
        // var i, s = (i = e.regeneratorRuntime.mark(function t(i) {
        //     var s, a, c;
        //     return e.regeneratorRuntime.wrap(function (t) {
        //         for (;;) switch (t.prev = t.next) {
        //             case 0:
        //                 var token = wx.getStorageSync("token");
        //                 var expressNo = options.expressNo;
        //                 return s = i.orderId, t.next = 4, e.default.request({
        //                     url: net.apiUrl.orderExpress + "?token=" + token,
        //                     method: "GET",
        //                     data: {
        //                         code: expressNo
        //                     }
        //                 });

        //             case 4:
        //                 var order_Id = options.orderId;
        //                 var expressNo = options.expressNo;
        //                 a = t.sent, 0 === a.data.status, console.log("tail", a), c = a.data.result;
        //                 var result = JSON.parse(a.data.result);
        //                 this.setData({
        //                     orderId: order_Id,
        //                     expressId: result.number,
        //                     express: result.list,
        //                     expName: result.expName,
        //                     expressNo: expressNo,
        //                 });

        //             case 8:
        //             case "end":
        //                 return t.stop();
        //         }
        //     }, t, this);
        // }), function () {
        //     var e = this,
        //         r = arguments;
        //     return new Promise(function (n, o) {
        //         var s = i.apply(e, r);

        //         function a(e) {
        //             t(s, n, o, a, c, "next", e);
        //         }

        //         function c(e) {
        //             t(s, n, o, a, c, "throw", e);
        //         }
        //         a(void 0);
        //     });
        // });
        let that = this;
        var token = wx.getStorageSync("token");
        var expressNo = options.expressNo;
        var order_Id = options.orderId;
        wx.showLoading()
        wx.request({
            url: net.apiHost + net.apiUrl.orderExpress + "?token=" + token,
            method: "GET",
            data:{
                code: expressNo
            },success(res){
                if(99999 == res.data.code) {
                    var result = JSON.parse(res.data.data.result);
                    that.setData({
                        orderId: order_Id,
                        expressId: result.number,
                        express: result.list,
                        expName: result.expName,
                        expressNo: expressNo,
                    });
                }
                
            }, fail(res){

            },
            complete(res){
                wx.hideLoading()
            }
        })
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
    }
});