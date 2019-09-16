//The Main JS script. For all the code that doesnt have a file for somewhere else


//Movie variables for the searches
var title = [];
var img = [];
var desc = [];
var time = [];
var genre = [];
var link = [];
var size = [];
var imageNULL = false;
var imageNULLId = -1;
var query = "";
var searchGenre = "";
var searchQuality = "";
var searchSort = "";
var searchLimit = "";
var result;
var searchType = "";
var searchParam = "";

// The info for the file locations
var sourceFile = "./data/sources.txt";

var errorColor = "red";
var loadstate = 1;
var stop = false;
var sources;
var anispeed = 400;

// How the startup order will run
// HTML Ready
console.log("Welcome to the SOS panel");
console.log("type 'help()' to learn more")
$(document).ready( function (){

 // Page ready
  window.onload = function(){


    present();
  }
});

//So when you click the faded background it'll hide anything thats open
function greyHide(){
  toggleFade();
}

function nigger() {
    readSources(sourceFile);
}


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
    $("#loading").fadeOut(anispeed);
    loadstate = 0;
  } else { // If its not shown
    greyOut("show");
    $("#loading").fadeIn(anispeed);
    loadstate = 1
  }
}

function startSearch() {
    if ($("#1").hasClass("active") == true) {
        console.log("Search Locally");
    }else if ($("#2").hasClass("active") == true) {
        console.log("Search the YTS Website");
        toggleSearchLoad();
        setTimeout(function() {
            ytsSearch();
        }, 200);
    }else if ($("#3").hasClass("active") == true) {
        toggleSearchLoad();
        setTimeout(function() {
            console.log("trsttegegeg");
            nigger();
        }, 200);
    }
}

$( window ).keypress(function(e){
    if ( $("input").is( ':focus' ) && e.keyCode == 13 ) {
        startSearch();
    }
});

// Error Wil display the error message
// level is represented by 'n', 'm', 'h' for Notification, Medium, High respectively
// Notification can be disregarded. Just a nice way to leave a message
// Medium is for when something isnt quite right. But it should stil work.
// High is and error that will cause the site to not do as its suppose to.
function message(where, why, level){

  if([where, why, level].indexOf() == null){
    $("#message").css('background-color', errorColor);
    $("#message").text("No error message, But theres a problem");
    $("#message").slideDown(anispeed);
    greyOut("show");

  } else {
    var output;
    if(level == "h"){
      output = "There was a problem at " + where + ". Because " + why;
      $("#message").text(output);
      $("#message").css('background-color', 'red');
      $("#message").slideDown(anispeed);
    } else if (level == "m"){
      output = "There was a problem aT " + where + ". Because " + why + ". This shouldn't effect the operation of the site";
      $("#message").text(output);
      $("#message").css('background-color', 'orange');
      $("#message").slideDown(anispeed);
    } else {
      output = where;
      $("#message").text(output);
      $("#message").css('background-color', 'grey');
      $("#message").slideDown(anispeed);
    }
  }
}

// Greys out the background so you cant interact with it.
function greyOut(action) {
  if (action == "show"){
    $("#grey").fadeIn(anispeed);
  } else if (action == "hide"){
    $("#grey").fadeOut(anispeed);
  } else {
    console.log("greyOut Fade invalid input");
  }
}

function help(){
  console.log("'greyOut(state)' Will hide or show the foreground for loading screens Greyout accepts 'show' and 'hide' \n")
  console.log("'loading()' Will display / hide the full loading screen")
  console.log("No more helpful functions atm");
}
