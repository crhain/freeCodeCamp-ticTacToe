'use strict';
var model = (function(...args){
  var module = {},
      board = [ 
        ['', '', ''], 
        ['', '', ''], 
        ['', '', ''] 
      ],
      boardRows,
      boardColumns,
      boardDiagonals;
  //configuration
  var debug = true;
  //public methods    
  module.getBoard = getBoard;
  module.getRows = getRows;
  module.getColumns = getColumns;
  module.getDiagonals = getDiagonals;
  module.makeCopyOfBoard = makeCopyOfBoard;
  module.clearBoard = clearBoard;
  module.getBoardCell = getBoardCell;
  module.setBoardCell = setBoardCell;    

  if(debug){
    module.board = board;
  }
  //method: getBoard()
  function getBoard(){
    return board;
  }
  //method: getRows([board: array])
  function getRows(...args){
    if(args && args.length > 0){
        return args[0];
    }  
    return board;    
  }
  //method: getColumns([board: array])
  function getColumns(...args){
    var board;
    if(args && args.length > 0){
        board = args[0];
    }else          
    if(boardColumns && boardColumns.length > 0){
        return boardColumns;
    }
    var boardColumns = [];
    for(let row = 0; row < board.length; row++){
      for(let column = 0; column < board[row].length; column++){
        if(boardColumns.length < column + 1){
          boardColumns.push([]);
        }                 
        boardColumns[column].push(board[row][column]);
      }      
    }
    return boardColumns;    
  }
  //method: getDiagonals([board: array])
  function getDiagonals(...args){
      var board;      
      if(args && args.length > 0){
          board = args[0]
      }else
      if(boardDiagonals && boardDiagonals.length > 0){
         return boardDiagonals; 
      }
      var boardDiagonals = [];
      var diagonalOne = [];
      var diagonalTwo = [];
      for(let i = 0, j = 2; i < board.length; i++, j--){
        diagonalOne.push(board[i][i]);
        diagonalTwo.push(board[i][j])        
      }
      boardDiagonals.push(diagonalOne);
      boardDiagonals.push(diagonalTwo);
      
      return boardDiagonals;       
  }
  //method: makeCopyOfBoard()
  function makeCopyOfBoard(){    
    var copy = [];    
    for(let row = 0; row < board.length; row++){      
      copy.push(board[row].slice());
    }
    return copy;        
  }
  //method: clearBoard()
  function clearBoard(){
    var board = getBoard();
    for(let row = 0; row < board.length; row++){
      for(let column = 0; column < board[row].length; column++){
        board[row][column] = '';
      }
    }
  }
  //method: getBoardCell(row: int, column: int)
  function getBoardCell(row, column){
    if(column < 1 || row < 1){
      return false;
    } else if (column > 3 || row > 3){
      return false;
    }
    var board = getBoard();
    return board[row-1][column-1];
  }
  //method: setBoardCell(move: object)
  function setBoardCell(move){
    //console.log('setting board cell for move:');
    //console.log(move);
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
    //console.log('set board cell for move:');
    //console.log(getBoard());
    return true;
  }
  
  return module;      

})({debug: true});