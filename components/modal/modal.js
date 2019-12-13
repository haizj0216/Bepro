var t = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) if (Object.prototype.hasOwnProperty.call(t, a)) {
        var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, a) : {};
        i.get || i.set ? Object.defineProperty(e, a, i) : e[a] = t[a];
    }
    return e.default = t, e;
}(require("../../utils/wx.js"));

Component({
    properties: {
        showClose: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        show: !1,
        maskAnimation: {},
        modalAnimation: {}
    },
    methods: {
        show: function() {
            var e = this;
            this.setData({
                show: !0
            }), setTimeout(function() {
                var a = t.default.createAnimation({
                    duration: 100,
                    timingFunction: "ease"
                });
                a.opacity(.7).step();
                var i = t.default.createAnimation({
                    duration: 300,
                    timingFunction: "ease",
                    delay: 100
                });
                i.opacity(1).scale(1, 1).step(), e.setData({
                    maskAnimation: a.export(),
                    modalAnimation: i.export()
                });
            }, 200);
        },
        hide: function(e) {
            var a = this, i = t.default.createAnimation({
                duration: 300,
                timingFunction: "ease"
            });
            i.opacity(0).scale(0, 0).step();
            var o = t.default.createAnimation({
                duration: 100,
                timingFunction: "ease",
                delay: 300
            });
            o.opacity(0).step(), this.setData({
                modalAnimation: i.export(),
                maskAnimation: o.export()
            }), e && "close" === e.currentTarget.dataset.status && this.triggerEvent("onclose"), 
            setTimeout(function() {
                a.setData({
                    show: !1
                });
            }, 400);
        }
    }
});