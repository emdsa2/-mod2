
// ==UserScript==
// @name         BC 自定义动作
// @namespace    https://www.bondageprojects.com/
// @version      0.3.0
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
    /** @type {ModSDKGlobalAPI} *///@ts-ignore
    const bcModSdk = function () { "use strict"; const o = "1.2.0"; function e(o) { alert("Mod ERROR:\n" + o); const e = new Error(o); throw console.error(e), e; } const t = new TextEncoder; function n(o) { return !!o && "object" == typeof o && !Array.isArray(o); } function r(o) { const e = new Set; return o.filter((o => !e.has(o) && e.add(o))); } const i = new Map, a = new Set; function c(o) { a.has(o) || (a.add(o), console.warn(o)); } function s(o) { const e = [], t = new Map, n = new Set; for (const r of f.values()) { const i = r.patching.get(o.name); if (i) { e.push(...i.hooks); for (const [e, a] of i.patches.entries()) t.has(e) && t.get(e) !== a && c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e) || ""}\nPatch2:\n${a}`), t.set(e, a), n.add(r.name); } } e.sort(((o, e) => e.priority - o.priority)); const r = function (o, e) { if (0 === e.size) return o; let t = o.toString().replaceAll("\r\n", "\n"); for (const [n, r] of e.entries()) t.includes(n) || c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`), t = t.replaceAll(n, r); return (0, eval)(`(${t})`); }(o.original, t); let i = function (e) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookChainExit) || void 0 === i ? void 0 : i.call(t, o.name, n), c = r.apply(this, e); return null == a || a(), c; }; for (let t = e.length - 1; t >= 0; t--) { const n = e[t], r = i; i = function (e) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookEnter) || void 0 === i ? void 0 : i.call(t, o.name, n.mod), c = n.hook.apply(this, [e, o => { if (1 !== arguments.length || !Array.isArray(e)) throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`); return r.call(this, o); }]); return null == a || a(), c; }; } return { hooks: e, patches: t, patchesSources: n, enter: i, final: r }; } function l(o, e = !1) { let r = i.get(o); if (r) e && (r.precomputed = s(r)); else { let e = window; const a = o.split("."); for (let t = 0; t < a.length - 1; t++)if (e = e[a[t]], !n(e)) throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0, t + 1).join(".")} is not object`); const c = e[a[a.length - 1]]; if ("function" != typeof c) throw new Error(`ModSDK: Function ${o} to be patched not found`); const l = function (o) { let e = -1; for (const n of t.encode(o)) { let o = 255 & (e ^ n); for (let e = 0; e < 8; e++)o = 1 & o ? -306674912 ^ o >>> 1 : o >>> 1; e = e >>> 8 ^ o; } return ((-1 ^ e) >>> 0).toString(16).padStart(8, "0").toUpperCase(); }(c.toString().replaceAll("\r\n", "\n")), d = { name: o, original: c, originalHash: l }; r = Object.assign(Object.assign({}, d), { precomputed: s(d), router: () => { }, context: e, contextProperty: a[a.length - 1] }), r.router = function (o) { return function (...e) { return o.precomputed.enter.apply(this, [e]); }; }(r), i.set(o, r), e[r.contextProperty] = r.router; } return r; } function d() { for (const o of i.values()) o.precomputed = s(o); } function p() { const o = new Map; for (const [e, t] of i) o.set(e, { name: e, original: t.original, originalHash: t.originalHash, sdkEntrypoint: t.router, currentEntrypoint: t.context[t.contextProperty], hookedByMods: r(t.precomputed.hooks.map((o => o.mod))), patchedByMods: Array.from(t.precomputed.patchesSources) }); return o; } const f = new Map; function u(o) { f.get(o.name) !== o && e(`Failed to unload mod '${o.name}': Not registered`), f.delete(o.name), o.loaded = !1, d(); } function g(o, t) { o && "object" == typeof o || e("Failed to register mod: Expected info object, got " + typeof o), "string" == typeof o.name && o.name || e("Failed to register mod: Expected name to be non-empty string, got " + typeof o.name); let r = `'${o.name}'`; "string" == typeof o.fullName && o.fullName || e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`), r = `'${o.fullName} (${o.name})'`, "string" != typeof o.version && e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`), o.repository || (o.repository = void 0), void 0 !== o.repository && "string" != typeof o.repository && e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`), null == t && (t = {}), t && "object" == typeof t || e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`); const i = !0 === t.allowReplace, a = f.get(o.name); a && (a.allowReplace && i || e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`), u(a)); const c = o => { let e = g.patching.get(o.name); return e || (e = { hooks: [], patches: new Map }, g.patching.set(o.name, e)), e; }, s = (o, t) => (...n) => { var i, a; const c = null === (a = (i = m.errorReporterHooks).apiEndpointEnter) || void 0 === a ? void 0 : a.call(i, o, g.name); g.loaded || e(`Mod ${r} attempted to call SDK function after being unloaded`); const s = t(...n); return null == c || c(), s; }, p = { unload: s("unload", (() => u(g))), hookFunction: s("hookFunction", ((o, t, n) => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const i = l(o), a = c(i); "number" != typeof t && e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`), "function" != typeof n && e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`); const s = { mod: g.name, priority: t, hook: n }; return a.hooks.push(s), d(), () => { const o = a.hooks.indexOf(s); o >= 0 && (a.hooks.splice(o, 1), d()); }; })), patchFunction: s("patchFunction", ((o, t) => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const i = l(o), a = c(i); n(t) || e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`); for (const [n, i] of Object.entries(t)) "string" == typeof i ? a.patches.set(n, i) : null === i ? a.patches.delete(n) : e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`); d(); })), removePatches: s("removePatches", (o => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const t = l(o); c(t).patches.clear(), d(); })), callOriginal: s("callOriginal", ((o, t, n) => { "string" == typeof o && o || e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`); const i = l(o); return Array.isArray(t) || e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`), i.original.apply(null != n ? n : globalThis, t); })), getOriginalHash: s("getOriginalHash", (o => { "string" == typeof o && o || e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`); return l(o).originalHash; })) }, g = { name: o.name, fullName: o.fullName, version: o.version, repository: o.repository, allowReplace: i, api: p, loaded: !0, patching: new Map }; return f.set(o.name, g), Object.freeze(p); } function h() { const o = []; for (const e of f.values()) o.push({ name: e.name, fullName: e.fullName, version: e.version, repository: e.repository }); return o; } let m; const y = void 0 === window.bcModSdk ? window.bcModSdk = function () { const e = { version: o, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: p, errorReporterHooks: Object.seal({ apiEndpointEnter: null, hookEnter: null, hookChainExit: null }) }; return m = e, Object.freeze(e); }() : (n(window.bcModSdk) || e("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== o && alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk); return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = y), y; }();

    const MOD_NAME = "自定义动作";
    const MOD_FULL_NAME = "自定义动作";
    const MOD_VERSION = "0.3.2";

    const 笨蛋Luzi = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });

    const w = window;
    const ActivityICONS = new Map();
    const poseMapping = {};



    // 替换自己发出去的文字
    笨蛋Luzi.hookFunction("ServerSend", 5, (args, next) => {
        if (args[0] == "ChatRoomChat" && args[1]?.Type == "Activity") {
            let data = args[1];
            let actName = data.Dictionary[3]?.ActivityName ?? "";
            if (actName.indexOf("自定义笨蛋Luzi_") == 0) {
                let { metadata, substitutions } = ChatRoomMessageRunExtractors(data, Player)
                let msg = ActivityDictionaryText(data.Content);
                msg = CommonStringSubstitute(msg, substitutions ?? [])
                data.Dictionary.push({
                    Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + data.Content,
                    Text: msg
                });
            }
        }
        let data = args[1];
        let actName = data.Dictionary[3]?.ActivityName ?? "";
        if (actName.indexOf("笨蛋Luzi_") == 0) {
            let { metadata, substitutions } = ChatRoomMessageRunExtractors(data, Player)
            let msg = ActivityDictionaryText(data.Content);
            msg = CommonStringSubstitute(msg, substitutions ?? [])
            data.Dictionary.push({
                Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + data.Content,
                Text: msg
            });
        }
        if (actName.indexOf("笨蛋笨Luzi_") == 0) {
            let { metadata, substitutions } = ChatRoomMessageRunExtractors(data, Player)
            let msg = ActivityDictionaryText(data.Content);
            msg = CommonStringSubstitute(msg, substitutions ?? [])
            data.Dictionary.push({
                Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + data.Content,
                Text: msg
            });
        }
        next(args);
    });


    /**
     * 创建活动对象的函数
     * @param {string} prerequisite - 动作前提条件
     * @param {string} name - 动作名称
     * @param {string} targetSelf - 对自己做动作的部位
     * @param {string} target - 对他人做动作的部位
     * @param {number} maxProgressSelf - 对自己做动作最大的兴奋值
     * @param {number} maxProgress - 对他人做动作最大的兴奋值
     * @param {Array} activityExpression - 动作表情
     * @param {string} targetSelftext - 对自己做动作的描述
     * @param {string} targettext - 对他人做动作的描述
     * @param {string} assetgroup - 道具图片的组名没有就 ""
     * @param {string} imageName - 如果道具组名没有就填写姿势图片名称
     * @param {boolean} modPosture - true修改姿势  false不修改姿势
     * @param {boolean} modifyOwnPosture - true修改自己的姿势  false活动的目标动作修改自己的姿势
     * @param {string} postureName - 姿势名称
     * @returns {object} - 包含创建的活动信息的对象
     */
    function createActivity(activityInfo) {
        const {
            prerequisite,
            name,
            targetSelf,
            target,
            maxProgressSelf,
            maxProgress,
            activityExpression,
            targetSelftext,
            targettext,
            assetgroup,
            imageName,
            modPosture,
            modifyOwnPosture,
            postureName
        } = activityInfo;

        const activity = {
            Name: `自定义笨蛋Luzi_${name}`, // 道具名字
            TargetSelf: [targetSelf], // 自己的部位
            Target: [target], // 对方的部位
            MaxProgressSelf: maxProgressSelf, // 自己目标最大进度
            MaxProgress: maxProgress, // 对方活动最大进度
            Prerequisite: prerequisite, // 前提条件
            ActivityExpression: activityExpression, // 活动表情
        };
        ActivityFemale3DCG.push(activity); // 这个是把自己的活动数组添加进去
        ActivityFemale3DCGOrdering.push(activity.Name); // 这个是活动名字
        ActivityDictionary.push([`Activity自定义笨蛋Luzi_${name}`, `${name}`]);
        if (targetSelftext) {
            ActivityDictionary.push([`Label-ChatSelf-${targetSelf}-${activity.Name}`, `${name}`]);
            ActivityDictionary.push([`ChatSelf-${targetSelf}-${activity.Name}`, targetSelftext]);
        };
        if (targettext) {
            ActivityDictionary.push([`Label-ChatOther-${target}-${activity.Name}`, `${name}`]);
            ActivityDictionary.push([`ChatOther-${target}-${activity.Name}`, targettext]);
        };

        if (!assetgroup) {
            ActivityICONS.set(`Assets/Female3DCG/Activity/自定义笨蛋Luzi_${name}.png`, `Assets/Female3DCG/Activity/${imageName}.png`);
        } else {
            ActivityICONS.set(`Assets/Female3DCG/Activity/自定义笨蛋Luzi_${name}.png`, `Assets/Female3DCG/${assetgroup}/Preview/${imageName}.png`);
        };
        if (modPosture) {
            if (modifyOwnPosture) {
                poseMapping[`ChatSelf-${targetSelf}-自定义笨蛋Luzi_${name}`] = postureName;
            } else {
                poseMapping[`ChatOther-${target}-自定义笨蛋Luzi_${name}`] = postureName;
            }
        };
    }
    // 添加动作
    const activitiesInfo = [
        {
            name: "歪头", prerequisite: [],
            targetSelf: "ItemNeck", targetSelftext: "SourceCharacter歪头.", maxProgressSelf: 50,
            target: "", targettext: "", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "Wiggle",
            modPosture: false, modifyOwnPosture: true, postureName: ""
        },
        {
            name: "蹭大腿", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemLegs", targettext: "SourceCharacter用头轻轻蹭TargetCharacter的大腿.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "PoliteKiss",
            modPosture: true, modifyOwnPosture: false, postureName: "Kneel"
        },
        {
            name: "蹭小腿", prerequisite: [],
            targetSelf: "", targetSelftext: "", maxProgressSelf: 50,
            target: "ItemFeet", targettext: "SourceCharacter用头轻轻蹭TargetCharacter的小腿.", maxProgress: 50,
            activityExpression: [],
            assetgroup: "", imageName: "PoliteKiss",
            modPosture: true, modifyOwnPosture: false, postureName: "AllFours"
        },
        // {
        //     name: "剪刀剪掉上衣", prerequisite: ["UseHands", "UseArms", "HasSword"],
        //     targetSelf: "ItemTorso", targetSelftext: "SourceCharacter用剪刀剪掉了自己的上衣.", maxProgressSelf: 50,
        //     target: "ItemTorso", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的上衣.", maxProgress: 50,
        //     activityExpression: [],
        //     assetgroup: "ItemHandheld", imageName: "Scissors",
        //     modPosture: false, modifyOwnPosture: false, postureName: ""
        // },
        // {
        //     name: "剪刀剪掉下衣", prerequisite: ["UseHands", "UseArms", "HasSword"],
        //     targetSelf: "ItemPelvis", targetSelftext: "SourceCharacter用剪刀剪掉了自己的下衣.", maxProgressSelf: 50,
        //     target: "ItemPelvis", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的下衣.", maxProgress: 50,
        //     activityExpression: [],
        //     assetgroup: "ItemHandheld", imageName: "Scissors",
        //     modPosture: false, modifyOwnPosture: false, postureName: ""
        // },
        // {
        //     name: "剪刀剪掉胸罩", prerequisite: ["UseHands", "UseArms", "HasSword"],
        //     targetSelf: "ItemBreast", targetSelftext: "SourceCharacter用剪刀剪掉了自己的胸罩.", maxProgressSelf: 50,
        //     target: "ItemBreast", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的胸罩.", maxProgress: 50,
        //     activityExpression: [],
        //     assetgroup: "ItemHandheld", imageName: "Scissors",
        //     modPosture: false, modifyOwnPosture: false, postureName: ""
        // },
        // {
        //     name: "剪刀剪掉内裤", prerequisite: ["UseHands", "UseArms", "HasSword"],
        //     targetSelf: "ItemVulvaPiercings", targetSelftext: "SourceCharacter用剪刀剪掉了自己的内裤.", maxProgressSelf: 50,
        //     target: "ItemVulvaPiercings", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的内裤.", maxProgress: 50,
        //     activityExpression: [],
        //     assetgroup: "ItemHandheld", imageName: "Scissors",
        //     modPosture: false, modifyOwnPosture: false, postureName: ""
        // },
        // {
        //     name: "剪刀剪掉袜子", prerequisite: ["UseHands", "UseArms", "HasSword"],
        //     targetSelf: "ItemBoots", targetSelftext: "SourceCharacter用剪刀剪掉了自己的袜子.", maxProgressSelf: 50,
        //     target: "ItemBoots", targettext: "SourceCharacter用剪刀剪掉了TargetCharacter的袜子.", maxProgress: 50,
        //     activityExpression: [],
        //     assetgroup: "ItemHandheld", imageName: "Scissors",
        //     modPosture: false, modifyOwnPosture: false, postureName: ""
        // },
        // {
        //     name: "舔触手", prerequisite: ["HasTentacles"],
        //     targetSelf: "ItemMouth", targetSelftext: "SourceCharacter舔PronounPossessive的触手.", maxProgressSelf: 50,
        //     target: "", targettext: "", maxProgress: 50,
        //     activityExpression: [],
        //     assetgroup: "TailStraps", imageName: "Tentacles",
        //     modPosture: false, modifyOwnPosture: false, postureName: ""
        // },
        // {
        //     name: "触手戳鼻子", prerequisite: ["HasTentacles2"],
        //     targetSelf: "ItemNose", targetSelftext: "SourceCharacter用触手戳了戳自己的鼻子.", maxProgressSelf: 50,
        //     target: "ItemNose", targettext: "SourceCharacter用触手戳了戳TargetCharacter的鼻子.", maxProgress: 50,
        //     activityExpression: [],
        //     assetgroup: "TailStraps", imageName: "Tentacles",
        //     modPosture: false, modifyOwnPosture: false, postureName: ""
        // },



    ];

    // 先决条件
    const CustomPrerequisiteFuncs = new Map(Object.entries({
        // 单向 仅自己
        "HasTail": (acting, acted, group) => !!InventoryGet(acted, "TailStraps"), // 有尾巴
        "HasWings": (acting, acted, group) => !!InventoryGet(acted, "Wings"), // 有翅膀
        "HasLeash": (acting, acted, group) => !!ChatRoomCanBeLeashed(acted), // 有拴绳
        "HasTailCat": (acting, acted, group) => // 有猫尾巴
            !!InventoryIsItemInList(acted, "TailStraps", "TailStrap") ||
            !!InventoryIsItemInList(acted, "TailStraps", "KittenTailStrap1"),
        "HasTentacles": (acting, acted, group) => !!InventoryIsItemInList(acted, "TailStraps", "Tentacles"), // 触手

        // 双向
        "HasPawMittens": (acting, acted, group) => // 有猫爪手套
            !!InventoryIsItemInList(acting, "ItemHands", "PawMittens"),
        "HasPet": (acting, acted, group) =>// 有宠物服
            !!InventoryIsItemInList(acting, "ItemArms", "BitchSuit") ||
            !!InventoryIsItemInList(acting, "ItemArms", "PetCrawler") ||
            !!InventoryIsItemInList(acting, "ItemArms", "StrictLeatherPetCrawler") ||
            !!InventoryIsItemInList(acting, "ItemArms", "ShinyPetSuit"),
        "HasKennel": (acting, acted, group) => // 有狗笼
            !!InventoryIsItemInList(acting, "ItemDevices", "Kennel"),
        "HasItemVulvaPiercings": (acting, acted, group) => !!InventoryGet(acted, "ItemVulvaPiercings"), // 有穿环
        "HasItemVulva": (acting, acted, group) => !!InventoryGet(acted, "ItemVulva"), // 阴部有道具
        "HasSword": (acting, acted, group) => // 有泡沫剑
            !!InventoryIsItemInList(acting, "ItemHandheld", "Sword"),
        "HasScissors": (acting, acted, group) => // 有剪刀
            !!InventoryIsItemInList(acting, "ItemHandheld", "Scissors"),

        "HasCloth": (acting, acted, group) => !!InventoryGet(acting, "Cloth"), // 有衣服
        "HasNoCloth": (acting, acted, group) => !InventoryGet(acting, "Cloth"), // 没有衣服
        "HasClothLower": (acting, acted, group) => !!InventoryGet(acting, "ClothLower"), // 有下装
        "HasBra": (acting, acted, group) => !!InventoryGet(acting, "Bra"), // 有胸罩
        "HasPanties": (acting, acted, group) => !!InventoryGet(acting, "Panties"), // 有内裤
        "HasSocks": (acting, acted, group) => !!InventoryGet(acting, "Socks"), // 有袜子
        "Hassaddle": (acting, acted, group) => !!InventoryIsItemInList(acting, "ItemTorso", "缰绳_Luzi"), // 鞍
        "Hasbed": (acting, acted, group) => !!InventoryIsItemInList(acting, "ItemDevices", "床右边_Luzi"), // 鞍
        "HasTentacles2": (acting, acted, group) => !!InventoryIsItemInList(acting, "TailStraps", "Tentacles"), // 触手


    }));

    笨蛋Luzi.hookFunction("ActivityCheckPrerequisite", 500, (args, next) => {
        var prereqName = args[0];
        if (CustomPrerequisiteFuncs.has(prereqName)) {
            var acting = args[1];
            var acted = args[2];
            var targetGrp = args[3];
            var customPrereqFunc = CustomPrerequisiteFuncs.get(prereqName);
            if (!customPrereqFunc)
                return next(args);
            else {
                return customPrereqFunc(acting, acted, targetGrp);
            }
        }
        else
            return next(args);
    });

    笨蛋Luzi.hookFunction('DrawImageResize', 50, (args, next) => {
        const data = args[0];
        if (typeof data === 'string' && data.indexOf("自定义笨蛋Luzi_") !== -1) {
            if (ActivityICONS.has(data)) {
                args[0] = ActivityICONS.get(data);
            }
        }
        next(args);
    });

    let is_笨蛋炉子 = false;
    笨蛋Luzi.hookFunction("LoginResponse", 10, (args, next) => {
        next(args)
        if (!is_笨蛋炉子) {
            w.newActivities = activitiesInfo.map(activityInfo => createActivity(activityInfo));
            is_笨蛋炉子 = true;
        }
    })

    //============================================================
    //============================================================
    /**
     * 从玩家身上移除指定活动的道具组函数
     * @param {object} data - 活动消息的数据对象
     * @param {string} groupName - 身体部位名称
     * @param {string} assetName - 活动名称
     * @param {string} removalGroup - 要移除的道具组名称
     */
    function removeActivityItems(data, groupName, assetName, removalGroup) {
        // 检测消息发送者是否是玩家自身, 并且消息内容是否包含对应的 Activity
        if (data.Sender === Player.MemberNumber && (data.Content.includes(`Self-${groupName}-${assetName}`) || data.Content.includes(`Other-${groupName}-${assetName}`))) {

            const targetCharacter = data.Dictionary.find(entry => entry.TargetCharacter !== undefined)?.TargetCharacter; // 提取对方的ID
            const playerIndex = ChatRoomCharacter.findIndex(player => player.MemberNumber === targetCharacter); // 查找房间内对应的玩家
            const targetMember = ChatRoomCharacter[playerIndex]; // 对方玩家的信息
            if (playerIndex !== -1) {
                InventoryRemove(targetMember, removalGroup);
                ChatRoomCharacterUpdate(targetMember)
            }
        }
    }


    /**
    * 道具切换
    * @param {string} itemSlot - 道具的槽位
    * @param {string} item1 - 道具名称 1
    * @param {string} item2 - 道具名称 2
    */
    function switchItem(itemSlot, item1, item2) {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                let item = InventoryGet(Player, itemSlot);
                let itemName = item.Asset.Name;
                let itemColor = item.Color;

                if (itemName === item1 && !!InventoryGet(Player, itemSlot)) {
                    InventoryWear(Player, item2, itemSlot, itemColor);
                    ChatRoomCharacterUpdate(Player)
                } else if (itemName === item2 && !!InventoryGet(Player, itemSlot)) {
                    InventoryWear(Player, item1, itemSlot, itemColor);
                    ChatRoomCharacterUpdate(Player)
                }
            }, 200 * i);
        }
    }




    笨蛋Luzi.hookFunction("ChatRoomMessage", 0, (args, next) => {
        const data = args[0];

        removeActivityItems(data, "ItemTorso", "自定义笨蛋Luzi_剪刀剪掉上衣", "Cloth");
        removeActivityItems(data, "ItemPelvis", "自定义笨蛋Luzi_剪刀剪掉下衣", "ClothLower");
        removeActivityItems(data, "ItemBreast", "自定义笨蛋Luzi_剪刀剪掉胸罩", "Bra");
        removeActivityItems(data, "ItemVulvaPiercings", "自定义笨蛋Luzi_剪刀剪掉内裤", "Panties");
        removeActivityItems(data, "ItemBoots", "自定义笨蛋Luzi_剪刀剪掉袜子", "Socks");

        if (data.Content === "ChatSelf-ItemButt-自定义笨蛋Luzi_摇晃尾巴" && data.Sender === Player.MemberNumber) {
            switchItem("TailStraps", "PuppyTailStrap1", "穿戴式软小狗尾镜像_Luzi");
            switchItem("TailStraps", "PuppyTailStrap", "穿戴式狗尾镜像_Luzi");
            switchItem("TailStraps", "WolfTailStrap3", "白色穿戴式狼尾镜像_Luzi");
            switchItem("TailStraps", "KittenTailStrap1", "穿戴式浅色猫尾镜像_Luzi");
            switchItem("TailStraps", "WolfTailStrap1", "大型穿戴式狼尾镜像_Luzi");
            switchItem("TailStraps", "WolfTailStrap2", "小型穿戴式狼尾镜像_Luzi");
            switchItem("TailStraps", "KittenTailStrap2", "小型穿戴式软猫尾镜像_Luzi");
            switchItem("TailStraps", "TailStrap", "穿戴式猫尾镜像_Luzi");
            switchItem("TailStraps", "FoxTailStrap1", "FoxTailStrap2");
        }

        next(args);
    });
    //============================================================
    //============================================================

    let is笨蛋炉子 = false;
    笨蛋Luzi.hookFunction("LoginResponse", 10, (args, next) => {
        next(args)
        if (!is笨蛋炉子) {
            var Nibble = { Name: "Nibble", MaxProgress: 40, Prerequisite: ["ZoneAccessible", "UseMouth", "ZoneNaked"], Target: ["ItemArms", "ItemBoots", "ItemEars", "ItemFeet", "ItemHands", "ItemLegs", "ItemMouth", "ItemNeck", "ItemNipples", "ItemNose", "ItemPelvis", "ItemTorso", "ItemTorso2", "ItemVulva", "ItemVulvaPiercings",], TargetSelf: ["ItemArms", "ItemBoots", "ItemHands", "ItemMouth", "ItemNipples",], };
            ActivityFemale3DCG.push(Nibble);
            // ActivityFemale3DCG.push(Nibble.Name);

            w.newActivities = activitiesInfo.map(activityInfo => createActivity(activityInfo));
            if (Player.OnlineSettings.ECHO && Player.OnlineSettings.ECHO.炉子ActivityFemale3DCG) {
                // 解压炉子ActivityFemale3DCG
                var decompressedActivityFemale3DCG = JSON.parse(LZString.decompressFromUTF16(Player.OnlineSettings.ECHO.炉子ActivityFemale3DCG));
                ActivityFemale3DCG.push(...decompressedActivityFemale3DCG); // 将解压缩后的数据添加到ActivityFemale3DCG数组中
            }
            if (Player.OnlineSettings.ECHO && Player.OnlineSettings.ECHO.炉子ActivityFemale3DCGOrdering) {
                // 解压炉子ActivityFemale3DCGOrdering
                var decompressedActivityFemale3DCGOrdering = JSON.parse(LZString.decompressFromUTF16(Player.OnlineSettings.ECHO.炉子ActivityFemale3DCGOrdering));
                ActivityFemale3DCGOrdering.push(...decompressedActivityFemale3DCGOrdering); // 将解压缩后的数据添加到ActivityFemale3DCGOrdering数组中
            }
            if (Player.OnlineSettings.ECHO && Player.OnlineSettings.ECHO.炉子ActivityDictionary) {
                // 解压炉子ActivityDictionary
                var decompressedActivityDictionary = JSON.parse(LZString.decompressFromUTF16(Player.OnlineSettings.ECHO.炉子ActivityDictionary));
                ActivityDictionary.push(...decompressedActivityDictionary); // 将解压缩后的数据添加到ActivityDictionary数组中
            }
            is笨蛋炉子 = true;
        }
    })

})();
