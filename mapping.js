// *********************************************************************
// Pieces
// *********************************************************************
//require Matrix from './matrix';
// class Piece extends Matrix {
//   constructor(options={}) {
//     options.matrix:
//     options.color: options.color
//   }
// }

// const matrix = [
//   [0,0,0],
//   [1,1,1],
//   [0,1,0],
// ];

function createPiece(type) {
  if (type === "T") {
    return [
      [0,0,0],
      [1,1,1],
      [0,1,0]
    ];
  } else if (type === "O") {
    return [
      [2,2],
      [2,2]
    ];
  } else if (type === "L") {
    return [
      [0,3,0],
      [0,3,0],
      [0,3,3]
    ];
  } else if (type === "J") {
    return [
      [0,4,0],
      [0,4,0],
      [4,4,0]
    ];
  } else if (type === "S") {
    return [
      [0,5,5],
      [5,5,0],
      [0,0,0]
    ];
  } else if (type === "Z") {
    return [
      [6,6,0],
      [0,6,6],
      [0,0,0]
    ];
  } else if (type === "I") {
    return [
      [0,7,0,0],
      [0,7,0,0],
      [0,7,0,0],
      [0,7,0,0]
    ];
  }
}

const colors = [
  null,
  'red',
  'blue',
  'violet',
  'green',
  'purple',
  'orange',
  'pink'
];

function pieceReset() {
  const pieces = 'TOLJSZI';
  // Math.floor(Math.random() * pieces.length)
  piece.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  piece.pos.y = 0;
  piece.pos.x = (board[0].length / 2 | 0) - (piece.matrix[0].length / 2 | 0);
  if (collide(board, piece)) {
    board.forEach(row => row.fill(0)); // clear board
    piece.score = 0;
    updateScore();
  }
}

// module.exports = Piece;

function rotate(matrix, dir) {
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < i; ++j) {
      [
        matrix[j][i],
        matrix[i][j],
      ] = [
        matrix[i][j],
        matrix[j][i]
      ];
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else{
    matrix.reverse();
  }
}





// *********************************************************************
// Drawing
// *********************************************************************
const canvas = document.getElementById('initechtris');

const context = canvas.getContext('2d');


context.scale(20, 20);



let dropCounter = 0; //# of steps from initial position
let dropInterval = 1000; // drop speed
let lastTime = 0; //initial time (0 ms)
// draw function for updating/rendering the game
function update(time = 0) {
  // interval (precursor to piece dropping)
  const deltaTime = time - lastTime; // time interval since beginning
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > dropInterval) {
    piece.pos.y++; // drop the piece one step after each dropInterval
    dropCounter = 0;
  }

  // renders the block or board
  draw();
  // paints the rendering to the screen
  requestAnimationFrame(update);
}

function pause(deltaTime) {
  dropCounter -= deltaTime;
}

// draw board
function draw() {
  // clear board (for rendering of new frame)
  context.fillStyle = '#000';
  context.fillRect(0,0, canvas.width, canvas.height);

  // draw board
  drawMatrix(board, {x:0, y:0});
  // render piece
  drawMatrix(piece.matrix, piece.pos);
}


// render a piece
// function drawMatrix (piece, offset)
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) =>{
    row.forEach((value, x) =>{
      if (value !== 0) {
        context.fillStyle = colors[value];
        // context.fillStyle = piece.color
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

// piece on board
// representation and coordinates
const piece = {
  matrix: null,
  pos: {x: 0, y: 0},
  score : 0
};

// *********************************************************************
// Controls = game_view
// *********************************************************************

function pieceDrop() {
  piece.pos.y++;
  if (collide(board, piece)) {
    piece.pos.y--;
    merge(board, piece);
    pieceReset();
    clearFullRow();
    updateScore();
  }
  dropCounter = 0;
}

function pieceRotate(dir) {
  const pos = piece.pos.x;
   let offset = 1;
   rotate(piece.matrix, dir);
   while (collide(board, piece)) {
       piece.pos.x += offset;
       offset = -(offset + (offset > 0 ? 1 : -1));
       if (offset > piece.matrix[0].length) {
           rotate(piece.matrix, -dir);
           piece.pos.x = pos;
           return;
       }
    }
}

function pieceMove(shift) {
  piece.pos.x += shift;
  if (collide(board, piece)) {
    piece.pos.x -= shift;
  }
}

// game_view
// binding keys (or use ) and positions
// factor out into switch/case
// bind numbers to constants that show direction
// [DOWN, LEFT, RIGHT, UP, SPACE]
// left { delta: -1}
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    pieceMove(-1);
      // piece.pos.x--;
      // piece.pos + RIGHT.delta
  } else if (event.keyCode === 39) {
    pieceMove(1);
      // piece.pos.x++;
      // piece.pos + LEFT.delta
  } else if (event.keyCode === 40) {
    pieceDrop();
  } else if (event.keyCode === 32) { // spacebar
    pieceRotate(1);
  } else if (event.keyCode === 17) { // control
    pieceRotate(1);
  }

});

// module.exports = Controls;




// *********************************************************************
// Pieces
// *********************************************************************
//require Matrix from './matrix';
// class Piece extends Matrix {
//   constructor(options={}) {
//     options.matrix:
//     options.color: options.color
//   }
// }
// render board
    // good candidate (along with drawMatrix) for abstracting into parent class
    // pieces and board can inherit from gameComponent (find better name later)
function createMatrix(width, height) {
  const board = [];
  while (height > 0) {
    board.push(new Array(width).fill(0));
    height--;
  }
  return board;
}

// define board
const board = createMatrix(12, 20);

// combine piece with board
function merge(board, piece){
  piece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + piece.pos.y][x + piece.pos.x] = value;
      }
    });
  });
}

// board
// collision detection function
function collide(board, piece) {
    const m = piece.matrix;
    const o = piece.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (board[y + o.y] &&
                board[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function clearFullRow() {
  let rowCount = 1;
  outer: for (let i = board.length - 1; i > 0; --i) { // switch to break and remove outer:
    for (let j = 0; j < board[i].length; ++j) {
      if (board[i][j] === 0) {
        continue outer; // consider break;
      }
    }
    const clearedRow = board.splice(i, 1)[0].fill(0);
    board.unshift(clearedRow);
    ++i;

    piece.score += rowCount * 100;
    rowCount *= 2
  }
}

function updateScore() {
  document.getElementById('score').innterText = piece.score;
}

// module.exports = Board;
pieceReset();
updateScore();
// render piece on board
update();
console.table(board);
