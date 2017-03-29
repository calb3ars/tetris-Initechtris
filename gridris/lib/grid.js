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
