!function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) if (Object.prototype.hasOwnProperty.call(t, a)) {
        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, a) : {};
        r.get || r.set ? Object.defineProperty(e, a, r) : e[a] = t[a];
    }
    e.default = t;
}(require("../../utils/wx.js"));

Component({
    properties: {
        value: {
            type: Number,
            value: 1
        },
        min: {
            type: Number,
            value: 1
        },
        max: {
            type: Number,
            value: 1 / 0
        }
    },
    methods: {
        sub: function() {
            var t = this, e = this.data.value;
            e > this.data.min && this.setData({
                value: e - 1
            }, function() {
                t.change();
            });
        },
        add: function() {
            var t = this, e = this.data.value;
            e + 1 > this.data.max || this.setData({
                value: e + 1
            }, function() {
                t.change();
            });
        },
        change: function() {
            this.triggerEvent("change", {
                num: this.data.value
            });
        }
    }
});