var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        n.get || n.set ? Object.defineProperty(t, r, n) : t[r] = e[r];
    }
    return t.default = e, t;
}(require("../../utils/wx.js"));

function t(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

Component({
    properties: {
        showSelect: {
            type: Boolean,
            value: !1
        },
        showCount: {
            type: Boolean,
            value: !1
        },
        product: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        goProduct: function(t) {
            this.data.showSelect || e.default.navigateTo({
                url: "/pages/detail/detail?id=".concat(this.data.product.id, "&from=订单")
            });
        },
        onProductSelectChange: function(e) {
            this.triggerEvent("selectchange", this.data.product);
        },
        onCounterChange: function(e) {
            this.triggerEvent("counterchange", function(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var n = null != arguments[r] ? arguments[r] : {}, o = Object.keys(n);
                    "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                        return Object.getOwnPropertyDescriptor(n, e).enumerable;
                    }))), o.forEach(function(r) {
                        t(e, r, n[r]);
                    });
                }
                return e;
            }({}, this.data.product, {
                num: e.detail.num
            }));
        }
    }
});