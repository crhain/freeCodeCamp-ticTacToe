var model = (function(){
  var module = {},
      board = [ 
        ['', '', ''], 
        ['', '', ''], 
        ['', '', ''] 
      ],
      boardRows,
      boardColumns,
      boardDiagonals;

  //public methods    

  module.getBoard = getBoard;
  module.getRows = getRows;
  module.getColumns = getColumns;
  module.getDiagonals = getDiagonals;
  module.makeCopyOfBoard = makeCopyOfBoard;
  module.clearBoard = clearBoard;
  module.getBoardCell = getBoardCell;
  module.setBoardCell = setBoardCell;    
  
  function getBoard(){
    return board;
  }

  function getRows(...args){
    if(args && args.length > 0){
        return args[0];
    }  
    return board;    
  }
  
  function getColumns(...args){
    if(args && args.length > 0){
        return args[0];
    }          
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

  function getDiagonals(...args){
      if(args && args.length > 0){
          return args[0]
      }
      if(boardDiagonals && boardDiagonals.length > 0){
         return boardDiagonals; 
      }

      var boardDiagonals;

      return boardDiagonals;       
  }
  
  function makeCopyOfBoard(){    
    var copy = [];    
    for(let row = 0; row < board.length; row++){      
      copy.push(board[row].slice());
    }
    return copy;        
  }

  function clearBoard(){
    var board = getBoard();
    for(let row = 0; row < board.length; row++){
      for(let column = 0; column < board[row].length; column++){
        board[row][column] = '';
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

})();