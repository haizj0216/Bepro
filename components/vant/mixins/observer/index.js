Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.observe = function(t, o) {
    var i = t.watch, p = t.computed;
    if (o.behaviors.push(e.behavior), i) {
        var s = o.properties || {};
        Object.keys(i).forEach(function(e) {
            if (e in s) {
                var r = s[e];
                null !== r && "type" in r || (r = {
                    type: r
                }), r.observer = i[e], s[e] = r;
            }
        }), o.properties = s;
    }
    p && (o.methods = o.methods || {}, o.methods.$options = function() {
        return t;
    }, o.properties && (0, r.observeProps)(o.properties));
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

var e = require("./behavior"), r = require("./props");