var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) if (Object.prototype.hasOwnProperty.call(e, a)) {
        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, a) : {};
        r.get || r.set ? Object.defineProperty(t, a, r) : t[a] = e[a];
    }
    return t.default = e, t;
}(require("../../utils/wx.js"));

function t(e, t, a, r, n, i, o) {
    try {
        var l = e[i](o), s = l.value;
    } catch (e) {
        return void a(e);
    }
    l.done ? t(s) : Promise.resolve(s).then(r, n);
}

var a = getApp(), r = (require("../../utils/lib/number"), require("./profile.js")), n = [ "软水", "偏软水", "偏硬水", "硬水", "极硬水" ], i = (r = r.map(function(e, t) {
    return e.map(function(a, n) {
        return a.piePiece = r.length * e.length, a.textRotate = 90 * (t - 1) + (90 / e.length / 2 + 90 / e.length * n), 
        a.radian = 360 / a.piePiece, a;
    });
})).reduce(function(e, t) {
    return e.concat(t);
}, []).map(function(e) {
    return {
        radian: e.radian,
        color: e.color,
        text: e.text,
        value: e.value,
        s: e.s,
        key: e.key,
        name: e.name,
        level: e.level
    };
});

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        recordPage: {
            type: Boolean,
            value: !1
        }
    },
    showRequest: !1,
    data: {
        showPieImage: !1,
        firstEndQ: !1,
        profile: r,
        userInfo: {},
        qResult: {},
        results: [],
        width: a.globalData.systemInfo.screenWidth,
        height: 320,
        modalContent: {
            key: "",
            des: ""
        },
        pieImage: "",
        exactTest: [],
        loading: !0,
        chartData: []
    },
    pageLifetimes: {
        show: function() {
            this.init();
        }
    },
    lifetimes: {
        attached: function() {
            this.init();
        }
    },
    methods: {
        init: function() {
            var t = e.default.getStorageSync("firstEndQ"), a = e.default.getStorageSync("userInfo"), r = e.default.getStorageSync("exactTest");
            a && (a = JSON.parse(a), this.setData({
                userInfo: a,
                showPieImage: !1,
                firstEndQ: t,
                exactTest: r || []
            })), this.getRecordProfile();
        },
        getRecordProfile: function() {
            var a, r = (a = e.regeneratorRuntime.mark(function t() {
                var a, r, o, l, s, u;
                return e.regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (a = e.default.getStorageSync("hasFinishQ"), this.setData({
                            hasDoneQ: a
                        }), a) {
                            t.next = 4;
                            break;
                        }
                        return t.abrupt("return");

                      case 4:
                        return this.data.loading && e.default.showLoading(), t.next = 7, e.default.request({
                            url: "recordDetail",
                            method: "POST"
                        });

                      case 7:
                        r = t.sent, console.log("record", r), 0 === r.code && (o = r.data, l = o.contentMap, 
                        s = o.result, l.q4 = l.q4.split(","), s = JSON.parse(s), Object.keys(s).forEach(function(e) {
                            var t = i.findIndex(function(t) {
                                return t.key === e;
                            });
                            if (t > -1) {
                                if (i[t].value = parseFloat(s[e]), "r1" === e) {
                                    var a = n.indexOf(s[e]) + 1;
                                    i[t].value = a > 0 ? a : 1;
                                }
                                if ("r2" === e && (i[t].value = parseFloat(s[e]) + 30), "r10" === e && (i[t].value = parseFloat(s[e]) - 6.5), 
                                i[t].img = i[t].value === i[t].level ? "100" : i[t].value, [ "r10", "r3", "r4", "r2" ].indexOf(e) > -1) {
                                    var r = "r2" === e ? 7.14 : 5, o = Math.round(i[t].value / i[t].s * 100 / r);
                                    i[t].img = o === i[t].level ? "100" : o;
                                }
                            }
                        }), console.log("chartData", i), this.draw(), (u = []).push({
                            name: "头皮类型",
                            icon: "profile-head.png",
                            items: [ {
                                key: "油脂分泌指数",
                                value: s.r4,
                                level: "/100",
                                des: "数值越高，代表头皮当前环境下出油量越大，需要使用的去油能力更强的配方"
                            }, {
                                key: "头皮敏感指数",
                                value: s.r5,
                                level: "/6",
                                des: "数值越高，代表头皮越容易敏感，需要使用更温和的配方"
                            }, {
                                key: "角质代谢速率",
                                value: s.r6,
                                level: "/4",
                                des: "数值越高，代表头皮角质代谢越旺盛，越容易产生头屑"
                            } ]
                        }), u.push({
                            name: "发质类型",
                            icon: "profile-type.png",
                            items: [ {
                                key: "损伤指数",
                                value: s.r7,
                                level: "/5",
                                des: "数值越高，代表头发损伤程度越严重，需要使用修护力更高的配方"
                            }, {
                                key: "发质强度",
                                value: s.r8,
                                level: "/3",
                                des: "数值越低，代表头发强度越低，对潜在损伤的抵御力越弱"
                            }, {
                                key: "柔顺指数",
                                value: s.r9,
                                level: "/4",
                                des: "数值越低，代表头发越柔顺性越差，越容易产生干枯、毛糙、分叉现象"
                            } ]
                        }), u.push({
                            name: "环境类型*",
                            icon: "profile-cloud.png",
                            items: [ {
                                key: "水质硬度",
                                value: s.r1,
                                des: "以单位水中钙、镁离子含量评估，水质硬度越高，洗发水的清洁能力越弱"
                            }, {
                                key: "水质pH",
                                value: s.r10,
                                des: "头皮为弱酸性环境，碱性水质下，需要使用酸性洗发水平衡水质碱度，维护头皮健康"
                            }, {
                                key: "历史均温",
                                value: "n/a" !== s.r2 ? Math.round(s.r2) : s.r2,
                                level: "℃",
                                des: "最近5年的当月平均温度"
                            }, {
                                key: "相对湿度",
                                value: s.r3,
                                level: "%",
                                des: "最近5年的当月平均湿度"
                            } ]
                        }), console.log("arr", u), this.setData({
                            qResult: l,
                            results: u,
                            loading: !1,
                            chartData: i
                        })), e.default.hideLoading();

                      case 11:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }), function() {
                var e = this, r = arguments;
                return new Promise(function(n, i) {
                    var o = a.apply(e, r);
                    function l(e) {
                        t(o, n, i, l, s, "next", e);
                    }
                    function s(e) {
                        t(o, n, i, l, s, "throw", e);
                    }
                    l(void 0);
                });
            });
            return function() {
                return r.apply(this, arguments);
            };
        }(),
        showModal: function(e) {
            this.triggerEvent("itemshow", e.currentTarget.dataset.item);
        },
        hideModal: function() {
            var e = this;
            this.setData({
                showPieImage: !1
            }, function() {
                e.triggerEvent("itemhide");
            });
        },
        draw: function() {
            var t = e.default.createCanvasContext("mypie", this), a = {
                x: this.data.width / 2,
                y: this.data.height / 2
            }, r = .26 * this.data.width, n = 0, o = .5 * Math.PI;
            i.forEach(function(e, i) {
                t.beginPath(), t.fillStyle = e.color, t.setStrokeStyle("rgb(230, 230, 230)"), t.lineWidth = 1;
                var o = e.radian / 360 * 2 * Math.PI, l = n + o;
                t.arc(a.x, a.y, r * (e.value / e.s), n, l, !1), n = l, t.lineTo(a.x, a.y), t.stroke(), 
                t.fill(), t.closePath();
            }), n = 0, i.forEach(function(e) {
                t.beginPath(), t.setStrokeStyle("rgb(230, 230, 230)"), t.lineWidth = 1;
                var i = n + e.radian / 360 * 2 * Math.PI;
                t.arc(a.x, a.y, r, n, i, !1), n = i, t.lineTo(a.x, a.y), t.stroke(), t.closePath();
            });
            for (var l = 1; l < 5; l++) t.beginPath(), t.setStrokeStyle("rgb(230, 230, 230)"), 
            t.lineWidth = 1, t.arc(a.x, a.y, r / 4 * l, 0, 2 * Math.PI, !1), t.stroke(), t.closePath();
            for (l = 0; l < 5; l++) t.beginPath(), t.fillStyle = "#fff", t.arc(a.x, a.y - r / 4 * l, 6, 0, 2 * Math.PI, !1), 
            t.fill(), t.closePath(), t.setFontSize(6), t.setFillStyle("rgb(103, 106, 113)"), 
            t.setTextAlign("center"), t.setTextBaseline("middle"), t.fillText(25 * l, a.x, a.y - r / 4 * l);
            n = 0;
            var s = 0;
            i.forEach(function(e, i) {
                t.beginPath(), t.setFontSize(9), t.fillStyle = "rgb(103, 106, 113)";
                var l = e.radian / 360 * 2 * Math.PI, u = a.x + Math.sin(n + o + l / 2) * (r + 10), c = a.y - Math.cos(n + o + l / 2) * (r + 10);
                s += e.radian / 2, t.save(), t.translate(u, c);
                var d = 25;
                s < 90 ? (t.rotate(s * Math.PI / 180), d = 26) : s < 180 ? (d = -15, t.rotate((s + 180) * Math.PI / 180)) : s < 270 ? (t.rotate((s + 180) * Math.PI / 180), 
                d = -15) : (t.rotate(s * Math.PI / 180), d = 25), t.translate(d, 0), t.fillText(e.text, 0, 0), 
                t.restore(), n += l, s += e.radian / 2, t.closePath();
            }), t.draw(!1);
        },
        goUpdateProfile: function(t) {
            var r = "缩略档案页";
            t.currentTarget.dataset && t.currentTarget.dataset.clearFirst && (e.default.setStorage({
                key: "firstEndQ",
                data: !1
            }), r = "展开档案页"), this.triggerEvent("goUpdateProfile"), e.default.navigateTo({
                url: "/pages/updateProfile/updateProfile"
            }), a.sensors.track("startUpdateQuestion", {
                fill_page: r
            });
        },
        goExactTesting: function() {
            this.data.exactTest.length;
        },
        goForceExactTesting: function() {
            e.default.navigateTo({
                url: "/pages/exactTesting/exactTesting"
            });
        },
        goRecommendProduct: function() {
            this.triggerEvent("goRecommendProduct"), e.default.navigateTo({
                url: "/pages/recommend/recommend?home=1&from=展开档案页"
            });
        }
    }
});