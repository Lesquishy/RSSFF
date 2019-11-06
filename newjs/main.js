//This file contains the main code, this includes math functions, basic javascript and functions called by multiple pages/tabs


$(document).ready( function (){
    window.onload = function(){
        setTimeout(function() {
            $(".loading").fadeToggle();
        }, 100);
    }

    if (url.includes("#local") || url.includes("#yts") || url.includes("#rss")) {
        console.log("not on the home screen");
        //on a page already, just load the search container and continue
        homeScreen = false;
    }else {
        console.log("on the home screen");
        //load the home page
        $(".welcomeScreen").visible();
        homeScreen = true;
    }
});

(function($) {
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("display", "none");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("display", "block");
        });
    };
}(jQuery));

function test() {
    localSearch();
}

function message(msg) {

}

function searchLoad() {
    $(".loading2").fadeToggle(100);
}

function displaySearch(result) {

    var length = Object.keys(result).length;

    for (var l = 0; l < length; l++){

        //check if there is an image (There may not be)
        if (result[l].image == "") {
            image = "../images/not-found.jpg";
        }else {
            image = result[l].image;
        }
        $('.resultsContainer').append('<div class="searchResult"><img onclick="resultExpand(this.id)" id="' + l + '" class="resultImg" src="' + image + '" onerror="imgError(this, ' + l + ');" /><div class="resultTitle">' + result[l].title + '</div></div>');
    }

    if (unload == true) {
        setTimeout(function() {
            searchLoad();
        }, 100);
    }
}

//This function unloads the current search box and shows the loading icon
function unloadSearch() {
    $('.resultsContainer').empty();
}



















//
