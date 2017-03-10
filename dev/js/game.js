'use strict';
/*Handles all game logic and coordination between game interface elements*/
var game = (function(board){
  var module = {};
  //PRIVATE PROPERTIES
  var boardDisplay,
      controlPanel,
      messageWindow;
  var board = board;
  var playerPiece = 'O';
  var computerPiece = 'X';
  var playerTurn = true;
  var gameOver = false;
  var turn = 1;

  //GAME TOGGLES

  var aiMode = 0;  //0 = solo play; 1 = ai on

  //PUBLIC METHODS
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
  module.getScore = getScore;

  module.isMoveValid = isMoveValid;
  module.isWin = isWin;
  module.isTie = isTie;

  //module.getCurrentMoveOnBoard = getCurrentMoveOnBoard;
  module.createMoveFromSquare = createMoveFromSquare;
  module.createMoveFromCoords = createMoveFromCoords;

  //add getters and setters to module (public?)
  
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

  


  //initializes all game objects and starts the ball rolling
  function start(){
    boardDisplay = new Board(this);
    controlPanel = new Control(this);
    messageWindow = new Message();
  }
  //resets the game display and state
  function reset(){
    board.clearBoard();
    boardDisplay.reset();
    messageWindow.reset();
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
      board.setBoardCell(move);
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
    let board = board.getBoard(),
        bestMove = {},
        move = {},
        score = 0;
        bestMove.score = 0;
        move.score = 0;
    
    //go through every square on board
    for(let row = 0; row < 3; row++){
      for(let column = 0; column < 3; column++){
        move = createMoveFromCoords(row+1, column+1);
        move.score = 0;             
        if(isMoveValid(move)){
          score = getMoveScore(move);
          move.score = score;     
          if(move.score >= bestMove.score){
            bestMove = JSON.parse(JSON.stringify(move)); //hack to copy one object to another
            //console.log('setting bestMove to: ' + bestMove.score);
          }
        }
        
      }
    }
    //make move
    //if(makeMove(bestMove)){ determineGameState(bestMove); }
    if(!bestMove.hasOwnProperty('row')){ console.log('error! no best move!'); }
    makeMove(bestMove);
    determineGameState(bestMove);
  }

  //STUB: scores a move depending on various factors - used by ai player to calculate
  // next move.
  function getMoveScore(move){    
    
    //move score:
    // 1. score each unit (columns, rows, diagonals) with regards to potential move
    //   +100 = computer: unit that will have three in a row
    //   +10  = computer: unit that will have two in a row with one empty
    //   +1   = computer: unit that will have one with two empty
    //   -100 = player:   unit that will have three in a row
    //   -10  = player:   unit that will have two in a row
    //   -1   = player:   unit that will have one in a row
    //    0   = empty unit
    // 2. return total sum for that cell    
    let piece = move.piece;
    let cell = '';
    //1. create virtual board from board
    let testBoard = board.makeCopyOfBoard(board.getBoard());
    //2. create container for score units (3 rows, 3 columns, and 2 diagonals)
    let scores = [];
    let score = 0;
    let i = 0;
    //3. place computer test move
    testBoard[move.row-1][move.column-1] = piece;
   
    score += getScore(board.getRows(testBoard));
    score += getScore(board.getColumns(testBoard));
    score += getScore(board.getDiagonals(testBoard));

    //score translation utlity function
    function translateScoreToFinal(score){
      var newScore = 0;
      if(score === 0){ 
        newScore = score; 
      } else 
      if(score < 0){ 
        newScore = -(10 ** (Math.abs(score) - 1) ); 
      } else {
        newScore = 10 ** (Math.abs(score) - 1);
      }

      return newScore; //just in case
    }

    //now we return reduced scores array
    
    return scores.reduce(((acc, el) => acc += el), 0);     
             
  }

  function getScore(board){  
      let score = 0;
      score = board.reduce(((value, row) => {             
        let rowTotal = row.reduce(((total, cell) => {
          if(cell === 'X'){ 
            return total < 0 ? -100 : total += 1;        
          }else
          if(cell === 'O'){ 
            return total > 0 ? 100 : total -= 1; 
          }else
          if(cell === '') { 
            return total += 0;
          }      
        }), 0);

        return Math.abs(rowTotal) > 3 ? value += 0 : value += rowTotal;

      }), 0);
      return score;
  }      

  
  function isMoveValid(move){
    if(board.getBoardCell(move.row, move.column) !== '' || gameOver){
      return false;
    }
    //console.log('My square value is:' + board.getBoardCell(move.row, move.column));
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
      //console.log('board piece is:' + board.getBoardCell(currentMove.row, column));
      if(board.getBoardCell(currentMove.row, column) === currentMove.piece){
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
      if(board.getBoardCell(row, currentMove.column) === currentMove.piece){
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
      if(board.getBoardCell(2, 2) === currentMove.piece && board.getBoardCell(3, 3) === currentMove.piece){
        return true;
      }
    //top right corner
    }else if(currentMovePositionString === '1,3'){
      if(board.getBoardCell(2, 2) === currentMove.piece && board.getBoardCell(3, 1) === currentMove.piece){
        return true;
      }
    // center, so need to check both diagonals
    }else if(currentMovePositionString === '2,2'){
      if(board.getBoardCell(1, 1) === currentMove.piece && board.getBoardCell(3, 3) === currentMove.piece){
        return true;
      }
      if(board.getBoardCell(1, 3) === currentMove.piece && board.getBoardCell(3, 1) === currentMove.piece){
        return true;
      }
    //bottom left corner
    }else if(currentMovePositionString === '3,1'){
      if(board.getBoardCell(2, 2) === currentMove.piece && board.getBoardCell(1, 3) === currentMove.piece){
        return true;
      }
    //bottom right corner
    }else if(currentMovePositionString === '3,3'){
      if(board.getBoardCell(2, 2) === currentMove.piece && board.getBoardCell(1, 1) === currentMove.piece){
        return true;
      }
    }
    return false;
  }

  function isTie(currentMove){
    var zBoard = board.getBoard();
    for(let row = 0; row < zBoard.length; row++){
      for(let column = 0; column < zBoard[row].length; column++){
        if(zBoard[row][column] === ''){
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

  return module;

})(model);








