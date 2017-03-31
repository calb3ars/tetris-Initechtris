// const Board = require('./board.js');
// const Piece = require('./piece.js');

class Game {
  constructor() {
    this.board = new Board(12, 20);
    this.piece = new Piece(this);
    this.score = 0;
    this.gameover = false;
  }

  animate() {
    this.piece
  }

  gameover(){
    // check top row for any non-zero values
    const topRow = this.board[0];
    for (let i = 0; i < topRow.length; i++) {
      if (topRow[i] !== 0) {
        this.gameover = true;
      }
    }
    this.gameover = false;
  }

  resetScore() {
    this.score = 0;
    this.updateScore();
  }

  updateScore() {
    document.getElementById('score').text = this.score;
  }

}
