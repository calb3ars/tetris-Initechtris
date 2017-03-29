const Game = require("./game");
const Tetris = require('./tetris');

// document.addEventListener("DOMContentLoaded", function() {
//   const canvasEl = document.getElementsByTagName("canvas")[0];
//   canvasEl.width = Game.DIM_X;
//   canvasEl.height = Game.DIM_Y;
//
//   const ctx = canvasEl.getContext("2d");
//   ctx.scale(20,20);
//   ctx.fillStyle = '#000';
//   ctx.fillRect(0,0, canvasEl.width, canvasEl.height);
  const game = new Tetris({
    rows: 20,
    cols: 10,
    placeholder: '#tetris'
  });
  game.init();

// });
