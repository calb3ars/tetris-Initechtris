const Game = require("./game");
const  View = require('./view');

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("initechtris")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  ctx.scale(20,20);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0, canvasEl.width, canvasEl.height);
  // const game = new Game();
  // new  View(game, ctx);
  new View(ctx);
});
