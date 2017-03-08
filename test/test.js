var assert = chai.assert;

//object to get ui elements on test html when needed
var ui = {
  resetButton: document.getElementById('reset-btn'),
  messageWindow: document.getElementById('message-display'),
};


//utility function for tests
function setBoard(board){
  var gameBoard = game.getBoard();
  for(let row = 0; row < gameBoard.length; row++){
    for(let column = 0; column < gameBoard[row].length; column++){
      gameBoard[row][column] = board[row][column];
    }
  }
}


describe('Array', function() {
  it('should start empty', function(){
    var arr = [];
    assert.equal(arr.length, 0);
  });
});
//*****************************************************************************/
//GAME MODULE TESTS
//*****************************************************************************/
describe('GAME MODULE:', function(){
  describe('METHOD: start()', function(){
    it('should actually write this test', function(){
      assert.isOk(false);
    });
  });
  //STUB
  describe('METHOD: reset()', function(){
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
  describe('METHOD: update(square)', function(){
    it('should actually write this test', function(){
      assert.isOk(false);
    });
  });
  describe('METHOD: determineGameState(move)', function(){
    it('should actually write this test', function(){
      assert.isOk(false);
    });
  });
  describe('METHOD: makeMove(move)', function(){
    var move = {row: 1, column: 2, piece: 'X', id: '1x2'};
    var success = game.makeMove(move);
    var square = document.getElementById(move.id);
    it('succesfully makes move', function(){
      assert.isOk(success);
    });
    it('square shows correct piece', function(){
      assert.equal(square.innerHTML, 'X');
    });
    it('board array updates correctly', function(){
      var board = game.getBoard();
      assert.equal(board[move.row-1][move.column-1], 'X');
    });
    it('does not make moves outside of board', function(){
      var success = game.makeMove({row: 5, column: 2, piece: 'X', id: '5x2'});
      assert.isNotOk(success);
      success = game.makeMove({row: 1, column: 10, piece: 'X', id: '1x10'});
      assert.isNotOk(success);
    });
  });
  describe('METHOD: aiPlayerMove()', function(){
    it('need to write test', function(){
      assert.isOk(false);
    });
  });
  describe('METHOD: getMoveScore(move)', function(){
    it('need to write test', function(){
      assert.isOk(false);
    });
  });
  describe('METHOD: isMoveValid(move)', function(){
    it('should actually write this test', function(){
      assert.isOk(false);
    });
  });
  describe('METHOD: isWin', function() {
    it('should not show a win condition', function(){
      var currentMove = {row: 1, column:3, piece: 'X', id: '1x3'};
      var board = [
        ["", "O", "X"],
        ["", "X", ""],
        ["", "", ""]
      ];
      setBoard(board);
      assert.isNotOk(game.isWin(currentMove));
    });
    it('should show a win condition - row', function(){
      //test win in row
      var currentMove = {row: 1, column:3, piece: 'X', id: '1x3'};
      var board = [
        ["X", "X", "X"],
        ["", "O", ""],
        ["O", "", ""]
      ];
      setBoard(board);
      assert.isOk(game.isWin(currentMove));
    });
    it('should show a win condition - column', function(){
      //test win in row
      var currentMove = {row: 1, column:3, piece: 'X', id: '1x3'};
      var board = [
        ["", "", "X"],
        ["", "O", "X"],
        ["O", "", "X"]
      ];
      setBoard(board);
      assert.isOk(game.isWin(currentMove));
    });
  });
  describe('METHOD: isTie', function(){
    it('should not be a tie', function(){
      var currentMove = {row: 1, column:3, piece: 'X', id: '1x3'};
      var board = [
        ['O', 'X', 'X'],
        ['', 'O', ''],
        ['', '', '']
      ];
      setBoard(board);
      assert.isNotOk(game.isTie(currentMove));
    });
    it('should be a tie', function(){
      var currentMove = {row: 1, column:3, piece: 'O', id: '1x3'};
      var board = [
        ['O', 'X', 'O'],
        ['X', 'O', 'O'],
        ['X', 'O', 'X']
      ];
      setBoard(board);
      console.log(board);
      assert.isOk(game.isTie(currentMove));
    });
  });
  describe('METHOD: createMoveFromSquare(square)', function(){
    it('should actually write this test', function(){
      assert.isOk(false);
    });
  });
  describe('METHOD: createMoveFromCoords(row, column, piece)', function(){
    it('should actually write this test', function(){
      assert.isOk(false);
    });
  });
  describe('METHOD: getBoard', function(){
    it('should actually write this test', function(){
      assert.isOk(false);
    });
  });
  describe('METHOD: clearBoard()', function(){
    it('should actually write this test', function(){
      assert.isOk(false);
    });
  });
});
//******************************************************************************/
//BOARD CLASS TESTS
//******************************************************************************/
describe('BOARD CLASS', function(){
  describe('METHOD: reset()', function(){
    it('clears all set squares', function(){
      var board = new  Board();
      board.update({row: 1, column: 1, piece: 'X', id:'1x1'});
      board.update({row: 3, column: 2, piece: 'X', id:'3x2'});
      board.reset();
      var square1x1 = document.getElementById('1x1');
      var square3x2 = document.getElementById('3x2');
      assert.equal(square1x1.innerHTML, '');
      assert.equal(square3x2.innerHTML, '');

    });
  });
  describe('METHOD: update()', function(){
    it('should update button with piece...', function(){
      var board = new Board();
      var move = {row: 1, column: 2, piece: 'X', id:'1x2'};
      var square = document.getElementById('1x2');
      board.update(move);
      assert.equal(square.innerHTML, 'X');
    });
  });
  describe('METHOD: getSquareById(squareId)', function(){
    it('should return correct square', function(){
      var board = new Board();
      var square = document.getElementById('1x2');
      assert.equal(board.getSquareById('1x2').getAttribute('id'), '1x2');
    });
  });
  describe('METHOD: setSquare(square, piece)', function(){
    it('should update button with piece...', function(){
      var board = new Board();
      var move = {row: 1, column: 2, piece: 'X', id:'1x2'};
      var square = document.getElementById('1x2');
      board.setSquare(square, 'X');
      assert.equal(square.innerHTML, 'X');
    });
  });
});

//******************************************************************************/
//MESSAGE CLASS TESTS
//******************************************************************************/
describe('MESSAGE CLASS', function(){
  describe('METHOD: send(message)', function(){
    it('it updates outputBuffer with new message', function(){
      var displayElement = ui.messageWindow;
      var messageDisplay = new Message();
      var message = "Hello World!";
      messageDisplay.send(message);
      assert.equal(displayElement.innerHTML, "<p>Hello World!</p>");
    });
  });

  describe('METHOD: reset()', function(){
    it('buffer is cleared after calling reset', function(){
      var messageDisplay = new Message();
      var message = "Hello World!";
      var buffer = messageDisplay.outputBuffer;
      messageDisplay.updateDisplay(message);
      //console.log(messageDisplay.outputBuffer);
      messageDisplay.reset();
      assert.equal(buffer.length, 0);
    });
  });
  describe('METHOD: updateOutputBuffer', function(){
    it('it updates outputBuffer with new message', function(){
      var messageDisplay = new Message();
      var message = "Hello World!";
      messageDisplay.updateOutputBuffer(message);

      assert.equal(messageDisplay.outputBuffer[messageDisplay.outputBuffer.length - 1], message);
    });
  });
  describe('METHOD: updateDisplay(buffer)', function(){
    it('returns contents of buffer as formated text:', function(){
      var messageDisplay = new Message();
      var displayWindow = ui.messageWindow;
      messageDisplay.updateDisplay(["Hello World!"]);
      assert.equal(displayWindow.innerHTML, "<p>Hello World!</p>");
    });
  });
  describe('METHOD: getFormatedOutputText(buffer)', function(){
    it('returns contents of buffer as formated text:', function(){
      var messageDisplay = new Message();
      var output = messageDisplay.getFormatedOutputText(["Hello World!", "This is Great!"])
      assert.equal(output, "<p>This is Great!</p><p>Hello World!</p>");
    });
  });
  describe('METHOD: getOutputBuffer()', function(){
    it('returns outputBuffer:', function(){
      var messageDisplay = new Message();
      var buffer = messageDisplay.getOutputBuffer();
      assert.equal(buffer, messageDisplay.outputBuffer);
    });
  });
  describe('METHOD: getDisplayWindow()', function(){
    it('returns outputBuffer:', function(){
      var messageDisplay = new Message();
      var display = messageDisplay.getDisplayWindow();
      assert.equal(display, messageDisplay.display);
    });
  });
});
//******************************************************************************/
//CONTROL CLASS TESTS
//******************************************************************************/
describe('CONTROL CLASS:', function(){
  describe('METHOD:', function(){
    it('reset button works:', function(){
      var controlPanel = new Control();
      var button = ui.resetButton;
      assert.isOk(true);
    })
  });
});

/*
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
///describe('METHOD:', function(){
//  it(':', function(){
//  });
//});
*/
