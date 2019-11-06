//Code for the focus/expand of the movies
//Toggles the "Expanded" result, manages the visual function calls and the rss function calls
//It by default will show a message such as "[blank] not found" for each value
//When called (to open) it will call setFocusResult() to change these values to be the data in the movie arrays then call displayInfo() and show it on screen
//Then when called again (to close) it will call displayInfo() to hide it, and set the values back to the "[blank] not found"

function resultExpand(id) {
    resultDisplayTest = true;
    console.log("Result Expand Run");
    if (resultDisplayed === true) {//If the result is already expanded
        resetFocusResult();
        displayInfo();
        resultDisplayed = false;
    }else if (resultDisplayed === false){//If the result not yet expanded
        setFocusResult(id);
        displayInfo();
        resultDisplayed = true;
    }else {//Something went terribly wrong
        message("toggleInfo", "resultDisplayed returned incorrect value", "m");
    }
}

function removeExpand() {
    if (resultDisplayed === true) {//If the result is already expanded
        resetFocusResult();
        displayInfo();
        resultDisplayed = false;
    }
}



//This sets the info in the focus popup
function setFocusResult(id) {
    if ($("#tab1").hasClass("active") == true) {

    }else if ($("#tab2").hasClass("active") == true) {
        if (imageNULLId == id) {
            $("#focusImg").attr("src", "https://tnstateparks.com/assets/images/hero-images/4777/300x500.png");
        }else {$("#focusImg").attr("src",reSearch.data.movies[id].medium_cover_image);}
        $("#focusTitle").text(reSearch.data.movies[id].title);
        $("#focusDesc").text(reSearch.data.movies[id].description_full);
        $("#focusTime").text(reSearch.data.movies[id].runtime + " minutes");
        genres = reSearch.data.movies[id].genres;
        console.log("Genres = " + genres);
        genres = genres.join(", ");
        console.log("Genres are: " + genres);
        $("#focusGenre").text(genres);

        //Gets the torrent link with the most seeders
        torrents = reSearch.data.movies[id].torrents;
        var testMax = [];
        for (var i = 0; i < torrents.length; i++){
            testMax.push(torrents[i].seeds);
        }
        var maxVal= Math.max(...testMax);
        console.log("max Val" + maxVal);
        var max = testMax.indexOf(maxVal);
        console.log("max is:" + max);
        $("#focusLink").attr("href", reSearch.data.movies[id].torrents[max].url);
        $("#focusSize").text(reSearch.data.movies[id].torrents[max].size);
    }else if ($("#tab3").hasClass("active") == true) {
        if (imageNULLId == id) {
            console.log("wefrwfw");
            $("#focusImg").attr("src", "https://tnstateparks.com/assets/images/hero-images/4777/300x500.png");
        }else {$("#focusImg").attr("src",img[id]);}
        $("#focusTitle").text(title[id]);
        $("#focusDesc").text(desc[id]);
        $("#focusTime").text(time[id]);
        $("#focusGenre").text(genre[id]);
        $("#focusLink").text(link[id]);
        $("#focusSize").text(size[id]);
    }else {message("toggleInfo", "no tab is active", "m");}
    //To not override the 404 image
}

function displayInfo() {
    $("#grey").fadeToggle(anispeed);
    $(".resultFocus").toggleClass("focusShown");
    $(".resultFocus").slideToggle(anispeed);
}

function resetFocusResult() {
    setTimeout(function() {
        $("#focusImg").attr("src", "https://tnstateparks.com/assets/images/hero-images/4777/300x500.png");
        $("#focusTitle").text("There was an error displaying this value");
        $("#focusDesc").text("There was an error displaying this value");
        $("#focusTime").text("There was an error displaying this value");
        $("#focusGenre").text("There was an error displaying this value");
        $("#focusSize").text("There was an error displaying this value");
    }, 200);
}






//
