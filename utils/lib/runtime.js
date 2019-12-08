var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/typeof"));

function r(e) {
    return (r = "function" == typeof Symbol && "symbol" === (0, t.default)(Symbol.iterator) ? function(r) {
        return (0, t.default)(r);
    } : function(r) {
        return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : (0, 
        t.default)(r);
    })(e);
}

!function(t) {
    var e, n = Object.prototype, o = n.hasOwnProperty, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", u = i.asyncIterator || "@@asyncIterator", c = i.toStringTag || "@@toStringTag", f = "object" === ("undefined" == typeof module ? "undefined" : r(module)), h = t.regeneratorRuntime;
    if (h) f && (module.exports = h); else {
        (h = t.regeneratorRuntime = f ? module.exports : {}).wrap = b;
        var l = "suspendedStart", s = "suspendedYield", p = "executing", y = "completed", d = {}, v = {};
        v[a] = function() {
            return this;
        };
        var m = Object.getPrototypeOf, g = m && m(m(P([])));
        g && g !== n && o.call(g, a) && (v = g);
        var w = _.prototype = x.prototype = Object.create(v);
        E.prototype = w.constructor = _, _.constructor = E, _[c] = E.displayName = "GeneratorFunction", 
        h.isGeneratorFunction = function(t) {
            var r = "function" == typeof t && t.constructor;
            return !!r && (r === E || "GeneratorFunction" === (r.displayName || r.name));
        }, h.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, _) : (t.__proto__ = _, c in t || (t[c] = "GeneratorFunction")), 
            t.prototype = Object.create(w), t;
        }, h.awrap = function(t) {
            return {
                __await: t
            };
        }, j(O.prototype), O.prototype[u] = function() {
            return this;
        }, h.AsyncIterator = O, h.async = function(t, r, e, n) {
            var o = new O(b(t, r, e, n));
            return h.isGeneratorFunction(r) ? o : o.next().then(function(t) {
                return t.done ? t.value : o.next();
            });
        }, j(w), w[c] = "Generator", w[a] = function() {
            return this;
        }, w.toString = function() {
            return "[object Generator]";
        }, h.keys = function(t) {
            var r = [];
            for (var e in t) r.push(e);
            return r.reverse(), function e() {
                for (;r.length; ) {
                    var n = r.pop();
                    if (n in t) return e.value = n, e.done = !1, e;
                }
                return e.done = !0, e;
            };
        }, h.values = P, N.prototype = {
            constructor: N,
            reset: function(t) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, 
                this.method = "next", this.arg = e, this.tryEntries.forEach(G), !t) for (var r in this) "t" === r.charAt(0) && o.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e);
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
            },
            dispatchException: function(t) {
                if (this.done) throw t;
                var r = this;
                function n(n, o) {
                    return u.type = "throw", u.arg = t, r.next = n, o && (r.method = "next", r.arg = e), 
                    !!o;
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var a = this.tryEntries[i], u = a.completion;
                    if ("root" === a.tryLoc) return n("end");
                    if (a.tryLoc <= this.prev) {
                        var c = o.call(a, "catchLoc"), f = o.call(a, "finallyLoc");
                        if (c && f) {
                            if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                            if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                        } else if (c) {
                            if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                        } else {
                            if (!f) throw new Error("try statement without catch or finally");
                            if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function(t, r) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var n = this.tryEntries[e];
                    if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                        var i = n;
                        break;
                    }
                }
                i && ("break" === t || "continue" === t) && i.tryLoc <= r && r <= i.finallyLoc && (i = null);
                var a = i ? i.completion : {};
                return a.type = t, a.arg = r, i ? (this.method = "next", this.next = i.finallyLoc, 
                d) : this.complete(a);
            },
            complete: function(t, r) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
                this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), 
                d;
            },
            finish: function(t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var e = this.tryEntries[r];
                    if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), G(e), d;
                }
            },
            catch: function(t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var e = this.tryEntries[r];
                    if (e.tryLoc === t) {
                        var n = e.completion;
                        if ("throw" === n.type) {
                            var o = n.arg;
                            G(e);
                        }
                        return o;
                    }
                }
                throw new Error("illegal catch attempt");
            },
            delegateYield: function(t, r, n) {
                return this.delegate = {
                    iterator: P(t),
                    resultName: r,
                    nextLoc: n
                }, "next" === this.method && (this.arg = e), d;
            }
        };
    }
    function b(t, r, e, n) {
        var o = r && r.prototype instanceof x ? r : x, i = Object.create(o.prototype), a = new N(n || []);
        return i._invoke = function(t, r, e) {
            var n = l;
            return function(o, i) {
                if (n === p) throw new Error("Generator is already running");
                if (n === y) {
                    if ("throw" === o) throw i;
                    return F();
                }
                for (e.method = o, e.arg = i; ;) {
                    var a = e.delegate;
                    if (a) {
                        var u = S(a, e);
                        if (u) {
                            if (u === d) continue;
                            return u;
                        }
                    }
                    if ("next" === e.method) e.sent = e._sent = e.arg; else if ("throw" === e.method) {
                        if (n === l) throw n = y, e.arg;
                        e.dispatchException(e.arg);
                    } else "return" === e.method && e.abrupt("return", e.arg);
                    n = p;
                    var c = L(t, r, e);
                    if ("normal" === c.type) {
                        if (n = e.done ? y : s, c.arg === d) continue;
                        return {
                            value: c.arg,
                            done: e.done
                        };
                    }
                    "throw" === c.type && (n = y, e.method = "throw", e.arg = c.arg);
                }
            };
        }(t, e, a), i;
    }
    function L(t, r, e) {
        try {
            return {
                type: "normal",
                arg: t.call(r, e)
            };
        } catch (t) {
            return {
                type: "throw",
                arg: t
            };
        }
    }
    function x() {}
    function E() {}
    function _() {}
    function j(t) {
        [ "next", "throw", "return" ].forEach(function(r) {
            t[r] = function(t) {
                return this._invoke(r, t);
            };
        });
    }
    function O(t) {
        var e;
        this._invoke = function(n, i) {
            function a() {
                return new Promise(function(e, a) {
                    !function e(n, i, a, u) {
                        var c = L(t[n], t, i);
                        if ("throw" !== c.type) {
                            var f = c.arg, h = f.value;
                            return h && "object" === r(h) && o.call(h, "__await") ? Promise.resolve(h.__await).then(function(t) {
                                e("next", t, a, u);
                            }, function(t) {
                                e("throw", t, a, u);
                            }) : Promise.resolve(h).then(function(t) {
                                f.value = t, a(f);
                            }, u);
                        }
                        u(c.arg);
                    }(n, i, e, a);
                });
            }
            return e = e ? e.then(a, a) : a();
        };
    }
    function S(t, r) {
        var n = t.iterator[r.method];
        if (n === e) {
            if (r.delegate = null, "throw" === r.method) {
                if (t.iterator.return && (r.method = "return", r.arg = e, S(t, r), "throw" === r.method)) return d;
                r.method = "throw", r.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return d;
        }
        var o = L(n, t.iterator, r.arg);
        if ("throw" === o.type) return r.method = "throw", r.arg = o.arg, r.delegate = null, 
        d;
        var i = o.arg;
        return i ? i.done ? (r[t.resultName] = i.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", 
        r.arg = e), r.delegate = null, d) : i : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), 
        r.delegate = null, d);
    }
    function k(t) {
        var r = {
            tryLoc: t[0]
        };
        1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), 
        this.tryEntries.push(r);
    }
    function G(t) {
        var r = t.completion || {};
        r.type = "normal", delete r.arg, t.completion = r;
    }
    function N(t) {
        this.tryEntries = [ {
            tryLoc: "root"
        } ], t.forEach(k, this), this.reset(!0);
    }
    function P(t) {
        if (t) {
            var r = t[a];
            if (r) return r.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
                var n = -1, i = function r() {
                    for (;++n < t.length; ) if (o.call(t, n)) return r.value = t[n], r.done = !1, r;
                    return r.value = e, r.done = !0, r;
                };
                return i.next = i;
            }
        }
        return {
            next: F
        };
    }
    function F() {
        return {
            value: e,
            done: !0
        };
    }
}(function() {
    return this;
}() || Function("return this")());