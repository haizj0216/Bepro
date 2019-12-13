!function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var l in e) if (Object.prototype.hasOwnProperty.call(e, l)) {
        var t = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, l) : {};
        t.get || t.set ? Object.defineProperty(r, l, t) : r[l] = e[l];
    }
    r.default = e;
}(require("../../utils/wx.js"));

module.exports = [ [ {
    text: "水质硬度",
    value: 1,
    s: 5,
    color: "rgb(111, 143, 125)",
    key: "r1",
    level: 5,
    name: 4
}, {
    text: "水质pH",
    value: 7,
    s: 2,
    color: "rgb(120, 158, 136)",
    key: "r10",
    level: 20,
    name: 5
}, {
    text: "相对湿度",
    value: 50,
    s: 100,
    color: "rgb(140, 183, 159)",
    key: "r3",
    level: 20,
    name: 7
}, {
    text: "历史均温",
    value: 50,
    s: 70,
    color: "rgb(157, 206, 178)",
    key: "r2",
    level: 14,
    name: 6
}, {
    text: "损伤指数",
    value: 1,
    s: 5,
    color: "rgb(202, 158, 131)",
    key: "r7",
    level: 5,
    name: 8
}, {
    text: "发质强度",
    value: 1,
    s: 3,
    color: "rgb(236, 184, 152)",
    key: "r8",
    level: 3,
    name: 9
}, {
    text: "柔顺指数",
    value: 1,
    s: 4,
    color: "rgb(247, 208, 183)",
    key: "r9",
    level: 4,
    name: 10
}, {
    text: "油脂分泌指数",
    value: 50,
    s: 100,
    color: "rgb(209, 153, 153)",
    key: "r4",
    level: 20,
    name: 1
}, {
    text: "头皮敏感指数",
    value: 1,
    s: 6,
    color: "rgb(237, 184, 184)",
    key: "r5",
    level: 6,
    name: 2
}, {
    text: "角质代谢速率",
    value: 1,
    s: 4,
    color: "rgb(241, 212, 212)",
    key: "r6",
    level: 4,
    name: 3
} ] ];