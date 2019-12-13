!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        s.get || s.set ? Object.defineProperty(t, r, s) : t[r] = e[r];
    }
    t.default = e;
}(require("../../../utils/wx.js"));

var e = require("../common/component"), t = require("../mixins/transition");

(0, e.VantComponent)({
    classes: [ "enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class" ],
    mixins: [ (0, t.transition)(!0) ]
});