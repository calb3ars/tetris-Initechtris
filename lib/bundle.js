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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2);
const Piece = __webpack_require__(4);

const boardDimensions = {
  width: 12,
  height: 20
};

class Game {
  constructor() {
    this.board = new Board(12, 20);
    this.piece = new Piece();
    this.createPiece();
    this.score = 0;
    this.pause = false;
    this.gameover = false;

    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.lastTime = 0;

    this.deltaTime = 0;
  }

  clearBoard() {
    let multiplier = 1;
    for (let y = this.board.length -1; y > 0; y--) {
      for (let x = 0; x < this.board[y].length; x++) {
        if (this.board[y][x] === 0) {
          break;
        }
      }

    //recycle filled row
    const row = this.board.splice(y, 1)[0].fill(0);
    this.board.unshift(row);
    y++;

    this.piece.score += multiplier * 10;
    multiplier *= 2;
    }
  }

  collision() {
    const m = this.piece.matrix;
    const o = this.piece.pos;
    for (let y = 0; y < m.length; y++) {
      for (let x = 0; x < m[y].length; x++) {
        if (m[y][x] !== 0 &&
         (this.board[y + o.y] &&
          this.board[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  merge() {
    this.piece.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.board.matrix[y + this.piece.pos.y][x + this.piece.pos.x] = value;
        }
      });
    });
  }

  gameover(){
    // check top row for any non-zero values
    const topRow = this.board[0];
    for (let i = 0; i < topRow.length; i++) {
      if (topRow[i] !== 0 && this.collision) {
        this.gameover = true;
      }
    }
    this.gameover = false;
  }

  resetBoard() {
    this.board = new Board(12, 20);
  }

  resetScore() {
    this.score = 0;
    this.updateScore();
  }

  updateScore() {
    document.getElementById('score').innerText = this.score;
  }

  // Piece Logic
  // extrapolate into switch/case
  // save piece matrices as constant mapped to type
  pieceShape(type)
  {
    if (type === 'I') {
      return [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ];
    } else if (type === 'L') {
      return [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ];
    } else if (type === 'J') {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
      ];
    } else if (type === 'O') {
      return [
        [4, 4],
        [4, 4],
      ];
    } else if (type === 'Z') {
      return [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0],
      ];
    } else if (type === 'S') {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    } else if (type === 'T') {
      return [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0],
      ];
    }
  }

  createPiece() {
    const pieces = 'TJLOSZI';
    this.piece.matrix = this.pieceShape(pieces[pieces.length * Math.random() | 0]);
    this.piece.pos.y = 0;
    this.piece.pos.x = (this.board.matrix[0].length / 2 | 0) -              (this.piece.matrix[0].length / 2 | 0);

    //game reset if collision on spawn
    if (this.collision()) {
      this.board.matrix.forEach(row => row.fill(0));
      this.score = 0;
      this.updateScore();
    }
  }

  // Piece Movement
  drop() {
    this.piece.pos.y++;
    if (this.collision()) {
      this.piece.pos.y--;
      this.merge();
      this.createPiece();
      this.clearBoard();
      this.updateScore();
    }
    this.dropCounter = 0; //where should this reference dropCounter?
  }

  move(shift) {
    this.piece.pos.x += shift;
    if (this.collision()) {
      this.piece.pos.x -= shift;
    }
  }

  rotate(dir) {
    const pos = this.piece.pos.x;
    let offset = 1;
    this.game.transpose(this.piece.matrix, dir);
    while (this.collision()) {
      this.piece.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.piece.matrix[0].length) {
        this.rotate(this.piece.matrix, -dir);
        this.piece.pos.x = pos;
        return;
      }
    }
  }

  transpose(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [
          matrix[x][y],
          matrix[y][x],
        ] = [
          matrix[y][x],
          matrix[x][y],
        ];
      }
    }

    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }

}

module.exports =  Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

const COLORS = [
  null,
  '#F61067',
  '#008080',
  '#ECA400',
  '#C14953',
  '#241E4E',
  '#F28123',
  '#D34E24',
];

