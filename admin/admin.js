//This file gets the local movies and displays them

var link = "../data/movieIndex.json";

$(document).ready(function() {
    fetchResults(link);
});

function fetchResults(link) {
  var response;
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", link, false);
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4){
      if(rawFile.status === 200 || rawFile.status == 0){
        response = rawFile.responseText;
        window.setTimeout(displayResults(response),4000);
        //rssInterpret(response);
      } else {
        stop = true;
      }
    }
  }
  rawFile.send(null);
}

function displayResults(movies) {
    var movies = JSON.parse(movies);
    console.log(movies);
    console.log("________________________");
    console.log(movies[0]);
}
