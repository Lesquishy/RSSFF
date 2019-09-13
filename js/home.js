// The info for the file locations
var sourceFile = "./data/sources.txt";

var errorColor = "red";
var loadstate = 1;
var stop = false;
var sources;

// How the startup order will run
// HTML Ready
console.log("Welcome to the SOS panel");
console.log("type 'help()' to learn more")
$(document).ready( function (){

 // Page ready
  window.onload = function(){
    readTextFile(sourceFile);


    present();
  }
});


// Gets the web page ready to present
function present(){
  if(stop == false){

    $("#message").hide()
    $("#message").text(" ");
    greyOut("hide");
    loading();
  }
}

// Displays / hides the loading screen
function loading() {

  if(loadstate == 1){ // If its already showing
    greyOut("hide");
    $("#loading").fadeOut(400);
    loadstate = 0;
  } else { // If its not shown
    greyOut("show");
    $("#loading").fadeIn(400);
    loadstate = 1
  }
}

// Error Wil display the error message
// level is represented by 'n', 'm', 'h' for Notification, Medium, High respectively
// Notification can be disregarded. Just a nice way to leave a message
// Medium is for when something isnt quite right. But it should stil work.
// High is and error that will cause the site to not do as its suppose to.
function message(where, why, level){

  if([where, why, level].indexOf() == null){
    $("#message").css('background-color', errorColor);
    $("#message").text("No error message, But theres a problem");
    $("#message").slideDown();
    greyOut("show");

  } else {
    var output;
    if(level == "h"){
      output = "There was a problem " + where + ". Because " + why;
      $("#message").text(output);
      $("#message").css('background-color', 'red');
      $("#message").slideDown();
    } else if (level == "m"){
      output = "There was a problem " + where + ". Because " + why + ". This shouldn't effect the operation of the site";
      $("#message").text(output);
      $("#message").css('background-color', 'orange');
      $("#message").slideDown();
    } else {
      output = where;
      $("#message").text(output);
      $("#message").css('background-color', 'grey');
      $("#message").slideDown();
    }
  }
}

// Greys out the background so you cant interact with it.
function greyOut(action) {
  if (action == "show"){
    $("#grey").fadeIn(400);
  } else if (action == "hide"){
    $("#grey").fadeOut(400);
  } else {
    console.log("greyOut Fade invalid input");
  }
}

function help(){
  console.log("'greyOut(state)' Will hide or show the foreground for loading screens Greyout accepts 'show' and 'hide' \n")
  console.log("'loading()' Will display / hide the full loading screen")
  console.log("No more helpful functions atm");
}
