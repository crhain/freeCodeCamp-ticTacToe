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
        self.update(square);
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
  update(square){
    //console.log('my id is:' + square.getAttribute('id'));
    var move = this.getCurrentMoveOnBoard(square);
    //update square text if it is currently empty
    if(this.game.isMoveValid(move)){
      square.innerHTML = move.piece;
      //call update method on enclosing game module to update game model
      this.game.update(move);
    }
    else{
      //let update know that move is invalid by passing empty move
      this.game.update({});
    }

  }
  getCurrentMoveOnBoard(square){
    var squareIDString = square.getAttribute('id');
    var squareIDDelminiterPos = squareIDString.indexOf('x');
    var column = Number.parseInt(squareIDString.substring(0, squareIDDelminiterPos)),
        row = Number.parseInt(squareIDString.substring(squareIDDelminiterPos + 1));
    var move = {row: row, column: column, piece: this.game.getCurrentPiece()};
    return move;
  }
}



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
