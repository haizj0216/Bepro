Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.touch = void 0;

!function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var s in t) if (Object.prototype.hasOwnProperty.call(t, s)) {
        var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, s) : {};
        i.get || i.set ? Object.defineProperty(e, s, i) : e[s] = t[s];
    }
    e.default = t;
}(require("../../../utils/wx.js"));

var t = Behavior({
    methods: {
        touchStart: function(t) {
            var e = t.touches[0];
            this.direction = "", this.deltaX = 0, this.deltaY = 0, this.offsetX = 0, this.offsetY = 0, 
            this.startX = e.clientX, this.startY = e.clientY;
        },
        touchMove: function(t) {
            var e = t.touches[0];
            this.deltaX = e.clientX - this.startX, this.deltaY = e.clientY - this.startY, this.offsetX = Math.abs(this.deltaX), 
            this.offsetY = Math.abs(this.deltaY), this.direction = this.offsetX > this.offsetY ? "horizontal" : this.offsetX < this.offsetY ? "vertical" : "";
        }
    }
});

exports.touch = t;