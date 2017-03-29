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
  OPiece: require("./o"),
  SPiece: require("./s"),
  TPiece: require("./t"),
  ZPiece: require("./z"),
  LPiece: require("./l"),
  JPiece: require("./j"),
  IPiece: require("./i")
};
