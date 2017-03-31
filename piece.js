class Piece {
  constructor(game) {
    this.pos = {x: 0, y: 0};
    this.matrix =  null;
    this.score = 0;
    this.game = game;

    this.dropCounter = 0;
    this.dropInterval = 1000;

  }

  drop() {
    this.pos.y++;
    if (collide(board, piece)) {
      this.pos.y--;
      merge(board, piece);
      this.place();
      boardSweep();
      updateScore();
    }
    dropCounter = 0;
  }

// consolidate with drop
  move(shift) {
    this.pos.x += shift;
    if (collide(board, this)) {
        this.pos.x -= shift;
    }
  }

  place() {
      const pieces = 'TJLOSZI';
      piece.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
      piece.pos.y = 0;
      piece.pos.x = (board[0].length / 2 | 0) -
                     (piece.matrix[0].length / 2 | 0);


      if (collide(board, piece)) {
          board.forEach(row => row.fill(0));
          this.score = 0;
          updateScore();
      }
  }


  rotate(direction) {
      const pos = this.pos.x;
      let check = 1;
      this.transpose(this.matrix, direction);
      while (collide(board, this)) {
          this.pos.x += check;
          check = -(check + (check > 0 ? 1 : -1));
          if (check > this.matrix[0].length) {
              rotate(this.matrix, -direction);
              this.pos.x = pos;
              return;
          }
      }
  }

  transpose(matrix, direction) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [
          matrix[x][y],
          matrix[y][x],
        ] = [
          matrix[y][x],
          matrix[x][y],
        ];
      }
    }

    if (direction > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
  }

  //step
  update(deltaTime) {
    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.drop();
    }
  }

}
