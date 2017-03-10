'use strict';
/*handles display of board, board input*/
class Board{
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
    for(let i = 0; i < buttons.length; i++){
      buttons[i].innerHTML = '';
    }
  }
  //updates the board display - called from game module
  update(move){
    let squareId = move.id;
    this.setSquare(this.getSquareById(squareId), move.piece);
    //document.getElementById(squareId).innerHTML = move.piece;
  }
  getSquareById(squareId){
    return document.getElementById(squareId);
  }
  setSquare(square, piece){
    square.innerHTML = piece;
  }
}