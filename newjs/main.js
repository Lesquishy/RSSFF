//This file contains the main code, this includes math functions, basic javascript and functions called by multiple pages/tabs


$(document).ready( function (){
    window.onload = function(){
        setTimeout(function() {
            $(".loading").fadeToggle();
        }, 100);
    }

    if (url.includes("#browse") || url.includes("#upcoming")) {
        console.log("not on the home screen");
        //on a page already, just load the search container and continue
        homeScreen = false;

        searchLoad();
        unload = true;
        if (url.includes("#browse")) {loadBrowse();activeTab("#browse");}else
        if (url.includes("#upcoming")) {loadUpcoming();activeTab("#upcoming");}
        else {
            //This should not be possible.
        }
    }else {
        console.log("on the home screen");
        //load the home page

        $(".welcomeScreen").visible();
        activeTab("#home");
        loadHome();
        homeScreen = true;
    }
});


//This changes the 'active' tab
function changeActive(id) {
    $(".active").removeClass("active");
    $("#" + id).toggleClass("active");
}


//The test button, used to test features before fully implementing them
function test() {
    $("#Home").toggleClass("active");
}

function message(msg) {

}

function searchLoad() {
    console.log("searchLoad()");
    $(".loading2").fadeToggle(100);
}


//Displays the result from the search in the resultsContainer
function displaySearch(result) {
    console.log("Display Search Run");

    var length = Object.keys(result).length;

    for (var l = 0; l < length; l++){
        reload++;
        //check if there is an image (There may not be)
        if (result[l].image == "") {
            image = "../images/not-found.jpg";
        }else {
            image = result[l].image;
        }//DO DATA.REMOTE or something to say wether or not it is a local search
        if (reload != l) {
            $('.resultsContainer').append('<div class="searchResult"><img onclick="checkFocus(this.id)" id="' + reload + '" class="resultImg" src="' + image + '" onerror="imgError(this, ' + reload + ');" /><div class="resultTitle">' + result[l].title + '</div><div class="remote"</div>');

        }else {
            $('.resultsContainer').append('<div class="searchResult"><img onclick="checkFocus(this.id)" id="' + reload + '" class="resultImg" src="' + image + '" onerror="imgError(this, ' + reload + ');" /><div class="resultTitle">' + result[l].title + '</div></div>');
        }
    }
    loadingSearch = false;
    if (loadingLocal == true) {
        loadBrowse();
    }else {
        if (unload == true) {
            setTimeout(function() {
                searchLoad();
            }, 100);
        }
    }
}

//This function unloads the current search box and shows the loading icon
function unloadSearch() {
    console.log("REMOVED PREV SEARCH")
    $('.resultsContainer').empty();
}


//loaded if there is an error loading the image, sets is to a placeholder image
function imgError(image, i) {
    $(image).attr("src", "./images/not-found.jpg");
    imageNULLId = i;
    return true;
}


function activeTab(id) {
    $(".active").toggleClass("active");
    $("" + id).toggleClass("active");
}




// ----------------------- Focus Section ------------------------

//Loads the focus div for the local tab, this will look different from the other tabs as this is streamable, and will handle if its an episodic show
function localFocus() {

}

function ytsFocus() {

}



















//
