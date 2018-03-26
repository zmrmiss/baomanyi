//Copyright 2012, etc.

/**
 * almond 0.1.2 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/**
 * @license RequireJS text 2.0.12 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

/**
 * Swiper 3.2.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: November 28, 2015
 */

(function (e, t) {
    typeof define == "function" && define.amd ? define([], t) : e.kzPlayer = t()
})(this, function () {
    var e, t, n;
    return function (r) {
        function c(e, t) {
            var n = t && t.split("/"), r = o.map, i = r && r["*"] || {}, s, u, a, f, l, c, h, p, d, v;
            if (e && e.charAt(0) === "." && t) {
                n = n.slice(0, n.length - 1), e = n.concat(e.split("/"));
                for (p = 0; v = e[p]; p++)if (v === ".") e.splice(p, 1), p -= 1; else if (v === "..") {
                    if (p === 1 && (e[2] === ".." || e[0] === ".."))return !0;
                    p > 0 && (e.splice(p - 1, 2), p -= 2)
                }
                e = e.join("/")
            }
            if ((n || i) && r) {
                s = e.split("/");
                for (p = s.length; p > 0; p -= 1) {
                    u = s.slice(0, p).join("/");
                    if (n)for (d = n.length; d > 0; d -= 1) {
                        a = r[n.slice(0, d).join("/")];
                        if (a) {
                            a = a[u];
                            if (a) {
                                f = a, l = p;
                                break
                            }
                        }
                    }
                    if (f)break;
                    !c && i && i[u] && (c = i[u], h = p)
                }
                !f && c && (f = c, l = h), f && (s.splice(0, l, f), e = s.join("/"))
            }
            return e
        }

        function h(e, t) {
            return function () {
                return l.apply(r, a.call(arguments, 0).concat([e, t]))
            }
        }

        function p(e) {
            return function (t) {
                return c(t, e)
            }
        }

        function d(e) {
            return function (t) {
                i[e] = t
            }
        }

        function v(e) {
            if (s.hasOwnProperty(e)) {
                var t = s[e];
                delete s[e], u[e] = !0, f.apply(r, t)
            }
            if (!i.hasOwnProperty(e))throw new Error("No " + e);
            return i[e]
        }

        function m(e, t) {
            var n, r, i = e.indexOf("!");
            return i !== -1 ? (n = c(e.slice(0, i), t), e = e.slice(i + 1), r = v(n), r && r.normalize ? e = r.normalize(e, p(t)) : e = c(e, t)) : e = c(e, t), {
                f: n ? n + "!" + e : e,
                n: e,
                p: r
            }
        }

        function g(e) {
            return function () {
                return o && o.config && o.config[e] || {}
            }
        }

        var i = {}, s = {}, o = {}, u = {}, a = [].slice, f, l;
        f = function (e, t, n, o) {
            var a = [], f, l, c, p, y, b;
            o = o || e;
            if (typeof n == "function") {
                t = !t.length && n.length ? ["require", "exports", "module"] : t;
                for (b = 0; b < t.length; b++) {
                    y = m(t[b], o), c = y.f;
                    if (c === "require") a[b] = h(e); else if (c === "exports") a[b] = i[e] = {}, f = !0; else if (c === "module") l = a[b] = {
                        id: e,
                        uri: "",
                        exports: i[e],
                        config: g(e)
                    }; else if (i.hasOwnProperty(c) || s.hasOwnProperty(c)) a[b] = v(c); else if (y.p) y.p.load(y.n, h(o, !0), d(c), {}), a[b] = i[c]; else if (!u[c])throw new Error(e + " missing " + c)
                }
                p = n.apply(i[e], a);
                if (e)if (l && l.exports !== r && l.exports !== i[e]) i[e] = l.exports; else if (p !== r || !f) i[e] = p
            } else e && (i[e] = n)
        }, e = t = l = function (e, t, n, i) {
            return typeof e == "string" ? v(m(e, t).f) : (e.splice || (o = e, t.splice ? (e = t, t = n, n = null) : e = r), t = t || function () {
                }, i ? f(r, e, t, n) : setTimeout(function () {
                f(r, e, t, n)
            }, 15), l)
        }, l.config = function (e) {
            return o = e, l
        }, n = function (e, t, n) {
            t.splice || (n = t, t = []), s[e] = [e, t, n]
        }, n.amd = {jQuery: !0}
    }(), n("almond", function () {
    }), n("global", [], function () {
        var e = {
            _setGlobal: function (e) {
                this.width = e.width, this.height = e.height
            },
            width: 320,
            height: 515,
            is_wechat: /micromessenger/ig.test(window.navigator.userAgent),
            is_qq: /QQ/g.test(window.navigator.userAgent),
            is_apple: /AppleWebKit/ig.test(window.navigator.userAgent),
            is_ios: /ipad|iphone/ig.test(window.navigator.userAgent),
            landscape: !1,
            with_ad: undefined,
            is_editing_page: function () {
                try {
                    return ["t1.com", "www.t1.com", "www.kuaizhan.com", "kuaizhan.com", "www.kuaizhan.sohuno.com", "kuaizhan.sohuno.com"].indexOf(window.location.host.toLowerCase()) >= 0
                } catch (e) {
                    return !1
                }
            }(),
            keyboard_shown: !1
        };
        return window.SOHUZ && window.SOHUZ.page && window.SOHUZ.page.site_id && e.with_ad == undefined && window.$ && $.ajax({
            type:"GET",
            url: "mindex_files/wap.js",
            dataType: "jsonp",
            cache: !1,
            data: {site_id: window.SOHUZ.page.site_id},
            success: function (t) {
                e.with_ad = t.ret == "0"
            }
        }), e
    }), n("text", ["module"], function (e) {
        var n, r, i, s, o, u = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], a = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, f = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, l = typeof location != "undefined" && location.href, c = l && location.protocol && location.protocol.replace(/\:/, ""), h = l && location.hostname, p = l && (location.port || undefined), d = {}, v = e.config && e.config() || {};
        n = {
            version: "2.0.12", strip: function (e) {
                if (e) {
                    e = e.replace(a, "");
                    var t = e.match(f);
                    t && (e = t[1])
                } else e = "";
                return e
            }, jsEscape: function (e) {
                return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
            }, createXhr: v.createXhr || function () {
                var e, t, n;
                if (typeof XMLHttpRequest != "undefined")return new XMLHttpRequest;
                if (typeof ActiveXObject != "undefined")for (t = 0; t < 3; t += 1) {
                    n = u[t];
                    try {
                        e = new ActiveXObject(n)
                    } catch (r) {
                    }
                    if (e) {
                        u = [n];
                        break
                    }
                }
                return e
            }, parseName: function (e) {
                var t, n, r, i = !1, s = e.indexOf("."), o = e.indexOf("./") === 0 || e.indexOf("../") === 0;
                return s !== -1 && (!o || s > 1) ? (t = e.substring(0, s), n = e.substring(s + 1, e.length)) : t = e, r = n || t, s = r.indexOf("!"), s !== -1 && (i = r.substring(s + 1) === "strip", r = r.substring(0, s), n ? n = r : t = r), {
                    moduleName: t,
                    ext: n,
                    strip: i
                }
            }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function (e, t, r, i) {
                var s, o, u, a = n.xdRegExp.exec(e);
                return a ? (s = a[2], o = a[3], o = o.split(":"), u = o[1], o = o[0], (!s || s === t) && (!o || o.toLowerCase() === r.toLowerCase()) && (!u && !o || u === i)) : !0
            }, finishLoad: function (e, t, r, i) {
                r = t ? n.strip(r) : r, v.isBuild && (d[e] = r), i(r)
            }, load: function (e, t, r, i) {
                if (i && i.isBuild && !i.inlineText) {
                    r();
                    return
                }
                v.isBuild = i && i.isBuild;
                var s = n.parseName(e), o = s.moduleName + (s.ext ? "." + s.ext : ""), u = t.toUrl(o), a = v.useXhr || n.useXhr;
                if (u.indexOf("empty:") === 0) {
                    r();
                    return
                }
                !l || a(u, c, h, p) ? n.get(u, function (t) {
                    n.finishLoad(e, s.strip, t, r)
                }, function (e) {
                    r.error && r.error(e)
                }) : t([o], function (e) {
                    n.finishLoad(s.moduleName + "." + s.ext, s.strip, e, r)
                })
            }, write: function (e, t, r, i) {
                if (d.hasOwnProperty(t)) {
                    var s = n.jsEscape(d[t]);
                    r.asModule(e + "!" + t, "define(function () { return '" + s + "';});\n")
                }
            }, writeFile: function (e, t, r, i, s) {
                var o = n.parseName(t), u = o.ext ? "." + o.ext : "", a = o.moduleName + u, f = r.toUrl(o.moduleName + u) + ".js";
                n.load(a, r, function (t) {
                    var r = function (e) {
                        return i(f, e)
                    };
                    r.asModule = function (e, t) {
                        return i.asModule(e, f, t)
                    }, n.write(e, a, r, s)
                }, s)
            }
        };
        if (v.env === "node" || !v.env && typeof process != "undefined" && process.versions && !!process.versions.node && !process.versions["node-webkit"]) r = t.nodeRequire("fs"), n.get = function (e, t, n) {
            try {
                var i = r.readFileSync(e, "utf8");
                i.indexOf("﻿") === 0 && (i = i.substring(1)), t(i)
            } catch (s) {
                n && n(s)
            }
        }; else if (v.env === "xhr" || !v.env && n.createXhr()) n.get = function (e, t, r, i) {
            var s = n.createXhr(), o;
            s.open("GET", e, !0);
            if (i)for (o in i)i.hasOwnProperty(o) && s.setRequestHeader(o.toLowerCase(), i[o]);
            v.onXhr && v.onXhr(s, e), s.onreadystatechange = function (n) {
                var i, o;
                s.readyState === 4 && (i = s && s.status || 0, i > 399 && i < 600 ? (o = new Error(e + " HTTP status: " + i), o.xhr = s, r && r(o)) : t(s.responseText), v.onXhrComplete && v.onXhrComplete(s, e))
            }, s.send(null)
        }; else if (v.env === "rhino" || !v.env && typeof Packages != "undefined" && typeof java != "undefined") n.get = function (e, t) {
            var n, r, i = "utf-8", s = new java.io.File(e), o = java.lang.System.getProperty("line.separator"), u = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s), i)), a = "";
            try {
                n = new java.lang.StringBuffer, r = u.readLine(), r && r.length() && r.charAt(0) === 65279 && (r = r.substring(1)), r !== null && n.append(r);
                while ((r = u.readLine()) !== null)n.append(o), n.append(r);
                a = String(n.toString())
            } finally {
                u.close()
            }
            t(a)
        }; else if (v.env === "xpconnect" || !v.env && typeof Components != "undefined" && Components.classes && Components.interfaces) i = Components.classes, s = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), o = "@mozilla.org/windows-registry-key;1" in i, n.get = function (e, t) {
            var n, r, u, a = {};
            o && (e = e.replace(/\//g, "\\")), u = new FileUtils.File(e);
            try {
                n = i["@mozilla.org/network/file-input-stream;1"].createInstance(s.nsIFileInputStream), n.init(u, 1, 0, !1), r = i["@mozilla.org/intl/converter-input-stream;1"].createInstance(s.nsIConverterInputStream), r.init(n, "utf-8", n.available(), s.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), r.readString(n.available(), a), r.close(), n.close(), t(a.value)
            } catch (f) {
                throw new Error((u && u.path || "") + ": " + f)
            }
        };
        return n
    }), n("text!templates/loading_default.html", [], function () {
        return "<div class='loading_inner' style='width:100%;height:100%;background:{{loading_bg}}'>\n        <p class='logo'><img src='{{loading_logo}}'/></p>\n        <span id='load_bar_text' style=\"color:{{loading_text_color}}\" class='loaded_text'>0%</span>\n        <div class='loading animated'>\n            <div style='background-color:{{loading_bar_color}}' class='loaded'\n                 id='load_bar'></div>\n        </div>\n</div>\n"
    }), n("text!templates/loading_cycle.html", [], function () {
        return '<div class=\'loading_inner\' style=\'width:100%;height:100%;background:{{loading_bg}}\'>\n    <p class=\'logo\' style=\'top:90%\'><img src=\'{{loading_logo}}\'/></p>\n        <span style="width: 100px;position: absolute;top: 40%;left: 50%;text-align: center; margin-top: -14px;color:{{loading_text_color}}"\n              class=\'loaded_text\'>\n            <span style=\'font-size: 20px;\' id=\'load_bar_text\'>0</span>\n            %</span>\n\n    <div  style="width: 100px;height:100px; position: absolute;top: 40%;left: 50%;margin-left: -50px;margin-top: -50px;">\n        <svg viewBox="0 0 100 100">\n            <path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="rgba(255,255,255,.2)"\n                  stroke-width="3" fill-opacity="0"></path>\n            <path id=\'p-bar\' d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="{{loading_bar_color}}"\n                  stroke-width="4" fill-opacity="0" style="stroke-dasharray: 282.783px, 282.783px;"></path>\n        </svg>\n    </div>\n</div>\n'
    }), n("text!templates/loading_rect.html", [], function () {
        return '<div class=\'loading_inner\' style=\'width:100%;height:100%;background:{{loading_bg}}\'>\n    <p class=\'logo\' style=\'top:90%\'><img src=\'{{loading_logo}}\'/></p>\n        <span style="width: 100px;position: absolute;top: 40%;left: 50%;text-align: center; margin-top: -14px;color:{{loading_text_color}}"\n              class=\'loaded_text\'>\n            <span style=\'font-size: 20px;\' id=\'load_bar_text\'>0</span>\n            </span>\n\n    <div  style="width: 100px;height:100px; position: absolute;top: 40%;left: 50%;margin-left: -50px;margin-top: -50px;">\n\n\n        <svg viewBox="0 0 100 100">\n            <path d="M49.95,5 88.25,27.5 88.25,72.5 49.95,95 11.75,72.5 11.75,27.5 49.95,5 "  stroke="rgba(255,255,255,.2)"\n                  stroke-width="3" fill-opacity="0"/>\n\n            <path id="p-bar" fill-opacity="0"  stroke="{{loading_bar_color}}" stroke-width="3" stroke-miterlimit="10" d="M49.95,5 88.25,27.5 88.25,72.5 49.95,95 11.75,72.5 11.75,27.5 49.95,5 " style="stroke-dasharray: 270px;stroke-dashoffset:270px"/>\n        </svg>\n    </div>\n</div>\n'
    }), n("text!templates/loading_carton.html", [], function () {
        return '<style>\n    @-webkit-keyframes carton_rotateOutUpLeft {\n        0% {\n            -webkit-transform-origin: center;\n            transform-origin: center;\n            opacity: 0\n        }\n        10% {\n            -webkit-transform-origin: center;\n            transform-origin: center;\n            opacity: .5\n        }\n        100% {\n\n            -webkit-transform: translateX(-100px) rotate(90deg);\n            transform: translateX(-100px) rotate(90deg);\n            opacity: 0\n        }\n    }\n\n    @keyframes carton_rotateOutUpLeft {\n        0% {\n            -webkit-transform-origin: center;\n            transform-origin: center;\n            opacity: 0\n        }\n        10% {\n            -webkit-transform-origin: center;\n            transform-origin: center;\n            opacity: .5\n        }\n        100% {\n            -webkit-transform: translateX(-100px) rotate(90deg);\n            transform: translateX(-100px) rotate(90deg);\n            opacity: 0\n        }\n    }\n\n    .carton_rotateOutUpLeft {\n        -webkit-animation-name: carton_rotateOutUpLeft;\n        animation-name: carton_rotateOutUpLeft\n    }\n</style>\n<div class=\'loading_inner\' style=\'width:100%;height:100%;background:{{loading_bg}}\'>\n    <p class=\'logo\' style=\'top:90%\'><img src=\'{{loading_logo}}\'/></p>\n        <span style="    width: 100px;\n    position: absolute;\n    top: 40%;\n    left: 50%;\n    text-align: center;\n    margin-top: 10px;\n    color:{{loading_text_color}}"\n              class=\'loaded_text\'>\n            <span style=\'\' id=\'load_bar_text\'>0</span>\n            </span>\n\n    <div id=\'carton_loading_bar\'  style="width: 170px;height:60px; position: absolute;top: 40%;left: 50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)">\n        <div style=\'width: 130px;\n    height: 16px;\n    position: absolute;\n    top: 12px; z-index: 2;\n    left: 5px;\'><div style=\'background:{{loading_bar_color}};height:100%;border-radius: 8px;\' id=\'p-bar\'></div></div>\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n	 width="18" height="15" viewBox="0 0 37.369 30.001" enable-background="new 0 0 37.369 30.001" xml:space="preserve"\n        style=\'position: absolute;\n            animation-duration: 5s;\n    -webkit-animation-duration: 5s;\n        animation-delay: 1s;\n    -webkit-animation-delay: 1s;\n    right: 30px;\n    top: 10px;\'\n    class=\'animated carton_rotateOutUpLeft infinite\'>\n<g id="图层_2">\n	<path fill-rule="evenodd" clip-rule="evenodd" fill="{{loading_bar_color}}" d="M21.49,25.046c-4.96,1.894-7.49,1.632-8.696,1.162\n		c-1.985,1.467-4.194,2.849-6.383,3.714c-1.569,0.622-4.257-2.648-1.159-2.39c1.464,0.122,3.766-1.064,6.078-2.727\n		c-0.638-1.268-1.523-4.298-0.074-10.196C13.857,4.02,29.256,0.791,37.369,0C28.809,7.82,34.88,19.938,21.49,25.046z"/>\n</g>\n</svg>\n        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n	 width="14" height="11" viewBox="0 0 37.369 30.001" enable-background="new 0 0 37.369 30.001" xml:space="preserve"\n        style=\'position: absolute;\n            animation-duration: 5s;\n    -webkit-animation-duration: 5s;\n\n    right: 80px;\n    top: 15px;\'\n    class=\'animated carton_rotateOutUpLeft infinite\'>\n<g id="图层_2">\n	<path fill-rule="evenodd" clip-rule="evenodd" fill="{{loading_bar_color}}" d="M21.49,25.046c-4.96,1.894-7.49,1.632-8.696,1.162\n		c-1.985,1.467-4.194,2.849-6.383,3.714c-1.569,0.622-4.257-2.648-1.159-2.39c1.464,0.122,3.766-1.064,6.078-2.727\n		c-0.638-1.268-1.523-4.298-0.074-10.196C13.857,4.02,29.256,0.791,37.369,0C28.809,7.82,34.88,19.938,21.49,25.046z"/>\n</g>\n</svg>\n        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n	 width="100%" height="100%" viewBox="0 0 100 30" enable-background="new 0 0 342.569 60" xml:space="preserve">\n<g>\n	<path opacity="0.4" fill="#FFFFFF" d="M84.78,15.664c-0.017-0.015-0.034-0.03-0.051-0.044c-0.111-0.096-0.219-0.194-0.325-0.294\n			c-0.018-0.018-0.036-0.035-0.054-0.052c-0.243-0.236-0.472-0.485-0.686-0.747c-0.004-0.005-0.008-0.01-0.012-0.015\n			c-0.098-0.121-0.193-0.245-0.284-0.371c-0.021-0.028-0.04-0.056-0.06-0.084c-0.077-0.108-0.151-0.219-0.223-0.332\n			c-0.019-0.029-0.039-0.059-0.058-0.089c-0.083-0.135-0.165-0.271-0.242-0.411c-0.002-0.004-0.004-0.008-0.007-0.012\n			c-0.081-0.147-0.156-0.297-0.229-0.449c-0.014-0.028-0.025-0.057-0.039-0.085c-0.055-0.12-0.108-0.241-0.157-0.363\n			c-0.019-0.045-0.037-0.09-0.053-0.135c-0.044-0.113-0.085-0.227-0.125-0.342c-0.015-0.043-0.03-0.087-0.044-0.132\n			c-0.047-0.146-0.091-0.294-0.13-0.443c-0.003-0.011-0.006-0.021-0.009-0.032c-0.042-0.161-0.078-0.324-0.11-0.488\n			c-0.009-0.045-0.017-0.092-0.025-0.138c-0.021-0.119-0.042-0.239-0.058-0.36c-0.008-0.056-0.015-0.113-0.021-0.169\n			c-0.014-0.118-0.025-0.236-0.035-0.355c-0.004-0.053-0.008-0.104-0.012-0.157c-0.01-0.17-0.016-0.341-0.016-0.513\n			c0-0.172,0.006-0.343,0.016-0.513c0.003-0.052,0.008-0.104,0.012-0.157c0.009-0.119,0.021-0.238,0.035-0.356\n			c0.007-0.057,0.014-0.113,0.021-0.169c0.016-0.121,0.036-0.241,0.058-0.36c0.008-0.046,0.016-0.092,0.025-0.138\n			c0.032-0.164,0.068-0.327,0.11-0.487C81.997,6.86,82,6.85,82.003,6.839c0.039-0.15,0.083-0.297,0.13-0.444\n			c0.014-0.044,0.03-0.088,0.044-0.132c0.039-0.115,0.081-0.229,0.125-0.342c0.017-0.045,0.034-0.09,0.052-0.134\n			c0.05-0.123,0.103-0.244,0.158-0.364c0.013-0.028,0.025-0.057,0.039-0.084c0.072-0.152,0.148-0.302,0.229-0.45\n			c0.002-0.004,0.005-0.008,0.007-0.012c0.077-0.139,0.158-0.276,0.242-0.41c0.019-0.03,0.039-0.06,0.058-0.089\n			c0.072-0.112,0.146-0.223,0.223-0.332c0.02-0.028,0.04-0.057,0.06-0.084c0.091-0.126,0.186-0.25,0.284-0.371\n			c0.004-0.004,0.007-0.01,0.012-0.015c0.213-0.262,0.443-0.511,0.686-0.747c0.018-0.018,0.037-0.035,0.054-0.052\n			c0.106-0.101,0.214-0.199,0.325-0.294c0.017-0.015,0.034-0.03,0.051-0.044c0.26-0.221,0.533-0.427,0.818-0.617H7.23\n			C3.237,1.821,0,5.058,0,9.051c0,3.993,3.237,7.229,7.23,7.229h78.368C85.313,16.091,85.041,15.885,84.78,15.664z"/>\n	<path fill="#FFFFFF" stroke="#F4F4F4" stroke-miterlimit="10" d="M90.393,0c-4.792,0-8.676,3.884-8.676,8.676\n			s3.884,8.676,8.676,8.676s8.676-3.884,8.676-8.676S95.185,0,90.393,0z M90.393,16.966c-4.578,0-8.29-3.712-8.29-8.29\n			c0-4.579,3.712-8.29,8.29-8.29c4.579,0,8.29,3.711,8.29,8.29C98.683,13.254,94.972,16.966,90.393,16.966z"/>\n	<g id=\'fengche\'>\n		<path fill="#FFFFFF" d="M92.777,4.149c-1.75,2.303-1.565,3.777-2.487,3.777c-0.829,0-2.487-2.403-2.487-3.777\n				c0-1.373,1.114-2.486,2.487-2.486C91.664,1.663,93.625,3.034,92.777,4.149z"/>\n			<path fill="#FFFFFF" d="M88.009,13.202c1.75-2.303,1.566-3.777,2.487-3.777c0.829,0,2.487,2.403,2.487,3.777\n				c0,1.373-1.113,2.487-2.487,2.487C89.123,15.689,87.161,14.317,88.009,13.202z"/>\n			<path fill="#FFFFFF" d="M94.919,11.06c-2.303-1.75-3.777-1.566-3.777-2.487c0-0.829,2.403-2.487,3.777-2.487\n				c1.373,0,2.486,1.114,2.486,2.487C97.406,9.946,96.035,11.908,94.919,11.06z"/>\n			<path fill="#FFFFFF" d="M85.867,6.292c2.303,1.75,3.777,1.566,3.777,2.487c0,0.829-2.403,2.487-3.777,2.487\n				c-1.374,0-2.487-1.113-2.487-2.487S84.751,5.444,85.867,6.292z"/>\n	</g>\n</g>\n</svg>\n    </div>\n</div>\n'
    }), n("loadingLib", ["text!templates/loading_default.html", "text!templates/loading_cycle.html", "text!templates/loading_rect.html", "text!templates/loading_carton.html"], function (e, t, n, r) {
        var i = {
            "default": {
                title: "经典",
                init: function (e, t) {
                    t && (t.show_logo || $(e).find(".logo").remove(), t.show_progress_bar || $(e).find(".loading").remove(), t.show_text || $(e).find("#load_bar_text").remove(), t.show_bg || $(e).find(".loading_inner").css("background", ""))
                },
                destroy: function () {
                },
                html: e,
                setProgress: function (e, t) {
                    var n = e.querySelector("#load_bar"), r = e.querySelector("#load_bar_text"), i = t + "%";
                    n && n.style.setProperty("width", i), r && (r.innerHTML = i)
                },
                options: {
                    loading_bg: {title: "背景色", type: "color", "default": "rgba(31, 43, 57,1)"},
                    loading_logo: {
                        title: "LOGO图",
                        type: "image",
                        "default": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABThJREFUeNrsnU1sG0UUx99USPSGe+LjQJ0cEHBANodyQKKukJAQSLiAEAJE4hvfiQG1fFXG4hsB2dLCtanExwWwc+GG4l6AC405QMWFOBwonLqc4La8N+t81HJs787s7CT5/6WRI0U7u/N+839vZm2viSAIgiAIgiAIgiAI8kfKtIPoCyryS4NblVthD8cy5NbmVleP6L/dA4k+pwq/tPY4iEF11aNUdg4k+kw7YwUwhqquHqMgzYH70ttDpynAGB6bmbSHXmFw2iqfGBquknsgEdyRhUyAQACy+7UPIYBDIAABEAg1BA6BAARAAAQ1BA6BQwAEAhAAgVDU4RAIQJCyIDgEQAAEQCAAQVGH4BAAgQAENQSCQwAEQAAEQg2BQyAAARDIjxrSQfjsxyY/h1xfiV//8JRrTtdnAqSX6rgbqkT3niHa3/8S7z/czVdHif7u+gHCzvX10p7e5MEBa9olSdqVhcsHK7qqSPRgixL3lUWzd31redSQbqrZt3/I19tl0PK/vHXL7PbXt57CMq4hJg7pppqF2+nQXP7ukGsYVzcna+5TljrBJ40oTDTotRET52AlnqF5ATk0HzthmP4LuSp0Ju0r1LHJ5dZJUpdc6o2GctdCHBTXMK4uEd3R2P66fmsn6c9odWIK5FziwXea2/cn+fuhVpw+XKaqx5fHVIRmkj7P5QckTfES6/dGHHYNz9aZ5eHF1bYKxfHn+jEgCnvZxmRrKTAdU9SgS5T0uVkSiCdWRgfiL3Z+uxa/ZqEi16yHW6OvQWpHMBW/TqZQNelAng4Ri7YTpwmpJcvN0f2KU2Z59t42bz9FVV6P+x7nwi95Q/hvmKT/dp73staBLKUKzA+cClYWR/ctAbubC319lag0aw5C+niSnVlpjB+XTJjVTtLzLJmGU9lwf3QiRdpaV41n6tSEmy7J5Rd4El5YGl2HtupG3nDedB+36uR1SSZKq5Z0JKF6wyxd2QPyGvE0pvlUB0uQ7j8TByypZAYLpHDgTkXhYFynJgU9COObWpqRBOpNqvsB5FX9hNJVo04eYCjl2XxvnXzL8fw+SHv0lHor/YbQKhAN5RX9/F6zG1K3MpB7FtwsebdKFhlf12LHpVNbvU1HbVyKzQ85nDTu4Tyni1Nlol/b7mCII06XTWDYGbtth2iXvEyy5a1Y6Wyau7mzka4OTAr/u2bsDsPNsXqHjvgJ5CULtWRQB7jL2+eIbq7Gf5umpvNniX5atAFis3a8Sz0vgWgoxw1WXON0XSl2zvThGM61Y55XfJF3+X9yu/gz0S9tmxA2V1bvma+ssgYiFVmeCV8kV5oeSGu/d1ycVeiWGUjoNRAN5ZiuI8u0u3VEvW//kzeZfJRUX2hEgRfvk2fTgixgZOaQDae8aHHV5Y866gN7qyonDtki2Sx1dxGMbn9MmUllPYLoBf3TDeKUnf5rCqGuGx9mO8GUi5FEz+94KDGMj7J3u3I1oqi+Y6HEMBbcpF7lcmQMpcArFIFS2iEwuhwhgRG6OqHTb1D1ByYrlMUdAGOx74zQaYzyGm00p2+v+PjDYgKgqU5SkMfJVZ4jj57TqWvBo72KbPbq6uP8lurKhygwmPmcf4Yv5Eg0GUSQdyyUL3kielbDkDQ25xCMpCd5cylQp9zWCu+BbIB5xgmYTRCn/QDhLZANME9rGNU+GFvL5G4fRFt94hcI74FcBucp/d6KwJlJAUcgnNUQPrX3zt6eBjIAp6BXZREd7sOpDFkpyYZOPoXeYQghQRAEQRAEQRAEQRAEpdL/AgwAsxzv14rUbmwAAAAASUVORK5CYII="
                    },
                    show_logo: {title: "是否显示logo", type: "bool", "default": !0},
                    show_bg: {title: "是否显示背景色", type: "bool", "default": !0},
                    show_progress_bar: {title: "是否显示进度条", type: "bool", "default": !0},
                    show_text: {title: "是否显示载入文字", type: "bool", "default": !0},
                    loading_bar_color: {title: "进度条", type: "color", "default": "rgba(255, 255, 255,1)"},
                    loading_text_color: {title: "载入百分比", type: "color", "default": "rgba(255,255,255,1)"}
                }
            }, cycle: {
                title: "圆环",
                init: function (e, t) {
                    t && (t.show_logo || $(e).find(".logo").remove(), t.show_progress_bar || $(e).find("svg").remove(), t.show_text || $(e).find("#load_bar_text").parent().remove(), t.show_bg || $(e).find(".loading_inner").css("background", ""))
                },
                destroy: function () {
                },
                html: t,
                setProgress: function (e, t) {
                    var n = e.querySelector("#p-bar"), r = e.querySelector("#load_bar_text"), i = t + "", s = 282.783 + 282.783 * t / 100;
                    n && n.style.setProperty("stroke-dashoffset", s + "px"), r && (r.innerHTML = i)
                },
                options: {
                    loading_bg: {title: "背景色", type: "color", "default": "rgba(31, 43, 57,1)"},
                    loading_logo: {
                        title: "LOGO图",
                        type: "image",
                        "default": "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt/0AAbf+rAG3/7wBt/+8Abf+rAG3/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHH/DgBx/60Acf//AHH//wBx//8Acf7/AHH//wBx//8Acf+tAHH/DgAAAAAAAAAAAAAAAAAAAAAAAAAAAHT/DAB0/9EAdP//AHP+/wBy/f8Acfz/AHD8/wBx/f8Acv7/AHP+/wB0/9EAdP8MAAAAAAAAAAAAAAAAAAAAAAB4/58AeP//AHb+/wBy+/8uifn/Zqf6/2qp+v85jvn/AXD5/wBz/P8Ad/7/AHj/nwAAAAAAAAAAAAAAAAB8/ygAfP//AHv+/xSB+/+21v3///////r8///3+////////8vi/f8ihPj/AHf7/wB7//8AfP8oAAAAAAAAAAAAgP+JAID//wJ+/f/F4P3/5PD+/0+j/P8Df/3/AX/+/z6d/f/R5/7/4O7+/w5++P8Aff3/AID/iQAAAAAAAAAAAIT/ywCE//9Kpf3//P3//yuT+/8Agv7/AIT//wCE//8AhP//FYz9/+32//9ts/z/AIH9/wCE/8sAAAAAAAAAAACI//EAiP//FpD+/1Gr/v8Ahv7/AIj//wCI//8AiP//AIj//wCI//9Dpv7/J5f9/wCH/v8AiP/xAAAAAAAAAAAAi///AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wAAAAAAAAAAAI///wCP//8Aj///AI///wCP//8Aj///AI///wCP//8Aj///AI///wCP//8Aj///AI///wCP//8AAAAAAAAAAACT//8Ak///AJP//wCT//8Ak///AJP//wCT//8Ak///AJP//wCT//8Ak///AJP//wCT//8Ak///AAAAAAAAAAAAl///AJf//wCX//8Al///AJf//wCX//8Al///AJf//wCX//8Al///AJf//wCX//8Al///AJf//wAAAAAAAAAAAJv//wCb//8Am///AJv//wCb//8Am///AJv//wCb//8Am///AJv//wCb//8Am///AJv//wCb//8AAAAAAAAAAACe//8Anv//AJ7//wCe//8Anv//AJ7//wCe//8Anv//AJ7//wCe//8Anv//AJ7//wCe//8Anv//AAAAAAAAAAAAov//AKL//wCi//8Aov//AKL//wCi//8Aov//AKL//wCi//8Aov//AKL//wCi//8Aov//AKL//wAAAAAAAAAAAKb/uQCm//8Apv//AKb//wCm//8Apv//AKb//wCm//8Apv//AKb//wCm//8Apv//AKb//wCm/7kAAAAA/D8AAPAPAADgBwAAwAMAAMADAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAA=="
                    },
                    show_logo: {title: "是否显示logo", type: "bool", "default": !0},
                    show_bg: {title: "是否显示背景色", type: "bool", "default": !0},
                    show_progress_bar: {title: "是否显示进度条", type: "bool", "default": !0},
                    show_text: {title: "是否显示载入文字", type: "bool", "default": !0},
                    loading_bar_color: {title: "进度条", type: "color", "default": "rgba(255,255,255,1)"},
                    loading_text_color: {title: "载入百分比", type: "color", "default": "rgba(255,255,255,1)"}
                }
            }, rect: {
                title: "多边形",
                init: function (e, t) {
                    t && (t.show_logo || $(e).find(".logo").remove(), t.show_progress_bar || $(e).find("svg").remove(), t.show_text || $(e).find("#load_bar_text").parent().remove(), t.show_bg || $(e).find(".loading_inner").css("background", ""))
                },
                destroy: function () {
                },
                html: n,
                setProgress: function (e, t) {
                    var n = e.querySelector("#p-bar"), r = e.querySelector("#load_bar_text"), i = t + "", s = 270 - 270 * t / 100;
                    n && n.style.setProperty("stroke-dashoffset", s + "px"), r && (r.innerHTML = i)
                },
                options: {
                    loading_bg: {title: "背景色", type: "color", "default": "rgba(31, 43, 57,1)"},
                    loading_logo: {
                        title: "LOGO图",
                        type: "image",
                        "default": "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt/0AAbf+rAG3/7wBt/+8Abf+rAG3/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHH/DgBx/60Acf//AHH//wBx//8Acf7/AHH//wBx//8Acf+tAHH/DgAAAAAAAAAAAAAAAAAAAAAAAAAAAHT/DAB0/9EAdP//AHP+/wBy/f8Acfz/AHD8/wBx/f8Acv7/AHP+/wB0/9EAdP8MAAAAAAAAAAAAAAAAAAAAAAB4/58AeP//AHb+/wBy+/8uifn/Zqf6/2qp+v85jvn/AXD5/wBz/P8Ad/7/AHj/nwAAAAAAAAAAAAAAAAB8/ygAfP//AHv+/xSB+/+21v3///////r8///3+////////8vi/f8ihPj/AHf7/wB7//8AfP8oAAAAAAAAAAAAgP+JAID//wJ+/f/F4P3/5PD+/0+j/P8Df/3/AX/+/z6d/f/R5/7/4O7+/w5++P8Aff3/AID/iQAAAAAAAAAAAIT/ywCE//9Kpf3//P3//yuT+/8Agv7/AIT//wCE//8AhP//FYz9/+32//9ts/z/AIH9/wCE/8sAAAAAAAAAAACI//EAiP//FpD+/1Gr/v8Ahv7/AIj//wCI//8AiP//AIj//wCI//9Dpv7/J5f9/wCH/v8AiP/xAAAAAAAAAAAAi///AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wAAAAAAAAAAAI///wCP//8Aj///AI///wCP//8Aj///AI///wCP//8Aj///AI///wCP//8Aj///AI///wCP//8AAAAAAAAAAACT//8Ak///AJP//wCT//8Ak///AJP//wCT//8Ak///AJP//wCT//8Ak///AJP//wCT//8Ak///AAAAAAAAAAAAl///AJf//wCX//8Al///AJf//wCX//8Al///AJf//wCX//8Al///AJf//wCX//8Al///AJf//wAAAAAAAAAAAJv//wCb//8Am///AJv//wCb//8Am///AJv//wCb//8Am///AJv//wCb//8Am///AJv//wCb//8AAAAAAAAAAACe//8Anv//AJ7//wCe//8Anv//AJ7//wCe//8Anv//AJ7//wCe//8Anv//AJ7//wCe//8Anv//AAAAAAAAAAAAov//AKL//wCi//8Aov//AKL//wCi//8Aov//AKL//wCi//8Aov//AKL//wCi//8Aov//AKL//wAAAAAAAAAAAKb/uQCm//8Apv//AKb//wCm//8Apv//AKb//wCm//8Apv//AKb//wCm//8Apv//AKb//wCm/7kAAAAA/D8AAPAPAADgBwAAwAMAAMADAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAA=="
                    },
                    show_logo: {title: "是否显示logo", type: "bool", "default": !0},
                    show_bg: {title: "是否显示背景色", type: "bool", "default": !0},
                    show_progress_bar: {title: "是否显示进度条", type: "bool", "default": !0},
                    show_text: {title: "是否显示载入文字", type: "bool", "default": !0},
                    loading_bar_color: {title: "进度条", type: "color", "default": "rgba(255,255,255,1)"},
                    loading_text_color: {title: "载入百分比", type: "color", "default": "rgba(255,255,255,1)"}
                }
            }, carton: {
                title: "风车",
                init: function (e, t) {
                    t && (t.show_logo || $(e).find(".logo").remove(), t.show_progress_bar || $(e).find("#carton_loading_bar").remove(), t.show_text || $(e).find("#load_bar_text").parent().remove(), t.show_bg || $(e).find(".loading_inner").css("background", ""));
                    var n = e.querySelector("#fengche");
                    n && (n.setAttribute("class", "animated rotate infinite"), n.setAttribute("style", "transform-origin: center;-webkit-transform-origin: center;"))
                },
                destroy: function () {
                },
                html: r,
                setProgress: function (e, t) {
                    var n = e.querySelector("#p-bar"), r = e.querySelector("#load_bar_text"), i = t + "%";
                    n && n.style.setProperty("width", i), r && (r.innerHTML = i)
                },
                options: {
                    loading_bg: {title: "背景色", type: "color", "default": "rgba(79, 255, 79,1)"},
                    loading_logo: {
                        title: "LOGO图",
                        type: "image",
                        "default": "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt/0AAbf+rAG3/7wBt/+8Abf+rAG3/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHH/DgBx/60Acf//AHH//wBx//8Acf7/AHH//wBx//8Acf+tAHH/DgAAAAAAAAAAAAAAAAAAAAAAAAAAAHT/DAB0/9EAdP//AHP+/wBy/f8Acfz/AHD8/wBx/f8Acv7/AHP+/wB0/9EAdP8MAAAAAAAAAAAAAAAAAAAAAAB4/58AeP//AHb+/wBy+/8uifn/Zqf6/2qp+v85jvn/AXD5/wBz/P8Ad/7/AHj/nwAAAAAAAAAAAAAAAAB8/ygAfP//AHv+/xSB+/+21v3///////r8///3+////////8vi/f8ihPj/AHf7/wB7//8AfP8oAAAAAAAAAAAAgP+JAID//wJ+/f/F4P3/5PD+/0+j/P8Df/3/AX/+/z6d/f/R5/7/4O7+/w5++P8Aff3/AID/iQAAAAAAAAAAAIT/ywCE//9Kpf3//P3//yuT+/8Agv7/AIT//wCE//8AhP//FYz9/+32//9ts/z/AIH9/wCE/8sAAAAAAAAAAACI//EAiP//FpD+/1Gr/v8Ahv7/AIj//wCI//8AiP//AIj//wCI//9Dpv7/J5f9/wCH/v8AiP/xAAAAAAAAAAAAi///AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wAAAAAAAAAAAI///wCP//8Aj///AI///wCP//8Aj///AI///wCP//8Aj///AI///wCP//8Aj///AI///wCP//8AAAAAAAAAAACT//8Ak///AJP//wCT//8Ak///AJP//wCT//8Ak///AJP//wCT//8Ak///AJP//wCT//8Ak///AAAAAAAAAAAAl///AJf//wCX//8Al///AJf//wCX//8Al///AJf//wCX//8Al///AJf//wCX//8Al///AJf//wAAAAAAAAAAAJv//wCb//8Am///AJv//wCb//8Am///AJv//wCb//8Am///AJv//wCb//8Am///AJv//wCb//8AAAAAAAAAAACe//8Anv//AJ7//wCe//8Anv//AJ7//wCe//8Anv//AJ7//wCe//8Anv//AJ7//wCe//8Anv//AAAAAAAAAAAAov//AKL//wCi//8Aov//AKL//wCi//8Aov//AKL//wCi//8Aov//AKL//wCi//8Aov//AKL//wAAAAAAAAAAAKb/uQCm//8Apv//AKb//wCm//8Apv//AKb//wCm//8Apv//AKb//wCm//8Apv//AKb//wCm/7kAAAAA/D8AAPAPAADgBwAAwAMAAMADAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAA=="
                    },
                    show_logo: {title: "是否显示logo", type: "bool", "default": !0},
                    show_bg: {title: "是否显示背景色", type: "bool", "default": !0},
                    show_progress_bar: {title: "是否显示进度条", type: "bool", "default": !0},
                    show_text: {title: "是否显示载入文字", type: "bool", "default": !0},
                    loading_bar_color: {title: "进度条", type: "color", "default": "rgba(181, 181, 0,1)"},
                    loading_text_color: {title: "载入百分比", type: "color", "default": "rgba(181, 181, 0,1)"}
                }
            }
        }, s = {
            get: function (e, t) {
                e = e || "default";
                var n = i[e];
                if (n) {
                    var r = {};
                    for (var s in n.options)r[s] = t && t[s] !== undefined ? t[s] : n.options[s]["default"];
                    return {
                        init: function (e) {
                            var t = n.html;
                            e.innerHTML = t.replace(/\{\{([a-zA-Z0-9_]+)\}\}/ig, function (e, t, n) {
                                return r[t]
                            }), n.init(e, r)
                        }, setProgress: n.setProgress, destroy: n.destroy
                    }
                }
                return null
            }, get_meta_defaults: function (e) {
                var t = i[e];
                if (t) {
                    var n = {};
                    for (var r in t.options)n[r] = t.options[r]["default"];
                    return n
                }
                return null
            }, all: function () {
                return i
            }
        };
        return s
    }), n("loading", ["loadingLib"], function (e) {
        var t = ["background-image", "image", "shape"], n = function (n, r) {
            var i = [], s = function (e) {
                if (i.length > 20)return;
                if (typeof e == "object")for (var n in e)if (typeof e[n] == "string" && t.indexOf(n) >= 0 && !!e[n]) {
                    if (i.length > 20)return;
                    i.push(e[n])
                } else if (n == "image_list" && typeof e[n] == "string" && e[n] != "")try {
                    var r = JSON.parse(e[n]);
                    r.forEach(function (e) {
                        if (e.pic) {
                            if (i.length > 20)return;
                            i.push(e.pic)
                        }
                    })
                } catch (o) {
                } else typeof e[n] == "object" && s(e[n])
            }, o = e.get(r && r.tmpl_id, r && r.cfg);
            s(n);
            var u = function (e, t) {
                if (!o) {
                    e.style.setProperty("display", "none"), t && t(), t = null;
                    return
                }
                o.init && o.init(e);
                var n = 0, r = i.length, s = 0, u = 0, a, f = function () {
                    s < u && (s++, o.setProgress(e, s), setTimeout(f, 50)), s >= 100 && setTimeout(function () {
                        a && a(), a = null
                    }, 100)
                }, l = function (e, t) {
                    u = e, f(), t && (a = t)
                }, c = function () {
                    var i = r > 0 ? Math.floor(n * 100 / r) : 100;
                    i = i > 100 ? 100 : i, l(i), n >= r && l(100, function () {
                        e.style.setProperty("display", "none"), o.destroy && o.destroy(e), t && t(), t = null
                    })
                };
                if (n < r)for (var h = 0; h < r; h++) {
                    var p = new Image;
                    (function (e) {
                        var t = function () {
                            clearTimeout(e.timer), e.removeEventListener("load", t), e.removeEventListener("error", t), n++, c()
                        };
                        e.width > 0 || e.height > 0 ? (n++, c()) : (e.addEventListener("load", t, !1), e.addEventListener("error", t, !1), e.timer = setTimeout(function () {
                            e.removeEventListener("load", t), e.removeEventListener("error", t), n++, c()
                        }, 3e3 * Math.random()))
                    })(p), p.src = i[h]
                } else c()
            };
            return u
        };
        return n
    }), n("utils", ["global"], function (e) {
        var t = function () {
            return window.location.host.indexOf("t1.com") >= 0 ? "" : ""
        }();
        window.requestNextAnimationFrame = function () {
            var e, t = undefined, n = undefined, r = 0, i = navigator.userAgent, s = 0, o = this;
            return window.webkitRequestAnimationFrame && (wrapp = function (e) {
                e === undefined && (e = +(new Date)), o.callback(e)
            }, e = window.webkitRequestAnimationFrame, window.webkitRequestAnimationFrame = function (n, r) {
                o.callback = n, e(t, r)
            }), window.mozRequestAnimationFrame && (s = i.indexOf("rv:"), i.indexOf("Gecko") != -1 && (geckoVersion = i.substr(s + 3, 3), geckoVersion === "2.0" && (window.mozRequestAnimationFrame = undefined))), window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
                var n, r;
                window.setTimeout(function () {
                    n = +(new Date), e(n), r = +(new Date), o.timeout = 1e3 / 60 - (r - n)
                }, o.timeout)
            }
        }(), window.cancelNextAnimationFrame = function () {
            return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (e) {
                    window.clearTimeout(e)
                }
        }();
        var n = {
            setStyle: function (e, t, n) {
                e.style.setProperty(t, n), e.style.setProperty("-webkit-" + t, n)
            }, getSiteId: function () {
                return window.SOHUZ && window.SOHUZ.page && window.SOHUZ.page.site_id || 0
            }, hasClass: function (t, n) {
                return t.className.match(new RegExp("(\\s|^)" + n + "(\\s|$)"))
            }, addClass: function (e, t) {
                n.hasClass(e, t) || (e.className += " " + t)
            }, login: function (r) {
                if (e.is_editing_page) {
                    r && r({error: {message: "is editing page", code: 1}});
                    return
                }
                if (n.__user_data) {
                    r && r(n.__user_data);
                    return
                }
                if (window.user_id) $.ajax({
                    url: "/club/apiv1/me", success: function (e) {
                        e && (n.__user_data = e), r && r(e)
                    }, error: function () {
                        r && r({error: {message: "get user info error.", code: 2}})
                    }
                }); else {
                    var i = t + "/main/login?callback=" + encodeURIComponent(window.location.href) + "&site_id=" + n.getSiteId();
                    window.location = i
                }
            }, removeClass: function (e, t) {
                if (n.hasClass(e, t)) {
                    var r = new RegExp("(\\s|^)" + t + "(\\s|$)");
                    e.className = e.className.replace(r, " ")
                }
            }, format_time: function (e) {
                var t = new Date, n = new Date(e);
                return t - n < 6e4 ? "几秒前" : t - n < 18e5 ? "刚刚" : t.getFullYear() == n.getFullYear() && t.getMonth() == n.getMonth() && t.getDate() == n.getDate() ? "今天" + n.getHours() + ":" + n.getMinutes() : t.getFullYear() == n.getFullYear() ? n.getMonth() + 1 + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() : n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes()
            }
        }, r = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, i = function (e) {
            try {
                var t = function (t) {
                    return e[t]
                }, n = "(?:" + Object.keys(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
                return function (e) {
                    return e = e == null ? "" : "" + e, r.test(e) ? e.replace(i, t) : e
                }
            } catch (s) {
                return function (e) {
                    return e == null ? "" : "" + e
                }
            }
        };
        return n.escape = i(r), n
    }), n("components/base", [], function () {
        var e = function () {
        };
        return e.prototype = {
            title: "组件",
            type: "",
            icon: "",
            container: null,
            defaultStyle: {
                "background-color": "rgba(255,255,255,1)",
                "border-color": "rgba(255,255,255,0)",
                "border-radius": "5",
                "border-style": "none",
                "border-width": "0px",
                "box-shadow": "0px 0px 0px 0px rgba(0,0,0,1)",
                height: 100,
                width: 100,
                opacity: 1,
                "padding-bottom": 0,
                "padding-left": 0,
                "padding-right": 0,
                "padding-top": 0
            },
            item_el: null,
            play_item: null,
            init: function (e, t) {
                return this.play_item = e, this.item_el = t, this
            },
            render: function (e, t) {
            },
            bindEvents: function () {
            },
            beforeClearAnima: function () {
            },
            beforeDelete: function () {
            },
            beforePlayAnima: function () {
            },
            beforeDestroy: function () {
            }
        }, e.extend = function (e) {
            var t = this, n = function () {
                return t.apply(this, arguments)
            };
            return $.extend(n, t), n.prototype = new t, $.extend(n.prototype, e), n.__super__ = t.prototype, n
        }, e
    }), n("components/image", ["components/base", "utils", "global"], function (e, t, n) {
        var r = {link: "", link_res_id: 0, link_res_name: "", link_res_type: 1}, i = {link: "", link_res_type: -1};
        return e.extend({
            title: "图片",
            icon: "",
            type: "image",
            meta_config: {
                image: {type: "Image", label: "图片", "default": "", autoUpdate: "style.height"},
                link: {type: "Link", label: "链接", "default": ""}
            },
            defaultStyle: {
                "background-color": "transparent",
                "border-color": "rgba(255,255,255,1.00)",
                "border-radius": 0,
                "border-style": "none",
                "border-width": "4px",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                height: 100,
                opacity: "1",
                "padding-bottom": 0,
                "padding-left": 0,
                "padding-right": 0,
                "padding-top": 0,
                transform: "rotate(0deg)",
                width: 100
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "4",
                "box-shadow-color": "rgba(0,0,0,.8)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-degree": "0"
            },
            style_config: {color: "none", textShadow: "none"},
            render: function (e, s) {
                var o = e.link;
                /^\{/ig.test(o) ? o = JSON.parse(o) : /^\/|http:\/\//ig.test(o) ? o = $.extend(!0, {}, r, {link: o}) : o = $.extend(!0, {}, i, {link: o});
                if (e.image && o && o.link && o.link_res_type != -1) {
                    this.item_el.innerHTML = "<a href='javascript:void(0)'><img src='" + t.escape(e.image) + "'></a>";
                    var u = this.play_item && this.play_item.scene && this.play_item.scene.page;
                    if (u) {
                        var a = function () {
                            if (o.page_open_type == "inner") {
                                var e = o.link;
                                e.indexOf("?") > 0 ? e += "&embed=true#mobile_view" : e += "?embed=true#mobile_view", u.player && u.player.openHelperLayer("<iframe src='" + e + "' style='height:100%;-webkit-overflow-scrolling:touch;overflow:scroll;width: 1px;min-width: calc(100%);' scrolling='" + (n.is_ios ? "no" : "auto") + "' frameborder='0'></iframe>")
                            } else window.open(o.link)
                        };
                        this.item_el.removeEventListener("click", a), this.item_el.addEventListener("click", a)
                    }
                } else if (e.image && o.link_res_type == -1 && o.link) {
                    this.item_el.innerHTML = "<a href='javascript:void(0)'><img src='" + t.escape(e.image) + "'></a>";
                    var u = this.play_item && this.play_item.scene && this.play_item.scene.page;
                    if (u) {
                        var a = function () {
                            u.jump(o.link)
                        };
                        this.item_el.removeEventListener("click", a), this.item_el.addEventListener("click", a)
                    }
                } else this.item_el.innerHTML = "<img src='" + t.escape(e.image) + "'/>";
                return this
            }
        })
    }), n("components/groupImage", ["components/base", "utils"], function (e, t) {
        return e.extend({
            title: "组图",
            icon: "http://pic.kuaizhan.com/g2/M00/49/C2/wKjmqlZdbaKAJ5PoAAACMg_mjRo1434019",
            type: "group_image",
            meta_config: {
                scroll_theme: {type: "ImageGroupTheme", label: "翻页效果", l_label: !0, "default": "coverflow"},
                auto_play_second: {
                    type: "Number",
                    "default": "0",
                    template: " <span class='margin'>间隔 <span><%=html%></span> 秒自动切换 (0秒不切换)</span>",
                    label: "自动切换",
                    l_label: !0,
                    max: 1e4,
                    min: 0,
                    step: .1
                },
                image_list: {type: "ImageList", label: "组图列表", "default": "[]", l_label: !0}
            },
            defaultStyle: {
                "background-color": "transparent",
                "border-color": "rgba(255,255,255,1.00)",
                "border-radius": 0,
                "border-style": "none",
                "border-width": "4px",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                height: 100,
                opacity: "1",
                "padding-bottom": 0,
                "padding-left": 0,
                "padding-right": 0,
                "padding-top": 0,
                transform: "rotate(0deg)",
                width: 100
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "4",
                "box-shadow-color": "rgba(0,0,0,.8)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0"
            },
            style_config: {padding: "none"},
            render: function (e, n) {
                this.is_editing = n;
                var r = e.image_list ? JSON.parse(e.image_list) : [], i = "";
                r.forEach(function (e, n) {
                    if (!e || !e.pic)return;
                    n == 0 ? i += "<div data-index='" + n + "' style='' class='swiper-slide swiper-slide-active' ><img alt='" + t.escape(e.title || "") + "'  src='" + e.pic + "'/><p class='img-title'>" + t.escape(e.title || "") + "</p></div>" : n == 1 ? i += "<div data-index='" + n + "' style='' class='swiper-slide swiper-slide-next' ><img alt='" + t.escape(e.title || "") + "'  src='" + e.pic + "'/><p class='img-title'>" + t.escape(e.title || "") + "</p></div>" : i += "<div data-index='" + n + "' class='swiper-slide' ><img alt='" + e.title + "'  src='" + e.pic + "'/><p class='img-title'>" + t.escape(e.title || "") + "</p></div>"
                }), this.auto_play_second = parseFloat(e.auto_play_second) || 0, this.images = r, this.scroll_theme = e.scroll_theme || "coverflow", this.width = parseInt(e.style.width);
                var s = "";
                return this.scroll_theme == "coverflow" && (s = "-webkit-transform: translate3d(" + this.width * .1 + "px, 0px, 0px);transform: translate3d(" + this.width * .1 + "px, 0px, 0px);"), i != "" ? this.item_el.innerHTML = "<div style='" + s + "' class='swiper-wrapper'>" + i + "</div><div class='swiper-pagination'></div>" : this.item_el.innerHTML = "<img src='http://kzcdn.itc.cn/res/skin/images/img/default-focus.png'/>", this.item_el.setAttribute("class", "swiper-container swiper-container-horizontal swiper-container-3d swiper-container-" + this.scroll_theme), this
            },
            bindEvents: function (e) {
                this.is_editing = e;
                var t = this;
                e || this.item_el.addEventListener("click", function (e) {
                    var n = e.target.dataset.index || e.target.parentElement.dataset.index;
                    if (n) {
                        var r = t.images[n].link, i = t.play_item && t.play_item.scene && t.play_item.scene.page;
                        r && r.link_res_type == -1 ? i && i.jump(r.link) : r && r.link && (window.location = r.link)
                    }
                }), "ontouchstart" in window && (this.item_el.addEventListener("touchstart", function (e) {
                    t.start_y = e.touches && e.touches[0] && e.touches[0].pageY
                }), this.item_el.addEventListener("touchend", function (e) {
                    e.touches && e.touches[0] && e.touches[0].pageY && t.start_y && Math.abs(e.touches[0].pageY - t.start_y) < 30 && e.stopPropagation(), t.start_y = 0
                }))
            },
            afterPlayAnima: function () {
                if (!this.swiper && !this.is_editing && this.images && this.images.length > 1) {
                    var e = {
                        coverflow: {
                            effect: "coverflow",
                            centeredSlides: !0,
                            slidesPerView: "auto",
                            coverflow: {rotate: 70, stretch: 50, depth: 50, modifier: 1, slideShadows: !1}
                        },
                        horizontal: {
                            pagination: this.item_el.querySelector(".swiper-pagination"),
                            paginationClickable: !0
                        },
                        cube: {
                            pagination: this.item_el.querySelector(".swiper-pagination"),
                            effect: "cube",
                            grabCursor: !0,
                            cube: {shadow: !1, slideShadows: !0, shadowOffset: 20, shadowScale: .94}
                        }
                    }, t = e[this.scroll_theme];
                    t.loop = !0, this.auto_play_second && (t.autoplay = this.auto_play_second * 1e3), this.swiper = new Swiper(this.item_el, t)
                }
            }
        })
    }), n("Typed", [], function () {
        function e(e) {
            this.opts = e || {}, this.source = e.source, this.output = e.output, this.delay = e.delay || 120, this.chain = {
                parent: null,
                dom: this.output,
                val: []
            }, this._stop = !0, typeof this.opts.done != "function" && (this.opts.done = function () {
            })
        }

        return e.fn = e.prototype = {
            toArray: function (e) {
                var t = [];
                for (var n = 0; n < e.length; n++)t.push(e[n]);
                return t
            }, init: function () {
                this.chain.val = this.convert(this.source, this.chain.val)
            }, convert: function (e, t) {
                var n = this, r = this.toArray(e.childNodes);
                for (var i = 0; i < r.length; i++) {
                    var s = r[i];
                    if (s.nodeType === 3) t = t.concat(s.nodeValue.split("")); else if (s.nodeType === 1) {
                        var o = [];
                        o = n.convert(s, o), t.push({dom: s, val: o})
                    }
                }
                return t
            }, print: function (e, t, n) {
                setTimeout(function () {
                    e.appendChild(document.createTextNode(t)), n()
                }, this.delay)
            }, play: function (e) {
                if (this._stop)return;
                if (!e)return;
                if (!e.val.length) {
                    e.parent ? this.play(e.parent) : this.opts.done();
                    return
                }
                var t = e.val.shift(), n = this;
                if (typeof t == "string") this.print(e.dom, t, function () {
                    n.play(e)
                }); else {
                    var r = document.createElement(t.dom.nodeName), i = n.toArray(t.dom.attributes);
                    for (var s = 0; s < i.length; s++) {
                        var o = i[s];
                        r.setAttribute(o.name, o.value)
                    }
                    e.dom.appendChild(r), t.parent = e, t.dom = r, this.play(t.val.length ? t : t.parent)
                }
            }, start: function () {
                this._stop = !1, this.init(), this.play(this.chain)
            }, pause: function () {
                this._stop = !0
            }, resume: function () {
                this._stop = !1, this.play(this.chain)
            }
        }, e.version = "2.1", e
    }), n("components/text", ["components/base", "Typed"], function (e, t) {
        return e.extend({
            title: "文本",
            icon: "http://pic.kuaizhan.com/g2/M00/0F/BC/CgpQVFTv6i-ACbjgAAAMco_i7xA8019627",
            type: "text",
            _params_can_bind: ["content"],
            meta_config: {
                "font-size": {label: "", type: "Hidden", "default": 14},
                "line-height": {label: "行高", type: "Hidden", "default": 1.2, max: 10, min: .5, step: .1},
                content: {type: "RichText", "default": "这里是文本"},
                typed: {type: "Checkbox", "default": "false", text: "打字机动效", "control-visible": ["speed", "timeout"]},
                speed: {
                    label: "动效速度",
                    type: "Number",
                    "default": ".2",
                    template: "<span><%=html%></span> 秒/字",
                    max: 30,
                    min: .1,
                    step: .1
                },
                timeout: {
                    label: "推迟时间",
                    type: "Number",
                    "default": "0",
                    template: "<span><%=html%></span> 秒",
                    max: 30,
                    min: 0,
                    step: .1
                }
            },
            defaultStyle: {
                width: 107,
                height: 32,
                "background-color": "rgba(255,255,255,0)",
                "border-radius": "2",
                "border-color": "rgba(255,255,255,1.00)",
                "border-width": "2px",
                "border-style": "none",
                opacity: "1",
                transform: "rotate(0deg)",
                "text-shadow": "0px 0px 0px rgba(1,1,1,0.40)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                "padding-top": "5",
                "padding-left": "5",
                "padding-right": "5",
                "padding-bottom": "5"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "text-shadow-color": "rgba(1,1,1,0.40)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {color: "none"},
            render: function (e) {
                return this.type_speed = parseFloat(e.speed) || .8, this.typed = e.typed == "true", this.timeout = e.timeout || 0, this.inner_el || (this.inner_el = document.createElement("div"), this.animate_el = document.createElement("div"), this.animate_el.style.setProperty("display", "none"), this.item_el.appendChild(this.inner_el), this.item_el.appendChild(this.animate_el)), this.inner_el.innerHTML = e.content, this
            },
            beforePlayAnima: function () {
                if (!this.typed)return;
                this.typing && this.typing.pause(), this._timer && clearTimeout(this._timer)
            },
            beforeClearAnima: function () {
                this.typing && this.typing.pause(), this._timer && clearTimeout(this._timer)
            },
            afterPlayAnima: function () {
                if (!this.typed)return;
                $(this.inner_el).hide(), $(this.animate_el).html("").show();
                var e = this;
                this._timer = setTimeout(function () {
                    e.typing = new t({
                        source: e.inner_el,
                        output: e.animate_el,
                        delay: e.type_speed * 1e3,
                        done: function () {
                            $(e.inner_el).show(), $(e.animate_el).hide()
                        }
                    }), e.typing.start()
                }, this.timeout * 1e3)
            }
        })
    }), n("components/background", ["components/base"], function (e) {
        return e.extend({
            title: "形状",
            type: "background",
            icon: "http://pic.kuaizhan.com/g2/M00/0F/BC/CgpQVFTv6jqAdVqgAAAL0l9RU7M1453246",
            style_meta_config: {
                shape: {label: "形状", type: "Shape", "default": ""},
                color: {label: "颜色", type: "Color", "default": "rgba(223,223,223,1.00)"},
                image: {label: "背景图", type: "Image", "default": ""}
            },
            defaultStyle: {
                "background-color": "rgba(223,223,223,1.00)",
                "border-color": "rgba(255,255,255,1.00)",
                "border-radius": "0",
                "border-style": "none",
                "border-width": "4px",
                "box-shadow": "0px 0px 0px ",
                height: "100",
                width: "100",
                opacity: "1",
                "padding-bottom": 0,
                "padding-left": 0,
                "padding-right": 0,
                "padding-top": 0,
                transform: "rotate(0deg)"
            },
            _defaultStyle: {"transform-rotate": "0", "border-width": "4"},
            style_config: {
                border: "none",
                padding: "none",
                color: "none",
                textShadow: "none",
                boxShadow: "none",
                opacity: "none",
                bgColor: "none"
            },
            render: function (e) {
                return this.item_el.setAttribute("class", "scene_content background"), e.shape && this.item_el.style.setProperty("-webkit-mask-image", "url('" + e.shape + "')"), e.color && this.item_el.style.setProperty("background-color", e.color), e.image && (this.item_el.style.setProperty("background-image", "url(" + e.image + ")"), this.item_el.style.setProperty("background-size", "100% 100%")), this
            }
        })
    }), n("lengthPrefix", ["global"], function (e) {
        var t = ["border-radius", "width", "height", "font-size", "padding", "padding-left", "padding-top", "padding-right", "padding-bottom"], n = function (n, r) {
            var i = 0, s = 0, o = e.width / 320, u = e.height / 515, a = Math.min(o, u);
            return o > u ? i = (e.width - 320 * a) / 2 : s = (e.height - 515 * a) / 2, t.indexOf(n) >= 0 && !isNaN(parseInt(r)) ? parseInt(r) * a + "px" : n == "top" && !isNaN(parseInt(r)) ? parseInt(r) * a + s + "px" : n == "left" && !isNaN(parseInt(r)) ? parseInt(r) * a + i + "px" : r
        };
        return n.getScale = function (t) {
            var n = e.width / 320, r = e.height / 515;
            return !t || t == "min" ? Math.min(n, r) : Math.max(n, r)
        }, n
    }), n("components/colorText", ["components/base", "lengthPrefix", "utils", "global"], function (e, t, n, r) {
        var i = {link: "", link_res_id: 0, link_res_name: "", link_res_type: 1}, s = {link: "", link_res_type: -1};
        return e.extend({
            title: "酷文本",
            icon: "http://pic.kuaizhan.com/g1/M01/13/1B/wKjmqVUSWUGAP0iCAAANDbMs8cs3184316",
            type: "color_text",
            config_tips: "内容将会转存为图片,大量使用会造成加载变慢",
            meta_config: {
                "font-size": {label: "字体大小", type: "Number", "default": 14, step: 1, max: 100, min: 10},
                "font-style": {label: "本地字体", type: "FontDroplist", "default": "Arial"},
                "line-height": {label: "行高", type: "Number", "default": 18, step: 1, max: 100, min: 10},
                color: {label: "颜色", type: "Color", "default": "rgba(0,0,0,1)"},
                content: {label: "内容", type: "TextArea", "default": "这里是文本"},
                image: {type: "Hidden", "default": ""},
                link: {type: "Link", label: "链接", "default": ""}
            },
            defaultStyle: {
                left: "161",
                top: "20",
                width: "107",
                height: "32",
                "background-color": "rgba(255,255,255,0)",
                "border-radius": "2",
                "border-color": "rgba(255,255,255,1.00)",
                "border-width": "2px",
                "border-style": "none",
                opacity: "1",
                transform: "rotate(0deg)",
                "text-shadow": "0px 0px 0px rgba(1,1,1,0.40)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                "padding-top": "0",
                "padding-left": "0",
                "padding-right": "0",
                "padding-bottom": "0"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "text-shadow-color": "rgba(1,1,1,0.40)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {color: "none", textShadow: "none"},
            render: function (e, t) {
                var n = e.content, o = parseInt(e["font-size"]), u = e["font-style"], a = parseInt(e.style.width), f = parseInt(e.style.height), l = e.color, c = parseInt(e["line-height"]);
                if (t || !e.image) {
                    var h = $("<canvas width='" + parseInt(a) * 2 + "px' height='" + parseInt(f) * 2 + "px'></canvas>")[0], p = h.getContext("2d");
                    p.fillStyle = l, p.font = "normal " + o * 2 + "px '" + u + "'", p.wrapText(n, 0, o * 2, parseInt(a) * 2, c * 2), e.image = h.toDataURL("image/png", 1)
                }
                var d = e.link;
                /^\{/ig.test(d) ? d = JSON.parse(d) : /^\/|http:\/\//ig.test(d) ? d = $.extend(!0, {}, i, {link: d}) : d = $.extend(!0, {}, s, {link: d});
                if (e.image && d && d.link && d.link_res_type != -1) {
                    this.item_el.innerHTML = "<a href='javascript:void(0)'><img style='max-width: none;width:" + a + "px;height:" + f + "px;' src='" + e.image + "'/></a>";
                    var v = this.play_item && this.play_item.scene && this.play_item.scene.page;
                    if (v) {
                        var m = function () {
                            if (d.page_open_type == "inner") {
                                var e = d.link;
                                e.indexOf("?") > 0 ? e += "&embed=true#mobile_view" : e += "?embed=true#mobile_view", v.player && v.player.openHelperLayer("<iframe src='" + e + "' style='height:100%;-webkit-overflow-scrolling:touch;overflow:scroll;width: 1px;min-width: calc(100%);' scrolling='" + (r.is_ios ? "no" : "auto") + "' frameborder='0'></iframe>")
                            } else window.open(d.link)
                        };
                        this.item_el.removeEventListener("click", m), this.item_el.addEventListener("click", m)
                    }
                } else if (e.image && d.link_res_type == -1 && d.link) {
                    this.item_el.innerHTML = "<a href='javascript:void(0)'><img style='max-width: none;width:" + a + "px;height:" + f + "px;' src='" + e.image + "' src='" + e.image + "'/></a>";
                    var v = this.play_item && this.play_item.scene && this.play_item.scene.page;
                    if (v) {
                        var m = function () {
                            v.jump(d.link)
                        };
                        this.item_el.removeEventListener("click", m), this.item_el.addEventListener("click", m)
                    }
                } else this.item_el.innerHTML = "<img style='max-width: none;width:" + a + "px;height:" + f + "px;' src='" + e.image + "' src='" + e.image + "'/>";
                return this
            }
        })
    }), n("customEvents", [], function () {
        var e = {}, t = {
            "kz-animation-full-end": "动画播放完毕时",
            "kz-scene-time-line": "场景进入后",
            click: "用户点击时",
            "kz-form-submit-success": "表单提交成功时",
            "kz-form-submit-failed": "表单提交失败时",
            "kz-gif-video-ended": "播放完毕时(逐帧动画)",
            "kz-video-ended": "视频播放完毕时",
            "kz-coupon-pub-get-success": "优惠券领取成功时",
            "kz-coupon-pub-not-available": "优惠券无法领取时",
            "kz-like-submit-success": "点赞成功时",
            "kz-counter-change": "计数器触发时",
            "kz-timer-trigger": "定时器触发时",
            "kz-image-upload-success": "图片上传成功时",
            "kz-image-upload-failed": "图片上传失败时",
            "kz-signin-success": "签到成功时"
        };
        return e.getLabel = function (e) {
            return t[e] || ""
        }, e.getEvent = function (e, t) {
            if (window.CustomEvent)try {
                return new CustomEvent(e, {bubbles: !0, cancelable: !1, a: 1, detail: t})
            } catch (n) {
                var r = document.createEvent("Event");
                return r.detail = t, r.initEvent(e, !0, !1), r
            } else {
                if (document.createEvent) {
                    var r = document.createEvent("Event");
                    return r.detail = t, r.initEvent(e, !0, !1), r
                }
                if (!window.Event)throw Error("不支持自定义事件，需要继续处理");
                try {
                    return new Event(e, {bubbles: !0, cancelable: !1, detail: t})
                } catch (n) {
                    throw Error("new Event出错:" + JSON.stringify(n))
                }
            }
        }, e
    }), n("components/kz_video", ["components/base", "customEvents"], function (e, t) {
        return e.extend({
            title: "特效视频",
            events: ["kz-video-ended"],
            icon: "http://pic.kuaizhan.com/g2/M01/44/76/CgpQVFZAOgiASF_8AABLS4k5cqE3654076",
            type: "kz_video",
            config_tips: "特效视频主要用于制作视频交互效果；其在浏览器中将全屏播放，在微信中将内嵌播放。",
            meta_config: {
                video: {label: "视频地址", type: "KZVideo", "default": "{}"},
                auto_play: {label: "自动播放", type: "Checkbox", "default": "true"},
                ended_jump: {label: "结束跳转", type: "InnerLink", "default": ""}
            },
            defaultStyle: {
                width: 200,
                height: 160,
                "background-color": "rgba(255,255,255,0)",
                "border-radius": "0",
                "border-color": "rgba(255,255,255,1)",
                "border-width": "2px",
                "border-style": "none",
                opacity: "1",
                transform: "rotate(0deg)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                "padding-top": "0",
                "padding-left": "0",
                "padding-right": "0",
                "padding-bottom": "0"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {color: "none", textShadow: "none"},
            render: function (e, t) {
                var n = e.video || "{}", r = JSON.parse(n), i = this, s = e.auto_play === undefined || e["auto_play"] == "true";
                return s = t ? !1 : s, this.data = r, this.auto_play = s, this.ended_jump = e.ended_jump || "", this.item_el.innerHTML = "", this._init(t), this
            },
            _init: function (e) {
                if (!this.item_el.innerHTML) {
                    var t = "";
                    this.data.url ? e ? t = "<div style='z-index:1;position: absolute;margin-left: -35px;left: 50%;top: 50%;margin-top: -35px;' class='play-icon'><img src='http://s0.kuaizhan.com/res/skin/images/video-play.png'></div><img  style='position: absolute;width:100%;height:100%' src='" + this.data.img + "'/>" : t = "<video autobuffer webkit-playsinline='webkit-playsinline' preload style='width:100%;height:100%' poster='" + this.data.img + "'><source src='" + this.data.url + "' type='video/mp4'/></video>" : t = "<div style='  position: absolute;margin-left: -35px;left: 50%;top: 50%;margin-top: -35px;' class='play-icon'><img src='http://s0.kuaizhan.com/res/skin/images/video-play.png'></div>", this.item_el.innerHTML = t, this.video = this.item_el.querySelector("video")
                }
            },
            _stop: function () {
                this.stop = !0, this.video && (this.video.currentTime = 0, this.video.pause())
            },
            bindEvents: function () {
                var e = this;
                if (this.video) {
                    this.auto_play;
                    if (this.video.readyState >= this.video.HAVE_FUTURE_DATA) e.can_play = !0; else {
                        var n = function () {
                            e.video.removeEventListener("canplay", n), e.video.removeEventListener("canplaythrough", n), e.can_play = !0
                        };
                        this.video.addEventListener("canplay", n), this.video.addEventListener("canplaythrough", n)
                    }
                }
                if (this.video && this.ended_jump) {
                    var r = this.play_item && this.play_item.scene && this.play_item.scene.page;
                    r && this.video.addEventListener("ended", function () {
                        r.jump(e.ended_jump)
                    })
                }
                this.video && this.video.addEventListener("ended", function () {
                    e.container.el.dispatchEvent(t.getEvent("kz-video-ended"))
                })
            },
            beforePlayAnima: function () {
                var e = this;
                this._init();
                if (this.auto_play && this.video) {
                    this.playVideo();
                    if (!this.can_play) {
                        var t = function () {
                            e.stop !== !0 && e.playVideo(), e.video.removeEventListener("canplay", t)
                        };
                        e.video.addEventListener("canplay", t)
                    }
                }
            },
            beforeClearAnima: function () {
                this._stop()
            },
            beforeDelete: function () {
                this._stop()
            },
            beforeDestroy: function () {
                this._stop()
            },
            playVideo: function () {
                if (this.stop === !1)return;
                this.stop = !1, this.video && (this.video.currentTime = 0, this.video.play())
            }
        })
    }), n("components/video", ["components/base", "lengthPrefix", "utils"], function (e, t, n) {
        return e.extend({
            title: "视频",
            icon: "http://pic.kuaizhan.com/g2/M00/10/5D/CgpQVFT2ySiADICkAAANypaitVg5109940",
            type: "video",
            meta_config: {video: {label: "视频地址", type: "Video", "default": "{}"}},
            defaultStyle: {
                width: 200,
                height: 160,
                "background-color": "rgba(255,255,255,0)",
                "border-radius": "0",
                "border-color": "rgba(255,255,255,1)",
                "border-width": "2px",
                "border-style": "none",
                opacity: "1",
                transform: "rotate(0deg)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                "padding-top": "0",
                "padding-left": "0",
                "padding-right": "0",
                "padding-bottom": "0"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {color: "none", textShadow: "none"},
            render: function (e) {
                var t = e.video || "{}", n = JSON.parse(t);
                return this.height = parseInt(e.style.height), this.width = parseInt(e.style.width), this.data = n, this._init(), this
            },
            _init: function () {
                this.play_item.scene && this.play_item.scene.page && this.play_item.scene.page.player && this.play_item.scene.page.player.closeHelperLayer(), this.item_el.innerHTML = (this.data.image && this.data.image != "undefined" ? "<img src='" + this.data.image + "' class='pic'/>" : "") + "<div class='play-icon'><img src='http://s0.kuaizhan.com/res/skin/images/video-play.png'></div>", this.init_html = this.item_el.innerHTML
            },
            bindEvents: function () {
                var e = this, t = "ontouchstart" in window;
                this.item_el.addEventListener(t ? "touchstart" : "click", function (t) {
                    if (/QQBrowser.*?MicroMessenger/ig.test(window.navigator.userAgent)) {
                        var n = e.play_item.scene.page.player.openHelperLayer(e.data.play_html), r = n.querySelector("iframe");
                        r.style.setProperty("height", "45%"), r.style.setProperty("position", "absolute"), r.style.setProperty("top", "25%"), r.style.setProperty("min-height", "45%")
                    } else e.item_el.innerHTML = e.init_html + "<span style='position:absolute;top:50%;text-align:center;left:50%;height:20px;line-height:20px;margin-top:-10px;margin-left:-40px;width:80px;background:rgba(255,255,255,.4);border-radius:5px;'>视频加载中...</span><div style='width:100%;height:100%;position:absolute;left:0;top:0;z-index:1'>" + e.data.play_html + "</div>";
                    e.play_item.scene && e.play_item.scene.page && e.play_item.scene.page.player.musicController && e.play_item.scene.page.player.musicController.pause()
                })
            },
            beforePlayAnima: function () {
                this._init()
            },
            beforeClearAnima: function () {
                this._init()
            },
            beforeDelete: function () {
                this._init()
            },
            beforeDestroy: function () {
                this._init()
            }
        })
    }), n("components/textInput", ["components/base", "lengthPrefix", "utils"], function (e, t, n) {
        return e.extend({
            title: "输入框",
            icon: "http://pic.kuaizhan.com/g2/M01/0F/BE/wKjmqlTv6hOAb8PeAAALhi3El1k7026981",
            type: "input",
            meta_config: {
                label: {label: "名称", type: "String", "default": "输入项"},
                place_holder: {label: "提示信息", type: "String", "default": "请输入:"},
                required: {label: "必填项", type: "Checkbox", "default": "true", text: "必填"},
                multiline: {label: "多行输入", type: "Hidden", "default": "false"},
                data_type: {
                    label: "类型",
                    type: "InputTypeSelector",
                    "default": '{"type":"text","option":null}',
                    options: [{text: "文本", value: "text"}, {text: "电子邮件", value: "email"}, {
                        text: "手机",
                        value: "tel"
                    }, {text: "日期", value: "date"}, {text: "数字", value: "number"}, {
                        text: "网站地址",
                        value: "url"
                    }, {text: "多选一", value: "select"}]
                }
            },
            config_tips: "请配合提交按钮提交输入框内容, &nbsp;&nbsp;<a target='_blank' style='color:#fff;' href='/form/manage?site_id=" + n.getSiteId() + "'>查看数据</a>",
            defaultStyle: {
                width: "170",
                height: "40",
                "background-color": "rgba(255,255,255,1)",
                "border-radius": "4",
                "border-color": "rgba(200,200,200,1.00)",
                "border-style": "none",
                "padding-left": "10",
                "padding-top": "4",
                "padding-bottom": "4",
                "padding-right": "10",
                color: "rgba(0,0,0,1)",
                opacity: 1,
                transform: "rotate(0deg)",
                "border-width": "2px",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)"
            },
            _defaultStyle: {
                "border-width": "2",
                "transform-rotate": "0",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "",
                "box-shadow-blur": "",
                "box-shadow-size": "",
                "box-shadow-degree": "135"
            },
            style_config: {padding: "none", textShadow: "none"},
            render: function (e) {
                var t = e["required"] == "true" ? !0 : !1, r;
                e.data_type && e["data_type"].indexOf("{") == 0 ? r = JSON.parse(e.data_type) : r = {
                    type: e.data_type,
                    option: null
                }, e["multiline"] == "true" && (!r.option || r.option.multi_line == undefined) && (r.option = {multi_line: !0}), e.place_holder = e.place_holder === undefined ? e.label : e.place_holder;
                if (r.type == "text" && r.option && r.option.multi_line) this.item_el.innerHTML = "<textarea readonly='readonly' " + (t ? "required='required'" : "") + " data-role='form-item' type='" + (r && r.type || "text").replace(/\'/g, "\\'") + "' data-title='" + n.escape(e.label).replace(/\'/g, "\\'") + "' placeholder='" + e.place_holder.replace(/\'/g, "\\'") + "'></textarea>"; else if (r.type == "select") {
                    var i = "<select readonly='readonly' " + (t ? "required='required'" : "") + " data-title='" + n.escape(e.label).replace(/\'/g, "\\'") + "'  data-role='form-item'>";
                    i += "<option value=''>" + n.escape(e.place_holder) + "</option>", r.option && r.option instanceof Array && r.option.forEach(function (e) {
                        i += "<option value='" + n.escape(e).replace(/\'/g, "\\'") + "'>" + n.escape(e).replace(/\'/g, "\\'") + "</option>"
                    }), i += "</select>", this.item_el.innerHTML = i
                } else this.item_el.innerHTML = "<input readonly='readonly' " + (t ? "required='required'" : "") + " data-role='form-item' type='" + (e.data_type || "text").replace(/\'/g, "\\'") + "' data-title='" + n.escape(e.label).replace(/\'/g, "\\'") + "' placeholder='" + e.place_holder.replace(/\'/g, "\\'") + "'/>";
                return this
            },
            bindEvents: function () {
                this.item_el.childNodes[0].removeAttribute("readonly")
            }
        })
    }), n("ajax", [], function () {
        var e = function (e) {
            var t = new XMLHttpRequest;
            t.open(e.method || "GET", e.url, !0);
            var n = [];
            if (e.method == "post") {
                t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), t.setRequestHeader("kz-cookie", document.cookie);
                for (var r in e.data)n.push(r + "=" + encodeURIComponent(e.data[r]))
            }
            t.send(n.join("&")), t.onreadystatechange = function () {
                4 == t.readyState && (t.status === 200 ? e.success && e.success(t.responseText, t.status) : e.error && e.error(t.responseText, t.status))
            }
        };
        return e
    }), n("components/button", ["components/base", "ajax", "utils", "customEvents"], function (e, t, n, r) {
        return e.extend({
            title: "提交按钮",
            config_tips: " <a target='_blank' style='color:#fff;display:block;text-align:center;width:100%' href='/form/manage?site_id=" + n.getSiteId() + "'>查看表单数据</a>",
            icon: "http://pic.kuaizhan.com/g2/M01/0F/BC/CgpQVFTv6iSAJfOKAAALf2JtvtE5028927",
            events: ["kz-form-submit-success", "kz-form-submit-failed"],
            type: "button",
            meta_config: {
                title: {label: "表单名", type: "String", "default": "客户信息反馈表"},
                label: {label: "按钮文字", type: "String", "default": "提交"},
                posting_text: {label: "提交中", type: "String", "default": "提交中"},
                success_text: {label: "成功提醒", type: "String", "default": "提交成功"},
                failed_text: {label: "失败提醒", type: "String", "default": "提交失败"},
                all_data: {
                    label: "提交内容",
                    type: "Droplist",
                    "default": "page",
                    options: [{text: "当前页输入项", value: "page"}, {text: "所有页输入项", value: "all"}]
                },
                link: {label: "成功跳转", type: "Link", "default": ""}
            },
            defaultStyle: {
                color: "rgba(255,255,255,1)",
                width: "80",
                height: "40",
                "background-color": "rgba(200,200,200,1.00)",
                "border-radius": "4",
                "border-color": "rgba(255,255,255,1.00)",
                "border-style": "none",
                "padding-left": "10",
                "padding-top": "4",
                "padding-bottom": "4",
                "padding-right": "10",
                left: "164",
                top: "75",
                opacity: "1",
                transform: "rotate(0deg)",
                "border-width": "1px",
                "text-shadow": "0px 0px 0px rgba(1,1,1,0.20)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)"
            },
            _defaultStyle: {
                "border-width": "1",
                "transform-rotate": "0",
                "text-shadow-color": "rgba(1,1,1,0.20)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {padding: "none"},
            render: function (e) {
                return this.all_data = e["all_data"] == "all" ? !0 : !1, this.title = e.title, this.label = e.label, this.posting_text = e.posting_text || "提交中..", this.success_text = e.success_text, e.link && (this.link = JSON.parse(e.link)), this.failed_text = e.failed_text, this.item_el.innerHTML = "<input type='button' value='" + e.label.replace(/\'/ig, "\\'") + "'/>", this
            },
            bindEvents: function () {
                var e = this;
                this.item_el.addEventListener("click", function (i) {
                    i.preventDefault();
                    var s = {}, o = [];
                    s.form_id = e.container.scene.data._id + (e.container.scene.page.page_id || ""), s.site_id = n.getSiteId(), s.title = e.title;
                    var u = e.all_data ? e.container.scene.page.container_el.querySelectorAll("[data-role='form-item']") : e.container.scene.el.querySelectorAll("[data-role='form-item']");
                    for (var a = 0; a < u.length; a++) {
                        var f = u[a], l = !!f.getAttribute("required"), c = f.getAttribute("type"), h = f.getAttribute("data-title");
                        if (l && f.value.replace(/^\s*|\s*$/ig, "") == "") {
                            alert(h + "必须填写"), e.all_data || f.focus();
                            return
                        }
                        if (c == "tel" && f.value && !/^1[3|4|5|8][0-9]\d{8}$/ig.test(f.value)) {
                            alert(h + "格式错误");
                            return
                        }
                        if (c == "email" && f.value && !/^\S+@\S+$/ig.test(f.value)) {
                            alert(h + "格式错误");
                            return
                        }
                        o.push({is_required: l, is_multi: !1, title: h, answer: f.value})
                    }
                    s.items = JSON.stringify(o);
                    if (/www\.kuaizhan.com/ig.test(window.location.host)) {
                        alert("仅可以在发布后页面提交数据。");
                        return
                    }
                    if (e.posting)return;
                    e.posting = !0, $(e.item_el).find("input").val(e.posting_text), t({
                        method: "post",
                        url: "/plugin/api-proxy/form/kz_form/api/answer?site_id=" + n.getSiteId(),
                        data: s,
                        success: function () {
                            $(e.item_el).find("input").val(e.label), e.posting = !1;
                            for (var t = 0; t < u.length; t++)u[t].value = "";
                            e.container.el.dispatchEvent(r.getEvent("kz-form-submit-success")), alert(e.success_text || "提交成功");
                            var n = e.play_item && e.play_item.scene && e.play_item.scene.page;
                            n && e.link && (e.link.link_res_type == -1 ? n.jump(e.link.link) : e.link.link && (window.location = e.link.link))
                        },
                        error: function (t) {
                            $(e.item_el).find("input").val(e.label), e.posting = !1, e.container.el.dispatchEvent(r.getEvent("kz-form-submit-failed"));
                            if (t)try {
                                t = JSON.parse(t)
                            } catch (n) {
                            }
                            t.code == 10005 ? alert(t.msg) : alert(e.failed_text || "提交失败")
                        }
                    })
                })
            }
        })
    }), n("tools/jic", [], function () {
        return {
            compress: function (e, t, n, r) {
                var i = "image/jpeg";
                typeof n != "undefined" && n == "png" && (i = "image/png");
                var s = r / e.naturalWidth, o = document.createElement("canvas");
                s >= 1 ? (o.width = e.naturalWidth, o.height = e.naturalHeight) : (o.width = r, o.height = Math.round(e.naturalHeight * s));
                var u = o.getContext("2d").drawImage(e, 0, 0, o.width, o.height), a = o.toDataURL(i, t / 100), f = new Image;
                return f.src = a, f
            }, upload: function (e, t, n, r, i, s, o, u) {
                var a = "image/jpeg";
                n.substr(-4) == ".png" && (a = "image/png");
                var f = e.src;
                f = f.replace("data:" + a + ";base64", "");
                var l = new FormData;
                l.append("filename", n), l.append("filebody", f), l.append("content_type", "image/jpeg");
                var c = new XMLHttpRequest;
                c.open("POST", t), c.onerror = i, s && (c.timeout = s), o && o instanceof Function && (c.upload.onprogress = o), u && u instanceof Function && (c.ontimeout = u), c.send(l), c.onreadystatechange = function () {
                    this.readyState == 4 && (this.status == 200 ? r(this.responseText) : this.status >= 400 && i && i instanceof Function && i(this.responseText))
                }
            }
        }
    }), n("components/map", ["components/base", "utils", "global", "tools/jic", "customEvents"], function (e, t, n, r, i) {
        return e.extend({
            title: "地图",
            icon: "http://pic.kuaizhan.com/g2/M00/1F/BE/CgpQVFeDdtyAQA29AAADqm5QoIQ0156285",
            type: "map",
            style_meta_config: {icon_color: {label: "标注颜色", type: "Color", "default": "rgba(47,143,243,1.00)"}},
            meta_config: {
                map: {
                    label: "",
                    type: "Map",
                    "default": '{"lng":116.325402,"lat":39.983335,"zoom":18,"staticUrl":"http://restapi.amap.com/v3/staticmap?location=116.325402,39.983335&zoom=18&size=480*360&markers=mid,0xFF0000,A:116.325402,39.983335&key=1cc43613e9ba921318906bac8ed34119"}'
                }
            },
            defaultStyle: {
                "background-color": "transparent",
                "border-color": "rgba(255,255,255,1.00)",
                "border-radius": 0,
                "border-style": "none",
                "border-width": "4px",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                height: 100,
                opacity: "1",
                padding: 0,
                transform: "rotate(0deg)",
                width: 100
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "4",
                "box-shadow-color": "rgba(0,0,0,.8)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-degree": "0"
            },
            style_config: {color: "none", textShadow: "none", padding: "none"},
            render: function (e) {
                var t = this, n = JSON.parse(e.map), r = e.style.width, i = e.style.height, s = typeof this.rgb_to_hex(e.icon_color) == "undefined" ? "2F8FF3" : this.rgb_to_hex(e.icon_color), o = "http://restapi.amap.com/v3/staticmap?location=" + n.lng + "," + n.lat + "&zoom=" + n.zoom + "&size=" + r + "*" + i + "&markers=mid,0x" + s + ",A:" + n.lng + "," + n.lat + "&key=1cc43613e9ba921318906bac8ed34119", u = "http://m.amap.com/navi/?dest=" + n.lng + "," + n.lat + "&key=d1792d19abe5e3f3cc9152c8c2f1553f";
                return this.item_el.innerHTML = '<a href="' + u + '" style="position:absolute;display:block;width:100%;height:100%;"></a><img src="' + o + '"/>', this
            },
            bindEvents: function () {
            },
            rgb_to_hex: function (e) {
                if (/^(rgba|RGBA)/.test(e)) {
                    var t = e.replace(/(?:||rgba|RGBA)*/g, "").replace("(", "").replace(")", "").split(","), n = "#";
                    for (var r = 0; r < t.length - 1; r++) {
                        var i = Number(t[r]) < 16 ? "0" + Number(t[r]).toString(16) : Number(t[r]).toString(16);
                        n += i
                    }
                    return n.replace("#", "")
                }
            }
        })
    }), n("components/telButton", ["components/base"], function (e) {
        return e.extend({
            title: "电话",
            icon: "http://pic.kuaizhan.com/g1/M01/11/F3/wKjmqVUJKSOAFzpMAAANVsR_XbM5153661",
            type: "tel",
            meta_config: {
                label: {label: "按钮文字", type: "String", "default": "联系我们"},
                tel: {label: "电话号码", type: "String", "default": "01012345678"}
            },
            defaultStyle: {
                color: "rgba(255,255,255,1)",
                width: 80,
                height: 40,
                "background-color": "rgba(200,200,200,1.00)",
                "border-radius": "4",
                "border-color": "rgba(255,255,255,1.00)",
                "border-style": "none",
                "padding-left": "10",
                "padding-top": "4",
                "padding-bottom": "4",
                "padding-right": "10",
                left: 164,
                top: 75,
                opacity: "1",
                transform: "rotate(0deg)",
                "border-width": "1px",
                "text-shadow": "0px 0px 0px rgba(1,1,1,0.20)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)"
            },
            _defaultStyle: {
                "border-width": "1",
                "transform-rotate": "0",
                "text-shadow-color": "rgba(1,1,1,0.20)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {padding: "none"},
            render: function (e) {
                return this.title = e.title, this.item_el.innerHTML = "<input type='button' onclick='window.open(\"tel:" + e.tel + "\")' value='" + e.label.replace(/\'/ig, "\\'") + "'/>", this
            },
            config_tips: "",
            bindEvents: function () {
            }
        })
    }), n("components/fingerScan", ["components/base", "utils"], function (e, t) {
        var n = {link: "", link_res_id: 0, link_res_name: "", link_res_type: 1}, r = {
            link: "",
            link_res_type: -1
        }, i = /Android|iPhone|iPad/ig.test(window.navigator.userAgent) || window.location.hash == "#mobile_view";
        return e.extend({
            title: "指纹",
            icon: "http://pic.kuaizhan.com/g2/M00/2C/E8/wKjmqlXlQ5iAKAVuAAAItLP3LEE6066620",
            type: "finger_scan",
            meta_config: {
                image: {
                    type: "Hidden",
                    "default": "http://pic.kuaizhan.com/g1/M00/2C/D5/wKjmqVXlQ7WAYTFbAAD4shKf-m02410916"
                },
                need_block: {label: "阻止翻页", type: "Hidden", "default": "true"},
                color: {label: "颜色", type: "Color", "default": "#ff2d55"},
                link: {type: "Link", label: "跳转链接", "default": ""}
            },
            defaultStyle: {
                "border-color": "rgba(255,255,255,1.00)",
                "border-radius": 0,
                "border-style": "none",
                "border-width": "4px",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                height: 160,
                opacity: "1",
                "padding-bottom": 0,
                "padding-left": 0,
                "padding-right": 0,
                "padding-top": 0,
                transform: "rotate(0deg)",
                width: 160
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "4",
                "box-shadow-color": "rgba(0,0,0,.8)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0"
            },
            style_config: {color: "none", textShadow: "none"},
            config_tips: "本组件长按2秒后跳转到指定链接",
            render: function (e, t) {
                var s = e.link, o = this, u = this.play_item && this.play_item.scene && this.play_item.scene.page;
                this.item_el.innerHTML = "<a></a><span class=''></span><em>扫描中</em>", this.need_block = e.need_block === undefined || e["need_block"] == "true", /^\{/ig.test(s) ? s = JSON.parse(s) : /^\/|http:\/\//ig.test(s) ? s = $.extend(!0, {}, n, {link: s}) : s = $.extend(!0, {}, r, {link: s});
                var a = function () {
                    u && u.jump(s.link)
                };
                e.image && s && s.link && s.link_res_type != -1 && (a = function () {
                    if (window.location.href.indexOf("http://www.") == 0)return;
                    window.location = s.link
                });
                var f = undefined, l = 0, c = 2, h = this.item_el.querySelector("SPAN"), p = this.item_el.querySelector("A"), d = this.item_el.querySelector("EM");
                p.style.setProperty("-webkit-mask-image", "url('" + (e.image || this.meta_config.image["default"]) + "')"), p.style.setProperty("background-color", e.color), d.style.setProperty("color", e.color);
                var v = function (e) {
                    return h.getAttribute("class") == "" && h.setAttribute("class", " animated scanUp infinite"), d.setAttribute("class", "scaning animated flash infinite"), e && e.stopPropagation(), e && e.preventDefault(), l = 0, f === undefined && (f = setInterval(function () {
                        l++, console.log(l), l >= c && (m(), setTimeout(function () {
                            u._tmp_page_control !== undefined && u.setPagingControl(u._tmp_page_control), u._tmp_page_control = undefined
                        }, 1e3), a())
                    }, 1e3)), !1
                }, m = function (e) {
                    h.setAttribute("class", ""), d.setAttribute("class", ""), e && e.stopPropagation(), e && e.preventDefault(), l = 0, clearInterval(f), f = undefined
                };
                if (t || !u)return;
                return this.item_el.removeEventListener("touchstart", v), this.item_el.removeEventListener("touchend", m), this.item_el.removeEventListener("touchcancel", m), this.item_el.removeEventListener("mousedown", v), this.item_el.removeEventListener("mouseup", m), i ? (this.item_el.addEventListener("touchstart", v), this.item_el.addEventListener("touchend", m), this.item_el.addEventListener("touchcancel", m)) : (this.item_el.addEventListener("mousedown", v), this.item_el.addEventListener("mouseup", m)), this
            },
            beforePlayAnima: function () {
                if (this.need_block) {
                    var e = this.play_item && this.play_item.scene && this.play_item.scene.page;
                    e && e._tmp_page_control === undefined && (e._tmp_page_control = e.playControl.paging_control, e.setPagingControl(2))
                }
            }
        })
    }), n("components/image360", ["components/base", "lengthPrefix"], function (e, t) {
        return e.extend({
            title: "360全景",
            icon: "http://pic.kuaizhan.com/g2/M01/48/31/wKjmqlZVNcuAWhwmAAAFLlsHzsA9880393",
            type: "image360",
            meta_config: {
                image_list: {
                    type: "ImageGroup",
                    "default": '[{"title":"frame-01.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPTWAPi-XAACHtJmVmkI9659022"},{"title":"frame-02.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPTaAQ9zmAACKUXEAaTA5847455"},{"title":"frame-03.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPTaAWxT1AACNbxM8y9E6325298"},{"title":"frame-04.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPTaAJRx2AACPYBAlG0Y1977450"},{"title":"frame-05.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPTeAWKpkAACNzbWmP2E1160381"},{"title":"frame-06.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPTeABIeOAACM98xNtNs6559434"},{"title":"frame-07.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPTeATZ-7AACOC270Y4Q1376279"},{"title":"frame-08.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPTeACZ5vAACNp9VsHbc2076812"},{"title":"frame-09.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPTiAYzSkAACMqPnnlls1533052"},{"title":"frame-10.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUSAGBDWAACG-iWseWc2117131"},{"title":"frame-11.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUWAEwDIAAB-SGromyE1298970"},{"title":"frame-12.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUWAakvaAAB3xfj9V9k6995800"},{"title":"frame-13.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUWAYCyxAABxbPMc-yA0467370"},{"title":"frame-14.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUaASXyPAABpgy1jlyA9317309"},{"title":"frame-15.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUaAKF_zAABr1yNSmwU0642465"},{"title":"frame-16.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUaAatHCAAB29OBXIaM5514402"},{"title":"frame-17.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUeAe4bCAAB-6UH2mfo9259839"},{"title":"frame-18.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUeAUWhoAACBSGGHyGo7293020"},{"title":"frame-19.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUeAG7PSAACEx6wibqE0391811"},{"title":"frame-20.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUeAbQmSAACHpM1c4uY3924665"},{"title":"frame-21.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUiAHzpwAACKgjJu8rY6121368"},{"title":"frame-22.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUiAPxrJAACLMoeH-ro4835386"},{"title":"frame-23.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUiAZNCpAACKYom9DCA5270154"},{"title":"frame-24.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUmAW21sAACLV2yFT8k1900313"},{"title":"frame-25.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUmAWm_lAACNuvOVQjQ4533724"},{"title":"frame-26.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUmAXaKsAACOQHRtcb43426992"},{"title":"frame-27.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUqAXKFdAACOHEAIr0E3266492"},{"title":"frame-28.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUqAK6PeAACKA0FRXS03936465"},{"title":"frame-29.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUqAU2F6AACCOWARj5Q9370401"},{"title":"frame-30.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUqAaFP8AAB6v9-5ycE9884839"},{"title":"frame-31.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUuAd7ZVAAB2eajaNrs1874563"},{"title":"frame-32.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUuAd9vaAABwA4ouspY5141683"},{"title":"frame-33.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUuAGoiPAAByZ_Z1mbk3477123"},{"title":"frame-34.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUyAIdJ5AAB9EEcwcgc2702186"},{"title":"frame-35.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUyAb2UIAACFVeR9rwE4202253"},{"title":"frame-36.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUyAVMcWAACGIVm_ngo6395778"}]',
                    label: ""
                }
            },
            defaultStyle: {
                "background-color": "transparent",
                "border-color": "rgba(255,255,255,1.00)",
                "border-radius": 0,
                "border-style": "none",
                "border-width": "4px",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                height: 155,
                opacity: "1",
                "padding-bottom": 0,
                "padding-left": 0,
                "padding-right": 0,
                "padding-top": 0,
                transform: "rotate(0deg)",
                width: 320
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "4",
                "box-shadow-color": "rgba(0,0,0,.8)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0"
            },
            style_config: {color: "none", textShadow: "none", padding: "none"},
            render: function (e, t) {
                var n = e.image_list ? JSON.parse(e.image_list) : [], r = "";
                return n.forEach(function (e, t) {
                    if (!e.pic)return;
                    r += "<img " + (t == 0 ? "class='cur'" : "") + " data-index='" + t + "' src='" + e.pic + "'/>"
                }), this.width = parseInt(e.style.width), this.images_length = n.length, this.item_el.innerHTML = r, this
            },
            bindEvents: function (e) {
                if (e)return;
                var t = this, n = 0, r = 0, i = 0, s = 0, o = 0, u, a = !1, f = 0, l = this.width / this.images_length, c = function (e) {
                    f = e.clientX || e.touches[0].pageX, s = 0, o = 0, a = !0, clearInterval(u), e.stopPropagation(), e.preventDefault()
                }, h = function (e) {
                    var u = e.clientX || e.touches && e.touches[0] && e.touches[0].pageX;
                    if (a) {
                        s++, s % 2 == 0 && (o = (r - u) * 10), r = u, i = n + (f - u), i > t.width && (i -= t.width), i < 0 && (i = t.width + i);
                        var c = Math.round(i / l), h = t.item_el.querySelector("[data-index='" + c + "']"), p = t.item_el.querySelector(".cur");
                        h && p.getAttribute("data-index") != c && (p.setAttribute("class", ""), h.setAttribute("class", "cur")), e.stopPropagation(), e.preventDefault()
                    }
                }, p = function () {
                    n = i;
                    var e = function () {
                        i = Math.round(n + o * .1), o = Math.round(o * .9), i > t.width && (i -= t.width), i < 0 && (i = t.width + i);
                        var e = Math.round(i / l), r = t.item_el.querySelector("[data-index='" + e + "']"), s = t.item_el.querySelector(".cur");
                        r && s.getAttribute("data-index") != e && (s.setAttribute("class", ""), r.setAttribute("class", "cur")), n = i;
                        if (Math.abs(o) < 10) {
                            clearInterval(u);
                            return
                        }
                    };
                    u = setInterval(e, 50), f = 0, a = !1
                };
                "ontouchstart" in window ? (this.item_el.addEventListener("touchstart", c), this.item_el.addEventListener("touchend", p), this.item_el.addEventListener("touchmove", h)) : (this.item_el.addEventListener("mousedown", c), this.item_el.addEventListener("mouseup", p), this.item_el.addEventListener("mousemove", h))
            }
        })
    }), n("components/gif_video", ["components/base", "customEvents"], function (e, t) {
        return e.extend({
            events: ["kz-gif-video-ended"],
            title: "逐帧动画",
            icon: "http://pic.kuaizhan.com/g1/M00/48/58/CgpQU1ZWpmOAbNo2AAACBw01HyY0999959",
            type: "gifVideo",
            meta_config: {
                image_list: {
                    type: "ImageGroup",
                    "default": '[{"title":"frame-01.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPTWAPi-XAACHtJmVmkI9659022"},{"title":"frame-02.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPTaAQ9zmAACKUXEAaTA5847455"},{"title":"frame-03.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPTaAWxT1AACNbxM8y9E6325298"},{"title":"frame-04.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPTaAJRx2AACPYBAlG0Y1977450"},{"title":"frame-05.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPTeAWKpkAACNzbWmP2E1160381"},{"title":"frame-06.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPTeABIeOAACM98xNtNs6559434"},{"title":"frame-07.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPTeATZ-7AACOC270Y4Q1376279"},{"title":"frame-08.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPTeACZ5vAACNp9VsHbc2076812"},{"title":"frame-09.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPTiAYzSkAACMqPnnlls1533052"},{"title":"frame-10.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUSAGBDWAACG-iWseWc2117131"},{"title":"frame-11.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUWAEwDIAAB-SGromyE1298970"},{"title":"frame-12.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUWAakvaAAB3xfj9V9k6995800"},{"title":"frame-13.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUWAYCyxAABxbPMc-yA0467370"},{"title":"frame-14.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUaASXyPAABpgy1jlyA9317309"},{"title":"frame-15.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUaAKF_zAABr1yNSmwU0642465"},{"title":"frame-16.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUaAatHCAAB29OBXIaM5514402"},{"title":"frame-17.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUeAe4bCAAB-6UH2mfo9259839"},{"title":"frame-18.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUeAUWhoAACBSGGHyGo7293020"},{"title":"frame-19.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUeAG7PSAACEx6wibqE0391811"},{"title":"frame-20.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUeAbQmSAACHpM1c4uY3924665"},{"title":"frame-21.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUiAHzpwAACKgjJu8rY6121368"},{"title":"frame-22.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUiAPxrJAACLMoeH-ro4835386"},{"title":"frame-23.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUiAZNCpAACKYom9DCA5270154"},{"title":"frame-24.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUmAW21sAACLV2yFT8k1900313"},{"title":"frame-25.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUmAWm_lAACNuvOVQjQ4533724"},{"title":"frame-26.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUmAXaKsAACOQHRtcb43426992"},{"title":"frame-27.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUqAXKFdAACOHEAIr0E3266492"},{"title":"frame-28.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUqAK6PeAACKA0FRXS03936465"},{"title":"frame-29.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUqAU2F6AACCOWARj5Q9370401"},{"title":"frame-30.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUqAaFP8AAB6v9-5ycE9884839"},{"title":"frame-31.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUuAd7ZVAAB2eajaNrs1874563"},{"title":"frame-32.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUuAd9vaAABwA4ouspY5141683"},{"title":"frame-33.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/33/wKjmqlZVPUuAGoiPAAByZ_Z1mbk3477123"},{"title":"frame-34.jpg","pic":"http://pic.kuaizhan.com/g2/M00/48/17/CgpQVFZVPUyAIdJ5AAB9EEcwcgc2702186"},{"title":"frame-35.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/33/wKjmqlZVPUyAb2UIAACFVeR9rwE4202253"},{"title":"frame-36.jpg","pic":"http://pic.kuaizhan.com/g2/M01/48/17/CgpQVFZVPUyAVMcWAACGIVm_ngo6395778"}]',
                    label: ""
                },
                auto_play: {label: "自动播放", type: "Checkbox", "default": "true"},
                is_loop: {label: "循环播放", type: "Checkbox", "default": "false"},
                speed: {
                    label: "播放速度",
                    type: "Number",
                    "default": "30",
                    template: "<span><%=html%></span> 帧/秒",
                    max: 30,
                    min: 1,
                    step: 1
                }
            },
            defaultStyle: {
                "background-color": "transparent",
                "border-color": "rgba(255,255,255,1.00)",
                "border-radius": 0,
                "border-style": "none",
                "border-width": "4px",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                height: 155,
                opacity: "1",
                "padding-bottom": 0,
                "padding-left": 0,
                "padding-right": 0,
                "padding-top": 0,
                transform: "rotate(0deg)",
                width: 320
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "4",
                "box-shadow-color": "rgba(0,0,0,.8)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0"
            },
            style_config: {color: "none", textShadow: "none"},
            render: function (e, t) {
                var n = e.image_list ? JSON.parse(e.image_list) : [], r = "";
                return n.forEach(function (e, t) {
                    if (!e.pic)return;
                    r += "<img style='display:none' " + (t == 0 ? "class='cur'" : "") + " data-index='" + t + "' src='" + e.pic + "'/>"
                }), this.speed = Math.abs(parseInt(e.speed) || 16), this.timer_speed = parseInt(1e3 / this.speed), this.loop = e["is_loop"] == "true", this.auto_play = e["auto_play"] == "true", this.item_el.innerHTML = r, this.gif = this.item_el.querySelectorAll("img"), this.gif[0] && this.gif[0].style.setProperty("display", "block"), this
            },
            bindEvents: function (e) {
                this.is_editing = e
            },
            _stop: function () {
                this.is_stop = !0, this.animation && (cancelNextAnimationFrame(this.animation), this.animation = null)
            },
            beforePlayAnima: function () {
                !this.is_editing && this.auto_play && this.playVideo()
            },
            beforeClearAnima: function () {
                this._stop()
            },
            beforeDelete: function () {
                this._stop()
            },
            beforeDestroy: function () {
                this._stop()
            },
            playVideo: function () {
                var e = this;
                this.gif_index = 0, e.animation && (cancelNextAnimationFrame(this.animation), this.animation = null, e.is_stop = !0), e.is_stop = !1;
                if (this.gif.length >= 2) {
                    for (var n = 0; n < this.gif.length; n++)n !== this.gif_index ? this.gif[n].style.setProperty("display", "none") : this.gif[n].style.setProperty("display", "block");
                    e.last_time = new Date;
                    var r = function () {
                        if (e.is_stop)return;
                        var n = new Date, i = n - e.last_time;
                        if (i >= e.timer_speed) {
                            var s = Math.ceil(i / e.timer_speed);
                            e.last_time = n, e.gif[e.gif_index].style.setProperty("display", "none"), e.gif_index += s;
                            if (e.gif_index >= e.gif.length - 1) {
                                if (!e.loop) {
                                    e.gif_index = e.gif.length - 1, e.gif[e.gif_index].style.setProperty("display", "block"), e.container.el.dispatchEvent(t.getEvent("kz-gif-video-ended")), e._stop();
                                    return
                                }
                                e.gif_index = e.gif_index % e.gif.length
                            }
                            e.gif[e.gif_index].style.setProperty("display", "block")
                        }
                        return requestNextAnimationFrame(r)
                    };
                    e.animation = r()
                }
            }
        })
    }), n("components/coupon_pub", ["components/base", "utils", "global", "customEvents"], function (e, t, n, r) {
        var i = function (e, t) {
            if (e.coupon_type_instance) {
                var n = e.coupon_type_instance.theme_type == 0 ? e.coupon_type_instance.theme : "url(" + e.coupon_type_instance.theme_bg_img + ") no-repeat cover;", r = e.coupon_type_instance.theme_front_color;
                return "<div class='get-pub theme-default'><div class='coupon-preview' style='" + (t ? "" : "display:none") + "'><div class='coupon-preview-inner' style='background:" + n + ";color:" + r + ";'></div></div><div data-role='pub-op'><label><span class='label'>手机号</span><input data-bind='mobile' type='tel'/></label>" + "<label><span class='label'>验证码</span><input class='vcode' type='text'/><button data-role='get-vcode' class='get_vcode'>获取验证码</button></label>" + "<div><button disabled class='get-coupon-btn' data-role='post-coupon'>领取</button></div></div><p class='detail-link'><a href='/fp/crm2/coupon-pub/" + e._id + "'>阅读活动详细规则</a></p></div>"
            }
            return "获取优惠券信息错误"
        }, s = function (e, t) {
            $.ajax({
                url: "/fa/crm2/api/coupon-pub/" + e + "/check-me", success: function (e) {
                    t && t(e)
                }, error: function () {
                    t({error: {message: "check info error.", code: 2}})
                }
            })
        }, o = function (e, t) {
            $.ajax({
                url: "/fa/crm2/api/mobile-vcode", type: "POST", data: {mobile: e}, success: function (e) {
                    t && t(e)
                }, error: function () {
                    alert("系统错误")
                }
            })
        }, u = function (e, t) {
            $.ajax({
                url: "/fa/crm2/api/coupon-pub", type: "POST", data: e, success: function (e) {
                    t && t(e)
                }, error: function () {
                    alert("系统错误")
                }
            })
        };
        return e.extend({
            events: ["kz-coupon-pub-not-available", "kz-coupon-pub-get-success"],
            title: "优惠券",
            icon: "http://pic.kuaizhan.com/g1/M01/6A/73/wKjmqVawY_eATj3VAAADeAxzsDA5306218",
            type: "coupon_pub",
            meta_config: {
                pub_data: {type: "CouponPub", label: "领券活动", "default": "{}"},
                view_coupon: {type: "Checkbox", label: "券信息", "default": "true", text: "显示优惠券信息"}
            },
            defaultStyle: {
                "text-shadow": "0px 0px 0px rgba(0,0,0,0.00)",
                "background-color": "rgba(255,255,255,1.00)",
                "border-color": "rgba(255,255,255,0.00)",
                color: "rgba(0,0,0,0.80)",
                "border-radius": 10,
                "border-style": "none",
                "border-width": "0px",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0)",
                height: 300,
                opacity: "1",
                "padding-bottom": 10,
                "padding-left": 10,
                "padding-right": 10,
                "padding-top": 10,
                transform: "rotate(0deg)",
                width: 260
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "0",
                "box-shadow-color": "rgba(0,0,0,.8)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-degree": "0"
            },
            style_config: {},
            render: function (e, r) {
                var o = this, u = null;
                e.pub_data && (u = JSON.parse(e.pub_data));
                if (!u || !u._id) {
                    this.item_el.innerHTML = "请设置优惠券领取活动";
                    return
                }
                this.pub_data = u, this.item_el.innerHTML = i(u, e["view_coupon"] == "true");
                if (n.is_editing_page) {
                    var a = o.pub_data.coupon_type_instance.title_2 || o.pub_data.coupon_type_instance.title;
                    $(this.item_el).find(".coupon-preview-inner").text(a)
                }
                return !r && !n.is_editing_page && t.login(function (e) {
                    o.user_data = e, e.mobile && $(o.item_el).find("[data-bind='mobile']").val(e.mobile), s(o.pub_data._id, function (e) {
                        o.pub_status = e, e.success == 0 ? (o.pub_status.code != 4 && ($(o.item_el).find(".coupon-preview-inner").html("<div class='preview-cover'>?</div>"), $(o.item_el).find("[data-role='pub-op']").text(o.pub_status.message)), $(o.item_el).find("button").attr("disabled", "disabled")) : $(o.item_el).find(".coupon-preview-inner").html("<div class='preview-cover'>?</div>")
                    })
                }), this
            },
            bindEvents: function () {
                var e, t = $(this.item_el).find("[ data-role='get-vcode']"), n = 0, i = this;
                $(this.item_el).find("[data-role='post-coupon']").on("click", function () {
                    var e = $(i.item_el).find("[data-bind='mobile']").val(), t = $(i.item_el).find("[data-bind='vcode']").val(), n = {
                        require_vcode: !0,
                        pub_id: i.pub_data._id,
                        mobile: e,
                        vcode: t
                    };
                    u(n, function (e) {
                        e.success === 0 ? (alert(e.message), i.container.el.dispatchEvent(r.getEvent("kz-coupon-pub-not-available"))) : i.set_success()
                    })
                }), $(this.item_el).find("[ data-role='get-vcode']").on("click", function () {
                    var r = $(i.item_el).find("[data-bind='mobile']").val();
                    if (!/^\d{11}$/ig.test(r)) {
                        alert("请输入正确的手机号码");
                        return
                    }
                    o(r, function (r) {
                        if (r.success === 0) {
                            alert(r.message);
                            return
                        }
                        $(i.item_el).find("[data-role='post-coupon']").removeAttr("disabled"), e = setInterval(function () {
                            t.text("" + n + "s后重发"), n--, n <= 0 && (t.text("获取验证码").removeAttr("disabled"), clearInterval(e))
                        }, 1e3), n = 60, t.text("" + n + "s后重发").attr("disabled", "disabled")
                    })
                })
            },
            set_success: function () {
                var e = this;
                $(e.item_el).find(".coupon-preview").addClass("get-success");
                var t = e.pub_data.coupon_type_instance.title_2 || e.pub_data.coupon_type_instance.title;
                $(e.item_el).find(".coupon-preview-inner").text(t), $(e.item_el).find("[data-role='pub-op']").html("优惠券已放置您的账户<a href='/fp/crm2/coupon' target='_blank'>账户:" + e.user_data.nick + "</a><button onclick='window.location=\"/fp/crm2/coupon\"'  class='use-coupon-btn'>立即使用</button>").attr("class", "success-tips"), $(e.item_el).find(".use-coupon-btn").removeAttr("disabled"), e.container.el.dispatchEvent(r.getEvent("kz-coupon-pub-get-success"))
            },
            beforePlayAnima: function () {
                var e = this;
                this.pub_data && (this.pub_status ? this.pub_status.success == 0 && ($(this.item_el).find("button").attr("disabled", "disabled"), this.pub_status.code == 4 ? e.set_success() : ($(this.item_el).find("[data-role='pub-op']").text(this.pub_status.message), e.container.el.dispatchEvent(r.getEvent("kz-coupon-pub-not-available")))) : s(this.pub_data._id, function (t) {
                    e.pub_status = t, t.success == 0 && ($(e.item_el).find("button").attr("disabled", "disabled"), e.pub_status.code == 4 ? e.set_success() : (e.container.el.dispatchEvent(r.getEvent("kz-coupon-pub-not-available")), $(e.item_el).find("[data-role='pub-op']").text(e.pub_status.message)))
                }))
            }
        })
    }), n("components/js", ["components/base", "utils"], function (e, t) {
        var n = function (e, n) {
            try {
                var r = new Function("container", "utils", e);
                return r(n, t)
            } catch (i) {
                alert("编写代码有语法错误:" + i.message), console.error(e)
            }
        };
        return e.extend({
            title: "JS组件",
            icon: "http://pic.kuaizhan.com/g1/M00/1A/0B/CgpQU1VMc26AQm2PAAAMsOmKhSs9494481",
            type: "js",
            meta_config: {
                code: {
                    type: "JsCode",
                    "default": "\r\nreturn {                       \r\n    //输出的内容                         \r\n    render:function(args,is_editing){                       \r\n        this.item_el.innerHTML='<div>JS组件</div>'        \r\n    },                                        \r\n      //绑定事件，一般为点击或者在元素上滑动等       \r\n    bindEvents:function(){                    \r\n        this.item_el.onclick=function(){      \r\n            alert(\"这里是自定义的点击事件\")    \r\n        }                                     \r\n    },                                        \r\n    //在清理动画前执行(如果用户跳过动画滑动，将执行,用于清理自定义的资源) \r\n    beforeClearAnima:function(){},            \r\n    //删除元素前执行                            \r\n    beforeDelete:function(){                  \r\n                                              \r\n    },                                        \r\n    //执行动画播放前                                          \r\n    beforePlayAnima:function(){               \r\n                                              \r\n    },                                        \r\n    //彻底清除资源                             \r\n    beforeDestroy:function(){                 \r\n    }                                         \r\n} "
                }
            },
            defaultStyle: {
                width: "200",
                height: "100",
                "background-color": "rgba(255,255,255,0)",
                "border-radius": "5",
                "border-color": "rgba(255,255,255,0)",
                "border-width": "1px",
                "border-style": "none"
            },
            render: function (e) {
                var t = e.code;
                try {
                    this.component = n(t, this)
                } catch (r) {
                    alert("JS组件代码错误:" + JSON.stringify(r)), console.error(r)
                }
                try {
                    this.component && this.component.render.apply(this, arguments)
                } catch (r) {
                    alert("JS组件代码错误:" + JSON.stringify(r)), console.error(r)
                }
                return this
            },
            config_tips: "JS 组件面向开发者提供,<a href='https://coding.net/u/chongzi/p/kzpage_js_lib/git' target='_blank'>详细帮助</a>",
            bindEvents: function () {
                try {
                    this.component && this.component.bindEvents && this.component.bindEvents.apply(this, arguments)
                } catch (e) {
                    alert("JS组件代码错误:" + JSON.stringify(e)), console.error(e)
                }
            },
            beforeClearAnima: function () {
                try {
                    this.component && this.component.beforeClearAnima && this.component.beforeClearAnima.apply(this, arguments)
                } catch (e) {
                    alert("JS组件代码错误:" + JSON.stringify(e)), console.error(e)
                }
            },
            beforeDelete: function () {
                try {
                    this.component && this.component.beforeDelete && this.component.beforeDelete.apply(this, arguments)
                } catch (e) {
                    alert("JS组件代码错误:" + JSON.stringify(e)), console.error(e)
                }
            },
            beforePlayAnima: function () {
                try {
                    this.component && this.component.beforePlayAnima && this.component.beforePlayAnima.apply(this, arguments)
                } catch (e) {
                    alert("JS组件代码错误:" + JSON.stringify(e)), console.error(e)
                }
            },
            beforeDestroy: function () {
                try {
                    this.component && this.component.beforeDestroy && this.component.beforeDestroy.apply(this, arguments)
                } catch (e) {
                    alert("JS组件代码错误:" + JSON.stringify(e)), console.error(e)
                }
            }
        })
    }), n("components/like", ["components/base", "lengthPrefix", "ajax", "global", "customEvents"], function (e, t, n, r, i) {
        return e.extend({
            title: "点赞",
            icon: "http://pic.kuaizhan.com/g1/M00/9B/63/wKjmqVc67bWANyr1AAAC9FqE6G48200852",
            type: "like",
            events: ["kz-like-submit-success"],
            style_meta_config: {
                layout: {
                    label: "样式",
                    type: "Options",
                    options: [{value: "landscape", text: "横向"}, {value: "transverse", text: "纵向"}],
                    "default": "landscape"
                }, btn_color: {label: "颜色", type: "Color", "default": "rgba(255,151,161,1.00)"}
            },
            defaultStyle: {
                width: 80,
                height: 30,
                "background-color": "rgba(255,255,255,0.5)",
                "border-radius": "10",
                "border-color": "rgba(255,255,255,1.00)",
                "border-width": "2px",
                "border-style": "none",
                opacity: "1",
                transform: "rotate(0deg)",
                "text-shadow": "0px 0px 0px rgba(1,1,1,0.40)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                "padding-top": "0",
                "padding-left": "0",
                "padding-right": "0",
                "padding-bottom": "0"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "text-shadow-color": "rgba(1,1,1,0.40)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {border: "none", padding: "none", color: "none", textShadow: "none"},
            render: function (e, t) {
                var n = this;
                return this.btn_color = e.btn_color, this.inner_el || (this.inner_el = document.createElement("div"), this.item_el.appendChild(this.inner_el), this.inner_el.innerHTML = "<span class='like-ico'></span><span data-role='like-count' class='like-count'>0</span>", !t && !r.is_editing_page && (n.uvSum = 0, $.ajax({
                    url: "/fa/page/front-api/like-count?site_id=" + SOHUZ.page.site_id + "&page_id=" + this.container.scene.page.page_id,
                    method: "GET",
                    success: function (e) {
                        e.uvSum && (n.uvSum = e.uvSum, $(n.inner_el).find("[data-role='like-count']").text(e.uvSum)), n.data = e
                    },
                    error: function (e) {
                        console.warn(e)
                    }
                }))), $(this.inner_el).attr("data-role", "like-btn").attr("class", e.layout), t && ($(this.inner_el).addClass("liked").find(".like-ico").css("background", n.btn_color), $(this.inner_el).addClass("liked").find("[data-role='like-count']").css("color", n.btn_color)), this
            },
            bindEvents: function () {
                var e = this, t = function (t) {
                    $(e.inner_el).addClass("liked").find("[data-role='like-count']").css("color", e.btn_color).text(e.uvSum + 1), $(e.inner_el).addClass("liked").find(".like-ico").css("background", e.btn_color);
                    var n = new Image;
                    n.src = "http://pv.kuaizhan.com/newInc?traceId=haibao&traceKey=like_" + e.container.scene.page.page_id, setTimeout(function () {
                        e.container.el.dispatchEvent(i.getEvent("kz-like-submit-success"))
                    }, 500)
                };
                r.is_editing_page || $(this.inner_el).one("click", t)
            }
        })
    }), n("components/view_count", ["components/base", "lengthPrefix", "ajax", "global", "customEvents"], function (e, t, n, r, i) {
        return e.extend({
            title: "浏览量",
            icon: "http://pic.kuaizhan.com/g1/M01/9B/DE/CgpQU1c8JkKAYt8tAAADJJRxdeY5391921",
            type: "view_count",
            style_meta_config: {
                layout: {
                    label: "样式",
                    type: "Options",
                    options: [{value: "landscape", text: "横向"}, {value: "transverse", text: "纵向"}],
                    "default": "landscape"
                }, btn_color: {label: "颜色", type: "Color", "default": "rgba(136,136,136,1.00)"}
            },
            defaultStyle: {
                width: 80,
                height: 30,
                "background-color": "rgba(255,255,255,0.5)",
                "border-radius": "10",
                "border-color": "rgba(255,255,255,1.00)",
                "border-width": "2px",
                "border-style": "none",
                opacity: "1",
                transform: "rotate(0deg)",
                "text-shadow": "0px 0px 0px rgba(1,1,1,0.40)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                "padding-top": "0",
                "padding-left": "0",
                "padding-right": "0",
                "padding-bottom": "0"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "text-shadow-color": "rgba(1,1,1,0.40)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {border: "none", padding: "none", color: "none", textShadow: "none"},
            render: function (e, t) {
                var n = this;
                this.btn_color = e.btn_color;
                if (!this.inner_el) {
                    this.inner_el = document.createElement("div"), this.item_el.appendChild(this.inner_el), this.inner_el.innerHTML = "<span class='view-ico'></span><span data-role='view-count' class='view-count'>0</span>";
                    if (!t && !r.is_editing_page) {
                        n.uvSum = 0;
                        var i = this.container.scene.page.page_id;
                        $.ajax({
                            url: "/fa/page/front-api/view-count?site_id=" + SOHUZ.page.site_id + "&page_id=" + i,
                            method: "GET",
                            success: function (e) {
                                e[i] && $(n.inner_el).find("[data-role='view-count']").text(e[i])
                            },
                            error: function (e) {
                                console.warn(e)
                            }
                        })
                    }
                }
                return $(this.inner_el).attr("data-role", "view-btn").attr("class", e.layout), $(this.inner_el).find(".view-ico").css("background", n.btn_color), $(this.inner_el).find("[data-role='view-count']").css("color", n.btn_color), this
            },
            bindEvents: function () {
            }
        })
    }), n("components/counter", ["components/base", "customEvents"], function (e, t) {
        return e.extend({
            title: "计数器",
            icon: "http://pic.kuaizhan.com/g2/M00/A3/59/wKjmqldGoFWAbuf5AAABWY3sCck6148180",
            type: "counter",
            events: ["kz-counter-change"],
            defaultStyle: {
                width: 107,
                height: 32,
                "background-color": "rgba(255,255,255,0)",
                "border-radius": "2",
                "border-color": "rgba(255,255,255,1.00)",
                "border-width": "2px",
                "border-style": "none",
                opacity: "1",
                transform: "rotate(0deg)",
                "text-shadow": "0px 0px 0px rgba(1,1,1,0.40)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                "padding-top": "5",
                "padding-left": "5",
                "padding-right": "5",
                "padding-bottom": "5"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "text-shadow-color": "rgba(1,1,1,0.40)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {},
            render: function (e) {
                return this.counter = 0, this.item_el.innerHTML = this.counter, this
            },
            set_counter: function (e) {
                var n = parseInt(e);
                if (isNaN(n))return;
                if (n === this.counter)return;
                this.counter = n, this.item_el.innerHTML = this.counter, this.play_item.el.dispatchEvent(t.getEvent("kz-counter-change", {counter: this.counter}))
            },
            get_counter: function () {
                return this.counter || 0
            },
            beforePlayAnima: function () {
            },
            beforeClearAnima: function () {
            },
            afterPlayAnima: function () {
            }
        })
    }), n("components/timer", ["components/base", "customEvents"], function (e, t) {
        return e.extend({
            title: "定时器",
            icon: "http://pic.kuaizhan.com/g2/M00/AC/44/wKjmqldP9r6AHmDVAAADQ6hvILc8849686",
            type: "timer",
            events: ["kz-timer-trigger"],
            config_tips: "定时器用户交互控制,在发布后将不会在页面有显示.",
            disable_style_cfg: !0,
            disable_anima_cfg: !0,
            disable_sound_cfg: !0,
            meta_config: {
                time_span: {
                    label: "时间",
                    type: "Number",
                    "default": "1",
                    template: "间隔 <span><%=html%></span> 秒执行一次",
                    max: 300,
                    min: .1,
                    step: .1
                },
                is_loop: {
                    label: "循环",
                    type: "Options",
                    options: [{value: "", text: "只执行一次"}, {value: "loop", text: "循环执行"}],
                    "default": ""
                }
            },
            defaultStyle: {
                width: 60,
                height: 60,
                "background-color": "rgba(255,255,255,0)",
                "border-radius": "2",
                "border-color": "rgba(255,255,255,1.00)",
                "border-width": "2px",
                "border-style": "none",
                opacity: "1",
                transform: "rotate(0deg)",
                "text-shadow": "0px 0px 0px rgba(1,1,1,0.40)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                "padding-top": "5",
                "padding-left": "5",
                "padding-right": "5",
                "padding-bottom": "5"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "text-shadow-color": "rgba(1,1,1,0.40)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135",
                hide: "true"
            },
            style_config: {
                color: "none",
                bgColor: "none",
                opacity: "none",
                border: "none",
                textShadow: "none",
                boxShadow: "none",
                padding: "none"
            },
            render: function (e, t) {
                return this.counter = 0, t && (this.item_el.innerHTML = "<img src='http://pic.kuaizhan.com/g2/M00/AC/44/wKjmqldP9r6AHmDVAAADQ6hvILc8849686' style='position: absolute;top: 50%;left: 50%;-webkit-transform: translateX(-50%) translateY(-50%);transform: translateX(-50%) translateY(-50%);'>"), this.time_span = parseFloat(e.time_span * 1e3) || 1e3, this.loop = e.is_loop == "loop", this
            },
            enable_timer: function () {
                this.disabled = !1
            },
            disable_timer: function () {
                this.disabled = !0
            },
            beforePlayAnima: function () {
                this._make_timer()
            },
            _make_timer: function () {
                var e = this;
                this.timer = setTimeout(function () {
                    e.disabled || e.play_item.el.dispatchEvent(t.getEvent("kz-timer-trigger", {})), e.loop && e._make_timer()
                }, this.time_span)
            },
            beforeClearAnima: function () {
                this.timer && clearTimeout(this.timer)
            },
            afterPlayAnima: function () {
            }
        })
    }), n("tools/comment_viewer", ["utils"], function (e) {
        return {
            init: function (t, n) {
                var r = this;
                r.$el = t, this.page = 1, this.loaded = !1, this.loading = !1, r.component = n.component, this.data = n.init_data, t.html("<ul data-kzplayer='comment'></ul><div data-kzplayer='comment-input'><textarea></textarea><button data-role='submit-comment' class='disable'>提交</button></div>"), t.find("[data-kzplayer='comment']").html(this.build_html(this.data.results.list)), this.load_user_info(), t.find("[data-kzplayer='comment']").on("scroll", function (e) {
                    e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight && r.read_more()
                }), t.delegate("[data-role='like']:not(.liked)", "click", function (e) {
                    $(this).addClass("liked");
                    var t = $(this).data("id");
                    $(this).text(parseInt($(this).text()) + 1);
                    if (!t)return;
                    $.ajax({
                        url: "/fa/page/front-api/page/comments/like/" + t + "?site_id=" + SOHUZ.page.site_id,
                        type: "POST",
                        success: function (e) {
                        },
                        error: function (e) {
                            alert("提交失败")
                        }
                    })
                }), t.find("textarea").on("focus", function () {
                    r.$el.find('[data-kzplayer="comment-input"]').addClass("focus"), setTimeout(function () {
                        document.body.scrollTop = 1e3, console.log("focus")
                    }, 100)
                }), t.find("textarea").on("keyup", function () {
                    this.value.replace(/^\s+|\s+$/ig, "") == "" ? t.find("button").addClass("disable") : t.find("button").removeClass("disable")
                }), t.find("textarea").on("blur", function () {
                    setTimeout(function () {
                        r.$el.find('[data-kzplayer="comment-input"]').removeClass("focus")
                    }, 200)
                }), t.find("button").on("click", function () {
                    var n = t.find("textarea").val();
                    if (n.replace(/^\s+|\s+$/ig, "") == "")return;
                    t.find("textarea").val(""), $.ajax({
                        url: "/fa/page/front-api/page/comments/" + r.component.container.scene.page.page_id + "?site_id=" + SOHUZ.page.site_id,
                        type: "POST",
                        data: {comment: n},
                        success: function (i) {
                            if (i.success == 0) {
                                alert(i.error.message || "留言提交失败");
                                return
                            }
                            e.login(function (e) {
                                var i = {
                                    content: n,
                                    c_time: new Date,
                                    nick: e.nick || "",
                                    head: e.avatar && e.avatar.tiny || "",
                                    user_id: e._id
                                };
                                r.data.results.list.splice(0, 0, i), t.find("[data-kzplayer='comment']").prepend(r.build_html([i]))[0].scrollTop = 0
                            })
                        },
                        error: function (e) {
                            alert("留言提交失败")
                        }
                    })
                })
            }, read_more: function () {
                var e = this;
                this.page++;
                if (this.loading || this.loaded)return;
                this.loading = !0, $.ajax({
                    url: "/fa/page/front-api/page/comments/" + e.component.container.scene.page.page_id + "?site_id=" + SOHUZ.page.site_id,
                    type: "GET",
                    data: {page_size: 20, page: this.page},
                    success: function (t) {
                        e.loading = !1, t.results && (e.total = t.results.total, e.$el.find("[data-kzplayer='comment']").append(e.build_html(t.results.list)), t.results.list.length < 20 && (e.loaded = !0), e.load_user_info())
                    },
                    error: function (t) {
                        e.loading = !1, console.warn(t)
                    }
                })
            }, build_html: function (t) {
                if (t) {
                    var n = "";
                    t.forEach(function (t) {
                        n += "<li><div class='head-pic'>", t.head ? n += "<img src='" + t.head + "'/>" : n += "<span data-uid='" + t.user_id + "' data-role='head-placeholder'></span>", n += "</div><div class='right-content'><p class='nick'>", t.nick ? n += e.escape(t.nick) : n += "<span data-uid='" + t.user_id + "' data-role='nick-placeholder'></span>", n += "</p><p class='c-time'>" + e.format_time(t.c_time) + "</p><p data-role='like' data-id='" + t._id + "' class='like'>" + (t.liked || 0) + "</p><p class='content'>" + e.escape(t.content.substring(0, 50)) + "</p></div></li>"
                    })
                }
                return n
            }, load_user_info: function () {
                var e = this, t = [];
                this.$el.find("[data-uid]").each(function () {
                    var e = $(this).data("uid");
                    t.indexOf(e) < 0 && t.push(e)
                }), t.length > 0 && $.ajax({
                    url: "/fa/page/front-api/user-info?site_id=" + SOHUZ.page.site_id,
                    type: "POST",
                    data: {user_ids: JSON.stringify(t)},
                    success: function (t) {
                        console.log(t), t && e.$el.find("[data-uid]").each(function () {
                            var e = $(this).data("uid");
                            t[e] && ($(this).data("role") == "nick-placeholder" ? $(this).replaceWith("<span>" + t[e].nick + "</span>") : $(this).data("role") == "head-placeholder" && $(this).replaceWith("<img src='" + t[e].avatar.tiny + "'/>"))
                        })
                    },
                    error: function (e) {
                    }
                })
            }
        }
    }), n("components/comment", ["components/base", "lengthPrefix", "utils", "global", "tools/comment_viewer"], function (e, t, n, r, i) {
        return e.extend({
            title: "评论",
            icon: "http://pic.kuaizhan.com/g2/M01/C4/DD/wKjmqldibo-ACCfLAAABZXeHHCU2131764",
            type: "comment",
            events: [],
            defaultStyle: {
                width: 40,
                height: 40,
                "background-color": "rgba(255,255,255,0)",
                "border-radius": "0",
                "border-color": "rgba(255,255,255,1.00)",
                "border-width": "2px",
                "border-style": "none",
                opacity: "1",
                transform: "rotate(0deg)",
                "text-shadow": "0px 0px 0px rgba(1,1,1,0.40)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                "padding-top": "0",
                "padding-left": "0",
                "padding-right": "0",
                "padding-bottom": "0"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "text-shadow-color": "rgba(1,1,1,0.40)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0.20)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            style_config: {color: "none", textShadow: "none"},
            render: function (e, t) {
                var n = this;
                return this.btn_color = e.btn_color, this.item_el.innerHTML = "<span class='comment-ico'></span><span data-role='total-count' class='total-count'>0</span>", !t && !r.is_editing_page && (n.uvSum = 0, $.ajax({
                    url: "/fa/page/front-api/page/comments/" + this.container.scene.page.page_id + "?site_id=" + SOHUZ.page.site_id,
                    type: "GET",
                    data: {page_size: 20},
                    success: function (e) {
                        e.results && (n.total = e.results.total, $(n.item_el).find("[data-role='total-count']").text(n.total)), n.data = e
                    },
                    error: function (e) {
                        console.warn(e)
                    }
                })), this
            },
            bindEvents: function () {
                var e = this, t = function (t) {
                    var n = e.play_item.scene.page.player.openHelperLayer("评论");
                    $(n).addClass("comment").on("kz-helper-dev-close", function () {
                        $(e.play_item.scene.page.container_el).removeClass("blur")
                    }), $(e.play_item.scene.page.container_el).addClass("blur"), i.init($(n).find('[data-kzplayer="helper-content"]'), {
                        component: e,
                        init_data: e.data,
                        page_id: e.container.scene.page.page_id
                    })
                };
                r.is_editing_page || (n.login(function (e) {
                }), $(this.item_el).on("click", t))
            }
        })
    }), n("components/imageUpload", ["components/base", "utils", "global", "tools/jic", "customEvents"], function (e, t, n, r, i) {
        return e.extend({
            title: "图片上传",
            icon: "http://pic.kuaizhan.com/g2/M01/D6/CC/CgpQVFdx2yCAViZBAAAB2HJ1hEA6879351",
            events: ["kz-image-upload-success", "kz-image-upload-failed"],
            type: "imgUpload",
            meta_config: {
                label: {label: "名称", type: "String", "default": "上传图"},
                image: {label: "默认图", type: "Image", "default": ""},
                required: {label: "必填项", type: "Checkbox", "default": "true", text: "必填"}
            },
            config_tips: "请配合提交按钮提交输入框内容, &nbsp;&nbsp;<a target='_blank' style='color:#fff;' href='/form/manage?site_id=" + t.getSiteId() + "'>查看数据</a>",
            defaultStyle: {
                "background-color": "#F7F7F7",
                "border-color": "rgba(255,255,255,1.00)",
                "border-radius": 0,
                "border-style": "none",
                "border-width": "4px",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0.20)",
                height: 100,
                opacity: "1",
                padding: 0,
                transform: "rotate(0deg)",
                width: 100
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "4",
                "box-shadow-color": "rgba(0,0,0,.8)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-degree": "0"
            },
            style_config: {color: "none", textShadow: "none", padding: "none"},
            render: function (e) {
                this.imgDefault = t.escape(e.image);
                var n = e["required"] == "true";
                return this.item_el.innerHTML = "<input type='file' data-role='imgUpload' accept='image/*'/><div data-role='img-wrapper'><img name='imgHolder' src='" + t.escape(this.imgDefault) + "'/></div>" + "<span class='imgUploadIcon imgToUpload'></span>" + "<input type='hidden' " + (n ? "required='required'" : "") + " data-role='form-item' data-title='" + t.escape(e.label).replace(/\'/g, "\\'") + "'/>", this
            },
            bindEvents: function () {
                function o(t) {
                    $(n.item_el).find(".imgUploadIcon").removeClass("imgUploading").addClass("imgUploaded");
                    var r = JSON.parse(t).data;
                    $(n.item_el).find("img[name='imgHolder']").attr("src", r), $(n.item_el).find("input[data-role='form-item']").val(r), n.container.el.dispatchEvent(i.getEvent("kz-image-upload-success")), e.val(""), e.css("display", "block")
                }

                function u() {
                    s ? $(n.item_el).find(".imgUploadIcon").removeClass("imgUploading").addClass("imgUploaded") : $(n.item_el).find(".imgUploadIcon").removeClass("imgUploading").addClass("imgToUpload"), n.container.el.dispatchEvent(i.getEvent("kz-image-upload-failed")), alert("错误, 请重试"), e.val(""), e.css("display", "block")
                }

                function a(i) {
                    t.login(), e.css("display", "none");
                    var s = i.target.files[0];
                    if (!s)return;
                    if (!s.type.match("image.*")) {
                        alert("请上传图片格式的文件");
                        return
                    }
                    $(n.item_el).find(".imgUploadIcon").removeClass("imgToUpload").removeClass("imgUploaded").addClass("imgUploading"), i.stopPropagation();
                    var a = new FileReader;
                    a.onload = function (e) {
                        var t = document.createElement("img");
                        t.src = e.target.result, t.onload = function () {
                            var e = 80, n = "jpeg";
                            s.name.substr(-4) == ".png" && (n = "png");
                            var i = r.compress(t, e, n, 640), a = "/club/apiv1/me/b64-upload";
                            r.upload(i, a, s.name, o, u)
                        }
                    }, a.readAsDataURL(s)
                }

                var e = $(this.item_el).find("input[data-role='imgUpload']"), n = this, s = !1;
                this.play_item.scene && this.play_item.scene.page && $(this.play_item.scene.page.container_el).on("kz-form-submit-success", function () {
                    $(n.item_el).find("img[name='imgHolder']").attr("src", n.imgDefault), $(n.item_el).find(".imgUploadIcon").removeClass("imgUploaded").addClass("imgToUpload")
                }), e.change(a)
            }
        })
    }), n("components/signin", ["components/base", "utils", "customEvents", "global"], function (e, t, n, r) {
        return e.extend({
            title: "签到",
            icon: "http://pic.kuaizhan.com/g1/M00/F3/B2/wKjmqVd99lWAOGQjAAACMfXKx4g7453214",
            type: "signin",
            events: ["kz-signin-success"],
            defaultStyle: {
                width: "100px",
                height: "50px",
                "background-color": "#c8c8c8",
                color: "#ffffff",
                transform: "rotate(0deg)",
                "text-shadow": "0px 0px rgba(1,1,1,0)",
                "box-shadow": "0px 0px 0px 0px rgba(1,1,1,0)",
                padding: "0"
            },
            _defaultStyle: {
                "transform-rotate": "0",
                "border-width": "2",
                "text-shadow-color": "rgba(1,1,1,0)",
                "text-shadow-width": "0",
                "text-shadow-blur": "0",
                "text-shadow-degree": "135",
                "box-shadow-color": "rgba(1,1,1,0)",
                "box-shadow-width": "0",
                "box-shadow-blur": "0",
                "box-shadow-size": "0",
                "box-shadow-degree": "135"
            },
            render: function (e, n) {
                var i = this;
                return this.no_sign_event = !1, r.is_editing_page ? i.item_el.innerHTML = "<input type='button' value='签到' style='font-size: inherit'/>" : t.login(function (e) {
                    $.ajax({
                        method: "GET",
                        url: "/club/apiv1/score/" + t.getSiteId() + "/sign/status",
                        success: function (e) {
                            !e.has_sign_activity || !e.sign_plugin_opened ? (i.item_el.innerHTML = "<input type='button' value='签到未开启' style='font-size: inherit'/>", i.no_sign_event = !0) : e.has_signed ? i.item_el.innerHTML = "<input type='button' value='已签到' style='font-size: inherit'/>" : i.item_el.innerHTML = "<input type='button' value='签到' style='font-size: inherit'/>"
                        },
                        error: function (e) {
                            alert(e)
                        }
                    })
                }), this
            },
            bindEvents: function () {
                function i(t) {
                    $(e.item_el).find("input[type='button']").val("已签到"), e.container.el.dispatchEvent(n.getEvent("kz-signin-success")), t.msg == "success" ? setTimeout(function () {
                        alert("签到成功, 获得" + t.data.change + "积分!")
                    }, 0) : setTimeout(function () {
                        alert(t.msg)
                    }, 0)
                }

                function s(e) {
                    var t = JSON.parse(e.responseText);
                    t.msg == "次数达到上限" ? alert("今日已签到") : alert(t.msg)
                }

                var e = this;
                r.is_editing_page ? $(this.item_el).off("click").click(function () {
                    alert("请在发布后的页面中使用此功能")
                }) : $(this.item_el).off("click").click(function () {
                    if (e.no_sign_event)return;
                    t.login(function (e) {
                        $.ajax({
                            type: "POST",
                            url: "/club/apiv1/score/score_signal?site_id=" + t.getSiteId(),
                            data: {module: "sign", action_id: 1, user_id: e._id},
                            success: i,
                            error: s
                        })
                    })
                })
            }
        })
    }), n("components/chart", ["components/base"], function (e) {
        return e.extend({
            title: "图表",
            type: "chart",
            meta_config: {
                chartSelector: {label: "图表类型", type: "ChartSelector", "default": "bar"},
                title: {label: "标题名", type: "String", "default": "图表"},
                show_title: {label: "显示项", type: "Checkbox", "default": "true", text: "标题"},
                show_legend: {label: " ", type: "Checkbox", "default": "true", text: "图例"},
                show_label: {label: " ", type: "Checkbox", "default": "true", text: "数据标签"},
                animation: {type: "Checkbox", "default": "false", text: "动画效果", "control-visible": ["duration"]},
                duration: {
                    label: "持续时间",
                    type: "Number",
                    "default": "1",
                    template: "<span><%=html%></span> 秒",
                    max: 5,
                    min: 0,
                    step: .1
                },
                spreadsheet: {
                    label: "表单数据",
                    type: "Spreadsheet",
                    "default": JSON.stringify({
                        val: [["", "项目A", "项目B"], ["数据1", "70", "40"], ["数据2", "50", "60"]],
                        color: ["rgba(1,143,243,1)", "rgba(1,195,243,1)"],
                        img: ""
                    })
                }
            },
            icon: "http://pic.kuaizhan.com/g1/M00/C7/FC/wKjmqVeWxBOAQau0AAALNpHZz7M705.png",
            defaultStyle: {
                background: "transparent",
                border: "none",
                "box-shadow": "0px",
                height: 320,
                width: 320,
                opacity: 1,
                padding: 0,
                transform: "rotate(0deg)"
            },
            _defaultStyle: {"transform-rotate": "0", "border-width": "4"},
            style_config: {border: "none", padding: "none", color: "none", textShadow: "none", boxShadow: "none"},
            render: function (e, n) {
                this.container_width = e.style.width, this.container_height = e.style.height;
                if (!n && e.animation != "true") {
                    $(this.item_el).html("<img style='width:100%;height:100%;' src='" + JSON.parse(e.spreadsheet).img + "'/>");
                    return
                }
                var r = {
                    title: {show: e.show_title == "true", left: "center", text: e.title},
                    grid: {right: 0, top: 40, bottom: "25%"},
                    animation: e.animation == "true",
                    animationDuration: parseFloat(e.duration) * 1e3,
                    animationDurationUpdate: parseFloat(e.duration) * 1e3
                }, i = [], s = [], o = [], u = JSON.parse(e.spreadsheet);
                if (e.chartSelector != "pie") u.val.forEach(function (t, n) {
                    if (n == 0) t.forEach(function (e, t) {
                        t != 0 && s.push(e)
                    }); else {
                        var r, a = [];
                        t.forEach(function (e, t) {
                            t == 0 ? r = e : a.push(e)
                        }), i.push(r), o.push({
                            name: r,
                            type: e.chartSelector,
                            data: a,
                            label: {normal: {show: e.show_label == "true", position: "top"}},
                            itemStyle: {normal: {color: u.color[n - 1]}}
                        })
                    }
                }); else {
                    var a = [], f = u.val;
                    for (var l = 1; l < f.length; l++)i.push(f[l][0]), a.push({
                        value: +f[l][1] <= 0 || isNaN(+f[l][1]) ? 0 : f[l][1],
                        name: f[l][0],
                        itemStyle: {normal: {color: u.color[l - 1]}}
                    });
                    o.push({
                        name: e.title,
                        type: "pie",
                        data: a,
                        label: {normal: {show: e.show_label == "true", position: "inside"}}
                    })
                }
                r.legend = {
                    show: e.show_legend == "true",
                    data: i,
                    bottom: 0
                }, s.length > 0 ? (r.xAxis = {data: s}, r.yAxis = {}) : (r.xAxis = null, r.yAxis = null), r.series = o;
                if (!n) {
                    this.chart_option = r;
                    return
                }
                if (n) {
                    var c = this;
                    t(["echarts.common.min"], function (t) {
                        var n = $(c.item_el).width(), i = $(c.item_el).height();
                        if (n == 0 || i == 0)return;
                        c.oldWidth || (c.oldWidth = n), c.oldHeight || (c.oldHeight = i);
                        var s = document.createElement("div");
                        $(s).addClass("chart_container"), $(c.item_el).append(s), c.myChart || (c.myChart = t.init(s));
                        var o = JSON.parse(e.spreadsheet);
                        if (c.oldWidth != n || c.oldHeight != i) {
                            c.oldWidth = n, c.oldHeight = i, c.myChart.resize(), e.animation != "true" ? o.img = c.myChart.getDataURL() : o.img = "", e.spreadsheet = JSON.stringify(o);
                            return
                        }
                        c.myChart.setOption(r, !0), e.animation != "true" ? o.img = c.myChart.getDataURL() : o.img = "", e.spreadsheet = JSON.stringify(o)
                    })
                }
            },
            bindEvents: function () {
            },
            beforePlayAnima: function () {
                if (this.chart_option && this.chart_option.animation) {
                    var e = this, n = document.createElement("div");
                    $(n).addClass("chart_container").width(this.container_width).height(this.container_height), $(e.item_el).append(n), t(["echarts.common.min"], function (t) {
                        t.init(n).setOption(e.chart_option, !0)
                    })
                }
            }
        })
    }), n("contentFactory", ["components/image", "components/groupImage", "components/text", "components/background", "components/colorText", "components/kz_video", "components/video", "components/textInput", "components/button", "components/map", "components/telButton", "components/fingerScan", "components/image360", "components/gif_video", "components/coupon_pub", "components/js", "components/like", "components/view_count", "components/counter", "components/timer", "components/comment", "components/imageUpload", "components/signin", "components/chart"], function () {
        var e = {};
        for (var t in arguments) {
            var n = arguments[t], r = new n;
            r._base = n, e[r.type] = r
        }
        var i = function (t) {
            if (e[t]) {
                var n = new e[t]._base;
                return n._base = e[t]._base, n
            }
        };
        return i.find = function (t) {
            return $.extend(!0, {}, e[t])
        }, i.all = function () {
            return $.extend(!0, {}, e)
        }, i
    }), n("animaLib", ["customEvents", "utils"], function (e, t) {
        var n = function (n, r, i, s) {
            var o = r.start_time || 0, u = {
                run: function () {
                    var a = this;
                    this.timer = setTimeout(function () {
                        var o = i.indexOf("In") > 0 ? "" : i.indexOf("Out") > 0 ? "opacity_none" : "";
                        t.setStyle(n, "animation-duration", (r.duration || "100") + "ms"), t.setStyle(n, "animation-delay", (r.delay || "0") + "ms"), n.removeAttribute("opacity_none"), s.removeAttribute("opacity_none");
                        var f = [];
                        (n.getAttribute("class") || "").split(" ").forEach(function (e) {
                            e.indexOf("ui-") == 0 && f.push(e)
                        }), n.setAttribute("class", f.join(" ") + " animated " + i + " " + (r.infinite ? "infinite" : "")), o && setTimeout(function () {
                            n.setAttribute("opacity_none", "opacity_none"), s.setAttribute("opacity_none", "opacity_none")
                        }, (r.delay || 0) + (r.duration || 100)), setTimeout(function () {
                            a.timer && (n.dispatchEvent(e.getEvent("kz-animationend")), a.timer = null, clearTimeout(a.timer), u = undefined)
                        }, (r.delay || 0) + (r.duration || 100))
                    }, o)
                }, clear: function () {
                    clearTimeout(this.timer), this.timer = null
                }
            };
            return u
        }, r = {
            flash: function (e, t, r) {
                return n(e, t, "flash", r)
            }, tada: function (e, t, r) {
                return n(e, t, "tada", r)
            }, bounce: function (e, t, r) {
                return n(e, t, "bounce", r)
            }, pulse: function (e, t, r) {
                return n(e, t, "pulse", r)
            }, rubberBand: function (e, t, r) {
                return n(e, t, "rubberBand", r)
            }, shake: function (e, t, r) {
                return n(e, t, "shake", r)
            }, swing: function (e, t, r) {
                return n(e, t, "swing", r)
            }, wobble: function (e, t, r) {
                return n(e, t, "wobble", r)
            }, bounceIn: function (e, t, r) {
                return n(e, t, "bounceIn", r)
            }, bounceInDown: function (e, t, r) {
                return n(e, t, "bounceInDown", r)
            }, bounceInLeft: function (e, t, r) {
                return n(e, t, "bounceInLeft", r)
            }, bounceInRight: function (e, t, r) {
                return n(e, t, "bounceInRight", r)
            }, bounceInUp: function (e, t, r) {
                return n(e, t, "bounceInUp", r)
            }, bounceOut: function (e, t, r) {
                return n(e, t, "bounceOut", r)
            }, bounceOutDown: function (e, t, r) {
                return n(e, t, "bounceOutDown", r)
            }, bounceOutUp: function (e, t, r) {
                return n(e, t, "bounceOutUp", r)
            }, bounceOutLeft: function (e, t, r) {
                return n(e, t, "bounceOutLeft", r)
            }, bounceOutRight: function (e, t, r) {
                return n(e, t, "bounceOutRight", r)
            }, fadeIn: function (e, t, r) {
                return n(e, t, "fadeIn", r)
            }, fadeInDown: function (e, t, r) {
                return n(e, t, "fadeInDown", r)
            }, fadeInDownBig: function (e, t, r) {
                return n(e, t, "fadeInDownBig", r)
            }, fadeInLeft: function (e, t, r) {
                return n(e, t, "fadeInLeft", r)
            }, fadeInLeftBig: function (e, t, r) {
                return n(e, t, "fadeInLeftBig", r)
            }, fadeInRight: function (e, t, r) {
                return n(e, t, "fadeInRight", r)
            }, fadeInRightBig: function (e, t, r) {
                return n(e, t, "fadeInRightBig", r)
            }, fadeInUp: function (e, t, r) {
                return n(e, t, "fadeInUp", r)
            }, fadeInUpBig: function (e, t, r) {
                return n(e, t, "fadeInUpBig", r)
            }, fadeOut: function (e, t, r) {
                return n(e, t, "fadeOut", r)
            }, fadeOutDown: function (e, t, r) {
                return n(e, t, "fadeOutDown", r)
            }, fadeOutDownBig: function (e, t, r) {
                return n(e, t, "fadeOutDownBig", r)
            }, fadeOutLeft: function (e, t, r) {
                return n(e, t, "fadeOutLeft", r)
            }, fadeOutLeftBig: function (e, t) {
                return n(e, t, "fadeOutLeftBig", parent_el)
            }, fadeOutRight: function (e, t, r) {
                return n(e, t, "fadeOutRight", r)
            }, fadeOutRightBig: function (e, t, r) {
                return n(e, t, "fadeOutRightBig", r)
            }, fadeOutUp: function (e, t, r) {
                return n(e, t, "fadeOutUp", r)
            }, fadeOutUpBig: function (e, t, r) {
                return n(e, t, "fadeOutUpBig", r)
            }, flip: function (e, t, r) {
                return n(e, t, "flip", r)
            }, rotate: function (e, t, r) {
                return n(e, t, "rotate", r)
            }, flipInX: function (e, t, r) {
                return n(e, t, "flipInX", r)
            }, flipInY: function (e, t, r) {
                return n(e, t, "flipInY", r)
            }, flipOutX: function (e, t, r) {
                return n(e, t, "flipOutX", r)
            }, flipOutY: function (e, t, r) {
                return n(e, t, "flipOutY", r)
            }, lightSpeedIn: function (e, t, r) {
                return n(e, t, "lightSpeedIn", r)
            }, lightSpeedOut: function (e, t, r) {
                return n(e, t, "lightSpeedOut", r)
            }, rotateIn: function (e, t, r) {
                return n(e, t, "rotateIn", r)
            }, rotateInDownLeft: function (e, t, r) {
                return n(e, t, "rotateInDownLeft", r)
            }, rotateInDownRight: function (e, t, r) {
                return n(e, t, "rotateInDownRight", r)
            }, rotateInUpLeft: function (e, t, r) {
                return n(e, t, "rotateInUpLeft", r)
            }, rotateInUpRight: function (e, t, r) {
                return n(e, t, "rotateInUpRight", r)
            }, rotateOut: function (e, t, r) {
                return n(e, t, "rotateOut", r)
            }, rotateOutDownLeft: function (e, t, r) {
                return n(e, t, "rotateOutDownLeft", r)
            }, rotateOutDownRight: function (e, t, r) {
                return n(e, t, "rotateOutDownRight", r)
            }, rotateOutUpLeft: function (e, t, r) {
                return n(e, t, "rotateOutUpLeft", r)
            }, rotateOutUpRight: function (e, t, r) {
                return n(e, t, "rotateOutUpRight", r)
            }, hinge: function (e, t, r) {
                return n(e, t, "hinge", r)
            }, rollIn: function (e, t, r) {
                return n(e, t, "rollIn", r)
            }, rollOut: function (e, t, r) {
                return n(e, t, "rollOut", r)
            }, zoomIn: function (e, t, r) {
                return n(e, t, "zoomIn", r)
            }, zoomInDown: function (e, t, r) {
                return n(e, t, "zoomInDown", r)
            }, zoomInLeft: function (e, t, r) {
                return n(e, t, "zoomInLeft", r)
            }, zoomInRight: function (e, t, r) {
                return n(e, t, "zoomInRight", r)
            }, zoomInUp: function (e, t, r) {
                return n(e, t, "zoomInUp", r)
            }, zoomOut: function (e, t, r) {
                return n(e, t, "zoomOut", r)
            }, zoomOutDown: function (e, t, r) {
                return n(e, t, "zoomOutDown", r)
            }, zoomOutLeft: function (e, t, r) {
                return n(e, t, "zoomOutLeft", r)
            }, zoomOutRight: function (e, t, r) {
                return n(e, t, "zoomOutRight", r)
            }, zoomOutUp: function (e, t, r) {
                return n(e, t, "zoomOutUp", r)
            }
        };
        return r
    }), n("eventHandlerLib", ["utils", "customEvents", "global"], function (e, t, n) {
        var r = {
            hide: function (e, t, n) {
                n.items && n.items.forEach(function (e) {
                    var n = t.findItemById(e);
                    n && n.el.setAttribute("opacity_none", "opacity_none")
                })
            }, show: function (e, t, n) {
                n.items && n.items.forEach(function (e) {
                    var n = t.findItemById(e);
                    n && n.el.removeAttribute("opacity_none")
                })
            }, playAnima: function (e, t, n) {
                n.items && n.items.forEach(function (e) {
                    var n = t.findItemById(e);
                    if (!n)return;
                    n.initAnima(), setTimeout(function () {
                        n.playAnima(!1)
                    }, 500)
                })
            }, playVideo: function (e, t, n) {
                n.items && n.items.forEach(function (e) {
                    var n = t.findItemById(e);
                    if (!n || !n.content)return;
                    n.content.playVideo && n.content.playVideo()
                })
            }, playGifVideo: function (e, t, n) {
                n.items && n.items.forEach(function (e) {
                    var n = t.findItemById(e);
                    if (!n || !n.content)return;
                    n.content.playVideo && n.content.playVideo()
                })
            }, call_tel: function (e, t, n) {
                n && n.tel_number && window.open("tel:" + n.tel_number)
            }, jump: function (e, t, r) {
                if (!r || !r.link)return;
                typeof r.link == "string" && r.link;
                if (r.link_res_type === -1) t && t.page && t.page.jump(r.link); else if (r.page_open_type == "inner") {
                    var i = r.link;
                    i.indexOf("?") > 0 ? i += "&embed=true#mobile_view" : i += "?embed=true#mobile_view", t.page.player && t.page.player.openHelperLayer("<iframe src='" + i + "' style='height:100%;-webkit-overflow-scrolling:touch;overflow:scroll;width: 1px;min-width: calc(100%);' scrolling='" + (n.is_ios ? "no" : "auto") + "' frameborder='0'></iframe>")
                } else window.open(r.link)
            }, change_weixin_share_desc: function (e, t, n) {
                if (!window.wx || !n || !window.share_data)return;
                window.share_data.title = n.title, window.share_data.desc = n.desc, document.title = n.title || document.title
            }, set_counter: function (e, t, n) {
                if (!n || !n.item)return;
                var r = parseInt(n.value);
                if (isNaN(r))try {
                    r = JSON.parse(n.value)
                } catch (i) {
                    return
                } else r = {type: "static", number: r};
                var s = 0;
                r.type == "static" ? s = parseFloat(r.number) || 0 : r.type == "random" && (r.min = r.min < 0 ? 0 : r.min, s = Math.round(Math.random() * 1e5) % (r.max - r.min + 1) + r.min);
                var o = t.findItemById(n.item);
                if (!o || !o.content.set_counter)return;
                var u = o.content.get_counter();
                switch (n.operate) {
                    case"+=":
                        s = u + s;
                        break;
                    case"-=":
                        s = u - s;
                        break;
                    case"=":
                    default:
                        s = s
                }
                o.content.set_counter(s)
            }, change_style: function (n, r, i) {
                var s = i.duration || 0;
                if (!i || !i.style || !i.item)return;
                var o = i.style, u = r.findItemById(i.item);
                if (!u)return;
                o["z-index"] = u.el.style.getPropertyValue("z-index"), e.setStyle(u.el, "transition", "all " + s + "s"), e.setStyle(u.inner_el, "transition", "all " + s + "s"), e.setStyle(u.content_container, "transition", "all " + s + "s"), u.setStyle(o), setTimeout(function () {
                    u.el.dispatchEvent(t.getEvent("kz-animation-full-end"))
                }, (s || 0) * 1e3)
            }
        };
        return r
    }), n("guid", [], function () {
        var e = function () {
            function e() {
                return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)
            }

            return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        };
        return e
    }), n("parallax3D", ["utils"], function (e) {
        function r(e, t) {
            this.element = e, this.extend(this, n, t), this.calibrationTimer = null, this.calibrationFlag = !0, this.enabled = !1, this.raf = null, this.bounds = null, this.ex = 0, this.ey = 0, this.ew = 0, this.eh = 0, this.ecx = 0, this.ecy = 0, this.erx = 0, this.ery = 0, this.cx = 0, this.cy = 0, this.ix = 0, this.iy = 0, this.mx = 0, this.my = 0, this.vx = 0, this.vy = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onDeviceOrientation = this.onDeviceOrientation.bind(this), this.onOrientationTimer = this.onOrientationTimer.bind(this), this.onCalibrationTimer = this.onCalibrationTimer.bind(this), this.onAnimationFrame = this.onAnimationFrame.bind(this), this.onWindowResize = this.onWindowResize.bind(this), this.initialise()
        }

        var t = 30, n = {
            relativeInput: !1,
            clipRelativeInput: !1,
            calibrationThreshold: 100,
            calibrationDelay: 500,
            supportDelay: 500,
            calibrateX: !0,
            calibrateY: !0,
            invertX: !1,
            invertY: !1,
            limitX: !1,
            limitY: !1,
            scalarX: .1,
            scalarY: .1,
            frictionX: .1,
            frictionY: .1,
            originX: .5,
            originY: .5,
            depth: .5
        };
        return r.prototype.extend = function () {
            if (arguments.length > 1) {
                var e = arguments[0];
                for (var t = 1, n = arguments.length; t < n; t++) {
                    var r = arguments[t];
                    for (var i in r)e[i] = r[i]
                }
            }
        }, r.prototype.data = function (e, t) {
            return this.deserialize(e.getAttribute("data-" + t))
        }, r.prototype.deserialize = function (e) {
            return e === "true" ? !0 : e === "false" ? !1 : e === "null" ? null : !isNaN(parseFloat(e)) && isFinite(e) ? parseFloat(e) : e
        }, r.prototype.camelCase = function (e) {
            return e.replace(/-+(.)?/g, function (e, t) {
                return t ? t.toUpperCase() : ""
            })
        }, r.prototype.transformSupport = function (e) {
            var t = document.createElement("div"), n = !1, r = null, i = !1, s = null, o = null;
            for (var u = 0, a = this.vendors.length; u < a; u++) {
                this.vendors[u] !== null ? (s = this.vendors[u][0] + "transform", o = this.vendors[u][1] + "Transform") : (s = "transform", o = "transform");
                if (t.style[o] !== undefined) {
                    n = !0;
                    break
                }
            }
            switch (e) {
                case"2D":
                    i = n;
                    break;
                case"3D":
                    if (n) {
                        var f = document.body || document.createElement("body"), l = document.documentElement, c = l.style.overflow;
                        document.body || (l.style.overflow = "hidden", l.appendChild(f), f.style.overflow = "hidden", f.style.background = ""), f.appendChild(t), t.style[o] = "translate3d(1px,1px,1px)", r = window.getComputedStyle(t).getPropertyValue(s), i = r !== undefined && r.length > 0 && r !== "none", l.style.overflow = c, f.removeChild(t)
                    }
            }
            return i
        }, r.prototype.ww = null, r.prototype.wh = null, r.prototype.wcx = null, r.prototype.wcy = null, r.prototype.wrx = null, r.prototype.wry = null, r.prototype.portrait = null, r.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), r.prototype.vendors = [null, ["-webkit-", "webkit"], ["-moz-", "Moz"], ["-o-", "O"], ["-ms-", "ms"]], r.prototype.orientationSupport = !!window.DeviceOrientationEvent, r.prototype.orientationStatus = 0, r.prototype.propertyCache = {}, r.prototype.initialise = function () {
            r.prototype.transform2DSupport === undefined && (r.prototype.transform2DSupport = r.prototype.transformSupport("2D"), r.prototype.transform3DSupport = r.prototype.transformSupport("3D")), this.transform3DSupport && this.accelerate(this.element);
            var e = window.getComputedStyle(this.element);
            e.getPropertyValue("position") === "static" && (this.element.style.position = "relative"), this.updateDimensions(), this.enable(), this.queueCalibration(this.calibrationDelay)
        }, r.prototype.updateLayers = function () {
            var e = this.element;
            this.transform3DSupport && this.accelerate(e)
        }, r.prototype.updateDimensions = function () {
            this.ww = window.innerWidth, this.wh = window.innerHeight, this.wcx = this.ww * this.originX, this.wcy = this.wh * this.originY, this.wrx = Math.max(this.wcx, this.ww - this.wcx), this.wry = Math.max(this.wcy, this.wh - this.wcy)
        }, r.prototype.updateBounds = function () {
            this.bounds = this.element.getBoundingClientRect(), this.ex = this.bounds.left, this.ey = this.bounds.top, this.ew = this.bounds.width, this.eh = this.bounds.height, this.ecx = this.ew * this.originX, this.ecy = this.eh * this.originY, this.erx = Math.max(this.ecx, this.ew - this.ecx), this.ery = Math.max(this.ecy, this.eh - this.ecy)
        }, r.prototype.queueCalibration = function (e) {
            clearTimeout(this.calibrationTimer), this.calibrationTimer = setTimeout(this.onCalibrationTimer, e)
        }, r.prototype.enable = function () {
            this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, window.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0, this.cy = 0, this.portrait = !1, window.addEventListener("mousemove", this.onMouseMove)), window.addEventListener("resize", this.onWindowResize), this.raf = requestNextAnimationFrame(this.onAnimationFrame))
        }, r.prototype.disable = function () {
            this.enabled && (this.enabled = !1, this.orientationSupport ? window.removeEventListener("deviceorientation", this.onDeviceOrientation) : window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("resize", this.onWindowResize), cancelNextAnimationFrame(this.raf))
        }, r.prototype.calibrate = function (e, t) {
            this.calibrateX = e === undefined ? this.calibrateX : e, this.calibrateY = t === undefined ? this.calibrateY : t
        }, r.prototype.invert = function (e, t) {
            this.invertX = e === undefined ? this.invertX : e, this.invertY = t === undefined ? this.invertY : t
        }, r.prototype.friction = function (e, t) {
            this.frictionX = e === undefined ? this.frictionX : e, this.frictionY = t === undefined ? this.frictionY : t
        }, r.prototype.scalar = function (e, t) {
            this.scalarX = e === undefined ? this.scalarX : e, this.scalarY = t === undefined ? this.scalarY : t
        }, r.prototype.limit = function (e, t) {
            this.limitX = e === undefined ? this.limitX : e, this.limitY = t === undefined ? this.limitY : t
        }, r.prototype.origin = function (e, t) {
            this.originX = e === undefined ? this.originX : e, this.originY = t === undefined ? this.originY : t
        }, r.prototype.clamp = function (e, t, n) {
            return e = Math.max(e, t), e = Math.min(e, n), e
        }, r.prototype.css = function (e, t, n) {
            var r = this.propertyCache[t];
            if (!r)for (var i = 0, s = this.vendors.length; i < s; i++) {
                this.vendors[i] !== null ? r = this.camelCase(this.vendors[i][1] + "-" + t) : r = t;
                if (e.style[r] !== undefined) {
                    this.propertyCache[t] = r;
                    break
                }
            }
            e.style[r] = n
        }, r.prototype.accelerate = function (e) {
            this.css(e, "transform", "translate3d(0,0,0)"), this.css(e, "transform-style", "preserve-3d"), this.css(e, "backface-visibility", "hidden")
        }, r.prototype.setPosition = function (e, t, n) {
            t += "px", n += "px", this.transform3DSupport ? this.css(e, "transform", "translate3d(" + t + "," + n + ",0)") : this.transform2DSupport ? this.css(e, "transform", "translate(" + t + "," + n + ")") : (e.style.left = t, e.style.top = n)
        }, r.prototype.onOrientationTimer = function () {
            this.orientationSupport && this.orientationStatus === 0 && (this.disable(), this.orientationSupport = !1, this.enable())
        }, r.prototype.onCalibrationTimer = function () {
            this.calibrationFlag = !0
        }, r.prototype.onWindowResize = function () {
            this.updateDimensions()
        }, r.prototype.onAnimationFrame = function () {
            this.updateBounds();
            var e = this.ix - this.cx, t = this.iy - this.cy;
            (Math.abs(e) > this.calibrationThreshold || Math.abs(t) > this.calibrationThreshold) && this.queueCalibration(0), this.portrait ? (this.mx = this.calibrateX ? t : this.iy, this.my = this.calibrateY ? e : this.ix) : (this.mx = this.calibrateX ? e : this.ix, this.my = this.calibrateY ? t : this.iy), this.mx *= this.ew * this.scalarX, this.my *= this.eh * this.scalarY, isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)), isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)), this.vx += (this.mx - this.vx) * this.frictionX, this.vy += (this.my - this.vy) * this.frictionY;
            var n = this.element, r = this.depth, i = this.vx * r * (this.invertX ? -1 : 1), s = this.vy * r * (this.invertY ? -1 : 1);
            this.setPosition(n, i, s), this.raf = requestNextAnimationFrame(this.onAnimationFrame)
        }, r.prototype.onDeviceOrientation = function (e) {
            if (!this.desktop && e.beta !== null && e.gamma !== null) {
                this.orientationStatus = 1;
                var n = (e.beta || 0) / t, r = (e.gamma || 0) / t, i = this.wh > this.ww;
                this.portrait !== i && (this.portrait = i, this.calibrationFlag = !0), this.calibrationFlag && (this.calibrationFlag = !1, this.cx = n, this.cy = r), this.ix = n, this.iy = r
            }
        }, r.prototype.onMouseMove = function (e) {
            var t = e.clientX, n = e.clientY;
            !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (t = Math.max(t, this.ex), t = Math.min(t, this.ex + this.ew), n = Math.max(n, this.ey), n = Math.min(n, this.ey + this.eh)), this.ix = (t - this.ex - this.ecx) / this.erx, this.iy = (n - this.ey - this.ecy) / this.ery) : (this.ix = (t - this.wcx) / this.wrx, this.iy = (n - this.wcy) / this.wry)
        }, r
    }), n("playItem", ["contentFactory", "animaLib", "lengthPrefix", "eventHandlerLib", "customEvents", "utils", "guid", "global", "parallax3D"], function (e, t, n, r, i, s, o, u, a) {
        var f = ["border-color", "opacity", "border-radius", "border-width", "border-style", "padding-left", "padding-right", "padding", "padding-top", "padding-bottom", "background-color", "background-image", "box-shadow", "text-shadow"], l = ["border-radius", "font-size", "height", "left", "top", "padding-left", "padding-right", "padding-top", "padding-bottom", "width"], c = function (t, n) {
            t.__params_bind = {content: "param1"}, t._id = t._id || o(), this.scene = n, this.data = t, this.autoAnima = t.auto_anima === undefined ? !0 : !!t.auto_anima, this._id = t._id || "", this.el = document.createElement("div"), this.el.setAttribute("role", "item"), this.el.setAttribute("id", this._id), this.el.setAttribute("data-config", "content"), this.events = {}, this.content_container = document.createElement("div"), this.content_container.setAttribute("role", "content-container"), this.el.appendChild(this.content_container), this._anima_listener = null, this.anima = [], this.el.bom = this, this.content = e(t.type);
            if (!this.content) {
                var i = t.type;
                t.type = "text", t.content = "组件数据获取失败，自动转换为文本组件", this.content = e(t.type), console.error("ERROR:获取内容数据出错,args:" + i)
            }
            this.el.setAttribute("type", t.type), this.inner_el = document.createElement("div"), this.inner_el.setAttribute("class", "scene_content"), this.initStyle(), this.initSound(), this.content.init(this, this.inner_el);
            var s = this;
            if (this.data.events)for (var u in this.data.events) {
                this.events[u] = [];
                if (this.data.events[u] && this.data.events[u].length > 0)for (var a = 0; a < this.data.events[u].length; a++)(function (e) {
                    var t = function (t) {
                        t.preventDefault(), t.stopPropagation(), r[e.handler](t, s.scene, e.args)
                    };
                    t.params = e, s.events[u].push(t)
                })(this.data.events[u][a])
            }
            this.scene && !this.scene.is_editing && this.bindEvents(), this.content.container = this, this.content_container.appendChild(this.inner_el)
        };
        return c.prototype = {
            anima_listener: function (e) {
                this.animating_index++;
                var n = this, r = this.data.anima[this.animating_index];
                if (!r && this._anima_listener) {
                    n.el.removeEventListener("kz-animationend", n._anima_listener, !1), n._anima_listener = null, this.el.dispatchEvent(i.getEvent("kz-animation-full-end")), n.content.afterPlayAnima && n.content.afterPlayAnima(e);
                    return
                }
                if (this.scene.anima_status == 0)return;
                var s = {
                    delay: parseInt(r.args.delay) || 0,
                    duration: parseInt(r.args.duration) || 1e3,
                    infinite: r.args.infinite,
                    start_time: 0
                };
                this.anima_handler = t[r.type](n.el, s, n.el), this.anima_handler.run()
            }, render: function (e) {
                var t = this;
                this.is_editing = e;
                if (!e && this.data.__params_bind && this.scene && this.scene.page && this.scene.page.player && this.scene.page.player.params) {
                    for (var n in this.data.__params_bind) {
                        var r = this.scene.page.player.params.get(this.data.__params_bind[n]);
                        this.data[n] !== undefined && r !== undefined && (this.data[n] = r)
                    }
                    this.scene.page.player.params.on("change", function (e) {
                        var n = !1;
                        for (var r in e)for (var i in t.data.__params_bind)if (r === t.data.__params_bind[i]) {
                            var s = t.scene.page.player.params.get(t.data.__params_bind[i]);
                            t.data[i] !== undefined && s !== undefined && (n = !0, t.data[i] = s)
                        }
                        n && t.content.render(t.data, t.is_editing)
                    })
                }
                this.content.render(this.data, e), this.content.bindEvents(e)
            }, playAnima: function (e) {
                this.content.beforePlayAnima && this.content.beforePlayAnima(e), this.anima = [];
                var n = this;
                this.animating_index = 0;
                if (this.data && this.data.anima && this.data.anima.length > 0) {
                    this.data.anima[0].type.indexOf("In") >= 0 ? this.el.setAttribute("opacity_none", "opacity_none") : this.el.removeAttribute("opacity_none"), this._anima_listener || (this._anima_listener = function () {
                        n.anima_listener.call(n, e)
                    }, this.el.addEventListener("kz-animationend", this._anima_listener, !1));
                    var r = n.data.anima[0], i = {
                        delay: parseInt(r.args.delay) || 0,
                        duration: parseInt(r.args.duration) || 100,
                        infinite: r.args.infinite,
                        start_time: 0
                    };
                    e || setTimeout(function () {
                        n._anima_listener && n.playSound()
                    }, r.args.delay), e && setTimeout(function () {
                        n.el.setAttribute("class", "");
                        var e = s.hasClass(n.content_container, "ui-resizable") ? "ui-resizable" : "";
                        n.content_container.setAttribute("class", e), n.el.removeAttribute("opacity_none")
                    }, this.getPlayingTimeCount() + 1e3), this.anima_handler = t[r.type](n.el, i, n.el), this.anima_handler.run()
                } else n.content.afterPlayAnima && n.content.afterPlayAnima(e), e || this.playSound();
                return this
            }, bindEvents: function () {
                var e = this;
                for (var t in this.events) {
                    var n = this.events[t];
                    n && e.el.addEventListener(t, function (t) {
                        var n = e.events[t.type] || [];
                        for (var r = 0; r < n.length; r++)(function (e) {
                            t.type == "kz-scene-time-line" ? t.detail && t.detail.time == n[e].params.time && setTimeout(function () {
                                n[e](t)
                            }, 0) : t.type == "kz-counter-change" ? t.detail && n[e].params.condition && t.detail.counter <= n[e].params.condition.max && t.detail.counter >= n[e].params.condition.min && setTimeout(function () {
                                n[e](t)
                            }, 0) : setTimeout(function () {
                                n[e](t)
                            }, 0)
                        })(r)
                    }, !1)
                }
            }, getPlayingTimeCount: function () {
                var e = 0;
                for (var t = 0; t < this.data.anima.length; t++) {
                    var n = this.data.anima[t];
                    e = e + (parseInt(n.args.delay) || 0) + (parseInt(n.args.duration) || 1e3)
                }
                return e
            }, initAnima: function () {
                if (this.data._style && this.data._style.para_enabled == "true" && this.scene && !this.scene.is_editing) {
                    if (!this.parallax) {
                        var e = this.data._style, t = document.createElement("div"), n = {};
                        t.setAttribute("role", "parallax_wrapper"), this.el.replaceChild(t, this.content_container), t.appendChild(this.content_container), $.extend(n, {
                            scalarX: parseFloat(e.intensityX) * 2,
                            scalarY: parseFloat(e.intensityY) * 2,
                            frictionX: Math.round(100 - parseFloat(e.friction) * 100) / 100,
                            frictionY: Math.round(100 - parseFloat(e.friction) * 100) / 100,
                            invertX: e.reversion == "true",
                            invertY: e.reversion == "true"
                        }), console.log(n), this.parallax = new a(t, n)
                    }
                    this.parallax.enable()
                }
                if (!this.data.anima || this.data.anima.length <= 0)return;
                return this.el.setAttribute("class", ""), s.setStyle(this.el, "animation-duration", "0"), s.setStyle(this.el, "animation-delay", "0"), this.data.anima[0].type.indexOf("In") >= 0 && this.el.setAttribute("opacity_none", "opacity_none"), this
            }, initSound: function () {
                if (this.data.sound && this.data.sound.url) {
                    var e = document.createElement("audio"), t = document.createElement("source");
                    e.volume = .3, e.setAttribute("class", "sound"), e.autoplay = "", e.preload = "auto", e.controls = "", e.appendChild(t), this.data.sound.is_loop && e.setAttribute("loop", "loop"), t.setAttribute("src", this.data.sound.url), t.setAttribute("type", "audio/mpeg"), this.el.appendChild(e), this.sound = e;
                    var n = this;
                    $("body").one("touchstart", function () {
                        n.sound.play(), n.sound.pause()
                    })
                }
                return this
            }, playSound: function () {
                if (this.sound && this.sound.readyState == 4)try {
                    this.sound.currentTime = 0, this.sound.play()
                } catch (e) {
                    throw"播放声音出错"
                }
            }, stopSound: function () {
                this.sound && this.sound.pause()
            }, setStyle: function (e) {
                this.style_changed = !0;
                for (var t in e) {
                    var n = e[t];
                    l.indexOf(t) >= 0 && (n = (parseInt(n) || 0) + "px"), t = t.toLocaleLowerCase(), t == "width" || t == "height" ? (this.content_container.style.setProperty(t, n), this.el.style.setProperty(t, n)) : t == "left" || t == "top" ? this.el.style.setProperty(t, n) : t == "z-index" ? this.el.style.setProperty(t, n) : t.indexOf("padding") == 0 || t == "background-color" || t.indexOf("border") == 0 || f.indexOf(t) >= 0 ? this.inner_el.style.setProperty(t, n) : this.content_container.style.setProperty(t, n), t == "transform" && (this.content_container.style.setProperty("-webkit-" + t, n), this.content_container.style.setProperty("-moz-" + t, n))
                }
            }, initStyle: function () {
                this.style_changed = !1, this.el.setAttribute("style", ""), this.inner_el.setAttribute("style", ""), this.content_container.setAttribute("style", ""), this.el.removeAttribute("opacity_none"), this.data._style && this.data._style.hide == "true" && this.scene && !this.scene.is_editing && this.el.setAttribute("opacity_none", "opacity_none"), this.setStyle(this.data.style), $(this.inner_el).is(".background") && this.content.render(this.data, this.is_editing)
            }, "delete": function () {
                this.content.beforeDelete && this.content.beforeDelete(), this.destroy(), this.scene.data.items.splice(this.scene.data.items.indexOf(this.data), 1), this.scene.items.splice(this.scene.items.indexOf(this), 1), this.el.remove()
            }, updateContent: function (e) {
                this.content.render(this.data, e)
            }, destroy: function () {
                this.content.beforeDestroy && this.content.beforeDestroy(), this.sound = null, this.clearAnima(), this.el.innerHTML = ""
            }, clearAnima: function () {
                return this.parallax && this.parallax.disable(), this.content.beforeClearAnima && this.content.beforeClearAnima(), this.stopSound(), this.style_changed && this.initStyle(), this.anima_handler && this.anima_handler.clear(), this.anima_handler = null, this._anima_listener && (this.el.removeEventListener("kz-animationend", this._anima_listener, !1), this._anima_listener = null), this
            }
        }, c
    }), n("scene", ["global", "playItem", "lengthPrefix", "eventHandlerLib", "utils"], function (e, t, n, r, i) {
        var s = function (e, t) {
            var s = this;
            this.page = t, this.is_editing = !t, this.data = e, this.el = document.createElement("li"), this.inner_el = document.createElement("div"), this.inner_el.setAttribute("class", "scene_container"), i.setStyle(this.inner_el, "transform", "scale(" + n.getScale("min") + ")"), this.el.appendChild(this.inner_el), this.items = [], this.el.setAttribute("class", "scene"), this.el.setAttribute("data-config", "scene"), this.el.bom = this, this.events = {};
            if (this.data.events)for (var o in this.data.events) {
                this.events[o] = [];
                if (this.data.events[o] && this.data.events[o].length > 0)for (var u = 0; u < this.data.events[o].length; u++)(function (e) {
                    var t = function (t) {
                        t.preventDefault(), t.stopPropagation(), r[e.handler](t, s, e.args)
                    };
                    t.params = e, s.events[o].push(t)
                })(this.data.events[o][u])
            }
            this.is_editing || this.bindEvents(), this.initSceneStyle(), this.initItems()
        };
        return s.prototype = {
            initSceneStyle: function () {
                if (this.data && this.data.background)for (var e in this.data.background) {
                    var t = this.data.background[e];
                    t && (e === "background-image" && (t = "url(" + t + ")"), this.el.style.setProperty(e, t))
                }
            }, destroy: function () {
                this.items && this.items.forEach(function (e) {
                    e.destroy()
                }), this.el.innerHTML = "", this.items = null
            }, initItems: function () {
                var e = this;
                this.data.items = this.data && this.data.items || [], this.data.items.forEach(function (n) {
                    var r = new t(n, e);
                    e.items.push(r), e.inner_el.appendChild(r.el)
                })
            }, findItemById: function (e) {
                if (!this.items)return null;
                var t = this.items.filter(function (t) {
                    return t._id == e
                });
                return t && t[0]
            }, addItem: function (e) {
                this.items.push(e), e.scene = this, this.data.items.push(e.data), this.inner_el.appendChild(e.el)
            }, clearAnima: function () {
                return this.anima_status = 0, this.items && this.items.forEach(function (e, t) {
                    e.clearAnima()
                }), this
            }, playAnima: function (e) {
                var t = this;
                return this.anima_status = 1, this.items.forEach(function (n) {
                    (n.autoAnima || t.is_editing) && n.playAnima(e)
                }), this
            }, render: function (e) {
                return this.items && this.items.forEach(function (t) {
                    t.render(e)
                }), this
            }, getPlayingTimeCount: function () {
                var e = [];
                return this.items && this.items.forEach(function (t) {
                    e.push(t.getPlayingTimeCount())
                }), e.sort(function (e, t) {
                    return parseInt(t) - parseInt(e)
                })[0] || 0
            }, initAnima: function () {
                return this.items && this.items.forEach(function (e) {
                    e.initAnima()
                }), this
            }, bindEvents: function () {
                var e = this;
                for (var t in this.events) {
                    var n = this.events[t];
                    n && e.el.addEventListener(t, function (t) {
                        var n = e.events[t.type] || [];
                        for (var r = 0; r < n.length; r++)(function (e) {
                            t.type == "kz-scene-time-line" ? t.detail && t.detail.time == n[e].params.time && setTimeout(function () {
                                n[e](t)
                            }, 0) : setTimeout(function () {
                                n[e](t)
                            }, 0)
                        })(r)
                    }, !1)
                }
            }
        }, s
    }), n("kzpage", ["utils", "global", "scene", "customEvents"], function (e, t, n, r) {
        var i = e.setStyle, s, o = 0, u, a = function (e, t, r, i, s, o) {
            s === undefined ? s = {paging_control: 0} : typeof s == "boolean" ? s = {paging_control: s ? 1 : 0} : s = s;
            var u = {play_control: 0, paging_control: 0, paging_second: 3, is_preview: !0, start_index: o || 0};
            this.playControl = $.extend(!0, u, s), this.playControl.autoPaging && this.playControl.paging_control == 0 && (this.playControl.paging_control = 1), this.player = r, this.page_id = i, this.data = e, this.scenes = [], this.container_el = t;
            if (!this.data.scenes)throw"数据错误，没有页面数据";
            for (var a = 0; a < this.data.scenes.length; a++) {
                var f = this.data.scenes[a], l = new n(f, this);
                l.render(), this.scenes.push(l)
            }
            this.init()
        };
        return a.prototype = {
            init: function () {
                var e = this;
                this.container_el.innerHTML = "", this.setBackground(), this.scenes.forEach(function (t) {
                    e.container_el.appendChild(t.el)
                }), this.setPagingControl(this.playControl.paging_control), this.scenes.forEach(function (e) {
                    e.el.style.setProperty("display", "none")
                })
            }, setBackground: function (e) {
                e = e || this.data.background, e && (this.container_el.style.setProperty("background-color", e["background-color"]), this.container_el.style.setProperty("background-image", e["background-image"] && "url('" + e["background-image"] + "')"))
            }, setPagingControl: function (e, t) {
                this.playControl.paging_control = e;
                var n = $(this.container_el.parentElement || this.container_el);
                n.off("touchstart touchmove touchend touchcancel mousedown mouseup"), e == 2 ? this.hideNextPointer() : (this.showNextPointer(), this.bindMoveEvents(), t && (this.playControl.paging_second = t))
            }, setPlayControl: function (e, t) {
                this.playControl.play_control = e, t && (this.playControl["jump-url"] = t)
            }, bindMoveEvents: function () {
                var e = this, n, r, i = "ontouchstart" in window, s = function () {
                    var t = e.scenes[e.cur || 0].data.paging;
                    if (t && (t.touch_paging_disabled || t.paging_control == "disable_paging")) {
                        n = r = undefined;
                        return
                    }
                    r && n && (r - n < -30 && (i ? e.next() : e.prev()), r - n > 30 && (i ? e.prev() : e.next()), n = r = undefined)
                }, o = $(this.container_el);
                if (i) {
                    var u = function (e) {
                        n = t.landscape ? e.touches && e.touches[0].pageX : e.touches && e.touches[0] && e.touches[0].pageY
                    }, a = function (e) {
                        e.preventDefault();
                        if (t.keyboard_shown)return;
                        r = t.landscape ? e.touches && e.touches[0].pageX : e.touches && e.touches[0] && e.touches[0].pageY
                    };
                    o.off("touchstart", u).on("touchstart", u), o.off("touchmove", a).on("touchmove", a), o.off("touchend", s).on("touchend", s), o.off("touchcancel", s).on("touchcancel", s)
                } else {
                    var f = !1, l = function (e) {
                        f = !0, n = e.clientY
                    }, c = function (e) {
                        f = !1, r = e.clientY, s()
                    };
                    o.off("mousedown", l).on("mousedown", l), o.off("mouseup", c).on("mouseup", c)
                }
            }, prev: function () {
                var e = this.scenes[this.cur || 0].data.paging;
                if (e && e.paging_control === "disable_prev")return;
                this.go("prev")
            }, showNextPointer: function () {
                if (this.playControl.paging_control == 2)return;
                this.player.showNextPointer()
            }, hideNextPointer: function () {
                this.player.hideNextPointer()
            }, next: function () {
                var e = this.scenes[this.cur || 0].data.paging;
                if (e && e.paging_control === "disable_next")return;
                this.go("next")
            }, jump: function (e) {
                if (typeof e == "string") {
                    var t = this.scenes.filter(function (t) {
                        return t.data._id == e
                    })[0];
                    e = this.scenes.indexOf(t)
                }
                typeof e == "number" && e >= 0 && e !== this.cur && (this.scenes.forEach(function (e) {
                    e.clearAnima()
                }), this.go(e > this.cur ? "next" : "prev", e))
            }, go: function (t, n) {
                t == "prev" && n == undefined ? n = (this.cur || 0) - 1 : t == "next" && n == undefined ? n = (this.cur || 0) + 1 : n == undefined && (n = 0);
                if (this.turningPage || !this.scenes)return;
                if (n > 0 && n == this.scenes.length) {
                    if (this.playControl.play_control == 1 && t == "next")return;
                    if (this.playControl.play_control == 2 && t == "next" && this.playControl["jump-url"]) {
                        var i = this.playControl.is_preview, a = this.playControl["jump-url"];
                        i ? window.open(a) : window.location = a;
                        return
                    }
                }
                if (this.cur == 0 && this.playControl.play_control == 1 && t == "prev")return;
                this.turningPage = !0;
                var f = this.scenes[this.cur || 0], l = this.cur;
                this.cur = n >= this.scenes.length ? 0 : n < 0 ? this.scenes.length - 1 : n;
                var c = this.scenes[this.cur], h = this.scenes[this.cur + 1 >= this.scenes.length ? 0 : this.cur + 1], p = this.scenes[this.cur - 1 < 0 ? this.scenes.length - 1 : this.cur - 1];
                t == "next" ? p = this.scenes[l] : t == "prev" && (h = this.scenes[l]), this.scenes.forEach(function (e) {
                    e.el.className = "scene", e === c ? (e.el.style.setProperty("display", "block"), e.el.style.setProperty("z-index", "2")) : e === h && t == "prev" ? (e.el.style.setProperty("display", "block"), e.el.style.setProperty("z-index", "1")) : e === p && t == "next" ? (e.el.style.setProperty("display", "block"), e.el.style.setProperty("z-index", "1")) : (e.el.style.setProperty("display", "none"), e.el.style.setProperty("z-index", "0"))
                });
                var d = this;
                c.initAnima(), c.data.paging && (c.data.paging.touch_paging_disabled || c.data.paging.paging_control == "disable_paging" || c.data.paging.paging_control == "disable_next") || this.cur >= this.scenes.length - 1 || c === h && h === p ? this.hideNextPointer() : this.playControl.paging_control !== 2 && this.showNextPointer(), this.scenes.length > 1 && (t == "prev" ? (e.addClass(h.el, "move-prev"), e.addClass(c.el, "prev-move-cur"), c.data.paging && c.data.paging.paging_animate && (e.addClass(h.el, c.data.paging.paging_animate), e.addClass(c.el, c.data.paging.paging_animate))) : t == "next" && (e.addClass(p.el, "move-next"), e.addClass(c.el, "next-move-cur"), c.data.paging && c.data.paging.paging_animate && (e.addClass(p.el, c.data.paging.paging_animate), e.addClass(c.el, c.data.paging.paging_animate)))), d.timer && clearTimeout(d.timer), clearInterval(s), c.playAnima(), o = 0, setTimeout(function () {
                    c.el.dispatchEvent(r.getEvent("kz-scene-time-line", {time: o}))
                }, 10), s = setInterval(function () {
                    o++, c.el.dispatchEvent(r.getEvent("kz-scene-time-line", {time: o}))
                }, 1e3), d.timer = setTimeout(function () {
                    d.turningPage = !1, d.timer = undefined, setTimeout(function () {
                        t == "prev" && h && h !== c ? e.setStyle(h.el, "display", "none") : t == "next" && p && p !== c && e.setStyle(p.el, "display", "none"), f !== c && f.clearAnima()
                    }, 10)
                }, 800);
                var v = !1, m;
                c.data.paging ? c.data.paging.auto_paging === !0 && c.data.paging.paging_control === undefined ? (v = !0, m = c.data.paging.auto_paging_time * 1e3 || 1e3) : c.data.paging.paging_control === "auto_paging" && (v = !0, m = c.data.paging.auto_paging_time * 1e3 || 1e3) : d.playControl.paging_control == 1 && (m = d.scenes[d.cur].getPlayingTimeCount() + (d.playControl.paging_second * 1e3 || 0) || 1e3, v = !0), clearTimeout(u), v && (u = setTimeout(function () {
                    d.turningPage = !1, d.go("next")
                }, m)), this.player.progressbar && this.player.progressbar.set_index(this.cur)
            }, destroy: function () {
                this.scenes && this.scenes.forEach(function (e) {
                    e.destroy()
                });
                var e = $(this.container_el);
                e.off("touchstart touchmove touchend touchcancel mousedown mouseup"), this.scenes = null, this.container_el.innerHTML = "", clearTimeout(this.timer), clearTimeout(u)
            }
        }, a
    }), n("musicController", [], function () {
        var e = function (e, t, n) {
        };
        return e
    }), n("adScene", [], function () {
        var e = {
            title: "新建页面",
            background: {
                "background-color": "rgba(255,255,255,1)",
                "background-image": "http://pic.kuaizhan.com/g1/M00/10/25/wKjmqVT1iHKAOh_3AAAYSBJ3cuw8062797/imageView/v1/thumbnail/640x0"
            },
            items: [{
                type: "text",
                style: {
                    left: "8",
                    top: "114.99998474121094",
                    width: "302",
                    height: "59",
                    "background-color": "rgba(255,255,255,0)",
                    "border-radius": "5",
                    "border-color": "rgba(255,255,255,0)",
                    "border-width": "0px",
                    "border-style": "none",
                    "z-index": 0,
                    opacity: 1,
                    transform: "rotate(0deg)",
                    "box-shadow": "0px 0px 0px 0px ",
                    "padding-top": "0",
                    "padding-left": "0",
                    "padding-right": "0",
                    "padding-bottom": "0"
                },
                anima: [{args: {delay: 0, duration: 1e3, infinite: !1}, type: "fadeInDown"}],
                "font-size": "14",
                "line-height": "1.2",
                content: '<div style="text-align: center;"><font color="#808080" size="5">保满意</font></div>',
                _style: {
                    "transform-rotate": "0",
                    "border-width": "0",
                    "box-shadow-color": "",
                    "box-shadow-width": "",
                    "box-shadow-blur": "",
                    "box-shadow-size": "",
                    "box-shadow-degree": "0"
                }
            }, {
                type: "image",
                style: {
                    width: "140",
                    height: "140",
                    left: "89",
                    top: "180",
                    "z-index": 1,
                    "background-color": "transparent",
                    opacity: 1,
                    transform: "rotate(0deg)",
                    "border-style": "none",
                    "border-color": "transparent",
                    "border-width": "0px",
                    "border-radius": "20",
                    "box-shadow": "1px 1px 0px 1px rgba(1,1,1,0.05)",
                    "padding-top": "0",
                    "padding-left": "0",
                    "padding-right": "0",
                    "padding-bottom": "0"
                },
                anima: [{args: {delay: 500, duration: 1e3, infinite: !1}, type: "fadeIn"}],
                image: "http://pic.kuaizhan.com/g2/M00/10/3F/CgpQVFT1iTeACwg3AADYuIzSrT00184238/imageView/v1/thumbnail/640x0",
                link: "",
                _style: {
                    "transform-rotate": "0",
                    "border-width": "0",
                    "box-shadow-color": "rgba(1,1,1,0.05)",
                    "box-shadow-width": "1",
                    "box-shadow-blur": "",
                    "box-shadow-size": "1",
                    "box-shadow-degree": "145"
                }
            }, {
                type: "text",
                style: {
                    left: "0",
                    top: "400",
                    width: "320",
                    height: "34",
                    "background-color": "rgba(255,255,255,0)",
                    "border-radius": "5",
                    "border-color": "rgba(255,255,255,0)",
                    "border-width": "0px",
                    "border-style": "none",
                    "z-index": 1,
                    opacity: 1,
                    transform: "rotate(0deg)",
                    "box-shadow": "0px 0px 0px 0px ",
                    "padding-top": "0",
                    "padding-left": "0",
                    "padding-right": "0",
                    "padding-bottom": "0"
                },
                anima: [{args: {delay: 500, duration: 1e3, infinite: !1}, type: "fadeIn"}],
                "font-size": "14",
                "line-height": "1.2",
                content: '<p style="text-align: center;"><font size="1"><font color="#808080">买卖保险，首选保满意！</font></font></p>',
                _style: {
                    "transform-rotate": "0",
                    "border-width": "0",
                    "box-shadow-color": "",
                    "box-shadow-width": "",
                    "box-shadow-blur": "",
                    "box-shadow-size": "",
                    "box-shadow-degree": "0"
                }
            }],
            _id: "04e5f142-b7b4-69b7-a92c-d5fd4f40c85f"
        };
        return function (t) {
            var n = $.extend(!0, {}, e), r = t.ad_content || '<font color="#808080">买卖保险，首选保满意！</font>';
            return n.items[1].image = t.screen || "http://pic.kuaizhan.com/g2/M00/10/5E/CgpQVFT2zsWAQdgOAAAT5dwbS281145819", n.items[0].content = '<div style="text-align: center;"><font color="#808080" size="5">' + t.title + "</font></div>", n.items[2].content = '<p style="text-align: center;"><font size="1">' + r + "</font></p>", n
        }
    }), n("menu", ["global"], function (e) {
        var t = function (e, t, n) {
            this.page = n;
            var r = document.createElement("div");
            this.menu_direction = t.style.theme || "right", r.setAttribute("data-kzplayer", "menu"), this.el = r, this.data = t, this.reset_dom(), this.reset_style(), e.appendChild(r), this.wrapper = e, this.bindMoveEvents(), n && (this.bindJumpEvents(), e.querySelector(".inner-menu").addEventListener("touchmove", function (e) {
                e.stopPropagation()
            }))
        };
        return t.prototype = {
            show: function () {
                this.el.setAttribute("class", "kz-menu show " + this.menu_direction), this.is_show = !0
            }, hide: function () {
                this.el.setAttribute("class", "kz-menu " + this.menu_direction), this.is_show = !1
            }, reset_style: function (e) {
                e && (this.menu_direction = e.style.theme || "right", this.data = e), this.el.setAttribute("class", "kz-menu " + this.menu_direction), this.el.style.setProperty("background-color", this.data.style["background-color"]), this.el.style.setProperty("color", this.data.style["font-color"])
            }, reset_dom: function (e) {
                e && (this.data = e);
                var t = "<span class='menu_pointer'></span><div class='inner-menu'><ul class='main-menu'>";
                this.data.data.forEach(function (e) {
                    t += "<li data-link='" + JSON.stringify(e.link) + "'>∙ " + e.title, e.sub_menus && e.sub_menus.length && (t += "<ul class='sub-menu'>", e.sub_menus.forEach(function (e) {
                        t += "<li data-link='" + JSON.stringify(e.link) + "'>" + e.title + "</li>"
                    }), t += "</ul>"), t += "</li>"
                }), t += "</ul></div>", this.el.innerHTML = t
            }, destroy: function () {
                var e = $(this.wrapper);
                $(this.el).find("li[data-link]").off("click"), e.off("touchstart"), e.off("touchmove"), e.off("touchend"), e.off("touchcancel"), this.el.remove()
            }, bindJumpEvents: function () {
                var e = this;
                $(this.el).find("li[data-link]").off("click").on("click", function (t) {
                    t.stopPropagation();
                    var n = $(this).data("link");
                    console.log(n), e.hide(), n.link_res_type == -1 ? e.page && e.page.jump(n.link) : n.link_res_type && (window.location = n.link)
                })
            }, bindMoveEvents: function () {
                var t = this, n, r, i, s, o = "ontouchstart" in window, u = function () {
                    if (r && s && Math.abs(s - r) > 30)return;
                    i && n && (i - n < -30 && (t.menu_direction == "right" ? t.show() : t.hide()), i - n > 30 && (t.menu_direction == "right" ? t.hide() : t.show()), n = i = undefined)
                }, a = $(this.wrapper);
                if (o) {
                    var f = function (t) {
                        n = e.landscape ? t.touches && t.touches[0].pageX : t.touches && t.touches[0].pageX, r = e.landscape ? t.touches && t.touches[0].pageY : t.touches && t.touches[0].pageY
                    }, l = function (t) {
                        i = e.landscape ? t.touches && t.touches[0].pageX : t.touches && t.touches[0].pageX, s = e.landscape ? t.touches && t.touches[0].pageY : t.touches && t.touches[0].pageY
                    };
                    a.off("touchstart", f).on("touchstart", f), a.off("touchmove", l).on("touchmove", l), a.off("touchend", u).on("touchend", u), a.off("touchcancel", u).on("touchcancel", u)
                } else {
                    var c = !1, h = function (e) {
                        c = !0, n = e.clientX
                    }, p = function (e) {
                        c = !1, i = e.clientX, u()
                    };
                    a.off("mousedown", h).on("mousedown", h), a.off("mouseup", p).on("mouseup", p)
                }
                this.el.addEventListener("click", function (e) {
                    e.target.getAttribute("class") === "menu_pointer" && (t.is_show ? t.hide() : t.show())
                })
            }
        }, t
    }), n("paramters", [], function () {
        var e = function (e) {
            this.__params = $.extend(!0, {}, e), this.__callbacks = {}
        };
        e.prototype = {
            on: function (e, t) {
                this.__callbacks[e] = this.__callbacks[e] || [], this.__callbacks[e].indexOf(t) < 0 && this.__callbacks[e].push(t)
            }, off: function (e, t) {
                var n = this.__callbacks[e].indexOf(t);
                n >= 0 && this.__callbacks[e].splice(n, 1)
            }, set: function (e) {
                var t = !1, n = this, r = {};
                for (var i in e)this.__params[i] !== e[i] && (t = !0, r[i] = e[i], this.__params[i] = e[i], this.__callbacks["change:" + i] && this.__callbacks["change:" + i].forEach(function (e) {
                    setTimeout(e.call(n, n.__params[i]), 0)
                }));
                t && this.__callbacks.change && this.__callbacks.change.forEach(function (e) {
                    setTimeout(e.call(n, r), 0)
                })
            }, get: function (e) {
                if (e.indexOf(".") < 0)return this.__params[e];
                try {
                    var t = e.split("."), n = JSON.parse(this.__params[e]);
                    for (var r = 0; r < t.length; r++)n = n && n[t[r]];
                    return n
                } catch (i) {
                    return undefined
                }
            }
        };
        var t = function (t) {
            return new e(t)
        };
        return t
    }), n("progressBar", ["global"], function (e) {
        var t = function (e, t, n) {
            this.max = n.max;
            var r = document.createElement("div");
            this.data = t, r.setAttribute("data-kzplayer", "progress-bar"), this.el = r, this.data = t, this.data.theme = this.data.theme || "bottom", e.appendChild(r), this.wrapper = e, this.render()
        };
        return t.prototype = {
            render: function () {
                var e = "";
                if (this.data.theme == "bottom") e = "<span class='bg' style='background-color:" + this.data.color + ";'></span><span class='progressing' style='background-color:" + this.data.color + ";'></span>"; else if (this.data.theme == "corner") e = "<span class='corner-text'style='color:" + this.data.color + ";'><span class='cur_page'></span><span class='total_page'>/" + this.max + "</span></span>"; else if (this.data.theme == "right")for (var t = 0; t < this.max; t++)e += "<span class='cycle' style='background-color:" + this.data.color + ";'></span>";
                $(this.el).attr("class", this.data.theme).html(e)
            }, set_index: function (e) {
                if (e < 0 || e >= this.max)return;
                this.data.theme == "bottom" ? $(this.el).find(".progressing").css("width", (e + 1) * 100 / this.max + "%") : this.data.theme == "corner" ? $(this.el).find(".cur_page").text(e + 1) : this.data.theme == "right" && ($(this.el).find(".cycle.cur").removeClass("cur"), $(this.el).find(".cycle").eq(e).addClass("cur"))
            }, destroy: function () {
                this.el.remove()
            }
        }, t
    }), function () {
        function o(e) {
            e.fn.swiper = function (n) {
                var r;
                return e(this).each(function () {
                    var e = new t(this, n);
                    r || (r = e)
                }), r
            }
        }

        var e, t = function (r, i) {
            function p() {
                return h.params.direction === "horizontal"
            }

            function d(e) {
                return Math.floor(e)
            }

            function v() {
                h.autoplayTimeoutId = setTimeout(function () {
                    h.params.loop ? (h.fixLoop(), h._slideNext()) : h.isEnd ? i.autoplayStopOnLast ? h.stopAutoplay() : h._slideTo(0) : h._slideNext()
                }, h.params.autoplay)
            }

            function g(t, n) {
                var r = e(t.target);
                if (!r.is(n))if (typeof n == "string") r = r.parents(n); else if (n.nodeType) {
                    var i;
                    return r.parents().each(function (e, t) {
                        t === n && (i = n)
                    }), i ? n : undefined
                }
                return r.length === 0 ? undefined : r[0]
            }

            function D(e, t) {
                t = t || {};
                var n = window.MutationObserver || window.WebkitMutationObserver, r = new n(function (e) {
                    e.forEach(function (e) {
                        h.onResize(!0), h.emit("onObserverUpdate", h, e)
                    })
                });
                r.observe(e, {
                    attributes: typeof t.attributes == "undefined" ? !0 : t.attributes,
                    childList: typeof t.childList == "undefined" ? !0 : t.childList,
                    characterData: typeof t.characterData == "undefined" ? !0 : t.characterData
                }), h.observers.push(r)
            }

            function P(e) {
                e.originalEvent && (e = e.originalEvent);
                var t = e.keyCode || e.charCode;
                if (!h.params.allowSwipeToNext && (p() && t === 39 || !p() && t === 40))return !1;
                if (!h.params.allowSwipeToPrev && (p() && t === 37 || !p() && t === 38))return !1;
                if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey)return;
                if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === "input" || document.activeElement.nodeName.toLowerCase() === "textarea"))return;
                if (t === 37 || t === 39 || t === 38 || t === 40) {
                    var n = !1;
                    if (h.container.parents(".swiper-slide").length > 0 && h.container.parents(".swiper-slide-active").length === 0)return;
                    var r = {
                        left: window.pageXOffset,
                        top: window.pageYOffset
                    }, i = window.innerWidth, s = window.innerHeight, o = h.container.offset();
                    h.rtl && (o.left = o.left - h.container[0].scrollLeft);
                    var u = [[o.left, o.top], [o.left + h.width, o.top], [o.left, o.top + h.height], [o.left + h.width, o.top + h.height]];
                    for (var a = 0; a < u.length; a++) {
                        var f = u[a];
                        f[0] >= r.left && f[0] <= r.left + i && f[1] >= r.top && f[1] <= r.top + s && (n = !0)
                    }
                    if (!n)return
                }
                if (p()) {
                    if (t === 37 || t === 39) e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                    (t === 39 && !h.rtl || t === 37 && h.rtl) && h.slideNext(), (t === 37 && !h.rtl || t === 39 && h.rtl) && h.slidePrev()
                } else {
                    if (t === 38 || t === 40) e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                    t === 40 && h.slideNext(), t === 38 && h.slidePrev()
                }
            }

            function B(e) {
                e.originalEvent && (e = e.originalEvent);
                var t = h.mousewheel.event, n = 0, r = h.rtl ? -1 : 1;
                if (e.detail) n = -e.detail; else if (t === "mousewheel")if (h.params.mousewheelForceToAxis)if (p()) {
                    if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)))return;
                    n = e.wheelDeltaX * r
                } else {
                    if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)))return;
                    n = e.wheelDeltaY
                } else n = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * r : -e.wheelDeltaY; else if (t === "DOMMouseScroll") n = -e.detail; else if (t === "wheel")if (h.params.mousewheelForceToAxis)if (p()) {
                    if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY)))return;
                    n = -e.deltaX * r
                } else {
                    if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX)))return;
                    n = -e.deltaY
                } else n = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * r : -e.deltaY;
                if (n === 0)return;
                h.params.mousewheelInvert && (n = -n);
                if (!h.params.freeMode) {
                    if ((new window.Date).getTime() - h.mousewheel.lastScrollTime > 60)if (n < 0) {
                        if ((!h.isEnd || h.params.loop) && !h.animating) h.slideNext(); else if (h.params.mousewheelReleaseOnEdges)return !0
                    } else if ((!h.isBeginning || h.params.loop) && !h.animating) h.slidePrev(); else if (h.params.mousewheelReleaseOnEdges)return !0;
                    h.mousewheel.lastScrollTime = (new window.Date).getTime()
                } else {
                    var i = h.getWrapperTranslate() + n * h.params.mousewheelSensitivity, s = h.isBeginning, o = h.isEnd;
                    i >= h.minTranslate() && (i = h.minTranslate()), i <= h.maxTranslate() && (i = h.maxTranslate()), h.setWrapperTransition(0), h.setWrapperTranslate(i), h.updateProgress(), h.updateActiveIndex(), (!s && h.isBeginning || !o && h.isEnd) && h.updateClasses(), h.params.freeModeSticky && (clearTimeout(h.mousewheel.timeout), h.mousewheel.timeout = setTimeout(function () {
                        h.slideReset()
                    }, 300));
                    if (i === 0 || i === h.maxTranslate())return
                }
                return h.params.autoplay && h.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }

            function j(t, n) {
                t = e(t);
                var r, i, s, o = h.rtl ? -1 : 1;
                r = t.attr("data-swiper-parallax") || "0", i = t.attr("data-swiper-parallax-x"), s = t.attr("data-swiper-parallax-y"), i || s ? (i = i || "0", s = s || "0") : p() ? (i = r, s = "0") : (s = r, i = "0"), i.indexOf("%") >= 0 ? i = parseInt(i, 10) * n * o + "%" : i = i * n * o + "px", s.indexOf("%") >= 0 ? s = parseInt(s, 10) * n + "%" : s = s * n + "px", t.transform("translate3d(" + i + ", " + s + ",0px)")
            }

            function q(e) {
                return e.indexOf("on") !== 0 && (e[0] !== e[0].toUpperCase() ? e = "on" + e[0].toUpperCase() + e.substring(1) : e = "on" + e), e
            }

            if (this instanceof t) {
                var s = {
                    direction: "horizontal",
                    touchEventsTarget: "container",
                    initialSlide: 0,
                    speed: 300,
                    autoplay: !1,
                    autoplayDisableOnInteraction: !0,
                    iOSEdgeSwipeDetection: !1,
                    iOSEdgeSwipeThreshold: 20,
                    freeMode: !1,
                    freeModeMomentum: !0,
                    freeModeMomentumRatio: 1,
                    freeModeMomentumBounce: !0,
                    freeModeMomentumBounceRatio: 1,
                    freeModeSticky: !1,
                    freeModeMinimumVelocity: .02,
                    autoHeight: !1,
                    setWrapperSize: !1,
                    virtualTranslate: !1,
                    effect: "slide",
                    coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
                    cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
                    fade: {crossFade: !1},
                    parallax: !1,
                    scrollbar: null,
                    scrollbarHide: !0,
                    scrollbarDraggable: !1,
                    scrollbarSnapOnRelease: !1,
                    keyboardControl: !1,
                    mousewheelControl: !1,
                    mousewheelReleaseOnEdges: !1,
                    mousewheelInvert: !1,
                    mousewheelForceToAxis: !1,
                    mousewheelSensitivity: 1,
                    hashnav: !1,
                    breakpoints: undefined,
                    spaceBetween: 0,
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: "column",
                    slidesPerGroup: 1,
                    centeredSlides: !1,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                    roundLengths: !1,
                    touchRatio: 1,
                    touchAngle: 45,
                    simulateTouch: !0,
                    shortSwipes: !0,
                    longSwipes: !0,
                    longSwipesRatio: .5,
                    longSwipesMs: 300,
                    followFinger: !0,
                    onlyExternal: !1,
                    threshold: 0,
                    touchMoveStopPropagation: !0,
                    pagination: null,
                    paginationElement: "span",
                    paginationClickable: !1,
                    paginationHide: !1,
                    paginationBulletRender: null,
                    resistance: !0,
                    resistanceRatio: .85,
                    nextButton: null,
                    prevButton: null,
                    watchSlidesProgress: !1,
                    watchSlidesVisibility: !1,
                    grabCursor: !1,
                    preventClicks: !0,
                    preventClicksPropagation: !0,
                    slideToClickedSlide: !1,
                    lazyLoading: !1,
                    lazyLoadingInPrevNext: !1,
                    lazyLoadingOnTransitionStart: !1,
                    preloadImages: !0,
                    updateOnImagesReady: !0,
                    loop: !1,
                    loopAdditionalSlides: 0,
                    loopedSlides: null,
                    control: undefined,
                    controlInverse: !1,
                    controlBy: "slide",
                    allowSwipeToPrev: !0,
                    allowSwipeToNext: !0,
                    swipeHandler: null,
                    noSwiping: !0,
                    noSwipingClass: "swiper-no-swiping",
                    slideClass: "swiper-slide",
                    slideActiveClass: "swiper-slide-active",
                    slideVisibleClass: "swiper-slide-visible",
                    slideDuplicateClass: "swiper-slide-duplicate",
                    slideNextClass: "swiper-slide-next",
                    slidePrevClass: "swiper-slide-prev",
                    wrapperClass: "swiper-wrapper",
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    buttonDisabledClass: "swiper-button-disabled",
                    paginationHiddenClass: "swiper-pagination-hidden",
                    observer: !1,
                    observeParents: !1,
                    a11y: !1,
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}",
                    runCallbacksOnInit: !0
                }, o = i && i.virtualTranslate;
                i = i || {};
                var u = {};
                for (var a in i)if (typeof i[a] == "object") {
                    u[a] = {};
                    for (var f in i[a])u[a][f] = i[a][f]
                } else u[a] = i[a];
                for (var l in s)if (typeof i[l] == "undefined") i[l] = s[l]; else if (typeof i[l] == "object")for (var c in s[l])typeof i[l][c] == "undefined" && (i[l][c] = s[l][c]);
                var h = this;
                h.params = i, h.originalParams = u, h.classNames = [], typeof e != "undefined" && typeof n != "undefined" && (e = n);
                if (typeof e == "undefined") {
                    typeof n == "undefined" ? e = window.Dom7 || window.Zepto || window.jQuery : e = n;
                    if (!e)return
                }
                h.$ = e, h.currentBreakpoint = undefined, h.getActiveBreakpoint = function () {
                    if (!h.params.breakpoints)return !1;
                    var e = !1, t = [], n;
                    for (n in h.params.breakpoints)h.params.breakpoints.hasOwnProperty(n) && t.push(n);
                    t.sort(function (e, t) {
                        return parseInt(e, 10) > parseInt(t, 10)
                    });
                    for (var r = 0; r < t.length; r++)n = t[r], n >= window.innerWidth && !e && (e = n);
                    return e || "max"
                }, h.setBreakpoint = function () {
                    var e = h.getActiveBreakpoint();
                    if (e && h.currentBreakpoint !== e) {
                        var t = e in h.params.breakpoints ? h.params.breakpoints[e] : h.originalParams;
                        for (var n in t)h.params[n] = t[n];
                        h.currentBreakpoint = e
                    }
                }, h.params.breakpoints && h.setBreakpoint(), h.container = e(r);
                if (h.container.length === 0)return;
                if (h.container.length > 1) {
                    h.container.each(function () {
                        new t(this, i)
                    });
                    return
                }
                h.container[0].swiper = h, h.container.data("swiper", h), h.classNames.push("swiper-container-" + h.params.direction), h.params.freeMode && h.classNames.push("swiper-container-free-mode"), h.support.flexbox || (h.classNames.push("swiper-container-no-flexbox"), h.params.slidesPerColumn = 1), h.params.autoHeight && h.classNames.push("swiper-container-autoheight");
                if (h.params.parallax || h.params.watchSlidesVisibility) h.params.watchSlidesProgress = !0;
                ["cube", "coverflow"].indexOf(h.params.effect) >= 0 && (h.support.transforms3d ? (h.params.watchSlidesProgress = !0, h.classNames.push("swiper-container-3d")) : h.params.effect = "slide"), h.params.effect !== "slide" && h.classNames.push("swiper-container-" + h.params.effect), h.params.effect === "cube" && (h.params.resistanceRatio = 0, h.params.slidesPerView = 1, h.params.slidesPerColumn = 1, h.params.slidesPerGroup = 1, h.params.centeredSlides = !1, h.params.spaceBetween = 0, h.params.virtualTranslate = !0, h.params.setWrapperSize = !1), h.params.effect === "fade" && (h.params.slidesPerView = 1, h.params.slidesPerColumn = 1, h.params.slidesPerGroup = 1, h.params.watchSlidesProgress = !0, h.params.spaceBetween = 0, typeof o == "undefined" && (h.params.virtualTranslate = !0)), h.params.grabCursor && h.support.touch && (h.params.grabCursor = !1), h.wrapper = h.container.children("." + h.params.wrapperClass), h.params.pagination && (h.paginationContainer = e(h.params.pagination), h.params.paginationClickable && h.paginationContainer.addClass("swiper-pagination-clickable")), h.rtl = p() && (h.container[0].dir.toLowerCase() === "rtl" || h.container.css("direction") === "rtl"), h.rtl && h.classNames.push("swiper-container-rtl"), h.rtl && (h.wrongRTL = h.wrapper.css("display") === "-webkit-box"), h.params.slidesPerColumn > 1 && h.classNames.push("swiper-container-multirow"), h.device.android && h.classNames.push("swiper-container-android"), h.container.addClass(h.classNames.join(" ")), h.translate = 0, h.progress = 0, h.velocity = 0, h.lockSwipeToNext = function () {
                    h.params.allowSwipeToNext = !1
                }, h.lockSwipeToPrev = function () {
                    h.params.allowSwipeToPrev = !1
                }, h.lockSwipes = function () {
                    h.params.allowSwipeToNext = h.params.allowSwipeToPrev = !1
                }, h.unlockSwipeToNext = function () {
                    h.params.allowSwipeToNext = !0
                }, h.unlockSwipeToPrev = function () {
                    h.params.allowSwipeToPrev = !0
                }, h.unlockSwipes = function () {
                    h.params.allowSwipeToNext = h.params.allowSwipeToPrev = !0
                }, h.params.grabCursor && (h.container[0].style.cursor = "move", h.container[0].style.cursor = "-webkit-grab", h.container[0].style.cursor = "-moz-grab", h.container[0].style.cursor = "grab"), h.imagesToLoad = [], h.imagesLoaded = 0, h.loadImage = function (e, t, n, r, i) {
                    function o() {
                        i && i()
                    }

                    var s;
                    !e.complete || !r ? t ? (s = new window.Image, s.onload = o, s.onerror = o, n && (s.srcset = n), t && (s.src = t)) : o() : o()
                }, h.preloadImages = function () {
                    function e() {
                        if (typeof h == "undefined" || h === null)return;
                        h.imagesLoaded !== undefined && h.imagesLoaded++, h.imagesLoaded === h.imagesToLoad.length && (h.params.updateOnImagesReady && h.update(), h.emit("onImagesReady", h))
                    }

                    h.imagesToLoad = h.container.find("img");
                    for (var t = 0; t < h.imagesToLoad.length; t++)h.loadImage(h.imagesToLoad[t], h.imagesToLoad[t].currentSrc || h.imagesToLoad[t].getAttribute("src"), h.imagesToLoad[t].srcset || h.imagesToLoad[t].getAttribute("srcset"), !0, e)
                }, h.autoplayTimeoutId = undefined, h.autoplaying = !1, h.autoplayPaused = !1, h.startAutoplay = function () {
                    if (typeof h.autoplayTimeoutId != "undefined")return !1;
                    if (!h.params.autoplay)return !1;
                    if (h.autoplaying)return !1;
                    h.autoplaying = !0, h.emit("onAutoplayStart", h), v()
                }, h.stopAutoplay = function (e) {
                    if (!h.autoplayTimeoutId)return;
                    h.autoplayTimeoutId && clearTimeout(h.autoplayTimeoutId), h.autoplaying = !1, h.autoplayTimeoutId = undefined, h.emit("onAutoplayStop", h)
                }, h.pauseAutoplay = function (e) {
                    if (h.autoplayPaused)return;
                    h.autoplayTimeoutId && clearTimeout(h.autoplayTimeoutId), h.autoplayPaused = !0, e === 0 ? (h.autoplayPaused = !1, v()) : h.wrapper.transitionEnd(function () {
                        if (!h)return;
                        h.autoplayPaused = !1, h.autoplaying ? v() : h.stopAutoplay()
                    })
                }, h.minTranslate = function () {
                    return -h.snapGrid[0]
                }, h.maxTranslate = function () {
                    return -h.snapGrid[h.snapGrid.length - 1]
                }, h.updateAutoHeight = function () {
                    var e = h.slides.eq(h.activeIndex)[0].offsetHeight;
                    e && h.wrapper.css("height", h.slides.eq(h.activeIndex)[0].offsetHeight + "px")
                }, h.updateContainerSize = function () {
                    var e, t;
                    typeof h.params.width != "undefined" ? e = h.params.width : e = h.container[0].clientWidth, typeof h.params.height != "undefined" ? t = h.params.height : t = h.container[0].clientHeight;
                    if (e === 0 && p() || t === 0 && !p())return;
                    e = e - parseInt(h.container.css("padding-left"), 10) - parseInt(h.container.css("padding-right"), 10), t = t - parseInt(h.container.css("padding-top"), 10) - parseInt(h.container.css("padding-bottom"), 10), h.width = e, h.height = t, h.size = p() ? h.width : h.height
                }, h.updateSlidesSize = function () {
                    h.slides = h.wrapper.children("." + h.params.slideClass), h.snapGrid = [], h.slidesGrid = [], h.slidesSizesGrid = [];
                    var e = h.params.spaceBetween, t = -h.params.slidesOffsetBefore, n, r = 0, i = 0;
                    typeof e == "string" && e.indexOf("%") >= 0 && (e = parseFloat(e.replace("%", "")) / 100 * h.size), h.virtualSize = -e, h.rtl ? h.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : h.slides.css({marginRight: "", marginBottom: ""});
                    var s;
                    h.params.slidesPerColumn > 1 && (Math.floor(h.slides.length / h.params.slidesPerColumn) === h.slides.length / h.params.slidesPerColumn ? s = h.slides.length : s = Math.ceil(h.slides.length / h.params.slidesPerColumn) * h.params.slidesPerColumn, h.params.slidesPerView !== "auto" && h.params.slidesPerColumnFill === "row" && (s = Math.max(s, h.params.slidesPerView * h.params.slidesPerColumn)));
                    var o, u = h.params.slidesPerColumn, a = s / u, f = a - (h.params.slidesPerColumn * a - h.slides.length);
                    for (n = 0; n < h.slides.length; n++) {
                        o = 0;
                        var l = h.slides.eq(n);
                        if (h.params.slidesPerColumn > 1) {
                            var c, v, m;
                            h.params.slidesPerColumnFill === "column" ? (v = Math.floor(n / u), m = n - v * u, (v > f || v === f && m === u - 1) && ++m >= u && (m = 0, v++), c = v + m * s / u, l.css({
                                "-webkit-box-ordinal-group": c,
                                "-moz-box-ordinal-group": c,
                                "-ms-flex-order": c,
                                "-webkit-order": c,
                                order: c
                            })) : (m = Math.floor(n / a), v = n - m * a), l.css({"margin-top": m !== 0 && h.params.spaceBetween && h.params.spaceBetween + "px"}).attr("data-swiper-column", v).attr("data-swiper-row", m)
                        }
                        if (l.css("display") === "none")continue;
                        h.params.slidesPerView === "auto" ? (o = p() ? l.outerWidth(!0) : l.outerHeight(!0), h.params.roundLengths && (o = d(o))) : (o = (h.size - (h.params.slidesPerView - 1) * e) / h.params.slidesPerView, h.params.roundLengths && (o = d(o)), p() ? h.slides[n].style.width = o + "px" : h.slides[n].style.height = o + "px"), h.slides[n].swiperSlideSize = o, h.slidesSizesGrid.push(o), h.params.centeredSlides ? (t = t + o / 2 + r / 2 + e, n === 0 && (t = t - h.size / 2 - e), Math.abs(t) < .001 && (t = 0), i % h.params.slidesPerGroup === 0 && h.snapGrid.push(t), h.slidesGrid.push(t)) : (i % h.params.slidesPerGroup === 0 && h.snapGrid.push(t), h.slidesGrid.push(t), t = t + o + e), h.virtualSize += o + e, r = o, i++
                    }
                    h.virtualSize = Math.max(h.virtualSize, h.size) + h.params.slidesOffsetAfter;
                    var g;
                    h.rtl && h.wrongRTL && (h.params.effect === "slide" || h.params.effect === "coverflow") && h.wrapper.css({width: h.virtualSize + h.params.spaceBetween + "px"});
                    if (!h.support.flexbox || h.params.setWrapperSize) p() ? h.wrapper.css({width: h.virtualSize + h.params.spaceBetween + "px"}) : h.wrapper.css({height: h.virtualSize + h.params.spaceBetween + "px"});
                    if (h.params.slidesPerColumn > 1) {
                        h.virtualSize = (o + h.params.spaceBetween) * s, h.virtualSize = Math.ceil(h.virtualSize / h.params.slidesPerColumn) - h.params.spaceBetween, h.wrapper.css({width: h.virtualSize + h.params.spaceBetween + "px"});
                        if (h.params.centeredSlides) {
                            g = [];
                            for (n = 0; n < h.snapGrid.length; n++)h.snapGrid[n] < h.virtualSize + h.snapGrid[0] && g.push(h.snapGrid[n]);
                            h.snapGrid = g
                        }
                    }
                    if (!h.params.centeredSlides) {
                        g = [];
                        for (n = 0; n < h.snapGrid.length; n++)h.snapGrid[n] <= h.virtualSize - h.size && g.push(h.snapGrid[n]);
                        h.snapGrid = g, Math.floor(h.virtualSize - h.size) > Math.floor(h.snapGrid[h.snapGrid.length - 1]) && h.snapGrid.push(h.virtualSize - h.size)
                    }
                    h.snapGrid.length === 0 && (h.snapGrid = [0]), h.params.spaceBetween !== 0 && (p() ? h.rtl ? h.slides.css({marginLeft: e + "px"}) : h.slides.css({marginRight: e + "px"}) : h.slides.css({marginBottom: e + "px"})), h.params.watchSlidesProgress && h.updateSlidesOffset()
                }, h.updateSlidesOffset = function () {
                    for (var e = 0; e < h.slides.length; e++)h.slides[e].swiperSlideOffset = p() ? h.slides[e].offsetLeft : h.slides[e].offsetTop
                }, h.updateSlidesProgress = function (e) {
                    typeof e == "undefined" && (e = h.translate || 0);
                    if (h.slides.length === 0)return;
                    typeof h.slides[0].swiperSlideOffset == "undefined" && h.updateSlidesOffset();
                    var t = -e;
                    h.rtl && (t = e), h.slides.removeClass(h.params.slideVisibleClass);
                    for (var n = 0; n < h.slides.length; n++) {
                        var r = h.slides[n], i = (t - r.swiperSlideOffset) / (r.swiperSlideSize + h.params.spaceBetween);
                        if (h.params.watchSlidesVisibility) {
                            var s = -(t - r.swiperSlideOffset), o = s + h.slidesSizesGrid[n], u = s >= 0 && s < h.size || o > 0 && o <= h.size || s <= 0 && o >= h.size;
                            u && h.slides.eq(n).addClass(h.params.slideVisibleClass)
                        }
                        r.progress = h.rtl ? -i : i
                    }
                }, h.updateProgress = function (e) {
                    typeof e == "undefined" && (e = h.translate || 0);
                    var t = h.maxTranslate() - h.minTranslate(), n = h.isBeginning, r = h.isEnd;
                    t === 0 ? (h.progress = 0, h.isBeginning = h.isEnd = !0) : (h.progress = (e - h.minTranslate()) / t, h.isBeginning = h.progress <= 0, h.isEnd = h.progress >= 1), h.isBeginning && !n && h.emit("onReachBeginning", h), h.isEnd && !r && h.emit("onReachEnd", h), h.params.watchSlidesProgress && h.updateSlidesProgress(e), h.emit("onProgress", h, h.progress)
                }, h.updateActiveIndex = function () {
                    var e = h.rtl ? h.translate : -h.translate, t, n, r;
                    for (n = 0; n < h.slidesGrid.length; n++)typeof h.slidesGrid[n + 1] != "undefined" ? e >= h.slidesGrid[n] && e < h.slidesGrid[n + 1] - (h.slidesGrid[n + 1] - h.slidesGrid[n]) / 2 ? t = n : e >= h.slidesGrid[n] && e < h.slidesGrid[n + 1] && (t = n + 1) : e >= h.slidesGrid[n] && (t = n);
                    if (t < 0 || typeof t == "undefined") t = 0;
                    r = Math.floor(t / h.params.slidesPerGroup), r >= h.snapGrid.length && (r = h.snapGrid.length - 1);
                    if (t === h.activeIndex)return;
                    h.snapIndex = r, h.previousIndex = h.activeIndex, h.activeIndex = t, h.updateClasses()
                }, h.updateClasses = function () {
                    h.slides.removeClass(h.params.slideActiveClass + " " + h.params.slideNextClass + " " + h.params.slidePrevClass);
                    var t = h.slides.eq(h.activeIndex);
                    t.addClass(h.params.slideActiveClass), t.next("." + h.params.slideClass).addClass(h.params.slideNextClass), t.prev("." + h.params.slideClass).addClass(h.params.slidePrevClass);
                    if (h.bullets && h.bullets.length > 0) {
                        h.bullets.removeClass(h.params.bulletActiveClass);
                        var n;
                        h.params.loop ? (n = Math.ceil(h.activeIndex - h.loopedSlides) / h.params.slidesPerGroup, n > h.slides.length - 1 - h.loopedSlides * 2 && (n -= h.slides.length - h.loopedSlides * 2), n > h.bullets.length - 1 && (n -= h.bullets.length)) : typeof h.snapIndex != "undefined" ? n = h.snapIndex : n = h.activeIndex || 0, h.paginationContainer.length > 1 ? h.bullets.each(function () {
                            e(this).index() === n && e(this).addClass(h.params.bulletActiveClass)
                        }) : h.bullets.eq(n).addClass(h.params.bulletActiveClass)
                    }
                    h.params.loop || (h.params.prevButton && (h.isBeginning ? (e(h.params.prevButton).addClass(h.params.buttonDisabledClass), h.params.a11y && h.a11y && h.a11y.disable(e(h.params.prevButton))) : (e(h.params.prevButton).removeClass(h.params.buttonDisabledClass), h.params.a11y && h.a11y && h.a11y.enable(e(h.params.prevButton)))), h.params.nextButton && (h.isEnd ? (e(h.params.nextButton).addClass(h.params.buttonDisabledClass), h.params.a11y && h.a11y && h.a11y.disable(e(h.params.nextButton))) : (e(h.params.nextButton).removeClass(h.params.buttonDisabledClass), h.params.a11y && h.a11y && h.a11y.enable(e(h.params.nextButton)))))
                }, h.updatePagination = function () {
                    if (!h.params.pagination)return;
                    if (h.paginationContainer && h.paginationContainer.length > 0) {
                        var e = "", t = h.params.loop ? Math.ceil((h.slides.length - h.loopedSlides * 2) / h.params.slidesPerGroup) : h.snapGrid.length;
                        for (var n = 0; n < t; n++)h.params.paginationBulletRender ? e += h.params.paginationBulletRender(n, h.params.bulletClass) : e += "<" + h.params.paginationElement + ' class="' + h.params.bulletClass + '"></' + h.params.paginationElement + ">";
                        h.paginationContainer.html(e), h.bullets = h.paginationContainer.find("." + h.params.bulletClass), h.params.paginationClickable && h.params.a11y && h.a11y && h.a11y.initPagination()
                    }
                }, h.update = function (e) {
                    function t() {
                        r = Math.min(Math.max(h.translate, h.maxTranslate()), h.minTranslate()), h.setWrapperTranslate(r), h.updateActiveIndex(), h.updateClasses()
                    }

                    h.updateContainerSize(), h.updateSlidesSize(), h.updateProgress(), h.updatePagination(), h.updateClasses(), h.params.scrollbar && h.scrollbar && h.scrollbar.set();
                    if (e) {
                        var n, r;
                        h.controller && h.controller.spline && (h.controller.spline = undefined), h.params.freeMode ? (t(), h.params.autoHeight && h.updateAutoHeight()) : ((h.params.slidesPerView === "auto" || h.params.slidesPerView > 1) && h.isEnd && !h.params.centeredSlides ? n = h.slideTo(h.slides.length - 1, 0, !1, !0) : n = h.slideTo(h.activeIndex, 0, !1, !0), n || t())
                    } else h.params.autoHeight && h.updateAutoHeight()
                }, h.onResize = function (e) {
                    h.params.breakpoints && h.setBreakpoint();
                    var t = h.params.allowSwipeToPrev, n = h.params.allowSwipeToNext;
                    h.params.allowSwipeToPrev = h.params.allowSwipeToNext = !0, h.updateContainerSize(), h.updateSlidesSize(), (h.params.slidesPerView === "auto" || h.params.freeMode || e) && h.updatePagination(), h.params.scrollbar && h.scrollbar && h.scrollbar.set(), h.controller && h.controller.spline && (h.controller.spline = undefined);
                    if (h.params.freeMode) {
                        var r = Math.min(Math.max(h.translate, h.maxTranslate()), h.minTranslate());
                        h.setWrapperTranslate(r), h.updateActiveIndex(), h.updateClasses(), h.params.autoHeight && h.updateAutoHeight()
                    } else h.updateClasses(), (h.params.slidesPerView === "auto" || h.params.slidesPerView > 1) && h.isEnd && !h.params.centeredSlides ? h.slideTo(h.slides.length - 1, 0, !1, !0) : h.slideTo(h.activeIndex, 0, !1, !0);
                    h.params.allowSwipeToPrev = t, h.params.allowSwipeToNext = n
                };
                var m = ["mousedown", "mousemove", "mouseup"];
                window.navigator.pointerEnabled ? m = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (m = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), h.touchEvents = {
                    start: h.support.touch || !h.params.simulateTouch ? "touchstart" : m[0],
                    move: h.support.touch || !h.params.simulateTouch ? "touchmove" : m[1],
                    end: h.support.touch || !h.params.simulateTouch ? "touchend" : m[2]
                }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && (h.params.touchEventsTarget === "container" ? h.container : h.wrapper).addClass("swiper-wp8-" + h.params.direction), h.initEvents = function (t) {
                    var n = t ? "off" : "on", r = t ? "removeEventListener" : "addEventListener", s = h.params.touchEventsTarget === "container" ? h.container[0] : h.wrapper[0], o = h.support.touch ? s : document, u = h.params.nested ? !0 : !1;
                    h.browser.ie ? (s[r](h.touchEvents.start, h.onTouchStart, !1), o[r](h.touchEvents.move, h.onTouchMove, u), o[r](h.touchEvents.end, h.onTouchEnd, !1)) : (h.support.touch && (s[r](h.touchEvents.start, h.onTouchStart, !1), s[r](h.touchEvents.move, h.onTouchMove, u), s[r](h.touchEvents.end, h.onTouchEnd, !1)), i.simulateTouch && !h.device.ios && !h.device.android && (s[r]("mousedown", h.onTouchStart, !1), document[r]("mousemove", h.onTouchMove, u), document[r]("mouseup", h.onTouchEnd, !1))), window[r]("resize", h.onResize), h.params.nextButton && (e(h.params.nextButton)[n]("click", h.onClickNext), h.params.a11y && h.a11y && e(h.params.nextButton)[n]("keydown", h.a11y.onEnterKey)), h.params.prevButton && (e(h.params.prevButton)[n]("click", h.onClickPrev), h.params.a11y && h.a11y && e(h.params.prevButton)[n]("keydown", h.a11y.onEnterKey)), h.params.pagination && h.params.paginationClickable && (e(h.paginationContainer)[n]("click", "." + h.params.bulletClass, h.onClickIndex), h.params.a11y && h.a11y && e(h.paginationContainer)[n]("keydown", "." + h.params.bulletClass, h.a11y.onEnterKey)), (h.params.preventClicks || h.params.preventClicksPropagation) && s[r]("click", h.preventClicks, !0)
                }, h.attachEvents = function (e) {
                    h.initEvents()
                }, h.detachEvents = function () {
                    h.initEvents(!0)
                }, h.allowClick = !0, h.preventClicks = function (e) {
                    h.allowClick || (h.params.preventClicks && e.preventDefault(), h.params.preventClicksPropagation && h.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                }, h.onClickNext = function (e) {
                    e.preventDefault();
                    if (h.isEnd && !h.params.loop)return;
                    h.slideNext()
                }, h.onClickPrev = function (e) {
                    e.preventDefault();
                    if (h.isBeginning && !h.params.loop)return;
                    h.slidePrev()
                }, h.onClickIndex = function (t) {
                    t.preventDefault();
                    var n = e(this).index() * h.params.slidesPerGroup;
                    h.params.loop && (n += h.loopedSlides), h.slideTo(n)
                }, h.updateClickedSlide = function (t) {
                    var n = g(t, "." + h.params.slideClass), r = !1;
                    if (n)for (var i = 0; i < h.slides.length; i++)h.slides[i] === n && (r = !0);
                    if (!n || !r) {
                        h.clickedSlide = undefined, h.clickedIndex = undefined;
                        return
                    }
                    h.clickedSlide = n, h.clickedIndex = e(n).index();
                    if (h.params.slideToClickedSlide && h.clickedIndex !== undefined && h.clickedIndex !== h.activeIndex) {
                        var s = h.clickedIndex, o, u;
                        if (h.params.loop) {
                            if (h.animating)return;
                            o = e(h.clickedSlide).attr("data-swiper-slide-index"), h.params.centeredSlides ? s < h.loopedSlides - h.params.slidesPerView / 2 || s > h.slides.length - h.loopedSlides + h.params.slidesPerView / 2 ? (h.fixLoop(), s = h.wrapper.children("." + h.params.slideClass + '[data-swiper-slide-index="' + o + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                                h.slideTo(s)
                            }, 0)) : h.slideTo(s) : s > h.slides.length - h.params.slidesPerView ? (h.fixLoop(), s = h.wrapper.children("." + h.params.slideClass + '[data-swiper-slide-index="' + o + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                                h.slideTo(s)
                            }, 0)) : h.slideTo(s)
                        } else h.slideTo(s)
                    }
                };
                var y, b, w, E, S, x, T, N, C = "input, select, textarea, button", k = Date.now(), L, A = [], O;
                h.animating = !1, h.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
                var M, _;
                h.onTouchStart = function (t) {
                    t.originalEvent && (t = t.originalEvent), M = t.type === "touchstart";
                    if (!M && "which" in t && t.which === 3)return;
                    if (h.params.noSwiping && g(t, "." + h.params.noSwipingClass)) {
                        h.allowClick = !0;
                        return
                    }
                    if (h.params.swipeHandler && !g(t, h.params.swipeHandler))return;
                    var n = h.touches.currentX = t.type === "touchstart" ? t.targetTouches[0].pageX : t.pageX, r = h.touches.currentY = t.type === "touchstart" ? t.targetTouches[0].pageY : t.pageY;
                    if (h.device.ios && h.params.iOSEdgeSwipeDetection && n <= h.params.iOSEdgeSwipeThreshold)return;
                    y = !0, b = !1, w = !0, S = undefined, _ = undefined, h.touches.startX = n, h.touches.startY = r, E = Date.now(), h.allowClick = !0, h.updateContainerSize(), h.swipeDirection = undefined, h.params.threshold > 0 && (N = !1);
                    if (t.type !== "touchstart") {
                        var i = !0;
                        e(t.target).is(C) && (i = !1), document.activeElement && e(document.activeElement).is(C) && document.activeElement.blur(), i && t.preventDefault()
                    }
                    h.emit("onTouchStart", h, t)
                }, h.onTouchMove = function (t) {
                    t.originalEvent && (t = t.originalEvent);
                    if (M && t.type === "mousemove")return;
                    if (t.preventedByNestedSwiper)return;
                    if (h.params.onlyExternal) {
                        h.allowClick = !1, y && (h.touches.startX = h.touches.currentX = t.type === "touchmove" ? t.targetTouches[0].pageX : t.pageX, h.touches.startY = h.touches.currentY = t.type === "touchmove" ? t.targetTouches[0].pageY : t.pageY, E = Date.now());
                        return
                    }
                    if (M && document.activeElement && t.target === document.activeElement && e(t.target).is(C)) {
                        b = !0, h.allowClick = !1;
                        return
                    }
                    w && h.emit("onTouchMove", h, t);
                    if (t.targetTouches && t.targetTouches.length > 1)return;
                    h.touches.currentX = t.type === "touchmove" ? t.targetTouches[0].pageX : t.pageX, h.touches.currentY = t.type === "touchmove" ? t.targetTouches[0].pageY : t.pageY;
                    if (typeof S == "undefined") {
                        var n = Math.atan2(Math.abs(h.touches.currentY - h.touches.startY), Math.abs(h.touches.currentX - h.touches.startX)) * 180 / Math.PI;
                        S = p() ? n > h.params.touchAngle : 90 - n > h.params.touchAngle
                    }
                    S && h.emit("onTouchMoveOpposite", h, t), typeof _ == "undefined" && h.browser.ieTouch && (h.touches.currentX !== h.touches.startX || h.touches.currentY !== h.touches.startY) && (_ = !0);
                    if (!y)return;
                    if (S) {
                        y = !1;
                        return
                    }
                    if (!_ && h.browser.ieTouch)return;
                    h.allowClick = !1, h.emit("onSliderMove", h, t), t.preventDefault(), h.params.touchMoveStopPropagation && !h.params.nested && t.stopPropagation(), b || (i.loop && h.fixLoop(), T = h.getWrapperTranslate(), h.setWrapperTransition(0), h.animating && h.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), h.params.autoplay && h.autoplaying && (h.params.autoplayDisableOnInteraction ? h.stopAutoplay() : h.pauseAutoplay()), O = !1, h.params.grabCursor && (h.container[0].style.cursor = "move", h.container[0].style.cursor = "-webkit-grabbing", h.container[0].style.cursor = "-moz-grabbin", h.container[0].style.cursor = "grabbing")), b = !0;
                    var r = h.touches.diff = p() ? h.touches.currentX - h.touches.startX : h.touches.currentY - h.touches.startY;
                    r *= h.params.touchRatio, h.rtl && (r = -r), h.swipeDirection = r > 0 ? "prev" : "next", x = r + T;
                    var s = !0;
                    r > 0 && x > h.minTranslate() ? (s = !1, h.params.resistance && (x = h.minTranslate() - 1 + Math.pow(-h.minTranslate() + T + r, h.params.resistanceRatio))) : r < 0 && x < h.maxTranslate() && (s = !1, h.params.resistance && (x = h.maxTranslate() + 1 - Math.pow(h.maxTranslate() - T - r, h.params.resistanceRatio))), s && (t.preventedByNestedSwiper = !0), !h.params.allowSwipeToNext && h.swipeDirection === "next" && x < T && (x = T), !h.params.allowSwipeToPrev && h.swipeDirection === "prev" && x > T && (x = T);
                    if (!h.params.followFinger)return;
                    if (h.params.threshold > 0) {
                        if (!(Math.abs(r) > h.params.threshold || N)) {
                            x = T;
                            return
                        }
                        if (!N) {
                            N = !0, h.touches.startX = h.touches.currentX, h.touches.startY = h.touches.currentY, x = T, h.touches.diff = p() ? h.touches.currentX - h.touches.startX : h.touches.currentY - h.touches.startY;
                            return
                        }
                    }
                    (h.params.freeMode || h.params.watchSlidesProgress) && h.updateActiveIndex(), h.params.freeMode && (A.length === 0 && A.push({
                        position: h.touches[p() ? "startX" : "startY"],
                        time: E
                    }), A.push({
                        position: h.touches[p() ? "currentX" : "currentY"],
                        time: (new window.Date).getTime()
                    })), h.updateProgress(x), h.setWrapperTranslate(x)
                }, h.onTouchEnd = function (t) {
                    t.originalEvent && (t = t.originalEvent), w && h.emit("onTouchEnd", h, t), w = !1;
                    if (!y)return;
                    h.params.grabCursor && b && y && (h.container[0].style.cursor = "move", h.container[0].style.cursor = "-webkit-grab", h.container[0].style.cursor = "-moz-grab", h.container[0].style.cursor = "grab");
                    var n = Date.now(), r = n - E;
                    h.allowClick && (h.updateClickedSlide(t), h.emit("onTap", h, t), r < 300 && n - k > 300 && (L && clearTimeout(L), L = setTimeout(function () {
                        if (!h)return;
                        h.params.paginationHide && h.paginationContainer.length > 0 && !e(t.target).hasClass(h.params.bulletClass) && h.paginationContainer.toggleClass(h.params.paginationHiddenClass), h.emit("onClick", h, t)
                    }, 300)), r < 300 && n - k < 300 && (L && clearTimeout(L), h.emit("onDoubleTap", h, t))), k = Date.now(), setTimeout(function () {
                        h && (h.allowClick = !0)
                    }, 0);
                    if (!y || !b || !h.swipeDirection || h.touches.diff === 0 || x === T) {
                        y = b = !1;
                        return
                    }
                    y = b = !1;
                    var i;
                    h.params.followFinger ? i = h.rtl ? h.translate : -h.translate : i = -x;
                    if (h.params.freeMode) {
                        if (i < -h.minTranslate()) {
                            h.slideTo(h.activeIndex);
                            return
                        }
                        if (i > -h.maxTranslate()) {
                            h.slides.length < h.snapGrid.length ? h.slideTo(h.snapGrid.length - 1) : h.slideTo(h.slides.length - 1);
                            return
                        }
                        if (h.params.freeModeMomentum) {
                            if (A.length > 1) {
                                var s = A.pop(), o = A.pop(), u = s.position - o.position, a = s.time - o.time;
                                h.velocity = u / a, h.velocity = h.velocity / 2, Math.abs(h.velocity) < h.params.freeModeMinimumVelocity && (h.velocity = 0);
                                if (a > 150 || (new window.Date).getTime() - s.time > 300) h.velocity = 0
                            } else h.velocity = 0;
                            A.length = 0;
                            var f = 1e3 * h.params.freeModeMomentumRatio, l = h.velocity * f, c = h.translate + l;
                            h.rtl && (c = -c);
                            var p = !1, d, v = Math.abs(h.velocity) * 20 * h.params.freeModeMomentumBounceRatio;
                            if (c < h.maxTranslate()) h.params.freeModeMomentumBounce ? (c + h.maxTranslate() < -v && (c = h.maxTranslate() - v), d = h.maxTranslate(), p = !0, O = !0) : c = h.maxTranslate(); else if (c > h.minTranslate()) h.params.freeModeMomentumBounce ? (c - h.minTranslate() > v && (c = h.minTranslate() + v), d = h.minTranslate(), p = !0, O = !0) : c = h.minTranslate(); else if (h.params.freeModeSticky) {
                                var m = 0, g;
                                for (m = 0; m < h.snapGrid.length; m += 1)if (h.snapGrid[m] > -c) {
                                    g = m;
                                    break
                                }
                                Math.abs(h.snapGrid[g] - c) < Math.abs(h.snapGrid[g - 1] - c) || h.swipeDirection === "next" ? c = h.snapGrid[g] : c = h.snapGrid[g - 1], h.rtl || (c = -c)
                            }
                            if (h.velocity !== 0) h.rtl ? f = Math.abs((-c - h.translate) / h.velocity) : f = Math.abs((c - h.translate) / h.velocity); else if (h.params.freeModeSticky) {
                                h.slideReset();
                                return
                            }
                            h.params.freeModeMomentumBounce && p ? (h.updateProgress(d), h.setWrapperTransition(f), h.setWrapperTranslate(c), h.onTransitionStart(), h.animating = !0, h.wrapper.transitionEnd(function () {
                                if (!h || !O)return;
                                h.emit("onMomentumBounce", h), h.setWrapperTransition(h.params.speed), h.setWrapperTranslate(d), h.wrapper.transitionEnd(function () {
                                    if (!h)return;
                                    h.onTransitionEnd()
                                })
                            })) : h.velocity ? (h.updateProgress(c), h.setWrapperTransition(f), h.setWrapperTranslate(c), h.onTransitionStart(), h.animating || (h.animating = !0, h.wrapper.transitionEnd(function () {
                                if (!h)return;
                                h.onTransitionEnd()
                            }))) : h.updateProgress(c), h.updateActiveIndex()
                        }
                        if (!h.params.freeModeMomentum || r >= h.params.longSwipesMs) h.updateProgress(), h.updateActiveIndex();
                        return
                    }
                    var S, N = 0, C = h.slidesSizesGrid[0];
                    for (S = 0; S < h.slidesGrid.length; S += h.params.slidesPerGroup)typeof h.slidesGrid[S + h.params.slidesPerGroup] != "undefined" ? i >= h.slidesGrid[S] && i < h.slidesGrid[S + h.params.slidesPerGroup] && (N = S, C = h.slidesGrid[S + h.params.slidesPerGroup] - h.slidesGrid[S]) : i >= h.slidesGrid[S] && (N = S, C = h.slidesGrid[h.slidesGrid.length - 1] - h.slidesGrid[h.slidesGrid.length - 2]);
                    var M = (i - h.slidesGrid[N]) / C;
                    if (r > h.params.longSwipesMs) {
                        if (!h.params.longSwipes) {
                            h.slideTo(h.activeIndex);
                            return
                        }
                        h.swipeDirection === "next" && (M >= h.params.longSwipesRatio ? h.slideTo(N + h.params.slidesPerGroup) : h.slideTo(N)), h.swipeDirection === "prev" && (M > 1 - h.params.longSwipesRatio ? h.slideTo(N + h.params.slidesPerGroup) : h.slideTo(N))
                    } else {
                        if (!h.params.shortSwipes) {
                            h.slideTo(h.activeIndex);
                            return
                        }
                        h.swipeDirection === "next" && h.slideTo(N + h.params.slidesPerGroup), h.swipeDirection === "prev" && h.slideTo(N)
                    }
                }, h._slideTo = function (e, t) {
                    return h.slideTo(e, t, !0, !0)
                }, h.slideTo = function (e, t, n, r) {
                    typeof n == "undefined" && (n = !0), typeof e == "undefined" && (e = 0), e < 0 && (e = 0), h.snapIndex = Math.floor(e / h.params.slidesPerGroup), h.snapIndex >= h.snapGrid.length && (h.snapIndex = h.snapGrid.length - 1);
                    var i = -h.snapGrid[h.snapIndex];
                    h.params.autoplay && h.autoplaying && (r || !h.params.autoplayDisableOnInteraction ? h.pauseAutoplay(t) : h.stopAutoplay()), h.updateProgress(i);
                    for (var s = 0; s < h.slidesGrid.length; s++)-Math.floor(i * 100) >= Math.floor(h.slidesGrid[s] * 100) && (e = s);
                    return !h.params.allowSwipeToNext && i < h.translate && i < h.minTranslate() ? !1 : !h.params.allowSwipeToPrev && i > h.translate && i > h.maxTranslate() && (h.activeIndex || 0) !== e ? !1 : (typeof t == "undefined" && (t = h.params.speed), h.previousIndex = h.activeIndex || 0, h.activeIndex = e, h.params.autoHeight && h.updateAutoHeight(), h.rtl && -i === h.translate || !h.rtl && i === h.translate ? (h.updateClasses(), h.params.effect !== "slide" && h.setWrapperTranslate(i), !1) : (h.updateClasses(), h.onTransitionStart(n), t === 0 ? (h.setWrapperTransition(0), h.setWrapperTranslate(i), h.onTransitionEnd(n)) : (h.setWrapperTransition(t), h.setWrapperTranslate(i), h.animating || (h.animating = !0, h.wrapper.transitionEnd(function () {
                        if (!h)return;
                        h.onTransitionEnd(n)
                    }))), !0))
                }, h.onTransitionStart = function (e) {
                    typeof e == "undefined" && (e = !0), h.lazy && h.lazy.onTransitionStart(), e && (h.emit("onTransitionStart", h), h.activeIndex !== h.previousIndex && (h.emit("onSlideChangeStart", h), h.activeIndex > h.previousIndex ? h.emit("onSlideNextStart", h) : h.emit("onSlidePrevStart", h)))
                }, h.onTransitionEnd = function (e) {
                    h.animating = !1, h.setWrapperTransition(0), typeof e == "undefined" && (e = !0), h.lazy && h.lazy.onTransitionEnd(), e && (h.emit("onTransitionEnd", h), h.activeIndex !== h.previousIndex && (h.emit("onSlideChangeEnd", h), h.activeIndex > h.previousIndex ? h.emit("onSlideNextEnd", h) : h.emit("onSlidePrevEnd", h))), h.params.hashnav && h.hashnav && h.hashnav.setHash()
                }, h.slideNext = function (e, t, n) {
                    if (h.params.loop) {
                        if (h.animating)return !1;
                        h.fixLoop();
                        var r = h.container[0].clientLeft;
                        return h.slideTo(h.activeIndex + h.params.slidesPerGroup, t, e, n)
                    }
                    return h.slideTo(h.activeIndex + h.params.slidesPerGroup, t, e, n)
                }, h._slideNext = function (e) {
                    return h.slideNext(!0, e, !0)
                }, h.slidePrev = function (e, t, n) {
                    if (h.params.loop) {
                        if (h.animating)return !1;
                        h.fixLoop();
                        var r = h.container[0].clientLeft;
                        return h.slideTo(h.activeIndex - 1, t, e, n)
                    }
                    return h.slideTo(h.activeIndex - 1, t, e, n)
                }, h._slidePrev = function (e) {
                    return h.slidePrev(!0, e, !0)
                }, h.slideReset = function (e, t, n) {
                    return h.slideTo(h.activeIndex, t, e)
                }, h.setWrapperTransition = function (e, t) {
                    h.wrapper.transition(e), h.params.effect !== "slide" && h.effects[h.params.effect] && h.effects[h.params.effect].setTransition(e), h.params.parallax && h.parallax && h.parallax.setTransition(e), h.params.scrollbar && h.scrollbar && h.scrollbar.setTransition(e), h.params.control && h.controller && h.controller.setTransition(e, t), h.emit("onSetTransition", h, e)
                }, h.setWrapperTranslate = function (e, t, n) {
                    var r = 0, i = 0, s = 0;
                    p() ? r = h.rtl ? -e : e : i = e, h.params.roundLengths && (r = d(r), i = d(i)), h.params.virtualTranslate || (h.support.transforms3d ? h.wrapper.transform("translate3d(" + r + "px, " + i + "px, " + s + "px)") : h.wrapper.transform("translate(" + r + "px, " + i + "px)")), h.translate = p() ? r : i;
                    var o, u = h.maxTranslate() - h.minTranslate();
                    u === 0 ? o = 0 : o = (e - h.minTranslate()) / u, o !== h.progress && h.updateProgress(e), t && h.updateActiveIndex(), h.params.effect !== "slide" && h.effects[h.params.effect] && h.effects[h.params.effect].setTranslate(h.translate), h.params.parallax && h.parallax && h.parallax.setTranslate(h.translate), h.params.scrollbar && h.scrollbar && h.scrollbar.setTranslate(h.translate), h.params.control && h.controller && h.controller.setTranslate(h.translate, n), h.emit("onSetTranslate", h, h.translate)
                }, h.getTranslate = function (e, t) {
                    var n, r, i, s;
                    return typeof t == "undefined" && (t = "x"), h.params.virtualTranslate ? h.rtl ? -h.translate : h.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (r = i.transform || i.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function (e) {
                        return e.replace(",", ".")
                    }).join(", ")), s = new window.WebKitCSSMatrix(r === "none" ? "" : r)) : (s = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), n = s.toString().split(",")), t === "x" && (window.WebKitCSSMatrix ? r = s.m41 : n.length === 16 ? r = parseFloat(n[12]) : r = parseFloat(n[4])), t === "y" && (window.WebKitCSSMatrix ? r = s.m42 : n.length === 16 ? r = parseFloat(n[13]) : r = parseFloat(n[5])), h.rtl && r && (r = -r), r || 0)
                }, h.getWrapperTranslate = function (e) {
                    return typeof e == "undefined" && (e = p() ? "x" : "y"), h.getTranslate(h.wrapper[0], e)
                }, h.observers = [], h.initObservers = function () {
                    if (h.params.observeParents) {
                        var e = h.container.parents();
                        for (var t = 0; t < e.length; t++)D(e[t])
                    }
                    D(h.container[0], {childList: !1}), D(h.wrapper[0], {attributes: !1})
                }, h.disconnectObservers = function () {
                    for (var e = 0; e < h.observers.length; e++)h.observers[e].disconnect();
                    h.observers = []
                }, h.createLoop = function () {
                    h.wrapper.children("." + h.params.slideClass + "." + h.params.slideDuplicateClass).remove();
                    var t = h.wrapper.children("." + h.params.slideClass);
                    h.params.slidesPerView === "auto" && !h.params.loopedSlides && (h.params.loopedSlides = t.length), h.loopedSlides = parseInt(h.params.loopedSlides || h.params.slidesPerView, 10), h.loopedSlides = h.loopedSlides + h.params.loopAdditionalSlides, h.loopedSlides > t.length && (h.loopedSlides = t.length);
                    var n = [], r = [], i;
                    t.each(function (i, s) {
                        var o = e(this);
                        i < h.loopedSlides && r.push(s), i < t.length && i >= t.length - h.loopedSlides && n.push(s), o.attr("data-swiper-slide-index", i)
                    });
                    for (i = 0; i < r.length; i++)h.wrapper.append(e(r[i].cloneNode(!0)).addClass(h.params.slideDuplicateClass));
                    for (i = n.length - 1; i >= 0; i--)h.wrapper.prepend(e(n[i].cloneNode(!0)).addClass(h.params.slideDuplicateClass))
                }, h.destroyLoop = function () {
                    h.wrapper.children("." + h.params.slideClass + "." + h.params.slideDuplicateClass).remove(), h.slides.removeAttr("data-swiper-slide-index")
                }, h.fixLoop = function () {
                    var e;
                    if (h.activeIndex < h.loopedSlides) e = h.slides.length - h.loopedSlides * 3 + h.activeIndex, e += h.loopedSlides, h.slideTo(e, 0, !1, !0); else if (h.params.slidesPerView === "auto" && h.activeIndex >= h.loopedSlides * 2 || h.activeIndex > h.slides.length - h.params.slidesPerView * 2) e = -h.slides.length + h.activeIndex + h.loopedSlides, e += h.loopedSlides, h.slideTo(e, 0, !1, !0)
                }, h.appendSlide = function (e) {
                    h.params.loop && h.destroyLoop();
                    if (typeof e == "object" && e.length)for (var t = 0; t < e.length; t++)e[t] && h.wrapper.append(e[t]); else h.wrapper.append(e);
                    h.params.loop && h.createLoop(), (!h.params.observer || !h.support.observer) && h.update(!0)
                }, h.prependSlide = function (e) {
                    h.params.loop && h.destroyLoop();
                    var t = h.activeIndex + 1;
                    if (typeof e == "object" && e.length) {
                        for (var n = 0; n < e.length; n++)e[n] && h.wrapper.prepend(e[n]);
                        t = h.activeIndex + e.length
                    } else h.wrapper.prepend(e);
                    h.params.loop && h.createLoop(), (!h.params.observer || !h.support.observer) && h.update(!0), h.slideTo(t, 0, !1)
                }, h.removeSlide = function (e) {
                    h.params.loop && (h.destroyLoop(), h.slides = h.wrapper.children("." + h.params.slideClass));
                    var t = h.activeIndex, n;
                    if (typeof e == "object" && e.length) {
                        for (var r = 0; r < e.length; r++)n = e[r], h.slides[n] && h.slides.eq(n).remove(), n < t && t--;
                        t = Math.max(t, 0)
                    } else n = e, h.slides[n] && h.slides.eq(n).remove(), n < t && t--, t = Math.max(t, 0);
                    h.params.loop && h.createLoop(), (!h.params.observer || !h.support.observer) && h.update(!0), h.params.loop ? h.slideTo(t + h.loopedSlides, 0, !1) : h.slideTo(t, 0, !1)
                }, h.removeAllSlides = function () {
                    var e = [];
                    for (var t = 0; t < h.slides.length; t++)e.push(t);
                    h.removeSlide(e)
                }, h.effects = {
                    fade: {
                        setTranslate: function () {
                            for (var e = 0; e < h.slides.length; e++) {
                                var t = h.slides.eq(e), n = t[0].swiperSlideOffset, r = -n;
                                h.params.virtualTranslate || (r -= h.translate);
                                var i = 0;
                                p() || (i = r, r = 0);
                                var s = h.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                                t.css({opacity: s}).transform("translate3d(" + r + "px, " + i + "px, 0px)")
                            }
                        }, setTransition: function (e) {
                            h.slides.transition(e);
                            if (h.params.virtualTranslate && e !== 0) {
                                var t = !1;
                                h.slides.transitionEnd(function () {
                                    if (t)return;
                                    if (!h)return;
                                    t = !0, h.animating = !1;
                                    var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
                                    for (var n = 0; n < e.length; n++)h.wrapper.trigger(e[n])
                                })
                            }
                        }
                    }, cube: {
                        setTranslate: function () {
                            var t = 0, n;
                            h.params.cube.shadow && (p() ? (n = h.wrapper.find(".swiper-cube-shadow"), n.length === 0 && (n = e('<div class="swiper-cube-shadow"></div>'), h.wrapper.append(n)), n.css({height: h.width + "px"})) : (n = h.container.find(".swiper-cube-shadow"), n.length === 0 && (n = e('<div class="swiper-cube-shadow"></div>'), h.container.append(n))));
                            for (var r = 0; r < h.slides.length; r++) {
                                var i = h.slides.eq(r), s = r * 90, o = Math.floor(s / 360);
                                h.rtl && (s = -s, o = Math.floor(-s / 360));
                                var u = Math.max(Math.min(i[0].progress, 1), -1), a = 0, f = 0, l = 0;
                                r % 4 === 0 ? (a = -o * 4 * h.size, l = 0) : (r - 1) % 4 === 0 ? (a = 0, l = -o * 4 * h.size) : (r - 2) % 4 === 0 ? (a = h.size + o * 4 * h.size, l = h.size) : (r - 3) % 4 === 0 && (a = -h.size, l = 3 * h.size + h.size * 4 * o), h.rtl && (a = -a), p() || (f = a, a = 0);
                                var c = "rotateX(" + (p() ? 0 : -s) + "deg) rotateY(" + (p() ? s : 0) + "deg) translate3d(" + a + "px, " + f + "px, " + l + "px)";
                                u <= 1 && u > -1 && (t = r * 90 + u * 90, h.rtl && (t = -r * 90 - u * 90)), i.transform(c);
                                if (h.params.cube.slideShadows) {
                                    var d = p() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"), v = p() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                    d.length === 0 && (d = e('<div class="swiper-slide-shadow-' + (p() ? "left" : "top") + '"></div>'), i.append(d)), v.length === 0 && (v = e('<div class="swiper-slide-shadow-' + (p() ? "right" : "bottom") + '"></div>'), i.append(v));
                                    var m = i[0].progress;
                                    d.length && (d[0].style.opacity = -i[0].progress), v.length && (v[0].style.opacity = i[0].progress)
                                }
                            }
                            h.wrapper.css({
                                "-webkit-transform-origin": "50% 50% -" + h.size / 2 + "px",
                                "-moz-transform-origin": "50% 50% -" + h.size / 2 + "px",
                                "-ms-transform-origin": "50% 50% -" + h.size / 2 + "px",
                                "transform-origin": "50% 50% -" + h.size / 2 + "px"
                            });
                            if (h.params.cube.shadow)if (p()) n.transform("translate3d(0px, " + (h.width / 2 + h.params.cube.shadowOffset) + "px, " + -h.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + h.params.cube.shadowScale + ")"); else {
                                var g = Math.abs(t) - Math.floor(Math.abs(t) / 90) * 90, y = 1.5 - (Math.sin(g * 2 * Math.PI / 360) / 2 + Math.cos(g * 2 * Math.PI / 360) / 2), b = h.params.cube.shadowScale, w = h.params.cube.shadowScale / y, E = h.params.cube.shadowOffset;
                                n.transform("scale3d(" + b + ", 1, " + w + ") translate3d(0px, " + (h.height / 2 + E) + "px, " + -h.height / 2 / w + "px) rotateX(-90deg)")
                            }
                            var S = h.isSafari || h.isUiWebView ? -h.size / 2 : 0;
                            h.wrapper.transform("translate3d(0px,0," + S + "px) rotateX(" + (p() ? 0 : t) + "deg) rotateY(" + (p() ? -t : 0) + "deg)")
                        }, setTransition: function (e) {
                            h.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), h.params.cube.shadow && !p() && h.container.find(".swiper-cube-shadow").transition(e)
                        }
                    }, coverflow: {
                        setTranslate: function () {
                            var t = h.translate, n = p() ? -t + h.width / 2 : -t + h.height / 2, r = p() ? h.params.coverflow.rotate : -h.params.coverflow.rotate, i = h.params.coverflow.depth;
                            for (var s = 0, o = h.slides.length; s < o; s++) {
                                var u = h.slides.eq(s), a = h.slidesSizesGrid[s], f = u[0].swiperSlideOffset, l = (n - f - a / 2) / a * h.params.coverflow.modifier, c = p() ? r * l : 0, d = p() ? 0 : r * l, v = -i * Math.abs(l), m = p() ? 0 : h.params.coverflow.stretch * l, g = p() ? h.params.coverflow.stretch * l : 0;
                                Math.abs(g) < .001 && (g = 0), Math.abs(m) < .001 && (m = 0), Math.abs(v) < .001 && (v = 0), Math.abs(c) < .001 && (c = 0), Math.abs(d) < .001 && (d = 0);
                                var y = "translate3d(" + g + "px," + m + "px," + v + "px)  rotateX(" + d + "deg) rotateY(" + c + "deg)";
                                u.transform(y), u[0].style.zIndex = -Math.abs(Math.round(l)) + 1;
                                if (h.params.coverflow.slideShadows) {
                                    var b = p() ? u.find(".swiper-slide-shadow-left") : u.find(".swiper-slide-shadow-top"), w = p() ? u.find(".swiper-slide-shadow-right") : u.find(".swiper-slide-shadow-bottom");
                                    b.length === 0 && (b = e('<div class="swiper-slide-shadow-' + (p() ? "left" : "top") + '"></div>'), u.append(b)), w.length === 0 && (w = e('<div class="swiper-slide-shadow-' + (p() ? "right" : "bottom") + '"></div>'), u.append(w)), b.length && (b[0].style.opacity = l > 0 ? l : 0), w.length && (w[0].style.opacity = -l > 0 ? -l : 0)
                                }
                            }
                            if (h.browser.ie) {
                                var E = h.wrapper[0].style;
                                E.perspectiveOrigin = n + "px 50%"
                            }
                        }, setTransition: function (e) {
                            h.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, h.lazy = {
                    initialImageLoaded: !1, loadImageInSlide: function (t, n) {
                        if (typeof t == "undefined")return;
                        typeof n == "undefined" && (n = !0);
                        if (h.slides.length === 0)return;
                        var r = h.slides.eq(t), i = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                        r.hasClass("swiper-lazy") && !r.hasClass("swiper-lazy-loaded") && !r.hasClass("swiper-lazy-loading") && (i = i.add(r[0]));
                        if (i.length === 0)return;
                        i.each(function () {
                            var t = e(this);
                            t.addClass("swiper-lazy-loading");
                            var i = t.attr("data-background"), s = t.attr("data-src"), o = t.attr("data-srcset");
                            h.loadImage(t[0], s || i, o, !1, function () {
                                i ? (t.css("background-image", "url(" + i + ")"), t.removeAttr("data-background")) : (o && (t.attr("srcset", o), t.removeAttr("data-srcset")), s && (t.attr("src", s), t.removeAttr("data-src"))), t.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove();
                                if (h.params.loop && n) {
                                    var e = r.attr("data-swiper-slide-index");
                                    if (r.hasClass(h.params.slideDuplicateClass)) {
                                        var u = h.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + h.params.slideDuplicateClass + ")");
                                        h.lazy.loadImageInSlide(u.index(), !1)
                                    } else {
                                        var a = h.wrapper.children("." + h.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        h.lazy.loadImageInSlide(a.index(), !1)
                                    }
                                }
                                h.emit("onLazyImageReady", h, r[0], t[0])
                            }), h.emit("onLazyImageLoad", h, r[0], t[0])
                        })
                    }, load: function () {
                        var t;
                        if (h.params.watchSlidesVisibility) h.wrapper.children("." + h.params.slideVisibleClass).each(function () {
                            h.lazy.loadImageInSlide(e(this).index())
                        }); else if (h.params.slidesPerView > 1)for (t = h.activeIndex; t < h.activeIndex + h.params.slidesPerView; t++)h.slides[t] && h.lazy.loadImageInSlide(t); else h.lazy.loadImageInSlide(h.activeIndex);
                        if (h.params.lazyLoadingInPrevNext)if (h.params.slidesPerView > 1) {
                            for (t = h.activeIndex + h.params.slidesPerView; t < h.activeIndex + h.params.slidesPerView + h.params.slidesPerView; t++)h.slides[t] && h.lazy.loadImageInSlide(t);
                            for (t = h.activeIndex - h.params.slidesPerView; t < h.activeIndex; t++)h.slides[t] && h.lazy.loadImageInSlide(t)
                        } else {
                            var n = h.wrapper.children("." + h.params.slideNextClass);
                            n.length > 0 && h.lazy.loadImageInSlide(n.index());
                            var r = h.wrapper.children("." + h.params.slidePrevClass);
                            r.length > 0 && h.lazy.loadImageInSlide(r.index())
                        }
                    }, onTransitionStart: function () {
                        h.params.lazyLoading && (h.params.lazyLoadingOnTransitionStart || !h.params.lazyLoadingOnTransitionStart && !h.lazy.initialImageLoaded) && h.lazy.load()
                    }, onTransitionEnd: function () {
                        h.params.lazyLoading && !h.params.lazyLoadingOnTransitionStart && h.lazy.load()
                    }
                }, h.scrollbar = {
                    isTouched: !1, setDragPosition: function (e) {
                        var t = h.scrollbar, n = 0, r = 0, i, s = p() ? e.type === "touchstart" || e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX || e.clientX : e.type === "touchstart" || e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY || e.clientY, o = s - t.track.offset()[p() ? "left" : "top"] - t.dragSize / 2, u = -h.minTranslate() * t.moveDivider, a = -h.maxTranslate() * t.moveDivider;
                        o < u ? o = u : o > a && (o = a), o = -o / t.moveDivider, h.updateProgress(o), h.setWrapperTranslate(o, !0)
                    }, dragStart: function (e) {
                        var t = h.scrollbar;
                        t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), clearTimeout(t.dragTimeout), t.track.transition(0), h.params.scrollbarHide && t.track.css("opacity", 1), h.wrapper.transition(100), t.drag.transition(100), h.emit("onScrollbarDragStart", h)
                    }, dragMove: function (e) {
                        var t = h.scrollbar;
                        if (!t.isTouched)return;
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), h.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), h.emit("onScrollbarDragMove", h)
                    }, dragEnd: function (e) {
                        var t = h.scrollbar;
                        if (!t.isTouched)return;
                        t.isTouched = !1, h.params.scrollbarHide && (clearTimeout(t.dragTimeout), t.dragTimeout = setTimeout(function () {
                            t.track.css("opacity", 0), t.track.transition(400)
                        }, 1e3)), h.emit("onScrollbarDragEnd", h), h.params.scrollbarSnapOnRelease && h.slideReset()
                    }, enableDraggable: function () {
                        var t = h.scrollbar, n = h.support.touch ? t.track : document;
                        e(t.track).on(h.touchEvents.start, t.dragStart), e(n).on(h.touchEvents.move, t.dragMove), e(n).on(h.touchEvents.end, t.dragEnd)
                    }, disableDraggable: function () {
                        var t = h.scrollbar, n = h.support.touch ? t.track : document;
                        e(t.track).off(h.touchEvents.start, t.dragStart), e(n).off(h.touchEvents.move, t.dragMove), e(n).off(h.touchEvents.end, t.dragEnd)
                    }, set: function () {
                        if (!h.params.scrollbar)return;
                        var t = h.scrollbar;
                        t.track = e(h.params.scrollbar), t.drag = t.track.find(".swiper-scrollbar-drag"), t.drag.length === 0 && (t.drag = e('<div class="swiper-scrollbar-drag"></div>'), t.track.append(t.drag)), t.drag[0].style.width = "", t.drag[0].style.height = "", t.trackSize = p() ? t.track[0].offsetWidth : t.track[0].offsetHeight, t.divider = h.size / h.virtualSize, t.moveDivider = t.divider * (t.trackSize / h.size), t.dragSize = t.trackSize * t.divider, p() ? t.drag[0].style.width = t.dragSize + "px" : t.drag[0].style.height = t.dragSize + "px", t.divider >= 1 ? t.track[0].style.display = "none" : t.track[0].style.display = "", h.params.scrollbarHide && (t.track[0].style.opacity = 0)
                    }, setTranslate: function () {
                        if (!h.params.scrollbar)return;
                        var e, t = h.scrollbar, n = h.translate || 0, r, i = t.dragSize;
                        r = (t.trackSize - t.dragSize) * h.progress, h.rtl && p() ? (r = -r, r > 0 ? (i = t.dragSize - r, r = 0) : -r + t.dragSize > t.trackSize && (i = t.trackSize + r)) : r < 0 ? (i = t.dragSize + r, r = 0) : r + t.dragSize > t.trackSize && (i = t.trackSize - r), p() ? (h.support.transforms3d ? t.drag.transform("translate3d(" + r + "px, 0, 0)") : t.drag.transform("translateX(" + r + "px)"), t.drag[0].style.width = i + "px") : (h.support.transforms3d ? t.drag.transform("translate3d(0px, " + r + "px, 0)") : t.drag.transform("translateY(" + r + "px)"), t.drag[0].style.height = i + "px"), h.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function () {
                            t.track[0].style.opacity = 0, t.track.transition(400)
                        }, 1e3))
                    }, setTransition: function (e) {
                        if (!h.params.scrollbar)return;
                        h.scrollbar.drag.transition(e)
                    }
                }, h.controller = {
                    LinearSpline: function (e, t) {
                        this.x = e, this.y = t, this.lastIndex = e.length - 1;
                        var n, r, i = this.x.length;
                        this.interpolate = function (e) {
                            return e ? (r = s(this.x, e), n = r - 1, (e - this.x[n]) * (this.y[r] - this.y[n]) / (this.x[r] - this.x[n]) + this.y[n]) : 0
                        };
                        var s = function () {
                            var e, t, n;
                            return function (r, i) {
                                t = -1, e = r.length;
                                while (e - t > 1)r[n = e + t > 1] <= i ? t = n : e = n;
                                return e
                            }
                        }()
                    }, getInterpolateFunction: function (e) {
                        h.controller.spline || (h.controller.spline = h.params.loop ? new h.controller.LinearSpline(h.slidesGrid, e.slidesGrid) : new h.controller.LinearSpline(h.snapGrid, e.snapGrid))
                    }, setTranslate: function (e, n) {
                        function o(t) {
                            e = t.rtl && t.params.direction === "horizontal" ? -h.translate : h.translate, h.params.controlBy === "slide" && (h.controller.getInterpolateFunction(t), s = -h.controller.spline.interpolate(-e));
                            if (!s || h.params.controlBy === "container") i = (t.maxTranslate() - t.minTranslate()) / (h.maxTranslate() - h.minTranslate()), s = (e - h.minTranslate()) * i + t.minTranslate();
                            h.params.controlInverse && (s = t.maxTranslate() - s), t.updateProgress(s), t.setWrapperTranslate(s, !1, h), t.updateActiveIndex()
                        }

                        var r = h.params.control, i, s;
                        if (h.isArray(r))for (var u = 0; u < r.length; u++)r[u] !== n && r[u] instanceof t && o(r[u]); else r instanceof t && n !== r && o(r)
                    }, setTransition: function (e, n) {
                        function s(t) {
                            t.setWrapperTransition(e, h), e !== 0 && (t.onTransitionStart(), t.wrapper.transitionEnd(function () {
                                if (!r)return;
                                t.params.loop && h.params.controlBy === "slide" && t.fixLoop(), t.onTransitionEnd()
                            }))
                        }

                        var r = h.params.control, i;
                        if (h.isArray(r))for (i = 0; i < r.length; i++)r[i] !== n && r[i] instanceof t && s(r[i]); else r instanceof t && n !== r && s(r)
                    }
                }, h.hashnav = {
                    init: function () {
                        if (!h.params.hashnav)return;
                        h.hashnav.initialized = !0;
                        var e = document.location.hash.replace("#", "");
                        if (!e)return;
                        var t = 0;
                        for (var n = 0, r = h.slides.length; n < r; n++) {
                            var i = h.slides.eq(n), s = i.attr("data-hash");
                            if (s === e && !i.hasClass(h.params.slideDuplicateClass)) {
                                var o = i.index();
                                h.slideTo(o, t, h.params.runCallbacksOnInit, !0)
                            }
                        }
                    }, setHash: function () {
                        if (!h.hashnav.initialized || !h.params.hashnav)return;
                        document.location.hash = h.slides.eq(h.activeIndex).attr("data-hash") || ""
                    }
                }, h.disableKeyboardControl = function () {
                    e(document).off("keydown", P)
                }, h.enableKeyboardControl = function () {
                    e(document).on("keydown", P)
                }, h.mousewheel = {event: !1, lastScrollTime: (new window.Date).getTime()};
                if (h.params.mousewheelControl) {
                    try {
                        new window.WheelEvent("wheel"), h.mousewheel.event = "wheel"
                    } catch (H) {
                    }
                    !h.mousewheel.event && document.onmousewheel !== undefined && (h.mousewheel.event = "mousewheel"), h.mousewheel.event || (h.mousewheel.event = "DOMMouseScroll")
                }
                h.disableMousewheelControl = function () {
                    return h.mousewheel.event ? (h.container.off(h.mousewheel.event, B), !0) : !1
                }, h.enableMousewheelControl = function () {
                    return h.mousewheel.event ? (h.container.on(h.mousewheel.event, B), !0) : !1
                }, h.parallax = {
                    setTranslate: function () {
                        h.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            j(this, h.progress)
                        }), h.slides.each(function () {
                            var t = e(this);
                            t.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                                var e = Math.min(Math.max(t[0].progress, -1), 1);
                                j(this, e)
                            })
                        })
                    }, setTransition: function (t) {
                        typeof t == "undefined" && (t = h.params.speed), h.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var n = e(this), r = parseInt(n.attr("data-swiper-parallax-duration"), 10) || t;
                            t === 0 && (r = 0), n.transition(r)
                        })
                    }
                }, h._plugins = [];
                for (var F in h.plugins) {
                    var I = h.plugins[F](h, h.params[F]);
                    I && h._plugins.push(I)
                }
                return h.callPlugins = function (e) {
                    for (var t = 0; t < h._plugins.length; t++)e in h._plugins[t] && h._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }, h.emitterEventListeners = {}, h.emit = function (e) {
                    h.params[e] && h.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    var t;
                    if (h.emitterEventListeners[e])for (t = 0; t < h.emitterEventListeners[e].length; t++)h.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    h.callPlugins && h.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }, h.on = function (e, t) {
                    return e = q(e), h.emitterEventListeners[e] || (h.emitterEventListeners[e] = []), h.emitterEventListeners[e].push(t), h
                }, h.off = function (e, t) {
                    var n;
                    e = q(e);
                    if (typeof t == "undefined")return h.emitterEventListeners[e] = [], h;
                    if (!h.emitterEventListeners[e] || h.emitterEventListeners[e].length === 0)return;
                    for (n = 0; n < h.emitterEventListeners[e].length; n++)h.emitterEventListeners[e][n] === t && h.emitterEventListeners[e].splice(n, 1);
                    return h
                }, h.once = function (e, t) {
                    e = q(e);
                    var n = function () {
                        t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), h.off(e, n)
                    };
                    return h.on(e, n), h
                }, h.a11y = {
                    makeFocusable: function (e) {
                        return e.attr("tabIndex", "0"), e
                    },
                    addRole: function (e, t) {
                        return e.attr("role", t), e
                    },
                    addLabel: function (e, t) {
                        return e.attr("aria-label", t), e
                    },
                    disable: function (e) {
                        return e.attr("aria-disabled", !0), e
                    },
                    enable: function (e) {
                        return e.attr("aria-disabled", !1), e
                    },
                    onEnterKey: function (t) {
                        if (t.keyCode !== 13)return;
                        e(t.target).is(h.params.nextButton) ? (h.onClickNext(t), h.isEnd ? h.a11y.notify(h.params.lastSlideMessage) : h.a11y.notify(h.params.nextSlideMessage)) : e(t.target).is(h.params.prevButton) && (h.onClickPrev(t), h.isBeginning ? h.a11y.notify(h.params.firstSlideMessage) : h.a11y.notify(h.params.prevSlideMessage)), e(t.target).is("." + h.params.bulletClass) && e(t.target)[0].click()
                    },
                    liveRegion: e('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                    notify: function (e) {
                        var t = h.a11y.liveRegion;
                        if (t.length === 0)return;
                        t.html(""), t.html(e)
                    },
                    init: function () {
                        if (h.params.nextButton) {
                            var t = e(h.params.nextButton);
                            h.a11y.makeFocusable(t), h.a11y.addRole(t, "button"), h.a11y.addLabel(t, h.params.nextSlideMessage)
                        }
                        if (h.params.prevButton) {
                            var n = e(h.params.prevButton);
                            h.a11y.makeFocusable(n), h.a11y.addRole(n, "button"), h.a11y.addLabel(n, h.params.prevSlideMessage)
                        }
                        e(h.container).append(h.a11y.liveRegion)
                    },
                    initPagination: function () {
                        h.params.pagination && h.params.paginationClickable && h.bullets && h.bullets.length && h.bullets.each(function () {
                            var t = e(this);
                            h.a11y.makeFocusable(t), h.a11y.addRole(t, "button"), h.a11y.addLabel(t, h.params.paginationBulletMessage.replace(/{{index}}/, t.index() + 1))
                        })
                    },
                    destroy: function () {
                        h.a11y.liveRegion && h.a11y.liveRegion.length > 0 && h.a11y.liveRegion.remove()
                    }
                }, h.init = function () {
                    h.params.loop && h.createLoop(), h.updateContainerSize(), h.updateSlidesSize(), h.updatePagination(), h.params.scrollbar && h.scrollbar && (h.scrollbar.set(), h.params.scrollbarDraggable && h.scrollbar.enableDraggable()), h.params.effect !== "slide" && h.effects[h.params.effect] && (h.params.loop || h.updateProgress(), h.effects[h.params.effect].setTranslate()), h.params.loop ? h.slideTo(h.params.initialSlide + h.loopedSlides, 0, h.params.runCallbacksOnInit) : (h.slideTo(h.params.initialSlide, 0, h.params.runCallbacksOnInit), h.params.initialSlide === 0 && (h.parallax && h.params.parallax && h.parallax.setTranslate(), h.lazy && h.params.lazyLoading && (h.lazy.load(), h.lazy.initialImageLoaded = !0))), h.attachEvents(), h.params.observer && h.support.observer && h.initObservers(), h.params.preloadImages && !h.params.lazyLoading && h.preloadImages(), h.params.autoplay && h.startAutoplay(), h.params.keyboardControl && h.enableKeyboardControl && h.enableKeyboardControl(), h.params.mousewheelControl && h.enableMousewheelControl && h.enableMousewheelControl(), h.params.hashnav && h.hashnav && h.hashnav.init(), h.params.a11y && h.a11y && h.a11y.init(), h.emit("onInit", h)
                }, h.cleanupStyles = function () {
                    h.container.removeClass(h.classNames.join(" ")).removeAttr("style"), h.wrapper.removeAttr("style"), h.slides && h.slides.length && h.slides.removeClass([h.params.slideVisibleClass, h.params.slideActiveClass, h.params.slideNextClass, h.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), h.paginationContainer && h.paginationContainer.length && h.paginationContainer.removeClass(h.params.paginationHiddenClass), h.bullets && h.bullets.length && h.bullets.removeClass(h.params.bulletActiveClass), h.params.prevButton && e(h.params.prevButton).removeClass(h.params.buttonDisabledClass), h.params.nextButton && e(h.params.nextButton).removeClass(h.params.buttonDisabledClass), h.params.scrollbar && h.scrollbar && (h.scrollbar.track && h.scrollbar.track.length && h.scrollbar.track.removeAttr("style"), h.scrollbar.drag && h.scrollbar.drag.length && h.scrollbar.drag.removeAttr("style"))
                }, h.destroy = function (e, t) {
                    h.detachEvents(), h.stopAutoplay(), h.params.scrollbar && h.scrollbar && h.params.scrollbarDraggable && h.scrollbar.disableDraggable(), h.params.loop && h.destroyLoop(), t && h.cleanupStyles(), h.disconnectObservers(), h.params.keyboardControl && h.disableKeyboardControl && h.disableKeyboardControl(), h.params.mousewheelControl && h.disableMousewheelControl && h.disableMousewheelControl(), h.params.a11y && h.a11y && h.a11y.destroy(), h.emit("onDestroy"), e !== !1 && (h = null)
                }, h.init(), h
            }
            return new t(r, i)
        };
        t.prototype = {
            isSafari: function () {
                var e = navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
            }(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
            isArray: function (e) {
                return Object.prototype.toString.apply(e) === "[object Array]"
            },
            browser: {
                ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
                ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
            },
            device: function () {
                var e = navigator.userAgent, t = e.match(/(Android);?[\s\/]+([\d.]+)?/), n = e.match(/(iPad).*OS\s([\d_]+)/), r = e.match(/(iPod)(.*OS\s([\d_]+))?/), i = !n && e.match(/(iPhone\sOS)\s([\d_]+)/);
                return {ios: n || i || r, android: t}
            }(),
            support: {
                touch: window.Modernizr && Modernizr.touch === !0 || function () {
                    return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
                }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
                    var e = document.createElement("div").style;
                    return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
                }(), flexbox: function () {
                    var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" ");
                    for (var n = 0; n < t.length; n++)if (t[n] in e)return !0
                }(), observer: function () {
                    return "MutationObserver" in window || "WebkitMutationObserver" in window
                }()
            },
            plugins: {}
        };
        var n = function () {
            var e = function (e) {
                var t = this, n = 0;
                for (n = 0; n < e.length; n++)t[n] = e[n];
                return t.length = e.length, this
            }, t = function (t, n) {
                var r = [], i = 0;
                if (t && !n && t instanceof e)return t;
                if (t)if (typeof t == "string") {
                    var s, o, u = t.trim();
                    if (u.indexOf("<") >= 0 && u.indexOf(">") >= 0) {
                        var a = "div";
                        u.indexOf("<li") === 0 && (a = "ul"), u.indexOf("<tr") === 0 && (a = "tbody");
                        if (u.indexOf("<td") === 0 || u.indexOf("<th") === 0) a = "tr";
                        u.indexOf("<tbody") === 0 && (a = "table"), u.indexOf("<option") === 0 && (a = "select"), o = document.createElement(a), o.innerHTML = t;
                        for (i = 0; i < o.childNodes.length; i++)r.push(o.childNodes[i])
                    } else {
                        !n && t[0] === "#" && !t.match(/[ .<>:~]/) ? s = [document.getElementById(t.split("#")[1])] : s = (n || document).querySelectorAll(t);
                        for (i = 0; i < s.length; i++)s[i] && r.push(s[i])
                    }
                } else if (t.nodeType || t === window || t === document) r.push(t); else if (t.length > 0 && t[0].nodeType)for (i = 0; i < t.length; i++)r.push(t[i]);
                return new e(r)
            };
            return e.prototype = {
                addClass: function (e) {
                    if (typeof e == "undefined")return this;
                    var t = e.split(" ");
                    for (var n = 0; n < t.length; n++)for (var r = 0; r < this.length; r++)this[r].classList.add(t[n]);
                    return this
                }, removeClass: function (e) {
                    var t = e.split(" ");
                    for (var n = 0; n < t.length; n++)for (var r = 0; r < this.length; r++)this[r].classList.remove(t[n]);
                    return this
                }, hasClass: function (e) {
                    return this[0] ? this[0].classList.contains(e) : !1
                }, toggleClass: function (e) {
                    var t = e.split(" ");
                    for (var n = 0; n < t.length; n++)for (var r = 0; r < this.length; r++)this[r].classList.toggle(t[n]);
                    return this
                }, attr: function (e, t) {
                    if (arguments.length === 1 && typeof e == "string")return this[0] ? this[0].getAttribute(e) : undefined;
                    for (var n = 0; n < this.length; n++)if (arguments.length === 2) this[n].setAttribute(e, t); else for (var r in e)this[n][r] = e[r], this[n].setAttribute(r, e[r]);
                    return this
                }, removeAttr: function (e) {
                    for (var t = 0; t < this.length; t++)this[t].removeAttribute(e);
                    return this
                }, data: function (e, t) {
                    if (typeof t == "undefined") {
                        if (this[0]) {
                            var n = this[0].getAttribute("data-" + e);
                            return n ? n : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : undefined
                        }
                        return undefined
                    }
                    for (var r = 0; r < this.length; r++) {
                        var i = this[r];
                        i.dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t
                    }
                    return this
                }, transform: function (e) {
                    for (var t = 0; t < this.length; t++) {
                        var n = this[t].style;
                        n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = e
                    }
                    return this
                }, transition: function (e) {
                    typeof e != "string" && (e += "ms");
                    for (var t = 0; t < this.length; t++) {
                        var n = this[t].style;
                        n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = e
                    }
                    return this
                }, on: function (e, n, r, i) {
                    function s(e) {
                        var i = e.target;
                        if (t(i).is(n)) r.call(i, e); else {
                            var s = t(i).parents();
                            for (var o = 0; o < s.length; o++)t(s[o]).is(n) && r.call(s[o], e)
                        }
                    }

                    var o = e.split(" "), u, a;
                    for (u = 0; u < this.length; u++)if (typeof n == "function" || n === !1) {
                        typeof n == "function" && (r = arguments[1], i = arguments[2] || !1);
                        for (a = 0; a < o.length; a++)this[u].addEventListener(o[a], r, i)
                    } else for (a = 0; a < o.length; a++)this[u].dom7LiveListeners || (this[u].dom7LiveListeners = []), this[u].dom7LiveListeners.push({
                        listener: r,
                        liveListener: s
                    }), this[u].addEventListener(o[a], s, i);
                    return this
                }, off: function (e, t, n, r) {
                    var i = e.split(" ");
                    for (var s = 0; s < i.length; s++)for (var o = 0; o < this.length; o++)if (typeof t == "function" || t === !1) typeof t == "function" && (n = arguments[1], r = arguments[2] || !1), this[o].removeEventListener(i[s], n, r); else if (this[o].dom7LiveListeners)for (var u = 0; u < this[o].dom7LiveListeners.length; u++)this[o].dom7LiveListeners[u].listener === n && this[o].removeEventListener(i[s], this[o].dom7LiveListeners[u].liveListener, r);
                    return this
                }, once: function (e, t, n, r) {
                    function s(o) {
                        n(o), i.off(e, t, s, r)
                    }

                    var i = this;
                    typeof t == "function" && (t = !1, n = arguments[1], r = arguments[2]), i.on(e, t, s, r)
                }, trigger: function (e, t) {
                    for (var n = 0; n < this.length; n++) {
                        var r;
                        try {
                            r = new window.CustomEvent(e, {detail: t, bubbles: !0, cancelable: !0})
                        } catch (i) {
                            r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = t
                        }
                        this[n].dispatchEvent(r)
                    }
                    return this
                }, transitionEnd: function (e) {
                    function s(r) {
                        if (r.target !== this)return;
                        e.call(this, r);
                        for (n = 0; n < t.length; n++)i.off(t[n], s)
                    }

                    var t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], n, r, i = this;
                    if (e)for (n = 0; n < t.length; n++)i.on(t[n], s);
                    return this
                }, width: function () {
                    return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
                }, outerWidth: function (e) {
                    return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                }, height: function () {
                    return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
                }, outerHeight: function (e) {
                    return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                }, offset: function () {
                    if (this.length > 0) {
                        var e = this[0], t = e.getBoundingClientRect(), n = document.body, r = e.clientTop || n.clientTop || 0, i = e.clientLeft || n.clientLeft || 0, s = window.pageYOffset || e.scrollTop, o = window.pageXOffset || e.scrollLeft;
                        return {top: t.top + s - r, left: t.left + o - i}
                    }
                    return null
                }, css: function (e, t) {
                    var n;
                    if (arguments.length === 1) {
                        if (typeof e != "string") {
                            for (n = 0; n < this.length; n++)for (var r in e)this[n].style[r] = e[r];
                            return this
                        }
                        if (this[0])return window.getComputedStyle(this[0], null).getPropertyValue(e)
                    }
                    if (arguments.length === 2 && typeof e == "string") {
                        for (n = 0; n < this.length; n++)this[n].style[e] = t;
                        return this
                    }
                    return this
                }, each: function (e) {
                    for (var t = 0; t < this.length; t++)e.call(this[t], t, this[t]);
                    return this
                }, html: function (e) {
                    if (typeof e == "undefined")return this[0] ? this[0].innerHTML : undefined;
                    for (var t = 0; t < this.length; t++)this[t].innerHTML = e;
                    return this
                }, is: function (n) {
                    if (!this[0])return !1;
                    var r, i;
                    if (typeof n == "string") {
                        var s = this[0];
                        if (s === document)return n === document;
                        if (s === window)return n === window;
                        if (s.matches)return s.matches(n);
                        if (s.webkitMatchesSelector)return s.webkitMatchesSelector(n);
                        if (s.mozMatchesSelector)return s.mozMatchesSelector(n);
                        if (s.msMatchesSelector)return s.msMatchesSelector(n);
                        r = t(n);
                        for (i = 0; i < r.length; i++)if (r[i] === this[0])return !0;
                        return !1
                    }
                    if (n === document)return this[0] === document;
                    if (n === window)return this[0] === window;
                    if (n.nodeType || n instanceof e) {
                        r = n.nodeType ? [n] : n;
                        for (i = 0; i < r.length; i++)if (r[i] === this[0])return !0;
                        return !1
                    }
                    return !1
                }, index: function () {
                    if (this[0]) {
                        var e = this[0], t = 0;
                        while ((e = e.previousSibling) !== null)e.nodeType === 1 && t++;
                        return t
                    }
                    return undefined
                }, eq: function (t) {
                    if (typeof t == "undefined")return this;
                    var n = this.length, r;
                    return t > n - 1 ? new e([]) : t < 0 ? (r = n + t, r < 0 ? new e([]) : new e([this[r]])) : new e([this[t]])
                }, append: function (t) {
                    var n, r;
                    for (n = 0; n < this.length; n++)if (typeof t == "string") {
                        var i = document.createElement("div");
                        i.innerHTML = t;
                        while (i.firstChild)this[n].appendChild(i.firstChild)
                    } else if (t instanceof e)for (r = 0; r < t.length; r++)this[n].appendChild(t[r]); else this[n].appendChild(t);
                    return this
                }, prepend: function (t) {
                    var n, r;
                    for (n = 0; n < this.length; n++)if (typeof t == "string") {
                        var i = document.createElement("div");
                        i.innerHTML = t;
                        for (r = i.childNodes.length - 1; r >= 0; r--)this[n].insertBefore(i.childNodes[r], this[n].childNodes[0])
                    } else if (t instanceof e)for (r = 0; r < t.length; r++)this[n].insertBefore(t[r], this[n].childNodes[0]); else this[n].insertBefore(t, this[n].childNodes[0]);
                    return this
                }, insertBefore: function (e) {
                    var n = t(e);
                    for (var r = 0; r < this.length; r++)if (n.length === 1) n[0].parentNode.insertBefore(this[r], n[0]); else if (n.length > 1)for (var i = 0; i < n.length; i++)n[i].parentNode.insertBefore(this[r].cloneNode(!0), n[i])
                }, insertAfter: function (e) {
                    var n = t(e);
                    for (var r = 0; r < this.length; r++)if (n.length === 1) n[0].parentNode.insertBefore(this[r], n[0].nextSibling); else if (n.length > 1)for (var i = 0; i < n.length; i++)n[i].parentNode.insertBefore(this[r].cloneNode(!0), n[i].nextSibling)
                }, next: function (n) {
                    return this.length > 0 ? n ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(n) ? new e([this[0].nextElementSibling]) : new e([]) : this[0].nextElementSibling ? new e([this[0].nextElementSibling]) : new e([]) : new e([])
                }, nextAll: function (n) {
                    var r = [], i = this[0];
                    if (!i)return new e([]);
                    while (i.nextElementSibling) {
                        var s = i.nextElementSibling;
                        n ? t(s).is(n) && r.push(s) : r.push(s), i = s
                    }
                    return new e(r)
                }, prev: function (n) {
                    return this.length > 0 ? n ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(n) ? new e([this[0].previousElementSibling]) : new e([]) : this[0].previousElementSibling ? new e([this[0].previousElementSibling]) : new e([]) : new e([])
                }, prevAll: function (n) {
                    var r = [], i = this[0];
                    if (!i)return new e([]);
                    while (i.previousElementSibling) {
                        var s = i.previousElementSibling;
                        n ? t(s).is(n) && r.push(s) : r.push(s), i = s
                    }
                    return new e(r)
                }, parent: function (e) {
                    var n = [];
                    for (var r = 0; r < this.length; r++)e ? t(this[r].parentNode).is(e) && n.push(this[r].parentNode) : n.push(this[r].parentNode);
                    return t(t.unique(n))
                }, parents: function (e) {
                    var n = [];
                    for (var r = 0; r < this.length; r++) {
                        var i = this[r].parentNode;
                        while (i)e ? t(i).is(e) && n.push(i) : n.push(i), i = i.parentNode
                    }
                    return t(t.unique(n))
                }, find: function (t) {
                    var n = [];
                    for (var r = 0; r < this.length; r++) {
                        var i = this[r].querySelectorAll(t);
                        for (var s = 0; s < i.length; s++)n.push(i[s])
                    }
                    return new e(n)
                }, children: function (n) {
                    var r = [];
                    for (var i = 0; i < this.length; i++) {
                        var s = this[i].childNodes;
                        for (var o = 0; o < s.length; o++)n ? s[o].nodeType === 1 && t(s[o]).is(n) && r.push(s[o]) : s[o].nodeType === 1 && r.push(s[o])
                    }
                    return new e(t.unique(r))
                }, remove: function () {
                    for (var e = 0; e < this.length; e++)this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this
                }, add: function () {
                    var e = this, n, r;
                    for (n = 0; n < arguments.length; n++) {
                        var i = t(arguments[n]);
                        for (r = 0; r < i.length; r++)e[e.length] = i[r], e.length++
                    }
                    return e
                }
            }, t.fn = e.prototype, t.unique = function (e) {
                var t = [];
                for (var n = 0; n < e.length; n++)t.indexOf(e[n]) === -1 && t.push(e[n]);
                return t
            }, t
        }(), r = ["jQuery", "Zepto", "Dom7"];
        for (var i = 0; i < r.length; i++)window[r[i]] && o(window[r[i]]);
        var s;
        typeof n == "undefined" ? s = window.Dom7 || window.Zepto || window.jQuery : s = n, s && ("transitionEnd" in s.fn || (s.fn.transitionEnd = function (e) {
            function s(r) {
                if (r.target !== this)return;
                e.call(this, r);
                for (n = 0; n < t.length; n++)i.off(t[n], s)
            }

            var t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], n, r, i = this;
            if (e)for (n = 0; n < t.length; n++)i.on(t[n], s);
            return this
        }), "transform" in s.fn || (s.fn.transform = function (e) {
            for (var t = 0; t < this.length; t++) {
                var n = this[t].style;
                n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = e
            }
            return this
        }), "transition" in s.fn || (s.fn.transition = function (e) {
            typeof e != "string" && (e += "ms");
            for (var t = 0; t < this.length; t++) {
                var n = this[t].style;
                n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = e
            }
            return this
        })), window.Swiper = t
    }(), typeof module != "undefined" ? module.exports = window.Swiper : typeof n == "function" && n.amd && n("swiper", [], function () {
        return window.Swiper
    }), n("polyfill", [], function () {
        "remove" in Element.prototype || (Element.prototype.remove = function () {
            this.parentNode.removeChild(this)
        })
    }), n("kzPlayer", ["global", "loading", "kzpage", "musicController", "adScene", "menu", "lengthPrefix", "utils", "paramters", "progressBar", "customEvents", "swiper", "polyfill"], function (e, t, n, r, i, s, o, u, a, f, l) {
        var c = ['<div data-kzplayer="loading" id="loading_page"> </div>', '<ul data-kzplayer="container" id="container"> </ul>', '<div data-kzplayer="next_pointer" id="next_pointer" class="icon---icon1-scorll-- fadeOutUp animated"></div>'].join(""), h = function (e, t, n) {
            var i = r(e, t, n), s = document.createElement("span");
            s.music = i;
            var o = document.createElement("span"), u = document.createElement("span");
            s.setAttribute("class", "music_controller icon-icon1--music"), o.setAttribute("class", "icon-icon1--music animated rotate"), u.setAttribute("class", "icon-icon1--music animated rotate"), s.appendChild(o), s.appendChild(u), s.pause = function () {
                if (!i.url)return;
                i.pause(), this.setAttribute("role", "pause")
            }, s.play = function () {
                if (!i.url)return;
                i.play(), this.setAttribute("role", "play")
            }, s.destroy = function () {
                this.pause(), i.destroy()
            };
            var a = function (e) {
                e.preventDefault(), e.stopPropagation(), s.getAttribute("role") == "pause" ? s.play() : s.pause()
            };
            return e ? i.isPlaying || n ? s.setAttribute("role", "play") : (n && $(document).one("touchstart", a), s.setAttribute("role", "pause")) : s.setAttribute("role", "hidden"), s.addEventListener("click", a), s
        }, p = function (e, t, n, r, i) {
            this.status = p.STATUS_LIB.loading, this.page_id = n && n._id || "", this.pageData = n, this.params = a($.extend(!0, {}, t.params, i)), this.data = t, this.wrapper = e, this.start_index = r, this.init()
        };
        return p.STATUS_LIB = {ready: 1, loading: 0}, p.prototype = {
            init: function () {
                var r = this;
                e.with_ad && this.pageData && this.data.scenes.push(i({
                    screen: this.pageData.screen,
                    title: this.pageData.title,
                    desc: this.pageData.desc,
                    ad_content: this.pageData.loading_setting && this.pageData.loading_setting.ad_content
                })), r.wrapper.innerHTML = c, r.wrapper.querySelector('[data-kzplayer="next_pointer"]').addEventListener("click", function () {
                    r.kzPage && r.kzPage.next()
                }), e.width = r.wrapper.clientWidth, e.height = r.wrapper.clientHeight, r.wrapper.setAttribute("data-kzplayer", "main"), r.wrapper.style.setProperty("positioin", "relative"), r.data.background && r.data.background["background-color"] && r.wrapper.style.setProperty("background-color", r.data.background["background-color"]), r.musicController = h(r.data.music && r.data.music.url || "", r.wrapper, !r.data.music || r.data.music.auto_play === undefined || r.data.music.auto_play), r.wrapper.appendChild(r.musicController);
                var o = t(r.data, r.pageData && r.pageData.loading_setting);
                r.kzPage = new n(r.data, r.wrapper.querySelector("[data-kzplayer='container']"), r, r.page_id, r.pageData, r.start_index), r.data.menu && r.data.menu.open_menu && r.data.menu.data && (r.menu = new s(r.wrapper, r.data.menu, r.kzPage)), r.data.progressbar && r.data.progressbar.open == "true" && (r.progressbar = new f(r.wrapper, r.data.progressbar, {max: r.kzPage.scenes.length})), o(r.wrapper.querySelector("[data-kzplayer='loading']"), function () {
                    if (!r.wrapper.querySelector("[data-kzplayer='container']"))return;
                    r.status = p.STATUS_LIB.ready, r.kzPage.go("", r.start_index || 0)
                })
            }, reset: function (e, t, n) {
                this.destroy(), this.data = e, this.pageData = t || this.pageData, this.start_index = n || 0, this.init()
            }, destroy: function () {
                this.musicController.destroy(), this.kzPage && this.kzPage.destroy(), this.wrapper.innerHTML = ""
            }, next: function () {
                if (this.status !== p.STATUS_LIB.ready)return;
                this.kzPage.next()
            }, prev: function () {
                if (this.status !== p.STATUS_LIB.ready)return;
                this.kzPage.prev()
            }, showNextPointer: function () {
                this.wrapper.querySelector('[data-kzplayer="next_pointer"]').style.setProperty("display", "block")
            }, hideNextPointer: function () {
                this.wrapper.querySelector('[data-kzplayer="next_pointer"]').style.setProperty("display", "none")
            }, openHelperLayer: function (e, t) {
                if (this.open_div)return;
                this.open_div = this.open_div || document.createElement("div"), this.open_div.setAttribute("data-kzplayer", "helper-div"), $(this.open_div).css({
                    "-webkit-transition": "all .3s",
                    top: "100%"
                }), this.open_div.innerHTML = "<span data-kzplayer='close-helper'></span><span class='before-text'>数据加载中</span><div data-kzplayer='helper-content'>" + e + "</div>", u.setStyle(this.open_div.querySelector("[data-kzplayer='close-helper']"), "transform", "scale(" + o.getScale("max") + ")");
                var n = this;
                return this.wrapper.appendChild(this.open_div), setTimeout(function () {
                    $(n.open_div).css({top: "0"})
                }, 100), setTimeout(function () {
                    n.open_div.removeChild(n.open_div.querySelector(".before-text"))
                }, 1e3), $(this.open_div).on("touchmove mousedown", function (e) {
                    e.stopPropagation()
                }), this.wrapper.querySelector("[data-kzplayer='close-helper']").addEventListener("click", function () {
                    n.closeHelperLayer()
                }), this.open_div
            }, closeHelperLayer: function () {
                var e = this;
                this.open_div && (this.open_div.dispatchEvent(l.getEvent("kz-helper-dev-close")), $(this.open_div).css({top: "100%"}), setTimeout(function () {
                    e.wrapper.removeChild(e.open_div), e.open_div = null
                }, 400))
            }
        }, p
    }), n("main", ["require", "kzPlayer"], function (e) {
        var t = e("kzPlayer");
        return t
    }), t("kzPlayer")
});