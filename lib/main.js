const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("tetris");
  const ctx = canvasEl.getContext("2d");
  ctx.scale(20,20);
  const game = new Game();
  const gameView = new GameView(ctx, game);

  gameView.start();

});
