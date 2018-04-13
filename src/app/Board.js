/*handles display of board, board input*/

export default class Board {
  constructor(game){
    this.game = game;
    var buttons = document.querySelectorAll('#board button');
    //short circuit for tests
    if(!buttons){ return; }
    //add click handler to buttons
    var self = this;
    for(let i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', function(e){
        var square = this;
        //console.log('button clicked!');
        //call game update
        self.game.update(square);
        e.preventDefault();
      });
    }
  }
  reset(){
    var buttons = document.querySelectorAll('#board button');
    var messageWindows = document.getElementsByClassName('game-over');
    //clear text on buttons
    for(let i = 0; i < buttons.length; i++){
      buttons[i].innerHTML = '';
    }
    //close any open game-over status messageWindows
    for(let i = 0; i < messageWindows.length; i++){
      messageWindows[i].classList.remove('show');
    }
  }
  //updates the board display - called from game module
  update(move){
    let squareId = move.id;
    this.setSquare(this.getSquareById(squareId), move.piece);    
  }
  showMessage(message){
    var messageId = message.toLowerCase();    
    let messageWindow = document.getElementById(messageId);
    if(!messageWindow.classList.contains('show')){
      messageWindow.classList.add('show');      
    }
  }  
  getSquareById(squareId){
    return document.getElementById(squareId);
  }
  setSquare(square, piece){
    square.innerHTML = piece;
  }
}

