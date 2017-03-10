'use strict';
/*Handles input from and display of control panel*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function Control(game) {
  var _this = this;

  _classCallCheck(this, Control);

  this.game = game;
  this.resetButton = document.getElementById('reset-btn');
  this.gameModeSelect = document.getElementById('game-mode-select');
  //added for when running tests so that an error is not thrown
  if (!this.resetButton) {
    return;
  }
  //set up even listener
  this.resetButton.addEventListener('click', function (e) {
    _this.game.reset();
    e.preventDefault();
  });
  this.gameModeSelect.addEventListener('change', function (e) {
    //console.log(e);      
    _this.game.setGameMode(parseInt(e.target.value));
    e.preventDefault();
  });
};