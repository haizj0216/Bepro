Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VantComponent = function() {
    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = {};
    t = a, o = r, i = {
        data: "data",
        props: "properties",
        mixins: "behaviors",
        methods: "methods",
        beforeCreate: "created",
        created: "attached",
        mounted: "ready",
        relations: "relations",
        destroyed: "detached",
        classes: "externalClasses"
    }, Object.keys(i).forEach(function(e) {
        t[e] && (o[i[e]] = t[e]);
    });
    var t, o, i;
    var n = a.relation;
    n && (r.relations = Object.assign(r.relations || {}, function(e, s, a) {
        s in e ? Object.defineProperty(e, s, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[s] = a;
        return e;
    }({}, "../".concat(n.name, "/index"), n)));
    r.externalClasses = r.externalClasses || [], r.externalClasses.push("custom-class"), 
    r.behaviors = r.behaviors || [], r.behaviors.push(e.basic), a.field && r.behaviors.push("wx://form-field");
    r.options = {
        multipleSlots: !0,
        addGlobalClass: !0
    }, (0, s.observe)(a, r), Component(r);
};

var e = require("../mixins/basic"), s = require("../mixins/observer/index");