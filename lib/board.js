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
