/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbiplast"] = self["webpackChunkbiplast"] || []).push([["reactPlayerWistia"],{

/***/ "./node_modules/react-player/lib/players/Wistia.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-player/lib/players/Wistia.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var __create = Object.create;\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __getProtoOf = Object.getPrototypeOf;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __export = (target, all) => {\n  for (var name in all)\n    __defProp(target, name, { get: all[name], enumerable: true });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from))\n      if (!__hasOwnProp.call(to, key) && key !== except)\n        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n  }\n  return to;\n};\nvar __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(\n  // If the importer is in node compatibility mode or this is not an ESM\n  // file that has been converted to a CommonJS file using a Babel-\n  // compatible transform (i.e. \"__esModule\" has not been set), then set\n  // \"default\" to the CommonJS \"module.exports\" for node compatibility.\n  isNodeMode || !mod || !mod.__esModule ? __defProp(target, \"default\", { value: mod, enumerable: true }) : target,\n  mod\n));\nvar __toCommonJS = (mod) => __copyProps(__defProp({}, \"__esModule\", { value: true }), mod);\nvar __publicField = (obj, key, value) => {\n  __defNormalProp(obj, typeof key !== \"symbol\" ? key + \"\" : key, value);\n  return value;\n};\nvar Wistia_exports = {};\n__export(Wistia_exports, {\n  default: () => Wistia\n});\nmodule.exports = __toCommonJS(Wistia_exports);\nvar import_react = __toESM(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nvar import_utils = __webpack_require__(/*! ../utils */ \"./node_modules/react-player/lib/utils.js\");\nvar import_patterns = __webpack_require__(/*! ../patterns */ \"./node_modules/react-player/lib/patterns.js\");\nconst SDK_URL = \"https://fast.wistia.com/assets/external/E-v1.js\";\nconst SDK_GLOBAL = \"Wistia\";\nconst PLAYER_ID_PREFIX = \"wistia-player-\";\nclass Wistia extends import_react.Component {\n  constructor() {\n    super(...arguments);\n    __publicField(this, \"callPlayer\", import_utils.callPlayer);\n    __publicField(this, \"playerID\", this.props.config.playerId || `${PLAYER_ID_PREFIX}${(0, import_utils.randomString)()}`);\n    // Proxy methods to prevent listener leaks\n    __publicField(this, \"onPlay\", (...args) => this.props.onPlay(...args));\n    __publicField(this, \"onPause\", (...args) => this.props.onPause(...args));\n    __publicField(this, \"onSeek\", (...args) => this.props.onSeek(...args));\n    __publicField(this, \"onEnded\", (...args) => this.props.onEnded(...args));\n    __publicField(this, \"onPlaybackRateChange\", (...args) => this.props.onPlaybackRateChange(...args));\n    __publicField(this, \"mute\", () => {\n      this.callPlayer(\"mute\");\n    });\n    __publicField(this, \"unmute\", () => {\n      this.callPlayer(\"unmute\");\n    });\n  }\n  componentDidMount() {\n    this.props.onMount && this.props.onMount(this);\n  }\n  load(url) {\n    const { playing, muted, controls, onReady, config, onError } = this.props;\n    (0, import_utils.getSDK)(SDK_URL, SDK_GLOBAL).then((Wistia2) => {\n      if (config.customControls) {\n        config.customControls.forEach((control) => Wistia2.defineControl(control));\n      }\n      window._wq = window._wq || [];\n      window._wq.push({\n        id: this.playerID,\n        options: {\n          autoPlay: playing,\n          silentAutoPlay: \"allow\",\n          muted,\n          controlsVisibleOnLoad: controls,\n          fullscreenButton: controls,\n          playbar: controls,\n          playbackRateControl: controls,\n          qualityControl: controls,\n          volumeControl: controls,\n          settingsControl: controls,\n          smallPlayButton: controls,\n          ...config.options\n        },\n        onReady: (player) => {\n          this.player = player;\n          this.unbind();\n          this.player.bind(\"play\", this.onPlay);\n          this.player.bind(\"pause\", this.onPause);\n          this.player.bind(\"seek\", this.onSeek);\n          this.player.bind(\"end\", this.onEnded);\n          this.player.bind(\"playbackratechange\", this.onPlaybackRateChange);\n          onReady();\n        }\n      });\n    }, onError);\n  }\n  unbind() {\n    this.player.unbind(\"play\", this.onPlay);\n    this.player.unbind(\"pause\", this.onPause);\n    this.player.unbind(\"seek\", this.onSeek);\n    this.player.unbind(\"end\", this.onEnded);\n    this.player.unbind(\"playbackratechange\", this.onPlaybackRateChange);\n  }\n  play() {\n    this.callPlayer(\"play\");\n  }\n  pause() {\n    this.callPlayer(\"pause\");\n  }\n  stop() {\n    this.unbind();\n    this.callPlayer(\"remove\");\n  }\n  seekTo(seconds, keepPlaying = true) {\n    this.callPlayer(\"time\", seconds);\n    if (!keepPlaying) {\n      this.pause();\n    }\n  }\n  setVolume(fraction) {\n    this.callPlayer(\"volume\", fraction);\n  }\n  setPlaybackRate(rate) {\n    this.callPlayer(\"playbackRate\", rate);\n  }\n  getDuration() {\n    return this.callPlayer(\"duration\");\n  }\n  getCurrentTime() {\n    return this.callPlayer(\"time\");\n  }\n  getSecondsLoaded() {\n    return null;\n  }\n  render() {\n    const { url } = this.props;\n    const videoID = url && url.match(import_patterns.MATCH_URL_WISTIA)[1];\n    const className = `wistia_embed wistia_async_${videoID}`;\n    const style = {\n      width: \"100%\",\n      height: \"100%\"\n    };\n    return /* @__PURE__ */ import_react.default.createElement(\"div\", { id: this.playerID, key: videoID, className, style });\n  }\n}\n__publicField(Wistia, \"displayName\", \"Wistia\");\n__publicField(Wistia, \"canPlay\", import_patterns.canPlay.wistia);\n__publicField(Wistia, \"loopOnEnded\", true);\n\n\n//# sourceURL=webpack://biplast/./node_modules/react-player/lib/players/Wistia.js?");

/***/ })

}]);