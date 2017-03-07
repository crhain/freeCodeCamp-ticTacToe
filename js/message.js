'use strict';
/*A very simple terminal emulator using html*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function Message() {
  _classCallCheck(this, Message);

  this.display = document.getElementById('message-panel');
};