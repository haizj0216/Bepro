Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transition = void 0;

!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) if (Object.prototype.hasOwnProperty.call(e, n)) {
        var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
        a.get || a.set ? Object.defineProperty(t, n, a) : t[n] = e[n];
    }
    t.default = e;
}(require("../../../utils/wx.js"));

var e = require("../common/utils");

var t = function(e) {
    return {
        enter: "van-".concat(e, "-enter van-").concat(e, "-enter-active enter-class enter-active-class"),
        "enter-to": "van-".concat(e, "-enter-to van-").concat(e, "-enter-active enter-to-class enter-active-class"),
        leave: "van-".concat(e, "-leave van-").concat(e, "-leave-active leave-class leave-active-class"),
        "leave-to": "van-".concat(e, "-leave-to van-").concat(e, "-leave-active leave-to-class leave-active-class")
    };
}, n = function() {
    return new Promise(function(e) {
        return setTimeout(e, 1e3 / 30);
    });
};

exports.transition = function(a) {
    return Behavior({
        properties: {
            customStyle: String,
            show: {
                type: Boolean,
                value: a,
                observer: "observeShow"
            },
            duration: {
                type: [ Number, Object ],
                value: 300,
                observer: "observeDuration"
            },
            name: {
                type: String,
                value: "fade"
            }
        },
        data: {
            type: "",
            inited: !1,
            display: !1
        },
        attached: function() {
            this.data.show && this.enter();
        },
        methods: {
            observeShow: function(e) {
                e ? this.enter() : this.leave();
            },
            enter: function() {
                var a = this, r = this.data, s = r.duration, o = r.name, i = t(o), c = (0, e.isObj)(s) ? s.leave : s;
                this.status = "enter", Promise.resolve().then(n).then(function() {
                    a.checkStatus("enter"), a.set({
                        inited: !0,
                        display: !0,
                        classes: i.enter,
                        currentDuration: c
                    });
                }).then(n).then(function() {
                    a.checkStatus("enter"), a.set({
                        classes: i["enter-to"]
                    });
                }).catch(function() {});
            },
            leave: function() {
                var a = this, r = this.data, s = r.duration, o = r.name, i = t(o), c = (0, e.isObj)(s) ? s.leave : s;
                this.status = "leave", Promise.resolve().then(n).then(function() {
                    a.checkStatus("leave"), a.set({
                        classes: i.leave,
                        currentDuration: c
                    });
                }).then(function() {
                    return setTimeout(function() {
                        return a.onTransitionEnd();
                    }, c);
                }).then(n).then(function() {
                    a.checkStatus("leave"), a.set({
                        classes: i["leave-to"]
                    });
                }).catch(function() {});
            },
            checkStatus: function(e) {
                if (e !== this.status) throw new Error("incongruent status: ".concat(e));
            },
            onTransitionEnd: function() {
                this.data.show || (this.set({
                    display: !1
                }), this.$emit("transitionEnd"));
            }
        }
    });
};