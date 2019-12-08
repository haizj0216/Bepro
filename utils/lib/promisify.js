var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/typeof"));

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
}), exports.default = n, exports.promisifyReturns = function(e, t) {
    return function() {
        var r = e.apply(void 0, arguments);
        for (var o in t) {
            var u = r[o];
            r[o] = "function" == typeof u ? n(u, t[o]) : u;
        }
        return r;
    };
};

var r = function(e, r) {
    return function() {
        for (var n = this, o = r.promiseModule, u = new Array(arguments.length), i = 0; i < arguments.length; i++) u[i] = arguments[i];
        return new o(function(o, i) {
            !r.objectParams || u[0] && "object" !== t(u[0]) ? r.errorFirst ? u.push(function(e, t) {
                if (r.multiArgs) {
                    for (var n = new Array(arguments.length - 1), u = 1; u < arguments.length; u++) n[u - 1] = arguments[u];
                    e ? (n.unshift(e), i(n)) : o(n);
                } else e ? i(e) : o(t);
            }) : u.push(function(e) {
                if (r.multiArgs) {
                    for (var t = new Array(arguments.length - 1), n = 0; n < arguments.length; n++) t[n] = arguments[n];
                    o(t);
                } else o(e);
            }) : (u[0] = u[0] || {}, u[0].success = function(e) {
                o(e);
            }, u[0].fail = function(e) {
                i(e);
            }, u[0].complete = null), e.apply(n, u);
        });
    };
};

function n(e, t) {
    t = Object.assign({
        exclude: [ /.+(Sync|Stream)$/ ],
        errorFirst: !0,
        promiseModule: Promise
    }, t);
    var n, o = function(e) {
        var r = function(t) {
            return "string" == typeof t ? e === t : t.test(e);
        };
        return t.include ? t.include.some(r) : !t.exclude.some(r);
    };
    for (var u in n = "function" == typeof e ? function() {
        return t.excludeMain ? e.apply(this, arguments) : r(e, t).apply(this, arguments);
    } : Object.create(Object.getPrototypeOf(e)), e) {
        var i = e[u];
        n[u] = "function" == typeof i && o(u) ? r(i, t) : i;
    }
    return n;
}