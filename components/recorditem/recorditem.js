!function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var s in t) if (Object.prototype.hasOwnProperty.call(t, s)) {
        var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, s) : {};
        a.get || a.set ? Object.defineProperty(e, s, a) : e[s] = t[s];
    }
    e.default = t;
}(require("../../utils/wx.js"));

var t = getApp();

Component({
    options: {
        multipleSlots: !0
    },
    externalClasses: [ "card-class", "card-head-class" ],
    properties: {
        title: {
            type: String,
            value: ""
        },
        icon: {
            type: String,
            value: ""
        },
        subTitle: {
            type: String,
            value: ""
        },
        showClose: {
            type: Boolean,
            value: !0
        },
        defaultClose: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        close: !1
    },
    lifetimes: {
        attached: function() {
            var t = this;
            this.setData({
                close: this.data.showClose
            }), this.data.defaultClose && setTimeout(function() {
                t.setData({
                    defaultClose: !1
                });
            }, 100);
        }
    },
    methods: {
        onClose: function() {
            this.data.showClose && (this.data.close && t.sensors.track("clickUnflod", {
                unfold_name: this.data.title
            }), this.setData({
                close: !this.data.close
            }));
        }
    }
});