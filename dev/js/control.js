'use strict';
/*Handles input from and display of control panel*/
class Control{
  constructor(game){
    this.game = game;
    this.resetButton = document.getElementById('reset-btn');
    this.gameModeSelect = document.getElementById('game-mode-select');
    //added for when running tests so that an error is not thrown
    if(!this.resetButton){
      return;
    }
    //set up even listener
    this.resetButton.addEventListener('click', (e) => {      
      this.game.reset();
      e.preventDefault();
    });
    this.gameModeSelect.addEventListener('change', (e) => {
      //console.log(e);      
      this.game.setGameMode(parseInt(e.target.value));
      e.preventDefault();
    });
  }
}
