const Game = require('./game.js');

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
