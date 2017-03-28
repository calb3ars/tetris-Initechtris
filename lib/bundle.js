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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);
const Grid = __webpack_require__(5);

class TetrisView {
  constructor($el) {
    this.$el = $el;
    this.canvas = $el.querySelect('canvas');

    this.board = new Board(12, 20);
    this.setupGrid();
  }



  setupGrid() {
    new Grid({
      rows: 20,
      cols: 10,
      render: {placeholder: ".grid"}
    });
  }

}


module.exports = TetrisView;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const TetrisView = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0, canvasEl.width, canvasEl.height);
  const game = new Game();
  new TetrisView(game, ctx).start();
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);
const Pieces = __webpack_require__(4);

class Game {
  constructor() {
    this.board = [];
    this.pieces = [];
    this.score = 0;
    this.difficulty = 1;
  }

  arenaSweep() {} //clearRow

  collide(){} //collision

}

Game.BG_COLOR = "#000";
Game.DIM_X = 240;
Game.DIM_Y = 400;
Game.FPS = 32;

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Board {
  constructor() {
    this.grid = [];
  }
}

module.exports = Board;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Pieces {
  constructor() {
    this.position = { x: 0, y: 0 },
    this.matrix = null;
    this.color = "";
  }

  transpose(dir) {
    let transposedArray = [];
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.length; j++) {

      }
    }
  }

  

}

module.exports = Pieces;


/***/ }),
/* 5 */
/***/ (function(module, exports) {


  class Cell {
    constructor(config) {
      this.$el = config.$element;
      this.x = config.x;
      this.y = config.y;
    }
  }

  class Grid {
    constructor(config) {
      this.grid = []; //map
      this.cells = [];
      this.rowCount = config.row;
      this.colCount = config.col;
      this.rows = [];
      this.cols = [];
      if (config.render) {
        this.placeholder = config.render.placeholder; // rename as temp
        this.render();
    }
  }

  createCell(config) {
    return new Cell(config);
  }

  getCellAt(x, y) {
    if (!this.grid[y] || !this.grid[y][x]) {
      return false;
    }

    return this.grid[y][x];
  }

  render(options) {
    if (options && options.placeholder) {
      this.placeholder = options.placeholder;
    }
    this.$placeholder = $(this.placeholder);
    let i, j, $row, $cell, cell, cellId = 0;
    for (i = 0; i < this.rowCount; i += 1) {
      this.grid[i] = [];
      $row = $('<div class="row"></div>').prependTo(this.$placeholder);
      for (j = 0; j < this.colCount; j += 1) {
        $cell = $('<div class="cell"></div>').appendTo($row);
        cell = this.createCell({$element: $cell, x: j, y: i });
        this.grid[i].push(cell);
        this.cells.push(cell);
      }
    }

    let self = this;
    this.grid.forEach(function(row) {
      self.rows.push(row);
    });
  }
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map