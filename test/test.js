var assert = chai.assert;
var playerPiece = game.playerPiece;
var computerPiece = game.computerPiece;

//utility function for tests
function setBoard(board){
  for(let row = 0; row < game.board.length; row++){
    for(let column = 0; column < game.board[row].length; column++){
      game.board[row][column] = board[row][column];
    }
  }
}


describe('Array', function() {
  it('should start empty', function(){
    var arr = [];
    assert.equal(arr.length, 0);
  });
});
describe('METHOD: isWin', function() {
  it('should not show a win condition', function(){
    var currentMove = {row: 1, column:3, piece: 'X'};
    var board = [
      ["", "O", "X"],
      ["", "X", ""],
      ["", "", ""]
    ];

    setBoard(board);
    assert.isNotOk(game.isWin(currentMove), 'game lost!');

  });
  it('should show a win condition - row', function(){
    //test win in row
    var currentMove = {row: 1, column:3, piece: 'X'};
    var board = [
      ["X", "X", "X"],
      ["", "O", ""],
      ["O", "", ""]
    ];
    setBoard(board);
    assert.isOk(game.isWin(currentMove), 'won by row!');
  });
  it('should show a win condition - column', function(){
    //test win in row
    var currentMove = {row: 1, column:3, piece: 'X'};
    var board = [
      ["", "", "X"],
      ["", "O", "X"],
      ["O", "", "X"]
    ];
    setBoard(board);
    assert.isOk(game.isWin(currentMove), 'won by row!');
  });
});

describe('METHOD: moveHandler', function(){
  it('sets correct square:', function(){
    //some stubs to make this work
    var button = {id:'2x1', innerHTML: '', getAttribute: getAttribute};
    function getAttribute(attr){
      return this.id;
    }
    game.moveHandler(button);
    assert.equal(button.innerHTML, playerPiece);
    assert.equal(game.getBoardSquare(1, 2), playerPiece);
    //game.resetBoard();
  });
});


describe('METHOD: getBoard ', function(){
  it('should return board from game:', function(){
    game.resetBoard();
    assert.equal(game.getBoard(), game.board);

  });
});

describe('METHOD: setBoardSquare/getBoardSquare', function(){
  it('does not allow setting outside board size:', function(){
      game.setBoardSquare(5, 0, 'X');
      assert.notEqual(game.getBoardSquare(5, 0), playerPiece);
      assert.notEqual(game.getBoard()[5][0], playerPiece);
      game.resetBoard();
  });
  it('sets correct value:', function(){
      game.setBoardSquare(1,1, playerPiece);
      assert.equal(game.getBoardSquare(1, 1), playerPiece);
      game.resetBoard();
  });
});

describe('METHOD: resetBoard', function(){
  it('should reset board to empty:', function(){
    game.setBoardSquare(1, 1, playerPiece);
    game.resetBoard();
    assert.deepEqual(game.getBoard(), [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
    );
  });
});



//boilder plate
/*describe('METHOD:', function(){
  it(':', function(){

  });
});*/
