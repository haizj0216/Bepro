!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var c in e) if (Object.prototype.hasOwnProperty.call(e, c)) {
        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, c) : {};
        r.get || r.set ? Object.defineProperty(t, c, r) : t[c] = e[c];
    }
    t.default = e;
}(require("../../utils/wx.js"));

Component({
    properties: {
        defaultChecked: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        checked: !1
    },
    attached: function() {
        this.setData({
            checked: this.data.defaultChecked
        });
    },
    methods: {
        onChange: function() {
            this.triggerEvent("change", {
                checked: !this.data.checked
            }), this.setData({
                checked: !this.data.checked
            });
        }
    }
});