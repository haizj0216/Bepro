!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var o = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        o.get || o.set ? Object.defineProperty(t, r, o) : t[r] = e[r];
    }
    t.default = e;
}(require("../../utils/wx.js"));

Component({
    properties: {
        empty: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {}
});