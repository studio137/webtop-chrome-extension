document.addEventListener('DOMContentLoaded', function () {

  // Set the time for the center clock
  var today = new Date();
  var time = formatTime(today.getHours()) + ":" + formatTime(today.getMinutes());
  document.getElementById('time').innerHTML = time;

  // Run the function to update the background and quote
  startNewTab();

  // Add a listener to receive messages from the popup
  chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    // If the button is pushed on the popup to update the background and quote
    if (msg.action == "updateImage") {
      // Change the background image and quote of the new tab
      updateNewTab();
      // Return and success response
      sendResponse({status: "success"});
    }
  });

    
    
});


// Function to retrieve and add the background and quote to the new tab
// This function makes a call to the api and returns the background image for today's date
function startNewTab() {

  var xhr = new XMLHttpRequest();
  // Call the API
  xhr.open("GET", "https://api.webtop.cloud/v1/startertab", true);
  xhr.onreadystatechange = function() {

    // If a successful 200 messages is received from the server
    if (xhr.readyState == 4) {
      
      // parse JSON from API and set background image and quote
      var data = JSON.parse(xhr.responseText);
      document.getElementById('bg').style.backgroundImage = 'url(' + data.bgImage + ')';
      document.getElementById('quote').innerHTML = data.quote;
      
    }

  }
  xhr.send();

}


// Function to change the background and quote of the new tab based on the popup button
// This function makes a call to the api and returns the background image for a day that is not today and displays and random quote
function updateNewTab() {

  var xhr = new XMLHttpRequest();
  // Call the API
  xhr.open("GET", "https://api.webtop.cloud/v1/startertab/randomize", true);
  xhr.onreadystatechange = function() {

    // If a successful 200 messages is received from the server
    if (xhr.readyState == 4) {
      
      // parse JSON from API and set background image and quote
      var data = JSON.parse(xhr.responseText);
      document.getElementById('bg').style.backgroundImage = 'url(' + data.bgImage + ')';
      document.getElementById('quote').innerHTML = data.quote;
      
    }

  }
  xhr.send();

}


// Format the time to include a 0 if the number is below 10
function formatTime(time) {
    if(time < 10) {
        return "0" + time;
    }
    return time;
}