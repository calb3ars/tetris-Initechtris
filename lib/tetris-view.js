const Board = require('./board.js');
const Grid = require('./grid.js');

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
