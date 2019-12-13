!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        a.get || a.set ? Object.defineProperty(t, r, a) : t[r] = e[r];
    }
    t.default = e;
}(require("../../utils/wx.js"));

Component({
    externalClasses: [ "tui-modal-class" ],
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: ""
        },
        content: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: "#999"
        },
        size: {
            type: Number,
            value: 28
        },
        shape: {
            type: String,
            value: "square"
        },
        button: {
            type: Array,
            value: [ {
                text: "取消",
                type: "red",
                plain: !0
            }, {
                text: "确定",
                type: "red",
                plain: !1
            } ]
        },
        maskClosable: {
            type: Boolean,
            value: !0
        },
        custom: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        handleClick: function(e) {
            if (this.data.show) {
                var t = e.currentTarget.dataset;
                this.triggerEvent("click", {
                    index: Number(t.index)
                });
            }
        },
        handleClickCancel: function() {
            this.data.maskClosable && this.triggerEvent("cancel");
        }
    }
});