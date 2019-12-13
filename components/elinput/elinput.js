!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        i.get || i.set ? Object.defineProperty(t, r, i) : t[r] = e[r];
    }
    t.default = e;
}(require("../../utils/wx.js"));

Component({
    properties: {
        label: {
            type: String,
            value: ""
        },
        placeholder: {
            type: String,
            value: ""
        },
        type: {
            type: String,
            value: "text"
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        value: {
            type: String,
            value: ""
        },
        mode: {
            type: String,
            value: ""
        },
        maxlength: {
            type: Number,
            value: 140
        }
    },
    data: {},
    methods: {
        bindinput: function(e) {
            this.triggerEvent("input", e.detail);
        },
        bindblur: function(e) {
            this.triggerEvent("blur", e.detail);
        },
        bindfocus: function(e) {
            this.triggerEvent("focus", e.detail);
        },
        bindconfirm: function(e) {
            this.triggerEvent("confirm", e.detail);
        }
    }
});