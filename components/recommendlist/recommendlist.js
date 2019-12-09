var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        n.get || n.set ? Object.defineProperty(t, r, n) : t[r] = e[r];
    }
    return t.default = e, t;
}(require("../../utils/wx.js"));

Component({
    properties: {
        list: {
            type: Array,
            value: []
        },
        allSelect: {
            type: Boolean,
            value: !0
        },
        solution: {
            type: String,
            value: ""
        },
        from: {
            type: String,
            value: ""
        }
    },
    data: {
        userInfo: {}
    },
    attached: function() {
        var t = e.default.getStorageSync("userInfo");
        t && ((t = JSON.parse(t)).break = t.nickName.length > 5, /^[a-zA-Z]/.test(t.nickName) && (t.break = t.nickName.length > 8), 
        this.setData({
            userInfo: t
        }));
    },
    methods: {
        onProductSelectChange: function(e) {
            this.triggerEvent("selectchange", e.detail);
        },
        onAllSelectChange: function(e) {
            this.triggerEvent("selectallchange");
        },
        onQuantityChange: function(e) {
            this.triggerEvent("quantitychange", e.detail);
        }
    }
});