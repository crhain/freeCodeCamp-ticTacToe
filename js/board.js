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
        //call game update
        self.game.update(square);
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
    //updates the board display - called from game module

  }, {
    key: 'update',
    value: function update(move) {
      var squareId = move.id;
      this.setSquare(this.getSquareById(squareId), move.piece);
      //document.getElementById(squareId).innerHTML = move.piece;
    }
  }, {
    key: 'getSquareById',
    value: function getSquareById(squareId) {
      return document.getElementById(squareId);
    }
  }, {
    key: 'setSquare',
    value: function setSquare(square, piece) {
      square.innerHTML = piece;
    }
  }]);

  return Board;
}();