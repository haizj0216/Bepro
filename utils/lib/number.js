function t(t, e) {
    return void 0 === e && (e = 12), +parseFloat(t.toPrecision(e));
}

function e(t) {
    var e = t.toString().split(/[eE]/), r = (e[0].split(".")[1] || "").length - +(e[1] || 0);
    return r > 0 ? r : 0;
}

function r(r) {
    if (-1 === r.toString().indexOf("e")) return Number(r.toString().replace(".", ""));
    var n = e(r);
    return n > 0 ? t(r * Math.pow(10, n)) : r;
}

function n(t) {
    p && (t > Number.MAX_SAFE_INTEGER || t < Number.MIN_SAFE_INTEGER) && console.warn(t + " is beyond boundary when transfer to integer, the results may not be accurate");
}

function o(t, i) {
    for (var a = [], u = 2; u < arguments.length; u++) a[u - 2] = arguments[u];
    if (a.length > 0) return o.apply(void 0, [ o(t, i), a[0] ].concat(a.slice(1)));
    var s = r(t), p = r(i), l = e(t) + e(i), c = s * p;
    return n(c), c / Math.pow(10, l);
}

function i(t, r) {
    for (var n = [], a = 2; a < arguments.length; a++) n[a - 2] = arguments[a];
    if (n.length > 0) return i.apply(void 0, [ i(t, r), n[0] ].concat(n.slice(1)));
    var u = Math.pow(10, Math.max(e(t), e(r)));
    return (o(t, u) + o(r, u)) / u;
}

function a(t, r) {
    for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
    if (n.length > 0) return a.apply(void 0, [ a(t, r), n[0] ].concat(n.slice(1)));
    var u = Math.pow(10, Math.max(e(t), e(r)));
    return (o(t, u) - o(r, u)) / u;
}

function u(t, i) {
    for (var a = [], s = 2; s < arguments.length; s++) a[s - 2] = arguments[s];
    if (a.length > 0) return u.apply(void 0, [ u(t, i), a[0] ].concat(a.slice(1)));
    var p = r(t), l = r(i);
    return n(p), n(l), o(p / l, Math.pow(10, e(i) - e(t)));
}

function s(t, e) {
    var r = Math.pow(10, e);
    return u(Math.round(o(t, r)), r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var p = !0;

function l(t) {
    void 0 === t && (t = !0), p = t;
}

var c = {
    strip: t,
    plus: i,
    minus: a,
    times: o,
    divide: u,
    round: s,
    digitLength: e,
    float2Fixed: r,
    enableBoundaryChecking: l
};

exports.strip = t, exports.plus = i, exports.minus = a, exports.times = o, exports.divide = u, 
exports.round = s, exports.digitLength = e, exports.float2Fixed = r, exports.enableBoundaryChecking = l, 
exports.default = c;