//counter code
var button = documnet.getElementById('counter');
var counter = 0
button.onclick = function () {
  
  //Make a request to the counter endpoint
  
  //capture the response and store it in a variablle 
  //Render the variable in the correct span
  
  counter = counter +1;
  var span = document.getElementById('count');
  span.InnerHTML = counter.toString();
  
};
