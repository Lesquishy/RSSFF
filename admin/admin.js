//This file gets the local movies and displays them

var link = "../data/movieIndex.json";
var response;
var result;

$(document).ready(function() {
    fetchResults(link);
});

function fetchResults(link) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", link, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                response = rawFile.responseText;
                window.setTimeout(displayResults(response),4000);
                //rssInterpret(response);
            } else {
                console.log("Error at fetchResults()")
            }
        }
    }
    rawFile.send(null);
}

function displayResults(result) {
    result = JSON.parse(result);
    console.log(result)
    $(".menuBtn").remove();

    var length = Object.keys(result).length;
    length = length - 1;

    for (var l = 0; l < length; l++){
        if (l == 0) {
            $('.movieMenu').append('<a onclick="loadEditor(this.id); changeActive(this.id);" id="' + l + '" class="menuBtn active">'+ result[l].title + '</a>');

        }else {
            $('.movieMenu').append('<a onclick="loadEditor(this.id); changeActive(this.id);" id="' + l + '" class="menuBtn">'+ result[l].title + '</a>');

        }

    }
}

function loadEditor(id) {
    result = JSON.parse(response);
    if (result[id].episodic == true) { //Is a TV Show

    }else if (result[id].episodic == false) {//Is a Movie
        $(".editor").html("");
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Title: </div><input class="editTextSmall" value="' + result[id].title + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Runtime: </div><input class="editTextSmall" value="' + result[id].runTime.hours + ' hours ' + result[id].runTime.mins + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Size: </div><input class="editTextSmall" value="' + result[id].size + '" /></div>');
        $(".editor").append('<div class="editContainerLarge"><div class="editName">Description: </div><textarea class="editTextLarge">' + result[id].desc + '</textarea></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Genres: </div><input class="editTextSmall" value="' + result[id].genre + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">File Location: </div><input class="editTextSmall" value="' + result[id].fileLocation + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">File Name: </div><input class="editTextSmall" value="' + result[id].fileName + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Keywords: </div><input class="editTextSmall" value="' + result[id].keyWords + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Magnet Link: </div><input class="editTextSmall" value="' + result[id].magnet + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Image Location: </div><input class="editTextSmall" value="' + result[id].image + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">IMDB Link: </div><input class="editTextSmall" value="' + result[id].imdbLink + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Ratio: </div><input class="editTextSmall" value="' + result[id].ratio + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Framerate: </div><input class="editTextSmall" value="' + result[id].framerate + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Date Added: </div><input class="editTextSmall" value="' + result[id].dateAdded + '" /></div>');
        $(".editor").append('<div class="editContainerSmall"><div class="editName">Resolution: </div><input class="editTextSmall" value="' + result[id].resolution + '" /></div>');

        if (result[id].searchable == true) {
            $(".editor").append('<div class="editContainerSmall"><div class="editName">Searchable: </div><input type="checkbox" class="editCheckbox" checked/></div>');
        }else {
            $(".editor").append('<div class="editContainerSmall"><div class="editName">Searchable: </div><input type="checkbox" class="editCheckbox"/></div>');
        }

        if (result[id].episodic == true) {
            $(".editor").append('<div class="editContainerSmall"><div class="editName">Episodic: </div><input type="checkbox" class="editCheckbox" checked/></div>');
        }else {
            $(".editor").append('<div class="editContainerSmall"><div class="editName">Episodic: </div><input type="checkbox" class="editCheckbox" /></div>');
        }

        if (result[id].locallyStored == true) {
            $(".editor").append('<div class="editContainerSmall"><div class="editName">Locally Stored: </div><input type="checkbox" class="editCheckbox" checked/></div>');
        }else {
            $(".editor").append('<div class="editContainerSmall"><div class="editName">Locally Stored: </div><input type="checkbox" class="editCheckbox" /></div>');
        }
        $(".editor").append('');
        $(".editor").append('');
        $(".editor").append('');
        $(".editor").append('');
        $(".editor").append('');
        $(".editor").append('');
        $(".editor").append('');

    }else {
        alert("There was an error at loadEditor()");
    }
}

function changeActive(id) {
    $(".active").toggleClass("active");
    $("#" + id).toggleClass("active");
}
