'use strict';
/*handles display of board, board input*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(game) {
    _classCallCheck(this, Board);

    this.game = game;
    var buttons = document.querySelectorAll('#board button');
    //short circuit for tests
    if (!buttons) {
      return;
    }
    //add click handler to buttons
    var self = this;
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        var square = this;
        //console.log('button clicked!');
        self.update(square);
        e.preventDefault();
      });
    }
  }

  _createClass(Board, [{
    key: 'reset',
    value: function reset() {
      var buttons = document.querySelectorAll('#board button');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = '';
      }
    }
  }, {
    key: 'update',
    value: function update(square) {
      //console.log('my id is:' + square.getAttribute('id'));
      var move = this.getCurrentMoveOnBoard(square);
      //update square text if it is currently empty
      if (this.game.isMoveValid(move)) {
        square.innerHTML = move.piece;
        //call update method on enclosing game module to update game model
        this.game.update(move);
      } else {
        //let update know that move is invalid by passing empty move
        this.game.update({});
      }
    }
  }, {
    key: 'getCurrentMoveOnBoard',
    value: function getCurrentMoveOnBoard(square) {
      var squareIDString = square.getAttribute('id');
      var squareIDDelminiterPos = squareIDString.indexOf('x');
      var column = Number.parseInt(squareIDString.substring(0, squareIDDelminiterPos)),
          row = Number.parseInt(squareIDString.substring(squareIDDelminiterPos + 1));
      var move = { row: row, column: column, piece: this.game.getCurrentPiece() };
      return move;
    }
  }]);

  return Board;
}();

/*function(){

  //PUBLIC METHODS
  function init(){
    var buttons = document.querySelectorAll('#board button');
    //add click handler to buttons
    for(let i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', function(e){
        var square = this;
        //console.log('button clicked!');
        update(square);

        e.preventDefault();
      });
    }
  }

  function reset(){
    for(let row = 0; row < board.length; row++){
      for(let column = 0; column < board[row].length; column++){
        board[row][column] = '';
      }
    }
    return true;
  }

  //PRIVATE METHODS
  function update(square){
    //console.log('my id is:' + square.getAttribute('id'));
    var move = getCurrentMove(square);
    //update square text if it is currently empty
    if(square.innerHTML === ''){
      square.innerHTML = move.piece;
    }
    //call game.update to update game model
    //game.update(move);
  }

  //creates a move object
  function getCurrentMove(square){
    var squareIDString = square.getAttribute('id');
    var squareIDDelminiterPos = squareIDString.indexOf('x');
    var column = Number.parseInt(squareIDString.substring(0, squareIDDelminiterPos)),
        row = Number.parseInt(squareIDString.substring(squareIDDelminiterPos + 1));
    var move = {row: row, column: column, piece: 'X'};
    return move;
  }


  //SETUP MODULE
  module.init = init;
  module.reset = reset;

  //EXPORT MODULE
  return module;
})(game);
*/