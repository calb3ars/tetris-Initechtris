# Initechtris
[Initechtris Live App](url "Initechtris Live")<br />

### Background
Initechtris is a frontend JavaScript game based off the classic Tetris puzzle game. The original Tetris is a single player game where a falling Tetromino (four-square block with one of several configurations) falls across a board and stops when it hits another set block or the bottom of the board. The player positions and rotates the falling piece in 90&deg; increments so the falling piece settles into an empty space. The goal of the game is to create filled horizontal lines, at which point the filled line will disappear and any lines above the filled line will drop down.

The game ends if the pieces stack up and reach the top of the board.

### Functionality & MVP
- [ ] Start, pause, and reset board
- [ ] User controls to rotate and position falling piece (Tetromino)
- [ ] Game renders different Tetrominos as the falling piece
- [ ] Board clears a filled horizontal line

In addition, this project will include:
- [ ] Sidebar with key mappings and controls
- [ ] A production Readme

### Wireframes
This app will populate a single screen with centered gameboard and controls map inside a right sidebar. Game controls will include positioning the piece (left, right, single step drop) and rotation(90&deg;) and game pause.

![Wireframe](http://res.cloudinary.com/calb3ars/image/upload/v1490579978/Initechtris_gwhug8.jpg)

### Architecture & Technologies
Initechtris will feature the following technologies:
* Vanilla JavaScript for structure and logic
* HTML5 Canvas and jQuery for rendering and DOM manipulation
* Webpack to bundle scripts and serve them to the index.html

The webpack entry file will bundle up the following scripts:
  * game.js
  * board.js
  * piece.js
  * matrix.js
  * gameview.js
  * tetris.js

`game.js` will control the start, reset, and pausing of the game.
`board.js` will hold the pieces and map the logic of pieces falling in addition to any complete lines.
`piece.js` will hold the logic for piece orientation and color.
`matrix.js` will hold functions for creating and rendering boards and pieces.
`gameview.js` will hold key mappings for user control.
`tetris.js` will connect the game to the DOM.

### Implementation Timeline
##### Day 1: Board and Falling Piece setup
**Objective**: Board renders on screen and a single piece falls across the screen
##### Day 2: Collision and Gameplay logic
**Objective**: Pieces recognize sides of the board and settle when they hit a set piece
##### Day 3: Pause, Play, Scoring logic
**Objective**: Player can start, pause, restart a game
##### Day 4: Styling
**Objective**: Styling

### Bonus Features:
If time permits, I'd like to implement the following features
- [ ] Bonus: Direct messaging between accounts
- [ ] Bonus: Styling easter eggs if the user inputs specific names "Peter," Lumbergh," or "Michael"
- [ ] Bonus: Game modes based on user's name input (`Peter` has orange "Cheeto" sticks fall down the screen, `Milton`'s pieces are red "S" Tetrominos, `Lumbergh` has "Yeah..." flash in the score section when a line is cleared)
