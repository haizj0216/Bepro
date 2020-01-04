var e = require("../common/config.default"),
    t = require("./lib/queue-request").queueRequest;

function n() {
    var e;
    return e || (e = wx.getStorageSync("token")), e;
}

module.exports = {
    request: function (a) {
        var  c = a.method || "POST",
            o = "".concat(e.apiHost).concat(e.apiUrl[a.url] || a.url),
            i = Object.assign({}, a.data),
            r = n(),
            s = {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
            };
        if (r) s["Ac-Token"] = r;
        else if (o.indexOf("wx/user/form_id") > -1) return;
        var u = Object.assign({}, s, a.header);
        return new Promise(function (e, n) {
            t(wx.request, 5)({
                url: o,
                data: i,
                header: u,
                method: c,
                success: function (t) {
                    var a = t.data || {};
                    if ("string" != typeof a) {
                        var c = a.code,
                            i = a.msg;
                        if( "101001" === "".concat(c)) {
                            wx.setStorageSync('token', '')
                            wx.showModal({
                              title: '授权登录',
                              content:'授权失效，请重新授权',
                              cancelText:'取消',
                              confirmText:'确定',
                              success(res) {
                                  var app = getApp()
                                  app.relaodToken();
                              }
                            })
                        } else {
                            "99999" === "".concat(c) ? e(a) : ( "101001" === "".concat(c) && wx.removeStorageSync("token"), n({
                                errMsg: "".concat(i, "(").concat(c, ")")
                            }));
                        }
                        
                    } else try {
                        a = JSON.parse(a);
                    } catch (e) {
                        n(a);
                    }
                },
                fail: n,
                complete: n
            });
        });
    },
    
   
    uploadFile: function (a) {
        var c = this,
            o = "".concat(e.apiHost.default).concat(a.url),
            i = Object.assign({}, a.data, {
                timeFormat: "YYYY-MM-DD HH:mm:ss"
            }),
            r = n(),
            s = Object.assign({}, {
                "Ac-Token": r,
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }, a.header);
        return t(this.uploadFile, 5)({
            url: o,
            filePath: a.filePath,
            name: a.name || "file",
            header: s,
            formData: i,
            success: function (e) {
                var t = e.data;
                if ("string" == typeof t) try {
                    t = (t = t.replace(/[\u00a0\ufeff]/g, "")).replace(/[\u2028\u2029]/g, "\\n"), t = JSON.parse(t);
                } catch (e) {
                    return void(a.fail instanceof Function && a.fail({
                        errMsg: "上传文件失败"
                    }));
                }
                var n = t.code,
                    i = t.msg;
                console.log("\n", "upload: ".concat(o), a, "\nRES:", e, "\n"), "0" === "".concat(n) ? a.success instanceof Function && a.success(t) : (c.showToast({
                    title: i
                }), a.fail instanceof Function && a.fail({
                    errMsg: "".concat(i, "(").concat(n, ")")
                }));
            },
            fail: function (e) {
                a.fail instanceof Function && a.fail(e);
            },
            complete: function (e) {
                a.complete instanceof Function && a.complete(e);
            }
        }, function (e) {
            "function" == typeof a.callback && a.callback(e);
        });
    }
};