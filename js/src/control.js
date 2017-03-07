/*Handles input from and display of control panel*/
class Control{
  constructor(game){
    this.game = game;
    this.resetButton = document.getElementById('reset-btn');
    this.resetButton.addEventListener('click', (e) => {
      this.game.reset();
      e.preventDefault();
    });
  }
}
