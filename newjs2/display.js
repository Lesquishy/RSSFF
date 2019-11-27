//Displays the result from the search in the resultsContainer
function displaySearch(result) {
    console.log("Display Search Run");

    var length = Object.keys(result).length;

    for (var l = 0; l < length; l++){
        //check if there is an image (There may not be)
        if (result[l].image == "") {
            image = "../images/not-found.jpg";
        }else {
            image = result[l].image;
        }
        $('.resultsContainer').append('<div class="searchResult"><img onclick="checkFocus(this.id)" id="' + l + '" class="resultImg" src="' + image + '" onerror="imgError(this, ' + l + ');" /><div class="resultTitle">' + result[l].title + '</div>');
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
