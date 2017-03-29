// const Board = require('./board.js');
// const Grid = require('./grid.js');

class View {
  constructor(ctx, game, $el) {
    this.$el = $el;
    this.ctx = ctx;
    this.pause = false;
    this.gameover = false;
    this.board = new Board(12, 20);
    this.setupGrid();

    // this.intervalId = window.setInterval(
    //   this.step.bind(this),
    //    View.STEP_MILLIS
    // );

    // $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  // handleKeyEvent(event) {
  //   // pausing a game?
  //   // resetting a game?
  //
  //   if (View.KEYS[event.keyCode]) {
  //     this.board.piece.move(View.KEYS[event.keyCode]);
  //   }
  // }


  setupGrid(width, height) {
    const grid = [];
    while(height > 0) {
      matrix.push(new Array(width).fill(0)
    }
    return grid
  }

    // new Grid({
    //   rows: 20,
    //   cols: 10,
    //   render: {placeholder: ".grid"}
    // });
  }

  // step() {
  //   if (!this.pause || !this.gameover) {
  //     this.board.piece.move();
  //   } else {
  //     alert("You lost! Lumbergh needs you to come in on Saturday...and Sunday");
  //     window.clearInterval(this.intervalId);
  //   }
  // }

}

 View.KEYS = {
  39: "L",
  37: "R",
  32: "Rotate",
  80: "Pause"
};

 View.STEP_MILLIS = 100;

// module.exports = View;
