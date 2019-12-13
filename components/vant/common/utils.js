var e = require("../../../@babel/runtime/helpers/interopRequireDefault")(require("../../../@babel/runtime/helpers/typeof"));

function t(r) {
    return (t = "function" == typeof Symbol && "symbol" === (0, e.default)(Symbol.iterator) ? function(t) {
        return (0, e.default)(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : (0, 
        e.default)(t);
    })(r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isObj = function(e) {
    var r = t(e);
    return null !== e && ("object" === r || "function" === r);
}, exports.isDef = function(e) {
    return null != e;
}, exports.isNumber = function(e) {
    return /^\d+$/.test(e);
}, exports.range = function(e, t, r) {
    return Math.min(Math.max(e, t), r);
};