module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var device = wx.getSystemInfoSync();
// 配置
var defOpt = {
    lineWidth: 2,
    lineNum: 90,
    padding: 14
};

var animation = wx.createAnimation({
    delay: 200,
    timingFunction: 'ease'
});

var ctx = void 0;

Component({
    properties: {
        min: {
            type: Number,
            value: 0
        },
        max: {
            type: Number,
            value: 100
        },
        val: {
            type: Number,
            value: 50,
            observer: function observer(val) {
                this.drawPage(val);
            }
        },
        width: {
            type: Number,
            value: 750
        },
        height: {
            type: Number,
            value: 400
        },
        colors: {
            type: Array,
            value: [{
                percent: 50,
                color: '#67C23A'
            }, {
                percent: 80,
                color: '#E6A23C'
            }, {
                percent: 100,
                color: '#F56C6C'
            }]
        }
    },
    data: {
        animationData: null,
        currentColor: '#ccc'
    },
    methods: {
        drawPage: function drawPage(val) {
            var percent = parseInt((val - this.data.min) / (this.data.max - this.data.min) * 100, 10);

            var deg = 180 * (percent / 100) - 90;
            // console.log(val, percent, deg)
            animation.rotate(deg).step();

            this.setData({
                currentColor: this.getCurrentColor(percent),
                animationData: animation.export()
            });
        },
        getCurrentColor: function getCurrentColor(percent) {
            var stepPercent = Math.min(percent || 0, 100);
            var result = void 0;
            for (var ci = 0; ci < this.data.colors.length; ci++) {
                var colorObj = this.data.colors[ci];
                if (stepPercent < colorObj.percent) {
                    result = colorObj.color;
                    break;
                }
            }
            return result;
        },
        drawPanel: function drawPanel() {
            if (!ctx) {
                return console.warn('error');
            }
            ctx.setFillStyle('red');
            ctx.fillRect(10, 10, 150, 100);
            ctx.draw();

            var halfWidth = parseInt(Math.min(this.data.width, 750) / 750 * device.windowWidth / 2, 10);
            var lineLength = parseInt(this.data.width / 750 * device.windowWidth / 20, 10);
            ctx.lineWidth = Math.round(this.data.width / 750) + 1;

            for (var i = 0; i < defOpt.lineNum; i++) {
                var stepPercent = parseInt(i / defOpt.lineNum * 100, 10);
                ctx.strokeStyle = this.getCurrentColor(stepPercent);

                ctx.save();
                ctx.translate(halfWidth, halfWidth);
                ctx.rotate(parseInt(180 / defOpt.lineNum * i - 90, 10) * Math.PI / 180);

                ctx.beginPath();
                ctx.moveTo(0, defOpt.padding - halfWidth);
                ctx.lineTo(0, defOpt.padding - halfWidth + lineLength);
                ctx.stroke();
                ctx.restore();
            }

            return ctx.draw();
        }
    },
    lifetimes: {
        attached: function attached() {
            ctx = wx.createCanvasContext('dial-canvas', this);
            this.drawPanel();
            if (this.data.val) {
                this.drawPage(this.data.val);
            }
        }
    }
});

/***/ })
/******/ ]);