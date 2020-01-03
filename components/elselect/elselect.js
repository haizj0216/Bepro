!function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, r) : {};
        s.get || s.set ? Object.defineProperty(t, r, s) : t[r] = e[r];
    }
    t.default = e;
}(require("../../utils/wx.js"));

var e = require("../../utils/image-preload/index.js");

Component({
    properties: {
        selected: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    lifetimes: {
        attached: function() {
            var t = this;
            this.imgLoader = new e(this);
            [ "https://vapi.thebepro.com/files/select.png", "https://vapi.thebepro.com/files/unselect.png" ].forEach(function(e) {
                t.imgLoader.load(e);
            });
        }
    },
    methods: {
        onSelected: function() {
            this.triggerEvent("change", {
                selected: !this.data.selected
            });
        }
    }
});