const Grid = require('./grid');
const Piece = require('./piece');
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
