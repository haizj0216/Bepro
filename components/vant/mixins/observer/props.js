Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.observeProps = function(e) {
    if (!e) return;
    Object.keys(e).forEach(function(r) {
        var t = e[r];
        null !== t && "type" in t || (t = {
            type: t
        });
        var o = t, i = o.observer;
        t.observer = function() {
            if (i) {
                "string" == typeof i && (i = this[i]);
                for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++) r[t] = arguments[t];
                i.apply(this, r);
            }
            this.set();
        }, e[r] = t;
    });
};

!function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
        var o = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, t) : {};
        o.get || o.set ? Object.defineProperty(r, t, o) : r[t] = e[t];
    }
    r.default = e;
}(require("../../../../utils/wx.js"));