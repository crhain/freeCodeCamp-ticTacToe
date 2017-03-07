/*handles display of board, board input*/
var board = (function(global){
  var module = {};
  //PRIVATE PROPERTIES
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

  //START GAME
  function startGame(){
    initalizeBoard();
  }

  //PRIVATE METHODS
  function initalizeBoard(){
    var buttons = document.querySelectorAll('#board button');
    //add click handler to buttons
    for(let i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', function(e){
        var button = this;
        console.log('button clicked!');
        if(!gameOver){
          move(button);
        }
        e.preventDefault();
      });
    }

    //intialize control buttons
    var reset = document.getElementById('reset-btn');
    reset.addEventListener('click', function(e){
      resetGame();
      e.preventDefault();
    });
  }
  //function registers players move on board and updates board variable
  function move(button){
    var buttonIDString = button.getAttribute('id');
    var buttonIDDelminiterPos = buttonIDString.indexOf('x');
    var column = Number.parseInt(buttonIDString.substring(0, buttonIDDelminiterPos)),
        row = Number.parseInt(buttonIDString.substring(buttonIDDelminiterPos + 1));
    var piece = playerTurn ? playerPiece : computerPiece;
    var currentMove = getCurrentMove(column, row, piece);
    //check to see if square already clicked on
    if(button.innerHTML != ''){
      console.log('INVALID MOVE!');
      return false;
    }
    console.log('Turn: ' + turn);
    //set square on screen
    button.innerHTML = piece;
    //set corresponding square on board
    setBoardSquare(row, column, piece);

    //test for win
    if(isWin(currentMove)){
      //for now we will automatically reset the game
      // but later we could add a reset button and just freeze the game
      if(playerTurn){
        console.log('You have WON!!!');
      }
      else{
        console.log('You have LOST :((((');
      }
      gameOver = true;
      //resetGame();
    }
    else if(isTie()){
      console.log('You have tied :|');
      gameOver = true;

    }
    else{
      //switch to other oponents move
      playerTurn = !playerTurn;
      //next turn
      turn++;
    }
    return true;
  }

  //determine if a winning move has occured
  function isWin(currentMove){
    //compare current board to various win conditions (8 possible)
    var column = 1;
    var row = 1;
    var squareMatches = 0;
    //first we check if all squares in row are = to piece
    var currentMovePositionString = currentMove.row.toString() + ',' + currentMove.column.toString();
    for(column = 1; column <= 3; column++){
      //console.log('matching row:' + currentMove.row + ' , column:' + column);
      //console.log('board piece is:' + getBoardSquare(currentMove.row, column));
      if(getBoardSquare(currentMove.row, column) === currentMove.piece){
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
      if(getBoardSquare(row, currentMove.column) === currentMove.piece){
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
      if(getBoardSquare(2, 2) === currentMove.piece && getBoardSquare(3, 3) === currentMove.piece){
        return true;
      }
    //top right corner
    }else if(currentMovePositionString === '1,3'){
      if(getBoardSquare(2, 2) === currentMove.piece && getBoardSquare(3, 1) === currentMove.piece){
        return true;
      }
    // center, so need to check both diagonals
    }else if(currentMovePositionString === '2,2'){
      if(getBoardSquare(1, 1) === currentMove.piece && getBoardSquare(3, 3) === currentMove.piece){
        return true;
      }
      if(getBoardSquare(1, 3) === currentMove.piece && getBoardSquare(3, 1) === currentMove.piece){
        return true;
      }
    //bottom left corner
    }else if(currentMovePositionString === '3,1'){
      if(getBoardSquare(2, 2) === currentMove.piece && getBoardSquare(1, 3) === currentMove.piece){
        return true;
      }
    //bottom right corner
    }else if(currentMovePositionString === '3,3'){
      if(getBoardSquare(2, 2) === currentMove.piece && getBoardSquare(1, 1) === currentMove.piece){
        return true;
      }
    }

    return false;
  }

  function isTie(){
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

  function resetGame(){
    var buttons = document.querySelectorAll('#board button');
    //reset board array
    resetBoard();
    //reset the board on screen
    for(let i=0; i < buttons.length; i++){
      buttons[i].innerHTML = '';
    }
    //reset variables
    playerTurn = true;
    gameOver = false;
    turn = 1;
  }
  //PUBLIC METHODS
  function getCurrentMove(col, row, piece){
    return {column: col, row: row, piece: piece};
  }

  function getBoard(){
    return board;
  }
  function resetBoard(){
    for(let row = 0; row < board.length; row++){
      for(let column = 0; column < board[row].length; column++){
        board[row][column] = '';
      }
    }
    return true;
  }
  function setBoardSquare(row, column, value){
    var board = getBoard();
    if(column < 1 || row < 1){
      return false;
    } else if (column > 3 || row > 3){
      return false;
    }
    board[row-1][column-1] = value;
    return true;
  }
  function getBoardSquare(row, column){
    if(column < 1 || row < 1){
      return false;
    } else if (column > 3 || row > 3){
      return false;
    }
    var board = getBoard();
    return board[row-1][column-1];
  }
  function getTurn(){
    return turn;
  }

  //SETUP MODULE
  module.board = board;
  module.playerPiece = playerPiece;
  module.computerPiece = computerPiece;
  module.playerTurn = playerTurn;
  module.start = startGame;
  module.initalizeBoard = initalizeBoard;
  module.moveHandler = move;
  module.isWin = isWin;
  module.getBoard = getBoard;
  module.resetBoard = resetBoard;
  module.setBoardSquare = setBoardSquare;
  module.getBoardSquare = getBoardSquare;

  //EXPORT MODULE
  return module;
})(this);
