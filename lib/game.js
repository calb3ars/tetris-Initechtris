const Board = require('./board.js');
const Piece = require('./piece.js');

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
