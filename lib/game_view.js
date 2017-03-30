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

class GameView {

  constructor(ctx, game) {
    this.game = game;
    this.ctx = ctx;
    this.paused = false;
    this.piece = game.piece;
    this.board = game.board; // Board constructor function
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      if (event.keyCode === 37) {
        this.game.move(-1);
      } else if (event.keyCode === 39) {
        this.game.move(1);
      } else if (event.keyCode === 40) {
        this.game.drop();
      } else if (event.keyCode === 90) {
        this.game.rotate(-1);
      } else if (event.keyCode === 32) {
        this.game.rotate(1);
      } else if (event.keyCode === 13) {
        this.pause();
      } else if (event.keyCode === 81) {
        this.game.reset();
      }
    });

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

  }

drawMatrix() {
  this.piece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        this.ctx.fillStyle = COLORS[value];
        this.ctx.fillRect(x + this.piece.pos.x, y + this.piece.pos.y, 1, 1);
      }
    });
  });
}

draw() {
  this.ctx.fillStyle = '#ccc';
  this.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);

  this.drawMatrix(this.board, {x: 0, y: 0});
  this.drawMatrix(this.piece.matrix, this.piece.pos);

  requestAnimationFrame(this.draw.bind(this));
}

update() {
  // let dropInterval = this.game.dropInterval;
  // debugger
  // let lastTime = this.game.lastTime;
  // debugger
  // debugger
  // const deltaTime = time - this.game.lastTime;
  // debugger
  // let dropCounter = this.game.dropCounter;
  // debugger
  // dropCounter += deltaTime;
  // if (dropCounter > this.game.dropInterval) {
  //   this.game.drop();
  // }
  // debugger
  // this.game.lastTime = time;
  // this.draw();
  this.game.drop;
  this.draw();
}

start() {
  this.intervalId = setInterval(this.update.bind(this), 1000);
}

pause() {
  clearInterval(this.intervalId);
}



// Stays here
// Also part of the looping mechanism
// play() {
//   this.update(time = 0, dropInterval = 1000, lastTime = 0, dropCounter = 0);
//   this.draw();
//   requestAnimationFrame(this.update)
// }

// Game

}

// const animate = new GameView(ctx, game);
// animate.draw();
//
// class Animate {
//   constructor(ctx, game) {
//
//   }
//
//
// }

module.exports = GameView;
