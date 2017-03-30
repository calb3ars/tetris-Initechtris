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
