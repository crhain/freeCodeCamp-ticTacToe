'use strict';

var model = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var module = {},
      board = [['', '', ''], ['', '', ''], ['', '', '']],
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

  if (debug) {
    module.board = board;
  }
  //method: getBoard()
  function getBoard() {
    return board;
  }
  //method: getRows([board: array])
  function getRows() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args && args.length > 0) {
      return args[0];
    }
    return board;
  }
  //method: getColumns([board: array])
  function getColumns() {
    var board;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    if (args && args.length > 0) {
      board = args[0];
    } else if (boardColumns && boardColumns.length > 0) {
      return boardColumns;
    }
    var boardColumns = [];
    for (var row = 0; row < board.length; row++) {
      for (var column = 0; column < board[row].length; column++) {
        if (boardColumns.length < column + 1) {
          boardColumns.push([]);
        }
        boardColumns[column].push(board[row][column]);
      }
    }
    return boardColumns;
  }
  //method: getDiagonals([board: array])
  function getDiagonals() {
    var board;

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    if (args && args.length > 0) {
      board = args[0];
    } else if (boardDiagonals && boardDiagonals.length > 0) {
      return boardDiagonals;
    }
    var boardDiagonals = [];
    var diagonalOne = [];
    var diagonalTwo = [];
    for (var i = 0, j = 2; i < board.length; i++, j--) {
      diagonalOne.push(board[i][i]);
      diagonalTwo.push(board[i][j]);
    }
    boardDiagonals.push(diagonalOne);
    boardDiagonals.push(diagonalTwo);

    return boardDiagonals;
  }
  //method: makeCopyOfBoard()
  function makeCopyOfBoard() {
    var copy = [];
    for (var row = 0; row < board.length; row++) {
      copy.push(board[row].slice());
    }
    return copy;
  }
  //method: clearBoard()
  function clearBoard() {
    var board = getBoard();
    for (var row = 0; row < board.length; row++) {
      for (var column = 0; column < board[row].length; column++) {
        board[row][column] = '';
      }
    }
  }
  //method: getBoardCell(row: int, column: int)
  function getBoardCell(row, column) {
    if (column < 1 || row < 1) {
      return false;
    } else if (column > 3 || row > 3) {
      return false;
    }
    var board = getBoard();
    return board[row - 1][column - 1];
  }
  //method: setBoardCell(move: object)
  function setBoardCell(move) {
    //console.log('setting board cell for move:');
    //console.log(move);
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
    //console.log('set board cell for move:');
    //console.log(getBoard());
    return true;
  }

  return module;
}({ debug: true });