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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Grid = __webpack_require__(1);
const Piece = __webpack_require__(3);
const OPiece = new Piece.O();
const SPiece = new Piece.S();
const TPiece = new Piece.T();
const ZPiece = new Piece.Z();
const LPiece = new Piece.L();
const JPiece = new Piece.J();
const IPiece = new Piece.I();


  class Tetris {
    constuctor (options) {
    this.difficulty = options.difficulty;
    this.rows = options.rows;
    this.cols = options.cols;
    this.placeholder = options.placeholder;
    this.pieces = [Piece.O];
    this.render();
  }

  render() {
    this.grid = new Grid({
      rows: this.rows,
      cols: this.cols,
      render: {
        placeholder: this.placeholder
      }
    });
    return this;
  }

  init() {
    const shape = this.shapes[0](this.grid);
  }
}


module.exports = Tetris;


/***/ }),
/* 1 */
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
    this.grid = [];
    this.cells = [];
    this.rowsCount = config.rows;
    this.colsCount = config.cols;
    this.rows = [];
    this.cols = [];
    if (config.render) {
      this.placeholder = config.render.placeholder;
      this.render();
    }
  }

  createCell( config ) {
      return new Cell(config);
    }

  getCellAt( x, y ) {
      return this.grid[y][x];
    }

  render( options ) {
    if (options && options.placeholder) {
      this.placeholder = options.placeholder;
    }
    this.$placeholder = $(this.placeholder);

    var i, j, $row, $cell, cell, cellId = 0;
    for (i = 0; i < this.rowsCount; i += 1) {
      this.grid[i] = [];
      $row = $('<div class="row"></div>').prependTo(this.$placeholder);
      for (j = 0; j < this.colsCount; j += 1) {
        $cell = $('<div class="cell"></div>').appendTo($row);
        cell = this.createCell({$element: $cell, x: j, y: i});
        this.grid[i].push(cell);
        this.cells.push(cell);
      }
    }
    // rows
    var self = this;
    this.grid.forEach(function( row ) {
      self.rows.push(row);
    });
  }
}

// complaint about modules not being defined when exporting Grid


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./game\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const Tetris = __webpack_require__(0);

// document.addEventListener("DOMContentLoaded", function() {
//   const canvasEl = document.getElementsByTagName("canvas")[0];
//   canvasEl.width = Game.DIM_X;
//   canvasEl.height = Game.DIM_Y;
//
//   const ctx = canvasEl.getContext("2d");
//   ctx.scale(20,20);
//   ctx.fillStyle = '#000';
//   ctx.fillRect(0,0, canvasEl.width, canvasEl.height);
  const game = new Tetris({
    rows: 20,
    cols: 10,
    placeholder: '#tetris'
  });
  game.init();

// });


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

class Piece {
  constructor(grid) {
    this.grid = grid;
    this.cells = [];

  }

  mapCellToGrid(cell) {
    cell.$el.css('background', 'red');
    cell.isCurrentPiece = true;
    this.cells.push(cell);
    return this;
  }

  mapToGrid() {
    const self = this;
    this.coords.forEach(function(coord) {
      self.mapCellToGrid(self.grid.getCellAt(coord.x, coord.y));
    });
    return this;
  }

}

class OPiece extends Piece {
  constructor(grid) {
    super(grid);
    // grab first two rows
    // grab center column
    const firstRow = grid.rowsCount - 1;
    const secondRow = grid.rowsCount - 2;
    const middleColumn = parseInt(grid.colsCount / 2, 10);
    // mapToGrid()
    this.coords = [];
    this.coords.push(grid.getCellAt(middleColumn, firstRow));
    this.coords.push(grid.getCellAt(middleColumn, secondRow));
    this.coords.push(grid.getCellAt(middleColumn + 1, firstRow));
    this.coords.push(grid.getCellAt(middleColumn + 1, secondRow));
    this.mapToGrid();
    return this;
  }
}

module.exports = {
  OPiece: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./o\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  SPiece: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./s\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  TPiece: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./t\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  ZPiece: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./z\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  LPiece: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./l\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  JPiece: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./j\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  IPiece: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./i\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map