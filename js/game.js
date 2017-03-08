'use strict';
/*Handles all game logic and coordination between game interface elements*/

var game = function () {
  var module = {};
  //PRIVATE PROPERTIES
  var boardDisplay, controlPanel, messageWindow;
  var board = [['', '', ''], ['', '', ''], ['', '', '']];
  var playerPiece = 'O';
  var computerPiece = 'X';
  var playerTurn = true;
  var gameOver = false;
  var turn = 1;

  //PUBLIC METHODS

  //initializes all game objects and starts the ball rolling
  function start() {
    boardDisplay = new Board(this);
    controlPanel = new Control(this);
    messageWindow = new Message();
  }
  //updates game state for each move
  function update(move) {
    //if game is over, then short circuit update
    if (gameOver) {
      //console.log('Game over!');
      //messageWindow.send('Game over!');
      return false;
    }
    //determine if move is valid. An invalid move will be passed as an empty move object
    if (!move.piece) {
      console.log('Cannot move there!'); //update to send to message window
      messageWindow.send('Cannot move there!');
      return false;
    }
    //update board model
    setBoardSquare(move);
    //send move message-panel
    messageWindow.send(move.piece + ": moves " + move.row + ", " + move.column);
    //test for win
    if (isWin(move)) {
      if (playerTurn) {
        console.log('You have WON!!!'); //update to send to message window
        messageWindow.send('You have WON!!!');
      } else {
        console.log('You have LOST :(((('); //update to send to message window
        messageWindow.send('You have LOST :((((');
      }
      gameOver = true;
      //resetGame();
    } else if (isTie()) {
      console.log('You have tied :|'); //update to send to message window
      messageWindow.send('You have tied :|');
      gameOver = true;
    } else {
      //switch to other oponents move
      playerTurn = !playerTurn;
      //next turn
      turn++;
    }
    return true;
  }
  //resets the game display and state
  function reset() {
    var buttons = document.querySelectorAll('#board button');
    //reset board array
    clearBoard();
    //reset board display
    boardDisplay.reset();
    //reset message window
    messageWindow.reset();
    //reset variables
    playerTurn = true;
    gameOver = false;
    turn = 1;
  }
  //returns if move can be made
  function isMoveValid(move) {
    if (getBoardSquare(move.row, move.column) !== '' || gameOver) {
      return false;
    }
    //console.log('My square value is:' + getBoardSquare(move.row, move.column));
    return true;
  }
  //returns the current player (X or O)
  function getCurrentPiece() {
    var piece = playerTurn ? playerPiece : computerPiece;
    return piece;
  }

  //PRIVATE METHODS

  //****************************************************
  //Game AI and logic
  //****************************************************

  //determine if a winning move has occured
  function isWin(currentMove) {
    //compare current board to various win conditions (8 possible)
    var column = 1;
    var row = 1;
    var squareMatches = 0;
    //first we check if all squares in row are = to piece
    var currentMovePositionString = currentMove.row.toString() + ',' + currentMove.column.toString();
    for (column = 1; column <= 3; column++) {
      //console.log('matching row:' + currentMove.row + ' , column:' + column);
      //console.log('board piece is:' + getBoardSquare(currentMove.row, column));
      if (getBoardSquare(currentMove.row, column) === currentMove.piece) {
        //console.log('piece matched!');
        squareMatches++;
      }
    }
    if (squareMatches === 3) {
      return true;
    } else {
      squareMatches = 0;
    }
    //next we check to see if all squares in column = to piece
    for (row = 1; row <= 3; row++) {
      if (getBoardSquare(row, currentMove.column) === currentMove.piece) {
        squareMatches++;
      }
    }

    if (squareMatches === 3) {
      return true;
    } else {
      squareMatches = 0;
    }

    //now finally we check the diagonals!
    //top left corner
    if (currentMovePositionString === '1,1') {
      if (getBoardSquare(2, 2) === currentMove.piece && getBoardSquare(3, 3) === currentMove.piece) {
        return true;
      }
      //top right corner
    } else if (currentMovePositionString === '1,3') {
      if (getBoardSquare(2, 2) === currentMove.piece && getBoardSquare(3, 1) === currentMove.piece) {
        return true;
      }
      // center, so need to check both diagonals
    } else if (currentMovePositionString === '2,2') {
      if (getBoardSquare(1, 1) === currentMove.piece && getBoardSquare(3, 3) === currentMove.piece) {
        return true;
      }
      if (getBoardSquare(1, 3) === currentMove.piece && getBoardSquare(3, 1) === currentMove.piece) {
        return true;
      }
      //bottom left corner
    } else if (currentMovePositionString === '3,1') {
      if (getBoardSquare(2, 2) === currentMove.piece && getBoardSquare(1, 3) === currentMove.piece) {
        return true;
      }
      //bottom right corner
    } else if (currentMovePositionString === '3,3') {
      if (getBoardSquare(2, 2) === currentMove.piece && getBoardSquare(1, 1) === currentMove.piece) {
        return true;
      }
    }

    return false;
  }

  function isTie() {
    var board = getBoard();
    for (var row = 0; row < board.length; row++) {
      for (var column = 0; column < board[row].length; column++) {
        if (board[row][column] === '') {
          return false;
        }
      }
    }
    return true;
  }

  //***********************************************
  //GETTERS AND SETTERS AND OTHER UTILITY METHODS
  //***********************************************
  function getBoard() {
    return board;
  }
  function clearBoard() {
    var board = getBoard();
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        board[i][j] = '';
      }
    }
  }
  //returns square from board model
  function getBoardSquare(row, column) {
    if (column < 1 || row < 1) {
      return false;
    } else if (column > 3 || row > 3) {
      return false;
    }
    var board = getBoard();
    return board[row - 1][column - 1];
  }
  //sets square within board model
  function setBoardSquare(move) {
    var board = getBoard();
    var row = move.row,
        column = move.column,
        piece = move.piece;
    if (column < 1 || row < 1) {
      return false;
    } else if (column > 3 || row > 3) {
      return false;
    }
    board[row - 1][column - 1] = piece;
    return true;
  }
  //returns a move object
  function getCurrentMove(col, row, piece) {
    return { column: col, row: row, piece: piece };
  }
  //returns current turn
  function getTurn() {
    return turn;
  }

  //add public methods and properties to module
  module.start = start;
  module.update = update;
  module.isMoveValid = isMoveValid;
  module.reset = reset;
  module.getCurrentPiece = getCurrentPiece;
  //private methods and properties exported only for testing
  module.isWin = isWin;
  module.getBoard = getBoard;

  return module;
}();