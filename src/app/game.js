import model from "./model.js";
import Board from "./Board.js";
import Control from "./Control.js";
import Message from "./Message.js";

/*Handles all game logic and coordination between game interface elements*/

var game = {};
//PRIVATE PROPERTIES
var boardDisplay,
    controlPanel,
    messageWindow;
var board = model;
var playerPiece = 'X';
var computerPiece = 'O';
var playerTurn = true;
var gameOver = false;
var turn = 1;

//GAME TOGGLES

var gameMode = 1;  //0 = solo play; 1 = ai on

//PUBLIC METHODS
  //add public methods and properties to game
game.start = start;
game.update = update;
game.reset = reset;



  //add private properties to game (for testing)
  game.board = board;
  game.playerPiece = playerPiece;
  game.playerTurn = playerTurn;
  game.gameOver = gameOver;
  game.turn = turn;
  game.gameMode = gameMode;    

  //add private methods to game (for testing)
  game.determineGameState = determineGameState;
  game.makeMove = makeMove;
  game.aiPlayerMove = aiPlayerMove;
  game.getMoveScore = getMoveScore;
  game.getScore = getScore;

  game.isMoveValid = isMoveValid;
  game.isWin = isWin;
  game.isTie = isTie;

  //game.getCurrentMoveOnBoard = getCurrentMoveOnBoard;
  game.createMoveFromSquare = createMoveFromSquare;
  game.createMoveFromCoords = createMoveFromCoords;


//add getters and setters to game (public?)  
game.getPlayerPiece = getPlayerPiece;
game.setPlayerPiece = setPlayerPiece;        
game.getCurrentPiece = getCurrentPiece;
game.toggleCurrentPiece = toggleCurrentPiece;
game.getTurn = getTurn;
game.incrementTurn = incrementTurn;
game.getGameOver = getGameOver;
game.toggleGameOver = toggleGameOver;
game.getIsPlayerTurn = getIsPlayerTurn;
game.togglePlayerTurn = togglePlayerTurn;
game.getGameMode = getGameMode;
game.setGameMode = setGameMode;


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
  //if game is over, then restart game on click
  var gameOver = getGameOver();
  var gameMode = getGameMode();

  if(gameOver){
    reset();
    return false;
  }
  
  if(getIsPlayerTurn() || gameMode === 0){
    var move = createMoveFromSquare(square);
    //attempt to make move and if it fails, send messasge
    if(!makeMove(move)){
      console.log('Cannot move there!'); //update to send to message window
      messageWindow.send('Cannot move there!');
      return false;
    }
    determineGameState(move);
    
  }

  if(!gameOver) {
      if(gameMode > 0) { aiPlayerMove(); }
      return true;
  }
      
  return false;
}

//***************************************************************************/
//PRIVATE METHODS
//***************************************************************************/

//METHOD: determineGameState(move: object)
function determineGameState(move){
  //send move to message-panel
  messageWindow.send(move.piece + ": moves " + move.row + ", " + move.column);
  //test for win
  if(isWin(move)){
    if(playerTurn){
      console.log('You have WON!!!'); //update to send to message window
      messageWindow.send('You have WON!!!');
      boardDisplay.showMessage('win');
    }
    else{
      console.log('You have LOST :(((('); //update to send to message window
      messageWindow.send('You have LOST :((((');
      boardDisplay.showMessage('loss');
    }
    gameOver = true;
    //resetGame();
  }
  else if(isTie(move)){
    console.log('You have tied :|'); //update to send to message window
    messageWindow.send('You have tied :|');
    boardDisplay.showMessage('tie');
    gameOver = true;
  }
  else{
    //switch to other oponents move
    playerTurn = !playerTurn;
    //next turn
    turn++;
  }
}
//METHOD: makeMove(move: object)
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

//METHOD: aiPlayerMove() - simple heuristic scoring alogrithim (i.e. getMoveScore)
function aiPlayerMove(){    
  var bestMove = {},
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
        move.score = getMoveScore(move);               
        if(move.score >= bestMove.score){
          bestMove = JSON.parse(JSON.stringify(move)); //hack to copy one object to another
        }
      }
    }
  }
  if(!bestMove.hasOwnProperty('row')){
    bestMove = JSON.parse(JSON.stringify(move));
    console.log('error! no best move!');
  } 
  //make move
  if(makeMove(bestMove)){ determineGameState(bestMove); }    
  //makeMove(bestMove);
  //determineGameState(bestMove);
}

//METHOD: perfectAiPlayerMove() - uses min/max search algorithim and heuristic scoring
function perfectAiPlayerMove(){

}

//METHOD: getMoveScore(move: object, [board: array])
function getMoveScore(move, ...args){    
  //move score:
  //  score each unit (columns, rows, diagonals) with regards to potential move
  //   +100 = computer: unit that will have three in a row
  //   +10  = computer: unit that will have two in a row with one empty
  //   +1   = computer: unit that will have one with two empty    
  //   -100  = player:   unit has two in a row with one empty
  //   -10   = player:   unit that will have one in a row
  //    -1   = empty unit

  //use supplied board or create copy of board
  let testBoard;
  if(args && args.length > 0){
    testBoard = args[0];
  }
  else{
    testBoard = board.makeCopyOfBoard();
  }        
  //2. create container for each scored unit (3 rows, 3 columns, and 2 diagonals) and totalScore    
  let scores = [];
  let totalScore = 0;    
  //3. place computer test move
  testBoard[move.row-1][move.column-1] = move.piece;
  //4. sum up scores for all columns, rows, and diagonals
  totalScore += getScore( board.getRows(testBoard) );
  totalScore += getScore( board.getColumns(testBoard) );
  totalScore += getScore( board.getDiagonals(testBoard) );
  
  return totalScore;                     
}
//METHOD: getScore(board: array)
function getScore(board){  
    let score = 0;
    score = board.reduce(((value, row) => {             
      let rowTotal = row.reduce(((total, cell) => {
        if(cell === computerPiece){ 
          return total < 0 ? -100 : total += 1;        
        }else
        if(cell === playerPiece){ 
          return total > 0 ? 100 : total -= 1; 
        }else
        if(cell === '') { 
          return total += 0;
        }      
      }), 0);
      let subTotal = 0; 
      if(Math.abs(rowTotal) > 3){
        subTotal = value + 0;
      }else{
        subTotal = value + translateScoreToFinal(rowTotal);
      }
      return subTotal;        
      //return Math.abs(subTotal) > 3 ? value += 0 : value += subTotal;
        
    }), 0);
    //UTILITY FUNCTION: translateScoreToFinal(score: int)
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
      return newScore;
    }
    //return final score from getScore(board: array)
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
function getPlayerPiece(){
  return playerPiece;
}

function setPlayerPiece(piece){    
  playerPiece = piece;
  computerPiece = piece === 'X' ? 'O' : 'X';
}

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

function getIsPlayerTurn(){
  return playerTurn;
}

function togglePlayerTurn(){
  playerTurn = !playerTurn;
}

function getGameMode(){    
  return gameMode;
}

function setGameMode(mode){    
  gameMode = mode;
}

export default game;








