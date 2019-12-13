!function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) if (Object.prototype.hasOwnProperty.call(t, a)) {
        var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, a) : {};
        i.get || i.set ? Object.defineProperty(e, a, i) : e[a] = t[a];
    }
    e.default = t;
}(require("../../utils/wx.js"));

Component({
    properties: {
        max: {
            type: Number,
            value: 100
        },
        min: {
            type: Number,
            value: 0
        },
        step: {
            type: Number,
            value: 1
        },
        values: {
            type: Array,
            value: []
        },
        value: {
            type: Number,
            value: 1
        }
    },
    data: {
        steps: 0,
        currentValue: 1
    },
    lifetimes: {
        attached: function() {
            var t = this.data.values.length / 2, e = 0;
            this.data.values.length % 2 == 1 && (e = Math.ceil(t)), this.setData({
                steps: (this.data.max - this.data.min) / this.data.step,
                texts: this.data.values.map(function(a, i) {
                    return {
                        text: a,
                        p: i + 1 === e ? 1 : i + 1 > t ? 2 : 0
                    };
                }),
                currentValue: this.data.value
            });
        },
        moved: function() {},
        detached: function() {}
    },
    methods: {
        bindchange: function(t) {
            console.log(t), this.triggerEvent("change", t.detail);
        },
        upToMin: function() {
            this.triggerEvent("change", {
                value: this.data.min
            });
        },
        upToMax: function() {
            this.triggerEvent("change", {
                value: this.data.max
            });
        }
    }
});