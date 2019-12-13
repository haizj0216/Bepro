Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.behavior = void 0;

!function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) if (Object.prototype.hasOwnProperty.call(t, r)) {
        var o = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
        o.get || o.set ? Object.defineProperty(e, r, o) : e[r] = t[r];
    }
    e.default = t;
}(require("../../../../utils/wx.js"));

function t(t, e) {
    return new Promise(function(r) {
        t.setData(e, r);
    });
}

var e = Behavior({
    created: function() {
        var t = this;
        if (this.$options) {
            var e = {}, r = this.$options().computed, o = Object.keys(r);
            this.calcComputed = function() {
                var i = {};
                return o.forEach(function(o) {
                    var n = r[o].call(t);
                    e[o] !== n && (e[o] = n, i[o] = n);
                }), i;
            };
        }
    },
    attached: function() {
        this.set();
    },
    methods: {
        set: function(e, r) {
            var o = this, i = [];
            return e && i.push(t(this, e)), this.calcComputed && i.push(t(this, this.calcComputed())), 
            Promise.all(i).then(function(t) {
                return r && "function" == typeof r && r.call(o), t;
            });
        }
    }
});

exports.behavior = e;