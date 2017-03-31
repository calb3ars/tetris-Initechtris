let gameClock = 0;
let gameInterval = 500;

let lastTime = 0;
let paused = true;

const COLORS = [
    null,
    '#FF206E',
    '#51A3A3',
    '#D1D1D1',
    '#498467',
    '#FF9F1C',
    '#7EB2DD',
    '#C2FCF7',
];

const PIECES = {
  "S" : [[0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
        ],

  "Z" : [[2, 2, 0],
        [0, 2, 2],
        [0, 0, 0],
      ],

  "L" : [[0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ],

  "J" : [[0, 4, 0],
        [0, 4, 0],
        [4, 4, 0],
      ],

  "T" : [[0, 5, 0],
        [5, 5, 5],
        [0, 0, 0],
      ],

  "O" : [[6, 6],
        [6, 6],
      ],

  "I" : [[0, 7, 0, 0],
        [0, 7, 0, 0],
        [0, 7, 0, 0],
        [0, 7, 0, 0],
      ],
};

window.addEventListener('keydown', event => {
  event.preventDefault();
  switch(event.keyCode) {
    case 37:
      if(!paused) {
        shift(-1);
        // document.getElementById('left').style.textShadow = "2px 2px 0 white";
      }
      break;
    case 39:
      if(!paused) {
        shift(1);
      // document.getElementById('right').style.textShadow = "2px 2px 0 white";
      }
      break;
    case 40:
      if(!paused) {
        drop();
      // document.getElementById('down').style.textShadow = "2px 2px 0 white";
      }
      break;
    case 90:
      if(!paused) {
        rotate(-1);
      }
      break;
    case 32:
      if(!paused) {
        rotate(1);
        // document.getElementById('space').style.textShadow = "2px 2px 0 white";
      }
      break;
    case 13:
      pause();
      break;
  }
});

const piece = {
  score: 0,
  pos: {x: 0, y: 0},
  grid: [[]]
};

const canvas = document.getElementById('initechtris');
const ctx = canvas.getContext('2d');

ctx.scale(20, 20);

const game = () => {
  resetPiece();
  addScore();
  animate();

};

const animate = (currentTime = 0) => {
  const elapsedTime = currentTime - lastTime;
  if (!paused) {
    gameClock += elapsedTime;
  }
  if (!paused && gameClock > gameInterval) {
    drop();
  }
  lastTime = currentTime;
  render();
  requestAnimationFrame(animate);
};

const pause = () => {
  paused = (paused === true ? false : true );
  if (paused === false) {
    document.getElementById('score').innerHTML = piece.score;
  } else {
    document.getElementById('score').innerHTML = "Press Enter";
  }
  // document.getElementById('score').innerHTML = piece.score;
};

const resetGame = () => {
  board.forEach(row => row.fill(0));
  piece.score = 0;
  addScore();
  pause();
};

const renderGrid = (grid, delta) => {
  for (let y = 0; y < grid.length; y++) {
    for(let x=0; x < grid[y].length; x++) {
      if (grid[y][x] !== 0) {
        ctx.fillStyle = COLORS[grid[y][x]];
        ctx.fillRect(x + delta.x, y + delta.y, 1, 1);
      }
    }
  }
};

const render = () => {
  ctx.fillStyle = '#202028';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  renderGrid(board, {x: 0, y: 0});
  renderGrid(piece.grid, piece.pos);
};

// New Piece and Board functions
const newGrid = (width, height) => {
  const grid = [];
  while (height > 0) {
    grid.push(new Array(width).fill(0));
    height--;
  }
  return grid;
};

const board = newGrid(12, 20);

const newPiece = (type) => {
  switch(type) {
    case "S":
      return PIECES["S"];
    case "Z":
      return PIECES["Z"];
    case "L":
      return PIECES["L"];
    case "J":
      return PIECES["J"];
    case "T":
      return PIECES["T"];
    case "O":
      return PIECES["O"];
    case "I":
      return PIECES["I"];
  }
};

//Piece Movement functions
const rotate = (direction) => {
  const pos = piece.pos.x;
  let shift = 1;
  transpose(piece.grid, direction);
  while (collision(board, piece)) {
    piece.pos.x += shift;
    shift = -(shift + (shift > 0 ? 1 : -1));
    if (shift > piece.grid[0].length) {
      rotate(piece.grid, -direction);
      piece.pos.x = pos;
      return;
    }
  }
};

const transpose = (grid, direction) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < y; x++) {
      // flip across x = y axis
      [ grid[x][y], grid[y][x] ] = [ grid[y][x], grid[x][y] ];
    }
  }

  // reverse each row to get 90 degree rotation to right
  if (direction > 0) {
    grid.forEach(row => row.reverse());
  } else {
  // reverse entire grid to get 90 degree rotation to left
    grid.reverse();
  }
};

const drop = () => {
  piece.pos.y++;
  if (collision(board, piece)) {
    setPiece();
  }
  gameClock = 0;
};

const setPiece = () => {
  piece.pos.y--;
  combine(board, piece);
  filledRow();
  addScore();
  resetPiece();
};

const shift = (delta) => {
  piece.pos.x += delta;
  if (collision(board, piece)) {
      piece.pos.x -= delta;
  }
};

// Board functions
const combine = (board, piece) => {
  piece.grid.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + piece.pos.y][x + piece.pos.x] = value;
      }
    });
  });
};

const resetPiece = () => {
  const pieces = 'SZLJTOI';
  piece.grid = newPiece(pieces[Math.floor( pieces.length * Math.random() )]);
  piece.pos.y = 0;
  piece.pos.x = (board[0].length / 2 | 0) - (piece.grid[0].length / 2 | 0);
  if (collision(board, piece)) {
    board.forEach(row => row.fill(0));
    resetGame();
  }
};

const filledRow = () => {
  let multiplier = 1;
  outer: for (let y = board.length -1; y > 0; y--) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 0) {
        continue outer;
      }
    }

    // recycle row to top
    const row = board.splice(y, 1)[0].fill(0);
    board.unshift(row);
    y++;

    piece.score += multiplier * 1000;
    multiplier++;
  }
};

const collision = (board, piece) => {
  const grid = piece.grid;
  const coord = piece.pos;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== 0 && (board[y + coord.y] && board[y + coord.y][x + coord.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
};

const addScore = () => {
  document.getElementById('score').innerHTML = piece.score;
};

game();
