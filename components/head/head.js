var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) if (Object.prototype.hasOwnProperty.call(e, a)) {
        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, a) : {};
        r.get || r.set ? Object.defineProperty(t, a, r) : t[a] = e[a];
    }
    return t.default = e, t;
}(require("../../utils/wx.js"));

var t = getApp();

Component({
    properties: {
        showBack: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        statusBarHeight: t.globalData.systemInfo.statusBarHeight,
        capsuleHeight: t.globalData.systemInfo.capsuleHeight
    },
    methods: {
        goBack: function() {
            var t = getCurrentPages();
            1 !== t.length ? (e.default.setStorage({
                key: "from",
                data: t[0].route
            }), e.default.navigateBack({
                delta: 1
            })) : e.default.switchTab({
                url: "/pages/home/home"
            });
        }
    }
});