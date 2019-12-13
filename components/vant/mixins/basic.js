Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.basic = void 0;

var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        i.get || i.set ? Object.defineProperty(t, r, i) : t[r] = e[r];
    }
    return t.default = e, t;
}(require("../../../utils/wx.js"));

var t = Behavior({
    methods: {
        $emit: function() {
            this.triggerEvent.apply(this, arguments);
        },
        getRect: function(t, r) {
            var i = this;
            return new Promise(function(n) {
                e.default.createSelectorQuery().in(i)[r ? "selectAll" : "select"](t).boundingClientRect(function(e) {
                    r && Array.isArray(e) && e.length && n(e), !r && e && n(e);
                }).exec();
            });
        }
    }
});

exports.basic = t;