!function(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) {
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, e) : {};
        s.get || s.set ? Object.defineProperty(i, e, s) : i[e] = t[e];
    }
    i.default = t;
}(require("../../../utils/wx.js"));

var t = require("../common/component"), i = require("../mixins/touch");

(0, t.VantComponent)({
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            value: 0
        },
        rightWidth: {
            type: Number,
            value: 0
        },
        asyncClose: Boolean
    },
    mixins: [ i.touch ],
    data: {
        catchMove: !1
    },
    created: function() {
        this.offset = 0;
    },
    methods: {
        open: function(t) {
            var i = this.data, e = i.leftWidth, s = i.rightWidth, o = "left" === t ? e : -s;
            this.swipeMove(o);
        },
        close: function() {
            this.swipeMove(0);
        },
        swipeMove: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            this.offset = t;
            var i = "translate3d(".concat(t, "px, 0, 0)"), e = this.draging ? "none" : ".6s cubic-bezier(0.18, 0.89, 0.32, 1)";
            this.set({
                wrapperStyle: "\n        -webkit-transform: ".concat(i, ";\n        -webkit-transition: ").concat(e, ";\n        transform: ").concat(i, ";\n        transition: ").concat(e, ";\n      ")
            });
        },
        swipeLeaveTransition: function() {
            var t = this.data, i = t.leftWidth, e = t.rightWidth, s = this.offset;
            e > 0 && -s > .3 * e ? this.open("right") : i > 0 && s > .3 * i ? this.open("left") : this.swipeMove(0), 
            this.set({
                catchMove: !1
            });
        },
        startDrag: function(t) {
            this.data.disabled || (this.draging = !0, this.startOffset = this.offset, this.firstDirection = "", 
            this.touchStart(t));
        },
        noop: function() {},
        onDrag: function(t) {
            if (!this.data.disabled && (this.touchMove(t), this.firstDirection || (this.firstDirection = this.direction, 
            this.set({
                catchMove: "horizontal" === this.firstDirection
            })), "vertical" !== this.firstDirection)) {
                var i = this.data, e = i.leftWidth, s = i.rightWidth, o = this.startOffset + this.deltaX;
                s > 0 && -o > s || e > 0 && o > e || this.swipeMove(o);
            }
        },
        endDrag: function() {
            this.data.disabled || (this.draging = !1, this.swipeLeaveTransition());
        },
        onClick: function(t) {
            var i = t.currentTarget.dataset.key, e = void 0 === i ? "outside" : i;
            this.$emit("click", e), this.offset && (this.data.asyncClose ? this.$emit("close", {
                position: e,
                instance: this
            }) : this.swipeMove(0));
        }
    }
});