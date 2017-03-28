const Board = require('./board');
const Piece = require('./piece');

class Game {
  constructor() {
    this.board = [];
    this.piece = new Piece(this);
    this.score = 0;
    this.difficulty = 1;
  }



  collide(){} //collision

  pieceDrop(){}


}

Game.BG_COLOR = "#000";
Game.DIM_X = 240;
Game.DIM_Y = 400;
Game.FPS = 32;

module.exports = Game;
