/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/food_app.ts":
/*!*************************!*\
  !*** ./src/food_app.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Food: () => (/* binding */ Food),\n/* harmony export */   FoodApp: () => (/* binding */ FoodApp),\n/* harmony export */   Foods: () => (/* binding */ Foods)\n/* harmony export */ });\nclass Score {\n    constructor(foods) {\n        this.foods = null;\n        const element = document.querySelector('.score__number');\n        if (!element) {\n            throw new Error(\"Score element not found. Please ensure '.score__number' exists in the DOM\");\n        }\n        this.scoreElement = element;\n        this.foods = foods;\n    }\n    setFoods(foods) {\n        this.foods = foods;\n    }\n    get totalScore() {\n        if (!this.foods) {\n            throw new Error(\"Foods is not set\");\n        }\n        return this.foods.calculateTotalScore();\n    }\n    render() {\n        this.scoreElement.textContent = this.totalScore.toString();\n    }\n}\nclass Food {\n    constructor(element, scoreInstance) {\n        this.element = element;\n        this.scoreInstance = scoreInstance;\n        this.boundHandleClick = this.handleClick.bind(this);\n        element.addEventListener('click', this.boundHandleClick);\n    }\n    handleClick() {\n        this.toggleActive();\n        this.updateScore();\n    }\n    toggleActive() {\n        this.element.classList.toggle('food--active');\n    }\n    updateScore() {\n        this.scoreInstance.render();\n    }\n    cleanup() {\n        this.element.removeEventListener('click', this.boundHandleClick);\n    }\n    destroy() {\n        this.cleanup();\n    }\n    get score() {\n        var _a, _b;\n        const score = (_b = (_a = this.element.querySelector('.food__score')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '0';\n        return Number(score) || 0;\n    }\n    get isActive() {\n        return this.element.classList.contains('food--active');\n    }\n    // innerHTML使用時のサニタイズ処理の追加を推奨\n    sanitizeContent(content) {\n        // サニタイズ処理の実装\n        return content.replace(/<script.*?>/g, '');\n    }\n}\nclass Foods {\n    constructor(scoreInstance) {\n        this.scoreInstance = scoreInstance;\n        this._foodInstances = [];\n        this.elements = Array.from(document.querySelectorAll('.food'));\n        this.elements.forEach(element => {\n            const food = new Food(element, scoreInstance);\n            this._foodInstances.push(food);\n        });\n    }\n    get activeFoods() {\n        return this._foodInstances.filter(food => food.isActive);\n    }\n    set activeFoods(value) {\n        this._foodInstances = value;\n    }\n    getFoodInstances() {\n        return this._foodInstances;\n    }\n    set foodInstances(value) {\n        this._foodInstances = value;\n    }\n    calculateTotalScore() {\n        return this.activeFoods.reduce((total, food) => total + food.score, 0);\n    }\n}\nclass FoodAppFactory {\n    static create() {\n        const initialScore = new Score(null);\n        const foods = new Foods(initialScore);\n        initialScore.setFoods(foods);\n        return { score: initialScore, foods };\n    }\n}\nclass FoodApp {\n    constructor() {\n        const { score, foods } = FoodAppFactory.create();\n        this.score = score;\n        this.foods = foods;\n    }\n    static initialize() {\n        return new FoodApp();\n    }\n    static cleanup() {\n        document.removeEventListener('DOMContentLoaded', FoodApp.initialize);\n    }\n    getScore() {\n        return this.score;\n    }\n    getFoods() {\n        return this.foods;\n    }\n}\nlet app;\n//domContentLoadedイベントを待ってから初期化\ndocument.addEventListener('DOMContentLoaded', () => {\n    app = FoodApp.initialize();\n});\n\n\n//# sourceURL=webpack:///./src/food_app.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/food_app.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;