!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        a.get || a.set ? Object.defineProperty(t, r, a) : t[r] = e[r];
    }
    t.default = e;
}(require("../../utils/wx.js"));

var e = getApp();

Component({
    properties: {},
    data: {
        statusBarHeight: e.globalData.systemInfo.statusBarHeight,
        capsuleHeight: e.globalData.systemInfo.capsuleHeight
    },
    methods: {}
});