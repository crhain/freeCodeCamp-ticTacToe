'use strict';
/*Handles all game logic and coordination between game interface elements*/
var game = (function(){
  var module = {};
  //PRIVATE PROPERTIES
  var boardDisplay,
      controlPanel,
      messageWindow;
  var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  var playerPiece = 'O';
  var computerPiece = 'X'
  var playerTurn = true;
  var gameOver = false;
  var turn = 1;

  //GAME TOGGLES

  var aiMode = 0;  //0 = solo play; 1 = ai on

  //PUBLIC METHODS

  //initializes all game objects and starts the ball rolling
  function start(){
    boardDisplay = new Board(this);
    controlPanel = new Control(this);
    messageWindow = new Message();
  }
  //resets the game display and state
  function reset(){
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
  //updates game state for each move
  function update(square){
    //if game is over, then short circuit update
    if(gameOver){
      return false;
    }

    var move = createMoveFromSquare(square);
    //attempt to make move and if it fails, send messasge
    if(!makeMove(move)){
      console.log('Cannot move there!'); //update to send to message window
      messageWindow.send('Cannot move there!');
      return false;
    }
    determineGameState(move);
    if(!gameOver) {
      if(aiMode) { aiPlayerMove(); }
      return true;
    }
    return false;
  }

  //***************************************************************************/
  //PRIVATE METHODS
  //***************************************************************************/
  //update game state for each move made
  function determineGameState(move){
    //send move to message-panel
    messageWindow.send(move.piece + ": moves " + move.row + ", " + move.column);
    //test for win
    if(isWin(move)){
      if(playerTurn){
        console.log('You have WON!!!'); //update to send to message window
        messageWindow.send('You have WON!!!');
      }
      else{
        console.log('You have LOST :(((('); //update to send to message window
        messageWindow.send('You have LOST :((((');
      }
      gameOver = true;
      //resetGame();
    }
    else if(isTie(move)){
      console.log('You have tied :|'); //update to send to message window
      messageWindow.send('You have tied :|');
      gameOver = true;
    }
    else{
      //switch to other oponents move
      playerTurn = !playerTurn;
      //next turn
      turn++;
    }
  }

  function makeMove(move){
    if(isMoveValid(move)){
      //update board model
      setBoardCell(move);
      //update display
      boardDisplay.update(move);
      return true;
    }
    return false;
  }

  //****************************************************
  //MORE PRIVATE METHODS: Game AI and logic
  //****************************************************

  function aiPlayerMove(){
    let board = getBoard(),
        bestMove = {},
        move = {};
    bestMove.score = 0;
    //go through every square on board
    for(let row = 0; row < board.length; row++){
      for(let column = 0; column < board[row].length; column++){
        move = createMoveFromCoords(row+1, column+1);
        //console.log('testing move:');
        //console.log(move);
        if(isMoveValid(move)){
          move.score = getMoveScore(move);
          //console.log('current move:');
          //console.log(move);
          if(move.score > bestMove.score){
            bestMove = move;
            //console.log('setting bestMove to: ' + bestMove.score);
          }
        }
      }
    }
    //make move
    //if(makeMove(bestMove)){ determineGameState(bestMove); }
    makeMove(bestMove);
    determineGameState(bestMove);
  }

  //STUB: scores a move depending on various factors - used by ai player to calculate
  // next move.
  function getMoveScore(move){
    return getRandomInt(1, 100);
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }


  function isMoveValid(move){
    if(getBoardCell(move.row, move.column) !== '' || gameOver){
      return false;
    }
    //console.log('My square value is:' + getBoardCell(move.row, move.column));
    return true;
  }

  function isWin(currentMove){
    //compare current board to various win conditions (8 possible)
    var column = 1;
    var row = 1;
    var squareMatches = 0;
    //first we check if all squares in row are = to piece
    var currentMovePositionString = currentMove.row.toString() + ',' + currentMove.column.toString();
    for(column = 1; column <= 3; column++){
      //console.log('matching row:' + currentMove.row + ' , column:' + column);
      //console.log('board piece is:' + getBoardCell(currentMove.row, column));
      if(getBoardCell(currentMove.row, column) === currentMove.piece){
        //console.log('piece matched!');
        squareMatches++;
      }
    }
    if(squareMatches === 3){
      return true;
    }
    else{
      squareMatches = 0;
    }
    //next we check to see if all squares in column = to piece
    for(row = 1; row <=3; row++){
      if(getBoardCell(row, currentMove.column) === currentMove.piece){
        squareMatches++;
      }
    }
    if(squareMatches === 3){
      return true;
    }
    else{
      squareMatches = 0;
    }
    //now finally we check the diagonals!
    //top left corner
    if(currentMovePositionString === '1,1'){
      if(getBoardCell(2, 2) === currentMove.piece && getBoardCell(3, 3) === currentMove.piece){
        return true;
      }
    //top right corner
    }else if(currentMovePositionString === '1,3'){
      if(getBoardCell(2, 2) === currentMove.piece && getBoardCell(3, 1) === currentMove.piece){
        return true;
      }
    // center, so need to check both diagonals
    }else if(currentMovePositionString === '2,2'){
      if(getBoardCell(1, 1) === currentMove.piece && getBoardCell(3, 3) === currentMove.piece){
        return true;
      }
      if(getBoardCell(1, 3) === currentMove.piece && getBoardCell(3, 1) === currentMove.piece){
        return true;
      }
    //bottom left corner
    }else if(currentMovePositionString === '3,1'){
      if(getBoardCell(2, 2) === currentMove.piece && getBoardCell(1, 3) === currentMove.piece){
        return true;
      }
    //bottom right corner
    }else if(currentMovePositionString === '3,3'){
      if(getBoardCell(2, 2) === currentMove.piece && getBoardCell(1, 1) === currentMove.piece){
        return true;
      }
    }
    return false;
  }

  function isTie(currentMove){
    var board = getBoard();
    for(let row = 0; row < board.length; row++){
      for(let column = 0; column < board[row].length; column++){
        if(board[row][column] === ''){
          return false;
        }
      }
    }
    return true;
  }

  function createMoveFromSquare(square){
    var squareIDString = square.getAttribute('id');
    var squareIDDelminiterPos = squareIDString.indexOf('x');
    var row = Number.parseInt(squareIDString.substring(0, squareIDDelminiterPos)),
        column = Number.parseInt(squareIDString.substring(squareIDDelminiterPos + 1));
    var move = {
                id: squareIDString,
                row: row,
                column: column,
                piece: getCurrentPiece(),
              };
    return move;
  }

  function createMoveFromCoords(row, column, piece = computerPiece){
    var id = row + 'x' + column;
    return {id: id, row: row, column: column, piece: piece}
  }

  //***********************************************
  //GETTERS AND SETTERS AND OTHER UTILITY METHODS
  //***********************************************

  function getBoard(){
    return board;
  }

  function clearBoard(){
    var board = getBoard();
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[i].length; j++){
        board[i][j] = '';
      }
    }
  }

  function getBoardCell(row, column){
    if(column < 1 || row < 1){
      return false;
    } else if (column > 3 || row > 3){
      return false;
    }
    var board = getBoard();
    return board[row-1][column-1];
  }

  function setBoardCell(move){
    var board = getBoard();
    var row = move.row,
        column = move.column,
        piece = move.piece;
    if(column < 1 || row < 1){
      return false;
    } else if (column > 3 || row > 3){
      return false;
    }
    board[row-1][column-1] = piece;
    return true;
  }

  function getCurrentPiece(){
    var piece = playerTurn ? playerPiece : computerPiece;
    return piece;
  }
  //STUB
  function toggleCurrentPiece(){

  }

  function getTurn(){
    return turn;
  }

  function incrementTurn(){
    turn++;
  }

  function getGameOver(){
    return gameOver;
  }

  function toggleGameOver(){
    gameOver = !gameOver;
  }

  function isPlayerTurn(){
    return playerTurn;
  }

  function togglePlayerTurn(){
    playerTurn = !playerTurn;
  }

  function getAIMode(){
    return aiMode;
  }

  function setAIMode(mode){
    aiMode = mode;
  }

  //add public methods and properties to module
  module.start = start;
  module.reset = reset;
  module.update = update;

  //add private properties to module (for testing)
  module.board = board;
  module.playerPiece = playerPiece;
  module.playerTurn = playerTurn;
  module.gameOver = gameOver;
  module.turn = turn;
  module.aiMode = aiMode;

  //add private methods to module (for testing)
  module.determineGameState = determineGameState;
  module.makeMove = makeMove;
  module.aiPlayerMove = aiPlayerMove;
  module.getMoveScore = getMoveScore;

  module.isMoveValid = isMoveValid;
  module.isWin = isWin;
  module.isTie = isTie;

  //module.getCurrentMoveOnBoard = getCurrentMoveOnBoard;
  module.createMoveFromSquare = createMoveFromSquare;
  module.createMoveFromCoords = createMoveFromCoords;

  //add getters and setters to module (public?)
  module.getBoard = getBoard;
  module.clearBoard = clearBoard;
  module.getBoardCell = getBoardCell;
  module.setBoardCell = setBoardCell;
  module.getCurrentPiece = getCurrentPiece;
  module.toggleCurrentPiece = toggleCurrentPiece;
  module.getTurn = getTurn;
  module.incrementTurn = incrementTurn;
  module.getGameOver = getGameOver;
  module.toggleGameOver = toggleGameOver;
  module.isPlayerTurn = isPlayerTurn;
  module.togglePlayerTurn = togglePlayerTurn;
  module.getAIMode = getAIMode;
  module.setAIMode = setAIMode;

  return module;

})();
