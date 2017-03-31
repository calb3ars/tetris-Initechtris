# Initechtris
[Initechtris Live Site](https://calb3ars.github.io/tetris-Initechtris/ "Live Game")<br /><br />
Initechtris is a frontend JavaScript game based off the classic Tetris puzzle game. This version of the game was named after the fictional company in the movie "Office Space" and features distinct styling inspired by the movie.

Gameplay is similar to the original Tetris game. A single piece (Tetromino) falls from the top center of the board. The user can shift the piece from side to side, rotate the piece in 90&deg; increments, or drop the piece down faster. The goal of the game is to accumulate points by filling complete rows with Tetromino blocks. Once a row is filled it is cleared and any rows of blocks above it shift down.

The game ends if the pieces stack up and reach the top of the board.

### Features & Implementation
##### Piece movement
Pieces are created as two-dimensional arrays with 0's or a number based on whether the individual cell area is occupied or not (0 is blank). The pieces are all squares to assist with calculations for rotation.

A piece is created by drawing its matrix onto the board grid and automatically invoking the drop function. Since every position within the board has a chance for a collision, each drop action checks for collisions with the boundaries of the board and any set pieces. If a collision with a set piece is detected, the current piece is combined with the existing board pieces and a new piece is generated at the top.

Rotation is handled by transposing the 2D array. During the rotation function, the game checks to see if the space equivalent to the length of the piece after rotation is unoccupied. If the space is occupied, the piece cannot rotate and the piece returns to its original orientation.

![Gameplay gif](http://res.cloudinary.com/calb3ars/image/upload/v1490944512/tetris4_ikijjm.gif)

##### Clearing of Rows


##### Follow Accounts


### Future Features

##### Game Mode Easter Eggs
The user is asked to input their name. If they input a certain character's name from the movie, the game changes with Easter eggs from the movie. If the user enters "Milton," they receive all red "S" pieces to represent his beloved Swingline stapler. "Peter" would get 2x as many points and would receive orange "I" pieces to represent the Cheetos he's eating while playing the game in the movie.

##### Levels
As a corollary to the above feature, a user could level up during the course of the game. At certain point thresholds, the employee information on the badge would change names and images to represent characters from the movie. Milton Waddams would turn into Michael Bolton, Samir Nagheenanajar, and eventually Peter Gibbons. If the game ends, an image or video clip of Bill Lumbergh would appear telling the player they have to come in on Saturday.
