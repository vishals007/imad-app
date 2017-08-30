//counter code
var button = documnet.getElementById('counter');


button.onclick = function () {
  
  //Make a request to the counter endpoint
  var request = new XMLHttpRequest();
  
  //capture the response and store it in a variablle 
  request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
          //take some action
          if (request.status === 200) {
              var counter = request.responseText;
              var span=document.getElementById('count');
              span.innerHTML =counter.toString();
          }
      }
      //not done yet
  
  //Render the variable in the correct span
  };
};