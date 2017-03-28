const Board = require('./board');
const Pieces = require('./pieces');

class Game {
  constructor() {
    this.board = [];
    this.pieces = [];
    this.score = 0;
    this.difficulty = 1;
  }

  arenaSweep() {} //clearRow

  collide(){} //collision

}

Game.BG_COLOR = "#000";
Game.DIM_X = 240;
Game.DIM_Y = 400;
Game.FPS = 32;

module.exports = Game;
