
  class Cell {
    constructor(config) {
      this.$el = config.$element;
      this.x = config.x;
      this.y = config.y;
    }
  }

  class Grid {
    constructor(config) {
      this.grid = []; //map
      this.cells = [];
      this.rowCount = config.row;
      this.colCount = config.col;
      this.rows = [];
      this.cols = [];
      if (config.render) {
        this.placeholder = config.render.placeholder; // rename as temp
        this.render();
    }
  }

  createCell(config) {
    return new Cell(config);
  }

  getCellAt(x, y) {
    if (!this.grid[y] || !this.grid[y][x]) {
      return false;
    }

    return this.grid[y][x];
  }

  render(options) {
    if (options && options.placeholder) {
      this.placeholder = options.placeholder;
    }
    this.$placeholder = $(this.placeholder);
    let i, j, $row, $cell, cell, cellId = 0;
    for (i = 0; i < this.rowCount; i += 1) {
      this.grid[i] = [];
      $row = $('<div class="row"></div>').prependTo(this.$placeholder);
      for (j = 0; j < this.colCount; j += 1) {
        $cell = $('<div class="cell"></div>').appendTo($row);
        cell = this.createCell({$element: $cell, x: j, y: i });
        this.grid[i].push(cell);
        this.cells.push(cell);
      }
    }

    let self = this;
    this.grid.forEach(function(row) {
      self.rows.push(row);
    });
  }
}
