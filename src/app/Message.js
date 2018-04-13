/*A very simple terminal emulator using html*/

export default class Message{
  constructor(){
    this.display = document.getElementById('message-display');
    this.outputBuffer = [];
    var messagePanel = document.getElementById('message-panel');

    messagePanel.addEventListener('click', (e) => {
      let classes = messagePanel.classList;
      let title = messagePanel.getElementsByTagName('h3')[0];      
      if(classes.contains('is-rolled-up')){
        messagePanel.classList.remove('is-rolled-up');
        title.innerHTML = "Messages:";
      }
      else{
        messagePanel.classList.add('is-rolled-up');
        title.innerHTML = "Click To Show More";        
      }
    });
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
