'use strict';
/*Handles input from and display of control panel*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function Control(game) {
  var _this = this;

  _classCallCheck(this, Control);

  this.game = game;
  this.resetButton = document.getElementById('reset-btn');
  //added for when running tests so that an error is not thrown
  if (!this.resetButton) {
    return;
  }
  //set up even listener
  this.resetButton.addEventListener('click', function (e) {
    _this.game.reset();
    e.preventDefault();
  });
};