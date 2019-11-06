//This file contains the main code, this includes math functions, basic javascript and functions called by multiple pages/tabs


$(document).ready( function (){
    window.onload = function(){
        $(".loading").fadeToggle();
    }
});

function test() {
    localSearch();
}

function message(msg) {

}

function searchLoad() {

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
}
