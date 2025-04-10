/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameLogic/Player.js":
/*!*********************************!*\
  !*** ./src/gameLogic/Player.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\nconst {Gameboard} = require(\"./Gameboard\");\n\nclass Player\n{\n    #gameboard = null\n    #playerNumber = 1\n    #isComputer = false\n\n    constructor(playerNumber = 1, isComputer=false, gameboardSize=9)\n    {\n        this.#playerNumber = playerNumber\n        this.#isComputer = isComputer\n        this.createGameBoard(gameboardSize)\n    }\n\n    createGameBoard(gameboardSize=9)\n    {\n        this.#gameboard = new Gameboard(gameboardSize)\n    }\n\n    receiveAttack(location)\n    {\n        this.#gameboard.receiveAttack(location)\n    }\n\n    placeShip(shipType, location, orientation)\n    {\n        let result = this.#gameboard.placeShip(shipType, location, orientation)\n        if (result != \"\")\n        {\n            console.log(result)\n        }\n    }   \n\n    getPlayerNumber()\n    {\n        return this.#playerNumber\n    }\n\n    getIsComputer()\n    {\n        return this.#isComputer\n    }\n    \n    getOwnGameboard()\n    {\n        /*\n        Returns a gameboard that is shown to this player (Shows received hits, all ships)\n        */\n       return this.#gameboard.getPlayerBoard()\n    }\n\n    getEnemyGameboard()\n    {\n        /*\n        Returns a gameboard that is shown to the enemy player (Shows hits, sunk ships)\n        */\n        return this.#gameboard.getEnemyBoard()\n    }\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZUxvZ2ljL1BsYXllci5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxXQUFXOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVMb2dpYy9QbGF5ZXIuanM/MmViZCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7R2FtZWJvYXJkfSA9IHJlcXVpcmUoXCIuL0dhbWVib2FyZFwiKTtcblxuY2xhc3MgUGxheWVyXG57XG4gICAgI2dhbWVib2FyZCA9IG51bGxcbiAgICAjcGxheWVyTnVtYmVyID0gMVxuICAgICNpc0NvbXB1dGVyID0gZmFsc2VcblxuICAgIGNvbnN0cnVjdG9yKHBsYXllck51bWJlciA9IDEsIGlzQ29tcHV0ZXI9ZmFsc2UsIGdhbWVib2FyZFNpemU9OSlcbiAgICB7XG4gICAgICAgIHRoaXMuI3BsYXllck51bWJlciA9IHBsYXllck51bWJlclxuICAgICAgICB0aGlzLiNpc0NvbXB1dGVyID0gaXNDb21wdXRlclxuICAgICAgICB0aGlzLmNyZWF0ZUdhbWVCb2FyZChnYW1lYm9hcmRTaXplKVxuICAgIH1cblxuICAgIGNyZWF0ZUdhbWVCb2FyZChnYW1lYm9hcmRTaXplPTkpXG4gICAge1xuICAgICAgICB0aGlzLiNnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKGdhbWVib2FyZFNpemUpXG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhsb2NhdGlvbilcbiAgICB7XG4gICAgICAgIHRoaXMuI2dhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxvY2F0aW9uKVxuICAgIH1cblxuICAgIHBsYWNlU2hpcChzaGlwVHlwZSwgbG9jYXRpb24sIG9yaWVudGF0aW9uKVxuICAgIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuI2dhbWVib2FyZC5wbGFjZVNoaXAoc2hpcFR5cGUsIGxvY2F0aW9uLCBvcmllbnRhdGlvbilcbiAgICAgICAgaWYgKHJlc3VsdCAhPSBcIlwiKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgIH1cbiAgICB9ICAgXG5cbiAgICBnZXRQbGF5ZXJOdW1iZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3BsYXllck51bWJlclxuICAgIH1cblxuICAgIGdldElzQ29tcHV0ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2lzQ29tcHV0ZXJcbiAgICB9XG4gICAgXG4gICAgZ2V0T3duR2FtZWJvYXJkKClcbiAgICB7XG4gICAgICAgIC8qXG4gICAgICAgIFJldHVybnMgYSBnYW1lYm9hcmQgdGhhdCBpcyBzaG93biB0byB0aGlzIHBsYXllciAoU2hvd3MgcmVjZWl2ZWQgaGl0cywgYWxsIHNoaXBzKVxuICAgICAgICAqL1xuICAgICAgIHJldHVybiB0aGlzLiNnYW1lYm9hcmQuZ2V0UGxheWVyQm9hcmQoKVxuICAgIH1cblxuICAgIGdldEVuZW15R2FtZWJvYXJkKClcbiAgICB7XG4gICAgICAgIC8qXG4gICAgICAgIFJldHVybnMgYSBnYW1lYm9hcmQgdGhhdCBpcyBzaG93biB0byB0aGUgZW5lbXkgcGxheWVyIChTaG93cyBoaXRzLCBzdW5rIHNoaXBzKVxuICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy4jZ2FtZWJvYXJkLmdldEVuZW15Qm9hcmQoKVxuICAgIH1cbn1cblxuZXhwb3J0IHtQbGF5ZXJ9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/gameLogic/Player.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameLogic_Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameLogic/Player.js */ \"./src/gameLogic/Player.js\");\n\n\nlet p = (0,_gameLogic_Player_js__WEBPACK_IMPORTED_MODULE_0__.Player)(3)\n\nconsole.log(p.getPlayerNumber())//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7QUFBNEM7O0FBRTVDLFFBQVEsNERBQU07O0FBRWQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/ZGVhNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BsYXllcn0gZnJvbSBcIi4vZ2FtZUxvZ2ljL1BsYXllci5qc1wiXG5cbmxldCBwID0gUGxheWVyKDMpXG5cbmNvbnNvbGUubG9nKHAuZ2V0UGxheWVyTnVtYmVyKCkpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;