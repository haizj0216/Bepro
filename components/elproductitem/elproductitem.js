var t = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) if (Object.prototype.hasOwnProperty.call(t, r)) {
        var o = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
        o.get || o.set ? Object.defineProperty(e, r, o) : e[r] = t[r];
    }
    return e.default = t, e;
}(require("../../utils/wx.js"));

function e(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = null != arguments[e] ? arguments[e] : {}, n = Object.keys(o);
        "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(o).filter(function(t) {
            return Object.getOwnPropertyDescriptor(o, t).enumerable;
        }))), n.forEach(function(e) {
            r(t, e, o[e]);
        });
    }
    return t;
}

function r(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t;
}

Component({
    properties: {
        product: {
            type: Object,
            value: {}
        },
        showCounter: {
            type: Boolean,
            value: !0
        },
        showSelect: {
            type: Boolean,
            value: !0
        },
        showNum: {
            type: Boolean,
            value: !1
        },
        showArrow: {
            type: Boolean,
            value: !0
        },
        withoutEndline: {
            type: Boolean,
            value: !1
        },
        disabledSlide: {
            type: Boolean,
            value: !0
        },
        minQuantity: {
            type: Number,
            value: 1
        },
        maxQuantity: {
            type: Number,
            value: 1 / 0
        },
        from: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        goProductDetail: function() {
            var productJson = JSON.stringify(this.data.product)
            t.default.navigateTo({
                url: "/pages/detail/detail?product=".concat(productJson)
            });
        },
        onProductSelectChange: function() {
            this.data.product.disable || this.triggerEvent("selectchange", this.data.product);
        },
        onCounterChange: function(t) {
            this.triggerEvent("quantitychange", e({}, this.data.product, {
                quantity: t.detail.num
            }));
        },
        delProduct: function(t) {
            "right" === t.detail && this.triggerEvent("delProduct", e({}, this.data.product));
        }
    }
});