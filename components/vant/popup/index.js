!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        s.get || s.set ? Object.defineProperty(t, r, s) : t[r] = e[r];
    }
    t.default = e;
}(require("../../../utils/wx.js"));

var e = require("../common/component"), t = require("../mixins/transition"), r = require("../mixins/safe-area");

(0, e.VantComponent)({
    classes: [ "enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class" ],
    mixins: [ (0, t.transition)(!1), (0, r.safeArea)() ],
    props: {
        transition: {
            type: String,
            observer: "observeClass"
        },
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        position: {
            type: String,
            value: "center",
            observer: "observeClass"
        }
    },
    created: function() {
        this.observeClass();
    },
    methods: {
        onClickOverlay: function() {
            this.$emit("click-overlay"), this.data.closeOnClickOverlay && this.$emit("close");
        },
        observeClass: function() {
            var e = this.data, t = e.transition, r = e.position, s = {
                name: t || r
            };
            "none" === t && (s.duration = 0), this.set(s);
        }
    }
});