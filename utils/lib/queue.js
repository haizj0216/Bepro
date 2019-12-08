module.exports = function(n, r) {
    !function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        if (null == n) n = 1; else if (0 === n) throw new Error("Concurrency must not be zero");
    }(r);
    var c = [], t = [];
    return {
        concurrency: r,
        push: function(n, r) {
            var t = this;
            c.push({
                task: n,
                callback: r
            }), setTimeout(function() {
                t.process();
            }, 0);
        },
        process: function() {
            for (var r = this, l = function() {
                var l, o = c.shift();
                t.push(o), n(o.task, (l = function() {
                    r.pull(o), "function" == typeof o.callback && o.callback.apply(o, arguments), r.process();
                }, function() {
                    if (null === l) throw new Error("Callback was already called");
                    var n = l;
                    return l = null, n.apply(void 0, arguments);
                }));
            }; this.concurrency > t.length && c.length; ) l();
        },
        pull: function(n) {
            var r = t.indexOf(n);
            -1 !== r && t.splice(r, 1);
        }
    };
};