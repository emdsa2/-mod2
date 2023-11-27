// ==UserScript==
// @name         BC 动物叫声
// @namespace    http://tampermonkey.net/
// @version      0.1.50
// @description  代码测试
// @author       Echo
// @include      /^https:\/\/(www\.)?bondageprojects\.elementfx\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @include      /^https:\/\/(www\.)?bondage-europe\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    // =======================================================================================
    var bcModSdk = function () { "use strict"; const e = "1.1.0"; function o(e) { alert("Mod ERROR:\n" + e); const o = new Error(e); throw console.error(o), o } const t = new TextEncoder; function n(e) { return !!e && "object" == typeof e && !Array.isArray(e) } function r(e) { const o = new Set; return e.filter((e => !o.has(e) && o.add(e))) } const i = new Map, a = new Set; function d(e) { a.has(e) || (a.add(e), console.warn(e)) } function s(e) { const o = [], t = new Map, n = new Set; for (const r of p.values()) { const i = r.patching.get(e.name); if (i) { o.push(...i.hooks); for (const [o, a] of i.patches.entries()) t.has(o) && t.get(o) !== a && d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o) || ""}\nPatch2:\n${a}`), t.set(o, a), n.add(r.name) } } o.sort(((e, o) => o.priority - e.priority)); const r = function (e, o) { if (0 === o.size) return e; let t = e.toString().replaceAll("\r\n", "\n"); for (const [n, r] of o.entries()) t.includes(n) || d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`), t = t.replaceAll(n, r); return (0, eval)(`(${t})`) }(e.original, t); let i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookChainExit) || void 0 === i ? void 0 : i.call(t, e.name, n), d = r.apply(this, o); return null == a || a(), d }; for (let t = o.length - 1; t >= 0; t--) { const n = o[t], r = i; i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookEnter) || void 0 === i ? void 0 : i.call(t, e.name, n.mod), d = n.hook.apply(this, [o, e => { if (1 !== arguments.length || !Array.isArray(o)) throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`); return r.call(this, e) }]); return null == a || a(), d } } return { hooks: o, patches: t, patchesSources: n, enter: i, final: r } } function c(e, o = !1) { let r = i.get(e); if (r) o && (r.precomputed = s(r)); else { let o = window; const a = e.split("."); for (let t = 0; t < a.length - 1; t++)if (o = o[a[t]], !n(o)) throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0, t + 1).join(".")} is not object`); const d = o[a[a.length - 1]]; if ("function" != typeof d) throw new Error(`ModSDK: Function ${e} to be patched not found`); const c = function (e) { let o = -1; for (const n of t.encode(e)) { let e = 255 & (o ^ n); for (let o = 0; o < 8; o++)e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1; o = o >>> 8 ^ e } return ((-1 ^ o) >>> 0).toString(16).padStart(8, "0").toUpperCase() }(d.toString().replaceAll("\r\n", "\n")), l = { name: e, original: d, originalHash: c }; r = Object.assign(Object.assign({}, l), { precomputed: s(l), router: () => { }, context: o, contextProperty: a[a.length - 1] }), r.router = function (e) { return function (...o) { return e.precomputed.enter.apply(this, [o]) } }(r), i.set(e, r), o[r.contextProperty] = r.router } return r } function l() { const e = new Set; for (const o of p.values()) for (const t of o.patching.keys()) e.add(t); for (const o of i.keys()) e.add(o); for (const o of e) c(o, !0) } function f() { const e = new Map; for (const [o, t] of i) e.set(o, { name: o, original: t.original, originalHash: t.originalHash, sdkEntrypoint: t.router, currentEntrypoint: t.context[t.contextProperty], hookedByMods: r(t.precomputed.hooks.map((e => e.mod))), patchedByMods: Array.from(t.precomputed.patchesSources) }); return e } const p = new Map; function u(e) { p.get(e.name) !== e && o(`Failed to unload mod '${e.name}': Not registered`), p.delete(e.name), e.loaded = !1, l() } function g(e, t, r) { "string" == typeof e && "string" == typeof t && (alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`), e = { name: e, fullName: e, version: t }, t = { allowReplace: !0 === r }), e && "object" == typeof e || o("Failed to register mod: Expected info object, got " + typeof e), "string" == typeof e.name && e.name || o("Failed to register mod: Expected name to be non-empty string, got " + typeof e.name); let i = `'${e.name}'`; "string" == typeof e.fullName && e.fullName || o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`), i = `'${e.fullName} (${e.name})'`, "string" != typeof e.version && o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`), e.repository || (e.repository = void 0), void 0 !== e.repository && "string" != typeof e.repository && o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`), null == t && (t = {}), t && "object" == typeof t || o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`); const a = !0 === t.allowReplace, d = p.get(e.name); d && (d.allowReplace && a || o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`), u(d)); const s = e => { "string" == typeof e && e || o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`); let t = g.patching.get(e); return t || (t = { hooks: [], patches: new Map }, g.patching.set(e, t)), t }, f = { unload: () => u(g), hookFunction: (e, t, n) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); "number" != typeof t && o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`), "function" != typeof n && o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`); const a = { mod: g.name, priority: t, hook: n }; return r.hooks.push(a), l(), () => { const e = r.hooks.indexOf(a); e >= 0 && (r.hooks.splice(e, 1), l()) } }, patchFunction: (e, t) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); n(t) || o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`); for (const [n, a] of Object.entries(t)) "string" == typeof a ? r.patches.set(n, a) : null === a ? r.patches.delete(n) : o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`); l() }, removePatches: e => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); s(e).patches.clear(), l() }, callOriginal: (e, t, n) => (g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`), "string" == typeof e && e || o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`), Array.isArray(t) || o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`), function (e, o, t = window) { return c(e).original.apply(t, o) }(e, t, n)), getOriginalHash: e => ("string" == typeof e && e || o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`), c(e).originalHash) }, g = { name: e.name, fullName: e.fullName, version: e.version, repository: e.repository, allowReplace: a, api: f, loaded: !0, patching: new Map }; return p.set(e.name, g), Object.freeze(f) } function h() { const e = []; for (const o of p.values()) e.push({ name: o.name, fullName: o.fullName, version: o.version, repository: o.repository }); return e } let m; const y = function () { if (void 0 === window.bcModSdk) return window.bcModSdk = function () { const o = { version: e, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: f, errorReporterHooks: Object.seal({ hookEnter: null, hookChainExit: null }) }; return m = o, Object.freeze(o) }(); if (n(window.bcModSdk) || o("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== e && (alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk.version.startsWith("1.0.") && void 0 === window.bcModSdk._shim10register)) { const e = window.bcModSdk, o = Object.freeze(Object.assign(Object.assign({}, e), { registerMod: (o, t, n) => o && "object" == typeof o && "string" == typeof o.name && "string" == typeof o.version ? e.registerMod(o.name, o.version, "object" == typeof t && !!t && !0 === t.allowReplace) : e.registerMod(o, t, n), _shim10register: !0 })); window.bcModSdk = o } return window.bcModSdk }(); return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = y), y }();

    const MOD_NAME = "动物叫声";
    const MOD_FULL_NAME = "动物叫声";
    const MOD_VERSION = "0.0.1";


    const mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });
    // =======================================================================================
    const w = window;
    // ServerSend 这个会 发送给服务器 大家都可以看见
    // 括号消息 = (text) => {
    //     ServerSend("ChatRoomChat", {
    //         Content: "Beep",
    //         Type: "Action",
    //         Dictionary: [
    //             { Tag: "发送私聊", Text: "修改" }, // 这条必须有 不然会不显示 目的是为了修改 "发送私聊" 这个文本
    //             { Tag: "修改", Text: text },      // 修改 "发送私聊" 这个文本
    //         ],
    //     })
    // };
    // 括号消息("Echo.")
    // =======================================================================================
    const 汪叭1 = ["汪嗯！\u2665", "汪啊\u2665", "汪汪\u2665", "汪啊", "..汪！"];
    const 汪叭2 = ["汪呜!", "汪呜呜!!", "汪呜!\u00ef!", "汪嗯嗯嗯!", "呜!"];
    const 汪叭3 = ["汪嗯...\u2665", "汪啊\u2665", "汪汪\u2665", "汪啊~!", "汪嗯\u2665af", "汪嗯!n\u2665"];
    const 汪叭4 = ["汪嗯...\u2665", "汪啊\u2665", "汪汪\u2665", "汪啊", "..汪"];
    const 汪叭5 = ["汪哈\u2665!", "汪.\u2665..哈..\u2665.!"];
    const 汪叭6 = ["\u2665 汪... 汪... 汪呜呜!!!", "嗯嗯嗯... 啊... 汪汪汪!!", "嗯... 汪汪.... 汪呜呜!!"];

    const 喵叭1 = ["喵嗯！\u2665", "喵啊\u2665", "喵喵\u2665", "喵啊", "..喵！"];
    const 喵叭2 = ["喵呜!", "喵呜呜!!", "喵呜!\u00ef!", "喵嗯嗯嗯!", "呜!"];
    const 喵叭3 = ["喵嗯...\u2665", "喵啊\u2665", "喵喵\u2665", "喵啊~!", "喵嗯\u2665af", "喵嗯!n\u2665"];
    const 喵叭4 = ["喵嗯...\u2665", "喵啊\u2665", "喵喵\u2665", "喵啊", "..喵"];
    const 喵叭5 = ["喵哈\u2665!", "喵.\u2665..哈..\u2665.!"];
    const 喵叭6 = ["\u2665 喵... 喵... 喵呜呜!!!", "嗯嗯嗯... 啊... 喵喵喵!!", "嗯... 喵喵.... 喵呜呜!!"];
    // =======================================================================================
    function 触摸反馈(data, 动作, 喇叭) {
        if (
            (
                data.Content.includes(`${动作}`)
            ) && (
                data.Dictionary.some(entry => entry.SourceCharacter === Player.MemberNumber && entry.TargetCharacter === Player.MemberNumber)
                ||
                data.Dictionary.some(entry => entry.SourceCharacter !== Player.MemberNumber && entry.TargetCharacter === Player.MemberNumber)
            )
        ) {
            const randomIndex = Math.floor(Math.random() * 喇叭.length);
            const randomMessage = 喇叭[randomIndex];

            ServerSend("ChatRoomChat", { Content: randomMessage, Type: "Chat", Dictionary: { Tag: 'fbc_nonce', Text: randomMessage } });
        }


    }

    mod.hookFunction("ChatRoomMessage", 0, (args, next) => {
        const data = args[0];
        if (data.Sender === Player.MemberNumber && data.Type === "Chat") { console.log(data) }
        let accessory = InventoryGet(Player, "HairAccessory2");
        let accessoryDescription = accessory?.Asset?.Description;

        if (accessoryDescription === "软狗耳" || accessoryDescription === "小狗耳朵") {
            触摸反馈(data, "Spank", 汪叭1);
            触摸反馈(data, "Bite", 汪叭1);
            触摸反馈(data, "Shock", 汪叭2);
            触摸反馈(data, "Suction", 汪叭3);
            触摸反馈(data, "VibeMode", 汪叭4);
            触摸反馈(data, "Tickle", 汪叭5);
        }
        if (
            data.Sender === Player.MemberNumber &&
            data.Content.includes("Orgasm") &&
            data.Type === "Activity"
        ) {
            const randomIndex = Math.floor(Math.random() * 汪叭6.length);
            const randomMessage = 汪叭6[randomIndex];

            ServerSend("ChatRoomChat", { Content: randomMessage, Type: "Chat", Dictionary: { Tag: 'fbc_nonce', Text: randomMessage } });
        }
        // 新的喵叭数组
        // 在触摸反馈函数中添加对喵叭的调用
        if (accessoryDescription === "黑猫耳" || accessoryDescription === "浅色猫耳") {
            触摸反馈(data, "Spank", 喵叭1);
            触摸反馈(data, "Bite", 喵叭1);
            触摸反馈(data, "Shock", 喵叭2);
            触摸反馈(data, "Suction", 喵叭3);
            触摸反馈(data, "VibeMode", 喵叭4);
            触摸反馈(data, "Tickle", 喵叭5);
        }
        if (
            data.Sender === Player.MemberNumber &&
            data.Content.includes("Orgasm") &&
            data.Type === "Activity"
        ) {
            const randomIndex = Math.floor(Math.random() * 喵叭6.length);
            const randomMessage = 喵叭6[randomIndex];

            ServerSend("ChatRoomChat", { Content: randomMessage, Type: "Chat", Dictionary: { Tag: 'fbc_nonce', Text: randomMessage } });
        }

        next(args)
    });



    // ==========================================================
    // ==========================================================
    // 动物语言
function processContent(data, originalContent, tag, sound) {
    if (!Array.isArray(data.Dictionary)) {
        console.error('Data Dictionary is not an array:', data.Dictionary);
        data.Dictionary = [];
    }

    data.Dictionary.push({ Tag: tag, Text: originalContent });

    if (/[\u4e00-\u9fa5]/.test(originalContent)) {
        let counter = 0;
        data.Content = originalContent.replace(/[\u4e00-\u9fa5]/g, () => {
            counter++;
            const spaceFrequency = Math.floor(Math.random() * 3) + 1;
            return counter % spaceFrequency === 0 ? sound + ' ' : sound;
        }).trim();
    }
}


    mod.hookFunction("ServerSend", 5, (args, next) => {
        if (args[0] === "ChatRoomChat" && args[1]?.Type === "Chat") {
            let data = args[1];
            let accessory = InventoryGet(Player, "HairAccessory2");
            let accessoryDescription = accessory?.Asset?.Description;
            let originalContent = data.Content;

            if (accessoryDescription === "黑猫耳" || accessoryDescription === "浅色猫耳") {
                processContent(data, originalContent, 'Luzi_猫猫', '喵');
            } else if (accessoryDescription === "软狗耳" || accessoryDescription === "小狗耳朵") {
                processContent(data, originalContent, 'Luzi_狗狗', '汪');
            } else if (accessoryDescription === "精灵耳朵") {
                processContent(data, originalContent, 'Luzi_精灵', '阿巴');
            } else {
                data.Dictionary = data.Dictionary || [];
                data.Dictionary.push({ Tag: 'Luzi_正常', Text: originalContent });
            }

            console.log(data);
        }
        next(args);
    });

    mod.hookFunction("ChatRoomMessage", 0, (args, next) => {
        const data = args[0];
        let accessory = InventoryGet(Player, "HairAccessory2");
        let accessoryDescription = accessory?.Asset?.Description;
        let catTagObject;

        switch (accessoryDescription) {
            case "黑猫耳":
            case "浅色猫耳":
            case "狐耳 大":
            case "狐耳 + 铃铛":
                catTagObject = 'Luzi_猫猫';
                break;
            case "软狗耳":
            case "小狗耳朵":
            case "狼耳 大":
            case "狼耳一件套":
                catTagObject = 'Luzi_狗狗';
                break;
            case "精灵耳朵":
                catTagObject = 'Luzi_精灵';
                break;
        }

        if (catTagObject && data.Dictionary) {
            let catTagObjectKey = Object.keys(data.Dictionary).find(key => data.Dictionary[key].Tag === catTagObject);
            if (catTagObjectKey && data.Dictionary[catTagObjectKey]) {
                data.Content = data.Dictionary[catTagObjectKey].Text;
            }
        }
        next(args);
    });
    // ==========================================================
    // ==========================================================




})();
// var 拍打 = "Spank" 1
// var 咬 = "Bite"   1
// var 电击 = "Shock" 1
// var 吸 = "Suction"
// var 振动 = "VibeMode"
// var 挠痒 = "Tickle"
// var 高潮 = "Orgasm"

// 尝试做 检测玩家 尾巴 或者 耳朵 来 执行动物的叫声
