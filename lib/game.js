const Board = require('./board');
const Piece = require('./piece');
const Score = require('./score');

class Game {
  constructor() {
    this.board = [];
    this.piece = [];
    this.score = 0;

  }
}

Game.BG_COLOR = "#000";
Game.DIM_X = 240;
Game.DIM_Y = 400;
Game.FPS = 32;

module.exports = Game;
