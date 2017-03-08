'use strict';
/*A very simple terminal emulator using html*/
class Message{
  constructor(){
    this.display = document.getElementById('message-display');
    this.outputBuffer = [];
  }
  //public methods
  send(message){
    var buffer = this.updateOutputBuffer(message);
    this.updateDisplay(buffer);
  }
  reset(){
    var buffer = this.getOutputBuffer();
    buffer.splice(0, buffer.length);
    this.updateDisplay(buffer);
  }
  //private methods
  updateOutputBuffer(message){
    var buffer = this.getOutputBuffer();
    buffer.push(message);
    return buffer;
  }
  updateDisplay(buffer){
    var display = this.getDisplayWindow()
    display.innerHTML = this.getFormatedOutputText(buffer);
  }
  getFormatedOutputText(buffer){
    var output = '';
    for(let i = buffer.length - 1; i >= 0; i--){
      output += '<p>' + buffer[i] + '</p>';
    }
    return output;
  }
  //getter methods for class properties
  getOutputBuffer(){
    return this.outputBuffer;
  }
  getDisplayWindow(){
    return this.display;
  }
  //getLineLimit(){
  //  return this.lineLimit;
  //}
}
