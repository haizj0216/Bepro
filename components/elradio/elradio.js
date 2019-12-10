!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        a.get || a.set ? Object.defineProperty(t, r, a) : t[r] = e[r];
    }
    t.default = e;
}(require("../../utils/wx.js"));

Component({
    properties: {
        checked: {
            type: Boolean,
            value: !1
        },
        label: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        onChange: function() {
            this.triggerEvent("change", {
                label: this.data.label,
                value: this.data.checked
            });
        }
    }
});