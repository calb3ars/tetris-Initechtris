/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.piece = new Piece(this);
    this.board = this.createBoard(width, height);
  }

  createBoard(width, height) {
    const board = [];
    while (height > 0) {
      board.push(new Array(width).fill(0));
      height--;
    }
    return board;
  }

  // clearBoard() {
  //   this.board.forEach(row => row.fill(0));
  // }

  clearRow() {

  }

  collision(piece) {

  }

  mergePiece(piece) {

  }
}

module.exports = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);
const Piece = __webpack_require__(5);

class Game {
  constructor() {
    this.board = [];
    this.piece = new Piece(this);
    this.score = 0;
    this.difficulty = 1;
  }



  collide(){} //collision

  pieceDrop(){}


}

Game.BG_COLOR = "#000";
Game.DIM_X = 240;
Game.DIM_Y = 400;
Game.FPS = 32;

module.exports = Game;


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const  View = __webpack_require__(6);

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("initechtris")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  ctx.scale(20,20);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0, canvasEl.width, canvasEl.height);
  // const game = new Game();
  // new  View(game, ctx);
  new View(ctx);
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Piece {
  constructor() {
    this.position = { x: 0, y: 0 },
    this.matrix = null;
    this.color = "";
  }

  // direction

  // array

  // move(direction)


}

module.exports = Piece;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/andrew/Desktop/tetris-Initechtris/lib/view.js Unexpected token (35:4)\nYou may need an appropriate loader to handle this file type.\n|     while(height > 0) {\n|       matrix.push(new Array(width).fill(0)\n|     }\n|     return grid\n|   }");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map