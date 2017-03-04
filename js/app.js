'use strict';

/*

Objective: Build a CodePen.io app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/KzXQgy/.

Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

User Story: I can play a game of Tic Tac Toe with the computer.

User Story: My game will reset as soon as it's over so I can play again.

User Story: I can choose whether I want to play as X or O.

Remember to use Read-Search-Ask if you get stuck.

When you are finished, click the "I've completed this challenge" button and include a link to your CodePen.

You can get feedback on your project by sharing it with your friends on Facebook.
*/

console.log("Let's play some Tic Tac Toe!");

var game = function () {
  var module = {};
  //PRIVATE PROPERTIES
  var board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];

  //START GAME
  initalizeBoard();

  //PRIVATE METHODS
  function initalizeBoard() {
    var buttons = document.querySelectorAll('#board button');

    //add click handler to buttons

    for (var i = 0; i < buttons.length; i++) {
      //buttons[i].textContent = ".";
      buttons[i].addEventListener('click', function (e) {
        console.log('button clicked!');
        this.innerHTML = "X";
        e.preventDefault();
      });
    }
  }

  //PUBLIC METHODS
  function getBoard() {
    return board;
  }
  function resetBoard() {
    board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
    return true;
  }

  //SETUP MODULE
  module.getBoard = getBoard;
  module.resetBoard = resetBoard;

  //EXPORT MODULE
  return module;
}();

console.log(game.getBoard());

function hello() {
  var _console;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (_console = console).log.apply(_console, ["Hello"].concat(args));
}

hello('Carl', 'Bob');