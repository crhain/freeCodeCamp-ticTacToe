var assert = chai.assert;

//object to get ui elements on test html when needed
var ui = {
  resetButton: null,
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
//Tests for game module
describe('GAME MODULE:', function(){
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
});
//MESSAGE CLASS TESTS
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
      console.log(messageDisplay);
      //buffer.splice(0,1);
      //console.log(messageDisplay.outputBuffer);
      //console.log(buffer);
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
