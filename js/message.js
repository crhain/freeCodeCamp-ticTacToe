'use strict';
/*A very simple terminal emulator using html*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);

    this.display = document.getElementById('message-display');
    this.outputBuffer = [];
    var messagePanel = document.getElementById('message-panel');

    messagePanel.addEventListener('click', function (e) {
      var classes = messagePanel.classList;
      var hasClass = false;
      var title = messagePanel.getElementsByTagName('h3')[0];
      for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "is-rolled-up") {
          hasClass = true;
        }
      }
      if (hasClass) {
        messagePanel.classList.remove('is-rolled-up');
        title.innerHTML = "Messages:";
      } else {
        messagePanel.classList.add('is-rolled-up');
        title.innerHTML = "Click To Show More";
      }
    });
  }
  //public methods


  _createClass(Message, [{
    key: 'send',
    value: function send(message) {
      var buffer = this.updateOutputBuffer(message);
      this.updateDisplay(buffer);
    }
  }, {
    key: 'reset',
    value: function reset() {
      var buffer = this.getOutputBuffer();
      buffer.splice(0, buffer.length);
      this.updateDisplay(buffer);
    }
    //private methods

  }, {
    key: 'updateOutputBuffer',
    value: function updateOutputBuffer(message) {
      var buffer = this.getOutputBuffer();
      buffer.push(message);
      return buffer;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay(buffer) {
      var display = this.getDisplayWindow();
      display.innerHTML = this.getFormatedOutputText(buffer);
    }
  }, {
    key: 'getFormatedOutputText',
    value: function getFormatedOutputText(buffer) {
      var output = '';
      for (var i = buffer.length - 1; i >= 0; i--) {
        output += '<p>' + buffer[i] + '</p>';
      }
      return output;
    }
    //getter methods for class properties

  }, {
    key: 'getOutputBuffer',
    value: function getOutputBuffer() {
      return this.outputBuffer;
    }
  }, {
    key: 'getDisplayWindow',
    value: function getDisplayWindow() {
      return this.display;
    }
    //getLineLimit(){
    //  return this.lineLimit;
    //}

  }]);

  return Message;
}();