class GameView {

  constructor(ctx, game) {
    this.game = game;
    this.ctx = ctx;
    this.paused = false;
    this.piece = game.piece;
    this.board = game.board; // Board constructor function
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      if (event.keyCode === 37) {
        this.game.move(-1);
      } else if (event.keyCode === 39) {
        this.game.move(1);
      } else if (event.keyCode === 40) {
        this.game.drop();
      } else if (event.keyCode === 90) {
        this.game.rotate(-1);
      } else if (event.keyCode === 32) {
        this.game.rotate(1);
      } else if (event.keyCode === 13) {
        this.pause();
      } else if (event.keyCode === 81) {
        this.game.reset();
      }
    });

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

  }

drawMatrix() {
  this.piece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        this.ctx.fillStyle = COLORS[value];
        this.ctx.fillRect(x + this.piece.pos.x, y + this.piece.pos.y, 1, 1);
      }
    });
  });
}

draw() {
  this.ctx.fillStyle = '#ccc';
  this.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);

  this.drawMatrix(this.board, {x: 0, y: 0});
  this.drawMatrix(this.piece.matrix, this.piece.pos);

  requestAnimationFrame(this.draw.bind(this));
}

update() {
  // let dropInterval = this.game.dropInterval;
  // debugger
  // let lastTime = this.game.lastTime;
  // debugger
  // debugger
  // const deltaTime = time - this.game.lastTime;
  // debugger
  // let dropCounter = this.game.dropCounter;
  // debugger
  // dropCounter += deltaTime;
  // if (dropCounter > this.game.dropInterval) {
  //   this.game.drop();
  // }
  // debugger
  // this.game.lastTime = time;
  // this.draw();
  this.game.drop;
  this.draw();
}

start() {
  this.intervalId = setInterval(this.update.bind(this), 1000);
}

pause() {
  clearInterval(this.intervalId);
}



// Stays here
// Also part of the looping mechanism
// play() {
//   this.update(time = 0, dropInterval = 1000, lastTime = 0, dropCounter = 0);
//   this.draw();
//   requestAnimationFrame(this.update)
// }

// Game

}

// const animate = new GameView(ctx, game);
// animate.draw();
//
// class Animate {
//   constructor(ctx, game) {
//
//   }
//
//
// }

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.matrix = this.createBoard(this.width, this.height);
  }

  createBoard(width, height) {
    const matrix = [];
    while (height > 0) {
      matrix.push(new Array(width).fill(0));
      height--;
    }

    return matrix;
  }

}

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("tetris");
  const ctx = canvasEl.getContext("2d");
  ctx.scale(20,20);
  const game = new Game();
  const gameView = new GameView(ctx, game);

  gameView.start();

});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

const COLORS = [
    null,
    '#F61067',
    '#008080',
    '#ECA400',
    '#C14953',
    '#241E4E',
    '#F28123',
    '#D34E24',
];

class Piece {
  constructor() {
    this.pos = {x: 0, y: 0};
    this.matrix = null;
  }

  pieceShape(type)
  {
    if (type === 'I') {
      return [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ];
    } else if (type === 'L') {
      return [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ];
    } else if (type === 'J') {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
      ];
    } else if (type === 'O') {
      return [
        [4, 4],
        [4, 4],
      ];
    } else if (type === 'Z') {
      return [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0],
      ];
    } else if (type === 'S') {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    } else if (type === 'T') {
      return [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0],
      ];
    }
  }

  createPiece() {
    const pieces = 'TJLOSZI';
    this.matrix = this.pieceShape(pieces[pieces.length * Math.random() | 0]);
    this.pos.y = 0;

    this.pos.x = (this.game.board.matrix[0].length / 2 | 0) -              (this.matrix[0].length / 2 | 0);

    //game reset if collision on spawn
    if (this.game.collision()) {
      this.game.board.forEach(row => row.fill(0));
      this.game.score = 0;
      this.game.updateScore();
    }
  }

}


module.exports =  Piece;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map