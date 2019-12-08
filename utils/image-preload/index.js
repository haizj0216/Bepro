!function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i)) {
        var a = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, i) : {};
        a.get || a.set ? Object.defineProperty(e, i, a) : e[i] = t[i];
    }
    e.default = t;
}(require("../wx.js"));

function t(t, e) {
    for (var i = 0; i < e.length; i++) {
        var a = e[i];
        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
        Object.defineProperty(t, a.key, a);
    }
}

var e = function() {
    function e(t, i) {
        !function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.page = t, this.defaultCallback = i || function() {}, this.callbacks = {}, 
        this.imgInfo = {}, this.page.data.imgLoadList = [], this.page._imgOnLoad = this._imgOnLoad.bind(this), 
        this.page._imgOnLoadError = this._imgOnLoadError.bind(this);
    }
    var i, a, r;
    return i = e, (a = [ {
        key: "load",
        value: function(t, e) {
            if (t) {
                var i = this.page.data.imgLoadList, a = this.imgInfo[t];
                e && (this.callbacks[t] = e), a ? this._runCallback(null, {
                    src: t,
                    width: a.width,
                    height: a.height
                }) : -1 == i.indexOf(t) && (i.push(t), this.page.setData({
                    imgLoadList: i
                }));
            }
        }
    }, {
        key: "_imgOnLoad",
        value: function(t) {
            var e = t.currentTarget.dataset.src, i = t.detail.width, a = t.detail.height;
            this.imgInfo[e] = {
                width: i,
                height: a
            }, this._removeFromLoadList(e), this._runCallback(null, {
                src: e,
                width: i,
                height: a
            });
        }
    }, {
        key: "_imgOnLoadError",
        value: function(t) {
            var e = t.currentTarget.dataset.src;
            this._removeFromLoadList(e), this._runCallback("Loading failed", {
                src: e
            });
        }
    }, {
        key: "_removeFromLoadList",
        value: function(t) {
            var e = this.page.data.imgLoadList;
            e.splice(e.indexOf(t), 1), this.page.setData({
                imgLoadList: e
            });
        }
    }, {
        key: "_runCallback",
        value: function(t, e) {
            (this.callbacks[e.src] || this.defaultCallback)(t, e), delete this.callbacks[e.src];
        }
    } ]) && t(i.prototype, a), r && t(i, r), e;
}();

module.exports = e;