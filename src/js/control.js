/*Handles input from and display of control panel*/

export class Control{
  constructor(game){
    this.game = game;
    this.resetButton = document.getElementById('reset-btn');
    this.gameModeSelect = document.getElementById('game-mode-select');
    this.selectPieceBtns = document.getElementsByClassName('select-piece-btn');        
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
      if(parseInt(e.target.value) > 0){

      }
      e.preventDefault();
    });
      for(let i = 0; i < this.selectPieceBtns.length; i++){
        this.selectPieceBtns[i].addEventListener('click', (e) => {
          e.preventDefault();
          //console.log('clicked a piece selection!');
          //console.log(e);
          var selectXbutton = document.getElementById('select-x');
          var selectObutton = document.getElementById('select-o');
          if(game.getGameOver() || game.getTurn() === 1){
            if(e.target.id === 'select-x'){
              if(game.getPlayerPiece() !== 'X'){
                game.setPlayerPiece('X');
                e.target.classList.add('is-active');
                selectObutton.classList.remove('is-active');
              }            
            }else
            if(e.target.id === 'select-o'){
              if(game.getPlayerPiece() !== 'O'){
                game.setPlayerPiece('O');
                e.target.classList.add('is-active');
                selectXbutton.classList.remove('is-active');
              }            
            }  

          }     
          
          
        });
      }                 
  }
}
