var e = require("./queue");

function t(t) {
    var u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
    if ("function" != typeof t) throw Error("request must be function");
    var n = e(function(e, t) {
        return e(t);
    }, u);
    return function(e, u) {
        n.push(function(n) {
            var r = e.complete;
            e.complete = function() {
                n(), "function" == typeof r && r.apply(void 0, arguments);
            };
            var o = t(e);
            "function" == typeof u && u(o);
        });
    };
}

module.exports = {
    queueRequest: t,
    queue: function(e) {
        var u = wx.request;
        Object.defineProperty(wx, "request", {
            get: function() {
                return t(u, e);
            }
        });
    }
};