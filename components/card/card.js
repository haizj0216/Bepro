!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var s in e) if (Object.prototype.hasOwnProperty.call(e, s)) {
        var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, s) : {};
        a.get || a.set ? Object.defineProperty(t, s, a) : t[s] = e[s];
    }
    t.default = e;
}(require("../../utils/wx.js"));

Component({
    externalClasses: [ "card-class", "card-head-class" ],
    properties: {
        title: {
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
            this.setData({
                close: this.data.defaultClose
            });
        }
    },
    methods: {
        onClose: function() {
            this.data.showClose && this.setData({
                close: !this.data.close
            });
        }
    }
});