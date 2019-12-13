!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) if (Object.prototype.hasOwnProperty.call(e, o)) {
        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, o) : {};
        r.get || r.set ? Object.defineProperty(t, o, r) : t[o] = e[o];
    }
    t.default = e;
}(require("../../../utils/wx.js"));

(0, require("../common/component").VantComponent)({
    props: {
        show: Boolean,
        mask: Boolean,
        customStyle: String,
        duration: {
            type: [ Number, Object ],
            value: 300
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    methods: {
        onClick: function() {
            this.$emit("click");
        },
        noop: function() {}
    }
});