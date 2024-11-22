/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbiplast"] = self["webpackChunkbiplast"] || []).push([["reactPlayerMixcloud"],{

/***/ "./node_modules/react-player/lib/players/Mixcloud.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-player/lib/players/Mixcloud.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var __create = Object.create;\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __getProtoOf = Object.getPrototypeOf;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __export = (target, all) => {\n  for (var name in all)\n    __defProp(target, name, { get: all[name], enumerable: true });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from))\n      if (!__hasOwnProp.call(to, key) && key !== except)\n        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n  }\n  return to;\n};\nvar __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(\n  // If the importer is in node compatibility mode or this is not an ESM\n  // file that has been converted to a CommonJS file using a Babel-\n  // compatible transform (i.e. \"__esModule\" has not been set), then set\n  // \"default\" to the CommonJS \"module.exports\" for node compatibility.\n  isNodeMode || !mod || !mod.__esModule ? __defProp(target, \"default\", { value: mod, enumerable: true }) : target,\n  mod\n));\nvar __toCommonJS = (mod) => __copyProps(__defProp({}, \"__esModule\", { value: true }), mod);\nvar __publicField = (obj, key, value) => {\n  __defNormalProp(obj, typeof key !== \"symbol\" ? key + \"\" : key, value);\n  return value;\n};\nvar Mixcloud_exports = {};\n__export(Mixcloud_exports, {\n  default: () => Mixcloud\n});\nmodule.exports = __toCommonJS(Mixcloud_exports);\nvar import_react = __toESM(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nvar import_utils = __webpack_require__(/*! ../utils */ \"./node_modules/react-player/lib/utils.js\");\nvar import_patterns = __webpack_require__(/*! ../patterns */ \"./node_modules/react-player/lib/patterns.js\");\nconst SDK_URL = \"https://widget.mixcloud.com/media/js/widgetApi.js\";\nconst SDK_GLOBAL = \"Mixcloud\";\nclass Mixcloud extends import_react.Component {\n  constructor() {\n    super(...arguments);\n    __publicField(this, \"callPlayer\", import_utils.callPlayer);\n    __publicField(this, \"duration\", null);\n    __publicField(this, \"currentTime\", null);\n    __publicField(this, \"secondsLoaded\", null);\n    __publicField(this, \"mute\", () => {\n    });\n    __publicField(this, \"unmute\", () => {\n    });\n    __publicField(this, \"ref\", (iframe) => {\n      this.iframe = iframe;\n    });\n  }\n  componentDidMount() {\n    this.props.onMount && this.props.onMount(this);\n  }\n  load(url) {\n    (0, import_utils.getSDK)(SDK_URL, SDK_GLOBAL).then((Mixcloud2) => {\n      this.player = Mixcloud2.PlayerWidget(this.iframe);\n      this.player.ready.then(() => {\n        this.player.events.play.on(this.props.onPlay);\n        this.player.events.pause.on(this.props.onPause);\n        this.player.events.ended.on(this.props.onEnded);\n        this.player.events.error.on(this.props.error);\n        this.player.events.progress.on((seconds, duration) => {\n          this.currentTime = seconds;\n          this.duration = duration;\n        });\n        this.props.onReady();\n      });\n    }, this.props.onError);\n  }\n  play() {\n    this.callPlayer(\"play\");\n  }\n  pause() {\n    this.callPlayer(\"pause\");\n  }\n  stop() {\n  }\n  seekTo(seconds, keepPlaying = true) {\n    this.callPlayer(\"seek\", seconds);\n    if (!keepPlaying) {\n      this.pause();\n    }\n  }\n  setVolume(fraction) {\n  }\n  getDuration() {\n    return this.duration;\n  }\n  getCurrentTime() {\n    return this.currentTime;\n  }\n  getSecondsLoaded() {\n    return null;\n  }\n  render() {\n    const { url, config } = this.props;\n    const id = url.match(import_patterns.MATCH_URL_MIXCLOUD)[1];\n    const style = {\n      width: \"100%\",\n      height: \"100%\"\n    };\n    const query = (0, import_utils.queryString)({\n      ...config.options,\n      feed: `/${id}/`\n    });\n    return /* @__PURE__ */ import_react.default.createElement(\n      \"iframe\",\n      {\n        key: id,\n        ref: this.ref,\n        style,\n        src: `https://www.mixcloud.com/widget/iframe/?${query}`,\n        frameBorder: \"0\",\n        allow: \"autoplay\"\n      }\n    );\n  }\n}\n__publicField(Mixcloud, \"displayName\", \"Mixcloud\");\n__publicField(Mixcloud, \"canPlay\", import_patterns.canPlay.mixcloud);\n__publicField(Mixcloud, \"loopOnEnded\", true);\n\n\n//# sourceURL=webpack://biplast/./node_modules/react-player/lib/players/Mixcloud.js?");

/***/ })

}]);